import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import DeedFlipContainer from '@/app/components/user/container/DeedFlipContainer'
import RiskGaugeContainer from '@/app/components/user/container/RiskGaugeContainer'
import RoleStepsContainer from '@/app/components/user/container/RoleStepsContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
const titleNode=(x)=><>{String(x||'').split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserRealEstatePage({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{};return <MainUserLayout><div className='ab re' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'املاک و ثبت اسناد'}]} badge={h.badge} title={titleNode(h.title)} description={h.description} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'استعلام رایگان سند'}} secondaryAction={{href:h.secondaryHref||'#risk',label:h.secondaryLabel||'ریسک معامله‌ام چقدر است؟'}} chips={[]}/><DeedFlipContainer title={s.deedsTitle||''} subtitle={s.deedsSubtitle||''} deeds={s.deeds||[]}/><RiskGaugeContainer id='risk' title={s.riskTitle||''} subtitle={s.riskSubtitle||''} items={s.risk||[]} labels={s.riskLabels||{}}/><RoleStepsContainer title={s.rolesTitle||''} subtitle={s.rolesSubtitle||''} roles={s.roles||[]} digits={['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||''} contents={s.faq||[]}/><UserCtaContainer title={c.title||''} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'استعلام رایگان سند'}}/></div></MainUserLayout>}
