'use client'

import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/services/services.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerQuaternary from '@/app/components/user/banner/UserHeroBannerQuaternary'
import UserServiceSection from '@/app/components/user/container/UserServiceSection'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { DIGITS, SERVICES } from '@/app/data/services'

export default function UserServices() {
    return (
        <MainUserLayout>
            <div className='ab' dir='rtl'>
                <UserHeroBannerQuaternary
                    crumb={[{ label: 'خانه', href: '/' }, { label: 'خدمات حقوقی' }]}
                    title={<>خدمات <em>حقوقی</em></>}
                    description='این یک متن نمونه است. مسئلهٔ شما در کدام حوزه است؟ از فهرست کنار انتخاب کنید یا پایین‌تر خلاصهٔ هر خدمت را بخوانید.'
                    indexTitle='فهرست خدمات'
                    indexItems={SERVICES.map((s) => ({ label: s.title, href: `#${s.slug}` }))}
                    digits={DIGITS}
                />

                {SERVICES.map((s, i) => (
                    <UserServiceSection key={s.slug} service={s} index={i} digits={DIGITS} />
                ))}

                <UserCtaContainer
                    title='پرونده‌تان در هیچ‌کدام جا نمی‌گیرد؟'
                    subtitle='همین را برایمان بگویید؛ در همان جلسهٔ اول مسیر را روشن می‌کنیم.'
                    action={{ label: 'با ما تماس بگیرید', href: '/contact-us' }}
                />
            </div>
        </MainUserLayout>
    )
}
