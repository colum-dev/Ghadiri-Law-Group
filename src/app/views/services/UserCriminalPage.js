import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import StageTrackContainer from '@/app/components/user/container/StageTrackContainer'
import UserPledgeContainer from '@/app/components/user/container/UserPledgeContainer'
import ClockCardsContainer from '@/app/components/user/container/ClockCardsContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { DIGITS } from '@/app/data/services'
import { CHIPS, CLOCK, FAQ, RIGHTS, SHIELD, STAGES } from '@/app/data/criminal'
const titleNode=(x,f)=><>{String(x||f).split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserCriminalPage({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{};return <MainUserLayout><div className='ab cr' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'دعاوی کیفری'}]} badge={h.badge||'خط تماس فوری، شبانه‌روزی'} badgeClassName='cr-pulse' title={titleNode(h.title,'دفاع از {{ساعت‌های اول}}')} description={h.description||'این یک متن نمونه است.'} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'تماس فوری با وکیل'}} secondaryAction={{href:h.secondaryHref||'#stage',label:h.secondaryLabel||'در کدام مرحله هستید؟'}} icon={<path d={SHIELD}/>} chips={CHIPS}/><StageTrackContainer id='stage' title={s.stagesTitle||'در کدام مرحله هستید؟'} subtitle={s.stagesSubtitle||'روی هر ایستگاه بزنید تا ببینید در آن مرحله چه کاری انجام می‌دهیم.'} stages={s.stages||STAGES} digits={DIGITS}/><UserPledgeContainer title={s.rightsTitle||'حقوق شما در بازداشت و بازجویی'} subtitle={s.rightsSubtitle||'دانستن این حقوق، اولین خط دفاع از خودتان است.'} pledges={s.rights||RIGHTS}/><ClockCardsContainer title={s.clocksTitle||'چرا ساعت‌های اول این‌قدر مهم است؟'} subtitle={s.clocksSubtitle||'بازه‌های زیر نمونه‌اند و باید به‌روز شوند.'} clocks={s.clocks||CLOCK}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||'قبل از تماس، شاید بپرسید'} contents={s.faq||FAQ}/><UserCtaContainer title={c.title||'همین حالا نیاز به وکیل دارید؟'} subtitle={c.subtitle||'خط تماس فوری ما شبانه‌روزی پاسخگوی شماست.'} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'تماس فوری با وکیل'}}/></div></MainUserLayout>}
