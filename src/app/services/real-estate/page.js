'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/RealState.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'

const DEEDS = [
    { t: 'سند تک‌برگ', text: 'روشن‌ترین حالت؛ اما باز هم باید بازداشت، رهن یا توقیف احتمالی استعلام شود.', risk: 'کم' },
    { t: 'مبایعه‌نامه (بدون سند رسمی)', text: 'ملک هنوز به نام شما نیست؛ الزام فروشنده به تنظیم سند رسمی مسیر اصلی است.', risk: 'متوسط' },
    { t: 'ملک موروثی', text: 'باید حصر وراثت و سهم هر وارث روشن باشد تا معامله یا تقسیم قانونی انجام شود.', risk: 'متوسط' },
    { t: 'ملک بدون سند / قولنامه‌ای', text: 'اثبات مالکیت نیاز به شهادت شهود و مستندات جانبی دارد؛ پیچیده‌ترین حالت.', risk: 'زیاد' },
]

const RISK_ITEMS = [
    { t: 'استعلام سند از ادارهٔ ثبت', w: 30 },
    { t: 'بررسی بازداشت یا رهن بودن ملک', w: 25 },
    { t: 'تطبیق هویت مالک با سند', w: 15 },
    { t: 'بازدید حضوری و بررسی تصرف فعلی', w: 15 },
    { t: 'مشاوره پیش از پرداخت بیعانه', w: 15 },
]

const PATHS = {
    owner: { label: 'مالک هستم', sum: 'ملکتان در تصرف دیگری است یا مستأجر تخلیه نمی‌کند؟ مسیر ما اثبات مالکیت و اجرای سریع حکم است.',
        steps: [['اثبات مالکیت', 'ارائهٔ سند و مستندات رسمی'], ['اظهارنامه یا دادخواست', 'اخطار قانونی یا طرح دعوا'], ['رأی و اجرا', 'پیگیری تا تخلیهٔ کامل ملک']] },
    tenant: { label: 'مستأجر هستم', sum: 'اختلاف در ودیعه، افزایش اجاره یا تخلیهٔ زودهنگام؛ حق شما هم در قرارداد و هم در قانون تعریف شده.',
        steps: [['بررسی قرارداد اجاره', 'یافتن حقوق و تعهدات دو طرف'], ['مذاکره با مالک', 'تلاش برای حل بدون دادگاه'], ['طرح دعوا در صورت نیاز', 'مطالبهٔ ودیعه یا خسارت']] },
}

const FAQ = [
    ['بدون سند رسمی هم می‌توان دعوا کرد؟', 'این یک متن نمونه است. بله، با مستنداتی مانند مبایعه‌نامه و شهادت شهود امکان اثبات حق وجود دارد.'],
    ['رفع تصرف چقدر طول می‌کشد؟', 'این یک متن نمونه است. بسته به نوع پرونده و دادگاه رسیدگی‌کننده متفاوت است؛ در ادامه برآورد دقیق‌تری می‌دهیم.'],
    ['هزینهٔ استعلام سند بر عهدهٔ کیست؟', 'این یک متن نمونه است. معمولاً پیش از عقد قرارداد و با توافق طرفین مشخص می‌شود.'],
    ['آیا می‌توانید فقط بازبینی قرارداد را انجام دهید؟', 'این یک متن نمونه است. بله، بازبینی مبایعه‌نامه یا اجاره‌نامه به‌صورت جداگانه هم قابل انجام است.'],
]

const CHIPS = [
    { t: 'استعلام سند', s: { top: '6%', right: '0%', '--fd': '0s' } },
    { t: 'رفع تصرف', s: { top: '42%', left: '-4%', '--fd': '-2s' } },
    { t: 'تخلیه و اجاره', s: { bottom: '6%', right: '6%', '--fd': '-3s' } },
]
const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵']

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)
const KEY = 'M40 74a26 26 0 1 1 22-12l46 46-10 10-10-10-8 8-10-10 6-6-16-16a26 26 0 0 1-20-10z'

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

