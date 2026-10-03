'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'

const CASES = [
    { tag: 'دعاوی اداری و مالیاتی', title: 'اعتراض به برگ تشخیص مالیات', result: 'کاهش جریمه', stat: { v: '۷۰٪', u: 'کاهش جریمه' }, text: 'لایحهٔ اعتراض در مهلت قانونی و دفاع در هیئت حل اختلاف.' },
    { tag: 'حقوق خانواده', title: 'توافق در پرونده مهریه و حضانت', result: 'صلح و سازش', text: 'مذاکرهٔ حضوری با حضور وکلا و ثبت توافق‌نامه در دادگاه.' },
    { tag: 'املاک و ثبت اسناد', title: 'رفع تصرف ملک تجاری', result: 'رفع تصرف', text: 'اثبات مالکیت با اسناد رسمی و پیگیری سریع اجرای حکم.' },
]

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

export default function UserHomeBestCases() {
    return (
        <div className='ab' dir='rtl'>
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
        </div>
    )
}