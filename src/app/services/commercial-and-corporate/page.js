'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/CommercialAndCorporate.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'

const STAGES = [
    {
        t: 'تأسیس و ثبت', short: 'از انتخاب نوع شرکت تا صدور آگهی تأسیس.',
        heading: 'شروع درست، یعنی کمتر دردسر بعدی', text: 'این یک متن نمونه است. نوع شرکت، سهام و اساسنامه را متناسب با هدف کسب‌وکار شما تنظیم می‌کنیم، نه یک قالب آماده.',
        points: ['انتخاب نوع شرکت متناسب با فعالیت', 'تنظیم اساسنامه و شرکت‌نامه', 'پیگیری ثبت تا صدور آگهی رسمی']
    },
    {
        t: 'قراردادها', short: 'تنظیم و بازبینی قرارداد پیش از امضا.',
        heading: 'قرارداد خوب، دعوایی است که پیش نمی‌آید', text: 'این یک متن نمونه است. بیشتر اختلافات تجاری از یک بند مبهم یا فراموش‌شده شروع می‌شوند.',
        points: ['تنظیم قرارداد همکاری و سرمایه‌گذاری', 'بازبینی قراردادهای پیش‌نویس‌شده', 'مذاکره بر سر بندهای پرریسک']
    },
    {
        t: 'اختلاف شرکا', short: 'مذاکره یا دعوا، بسته به شرایط.',
        heading: 'وقتی مسیر مشترک به بن‌بست می‌رسد', text: 'این یک متن نمونه است. هدف اول، حفظ کسب‌وکار است؛ دعوا آخرین گزینه.',
        points: ['میانجی‌گری میان شرکا', 'دعوای تعیین سهم یا انحلال', 'اجرای رأی و تسویهٔ حساب شرکا']
    },
    {
        t: 'مالکیت فکری', short: 'برند، نام تجاری و ایده‌ی کسب‌وکار.',
        heading: 'دارایی‌ای که دیده نمی‌شود، حفاظت هم نمی‌شود', text: 'این یک متن نمونه است. نام برند و محصول شما هم دارایی است و هم قابل سوءاستفاده.',
        points: ['ثبت علامت تجاری', 'قرارداد عدم افشا (NDA)', 'پیگیری نقض علامت یا کپی‌برداری']
    },
    {
        t: 'اسناد تجاری', short: 'چک، سفته و مطالبات معوق.',
        heading: 'مطالبه‌ای که به دادگاه نکشد، بهتر است', text: 'این یک متن نمونه است. وصول مطالبات با اسناد رسمی مسیر کوتاه‌تری دارد.',
        points: ['وصول چک و سفتهٔ برگشتی', 'مطالبهٔ خسارت تأخیر تأدیه', 'مذاکره برای تقسیط بدهی']
    },
]

const FLAGS = [
    'مبلغ یا نحوهٔ پرداخت شفاف نیست',
    'مهلت انجام تعهدات ذکر نشده',
    'ضمانت اجرا یا جریمهٔ تأخیر ندارد',
    'مرجع حل اختلاف مشخص نیست',
    'شرایط فسخ یک‌طرفه است',
    'محرمانگی و مالکیت فکری پوشش داده نشده',
]

const TYPES = [
    { t: 'مسئولیت محدود', for: 'کسب‌وکارهای کوچک و خانوادگی', capital: 'سرمایهٔ حداقلی کمتر', liability: 'مسئولیت محدود به سهم‌الشرکه', speed: 'ثبت نسبتاً سریع' },
    { t: 'سهامی خاص', for: 'کسب‌وکارهایی با چند سهام‌دار یا سرمایه‌گذار', capital: 'حداقل سرمایهٔ مشخص', liability: 'مسئولیت محدود به سهام', speed: 'ثبت با مراحل بیشتر' },
    { t: 'استارتاپی (توافق سهام)', for: 'تیم‌های نوپا پیش از ثبت رسمی', capital: 'قابل تعریف در قرارداد سهام', liability: 'بسته به توافق شرکا', speed: 'انعطاف بالا، نیاز به قرارداد دقیق' },
]

