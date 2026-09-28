'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../assets/styles/common/Common.scss'
import MainUserLayout from '../layouts/admin/user/MainUserLayout'

/* ───────── داده‌ها (همه نمونه‌اند؛ با اطلاعات واقعی جایگزین کن) ───────── */

const POLICIES = [
    {
        title: 'حق‌مداری',
        short: 'حفاظت از حقوق موکل در چارچوب قانون و انصاف.',
        heading: 'دفاع از حق، تنها در چارچوب قانون',
        text: 'این یک متن نمونه است. هر پرونده با این پرسش آغاز می‌شود که حق موکل چیست و چگونه می‌توان آن را قانونی و مؤثر مطالبه کرد.',
        points: ['بررسی دقیق مستندات پیش از هر اقدام', 'دفاع از منافع موکل بدون تعارض منافع', 'پرهیز از هر اقدام خارج از چارچوب قانون'],
        practice: 'پیش از ورود به دادگاه، نقاط قوت و ضعف پرونده به‌صورت مکتوب با موکل مرور می‌شود.',
        icon: <path d='M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zm14 0l-3 7a3.5 3.5 0 0 0 6 0l-3-7z' />,
    },
    {
        title: 'شفافیت',
        short: 'اطلاع‌رسانی صادقانه از وضعیت پرونده، هزینه‌ها و نتیجه.',
        heading: 'روشن بودن همهٔ مراحل برای موکل',
        text: 'این یک متن نمونه است. موکل باید در هر لحظه بداند پرونده‌اش در چه مرحله‌ای است، چه هزینه‌ای دارد و چه انتظاری واقع‌بینانه است.',
        points: ['قرارداد مکتوب و حق‌الوکاله روشن از ابتدا', 'گزارش‌دهی منظم از روند پرونده', 'بیان واقع‌بینانهٔ احتمال نتیجه، بدون وعدهٔ قطعی'],
        practice: 'پس از هر جلسه یا اقدام مهم، خلاصهٔ آن برای موکل ارسال می‌شود.',
        icon: <><path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z' /><circle cx='12' cy='12' r='3' /></>,
    },
    {
        title: 'کیفیت',
        short: 'بررسی چندمرحله‌ای هر پرونده توسط متخصص همان حوزه.',
        heading: 'دقت، پیش از سرعت',
        text: 'این یک متن نمونه است. هر لایحه و هر اقدام حقوقی پیش از ارسال، مورد بازبینی همکاران متخصص قرار می‌گیرد.',
        points: ['سپردن پرونده به متخصص همان حوزه', 'بازبینی لوایح توسط یک وکیل دوم', 'به‌روزرسانی مستمر بر اساس رویه‌های قضایی'],
        practice: 'هیچ لایحه‌ای بدون بازبینی مستقل از دفتر خارج نمی‌شود.',
        icon: <path d='M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z' />,
    },
    {
        title: 'پیشگیری',
        short: 'اولویت با حل‌وفصل مسالمت‌آمیز و پیشگیری از دعوا.',
        heading: 'بهترین دعوا، دعوایی است که پیش نیاید',
        text: 'این یک متن نمونه است. بسیاری از اختلافات با مشاورهٔ به‌موقع و قرارداد دقیق قابل پیشگیری یا حل‌وفصل غیرقضایی است.',
        points: ['مشاوره پیش از امضای قرارداد و معامله', 'مذاکره و میانجی‌گری پیش از طرح دعوا', 'ورود به دادگاه فقط در صورت ضرورت'],
        practice: 'در نخستین جلسه، راه‌های غیرقضایی حل اختلاف هم بررسی و پیشنهاد می‌شود.',
        icon: <><path d='M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z' /><path d='M9 12l2 2 4-4' /></>,
    },
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

// اعداد نمونه‌اند؛ با آمار واقعی دفتر جایگزین کن
const STATS = [
    { to: 15, suffix: '+', label: 'سال تجربهٔ حرفه‌ای' },
    { to: 500, suffix: '+', label: 'پرونده به نتیجه رسیده' },
    { to: 12, suffix: '', label: 'وکیل و مشاور متخصص' },
    { to: 6, suffix: '', label: 'حوزهٔ تخصصی' },
]

const CHIPS = [
    { t: 'حقوق خانواده', s: { top: '6%', right: '2%', '--fd': '0s' } },
    { t: 'دعاوی کیفری', s: { top: '32%', left: '-3%', '--fd': '-2s' } },
    { t: 'حقوق تجارت', s: { bottom: '24%', right: '-4%', '--fd': '-4s' } },
    { t: 'املاک و ثبت', s: { bottom: '3%', left: '8%', '--fd': '-1s' } },
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

function Counter({ to, suffix = '' }) {
    const ref = useRef(null)
    const [v, setV] = useState(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setV(to)
            return
        }
        let raf
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return
            io.disconnect()
            const t0 = performance.now()
            const dur = 1600
            const tick = (t) => {
                const p = Math.min((t - t0) / dur, 1)
                setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
                if (p < 1) raf = requestAnimationFrame(tick)
            }
            raf = requestAnimationFrame(tick)
        }, { threshold: 0.4 })
        io.observe(el)
        return () => {
            io.disconnect()
            cancelAnimationFrame(raf)
        }
    }, [to])

    return (
        <span ref={ref} dir='ltr'>
            {v.toLocaleString('fa-IR')}
            {suffix}
        </span>
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
    const [pol, setPol] = useState(0)
    const P = POLICIES[pol]

    return (
        <MainUserLayout>
            <div className='ab' dir='rtl'>
                {/* ══ هدر (تمام‌عرض) ══ */}
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />

                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <span>درباره ما</span>
                                </nav>

                                <span className='ab-badge'>
                                    <i /> وکالت با تخصص، صداقت و امانت‌داری
                                </span>

                                <h1 className='ab-h1'>
                                    گروه حقوقی <em>غدیری</em>
                                </h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. معرفی کوتاهی از دفتر، سابقه، و اینکه چه کسانی هستید و برای چه ارزش‌هایی کار می‌کنید.
                                </p>

                                <div className='ab-actions'>
                                    <Link href='#' className='ab-btn ab-btn--gold'>
                                        با ما تماس بگیرید <span aria-hidden>←</span>
                                    </Link>
                                    <a href='#team' className='ab-btn ab-btn--ghost'>آشنایی با تیم</a>
                                </div>

                                <div className='ab-keys'>
                                    <span>حق</span><i /><span>امانت</span><i /><span>تخصص</span>
                                </div>
                            </div>

                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon'>
                                    <Svg sw={1.2}>
                                        <path d='M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zm14 0l-3 7a3.5 3.5 0 0 0 6 0l-3-7z' />
                                    </Svg>
                                </div>
                                {CHIPS.map((c) => (
                                    <span key={c.t} className='ab-chip' style={c.s}>
                                        <i /> {c.t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='ab-stats'>
                            {STATS.map((s, i) => (
                                <Reveal key={s.label} delay={i * 90}>
                                    <div className='ab-sc'>
                                        <div className='ab-sc-v'><Counter to={s.to} suffix={s.suffix} /></div>
                                        <div className='ab-sc-l'>{s.label}</div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ خط مشی (داخل main-user-layout) ══ */}
                <div className='main-user-layout'>
                    <section className='ab-panel ab-panel--bone radius-md'>
                        <span className='ab-blob ab-blob--gold' />
                        <Head center={false} eyebrow='خط مشی' title='خط مشی گروه حقوقی غدیری' sub='این یک متن نمونه است. روی هر مورد کلیک کن تا جزئیاتش را ببینی.' />

                        <div className='ab-pol'>
                            <div className='ab-pol-list'>
                                {POLICIES.map((p, i) => (
                                    <Reveal key={p.title} delay={i * 80}>
                                        <button
                                            type='button'
                                            className={`ab-pol-item${pol === i ? ' is-active' : ''}`}
                                            onClick={() => setPol(i)}
                                            aria-pressed={pol === i}
                                        >
                                            <span className='ab-pol-n'>{DIGITS[i]}</span>
                                            <span className='ab-pol-txt'>
                                                <b>{p.title}</b>
                                                <small>{p.short}</small>
                                            </span>
                                            <span className='ab-pol-arrow' aria-hidden>
                                                <Svg sw={2}><path d='M15 6l-6 6 6 6' /></Svg>
                                            </span>
                                        </button>
                                    </Reveal>
                                ))}
                            </div>

                            <div className='ab-pol-detail' aria-live='polite'>
                                <span className='ab-pol-ring' aria-hidden />
                                <div className='ab-pol-content' key={pol}>
                                    <span className='ab-pol-big' aria-hidden>{DIGITS[pol]}</span>
                                    <div className='ab-pol-head'>
                                        <span className='ab-pol-ico'><Svg>{P.icon}</Svg></span>
                                        <span className='ab-pol-kicker'>{P.title}</span>
                                    </div>
                                    <h3 className='ab-pol-h'>{P.heading}</h3>
                                    <p className='ab-pol-p'>{P.text}</p>
                                    <ul className='ab-pol-points'>
                                        {P.points.map((pt) => (
                                            <li key={pt}>
                                                <span><Svg sw={2.4}><path d='M5 12l5 5L20 7' /></Svg></span>
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className='ab-pol-practice'>
                                        <b>در عمل</b>
                                        {P.practice}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* ══ تعهدات اخلاقی (تمام‌عرض) ══ */}
                <section className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--2' />
                    <span className='ab-blob ab-blob--1' />
                    <div className='main-user-layout ab-inner'>
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
                    </div>
                </section>

                {/* ══ تیم حقوقی ══ */}
                <div className='main-user-layout'>
                    <section id='team' className='ab-bare'>
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
                </div>

                {/* ══ اصول وکالت ══ */}
                <div className='main-user-layout'>
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
                </div>

                {/* ══ چرا غدیری (تمام‌عرض) ══ */}
                <section className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
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
                    </div>
                </section>

                {/* ══ نمونه پرونده‌ها ══ */}
                <div className='main-user-layout'>
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
                </div>

                {/* ══ نظرات موکلین ══ */}
                <div className='main-user-layout'>
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
            </div>
        </MainUserLayout>
    )
}