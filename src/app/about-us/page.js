'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MainUserLayout from '../layouts/admin/user/MainUserLayout'
import '../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../assets/styles/common/Common.scss'

/* ───────── داده‌ها (همه نمونه‌اند؛ با اطلاعات واقعی جایگزین کن) ───────── */

const POLICIES = [
    { title: 'حق‌مداری', text: 'حفاظت از حقوق موکل در چارچوب قانون و انصاف، بدون مصلحت‌اندیشی.' },
    { title: 'شفافیت', text: 'اطلاع‌رسانی صادقانه از وضعیت پرونده، هزینه‌ها و چشم‌انداز نتیجه.' },
    { title: 'کیفیت', text: 'بررسی چندمرحله‌ای هر پرونده توسط تیمی از متخصصان همان حوزه.' },
    { title: 'پیشگیری', text: 'اولویت با حل‌وفصل مسالمت‌آمیز و پیشگیری از دعوا، پیش از ورود به دادگاه.' },
]

const ETHICS = [
    'رازداری مطلق دربارهٔ اطلاعات و اسناد موکل',
    'پرهیز کامل از تعارض منافع',
    'عدم وعدهٔ نتیجهٔ قطعی به موکل',
    'صداقت در ارائهٔ مشاوره، حتی وقتی خوشایند نیست',
    'رعایت شأن و احترام همهٔ اصحاب دعوا',
    'تعیین شفاف حق‌الوکاله پیش از شروع همکاری',
]

const TEAM = [
    { name: 'امیر غدیری', field: 'حقوق تجارت و شرکت‌ها', edu: 'دکتری حقوق خصوصی، دانشگاه تهران', photo: null },
    { name: 'سارا احمدی', field: 'حقوق خانواده', edu: 'کارشناسی ارشد حقوق خصوصی، دانشگاه شهید بهشتی', photo: null },
    { name: 'مهدی رضایی', field: 'دعاوی کیفری', edu: 'کارشناسی ارشد حقوق جزا و جرم‌شناسی', photo: null },
    { name: 'نگار کریمی', field: 'املاک و ثبت اسناد', edu: 'کارشناسی ارشد حقوق خصوصی', photo: null },
]

const PRINCIPLES = [
    { title: 'استقلال', text: 'وکیل باید مستقل از هر فشار و نفوذی بیندیشد و تصمیم بگیرد. استقلال ما شرط اول دفاع مؤثر از موکل است.' },
    { title: 'امانت‌داری', text: 'اسناد، اسرار و اعتماد موکل امانتی است که با دقت و رازداری حفظ می‌شود.' },
    { title: 'صداقت با موکل', text: 'تصویر واقعی پرونده، با نقاط قوت و ضعف، همیشه پیش از هر تصمیمی با موکل در میان گذاشته می‌شود.' },
    { title: 'احترام به قانون و دادگاه', text: 'دفاع قدرتمند و رفتار محترمانه با هم تعارضی ندارند؛ دفاع ما همیشه در چارچوب قانون است.' },
    { title: 'تخصص و یادگیری مداوم', text: 'قوانین و رویه‌ها تغییر می‌کنند و تیم ما به‌طور مستمر دانش خود را به‌روز نگه می‌دارد.' },
]

