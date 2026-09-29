'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../assets/styles/common/Common.scss'
import '../assets/styles/views/user/contactUs/ContactUs.scss'
import MainUserLayout from '../layouts/admin/user/MainUserLayout'

const CHANNELS = [
    { t: 'تماس تلفنی', v: '۰۲۱-۱۲۳۴۵۶۷۸', href: 'tel:+982112345678', icon: <path d='M4 5c0-1 1-2 2-2h2l2 5-2 2c1 3 3 5 6 6l2-2 5 2v2c0 1-1 2-2 2C10 20 4 14 4 5z' /> },
    { t: 'واتس‌اپ', v: '۰۹۱۲-۱۲۳-۴۵۶۷', href: 'https://wa.me/989121234567', icon: <><path d='M4 20l1.4-4.2A8 8 0 1 1 9 19L4 20z' /><path d='M9 10c0 3 2.5 5.5 5.5 5.5' /></> },
    { t: 'ایمیل', v: 'info@ghadiri-law.example', href: 'mailto:info@ghadiri-law.example', icon: <><rect x='3' y='5' width='18' height='14' rx='2' /><path d='M3 7l9 6 9-6' /></> },
    { t: 'آدرس دفتر', v: 'تهران، خیابان نمونه، پلاک ۰ (نمونه)', href: '#office', icon: <><path d='M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z' /><circle cx='12' cy='9' r='2.5' /></> },
]

const DEPARTMENTS = [
    { key: 'family', t: 'حقوق خانواده', name: 'سارا احمدی', field: 'کارشناسی ارشد حقوق خصوصی' },
    { key: 'criminal', t: 'دعاوی کیفری', name: 'مهدی رضایی', field: 'کارشناسی ارشد حقوق جزا و جرم‌شناسی' },
    { key: 'business', t: 'تجارت و شرکت‌ها', name: 'امیر غدیری', field: 'دکتری حقوق خصوصی' },
    { key: 'real-estate', t: 'املاک و ثبت اسناد', name: 'نگار کریمی', field: 'کارشناسی ارشد حقوق خصوصی' },
    { key: 'other', t: 'سایر موضوعات', name: 'تیم پذیرش', field: 'راهنمایی و ارجاع اولیه پرونده' },
]

const HOURS = [
    ['شنبه تا چهارشنبه', '۹:۰۰ تا ۱۷:۰۰'],
    ['پنجشنبه', '۹:۰۰ تا ۱۳:۰۰'],
    ['جمعه', 'تعطیل'],
]

const FAQ = [
    ['جلسهٔ مشاورهٔ اول رایگان است؟', 'این یک متن نمونه است. جزئیات هزینه یا رایگان بودن جلسهٔ اول باید اینجا مشخص شود.'],
    ['معمولاً چقدر طول می‌کشد جواب بگیرم؟', 'این یک متن نمونه است. تیم ما تلاش می‌کند در کمتر از یک روز کاری پاسخ دهد.'],
    ['آیا مشاورهٔ غیرحضوری هم دارید؟', 'این یک متن نمونه است. بله، مشاورهٔ تلفنی و آنلاین هم در دسترس است.'],
]

const DIGITS = ['۰۱', '۰۲', '۰۳']

const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)
const MSG = 'M4 5h16v11H8l-4 4V5z'

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