const FAQ = [
    ['کدام نوع شرکت برای کسب‌وکار من مناسب‌تر است؟', 'این یک متن نمونه است. بسته به تعداد شرکا، نیاز به سرمایه‌گذار و نوع فعالیت پیشنهاد می‌دهیم.'],
    ['آیا فقط بازبینی قرارداد را هم انجام می‌دهید؟', 'این یک متن نمونه است. بله، بازبینی و اصلاح قراردادهای آماده به‌صورت جداگانه قابل انجام است.'],
    ['اختلاف با شریک را می‌شود بدون دادگاه حل کرد؟', 'این یک متن نمونه است. در بسیاری از موارد، میانجی‌گری و مذاکره پیش از طرح دعوا نتیجه می‌دهد.'],
    ['برای وصول چک برگشتی چقدر زمان لازم است؟', 'این یک متن نمونه است. بسته به نوع اقدام (کیفری یا حقوقی) متفاوت است؛ در جلسهٔ اول بررسی می‌کنیم.'],
]

const CHIPS = [
    { t: 'ثبت شرکت', s: { top: '6%', right: '0%', '--fd': '0s' } },
    { t: 'قرارداد سهام', s: { top: '42%', left: '-4%', '--fd': '-2s' } },
    { t: 'اختلاف شرکا', s: { bottom: '6%', right: '4%', '--fd': '-3s' } },
]
const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵', '۰۶']

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)
const BUILDING = 'M4 21V9l8-5 8 5v12z M9 21v-6h6v6'

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

