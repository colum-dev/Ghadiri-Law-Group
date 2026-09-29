'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import '../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../assets/styles/common/Common.scss'
import '../assets/styles/views/user/services/services.scss'
import MainUserLayout from '../layouts/admin/user/MainUserLayout'

const SERVICES = [
    {
        slug: 'family', kind: 'band', title: 'حقوق خانواده', kicker: 'حل اختلاف با کمترین آسیب',
        text: 'از طلاق توافقی تا حضانت؛ پرونده‌هایی که در آن‌ها آرامش موکل مهم‌تر از پیروزی در جلسه است.',
        items: ['طلاق توافقی و قضایی', 'مهریه و نفقه', 'حضانت و ملاقات', 'ارث و وصیت'],
        icon: <path d='M12 21C5 16 3 12 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 12 19 16 12 21z' />,
    },
    {
        slug: 'criminal', kind: 'steps', tone: 'bone', title: 'دعاوی کیفری', kicker: 'دفاع از ساعت‌های اول',
        text: 'حضور در همهٔ مراحل پرونده، از شکایت یا اتهام تا اجرای حکم.',
        steps: [['تشکیل پرونده', 'بررسی اتهام و مستندات'], ['دادسرا', 'دفاع و درخواست قرار مناسب'], ['دادگاه', 'لایحه و دفاع حضوری'], ['اجرای حکم', 'اعتراض و پیگیری اجرا']],
        icon: <path d='M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z' />,
    },
    {
        slug: 'business', kind: 'grid', title: 'حقوق تجارت و شرکت‌ها', kicker: 'برای کسب‌وکارهای در حال رشد',
        text: 'از ثبت شرکت تا اختلاف شرکا، حقوق کسب‌وکار شما را از ابتدا محکم می‌بندیم.',
        cards: [['ثبت و تغییرات شرکت', 'تنظیم اساسنامه، صورتجلسه و تغییرات ثبتی.'], ['اختلاف شرکا', 'مذاکره و در صورت نیاز طرح دعوا.'], ['اسناد تجاری', 'چک، سفته و وصول مطالبات.']],
        icon: <path d='M4 21V9l8-5 8 5v12z M9 21v-6h6v6' />,
    },
    {
        slug: 'real-estate', kind: 'split', title: 'املاک و ثبت اسناد', kicker: 'پیش از معامله، نه بعد از آن',
        text: 'سند، مبایعه‌نامه و تصرف؛ هر جا مالکیت یا حق شما در خطر است.',
        cards: [['استعلام و بررسی سند', 'پیش از پرداخت هر مبلغ'], ['رفع تصرف', 'اثبات مالکیت و اجرای سریع حکم'], ['تخلیه و اجاره', 'اختلاف مالک و مستأجر'], ['الزام به تنظیم سند', 'وقتی فروشنده تعلل می‌کند']],
        icon: <path d='M3 11l9-8 9 8 M5 10v11h14V10 M10 21v-6h4v6' />,
    },
    {
        slug: 'tax', kind: 'band', flip: true, title: 'دعاوی اداری و مالیاتی', kicker: 'اعتراض در مهلت قانونی',
        text: 'اعتراض به برگ تشخیص، جریمه و تصمیم‌های ادارات، با لایحه‌ای که مهلت را از دست نمی‌دهد.',
        stat: { v: '۷۰٪', u: 'کاهش جریمه در یکی از پرونده‌های اخیر (نمونه)' },
        items: ['برگ تشخیص مالیات', 'هیئت حل اختلاف', 'دیوان عدالت اداری'],
        icon: <path d='M6 3h9l4 4v14H6V3zm3 8h7M9 15h7' />,
    },
    {
        slug: 'contracts', kind: 'steps', tone: 'bone', title: 'قراردادها و مشاورهٔ حقوقی', kicker: 'پیشگیری از دعوا',
        text: 'بیشتر دعواها با یک قرارداد دقیق و مشورت به‌موقع پیش نمی‌آید.',
        steps: [['تنظیم', 'نوشتن متن مطابق نیاز شما'], ['بازبینی', 'یافتن بندهای پرخطر'], ['مذاکره', 'اصلاح با طرف مقابل'], ['امضا', 'با اطمینان از حقوق خود']],
        icon: <path d='M4 20l4-1L19 8l-3-3L5 16l-1 4z M14 7l3 3' />,
    },
]

const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵', '۰۶']

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)

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

function Head({ s, i }) {
    return (
        <Reveal className='ab-head'>
            <span className='ab-eyebrow'>{DIGITS[i]} · {s.kicker}</span>
            <h2 className='ab-h2'>{s.title}</h2>
            <p className='ab-sub'>{s.text}</p>
        </Reveal>
    )
}

