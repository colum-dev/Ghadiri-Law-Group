'use client'

import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/contactUs/ContactUs.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerSecondary from '../../components/user/banner/UserHeroBannerSecondary'
import UserContactCard from '../../components/user/card/UserContactCard'
import UserContactUsComponent from './UserContactUsComponent'
import UserContactUsMap from './UserContactUsMap'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'

const DEFAULT_CHANNELS = [
    { t: 'تماس تلفنی', v: '۰۲۱-۱۲۳۴۵۶۷۸', href: 'tel:+982112345678' },
    { t: 'واتس‌اپ', v: '۰۹۱۲-۱۲۳-۴۵۶۷', href: 'https://wa.me/989121234567' },
    { t: 'ایمیل', v: 'info@ghadiri-law.example', href: 'mailto:info@ghadiri-law.example' },
    { t: 'آدرس دفتر', v: 'تهران، خیابان نمونه، پلاک ۰ (نمونه)', href: '#office' },
]
const DEFAULT_DEPARTMENTS = [
    { key: 'family', t: 'حقوق خانواده', name: 'سارا احمدی', field: 'کارشناسی ارشد حقوق خصوصی' },
    { key: 'criminal', t: 'دعاوی کیفری', name: 'مهدی رضایی', field: 'کارشناسی ارشد حقوق جزا و جرم‌شناسی' },
    { key: 'business', t: 'تجارت و شرکت‌ها', name: 'امیر غدیری', field: 'دکتری حقوق خصوصی' },
    { key: 'real-estate', t: 'املاک و ثبت اسناد', name: 'نگار کریمی', field: 'کارشناسی ارشد حقوق خصوصی' },
    { key: 'other', t: 'سایر موضوعات', name: 'تیم پذیرش', field: 'راهنمایی و ارجاع اولیه پرونده' },
]
const DEFAULT_PRINCIPLES = [
    { title: 'استقلال', text: 'وکیل باید مستقل از هر فشار و نفوذی بیندیشد و تصمیم بگیرد. استقلال ما شرط اول دفاع مؤثر از موکل است.' },
    { title: 'امانت‌داری', text: 'اسناد، اسرار و اعتماد موکل امانتی است که با دقت و رازداری حفظ می‌شود.' },
    { title: 'صداقت با موکل', text: 'تصویر واقعی پرونده، با نقاط قوت و ضعف، همیشه پیش از هر تصمیمی با موکل در میان گذاشته می‌شود.' },
]
const Svg = ({ children, sw = 1.7 }) => <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>

export default function UserContactUs({ content }) {
    const channels = content?.channels?.length ? content.channels : DEFAULT_CHANNELS
    const departments = content?.departments?.length ? content.departments : DEFAULT_DEPARTMENTS
    const office = content?.office || {}
    const hours = office.hours?.length ? office.hours.map((x) => [x.day, x.time]) : [['شنبه تا چهارشنبه', '۹:۰۰ تا ۱۷:۰۰'], ['پنجشنبه', '۹:۰۰ تا ۱۳:۰۰'], ['جمعه', 'تعطیل']]
    return <MainUserLayout><div className='ab cn' dir='rtl'>
        <UserHeroBannerSecondary><div className='cn-channels'>{channels.map((c, i) => <UserContactCard contact={c} i={i} key={i} />)}</div></UserHeroBannerSecondary>
        <UserContactUsComponent departments={departments} Svg={Svg} />
        <UserContactUsMap Svg={Svg} hours={hours} address={office.address || 'تهران، خیابان نمونه، پلاک ۰ (نمونه)'} title={office.title || 'آدرس و ساعات کاری'} sub={office.subtitle || 'این یک متن نمونه است.'} />
        <StaticDescriptionTextContainerSecondary containerTitle={content?.principles?.title || 'این یک متن نمونه است.'} containerSubTitle={content?.principles?.subtitle || 'اصولی که وکالت را معنا می‌دهد'} contents={content?.principles?.items || DEFAULT_PRINCIPLES} />
    </div></MainUserLayout>
}
