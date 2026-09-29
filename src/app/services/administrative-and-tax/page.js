'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/AdministrativeAndTax.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'

const NOTICES = [
    { t: 'برگ تشخیص مالیات', days: '۳۰', body: 'مهلت نمونه برای اعتراض کتبی به ادارهٔ مالیاتی مربوطه.', next: 'اعتراض کتبی و پیگیری در هیئت حل اختلاف مالیاتی' },
    { t: 'جریمهٔ تأمین اجتماعی', days: '۲۰', body: 'مهلت نمونه برای اعتراض به رأی کارشناسی سازمان.', next: 'ارائهٔ اعتراض به هیئت‌های تشخیص مطالبات' },
    { t: 'رأی هیئت بدوی مالیاتی', days: '۲۰', body: 'مهلت نمونه برای تجدیدنظرخواهی از رأی هیئت بدوی.', next: 'تجدیدنظرخواهی در هیئت حل اختلاف تجدیدنظر' },
    { t: 'تصمیم ادارات دولتی', days: '۹۰', body: 'مهلت نمونه برای طرح دعوا در دیوان عدالت اداری.', next: 'تنظیم دادخواست و طرح در دیوان عدالت اداری' },
]

const STAIRS = [
    { t: 'اعتراض به سازمان', text: 'اولین قدم، اعتراض کتبی و مستند به همان سازمان صادرکنندهٔ تصمیم است.' },
    { t: 'هیئت حل اختلاف', text: 'در صورت رد اعتراض، پرونده در هیئت تخصصی مربوطه رسیدگی می‌شود.' },
    { t: 'دیوان عدالت اداری', text: 'آخرین مرجع رسیدگی به تصمیمات و آرای ادارات دولتی.' },
]

const FAQ = [
    ['اگر مهلت اعتراض گذشته باشد چه؟', 'این یک متن نمونه است. در برخی موارد راه‌های استثنایی برای طرح مجدد وجود دارد؛ در جلسهٔ اول بررسی می‌کنیم.'],
    ['آیا حضور خودم در جلسات هیئت لازم است؟', 'این یک متن نمونه است. معمولاً با وکالت‌نامه، دفاع بدون حضور مستقیم شما هم ممکن است.'],
    ['هزینهٔ رسیدگی به پروندهٔ اداری چگونه تعیین می‌شود؟', 'این یک متن نمونه است. بسته به مرحله و نوع پرونده، پیش از شروع به‌صورت مکتوب اعلام می‌شود.'],
    ['مدارک لازم برای شروع پرونده چیست؟', 'این یک متن نمونه است. اصل برگ تشخیص یا ابلاغیه و مستندات مالی مرتبط، نقطهٔ شروع خوبی است.'],
]

const CHIPS = [
    { t: 'برگ تشخیص', s: { top: '6%', right: '0%', '--fd': '0s' } },
    { t: 'هیئت حل اختلاف', s: { top: '42%', left: '-4%', '--fd': '-2s' } },
    { t: 'دیوان عدالت اداری', s: { bottom: '6%', right: '4%', '--fd': '-3s' } },
]
const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵']

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)
const DOC = 'M6 3h9l4 4v14H6V3zm3 8h7M9 15h7'

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

function RingStat({ to = 70, label }) {
    const ref = useRef(null)
    const [v, setV] = useState(0)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
        let raf
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return
            io.disconnect()
            const t0 = performance.now(); const dur = 1400
            const tick = (t) => {
                const p = Math.min((t - t0) / dur, 1)
                setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
                if (p < 1) raf = requestAnimationFrame(tick)
            }
            raf = requestAnimationFrame(tick)
        }, { threshold: 0.4 })
        io.observe(el)
        return () => { io.disconnect(); cancelAnimationFrame(raf) }
    }, [to])
    const c = 2 * Math.PI * 54
    return (
        <div ref={ref} className='tx-ring'>
            <svg viewBox='0 0 130 130'>
                <circle cx='65' cy='65' r='54' className='tx-ring-track' />
                <circle cx='65' cy='65' r='54' className='tx-ring-fill' style={{ strokeDasharray: c, strokeDashoffset: c - (c * v) / 100 }} />
            </svg>
            <div className='tx-ring-v' dir='ltr'>{v.toLocaleString('fa-IR')}٪</div>
            <div className='tx-ring-l'>{label}</div>
        </div>
    )
}