export default function UserContactPage() {
    const [dep, setDep] = useState(0)
    const [form, setForm] = useState({ name: '', phone: '', message: '' })
    const [sent, setSent] = useState(false)
    const [open, setOpen] = useState(0)
    const D = DEPARTMENTS[dep]

    const change = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
    const submit = (e) => {
        e.preventDefault()
        setSent(true)
    }

    return (
        <MainUserLayout>
            <div className='ab cn' dir='rtl'>
                <section className='ab-full ab-panel ab-panel--navy ab-hero'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--1' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <div className='ab-hero-grid'>
                            <div>
                                <nav className='ab-crumb' aria-label='مسیر'>
                                    <Link href='/'>خانه</Link> <span>/</span> <span>تماس با ما</span>
                                </nav>
                                <span className='ab-badge'><i /> پاسخ در کمتر از یک روز کاری</span>
                                <h1 className='ab-h1'>بگویید <em>چه کمکی</em> لازم دارید</h1>
                                <p className='ab-lead'>
                                    این یک متن نمونه است. از یک تماس ساده تا رزرو جلسهٔ مشاوره؛ هر مسیری که راحت‌ترید را انتخاب کنید.
                                </p>
                            </div>
                            <div className='ab-hero-art' aria-hidden>
                                <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                                <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                                <div className='ab-hero-icon'><Svg sw={1.2}><path d={MSG} /></Svg></div>
                            </div>
                        </div>

                        <div className='cn-channels'>
                            {CHANNELS.map((c, i) => (
                                <Reveal key={c.t} delay={i * 80}>
                                    <a href={c.href} className='cn-ch glass-gold-hover hover-to-background-navy bg-bone border border-1'>
                                        <span className='cn-ch-ico'><Svg sw={1.6}>{c.icon}</Svg></span>
                                        <span className='cn-ch-t'>{c.t}</span>
                                        <span className='cn-ch-v' dir='ltr'>{c.v}</span>
                                    </a>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ab-panel ab-panel--bone radius-md cn-form-sec'>
                        <span className='ab-blob ab-blob--gold' />
                        <Head eyebrow='ارسال پیام' title='پیام‌تان را برای ما بفرستید' sub='ابتدا موضوع پرونده را انتخاب کنید تا پیام شما مستقیم به همکار مربوطه برسد.' />

                        <div className='cn-deps' role='tablist'>
                            {DEPARTMENTS.map((d, i) => (
                                <button key={d.key} type='button' role='tab' aria-selected={dep === i}
                                    className={`cn-dep${dep === i ? ' is-active' : ''}`} onClick={() => setDep(i)}>{d.t}</button>
                            ))}
                        </div>

                        <div className='cn-form-grid'>
                            {sent ? (
                                <div className='cn-sent'>
                                    <span className='cn-sent-ico'><Svg sw={2.6}><path d='M5 12l5 5L20 7' /></Svg></span>
                                    <b>پیام شما ارسال شد</b>
                                    <p>این یک وضعیت نمونه است؛ تا اتصال فرم به سرویس واقعی، پیام‌ها ثبت نمی‌شوند. همکاران ما در بخش «{D.t}» به‌زودی با شما تماس می‌گیرند.</p>
                                    <button type='button' className='ab-btn ab-btn--ghost' onClick={() => setSent(false)}>ارسال پیام دیگر</button>
                                </div>
                            ) : (
                                <form className='cn-form' onSubmit={submit}>
                                    <label>
                                        <span>نام و نام خانوادگی</span>
                                        <input type='text' required value={form.name} onChange={change('name')} placeholder='مثلاً علی محمدی' />
                                    </label>
                                    <label>
                                        <span>شماره تماس یا ایمیل</span>
                                        <input type='text' required value={form.phone} onChange={change('phone')} placeholder='۰۹۱۲xxxxxxx یا you@email.com' dir='ltr' />
                                    </label>
                                    <label>
                                        <span>پیام شما</span>
                                        <textarea rows={5} required value={form.message} onChange={change('message')} placeholder='خلاصه‌ای از موضوع پرونده را بنویسید…' />
                                    </label>
                                    <button type='submit' className='ab-btn ab-btn--gold'>ارسال پیام <span aria-hidden>←</span></button>
                                </form>
                            )}

                            <aside className='ab-card ab-card--navy cn-person' key={dep}>
                                <span className='ab-avatar-frame'><span className='ab-initials'>{D.name.split(' ').map((p) => p[0]).slice(0, 2).join('\u200c')}</span></span>
                                <div className='fw-bold fs-5'>{D.name}</div>
                                <span className='ab-pill'>{D.t}</span>
                                <p className='ab-text'>{D.field}</p>
                                <p className='cn-person-note'>پیام‌های بخش «{D.t}» به این همکار ارجاع داده می‌شود.</p>
                            </aside>
                        </div>
                    </section>
                </div>

                <section id='office' className='ab-full ab-panel ab-panel--navy'>
                    <span className='ab-gridbg' />
                    <span className='ab-blob ab-blob--2' />
                    <div className='main-user-layout ab-inner'>
                        <Head eyebrow='دفتر ما' title='آدرس و ساعات کاری' sub='این یک متن نمونه است.' />
                        <div className='cn-office'>
                            <div className='cn-map' aria-hidden>
                                <Svg sw={1}><path d='M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z' /><circle cx='12' cy='9' r='2.5' /></Svg>
                                <span>این یک نقشهٔ نمونه است</span>
                            </div>
                            <div className='cn-office-info'>
                                <p className='cn-address'>تهران، خیابان نمونه، بین خیابان الف و ب، پلاک ۰، طبقهٔ ۲ (نمونه)</p>
                                <table className='cn-hours'>
                                    <tbody>
                                        {HOURS.map(([d, h]) => (
                                            <tr key={d}><td>{d}</td><td dir='ltr'>{h}</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='main-user-layout'>
                    <section className='ab-panel ab-panel--gold radius-md'>
                        <span className='ab-blob ab-blob--white' />
                        <div className='ab-split ab-split--acc'>
                            <div className='ab-acc-side'>
                                <Head eyebrow='سؤالات رایج' title='قبل از پیام، شاید بپرسید' />
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
            </div>
        </MainUserLayout>
    )
}
