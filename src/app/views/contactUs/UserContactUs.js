'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/contactUs/ContactUs.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import SectionTitle from '../../components/user/title/SectionTitle'
import UserHeroBannerSecondary from '../../components/user/banner/UserHeroBannerSecondary'
import UserContactCard from '../../components/user/card/UserContactCard'
import UserContactUsComponent from './UserContactUsComponent'
import UserContactUsMap from './UserContactUsMap'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'

const CHANNELS = [
    { t: 'تماس تلفنی', v: '۰۲۱-۱۲۳۴۵۶۷۸', href: 'tel:+982112345678', icon: <path d='M4 5c0-1 1-2 2-2h2l2 5-2 2c1 3 3 5 6 6l2-2 5 2v2c0 1-1 2-2 2C10 20 4 14 4 5z' /> },
    { t: 'واتس‌اپ', v: '۰۹۱۲-۱۲۳-۴۵۶۷', href: 'https://wa.me/989121234567', icon: <><path d='M4 20l1.4-4.2A8 8 0 1 1 9 19L4 20z' /><path d='M9 10c0 3 2.5 5.5 5.5 5.5' /></> },
    { t: 'ایمیل', v: 'info@ghadiri-law.example', href: 'mailto:info@ghadiri-law.example', icon: <><rect x='3' y='5' width='18' height='14' rx='2' /><path d='M3 7l9 6 9-6' /></> },
    { t: 'آدرس دفتر', v: 'تهران، خیابان نمونه، پلاک ۰ (نمونه)', href: '#office', icon: <><path d='M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z' /><circle cx='12' cy='9' r='2.5' /></> },
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

export default function UserAboutUs() {
    const [dep, setDep] = useState(0)
    const [form, setForm] = useState({ name: '', phone: '', message: '' })
    const [sent, setSent] = useState(false)
    const [open, setOpen] = useState(0)

    const change = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
    const submit = (e) => {
        e.preventDefault()
        setSent(true)
    }
    const ADDRESS = 'تهران، خیابان نمونه، بین خیابان الف و ب، پلاک ۰، طبقهٔ ۲ (نمونه)'

    const DEPARTMENTS = [
        { key: 'family', t: 'حقوق خانواده', name: 'سارا احمدی', field: 'کارشناسی ارشد حقوق خصوصی' },
        { key: 'criminal', t: 'دعاوی کیفری', name: 'مهدی رضایی', field: 'کارشناسی ارشد حقوق جزا و جرم‌شناسی' },
        { key: 'business', t: 'تجارت و شرکت‌ها', name: 'امیر غدیری', field: 'دکتری حقوق خصوصی' },
        { key: 'real-estate', t: 'املاک و ثبت اسناد', name: 'نگار کریمی', field: 'کارشناسی ارشد حقوق خصوصی' },
        { key: 'other', t: 'سایر موضوعات', name: 'تیم پذیرش', field: 'راهنمایی و ارجاع اولیه پرونده' },
    ]

    const PRINCIPLES = [
        { title: 'استقلال', text: 'وکیل باید مستقل از هر فشار و نفوذی بیندیشد و تصمیم بگیرد. استقلال ما شرط اول دفاع مؤثر از موکل است.' },
        { title: 'امانت‌داری', text: 'اسناد، اسرار و اعتماد موکل امانتی است که با دقت و رازداری حفظ می‌شود.' },
        { title: 'صداقت با موکل', text: 'تصویر واقعی پرونده، با نقاط قوت و ضعف، همیشه پیش از هر تصمیمی با موکل در میان گذاشته می‌شود.' },
        { title: 'احترام به قانون و دادگاه', text: 'دفاع قدرتمند و رفتار محترمانه با هم تعارضی ندارند؛ دفاع ما همیشه در چارچوب قانون است.' },
        { title: 'تخصص و یادگیری مداوم', text: 'قوانین و رویه‌ها تغییر می‌کنند و تیم ما به‌طور مستمر دانش خود را به‌روز نگه می‌دارد.' },
    ]

    return (
        <MainUserLayout>
            <div className='ab cn' dir='rtl'>
                <UserHeroBannerSecondary >
                    <div className='cn-channels'>
                        {CHANNELS.map((c, i) => (
                            <UserContactCard contact={c} i={i} key={i} />
                        ))}
                    </div>
                </UserHeroBannerSecondary>

                <UserContactUsComponent departments={DEPARTMENTS} Svg={Svg} />

                <UserContactUsMap Svg={Svg} hours={HOURS} address={ADDRESS} />


                <StaticDescriptionTextContainerSecondary containerTitle='این یک متن نمونه است.'
                    containerSubTitle='اصولی که وکالت را معنا می‌دهد'
                    contents={PRINCIPLES}
                />
            </div>
        </MainUserLayout>
    )
}
