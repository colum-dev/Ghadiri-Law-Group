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
const titleNode=(x)=><>{String(x||'').split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserFamilyPage({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{};return <MainUserLayout><div className='ab fs' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'حقوق خانواده'}]} badge={h.badge} title={titleNode(h.title)} description={h.description} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'رزرو جلسهٔ مشاوره'}} secondaryAction={{href:h.secondaryHref||'#situation',label:h.secondaryLabel||'وضعیتم کدام است؟'}} chips={[]}/><SituationTabsContainer id='situation' title={s.situationsTitle||''} subtitle={s.situationsSubtitle||''} situations={s.situations||[]} digits={['۰۱','۰۲','۰۳','۰۴','۰۵','۰۶']}/><PathSwitchContainer title={s.pathsTitle||''} subtitle={s.pathsSubtitle||''} paths={s.paths||[]}/><DocsChecklistContainer title={s.docsTitle||''} subtitle={s.docsSubtitle||''} docs={s.docs||[]}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||''} contents={s.faq||[]}/><UserCtaContainer title={c.title||''} subtitle={c.subtitle||''} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'رزرو جلسهٔ مشاوره'}}/></div></MainUserLayout>}
