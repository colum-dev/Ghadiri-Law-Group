'use client'

import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/services.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerQuaternary from '@/app/components/user/banner/UserHeroBannerQuaternary'
import UserServiceSection from '@/app/components/user/container/UserServiceSection'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { DIGITS, SERVICES } from '@/app/data/services'

export default function UserServices({ content }) {
    const hero = content?.hero || {}, c = content?.cta || {}
    const services = content?.services?.length ? content.services : SERVICES
    return <MainUserLayout><div className='ab' dir='rtl'>
        <UserHeroBannerQuaternary crumb={[{ label: 'خانه', href: '/' }, { label: 'خدمات حقوقی' }]} title={hero.title || <>خدمات <em>حقوقی</em></>} description={hero.description || 'این یک متن نمونه است. مسئلهٔ شما در کدام حوزه است؟ از فهرست کنار انتخاب کنید یا پایین‌تر خلاصهٔ هر خدمت را بخوانید.'} indexTitle={hero.indexTitle || 'فهرست خدمات'} indexItems={services.map((s) => ({ label: s.title, href: `#${s.slug}` }))} digits={DIGITS} />
        {services.map((s, i) => <UserServiceSection key={s.slug || i} service={s} index={i} digits={DIGITS} />)}
        <UserCtaContainer title={c.title || 'پرونده‌تان در هیچ‌کدام جا نمی‌گیرد؟'} subtitle={c.subtitle || 'همین را برایمان بگوییم؛ در همان جلسهٔ اول مسیر را روشن می‌کنیم.'} action={{ label: c.actionLabel || 'با ما تماس بگیرید', href: c.actionHref || '/contact-us' }} />
    </div></MainUserLayout>
}