const REASONS = [
    { title: 'تخصص در چند حوزه', text: 'از خانواده تا تجارت، هر پرونده به متخصص همان حوزه سپرده می‌شود.', icon: <path d='M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zm14 0l-3 7a3.5 3.5 0 0 0 6 0l-3-7z' /> },
    { title: 'پاسخگویی سریع', text: 'پاسخ به تماس‌ها و پیام‌ها در کوتاه‌ترین زمان ممکن.', icon: <><circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' /></> },
    { title: 'شفافیت در هزینه', text: 'حق‌الوکاله و مراحل کار از همان ابتدا روشن و مکتوب است.', icon: <path d='M6 3h9l4 4v14H6V3zm3 8h7M9 15h7' /> },
    { title: 'رویکرد صلح‌محور', text: 'در صورت امکان، راه توافق را پیش از دعوای طولانی امتحان می‌کنیم.', icon: <><circle cx='9' cy='8' r='3' /><path d='M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6' /><circle cx='17' cy='9' r='2.5' /><path d='M17 14c2.5 0 4 1.8 4 4' /></> },
    { title: 'گزارش‌دهی منظم', text: 'موکل همیشه از آخرین وضعیت پرونده خود مطلع است.', icon: <path d='M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z' /> },
    { title: 'محرمانگی کامل', text: 'اطلاعات موکل با بالاترین سطح رازداری نگهداری می‌شود.', icon: <><rect x='5' y='11' width='14' height='9' rx='2' /><path d='M8 11V8a4 4 0 0 1 8 0v3' /></> },
]

const CASES = [
    { tag: 'دعاوی اداری و مالیاتی', title: 'اعتراض به برگ تشخیص مالیات', result: 'کاهش جریمه', stat: { v: '۷۰٪', u: 'کاهش جریمه' }, text: 'لایحهٔ اعتراض در مهلت قانونی و دفاع در هیئت حل اختلاف.' },
    { tag: 'حقوق خانواده', title: 'توافق در پرونده مهریه و حضانت', result: 'صلح و سازش', text: 'مذاکرهٔ حضوری با حضور وکلا و ثبت توافق‌نامه در دادگاه.' },
    { tag: 'املاک و ثبت اسناد', title: 'رفع تصرف ملک تجاری', result: 'رفع تصرف', text: 'اثبات مالکیت با اسناد رسمی و پیگیری سریع اجرای حکم.' },
]

const REVIEWS = [
    { text: 'از همان جلسهٔ اول مسیر پرونده برایم روشن شد. صداقت و پیگیری تیم واقعاً ستودنی بود.', name: 'م. ر.', kind: 'موکل پرونده حقوق خانواده' },
    { text: 'به‌جای وعده‌های بزرگ، تصویر واقعی پرونده را گفتند. همین باعث اعتمادم شد.', name: 'ع. ک.', kind: 'موکل پرونده ملکی' },
    { text: 'شرکت ما در یک اختلاف پیچیده گیر کرده بود و با راهکار غیرقضایی همه چیز حل شد.', name: 'ش. ن.', kind: 'موکل پرونده تجاری' },
]

const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵', '۰۶']

/* ───────── اجزای کمکی ───────── */

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>
        {children}
    </svg>
)

function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                el.classList.add('ab-in')
                io.disconnect()
            }
        }, { threshold: 0.12 })
        io.observe(el)
        return () => io.disconnect()
    }, [])
    return (
        <div ref={ref} className={`ab-reveal ${className}`} style={{ '--d': `${delay}ms` }}>
            {children}
        </div>
    )
}

function Head({ eyebrow, title, sub, center = true }) {
    return (
        <Reveal className={`ab-head${center ? ' ab-head--center' : ''}`}>
            <span className='ab-eyebrow'>{eyebrow}</span>
            <h2 className='ab-h2'>{title}</h2>
            {sub && <p className='ab-sub'>{sub}</p>}
        </Reveal>
    )
}

function Avatar({ m }) {
    const initials = m.name.split(' ').map((p) => p[0]).slice(0, 2).join('\u200c')
    return (
        <div className='ab-avatar'>
            <span className='ab-avatar-blob' />
            <div className='ab-avatar-frame'>
                {m.photo ? (
                    <Image src={m.photo} alt={m.name} width={320} height={320} className='ab-photo' />
                ) : (
                    <span className='ab-initials'>{initials}</span>
                )}
            </div>
        </div>
    )
}

const Stars = () => (
    <div className='ab-stars' aria-label='۵ از ۵'>
        {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox='0 0 24 24'>
                <path d='M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z' />
            </svg>
        ))}
    </div>
)

/* ───────── صفحه ───────── */