export default function UserTaxPage() {
    const [n, setN] = useState(0)
    const [open, setOpen] = useState(0)
    const N = NOTICES[n]

    return (
        <MainUserLayout>
            <div className='ab tx' dir='rtl'>
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <Link href='/services'>خدمات حقوقی</Link> <span>/</span> <span>دعاوی اداری و مالیاتی</span>
                                </nav>
                                <span className='ab-badge'><i /> اعتراض در مهلت قانونی</span>
                                <h1 className='ab-h1'>برگ تشخیص گرفته‌اید؟ <em>مهلت دارید</em></h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. اعتراض به تصمیم ادارات و سازمان‌ها یک مهلت قانونی محدود دارد؛ از آن مهلت عبور نکنید.
                                </p>
                                <div className='ab-actions'>
                                    <Link href='#' className='ab-btn ab-btn--gold'>بررسی فوری برگه‌ام <span aria-hidden>←</span></Link>
                                    <a href='#deadline' className='ab-btn ab-btn--ghost'>مهلت من چقدر است؟</a>
                                </div>
                            </div>
                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon'><Svg sw={1.2}><path d={DOC} /></Svg></div>
                                {CHIPS.map((c) => <span key={c.t} className='ab-chip' style={c.s}><i /> {c.t}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section id='deadline' className='ab-panel ab-panel--bone radius-md'>
                        <Head eyebrow='یاب مهلت' title='چه چیزی به دستتان رسیده؟' sub='یکی را انتخاب کنید تا مهلت نمونهٔ اعتراض و قدم بعدی را ببینید.' />
                        <div className='tx-notices'>
                            {NOTICES.map((x, i) => (
                                <button key={x.t} type='button' aria-pressed={n === i}
                                    className={`tx-notice${n === i ? ' is-active' : ''}`} onClick={() => setN(i)}>{x.t}</button>
                            ))}
                        </div>
                        <div className='tx-deadline' key={n}>
                            <div className='tx-deadline-days'><b dir='ltr'>{N.days}</b><span>روز مهلت (نمونه)</span></div>
                            <div className='tx-deadline-body'>
                                <p>{N.body}</p>
                                <div className='tx-deadline-next'><b>قدم بعدی</b>{N.next}</div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <Head center eyebrow='مسیر رسیدگی' title='پرونده چگونه بالا می‌رود؟' sub='اگر مرحلهٔ اول نتیجه ندهد، پرونده به مرجع بالاتر می‌رود.' />
                        <ol className='tx-stairs'>
                            {STAIRS.map((s, i) => (
                                <Reveal key={s.t} delay={i * 110}>
                                    <li className='tx-stair'>
                                        <span className='tx-stair-n'>{DIGITS[i]}</span>
                                        <div>
                                            <b>{s.t}</b>
                                            <p>{s.text}</p>
                                        </div>
                                    </li>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ab-bare tx-result'>
                        <div>
                            <Head eyebrow='نمونه پرونده' title='اعتراض به برگ تشخیص مالیات' sub='این یک متن نمونه است. اطلاعات موکل محرمانه است و فقط نتیجهٔ کلی نمایش داده می‌شود.' />
                            <p className='ab-text'>لایحهٔ اعتراض در مهلت قانونی تنظیم و در هیئت حل اختلاف مالیاتی دفاع شد؛ جریمهٔ مالیاتی به‌طور محسوسی کاهش یافت.</p>
                            <Link href='#' className='ab-btn ab-btn--gold mt-3'>بررسی فوری برگه‌ام <span aria-hidden>←</span></Link>
                        </div>
                        <Reveal><RingStat to={70} label='کاهش جریمهٔ مالیاتی' /></Reveal>
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
                    <section className='ab-bare tx-end'>
                        <Reveal className='text-center'>
                            <h2 className='ab-h2'>مهلت اعتراضتان را از دست ندهید.</h2>
                            <p className='ab-sub mb-4'>برگه یا ابلاغیهٔ خود را بفرستید تا مهلت و راه‌حل را بررسی کنیم.</p>
                            <Link href='#' className='ab-btn'>بررسی فوری برگه‌ام <span aria-hidden>←</span></Link>
                        </Reveal>
                    </section>
                </div>
            </div>
        </MainUserLayout>
    )
}
