'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import Reveal from '@/app/components/user/animation/Reveal'
import SectionTitle from '@/app/components/user/title/SectionTitle'
import UserCaseCard from '@/app/components/user/card/UserCaseCard'

const CASES = [
    { tag: 'دعاوی اداری و مالیاتی', title: 'اعتراض به برگ تشخیص مالیات', result: 'کاهش جریمه', stat: { v: '۷۰٪', u: 'کاهش جریمه' }, text: 'لایحهٔ اعتراض در مهلت قانونی و دفاع در هیئت حل اختلاف.' },
    { tag: 'حقوق خانواده', title: 'توافق در پرونده مهریه و حضانت', result: 'صلح و سازش', text: 'مذاکرهٔ حضوری با حضور وکلا و ثبت توافق‌نامه در دادگاه.' },
    { tag: 'املاک و ثبت اسناد', title: 'رفع تصرف ملک تجاری', result: 'رفع تصرف', text: 'اثبات مالکیت با اسناد رسمی و پیگیری سریع اجرای حکم.' },
]

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
                    <SectionTitle title='گزیده‌ای از پرونده‌های موفق'
                        subtitle='اطلاعات موکلان محرمانه است و فقط نوع دعوا و روش حل نمایش داده می‌شود.'

                    />
                    <div className='ab-grid ab-grid--3'>
                        {CASES.map((c, i) => (
                            <UserCaseCard content={c} key={i} i={i} />
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