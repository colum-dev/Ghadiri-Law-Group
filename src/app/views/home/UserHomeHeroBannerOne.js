import UserHeroBannerPrimary from '@/app/components/user/banner/UserHeroBannerPrimary'
import React from 'react'
import { toBannerProps } from '@/app/utilities/heroBanner'

export default function UserHomeHeroBannerOne({ hero }) {
    return (
        <div className='bg-bone w-100'>
            <div className='main-user-layout'>
                <UserHeroBannerPrimary {...toBannerProps(hero)} />
            </div>
        </div>
    )
}
