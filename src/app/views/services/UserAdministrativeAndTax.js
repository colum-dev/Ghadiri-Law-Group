import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import DeadlineFinderContainer from '@/app/components/user/container/DeadlineFinderContainer'
import StairsContainer from '@/app/components/user/container/StairsContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
const titleNode=(x)=><>{String(x||'').split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserAdministrativeAndTax({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{};return <MainUserLayout><div className='ab' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'دعاوی اداری و مالیاتی'}]} badge={h.badge} title={titleNode(h.title)} description={h.description} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'بررسی فوری برگه‌ام'}} secondaryAction={{href:h.secondaryHref||'#deadline',label:h.secondaryLabel||'مهلت من چقدر است؟'}} chips={[]}/><DeadlineFinderContainer id='deadline' title={s.noticesTitle||''} subtitle={s.noticesSubtitle||''} notices={s.notices||[]}/><StairsContainer title={s.stairsTitle||''} subtitle={s.stairsSubtitle||''} steps={s.stairs||[]} digits={['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||''} contents={s.faq||[]}/><UserCtaContainer title={c.title||''} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'بررسی فوری برگه‌ام'}}/></div></MainUserLayout>}
