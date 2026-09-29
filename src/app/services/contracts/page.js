'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/Contracts.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'

const TYPES = [
    { t: 'خرید و فروش', clauses: ['موضوع و مشخصات دقیق کالا یا ملک', 'ثمن و نحوهٔ پرداخت', 'زمان و شرایط تحویل', 'ضمانت و شرایط فسخ'] },
    { t: 'همکاری و مشارکت', clauses: ['سهم و تعهدات هر طرف', 'نحوهٔ تقسیم سود و ضرر', 'محرمانگی و عدم رقابت', 'شرایط خروج از مشارکت'] },
    { t: 'اجاره', clauses: ['مدت و مبلغ اجاره', 'ودیعه و نحوهٔ استرداد', 'تعهدات نگهداری ملک', 'شرایط فسخ و تخلیه'] },
    { t: 'قرارداد کار', clauses: ['شرح وظایف و ساعت کاری', 'حقوق، مزایا و پاداش', 'دورهٔ آزمایشی', 'شرایط پایان همکاری'] },
]

const COMPARE = [
    { bad: 'در صورت بروز مشکل، طرفین به‌صورت منطقی تصمیم می‌گیرند.', good: 'در صورت اختلاف، ابتدا مذاکره و در صورت عدم توافق ظرف ۱۵ روز، ارجاع به داوری مرکز مشخص.', note: 'مرجع و مهلت حل اختلاف باید دقیق باشد، نه کلی.' },
    { bad: 'پرداخت پس از اتمام کار انجام می‌شود.', good: '٪۴۰ پیش‌پرداخت هنگام امضا، ٪۳۰ مرحلهٔ میانی، ٪۳۰ پس از تحویل نهایی.', note: 'زمان‌بندی و درصد دقیق پرداخت باید مشخص باشد.' },
    { bad: 'هر یک از طرفین می‌تواند در هر زمان قرارداد را فسخ کند.', good: 'فسخ با اعلام کتبی ۳۰ روز پیش از موعد و جبران خسارت متعارف امکان‌پذیر است.', note: 'فسخ بدون قید و شرط، طرف ضعیف‌تر را بی‌پناه می‌گذارد.' },
]

const STEPS = [
    ['ارسال قرارداد', 'پیش‌نویس یا نیاز خود را برای ما بفرستید'],
    ['بررسی کارشناسی', 'بازبینی توسط وکیل متخصص همان حوزه'],
    ['گزارش اصلاحات', 'بندهای مبهم و پرریسک مشخص می‌شود'],
    ['نسخهٔ نهایی', 'آماده برای مذاکره یا امضا'],
]

const FAQ = [
    ['فقط بازبینی قرارداد آماده را هم انجام می‌دهید؟', 'این یک متن نمونه است. بله، بازبینی و پیشنهاد اصلاح روی قراردادی که خودتان دارید هم ممکن است.'],
    ['بازبینی یک قرارداد چقدر طول می‌کشد؟', 'این یک متن نمونه است. بسته به حجم و پیچیدگی قرارداد، معمولاً چند روز کاری.'],
    ['آیا در جلسهٔ مذاکره با طرف مقابل هم حضور دارید؟', 'این یک متن نمونه است. در صورت نیاز، در مذاکره هم همراه یا مشاور شما هستیم.'],
    ['هزینهٔ تنظیم و بازبینی چگونه تعیین می‌شود؟', 'این یک متن نمونه است. بسته به نوع و حجم قرارداد، پیش از شروع به‌صورت مکتوب اعلام می‌شود.'],
]

const CHIPS = [
    { t: 'بازبینی', s: { top: '6%', right: '0%', '--fd': '0s' } },
    { t: 'مذاکره', s: { top: '42%', left: '-4%', '--fd': '-2s' } },
    { t: 'نسخهٔ نهایی', s: { bottom: '6%', right: '4%', '--fd': '-3s' } },
]
const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵']

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)
const PEN = 'M4 20l4-1L19 8l-3-3L5 16l-1 4z M14 7l3 3'

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

