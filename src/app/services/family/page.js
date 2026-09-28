'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/FamilyServices.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'

/* ───────── داده‌ها (نمونه‌اند؛ با اطلاعات واقعی جایگزین کن) ───────── */
const SITUATIONS = [
    { t: 'طلاق', text: 'چه توافقی باشد چه قضایی، اول مسیر و هزینه‌ها را روشن می‌کنیم و بعد تصمیم می‌گیریم.',
      does: ['بررسی امکان توافق و تنظیم توافق‌نامه', 'ثبت دادخواست و دفاع در دادگاه خانواده', 'تعیین تکلیف مهریه، نفقه و حضانت در همان پرونده'], time: 'توافقی: حدود ۱ تا ۳ ماه · قضایی: بسته به پرونده' },
    { t: 'مهریه', text: 'مطالبهٔ مهریه با نگاه به توان پرداخت طرف مقابل و راهکارهای قانونی مانند تقسیط.',
      does: ['محاسبهٔ مهریه و نوع مطالبه (عندالمطالبه یا عندالاستطاعه)', 'شناسایی اموال قابل توقیف', 'مذاکره برای تقسیط یا توافق پیش از اجرا'], time: 'از چند هفته تا چند ماه' },
    { t: 'حضانت', text: 'در پرونده‌ی فرزندان، معیار اصلی مصلحت کودک است، نه برنده شدن یکی از والدین.',
      does: ['تنظیم برنامهٔ ملاقات مکتوب', 'اثبات صلاحیت و شرایط نگهداری', 'اصلاح ترتیبات حضانت با تغییر شرایط'], time: 'معمولاً چند ماه' },
    { t: 'نفقه', text: 'نفقهٔ همسر و فرزندان حق قانونی است و راه مطالبهٔ آن با اسناد درست کوتاه‌تر می‌شود.',
      does: ['اثبات استحقاق و تعیین میزان نفقه', 'مطالبهٔ نفقهٔ معوقه', 'پیگیری اجرا و توقیف حقوق یا حساب'], time: 'از چند هفته تا چند ماه' },
    { t: 'ارث', text: 'تقسیم ترکه با اسناد روشن و گفتگو، پیش از اینکه اختلاف خانوادگی به دادگاه بکشد.',
      does: ['صدور گواهی حصر وراثت', 'تقسیم عادلانهٔ ترکه و مذاکره میان وراث', 'رسیدگی به وصیت‌نامه و اختلافات آن'], time: 'بسته به تعداد وراث و اموال' },
]

const PATHS = {
    agree: { label: 'توافقی', sum: 'دو طرف با هم به نتیجه می‌رسند و دادگاه فقط آن را ثبت می‌کند.',
        steps: [['جلسهٔ مشاوره', 'مرور وضعیت و اهداف هر دو طرف'], ['مذاکره', 'نوشتن پیش‌نویس توافق‌نامه'], ['ثبت در دادگاه', 'تأیید و صدور گواهی']],
        meter: { 'سرعت': 85, 'آرامش': 90, 'هزینه‌ی کمتر': 80 } },
    court: { label: 'قضایی', sum: 'وقتی توافق ممکن نیست، دفاع مستند و قدم‌به‌قدم ادامه پیدا می‌کند.',
        steps: [['ثبت دادخواست', 'جمع‌آوری مدارک و تنظیم دادخواست'], ['جلسات دادگاه', 'لایحه، دفاع و احتمالاً داوری'], ['صدور رأی', 'بررسی رأی و امکان تجدیدنظر'], ['اجرای رأی', 'پیگیری تا رسیدن به حق']],
        meter: { 'سرعت': 40, 'آرامش': 45, 'هزینه‌ی کمتر': 40 } },
}

const DOCS = ['شناسنامه و کارت ملی زوجین', 'سند ازدواج (عقدنامه)', 'مدارک درآمد و دارایی', 'مدارک مربوط به فرزندان', 'سوابق پرداخت مهریه یا نفقه', 'پیام‌ها و مکاتبات مرتبط']