export default function UserAboutPage() {
    const [open, setOpen] = useState(0)

    return (
        <MainUserLayout>
            <div className='ab main-user-layout' dir='rtl'>
                {/* ── هدر ── */}
                <section className='ab-panel ab-panel--navy ab-hero radius-md'>
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='ab-hero-grid'>
                        <div>
                            <nav className='ab-crumb' aria-label='مسیر'>
                                <Link href='/'>خانه</Link> <span>/</span> <span>درباره ما</span>
                            </nav>
                            <h1 className='ab-h1'>گروه حقوقی غدیری</h1>
                            <p className='ab-lead'>
                                این یک متن نمونه است. معرفی کوتاهی از دفتر، سابقه، و اینکه چه کسانی هستید و برای چه ارزش‌هایی کار می‌کنید.
                            </p>
                            <div className='ab-keys'>
                                <span>حق</span><i /><span>امانت</span><i /><span>تخصص</span>
                            </div>
                        </div>

                        <div className='ab-hero-art' aria-hidden>
                            <svg className='ab-ring' viewBox='0 0 200 200'>
                                <circle cx='100' cy='100' r='94' />
                            </svg>
                            <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'>
                                <circle cx='100' cy='100' r='72' />
                            </svg>
                            <div className='ab-hero-icon'>
                                <Svg sw={1.2}>
                                    <path d='M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zm14 0l-3 7a3.5 3.5 0 0 0 6 0l-3-7z' />
                                </Svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── خط مشی ── */}
                <section className='ab-panel ab-panel--bone radius-md'>
                    <span className='ab-blob ab-blob--gold' />
                    <div className='ab-split'>
                        <Head center={false} eyebrow='خط مشی' title='خط مشی گروه حقوقی غدیری' sub='این یک متن نمونه است. اصولی که مسیر کار ما را در هر پرونده تعیین می‌کند.' />
                        <div className='ab-list'>
                            {POLICIES.map((p, i) => (
                                <Reveal key={p.title} delay={i * 90}>
                                    <div className='ab-policy'>
                                        <span className='ab-num'>{DIGITS[i]}</span>
                                        <div>
                                            <div className='fw-bold fs-5 mb-1'>{p.title}</div>
                                            <div className='ab-text'>{p.text}</div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── ضوابط اخلاقی ── */}
                <section className='ab-panel ab-panel--navy radius-md'>
                    <span className='ab-blob ab-blob--2' />
                    <Head eyebrow='ضوابط اخلاقی' title='تعهدات اخلاقی ما' sub='این یک متن نمونه است. چارچوبی که هر عضو تیم به آن پایبند است.' />
                    <div className='ab-grid ab-grid--2'>
                        {ETHICS.map((e, i) => (
                            <Reveal key={e} delay={i * 70}>
                                <div className='ab-pledge'>
                                    <span className='ab-check'><Svg sw={2.2}><path d='M5 12l5 5L20 7' /></Svg></span>
                                    <span>{e}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal>
                        <blockquote className='ab-oath'>
                            <span aria-hidden>“</span>
                            وکالت، امانتی است که با رازداری و صداقت حفظ می‌شود.
                        </blockquote>
                    </Reveal>
                </section>

                {/* ── تیم حقوقی ── */}
                <section className='ab-bare'>
                    <Head eyebrow='تیم حقوقی' title='آشنایی با همکاران ما' sub='این یک متن نمونه است. متخصصانی که پرونده شما را به عهده می‌گیرند.' />
                    <div className='ab-grid ab-grid--4'>
                        {TEAM.map((m, i) => (
                            <Reveal key={m.name} delay={i * 90}>
                                <article className='ab-card ab-card--bone ab-member'>
                                    <Avatar m={m} />
                                    <div className='fw-bold fs-5 mb-2'>{m.name}</div>
                                    <span className='ab-pill'>{m.field}</span>
                                    <div className='ab-edu'>
                                        <Svg><path d='M2 9l10-5 10 5-10 5L2 9zm5 3v5c0 1 2.2 2 5 2s5-1 5-2v-5' /></Svg>
                                        <span>{m.edu}</span>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── اصول وکالت ── */}
                <section className='ab-panel ab-panel--gold radius-md'>
                    <span className='ab-blob ab-blob--white' />
                    <div className='ab-split ab-split--acc'>
                        <div className='ab-acc-side'>
                            <Head center={false} eyebrow='اصول وکالت' title='اصولی که وکالت را معنا می‌دهد' sub='این یک متن نمونه است.' />
                            <div className='ab-bignum' key={open} aria-hidden>{DIGITS[open]}</div>
                        </div>

                        <div className='ab-acc'>
                            {PRINCIPLES.map((p, i) => (
                                <div key={p.title} className={`ab-acc-item${open === i ? ' is-open' : ''}`}>
                                    <button type='button' className='ab-acc-btn' onClick={() => setOpen(i)} aria-expanded={open === i}>
                                        <span className='ab-acc-n'>{DIGITS[i]}</span>
                                        <span className='ab-acc-t'>{p.title}</span>
                                        <span className='ab-acc-i' aria-hidden><Svg sw={2}><path d='M12 5v14M5 12h14' /></Svg></span>
                                    </button>
                                    <div className='ab-acc-body'>
                                        <div><p>{p.text}</p></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── چرا غدیری ── */}
                <section className='ab-panel ab-panel--navy radius-md'>
                    <span className='ab-blob ab-blob--1' />
                    <Head eyebrow='چرا غدیری' title='چرا گروه حقوقی غدیری؟' sub='این یک متن نمونه است. دلایلی که موکلان ما را انتخاب می‌کنند.' />
                    <div className='ab-grid ab-grid--3'>
                        {REASONS.map((r, i) => (
                            <Reveal key={r.title} delay={i * 80}>
                                <article className='ab-card ab-card--glass ab-reason'>
                                    <span className='ab-reason-ico'><Svg>{r.icon}</Svg></span>
                                    <div className='fw-bold fs-5 mb-2'>{r.title}</div>
                                    <div className='ab-text'>{r.text}</div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── نمونه پرونده‌ها ── */}
                <section className='ab-bare'>
                    <Head eyebrow='نمونه پرونده‌ها' title='گزیده‌ای از پرونده‌های موفق' sub='اطلاعات موکلان محرمانه است و فقط نوع دعوا و روش حل نمایش داده می‌شود.' />
                    <div className='ab-grid ab-grid--3'>
                        {CASES.map((c, i) => (
                            <Reveal key={c.title} delay={i * 90}>
                                <article className={`ab-card ab-case ${i === 0 ? 'ab-card--navy' : 'ab-card--bone'}`}>
                                    <div className='d-flex justify-content-between align-items-center gap-2 mb-3'>
                                        <span className='ab-tag'>{c.tag}</span>
                                        <span className='ab-result'>{c.result}</span>
                                    </div>
                                    {c.stat && (
                                        <>
                                            <div className='ab-stat'>{c.stat.v}</div>
                                            <div className='ab-stat-u'>{c.stat.u}</div>
                                        </>
                                    )}
                                    <div className='fw-bold fs-5 mb-2'>{c.title}</div>
                                    <div className='ab-text mb-3'>{c.text}</div>
                                    <Link href='#' className='ab-more'>مشاهده جزئیات <span aria-hidden>←</span></Link>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal className='text-center mt-4'>
                        <Link href='#' className='ab-btn'>مشاهده همهٔ پرونده‌ها <span aria-hidden>←</span></Link>
                    </Reveal>
                </section>

                {/* ── نظرات موکلین ── */}
                <section className='ab-panel ab-panel--gold radius-md'>
                    <span className='ab-blob ab-blob--white' />
                    <Head eyebrow='نظرات موکلین' title='آنچه موکلان ما می‌گویند' sub='این یک متن نمونه است.' />
                    <div className='ab-grid ab-grid--3 ab-reviews'>
                        {REVIEWS.map((r, i) => (
                            <Reveal key={r.name} delay={i * 100}>
                                <figure className='ab-card ab-card--frost ab-review'>
                                    <span className='ab-qm' aria-hidden>“</span>
                                    <Stars />
                                    <blockquote>{r.text}</blockquote>
                                    <figcaption>
                                        <span className='ab-rv-av'>{r.name}</span>
                                        <span>
                                            <b>موکل محترم</b>
                                            <small>{r.kind}</small>
                                        </span>
                                    </figcaption>
                                </figure>
                            </Reveal>
                        ))}
                    </div>
                </section>
            </div>
        </MainUserLayout>)
}