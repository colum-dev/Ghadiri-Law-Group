import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '../../components/user/banner/UserHeroBannerTertiary'
import SituationTabsContainer from '../../components/user/container/SituationTabsContainer'
import PathSwitchContainer from '../../components/user/container/PathSwitchContainer'
import DocsChecklistContainer from '../../components/user/container/DocsChecklistContainer'
import StaticDescriptionTextContainerSecondary from '../../components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '../../components/user/container/UserCtaContainer'
const DIGITS=['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']
const titleNode=(x)=><>{String(x||'').split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
const normalizeSituations=(items=[])=>items.map((x)=>({...x,does:Array.isArray(x.does)?x.does:[],time:x.time||''}))
const normalizePaths=(items=[])=>items.map((x)=>({...x,steps:Array.isArray(x.steps)?x.steps:[],meter:Array.isArray(x.meter)?x.meter:[]}))
export default function UserFamilyPage({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{},situations=normalizeSituations(s.situations),paths=normalizePaths(s.paths);return <MainUserLayout><div className='ab fs' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'حقوق خانواده'}]} badge={h.badge} title={titleNode(h.title)} description={h.description} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'رزرو جلسهٔ مشاوره'}} secondaryAction={{href:h.secondaryHref||'#situation',label:h.secondaryLabel||'وضعیتم کدام است؟'}} chips={[]}/><SituationTabsContainer id='situation' title={s.situationsTitle||''} subtitle={s.situationsSubtitle||''} situations={situations} digits={DIGITS}/><PathSwitchContainer title={s.pathsTitle||''} subtitle={s.pathsSubtitle||''} paths={paths}/><DocsChecklistContainer title={s.docsTitle||''} subtitle={s.docsSubtitle||''} docs={Array.isArray(s.docs)?s.docs:[]}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||''} contents={Array.isArray(s.faq)?s.faq:[]}/><UserCtaContainer title={c.title||''} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'رزرو جلسهٔ مشاوره'}}/></div></MainUserLayout>}
