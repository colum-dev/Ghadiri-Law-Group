'use client'

import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/views/user/blogs/Blogs.scss'
import UserBlogListContainer from '@/app/components/user/container/UserBlogListContainer'
import { ARTICLES, CATEGORIES, ICONS } from '@/app/data/blogs'

export default function UserHomeBlogs() {
    return (
        <div className='ab ar' dir='rtl'>
            <UserBlogListContainer articles={ARTICLES} categories={CATEGORIES} icons={ICONS} />
        </div>
    )
}