const FAQ = [
    ['اولین جلسه چقدر طول می‌کشد و محرمانه است؟', 'این یک متن نمونه است. جلسهٔ اول برای شنیدن ماجرای شماست و همهٔ گفته‌ها نزد ما محرمانه می‌ماند.'],
    ['آیا حتماً باید به دادگاه رفت؟', 'این یک متن نمونه است. در بسیاری از پرونده‌ها ابتدا مسیر توافق بررسی می‌شود و دادگاه آخرین گزینه است.'],
    ['حق‌الوکاله چگونه مشخص می‌شود؟', 'این یک متن نمونه است. پیش از شروع، مبلغ و مراحل به‌صورت مکتوب اعلام می‌شود.'],
    ['وضعیت پرونده را چگونه پیگیری کنم؟', 'این یک متن نمونه است. پس از هر اقدام مهم، گزارش کوتاهی برای شما ارسال می‌شود.'],
]

const CHIPS = [
    { t: 'مهریه', s: { top: '8%', right: '0%', '--fd': '0s' } },
    { t: 'حضانت', s: { top: '40%', left: '-4%', '--fd': '-2s' } },
    { t: 'طلاق توافقی', s: { bottom: '8%', right: '4%', '--fd': '-3s' } },
]
const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵']

/* ───────── اجزای کمکی ───────── */
const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)
const HEART = 'M12 21C5 16 3 12 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 12 19 16 12 21z'

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

