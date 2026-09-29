'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import '../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../assets/styles/common/Common.scss'
import '../assets/styles/views/user/Blogs/Blogs.scss'
import MainUserLayout from '../layouts/admin/user/MainUserLayout'

const CATEGORIES = [
    { key: 'all', t: 'همه' },
    { key: 'family', t: 'خانواده' },
    { key: 'criminal', t: 'کیفری' },
    { key: 'business', t: 'تجارت' },
    { key: 'real-estate', t: 'املاک' },
    { key: 'contracts', t: 'قراردادها' },
    { key: 'tax', t: 'اداری و مالیاتی' },
]

const ARTICLES = [
    {
        slug: 'divorce-agreement-steps', cat: 'family', title: 'طلاق توافقی چگونه و در چه مدتی انجام می‌شود؟',
        excerpt: 'مراحل، مدارک لازم و نکاتی که پیش از مراجعه به دادگاه خانواده باید بدانید.', date: '۱۴۰۴/۰۴/۱۲', read: '۶', size: 'tall'
    },
    {
        slug: 'checking-property-deed', cat: 'real-estate', title: 'پیش از پرداخت بیعانه، سند را این‌طور استعلام بگیرید',
        excerpt: 'پنج نکتهٔ ساده که از خیلی از اختلافات ملکی جلوگیری می‌کند.', date: '۱۴۰۴/۰۴/۰۵', read: '۴', size: 'wide'
    },
    {
        slug: 'first-hours-arrest', cat: 'criminal', title: 'ساعت‌های اول پس از بازداشت؛ چه بگوییم، چه نگوییم؟',
        excerpt: 'حق سکوت، حق داشتن وکیل و اشتباهاتی که در بازجویی نباید مرتکب شد.', date: '۱۴۰۴/۰۳/۲۸', read: '۵', size: 'wide'
    },
    {
        slug: 'startup-shareholder-agreement', cat: 'business', title: 'چرا استارتاپ‌ها بدون قرارداد سهام شروع نمی‌کنند؟',
        excerpt: 'نگاهی به بندهای کلیدی توافق‌نامهٔ سهام میان بنیان‌گذاران.', date: '۱۴۰۴/۰۳/۲۰', read: '۷', size: 'small'
    },
    {
        slug: 'contract-red-flags', cat: 'contracts', title: 'شش نشانهٔ خطر در یک قرارداد که نباید نادیده بگیرید',
        excerpt: 'از مهلت‌های مبهم تا شرایط فسخ یک‌طرفه.', date: '۱۴۰۴/۰۳/۱۵', read: '۵', size: 'small'
    },
    {
        slug: 'tax-assessment-appeal', cat: 'tax', title: 'اعتراض به برگ تشخیص مالیات؛ از کجا شروع کنیم؟',
        excerpt: 'مهلت قانونی، مدارک لازم و مسیر رسیدگی در هیئت حل اختلاف.', date: '۱۴۰۴/۰۳/۰۸', read: '۶', size: 'small'
    },
    {
        slug: 'child-custody-basics', cat: 'family', title: 'حضانت فرزند بعد از طلاق؛ معیار دادگاه چیست؟',
        excerpt: 'مصلحت کودک، سن فرزند و نحوهٔ تعیین حق ملاقات.', date: '۱۴۰۴/۰۲/۳۰', read: '۵', size: 'small'
    },
    {
        slug: 'tenant-landlord-disputes', cat: 'real-estate', title: 'اختلاف مالک و مستأجر؛ ودیعه چگونه مطالبه می‌شود؟',
        excerpt: 'مسیر قانونی استرداد ودیعه و تخلیهٔ ملک استیجاری.', date: '۱۴۰۴/۰۲/۲۲', read: '۴', size: 'small'
    },
    {
        slug: 'company-types-comparison', cat: 'business', title: 'مسئولیت محدود یا سهامی خاص؛ کدام برای شما مناسب‌تر است؟',
        excerpt: 'مقایسه‌ای کوتاه از تفاوت‌های ساختاری، سرمایه و مسئولیت.', date: '۱۴۰۴/۰۲/۱۴', read: '۶', size: 'small'
    },
]

