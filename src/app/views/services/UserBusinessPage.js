import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import StageExplorerContainer from '@/app/components/user/container/StageExplorerContainer'
import RiskScanContainer from '@/app/components/user/container/RiskScanContainer'
import CompareCardsContainer from '@/app/components/user/container/CompareCardsContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
const DIGITS=['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']
const titleNode=(x)=><>{String(x||'').split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
const normalizeStages=(items=[])=>items.map((x)=>({...x,short:x.short||x.text||'',heading:x.heading||x.t||'',text:x.text||x.short||'',points:Array.isArray(x.points)?x.points:Array.isArray(x.does)?x.does:[]}))
const normalizeTypes=(items=[])=>items.map((x)=>({...x,for:x.for||x.text||'',attrs:Array.isArray(x.attrs)?x.attrs:[]}))
const normalizeFlags=(items=[])=>items.filter((x)=>typeof x==='string')
export default function UserBusinessPage({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{},stages=normalizeStages(s.stages),types=normalizeTypes(s.types),flags=normalizeFlags(s.risk),labels=s.riskLabels||{none:'بدون نشانهٔ خطر',low:'نیاز به بازبینی جزئی',high:'نیاز به بازبینی جدی'};return <MainUserLayout><div className='ab bz' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'حقوق تجارت و شرکت‌ها'}]} badge={h.badge} title={titleNode(h.title)} description={h.description} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'مشاوره برای شرکت من'}} secondaryAction={{href:h.secondaryHref||'#stage',label:h.secondaryLabel||'مرحلهٔ کسب‌وکارم کدام است؟'}} chips={[]}/><StageExplorerContainer id='stage' title={s.stagesTitle||''} subtitle={s.stagesSubtitle||''} stages={stages} digits={DIGITS}/><RiskScanContainer title={s.riskTitle||''} subtitle={s.riskSubtitle||''} flags={flags} labels={labels} action={{href:s.riskHref||'#',label:s.riskActionLabel||'بازبینی این قرارداد'}}/><CompareCardsContainer title={s.typesTitle||''} subtitle={s.typesSubtitle||''} items={types}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||''} contents={Array.isArray(s.faq)?s.faq:[]}/><UserCtaContainer title={c.title||''} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'مشاوره برای شرکت من'}}/></div></MainUserLayout>}
