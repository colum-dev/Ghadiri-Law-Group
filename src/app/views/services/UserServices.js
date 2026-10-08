'use client'
import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/services.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerQuaternary from '@/app/components/user/banner/UserHeroBannerQuaternary'
import UserServiceSection from '@/app/components/user/container/UserServiceSection'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
export default function UserServices({ content }) {
    const hero = content?.hero || {}, c = content?.cta || {}, services = content?.services || []
    return <MainUserLayout><div className='ab' dir='rtl'>
        <UserHeroBannerQuaternary crumb={[{ label: 'خانه', href: '/' }, { label: 'خدمات حقوقی' }]} title={hero.title || 'خدمات حقوقی'} description={hero.description || ''} indexTitle={hero.indexTitle || 'فهرست خدمات'} indexItems={services.map((s) => ({ label: s.title, href: `#${s.slug}` }))} digits={['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']} />
        {services.map((s, i) => <UserServiceSection key={s.slug || i} service={s} index={i} digits={['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']} />)}
        <UserCtaContainer title={c.title || ''} subtitle={c.subtitle || ''} action={{ label: c.actionLabel || 'با ما تماس بگیرید', href: c.actionHref || '/contact-us' }} />
    </div></MainUserLayout>
}
