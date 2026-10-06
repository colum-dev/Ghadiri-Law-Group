import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import SituationTabsContainer from '@/app/components/user/container/SituationTabsContainer'
import PathSwitchContainer from '@/app/components/user/container/PathSwitchContainer'
import DocsChecklistContainer from '@/app/components/user/container/DocsChecklistContainer'
import LawyerAsideCard from '@/app/components/user/card/LawyerAsideCard'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import {DIGITS} from '@/app/data/services'
import {CHIPS,DOCS,FAQ,HEART,LAWYER,PATHS,SITUATIONS} from '@/app/data/family'
const titleNode=(x,f)=><>{String(x||f).split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserFamilyPage({content}){const h=content?.hero||{},c=content?.cta||{},s=content?.sections||{};return <MainUserLayout><div className='ab fs' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'حقوق خانواده'}]} badge={h.badge||'جلسهٔ اول کاملاً محرمانه'} title={titleNode(h.title,'پیش از دادگاه، {{یک گفتگو}}')} description={h.description||'این یک متن نمونه است.'} primaryAction={{href:'#',label:'رزرو جلسهٔ مشاوره'}} secondaryAction={{href:'#situation',label:'وضعیتم کدام است؟'}} icon={<path d={HEART}/>} chips={CHIPS}/><SituationTabsContainer id='situation' title='مسئلهٔ شما کدام است؟' subtitle='' situations={s.situations||SITUATIONS} digits={DIGITS}/><PathSwitchContainer title='توافقی یا قضایی؟' subtitle='' paths={s.paths||PATHS}/><DocsChecklistContainer title='برای جلسهٔ اول چه بیاورید؟' subtitle='' docs={s.docs||DOCS} aside={<LawyerAsideCard {...LAWYER}/>}/><StaticDescriptionTextContainerSecondary containerTitle='قبل از تماس، شاید بپرسید' contents={s.faq||FAQ}/><UserCtaContainer title={c.title||'هر چه هست، از همین‌جا شروع می‌شود.'} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'رزرو جلسهٔ مشاوره'}}/></div></MainUserLayout>}
