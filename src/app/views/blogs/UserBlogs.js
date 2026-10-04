'use client'

import React, { useState } from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/blogs/Blogs.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import UserBlogListContainer from '@/app/components/user/container/UserBlogListContainer'
import UserNewsletterContainer from '@/app/components/user/container/UserNewsletterContainer'
import SearchInput from '@/app/components/user/common/SearchInput'
import UserHomeContact from '../home/UserHomeContact'
import { ARTICLES, CATEGORIES, ICONS } from '@/app/data/blogs'

const BOOK_ICON = <path d='M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z M20 18H6.5A2.5 2.5 0 0 0 4 20.5' />

export default function UserBlogs() {
    const [q, setQ] = useState('')

    return (
        <MainUserLayout>
            <div className='ab ar' dir='rtl'>
                <UserHeroBannerTertiary
                    crumb={[{ label: 'خانه', href: '/' }, { label: 'مقالات' }]}
                    badge='یادداشت‌هایی از دل پرونده‌های واقعی'
                    title={<>حقوق را <em>ساده</em> بخوانید</>}
                    description='این یک متن نمونه است. مقالاتی کوتاه دربارهٔ سؤالاتی که موکلان بیشتر از همه از ما می‌پرسند.'
                    icon={BOOK_ICON}
                >
                    <SearchInput value={q} onChange={setQ} placeholder='جست‌وجو در عنوان مقالات…' />
                </UserHeroBannerTertiary>

                <UserBlogListContainer
                    articles={ARTICLES}
                    categories={CATEGORIES}
                    icons={ICONS}
                    query={q}
                />

                <UserNewsletterContainer />

                <UserHomeContact />
            </div>
        </MainUserLayout>
    )
}
