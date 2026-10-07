import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import DeedFlipContainer from '@/app/components/user/container/DeedFlipContainer'
import RiskGaugeContainer from '@/app/components/user/container/RiskGaugeContainer'
import RoleStepsContainer from '@/app/components/user/container/RoleStepsContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import {DIGITS} from '@/app/data/services'
import {CHIPS,DEEDS,FAQ,KEY,RISK_ITEMS,RISK_LABELS,ROLES} from '@/app/data/realestate'
const titleNode=(x,f)=><>{String(x||f).split(/\{\{(.+?)\}\}/g).map((p,i)=>i%2?<em key={i}>{p}</em>:p)}</>
export default function UserRealEstatePage({content}){const h=content?.hero||{},s=content?.sections||{},c=content?.cta||{};return <MainUserLayout><div className='ab re' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'خدمات حقوقی',href:'/services'},{label:'املاک و ثبت اسناد'}]} badge={h.badge||'استعلام سند، پیش از هر پرداختی'} title={titleNode(h.title,'یک {{سند}}، هزار داستان')} description={h.description||'این یک متن نمونه است.'} primaryAction={{href:h.primaryHref||'#',label:h.primaryLabel||'استعلام رایگان سند'}} secondaryAction={{href:h.secondaryHref||'#risk',label:h.secondaryLabel||'ریسک معامله‌ام چقدر است؟'}} icon={<path d={KEY}/>} iconClassName='re-key' chips={CHIPS}/><DeedFlipContainer title={s.deedsTitle||'ملک شما چه سندی دارد؟'} subtitle={s.deedsSubtitle||'روی هر کارت بزنید تا پشت آن را ببینید؛ سطح ریسک هر نوع سند فرق دارد.'} deeds={s.deeds||DEEDS}/><RiskGaugeContainer id='risk' title={s.riskTitle||'پیش از پرداخت هر مبلغی، این‌ها را چک کنید'} subtitle={s.riskSubtitle||'هر مورد را که انجام داده‌اید علامت بزنید؛ عقربهٔ ریسک زنده تغییر می‌کند.'} items={s.risk||RISK_ITEMS} labels={s.riskLabels||RISK_LABELS}/><RoleStepsContainer title={s.rolesTitle||'مالک هستید یا مستأجر؟'} subtitle={s.rolesSubtitle||'مسیر رسیدگی برای هرکدام فرق دارد.'} roles={s.roles||ROLES} digits={DIGITS}/><StaticDescriptionTextContainerSecondary containerTitle={s.faqTitle||'قبل از تماس، شاید بپرسید'} contents={s.faq||FAQ}/><UserCtaContainer title={c.title||'قبل از امضا، یک تماس بگیرید.'} subtitle={c.subtitle||'استعلام اولیهٔ سند رایگان است و شما را متعهد به ادامه نمی‌کند.'} action={{href:c.actionHref||'/contact-us',label:c.actionLabel||'استعلام رایگان سند'}}/></div></MainUserLayout>}
