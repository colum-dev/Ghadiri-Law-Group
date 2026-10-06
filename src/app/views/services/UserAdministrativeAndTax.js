import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import {CHIPS,DOC_ICON,FAQ,NOTICES,STAIRS} from '@/app/data/administrativeandtax'
const titleNode=(x,f)=><>{String(x||f).split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserAdministrativeAndTax({content}){const h=content?.hero||{},c=content?.cta||{},s=content?.sections||{};return <MainUserLayout><div className='ab' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'دعاوی اداری و مالیاتی'}]} badge={h.badge||'اعتراض در مهلت قانونی'} title={titleNode(h.title,'برگ تشخیص گرفته‌اید؟ {{مهلت دارید}}')} description={h.description||'این یک متن نمونه است.'} icon={<path d={DOC_ICON}/>} chips={CHIPS}/><StaticDescriptionTextContainerSecondary containerTitle='ابلاغیه‌ها' contents={s.notices||NOTICES}/><StaticDescriptionTextContainerSecondary containerTitle='مراحل رسیدگی' contents={s.stairs||STAIRS}/><StaticDescriptionTextContainerSecondary containerTitle='سؤالات متداول' contents={s.faq||FAQ}/><UserCtaContainer title={c.title||'مهلت اعتراضتان را از دست ندهید.'} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'بررسی فوری برگه‌ام'}}/></div></MainUserLayout>}
