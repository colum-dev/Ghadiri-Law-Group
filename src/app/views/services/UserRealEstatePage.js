import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import {DIGITS} from '@/app/data/services'
import {CHIPS,DEEDS,FAQ,KEY,RISK_ITEMS,ROLES} from '@/app/data/realestate'
const titleNode=(x,f)=><>{String(x||f).split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserRealEstatePage({content}){const h=content?.hero||{},c=content?.cta||{},s=content?.sections||{};return <MainUserLayout><div className='ab re' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'املاک و ثبت اسناد'}]} badge={h.badge||'استعلام سند، پیش از هر پرداختی'} title={titleNode(h.title,'یک {{سند}}، هزار داستان')} description={h.description||'این یک متن نمونه است.'} icon={<path d={KEY}/>} chips={CHIPS}/><StaticDescriptionTextContainerSecondary containerTitle='انواع سند' contents={s.deeds||DEEDS}/><StaticDescriptionTextContainerSecondary containerTitle='موارد بررسی ریسک' contents={s.risk||RISK_ITEMS.map(x=>({title:x.t,text:`وزن: ${x.w}`}))}/><StaticDescriptionTextContainerSecondary containerTitle='مالک یا مستأجر' contents={s.roles||ROLES}/><StaticDescriptionTextContainerSecondary containerTitle='سؤالات متداول' contents={s.faq||FAQ}/><UserCtaContainer title={c.title||'قبل از امضا، یک تماس بگیرید.'} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'استعلام رایگان سند'}}/></div></MainUserLayout>}
