import React from 'react'
import { Row } from 'react-bootstrap'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import SectionTitle from '@/app/components/user/title/SectionTitle'
import UserDetailCardSecondary from '@/app/components/user/card/UserDetailCardSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { DEPARTMENTS } from '@/app/data/departments'

const SCALE_ICON = <path d='M12 3v18M5 7h14M5 7l-2 6a3 3 0 0 1 4 0L5 7zm14 0l-2 6a3 3 0 0 0 4 0l-2-6z' />
export default function UserDepartments({ content }) { const hero=content?.hero||{}, section=content?.section||{}, c=content?.cta||{}; const departments=content?.departments?.length?content.departments:DEPARTMENTS; const titleNode=(value,fallback)=><>{String(value||fallback).split(/\{\{(.+?)\}\}/g).map((part,i)=>i%2?<em key={i}>{part}</em>:part)}</>; return <MainUserLayout><div className='ab' dir='rtl'><UserHeroBannerTertiary crumb={[{label:'خانه',href:'/'},{label:'دپارتمان‌ها'}]} badge={hero.badge||'۱۲ حوزهٔ تخصصی، زیر یک سقف'} title={titleNode(hero.title,'دپارتمان‌های {{حقوقی}} ما')} description={hero.description||'این یک متن نمونه است. هر دپارتمان به متخصص همان حوزه سپرده شده؛ برای آشنایی بیشتر با هرکدام، وارد صفحه‌اش شوید.'} icon={SCALE_ICON}/><div className='main-user-layout'><section className='ab-bare'><SectionTitle title={section.title||'دپارتمان‌های گروه حقوقی غدیری'} subtitle={section.subtitle||'این یک متن نمونه است. از خانواده تا فناوری اطلاعات، دوازده حوزهٔ تخصصی که پرونده‌ی شما را پوشش می‌دهند.'}/><Row className='g-4'>{departments.map((d,i)=><UserDetailCardSecondary detail={d} key={d.slug||i}/>)}</Row></section></div><UserCtaContainer title={c.title||'نمی‌دانید پرونده‌تان به کدام دپارتمان مربوط است؟'} subtitle={c.subtitle||'کافی است با ما تماس بگیرید؛ دپارتمان مناسب را خودمان مشخص می‌کنیم.'} action={{label:c.actionLabel||'با ما تماس بگیرید',href:c.actionHref||'/contact-us'}}/></div></MainUserLayout>}
