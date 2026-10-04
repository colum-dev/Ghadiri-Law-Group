'use client'

import React, { useState } from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/views/user/blogs/Blogs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/faqs/Faqs.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import SearchInput from '@/app/components/user/common/SearchInput'
import FaqListContainer from '@/app/components/user/container/FaqListContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { CATEGORIES, FAQS, PRINCIPLES, Q_MARK } from '@/app/data/faqs'

const DIGITS = Array.from({ length: 30 }, (_, i) => String(i + 1).padStart(2, '0').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]))
const HERO_ICON = <path d='M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zm14 0l-3 7a3.5 3.5 0 0 0 6 0l-3-7z' />

export default function UserFaqs() {
    const [q, setQ] = useState('')

    return (
        <MainUserLayout>
            <div className='ab fq' dir='rtl'>
                <UserHeroBannerTertiary
                    crumb={[{ label: 'خانه', href: '/' }, { label: 'سؤالات متداول' }]}
                    badge='پاسخ به سؤالاتی که بیشتر می‌پرسید'
                    title={<>قبل از تماس، <em>شاید اینجا باشد</em></>}
                    description='این یک متن نمونه است. دسته‌بندی کنید یا جست‌وجو کنید؛ اگر جواب را پیدا نکردید، همیشه می‌توانید مستقیم با ما تماس بگیرید.'
                    icon={HERO_ICON}
                >
                    <div className='ar'>
                        <SearchInput value={q} onChange={setQ} placeholder='جست‌وجو در سؤالات…' />
                    </div>
                </UserHeroBannerTertiary>

                <FaqListContainer
                    faqs={FAQS}
                    categories={CATEGORIES}
                    digits={DIGITS}
                    query={q}
                    actionLabel='بیشتر بخوانید'
                />

                <StaticDescriptionTextContainerSecondary
                    containerTitle='این یک متن نمونه است.'
                    containerSubTitle='اصولی که وکالت را معنا می‌دهد'
                    contents={PRINCIPLES}
                />

                <UserCtaContainer
                    title='سؤالتان اینجا نبود؟'
                    subtitle='مستقیم برایمان بنویسید؛ خیلی زود جواب می‌گیرید.'
                    action={{ href: '/contact-us', label: 'تماس با ما' }}
                />
            </div>
        </MainUserLayout>
    )
}