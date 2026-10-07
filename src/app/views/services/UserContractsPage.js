import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import ContractTypeContainer from '@/app/components/user/container/ContractTypeContainer'
import ClauseCompareContainer from '@/app/components/user/container/ClauseCompareContainer'
import StepCardsContainer from '@/app/components/user/container/StepCardsContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import {DIGITS} from '@/app/data/services'
import {CHIPS,COMPARE,FAQ,PEN,STEPS,TYPES} from '@/app/data/contracts'
const titleNode=(x,f)=><>{String(x||f).split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserContractsPage({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{};return <MainUserLayout><div className='ab ct' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'قراردادها و مشاورهٔ حقوقی'}]} badge={h.badge||'بازبینی پیش از هر امضا'} title={titleNode(h.title,'پیش از امضا، {{یک نگاه دوم}}')} description={h.description||'این یک متن نمونه است.'} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'ارسال قرارداد برای بررسی'}} secondaryAction={{href:h.secondaryHref||'#type',label:h.secondaryLabel||'نوع قراردادم کدام است؟'}} icon={<path d={PEN}/>} chips={CHIPS}/><ContractTypeContainer id='type' title={s.typesTitle||'قراردادتان دربارهٔ چیست؟'} subtitle={s.typesSubtitle||'یکی را انتخاب کنید تا بندهای کلیدی همان نوع قرارداد را ببینید.'} types={s.types||TYPES} digits={DIGITS}/><ClauseCompareContainer title={s.compareTitle||'یک بند مبهم، در برابر یک بند روشن'} subtitle={s.compareSubtitle||'با فلش‌ها نمونه‌های دیگر را هم ببینید.'} items={s.compare||COMPARE} digits={DIGITS}/><StepCardsContainer title={s.stepsTitle||'از ارسال قرارداد تا نسخهٔ نهایی'} steps={s.steps||STEPS} digits={DIGITS}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||'قبل از تماس، شاید بپرسید'} contents={s.faq||FAQ}/><UserCtaContainer title={c.title||'قراردادتان را امضا نکنید؛ اول نشانش دهید.'} subtitle={c.subtitle||'بازبینی اولیه سریع است و شما را متعهد به ادامه نمی‌کند.'} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'ارسال قرارداد برای بررسی'}}/></div></MainUserLayout>}
