'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import '../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../assets/styles/common/Common.scss'
import '../assets/styles/views/user/faqs/Faqs.scss'
import MainUserLayout from '../layouts/admin/user/MainUserLayout'

const CATEGORIES = [
    { key: 'all', t: 'همه' },
    { key: 'general', t: 'کلی' },
    { key: 'fees', t: 'هزینه‌ها' },
    { key: 'process', t: 'مراحل کار' },
    { key: 'family', t: 'خانواده' },
    { key: 'criminal', t: 'کیفری' },
    { key: 'business', t: 'تجارت' },
    { key: 'real-estate', t: 'املاک' },
    { key: 'contracts', t: 'قراردادها' },
    { key: 'tax', t: 'اداری و مالیاتی' },
]

const FAQS = [
    { id: 'q1', cat: 'general', q: 'جلسهٔ مشاورهٔ اول چگونه است؟', a: 'این یک متن نمونه است. جلسهٔ اول برای شنیدن ماجرای شماست و مسیرهای ممکن به‌صورت واقع‌بینانه توضیح داده می‌شود.' },
    { id: 'q2', cat: 'fees', q: 'حق‌الوکاله چگونه محاسبه می‌شود؟', a: 'این یک متن نمونه است. بسته به نوع و مرحلهٔ پرونده، پیش از شروع همکاری به‌صورت مکتوب و شفاف اعلام می‌شود.' },
    { id: 'q3', cat: 'fees', q: 'آیا هزینهٔ مشاورهٔ اول رایگان است؟', a: 'این یک متن نمونه است. جزئیات رایگان یا غیررایگان بودن جلسهٔ اول باید اینجا مشخص شود.' },
    { id: 'q4', cat: 'process', q: 'وضعیت پرونده‌ام را چگونه پیگیری کنم؟', a: 'این یک متن نمونه است. پس از هر اقدام مهم، گزارش کوتاهی از طریق تماس یا پیام برای شما ارسال می‌شود.' },
    { id: 'q5', cat: 'process', q: 'رسیدگی به یک پرونده معمولاً چقدر طول می‌کشد؟', a: 'این یک متن نمونه است. بسته به نوع دعوا و حجم دادگاه‌ها متفاوت است؛ در جلسهٔ اول برآورد نزدیک‌تری می‌دهیم.' },
    { id: 'q6', cat: 'family', q: 'طلاق توافقی چقدر طول می‌کشد؟', a: 'این یک متن نمونه است. در صورت توافق کامل طرفین، معمولاً سریع‌تر از مسیر قضایی به نتیجه می‌رسد.' },
    { id: 'q7', cat: 'family', q: 'حضانت فرزند بر چه اساسی تعیین می‌شود؟', a: 'این یک متن نمونه است. معیار اصلی، مصلحت کودک است، نه صرفاً خواستهٔ یکی از والدین.' },
    { id: 'q8', cat: 'criminal', q: 'اگر بازداشت شده باشم چطور با شما تماس بگیرم؟', a: 'این یک متن نمونه است. خانواده یا خود شما می‌توانید از طریق خط تماس فوری با ما در ارتباط باشید.' },
    { id: 'q9', cat: 'criminal', q: 'آیا باید در بازجویی بدون وکیل صحبت کنم؟', a: 'این یک متن نمونه است. حق دارید تا حضور وکیل سکوت کنید؛ این حق شماست، نه نشانهٔ گناهکاری.' },
    { id: 'q10', cat: 'business', q: 'کدام نوع شرکت برای کسب‌وکار من مناسب‌تر است؟', a: 'این یک متن نمونه است. بسته به تعداد شرکا، نیاز به سرمایه‌گذار و نوع فعالیت پیشنهاد می‌دهیم.' },
    { id: 'q11', cat: 'business', q: 'اختلاف با شریک را می‌شود بدون دادگاه حل کرد؟', a: 'این یک متن نمونه است. در بسیاری از موارد، میانجی‌گری و مذاکره پیش از طرح دعوا نتیجه می‌دهد.' },
    { id: 'q12', cat: 'real-estate', q: 'بدون سند رسمی هم می‌توان دعوا کرد؟', a: 'این یک متن نمونه است. بله، با مستنداتی مانند مبایعه‌نامه و شهادت شهود امکان اثبات حق وجود دارد.' },
    { id: 'q13', cat: 'real-estate', q: 'رفع تصرف چقدر طول می‌کشد؟', a: 'این یک متن نمونه است. بسته به نوع پرونده و دادگاه رسیدگی‌کننده متفاوت است.' },
    { id: 'q14', cat: 'contracts', q: 'فقط بازبینی قرارداد آماده را هم انجام می‌دهید؟', a: 'این یک متن نمونه است. بله، بازبینی و پیشنهاد اصلاح روی قراردادی که خودتان دارید هم ممکن است.' },
    { id: 'q15', cat: 'contracts', q: 'بازبینی یک قرارداد چقدر طول می‌کشد؟', a: 'این یک متن نمونه است. بسته به حجم و پیچیدگی قرارداد، معمولاً چند روز کاری.' },
    { id: 'q16', cat: 'tax', q: 'اگر مهلت اعتراض گذشته باشد چه؟', a: 'این یک متن نمونه است. در برخی موارد راه‌های استثنایی برای طرح مجدد وجود دارد؛ در جلسهٔ اول بررسی می‌کنیم.' },
    { id: 'q17', cat: 'tax', q: 'آیا حضور خودم در جلسات هیئت لازم است؟', a: 'این یک متن نمونه است. معمولاً با وکالت‌نامه، دفاع بدون حضور مستقیم شما هم ممکن است.' },
]

