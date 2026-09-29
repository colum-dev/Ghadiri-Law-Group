'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/CriminalCases.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'

const STAGES = [
    {
        t: 'بازداشت یا شکایت', urgent: 'ساعت‌های اول، مهم‌ترین بخش پرونده است.',
        does: ['حضور فوری وکیل در محل یا بازداشتگاه', 'راهنمایی دربارهٔ حق سکوت پیش از هر اظهاری', 'بررسی قانونی بودن بازداشت']
    },
    {
        t: 'دادسرا', urgent: 'دفاع در این مرحله، مسیر باقی پرونده را تعیین می‌کند.',
        does: ['حضور در تحقیقات مقدماتی', 'دفاع برای قرار تأمین مناسب به‌جای بازداشت', 'جمع‌آوری و ارائهٔ ادلهٔ برائت']
    },
    {
        t: 'دادگاه', urgent: 'لایحهٔ دقیق و دفاع حضوری، تفاوت را می‌سازد.',
        does: ['تنظیم لایحهٔ دفاعیه', 'دفاع حضوری در جلسهٔ رسیدگی', 'بررسی و اعتراض به رأی در صورت نیاز']
    },
    {
        t: 'اجرای حکم', urgent: 'حتی پس از رأی، راه‌های قانونی باقی می‌ماند.',
        does: ['بررسی امکان تجدیدنظر یا فرجام', 'پیگیری تعویق یا تقسیط اجرای حکم', 'درخواست آزادی مشروط یا عفو در موارد قابل‌طرح']
    },
]

const RIGHTS = [
    'حق سکوت تا حضور وکیل',
    'حق تماس با خانواده و اطلاع از علت بازداشت',
    'حق داشتن وکیل در تمام مراحل بازجویی',
    'حق ملاقات با وکیل پیش از هر اظهارنامه',
    'حق اطلاع از اتهام به‌صورت مکتوب',
    'حق اعتراض به قرار بازداشت موقت',
]

const CLOCK = [
    { h: '۲۴', u: 'ساعت', l: 'مهم‌ترین بازهٔ تماس با وکیل و جلوگیری از اظهار نسنجیده' },
    { h: '۲۴ تا ۷۲', u: 'ساعت', l: 'بازهٔ نمونهٔ تعیین تکلیف اولیه در دادسرا' },
    { h: '۱۰', u: 'روز', l: 'مهلت نمونهٔ اعتراض به برخی قرارها' },
    { h: '۲۰', u: 'روز', l: 'مهلت نمونهٔ تجدیدنظرخواهی پس از ابلاغ رأی' },
]

const FAQ = [
    ['اگر بازداشت شده باشم چطور با شما تماس بگیرم؟', 'این یک متن نمونه است. خانواده یا خود شما می‌توانید از طریق خط تماس فوری با ما در ارتباط باشید.'],
    ['آیا باید در بازجویی بدون وکیل صحبت کنم؟', 'این یک متن نمونه است. حق دارید تا حضور وکیل سکوت کنید؛ این حق شماست، نه نشانهٔ گناهکاری.'],
    ['هزینهٔ دفاع کیفری چگونه تعیین می‌شود؟', 'این یک متن نمونه است. بسته به مرحلهٔ پرونده و نوع اتهام، پیش از شروع به‌صورت مکتوب اعلام می‌شود.'],
    ['اگر شاکی هستم نه متهم، کمک می‌کنید؟', 'این یک متن نمونه است. بله، طرح و پیگیری شکایت و مطالبهٔ حق نیز بخشی از خدمات ماست.'],
]

const CHIPS = [
    { t: 'قرار بازداشت', s: { top: '6%', right: '0%', '--fd': '0s' } },
    { t: 'دفاعیه', s: { top: '42%', left: '-4%', '--fd': '-2s' } },
    { t: 'تجدیدنظر', s: { bottom: '6%', right: '4%', '--fd': '-3s' } },
]
const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵', '۰۶']

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)
const SHIELD = 'M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z'

function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('ab-in'); io.disconnect() } }, { threshold: 0.12 })
        io.observe(el)
        return () => io.disconnect()
    }, [])
    return <div ref={ref} className={`ab-reveal ${className}`} style={{ '--d': `${delay}ms` }}>{children}</div>
}

function Head({ eyebrow, title, sub, center = false }) {
    return (
        <Reveal className={`ab-head${center ? ' ab-head--center' : ''}`}>
            <span className='ab-eyebrow'>{eyebrow}</span>
            <h2 className='ab-h2'>{title}</h2>
            {sub && <p className='ab-sub'>{sub}</p>}
        </Reveal>
    )
}

