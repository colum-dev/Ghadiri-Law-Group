import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import ContractTypeContainer from '@/app/components/user/container/ContractTypeContainer'
import StepCardsContainer from '@/app/components/user/container/StepCardsContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
const titleNode=(x)=><>{String(x||'').split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserContractsPage({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{};return <MainUserLayout><div className='ab ct' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'قراردادها و مشاورهٔ حقوقی'}]} badge={h.badge} title={titleNode(h.title)} description={h.description} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'ارسال قرارداد برای بررسی'}} secondaryAction={{href:h.secondaryHref||'#type',label:h.secondaryLabel||'نوع قراردادم کدام است؟'}} chips={[]}/><ContractTypeContainer id='type' title={s.typesTitle||''} subtitle={s.typesSubtitle||''} types={s.types||[]} digits={['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']}/><StepCardsContainer title={s.stepsTitle||''} steps={s.steps||[]} digits={['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||''} contents={s.faq||[]}/><UserCtaContainer title={c.title||''} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'ارسال قرارداد برای بررسی'}}/></div></MainUserLayout>}
