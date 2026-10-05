'use client'

import React from 'react'
import UserHomeHeroBannerOne from './UserHomeHeroBannerOne';
import UserHomeAboutUs from './UserHomeAboutUs';
import UserHomeDeprtments from './UserHomeDeprtments';
import UserHomeCases from './UserHomeCases';
import UserHomeContact from './UserHomeContact';
import UserHomeBestCases from './UserHomeBestCases';
import UserHomeBlogs from './UserHomeBlogs';
import UserHomeCoworkers from './UserHomeCoworkers';

export default function UserHome({ hero }) {
    return (
        <div>
            <UserHomeHeroBannerOne hero={hero} />
            <UserHomeAboutUs />
            <UserHomeDeprtments />
            <UserHomeBestCases />
            <UserHomeCoworkers />
            <UserHomeContact />
            <UserHomeBlogs />
        </div>
    )
}
