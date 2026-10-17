import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/FinancialCrimes.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import FinancialLedgerContainer from '@/app/components/user/container/FinancialLedgerContainer'
import MoneyTrailContainer from '@/app/components/user/container/MoneyTrailContainer'
import EvidenceFolderContainer from '@/app/components/user/container/EvidenceFolderContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { FINANCIAL_CRIMES_CONTENT as D, CHIPS } from '@/app/data/financialcrimes'

const titleNode = (x) => <>{String(x || '').split(/\{\{(.+?)\}\}/g).map((p, i) => i % 2 ? <em key={i}>{p}</em> : p)}</>
// اگر بخشی در دیتابیس خالی باشد، محتوای پیش‌فرض نمایش داده می‌شود.
const list = (v, d) => (Array.isArray(v) && v.length ? v : d)
const ICON = <><path d='M10.5 3.5a7 7 0 1 0 0 14a7 7 0 1 0 0-14z' /><path d='M15.6 15.6L21 21' /><path d='M7.5 8.5h6M7.5 11h4.5M7.5 13.5h3' /></>

export default function UserFinancialCrimesPage({ content }) {
    const h = { ...D.hero, ...(content?.hero || {}) }
    const s = { ...D.sections, ...(content?.sections || {}) }
    const c = { ...D.cta, ...(content?.cta || {}) }
    return (
        <MainUserLayout>
            <div className='ab fc' dir='rtl'>
                <UserHeroBannerTertiary
                    crumb={[{ label: 'خانه', href: '/' }, { label: 'خدمات حقوقی', href: '/services' }, { label: 'جرایم مالی و اقتصادی' }]}
                    badge={h.badge}
                    title={titleNode(h.title)}
                    description={h.description}
                    primaryAction={{ href: h.primaryHref || '/contact-us', label: h.primaryLabel || 'مشاورهٔ فوری و محرمانه' }}
                    secondaryAction={{ href: h.secondaryHref || '#ledger', label: h.secondaryLabel || 'اتهام شما کدام است؟' }}
                    keywords={['محرمانه', 'مستند', 'به‌موقع']}
                    icon={ICON}
                    chips={CHIPS}
                />
                <FinancialLedgerContainer id='ledger' title={s.ledgerTitle} subtitle={s.ledgerSubtitle} items={list(s.crimes, D.sections.crimes)}
                    totalLabel={s.ledgerTotal || D.sections.ledgerTotal} resultLabel={s.ledgerResult || D.sections.ledgerResult} />
                <MoneyTrailContainer id='trail' title={s.trailTitle} subtitle={s.trailSubtitle} steps={list(s.trail, D.sections.trail)} />
                <EvidenceFolderContainer title={s.docsTitle} subtitle={s.docsSubtitle} docs={list(s.docs, D.sections.docs)} />
                <StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle || D.sections.faqTitle} contents={list(s.faq, D.sections.faq)} />
                <UserCtaContainer title={c.title || ''} subtitle={c.subtitle || ''} action={{ href: c.actionHref || '/contact-us', label: c.actionLabel || 'رزرو مشاورهٔ محرمانه' }} />
            </div>
        </MainUserLayout>
    )
}
