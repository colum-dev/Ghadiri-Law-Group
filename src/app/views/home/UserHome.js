'use client'

import React from 'react'
import UserHomeHeroBannerOne from './UserHomeHeroBannerOne'
import UserHomeAboutUs from './UserHomeAboutUs'
import UserHomeDeprtments from './UserHomeDeprtments'
import UserHomeCases from './UserHomeCases'
import UserHomeContact from './UserHomeContact'
import UserHomeBestCases from './UserHomeBestCases'
import UserHomeCoworkers from './UserHomeCoworkers'
import UserHomeBlogs from './UserHomeBlogs'

export default function UserHome({ hero, about, content = {}, blogs = [] }) {
    const safeContent = content || {}
    return <div>
        <UserHomeHeroBannerOne hero={hero || {}} />
        <UserHomeAboutUs about={about || {}} />
        <UserHomeDeprtments content={safeContent.departments || {}} />
        <UserHomeBestCases content={safeContent.bestCases || {}} />
        <UserHomeCases content={safeContent.cases || {}} />
        <UserHomeCoworkers content={safeContent.coworkers || {}} />
        <UserHomeBlogs posts={blogs} />
        <UserHomeContact content={safeContent.contact || {}} departments={safeContent.departments?.items || []} />
    </div>
}
