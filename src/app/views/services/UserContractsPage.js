import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import {CHIPS,COMPARE,FAQ,PEN,STEPS,TYPES} from '@/app/data/contracts'
const titleNode=(x,f)=><>{String(x||f).split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserContractsPage({content}){const h=content?.hero||{},c=content?.cta||{},s=content?.sections||{};return <MainUserLayout><div className='ab ct' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'قراردادها و مشاورهٔ حقوقی'}]} badge={h.badge||'بازبینی پیش از هر امضا'} title={titleNode(h.title,'پیش از امضا، {{یک نگاه دوم}}')} description={h.description||'این یک متن نمونه است.'} icon={<path d={PEN}/>} chips={CHIPS}/><StaticDescriptionTextContainerSecondary containerTitle='انواع قرارداد' contents={s.types||TYPES.map(x=>({title:x.t,text:(x.clauses||[]).join('، ')}))}/><StaticDescriptionTextContainerSecondary containerTitle='مقایسه بندها' contents={s.compare||COMPARE}/><StaticDescriptionTextContainerSecondary containerTitle='مراحل' contents={s.steps||STEPS}/><StaticDescriptionTextContainerSecondary containerTitle='سؤالات متداول' contents={s.faq||FAQ}/><UserCtaContainer title={c.title||'قراردادتان را امضا نکنید؛ اول نشانش دهید.'} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'ارسال قرارداد برای بررسی'}}/></div></MainUserLayout>}