export default function UserContractsPage() {
    const [type, setType] = useState(0)
    const [cmp, setCmp] = useState(0)
    const [open, setOpen] = useState(0)
    const T = TYPES[type]
    const C = COMPARE[cmp]
    const nextCmp = () => setCmp((c) => (c + 1) % COMPARE.length)
    const prevCmp = () => setCmp((c) => (c - 1 + COMPARE.length) % COMPARE.length)

    return (
        <MainUserLayout>
            <div className='ab ct' dir='rtl'>
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <Link href='/services'>خدمات حقوقی</Link> <span>/</span> <span>قراردادها و مشاورهٔ حقوقی</span>
                                </nav>
                                <span className='ab-badge'><i /> بازبینی پیش از هر امضا</span>
                                <h1 className='ab-h1'>پیش از امضا، <em>یک نگاه دوم</em></h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. بیشتر دعواهای حقوقی از یک قرارداد ضعیف شروع می‌شوند، نه از یک اتفاق ناگهانی. یک بازبینی دقیق، ارزان‌تر از یک دعوای طولانی است.
                                </p>
                                <div className='ab-actions'>
                                    <Link href='#' className='ab-btn ab-btn--gold'>ارسال قرارداد برای بررسی <span aria-hidden>←</span></Link>
                                    <a href='#type' className='ab-btn ab-btn--ghost'>نوع قراردادم کدام است؟</a>
                                </div>
                            </div>
                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon'><Svg sw={1.2}><path d={PEN} /></Svg></div>
                                {CHIPS.map((c) => <span key={c.t} className='ab-chip' style={c.s}><i /> {c.t}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section id='type' className='ab-panel ab-panel--bone radius-md'>
                        <Head eyebrow='نوع قرارداد' title='قراردادتان دربارهٔ چیست؟' sub='یکی را انتخاب کنید تا بندهای کلیدی همان نوع قرارداد را ببینید.' />
                        <div className='ct-chips'>
                            {TYPES.map((t, i) => (
                                <button key={t.t} type='button' aria-pressed={type === i}
                                    className={`ct-chip${type === i ? ' is-active' : ''}`} onClick={() => setType(i)}>{t.t}</button>
                            ))}
                        </div>
                        <div className='ct-doc-wrap'>
                            <div className='ct-doc' key={type} aria-live='polite'>
                                <div className='ct-doc-head'>
                                    <span className='ct-doc-dot' /><span className='ct-doc-dot' /><span className='ct-doc-dot' />
                                    <b>قرارداد {T.t}</b>
                                </div>
                                <ul className='ct-doc-lines'>
                                    {T.clauses.map((c, i) => (
                                        <li key={c} style={{ '--d': `${i * 90}ms` }}>
                                            <span className='ct-doc-n'>{DIGITS[i]}</span>{c}
                                        </li>
                                    ))}
                                </ul>
                                <div className='ct-doc-sign'><span /><span /></div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <Head center eyebrow='مقایسه' title='یک بند مبهم، در برابر یک بند روشن' sub='با فلش‌ها نمونه‌های دیگر را هم ببینید. (نمونه‌اند و باید متناسب با قرارداد شما نوشته شوند.)' />
                        <div className='ct-cmp'>
                            <button type='button' className='ct-cmp-nav' onClick={prevCmp} aria-label='نمونهٔ قبلی'><Svg sw={2.4}><path d='M9 6l6 6-6 6' /></Svg></button>
                            <div className='ct-cmp-cards' key={cmp}>
                                <div className='ct-cmp-card ct-cmp-card--bad'>
                                    <span className='ct-cmp-tag'>بند مبهم</span>
                                    <p>{C.bad}</p>
                                </div>
                                <span className='ct-cmp-arrow' aria-hidden><Svg sw={2.2}><path d='M5 12h14M13 6l6 6-6 6' /></Svg></span>
                                <div className='ct-cmp-card ct-cmp-card--good'>
                                    <span className='ct-cmp-tag'>بند روشن</span>
                                    <p>{C.good}</p>
                                </div>
                            </div>
                            <button type='button' className='ct-cmp-nav' onClick={nextCmp} aria-label='نمونهٔ بعدی'><Svg sw={2.4}><path d='M15 6l-6 6 6 6' /></Svg></button>
                        </div>
                        <p className='ct-cmp-note'>{C.note}</p>
                        <div className='ct-cmp-dots'>
                            {COMPARE.map((_, i) => <button key={i} aria-label={`نمونهٔ ${DIGITS[i]}`} className={i === cmp ? 'is-on' : ''} onClick={() => setCmp(i)} />)}
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ab-bare'>
                        <Head eyebrow='چطور کار می‌کنیم' title='از ارسال قرارداد تا نسخهٔ نهایی' />
                        <div className='ct-steps'>
                            {STEPS.map(([t, d], i) => (
                                <Reveal key={t} delay={i * 90}>
                                    <div className='ct-step glass-gold hover-to-background-navy bg-bone border border-1'>
                                        <span className='ct-step-n'>{DIGITS[i]}</span>
                                        <b>{t}</b>
                                        <small>{d}</small>
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
                    <section className='ab-bare ct-end'>
                        <Reveal className='text-center'>
                            <h2 className='ab-h2'>قراردادتان را امضا نکنید؛ اول نشانش دهید.</h2>
                            <p className='ab-sub mb-4'>بازبینی اولیه سریع است و شما را متعهد به ادامه نمی‌کند.</p>
                            <Link href='#' className='ab-btn'>ارسال قرارداد برای بررسی <span aria-hidden>←</span></Link>
                        </Reveal>
                    </section>
                </div>
            </div>
        </MainUserLayout>
    )
}