export default function UserBusinessPage() {
    const [stage, setStage] = useState(0)
    const [flagged, setFlagged] = useState([])
    const [open, setOpen] = useState(0)
    const S = STAGES[stage]
    const riskN = flagged.length
    const riskLabel = riskN === 0 ? 'بدون نشانهٔ خطر' : riskN <= 2 ? 'نیاز به بازبینی جزئی' : 'نیاز به بازبینی جدی'

    return (
        <MainUserLayout>
            <div className='ab bz' dir='rtl'>
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <Link href='/services'>خدمات حقوقی</Link> <span>/</span> <span>حقوق تجارت و شرکت‌ها</span>
                                </nav>
                                <span className='ab-badge'><i /> مشاوره پیش از ثبت و پیش از امضا</span>
                                <h1 className='ab-h1'>کسب‌وکارتان را از <em>روز اول</em> ببندید</h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. از ثبت شرکت تا اختلاف شرکا، حقوق تجاری شما را با قرارداد و ساختار درست از ابتدا محکم می‌کنیم.
                                </p>
                                <div className='ab-actions'>
                                    <Link href='#' className='ab-btn ab-btn--gold'>مشاوره برای شرکت من <span aria-hidden>←</span></Link>
                                    <a href='#stage' className='ab-btn ab-btn--ghost'>مرحلهٔ کسب‌وکارم کدام است؟</a>
                                </div>
                            </div>
                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon'><Svg sw={1.2}><path d={BUILDING} /></Svg></div>
                                {CHIPS.map((c) => <span key={c.t} className='ab-chip' style={c.s}><i /> {c.t}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section id='stage' className='ab-panel ab-panel--bone radius-md'>
                        <span className='ab-blob ab-blob--gold' />
                        <Head eyebrow='مسیر کسب‌وکار' title='الان در کدام مرحله‌اید؟' sub='یکی را از فهرست انتخاب کنید تا جزئیاتش را ببینید.' />
                        <div className='ab-pol'>
                            <div className='ab-pol-list'>
                                {STAGES.map((s, i) => (
                                    <Reveal key={s.t} delay={i * 70}>
                                        <button type='button' className={`ab-pol-item${stage === i ? ' is-active' : ''}`} onClick={() => setStage(i)} aria-pressed={stage === i}>
                                            <span className='ab-pol-n'>{DIGITS[i]}</span>
                                            <span className='ab-pol-txt'><b>{s.t}</b><small>{s.short}</small></span>
                                            <span className='ab-pol-arrow' aria-hidden><Svg sw={2}><path d='M15 6l-6 6 6 6' /></Svg></span>
                                        </button>
                                    </Reveal>
                                ))}
                            </div>
                            <div className='ab-pol-detail' aria-live='polite'>
                                <span className='ab-pol-ring' aria-hidden />
                                <div className='ab-pol-content' key={stage}>
                                    <span className='ab-pol-big' aria-hidden>{DIGITS[stage]}</span>
                                    <div className='ab-pol-head'>
                                        <span className='ab-pol-ico'><Svg><path d={BUILDING} /></Svg></span>
                                        <span className='ab-pol-kicker'>{S.t}</span>
                                    </div>
                                    <h3 className='ab-pol-h'>{S.heading}</h3>
                                    <p className='ab-pol-p'>{S.text}</p>
                                    <ul className='ab-pol-points'>
                                        {S.points.map((pt) => (
                                            <li key={pt}><span><Svg sw={2.4}><path d='M5 12l5 5L20 7' /></Svg></span>{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <Head center eyebrow='اسکن قرارداد' title='قراردادتان چند نشانهٔ خطر دارد؟' sub='هر موردی که در قرارداد شما وجود دارد را علامت بزنید.' />
                        <div className='bz-scan'>
                            <ul className='bz-flags'>
                                {FLAGS.map((f) => (
                                    <li key={f}>
                                        <label className={flagged.includes(f) ? 'is-on' : ''}>
                                            <input type='checkbox' checked={flagged.includes(f)}
                                                onChange={() => setFlagged((c) => c.includes(f) ? c.filter((x) => x !== f) : [...c, f])} />
                                            <span className='bz-mark' aria-hidden>!</span>
                                            {f}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <div className='bz-result'>
                                <div className='bz-dots'>
                                    {FLAGS.map((_, i) => <span key={i} className={i < riskN ? 'is-on' : ''} />)}
                                </div>
                                <div className='bz-result-n'>{riskN.toLocaleString('fa-IR')} از {FLAGS.length.toLocaleString('fa-IR')} نشانه</div>
                                <div className='bz-result-l'>{riskLabel}</div>
                                <Link href='#' className='ab-btn ab-btn--gold'>بازبینی این قرارداد <span aria-hidden>←</span></Link>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ab-bare'>
                        <Head eyebrow='ساختار شرکت' title='کدام نوع شرکت مناسب شماست؟' sub='این یک متن نمونه است. مقایسه‌ای کلی؛ تصمیم نهایی در جلسهٔ مشاوره گرفته می‌شود.' />
                        <div className='ab-grid ab-grid--3'>
                            {TYPES.map((t, i) => (
                                <Reveal key={t.t} delay={i * 90}>
                                    <article className='ab-card ab-card--bone glass-gold hover-to-background-navy bg-bone border border-1'>
                                        <div className='fw-bold fs-5 mb-2'>{t.t}</div>
                                        <div className='bz-type-for'>{t.for}</div>
                                        <ul className='bz-type-attrs'>
                                            <li><b>سرمایه</b><span>{t.capital}</span></li>
                                            <li><b>مسئولیت</b><span>{t.liability}</span></li>
                                            <li><b>سرعت</b><span>{t.speed}</span></li>
                                        </ul>
                                    </article>
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
                    <section className='ab-bare bz-end'>
                        <Reveal className='text-center'>
                            <h2 className='ab-h2'>کسب‌وکارتان لایق قرارداد درست است.</h2>
                            <p className='ab-sub mb-4'>یک جلسهٔ مشاوره، پیش از هر ثبت یا امضایی.</p>
                            <Link href='#' className='ab-btn'>مشاوره برای شرکت من <span aria-hidden>←</span></Link>
                        </Reveal>
                    </section>
                </div>
            </div>
        </MainUserLayout>
    )
}
