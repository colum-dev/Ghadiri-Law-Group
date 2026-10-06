import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import {DIGITS} from '@/app/data/services'
import {CHIPS,FAQ,RIGHTS,STAGES,SHIELD,CLOCK} from '@/app/data/criminal'
const titleNode=(x,f)=><>{String(x||f).split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserCriminalPage({content}){const h=content?.hero||{},c=content?.cta||{},s=content?.sections||{};return <MainUserLayout><div className='ab cr' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'دعاوی کیفری'}]} badge={h.badge||'خط تماس فوری، شبانه‌روزی'} title={titleNode(h.title,'دفاع از {{ساعت‌های اول}}')} description={h.description||'این یک متن نمونه است.'} icon={<path d={SHIELD}/>} chips={CHIPS}/><StaticDescriptionTextContainerSecondary containerTitle='مراحل پرونده' contents={s.stages||STAGES}/><StaticDescriptionTextContainerSecondary containerTitle='حقوق شما' contents={s.rights||RIGHTS.map(x=>({title:x,text:''}))}/><StaticDescriptionTextContainerSecondary containerTitle='زمان‌های مهم' contents={s.clocks||CLOCK.map(x=>({title:`${x.h} ${x.u}`,text:x.l}))}/><StaticDescriptionTextContainerSecondary containerTitle='قبل از تماس، شاید بپرسید' contents={s.faq||FAQ}/><UserCtaContainer title={c.title||'همین حالا نیاز به وکیل دارید؟'} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'تماس فوری با وکیل'}}/></div></MainUserLayout>}
