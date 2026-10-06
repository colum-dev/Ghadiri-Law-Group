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
    return <div>
        <UserHomeHeroBannerOne hero={hero} />
        <UserHomeAboutUs about={about} />
        <UserHomeDeprtments content={content.departments} />
        <UserHomeBestCases content={content.bestCases} />
        <UserHomeCases content={content.cases} />
        <UserHomeCoworkers content={content.coworkers} />
        <UserHomeBlogs posts={blogs} />
        <UserHomeContact content={content.contact} departments={content.departments?.items} />
    </div>
}
