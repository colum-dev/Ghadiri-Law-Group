import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import StageTrackContainer from '@/app/components/user/container/StageTrackContainer'
import UserPledgeContainer from '@/app/components/user/container/UserPledgeContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
const titleNode=(x)=><>{String(x||'').split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserCriminalPage({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{};return <MainUserLayout><div className='ab cr' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'دعاوی کیفری'}]} badge={h.badge} title={titleNode(h.title)} description={h.description} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'تماس فوری با وکیل'}} secondaryAction={{href:h.secondaryHref||'#stage',label:h.secondaryLabel||'در کدام مرحله هستید؟'}} chips={[]}/><StageTrackContainer id='stage' title={s.stagesTitle||''} subtitle={s.stagesSubtitle||''} stages={s.stages||[]} digits={['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']}/><UserPledgeContainer title={s.rightsTitle||''} subtitle={s.rightsSubtitle||''} pledges={s.rights||[]}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||''} contents={s.faq||[]}/><UserCtaContainer title={c.title||''} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'تماس فوری با وکیل'}}/></div></MainUserLayout>}
