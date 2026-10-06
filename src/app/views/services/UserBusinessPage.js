import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import {DIGITS} from '@/app/data/services'
import {BUILDING,CHIPS,FAQ,FLAGS,STAGES,TYPES} from '@/app/data/commercialandcorporate'
const titleNode=(x,f)=><>{String(x||f).split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserBusinessPage({content}){const h=content?.hero||{},c=content?.cta||{},s=content?.sections||{};return <MainUserLayout><div className='ab bz' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'حقوق تجارت و شرکت‌ها'}]} badge={h.badge||'مشاوره پیش از ثبت و پیش از امضا'} title={titleNode(h.title,'کسب‌وکارتان را از {{روز اول}} ببندید')} description={h.description||'این یک متن نمونه است.'} icon={<path d={BUILDING}/>} chips={CHIPS}/><StaticDescriptionTextContainerSecondary containerTitle='مراحل کسب‌وکار' contents={s.stages||STAGES}/><StaticDescriptionTextContainerSecondary containerTitle='نشانه‌های خطر' contents={(s.risk||FLAGS).map(x=>typeof x==='string'?{title:x,text:''}:x)}/><StaticDescriptionTextContainerSecondary containerTitle='انواع شرکت' contents={s.types||TYPES.map(x=>({title:x.t,text:x.for}))}/><StaticDescriptionTextContainerSecondary containerTitle='سؤالات متداول' contents={s.faq||FAQ}/><UserCtaContainer title={c.title||'کسب‌وکارتان لایق قرارداد درست است.'} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'مشاوره برای شرکت من'}}/></div></MainUserLayout>}
