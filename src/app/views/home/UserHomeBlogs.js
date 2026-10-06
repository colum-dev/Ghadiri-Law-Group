'use client'

import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/views/user/blogs/Blogs.scss'
import UserBlogListContainer from '@/app/components/user/container/UserBlogListContainer'
import { CATEGORIES, ICONS } from '@/app/data/blogs'

export default function UserHomeBlogs({ posts = [] }) {
    return (
        <div className='ab ar' dir='rtl'>
            <UserBlogListContainer articles={posts} categories={CATEGORIES} icons={ICONS} />
        </div>
    )
}