const Go = ({ s }) => (
    <Link href={`/services/${s.slug}`} className='ab-btn ab-btn--gold sv-stretch'>
        ورود به صفحهٔ {s.title} <span aria-hidden>←</span>
    </Link>
)

function Service({ s, i }) {
    if (s.kind === 'band') {
        return (
            <section id={s.slug} className='ab-full ab-panel ab-panel--navy sv-sec'>
                <span className='ab-gridbg' />
                <span className={`ab-blob ab-blob--${i % 2 ? 2 : 1}`} />
                <div className='main-user-layout ab-inner'>
                    <div className={`sv-band${s.flip ? ' sv-band--flip' : ''}`}>
                        <div>
                            <Head s={s} i={i} />
                            {s.stat && <div className='sv-stat'><b>{s.stat.v}</b><span>{s.stat.u}</span></div>}
                            <ul className='sv-tags'>{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
                            <Go s={s} />
                        </div>
                        <div className='sv-art' aria-hidden>
                            <span className='sv-ico'><Svg sw={0.9}>{s.icon}</Svg></span>
                            {s.items.slice(0, 3).map((t, k) => <span key={t} className={`sv-float sv-float--${k}`}>{t}</span>)}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (s.kind === 'steps') {
        return (
            <div className='main-user-layout'>
                <section id={s.slug} className='ab-panel ab-panel--bone radius-md sv-sec'>
                    <Head s={s} i={i} />
                    <ol className='sv-steps'>
                        {s.steps.map(([t, d], k) => (
                            <Reveal key={t} delay={k * 90}>
                                <li><span className='sv-dot' /><b>{t}</b><small>{d}</small></li>
                            </Reveal>
                        ))}
                    </ol>
                    <Go s={s} />
                </section>
            </div>
        )
    }

    if (s.kind === 'grid') {
        return (
            <div className='main-user-layout'>
                <section id={s.slug} className='ab-panel ab-panel--gold radius-md sv-sec'>
                    <span className='ab-blob ab-blob--white' />
                    <Head s={s} i={i} />
                    <div className='ab-grid ab-grid--3 sv-cards'>
                        {s.cards.map(([t, d], k) => (
                            <Reveal key={t} delay={k * 90}>
                                <article className='ab-card ab-card--frost'>
                                    <span className='sv-mini'><Svg>{s.icon}</Svg></span>
                                    <div className='fw-bold fs-5 mb-2'>{t}</div>
                                    <div className='ab-text'>{d}</div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                    <Go s={s} />
                </section>
            </div>
        )
    }

    return (
        <div className='main-user-layout'>
            <section id={s.slug} className='ab-bare sv-sec sv-split'>
                <div>
                    <span className='sv-num' aria-hidden>{DIGITS[i]}</span>
                    <Head s={s} i={i} />
                    <Go s={s} />
                </div>
                <ul className='sv-rows'>
                    {s.cards.map(([t, d], k) => (
                        <Reveal key={t} delay={k * 80}>
                            <li><b>{t}</b><small>{d}</small></li>
                        </Reveal>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default function UserServicesPage() {
    return (
        <MainUserLayout>
            <div className='ab' dir='rtl'>
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='sv-hero'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <span>خدمات حقوقی</span>
                                </nav>
                                <h1 className='ab-h1'>خدمات <em>حقوقی</em></h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. مسئلهٔ شما در کدام حوزه است؟ از فهرست کنار انتخاب کنید یا پایین‌تر خلاصهٔ هر خدمت را بخوانید.
                                </p>
                            </div>
                            <nav className='sv-index' aria-label='فهرست خدمات'>
                                {SERVICES.map((s, i) => (
                                    <a key={s.slug} href={`#${s.slug}`}>
                                        <span>{DIGITS[i]}</span><b>{s.title}</b><i aria-hidden>↓</i>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </section>

                {SERVICES.map((s, i) => <Service key={s.slug} s={s} i={i} />)}

                <div className='main-user-layout'>
                    <section className='ab-bare sv-end'>
                        <Reveal className='text-center'>
                            <h2 className='ab-h2'>پرونده‌تان در هیچ‌کدام جا نمی‌گیرد؟</h2>
                            <p className='ab-sub mb-4'>همین را برایمان بگویید؛ در همان جلسهٔ اول مسیر را روشن می‌کنیم.</p>
                            <Link href='#' className='ab-btn'>با ما تماس بگیرید <span aria-hidden>←</span></Link>
                        </Reveal>
                    </section>
                </div>
            </div>
        </MainUserLayout>
    )
}