export default function UserRealEstatePage() {
    const [flip, setFlip] = useState(0)
    const [checked, setChecked] = useState([])
    const [path, setPath] = useState('owner')
    const [open, setOpen] = useState(0)
    const P = PATHS[path]

    const doneW = RISK_ITEMS.filter((r) => checked.includes(r.t)).reduce((a, r) => a + r.w, 0)
    const risk = 100 - doneW
    const riskLabel = risk > 60 ? 'ریسک بالا' : risk > 25 ? 'ریسک متوسط' : 'ریسک پایین'
    const toggle = (t) => setChecked((c) => (c.includes(t) ? c.filter((x) => x !== t) : [...c, t]))

    return (
        <MainUserLayout>
            <div className='ab re' dir='rtl'>
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <Link href='/services'>خدمات حقوقی</Link> <span>/</span> <span>املاک و ثبت اسناد</span>
                                </nav>
                                <span className='ab-badge'><i /> استعلام سند، پیش از هر پرداختی</span>
                                <h1 className='ab-h1'>یک <em>سند</em>، هزار داستان</h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. از استعلام یک سند تا رفع تصرف یک ملک تجاری؛ حق مالکیت شما با مدرک اثبات می‌شود، نه با ادعا.
                                </p>
                                <div className='ab-actions'>
                                    <Link href='#' className='ab-btn ab-btn--gold'>استعلام رایگان سند <span aria-hidden>←</span></Link>
                                    <a href='#risk' className='ab-btn ab-btn--ghost'>ریسک معامله‌ام چقدر است؟</a>
                                </div>
                            </div>
                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon re-key'><Svg sw={1.2}><path d={KEY} /></Svg></div>
                                {CHIPS.map((c) => <span key={c.t} className='ab-chip' style={c.s}><i /> {c.t}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ab-panel ab-panel--bone radius-md'>
                        <Head eyebrow='نوع سند' title='ملک شما چه سندی دارد؟' sub='روی هر کارت بزنید تا پشت آن را ببینید؛ سطح ریسک هر نوع سند فرق دارد.' />
                        <div className='re-flip-grid'>
                            {DEEDS.map((d, i) => (
                                <Reveal key={d.t} delay={i * 80}>
                                    <button type='button' className={`re-flip${flip === i ? ' is-flipped' : ''}`}
                                        onClick={() => setFlip(flip === i ? -1 : i)} aria-pressed={flip === i}>
                                        <span className='re-flip-inner'>
                                            <span className='re-flip-face re-flip-front glass-gold hover-to-background-navy bg-bone border border-1'>
                                                <b>{d.t}</b>
                                                <em className={`re-risk re-risk--${d.risk === 'کم' ? 'low' : d.risk === 'متوسط' ? 'mid' : 'high'}`}>ریسک {d.risk}</em>
                                                <span className='re-flip-hint'>برای توضیح بزنید</span>
                                            </span>
                                            <span className='re-flip-face re-flip-back glass-gold hover-to-background-navy bg-bone border border-1'>{d.text}</span>
                                        </span>
                                    </button>
                                </Reveal>
                            ))}
                        </div>
                    </section>
                </div>

                <section id='risk' className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <Head center eyebrow='ریسک‌سنج' title='پیش از پرداخت هر مبلغی، این‌ها را چک کنید' sub='هر مورد را که انجام داده‌اید علامت بزنید؛ عقربه‌ی ریسک زنده تغییر می‌کند.' />
                        <div className='re-risk-grid'>
                            <ul className='re-risk-list'>
                                {RISK_ITEMS.map((r) => (
                                    <li key={r.t}>
                                        <label className={checked.includes(r.t) ? 'is-on' : ''}>
                                            <input type='checkbox' checked={checked.includes(r.t)} onChange={() => toggle(r.t)} />
                                            <span className='re-box'><Svg sw={2.6}><path d='M5 12l5 5L20 7' /></Svg></span>
                                            {r.t}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <div className='re-gauge'>
                                <svg viewBox='0 0 200 120' aria-hidden>
                                    <path d='M10 110A90 90 0 0 1 190 110' className='re-gauge-track' />
                                    <path d='M10 110A90 90 0 0 1 190 110' className='re-gauge-fill' style={{ strokeDashoffset: `${283 - (283 * (100 - risk)) / 100}` }} />
                                    <line x1='100' y1='110' x2={100 + 70 * Math.cos(Math.PI - (Math.PI * risk) / 100)} y2={110 - 70 * Math.sin(Math.PI - (Math.PI * risk) / 100)} className='re-needle' />
                                    <circle cx='100' cy='110' r='7' className='re-needle-hub' />
                                </svg>
                                <div className='re-gauge-v'>{riskLabel}</div>
                                <div className='re-gauge-l'>{checked.length.toLocaleString('fa-IR')} از {RISK_ITEMS.length.toLocaleString('fa-IR')} مورد انجام‌شده</div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ab-bare re-owner'>
                        <Head eyebrow='موقعیت شما' title='مالک هستید یا مستأجر؟' sub='مسیر رسیدگی برای هرکدام فرق دارد.' />
                        <div className='re-switch' role='group' aria-label='انتخاب موقعیت'>
                            {Object.entries(PATHS).map(([k, v]) => (
                                <button key={k} type='button' aria-pressed={path === k} className={path === k ? 'is-active' : ''} onClick={() => setPath(k)}>{v.label}</button>
                            ))}
                        </div>
                        <div className='re-owner-body' key={path}>
                            <p className='re-owner-sum'>{P.sum}</p>
                            <ol className='re-owner-steps'>
                                {P.steps.map(([t, d], i) => (
                                    <li key={t}><span>{DIGITS[i]}</span><b>{t}</b><small>{d}</small></li>
                                ))}
                            </ol>
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
                    <section className='ab-bare re-end'>
                        <Reveal className='text-center'>
                            <h2 className='ab-h2'>قبل از امضا، یک تماس بگیرید.</h2>
                            <p className='ab-sub mb-4'>استعلام اولیهٔ سند رایگان است و شما را متعهد به ادامه نمی‌کند.</p>
                            <Link href='#' className='ab-btn'>استعلام رایگان سند <span aria-hidden>←</span></Link>
                        </Reveal>
                    </section>
                </div>
            </div>
        </MainUserLayout>
    )
}