/* ───────── صفحه ───────── */
export default function UserFamilyPage() {
    const [sit, setSit] = useState(0)
    const [path, setPath] = useState('agree')
    const [checked, setChecked] = useState([])
    const [open, setOpen] = useState(0)
    const S = SITUATIONS[sit]
    const P = PATHS[path]
    const pct = Math.round((checked.length / DOCS.length) * 100)
    const toggle = (d) => setChecked((c) => (c.includes(d) ? c.filter((x) => x !== d) : [...c, d]))

    return (
        <MainUserLayout>
            <div className='ab fs' dir='rtl'>
                {/* ══ هدر ══ */}
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <Link href='/services'>خدمات حقوقی</Link> <span>/</span> <span>حقوق خانواده</span>
                                </nav>
                                <span className='ab-badge'><i /> جلسهٔ اول کاملاً محرمانه</span>
                                <h1 className='ab-h1'>پیش از دادگاه، <em>یک گفتگو</em></h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. در حقوق خانواده هر پرونده پشت خودش یک زندگی دارد. اول گوش می‌دهیم، بعد بهترین مسیر را با هم انتخاب می‌کنیم.
                                </p>
                                <div className='ab-actions'>
                                    <Link href='#' className='ab-btn ab-btn--gold'>رزرو جلسهٔ مشاوره <span aria-hidden>←</span></Link>
                                    <a href='#situation' className='ab-btn ab-btn--ghost'>وضعیتم کدام است؟</a>
                                </div>
                            </div>
                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon fs-heart'><Svg sw={1.2}><path d={HEART} /></Svg></div>
                                {CHIPS.map((c) => <span key={c.t} className='ab-chip' style={c.s}><i /> {c.t}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ وضعیت شما کدام است؟ ══ */}
                <div className='main-user-layout'>
                    <section id='situation' className='ab-panel ab-panel--bone radius-md'>
                        <Head eyebrow='وضعیت شما' title='مسئلهٔ شما کدام است؟' sub='یکی را انتخاب کنید تا ببینید ما چه می‌کنیم و چه مدتی طول می‌کشد.' />
                        <div className='fs-tabs' role='tablist'>
                            {SITUATIONS.map((x, i) => (
                                <button key={x.t} type='button' role='tab' aria-selected={sit === i}
                                    className={`fs-tab${sit === i ? ' is-active' : ''}`} onClick={() => setSit(i)}>
                                    {x.t}
                                </button>
                            ))}
                        </div>
                        <div className='fs-sit' key={sit} aria-live='polite'>
                            <span className='fs-sit-num' aria-hidden>{DIGITS[sit]}</span>
                            <p className='fs-sit-text'>{S.text}</p>
                            <ul className='fs-sit-does'>
                                {S.does.map((d) => (
                                    <li key={d}><span><Svg sw={2.4}><path d='M5 12l5 5L20 7' /></Svg></span>{d}</li>
                                ))}
                            </ul>
                            <div className='fs-sit-time'><b>زمان تقریبی</b>{S.time}</div>
                        </div>
                    </section>
                </div>

                {/* ══ توافقی یا قضایی ══ */}
                <section className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <Head center eyebrow='دو مسیر' title='توافقی یا قضایی؟' sub='مسیر را عوض کنید و ببینید مراحل و حال‌وهوای کار چه فرقی می‌کند. (زمان‌ها و درصدها نمونه‌اند.)' />
                        <div className='fs-switch' role='group' aria-label='انتخاب مسیر'>
                            <span className={`fs-thumb${path === 'court' ? ' is-end' : ''}`} aria-hidden />
                            {Object.entries(PATHS).map(([k, v]) => (
                                <button key={k} type='button' aria-pressed={path === k} onClick={() => setPath(k)}>{v.label}</button>
                            ))}
                        </div>
                        <div className='fs-path' key={path}>
                            <p className='fs-path-sum'>{P.sum}</p>
                            <ol className='fs-line'>
                                {P.steps.map(([t, d]) => <li key={t}><b>{t}</b><small>{d}</small></li>)}
                            </ol>
                            <div className='fs-meter'>
                                {Object.entries(P.meter).map(([k, v]) => (
                                    <div key={k}><span>{k}</span><i><em style={{ width: `${v}%` }} /></i></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ مدارک + وکیل مسئول ══ */}
                <div className='main-user-layout'>
                    <section className='ab-bare fs-docs'>
                        <div>
                            <Head eyebrow='آماده شوید' title='برای جلسهٔ اول چه بیاورید؟' sub='هر چه دارید علامت بزنید؛ نبودن بعضی مدارک مانع شروع نیست.' />
                            <div className='fs-bar' aria-label={`${pct} درصد آماده`}><i style={{ width: `${pct}%` }} /></div>
                            <div className='fs-bar-l'>{pct.toLocaleString('fa-IR')}٪ آماده</div>
                            <ul className='fs-check'>
                                {DOCS.map((d) => (
                                    <li key={d}>
                                        <label className={checked.includes(d) ? 'is-on' : ''}>
                                            <input type='checkbox' checked={checked.includes(d)} onChange={() => toggle(d)} />
                                            <span className='fs-box'><Svg sw={2.6}><path d='M5 12l5 5L20 7' /></Svg></span>
                                            {d}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Reveal>
                            <aside className='ab-card ab-card--navy fs-lawyer'>
                            <span className='ab-avatar-frame'><span className='ab-initials'>س‌ا</span></span>
                            <div className='fw-bold fs-5'>سارا احمدی</div>
                            <span className='ab-pill'>مسئول پرونده‌های خانواده</span>
                            <p className='ab-text'>کارشناسی ارشد حقوق خصوصی، دانشگاه شهید بهشتی. این یک متن نمونه است.</p>
                            <Link href='#' className='ab-btn ab-btn--gold'>گفتگو با وکیل <span aria-hidden>←</span></Link>
                            </aside>
                        </Reveal>
                    </section>
                </div>

                {/* ══ سؤالات رایج ══ */}
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

                {/* ══ پایان ══ */}
                <div className='main-user-layout'>
                    <section className='ab-bare fs-end'>
                        <Reveal className='text-center'>
                            <h2 className='ab-h2'>هر چه هست، از همین‌جا شروع می‌شود.</h2>
                            <p className='ab-sub mb-4'>یک جلسهٔ مشاوره، بدون تعهد و کاملاً محرمانه.</p>
                            <Link href='#' className='ab-btn'>رزرو جلسهٔ مشاوره <span aria-hidden>←</span></Link>
                        </Reveal>
                    </section>
                </div>
            </div>
        </MainUserLayout>
    )
}