const ICONS = {
    family: <path d='M12 21C5 16 3 12 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 12 19 16 12 21z' />,
    criminal: <path d='M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z' />,
    business: <path d='M4 21V9l8-5 8 5v12z M9 21v-6h6v6' />,
    'real-estate': <path d='M3 11l9-8 9 8 M5 10v11h14V10 M10 21v-6h4v6' />,
    contracts: <path d='M4 20l4-1L19 8l-3-3L5 16l-1 4z M14 7l3 3' />,
    tax: <path d='M6 3h9l4 4v14H6V3zm3 8h7M9 15h7' />,
}
const CAT_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.t]))

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)
const BOOK = 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z M20 18H6.5A2.5 2.5 0 0 0 4 20.5'

function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('ab-in'); io.disconnect() } }, { threshold: 0.1 })
        io.observe(el)
        return () => io.disconnect()
    }, [])
    return <div ref={ref} className={`ab-reveal ${className}`} style={{ '--d': `${delay}ms` }}>{children}</div>
}

export default function UserArticlesPage() {
    const [cat, setCat] = useState('all')
    const [q, setQ] = useState('')

    const list = useMemo(() => {
        return ARTICLES.filter((a) => (cat === 'all' || a.cat === cat) && a.title.includes(q.trim()))
    }, [cat, q])

    const featured = list[0]
    const rest = list.slice(1)

    return (
        <MainUserLayout>
            <div className='ab ar' dir='rtl'>
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <span>مقالات</span>
                                </nav>
                                <span className='ab-badge'><i /> یادداشت‌هایی از دل پرونده‌های واقعی</span>
                                <h1 className='ab-h1'>حقوق را <em>ساده</em> بخوانید</h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. مقالاتی کوتاه دربارهٔ سؤالاتی که موکلان بیشتر از همه از ما می‌پرسند.
                                </p>
                                <form className='ar-search' role='search' onSubmit={(e) => e.preventDefault()}>
                                    <Svg sw={2}><circle cx='11' cy='11' r='7' /><path d='M21 21l-4.3-4.3' /></Svg>
                                    <input type='text' value={q} onChange={(e) => setQ(e.target.value)} placeholder='جست‌وجو در عنوان مقالات…' />
                                </form>
                            </div>
                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon'><Svg sw={1.2}><path d={BOOK} /></Svg></div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ar-list'>
                        <div className='ar-cats' role='tablist'>
                            {CATEGORIES.map((c) => (
                                <button key={c.key} type='button' role='tab' aria-selected={cat === c.key}
                                    className={`ar-cat${cat === c.key ? ' is-active' : ''}`} onClick={() => setCat(c.key)}>{c.t}</button>
                            ))}
                        </div>

                        {list.length === 0 ? (
                            <p className='ar-empty'>مقاله‌ای با این مشخصات پیدا نشد.</p>
                        ) : (
                            <div className='ar-grid'>
                                {featured && (
                                    <Link href={`/articles/${featured.slug}`} className='ar-card ar-card--feat hover-to-background-navy bg-bone border border-1'>
                                        <span className='ar-tag'>{CAT_LABEL[featured.cat]}</span>
                                        <svg className='ar-ico' viewBox='0 0 24 24' aria-hidden><Svg sw={0.9}>{ICONS[featured.cat]}</Svg></svg>
                                        <h2>{featured.title}</h2>
                                        <p>{featured.excerpt}</p>
                                        <div className='ar-meta'><span>{featured.date}</span><i /><span>{featured.read} دقیقه مطالعه</span></div>
                                    </Link>
                                )}
                                {rest.map((a, i) => (
                                    <Reveal key={a.slug} delay={i * 60} className={`ar-cell ar-cell--${a.size}`}>
                                        <Link href={`/articles/${a.slug}`} className='ar-card hover-to-background-navy bg-bone border border-1'>
                                            <span className='ar-tag'>{CAT_LABEL[a.cat]}</span>
                                            <h3>{a.title}</h3>
                                            <p>{a.excerpt}</p>
                                            <div className='ar-meta'><span>{a.date}</span><i /><span>{a.read} دقیقه مطالعه</span></div>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <section className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ar-news'>
                            <div>
                                <span className='ab-eyebrow'>خبرنامه</span>
                                <h2 className='ab-h2'>مقالهٔ تازه، در صندوق ایمیل‌تان</h2>
                                <p className='ab-sub'>این یک متن نمونه است. هر چند وقت یک‌بار، بدون مزاحمت.</p>
                            </div>
                            <form className='ar-news-form' onSubmit={(e) => e.preventDefault()}>
                                <input type='email' required placeholder='ایمیل شما' dir='ltr' />
                                <button type='submit' className='ab-btn ab-btn--gold'>عضویت <span aria-hidden>←</span></button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </MainUserLayout>
    )
}