export default function UserCriminalPage() {
    const [stage, setStage] = useState(0)
    const [open, setOpen] = useState(0)
    const S = STAGES[stage]

    return (
        <MainUserLayout>
            <div className='ab cr' dir='rtl'>
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <Link href='/services'>خدمات حقوقی</Link> <span>/</span> <span>دعاوی کیفری</span>
                                </nav>
                                <span className='ab-badge cr-pulse'><i /> خط تماس فوری، شبانه‌روزی</span>
                                <h1 className='ab-h1'>دفاع از <em>ساعت‌های اول</em></h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. در پروندهٔ کیفری، هر ساعتی که بدون وکیل می‌گذرد ممکن است جبران‌ناپذیر باشد. از همان لحظهٔ اول کنار شما هستیم.
                                </p>
                                <div className='ab-actions'>
                                    <Link href='#' className='ab-btn ab-btn--gold'>تماس فوری با وکیل <span aria-hidden>←</span></Link>
                                    <a href='#stage' className='ab-btn ab-btn--ghost'>در کدام مرحله هستید؟</a>
                                </div>
                            </div>
                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon'><Svg sw={1.2}><path d={SHIELD} /></Svg></div>
                                {CHIPS.map((c) => <span key={c.t} className='ab-chip' style={c.s}><i /> {c.t}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section id='stage' className='ab-panel ab-panel--bone radius-md'>
                        <Head eyebrow='مسیر پرونده' title='در کدام مرحله هستید؟' sub='روی هر ایستگاه بزنید تا ببینید در آن مرحله چه کاری برای شما انجام می‌دهیم.' />
                        <ol className='cr-track' role='tablist'>
                            {STAGES.map((s, i) => (
                                <li key={s.t}>
                                    <button type='button' role='tab' aria-selected={stage === i}
                                        className={`cr-stop${stage === i ? ' is-active' : ''}${i < stage ? ' is-passed' : ''}`}
                                        onClick={() => setStage(i)}>
                                        <span className='cr-stop-n'>{DIGITS[i]}</span>
                                        <span className='cr-stop-t'>{s.t}</span>
                                    </button>
                                </li>
                            ))}
                        </ol>
                        <div className='cr-stage' key={stage}>
                            <p className='cr-stage-urgent'><b>چرا مهم است؟</b>{S.urgent}</p>
                            <ul className='cr-stage-does'>
                                {S.does.map((d) => (
                                    <li key={d}><span><Svg sw={2.4}><path d='M5 12l5 5L20 7' /></Svg></span>{d}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>

                <section className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--2' />
                    <span className='ab-blob ab-blob--1' />
                    <div className='main-user-layout ab-inner'>
                        <Head eyebrow='آگاه باشید' title='حقوق شما در بازداشت و بازجویی' sub='این یک متن نمونه است. دانستن این حقوق، اولین خط دفاع از خودتان است.' />
                        <div className='ab-grid ab-grid--2'>
                            {RIGHTS.map((r, i) => (
                                <Reveal key={r} delay={i * 70}>
                                    <div className='ab-pledge'>
                                        <span className='ab-check'><Svg sw={2.2}><path d='M5 12l5 5L20 7' /></Svg></span>
                                        <span>{r}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ab-bare'>
                        <Head eyebrow='زمان مهم است' title='چرا ساعت‌های اول این‌قدر مهم است؟' sub='بازه‌های زیر نمونه‌اند و باید با مهلت‌های قانونی به‌روز جایگزین شوند.' />
                        <div className='cr-clocks'>
                            {CLOCK.map((c, i) => (
                                <Reveal key={c.l} delay={i * 90}>
                                    <div className='cr-clock glass-gold hover-to-background-navy bg-bone border border-1'>
                                        <svg className='cr-clock-ico' viewBox='0 0 40 40' aria-hidden>
                                            <circle cx='20' cy='20' r='17' />
                                            <path d='M20 10v10l7 5' />
                                        </svg>
                                        <div className='cr-clock-v'><b>{c.h}</b><small>{c.u}</small></div>
                                        <p>{c.l}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </section>
                </div>

                <div className='main-user-layout'>
                    <section className='ab-panel ab-panel--gold radius-md'>
                        <span className='ab-blob ab-blob--white' />
                        <div className='ab-split ab-split--acc'>
                            <div className='ab-acc-side'>
                                <Head eyebrow='سؤالات رایج' title='قبل از تماس، شاید بپرسید' />
                                <div className='ab-bignum' key={open} aria-hidden>{DIGITS[open]}</div>
                            </div>
                            <div className='ab-acc'>
                                {FAQ.map(([q, a], i) => (
                                    <div key={q} className={`ab-acc-item${open === i ? ' is-open' : ''}`}>
                                        <button type='button' className='ab-acc-btn' onClick={() => setOpen(i)} aria-expanded={open === i}>
                                            <span className='ab-acc-n'>{DIGITS[i]}</span>
                                            <span className='ab-acc-t'>{q}</span>
                                            <span className='ab-acc-i' aria-hidden><Svg sw={2}><path d='M12 5v14M5 12h14' /></Svg></span>
                                        </button>
                                        <div className='ab-acc-body'><div><p>{a}</p></div></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className='main-user-layout'>
                    <section className='ab-bare cr-end'>
                        <Reveal className='text-center'>
                            <h2 className='ab-h2'>همین حالا نیاز به وکیل دارید؟</h2>
                            <p className='ab-sub mb-4'>خط تماس فوری ما شبانه‌روزی پاسخگوی شماست.</p>
                            <Link href='#' className='ab-btn'>تماس فوری با وکیل <span aria-hidden>←</span></Link>
                        </Reveal>
                    </section>
                </div>
            </div>
        </MainUserLayout>
    )
}