const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵', '۰۶', '۰۷', '۰۸', '۰۹', '۱۰', '۱۱', '۱۲', '۱۳', '۱۴', '۱۵', '۱۶', '۱۷']
const CAT_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.t]))

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)
const Q_MARK = 'M9 9a3 3 0 1 1 4 2.8c-.8.4-1.3 1.1-1.3 2.2 M12 17.5h.01'

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

function FaqItem({ item, index, isOpen, onToggle }) {
    const [vote, setVote] = useState(null)
    return (
        <Reveal delay={index * 40} className='fq-item-wrap'>
            <div className={`fq-item${isOpen ? ' is-open' : ''}`}>
                <button type='button' className='fq-q' onClick={onToggle} aria-expanded={isOpen}>
                    <span className='fq-n'>{DIGITS[index % DIGITS.length]}</span>
                    <span className='fq-q-t'>{item.q}</span>
                    <span className='fq-cat'>{CAT_LABEL[item.cat]}</span>
                    <span className='fq-plus' aria-hidden><Svg sw={2.4}><path d='M12 5v14M5 12h14' /></Svg></span>
                </button>
                <div className='fq-a'>
                    <div>
                        <p>{item.a}</p>
                        <div className='fq-vote'>
                            {vote ? (
                                <span className='fq-vote-thanks'>ممنون از بازخورد شما 🙌</span>
                            ) : (
                                <>
                                    <span>این پاسخ کمک‌کننده بود؟</span>
                                    <button type='button' onClick={() => setVote('up')} aria-label='بله کمک‌کننده بود'><Svg sw={2.2}><path d='M7 11v9H4v-9h3zm0 0 4-8a2 2 0 0 1 2 2v4h4.5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.3 20H7' /></Svg></button>
                                    <button type='button' onClick={() => setVote('down')} aria-label='خیر کمک‌کننده نبود'><Svg sw={2.2}><path d='M17 13V4h3v9h-3zm0 0-4 8a2 2 0 0 1-2-2v-4H6.5a2 2 0 0 1-2-2.3l1.2-6A2 2 0 0 1 7.7 4H17' /></Svg></button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>
    )
}

export default function UserFaqPage() {
    const [cat, setCat] = useState('all')
    const [q, setQ] = useState('')
    const [openIds, setOpenIds] = useState(() => new Set())

    const list = useMemo(() => {
        return FAQS.filter((f) => (cat === 'all' || f.cat === cat) && f.q.includes(q.trim()))
    }, [cat, q])

    const toggle = (id) => setOpenIds((s) => {
        const next = new Set(s)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
    })

    return (
        <MainUserLayout>
            <div className='ab fq' dir='rtl'>
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <span>سؤالات متداول</span>
                                </nav>
                                <span className='ab-badge'><i /> پاسخ به سؤالاتی که بیشتر می‌پرسید</span>
                                <h1 className='ab-h1'>قبل از تماس، <em>شاید اینجا باشد</em></h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. دسته‌بندی کنید یا جست‌وجو کنید؛ اگر جواب را پیدا نکردید، همیشه می‌توانید مستقیم با ما تماس بگیرید.
                                </p>
                                <form className='fq-search' role='search' onSubmit={(e) => e.preventDefault()}>
                                    <Svg sw={2}><circle cx='11' cy='11' r='7' /><path d='M21 21l-4.3-4.3' /></Svg>
                                    <input type='text' value={q} onChange={(e) => setQ(e.target.value)} placeholder='جست‌وجو در سؤالات…' />
                                </form>
                            </div>
                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon'><Svg sw={1.2}><path d={Q_MARK} /></Svg></div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ab-panel ab-panel--bone radius-md fq-sec'>
                        <span className='ab-blob ab-blob--gold' />
                        <div className='fq-cats' role='tablist'>
                            {CATEGORIES.map((c) => (
                                <button key={c.key} type='button' role='tab' aria-selected={cat === c.key}
                                    className={`fq-cat-btn${cat === c.key ? ' is-active' : ''}`} onClick={() => setCat(c.key)}>{c.t}</button>
                            ))}
                        </div>

                        {list.length === 0 ? (
                            <p className='fq-empty'>سؤالی با این مشخصات پیدا نشد؛ می‌توانید مستقیم از ما بپرسید.</p>
                        ) : (
                            <div className='fq-list'>
                                {list.map((item, i) => (
                                    <FaqItem key={item.id} item={item} index={i} isOpen={openIds.has(item.id)} onToggle={() => toggle(item.id)} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <div className='main-user-layout'>
                    <section className='ab-bare fq-end'>
                        <Reveal className='text-center'>
                            <h2 className='ab-h2'>سؤالتان اینجا نبود؟</h2>
                            <p className='ab-sub mb-4'>مستقیم برایمان بنویسید؛ خیلی زود جواب می‌گیرید.</p>
                            <Link href='/contact' className='ab-btn'>تماس با ما <span aria-hidden>←</span></Link>
                        </Reveal>
                    </section>
                </div>
            </div>
        </MainUserLayout>
    )
}
