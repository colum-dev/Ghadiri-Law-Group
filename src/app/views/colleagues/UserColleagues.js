'use client'

import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/views/user/blogs/Blogs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/colleagues/Colleagues.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerQuaternary from '@/app/components/user/banner/UserHeroBannerQuaternary'
import UserColleagueProfile from '@/app/components/user/container/UserColleagueProfile'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { COLLEAGUES, DIGITS } from '@/app/data/colleagues'
import { ARTICLES, CATEGORIES, ICONS } from '@/app/data/blogs'

export default function UserColleagues() {
    return (
        <MainUserLayout>
            <div className='ab tm' dir='rtl'>
                <UserHeroBannerQuaternary
                    crumb={[{ label: 'خانه', href: '/' }, { label: 'همکاران' }]}
                    title={<>همکاران <em>حقوقی</em> ما</>}
                    description='این یک متن نمونه است. با وکلا و مشاورانی آشنا شوید که پرونده شما را به عهده می‌گیرند؛ تحصیلات، سوابق و مطالبی که نوشته‌اند.'
                    indexTitle='فهرست همکاران'
                    indexItems={COLLEAGUES.map((c) => ({ label: c.name, href: `#${c.slug}` }))}
                    digits={DIGITS}
                />

                {COLLEAGUES.map((c, i) => (
                    <UserColleagueProfile
                        key={c.slug}
                        colleague={c}
                        posts={ARTICLES.filter((a) => a.author === c.name)}
                        categories={CATEGORIES}
                        icons={ICONS}
                        index={i}
                        digits={DIGITS}
                        tone={i % 2 ? 'navy' : 'bone'}
                    />
                ))}

                <UserCtaContainer
                    title='می‌خواهید با یکی از همکاران صحبت کنید؟'
                    subtitle='موضوع پرونده را بنویسید تا به همکار مرتبط ارجاع دهیم.'
                    action={{ href: '/contact-us', label: 'تماس با ما' }}
                />
            </div>
        </MainUserLayout>
    )
}
