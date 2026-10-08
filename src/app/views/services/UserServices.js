'use client'
import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/services.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerQuaternary from '../../components/user/banner/UserHeroBannerQuaternary'
import UserServiceSection from '../../components/user/container/UserServiceSection'
import UserCtaContainer from '../../components/user/container/UserCtaContainer'

const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵', '۰۶']
const KIND_BY_SLUG = { family: 'band', criminal: 'steps', business: 'grid', 'real-estate': 'split', tax: 'band', contracts: 'steps' }
const normalizeServices = (items = []) => items.map((service) => {
    const kind = service.kind || KIND_BY_SLUG[service.slug] || 'band'
    const source = Array.isArray(service.items) ? service.items : []
    const pairs = source.map((item) => Array.isArray(item) ? item : [item, ''])
    return { ...service, kind, items: source, cards: service.cards || pairs, steps: service.steps || pairs }
})

export default function UserServices({ content }) {
    const hero = content?.hero || {}, c = content?.cta || {}, services = normalizeServices(content?.services)
    return <MainUserLayout><div className='ab' dir='rtl'>
        <UserHeroBannerQuaternary crumb={[{ label: 'خانه', href: '/' }, { label: 'خدمات حقوقی' }]} title={hero.title || 'خدمات حقوقی'} description={hero.description || ''} indexTitle={hero.indexTitle || 'فهرست خدمات'} indexItems={services.map((s) => ({ label: s.title, href: `#${s.slug}` }))} digits={DIGITS} />
        {services.map((s, i) => <UserServiceSection key={s.slug || i} service={s} index={i} digits={DIGITS} />)}
        <UserCtaContainer title={c.title || ''} subtitle={c.subtitle || ''} action={{ label: c.actionLabel || 'با ما تماس بگیرید', href: c.actionHref || '/contact-us' }} />
    </div></MainUserLayout>
}
