import React from 'react'
import UserHomeHeroBannerOne from './UserHomeHeroBannerOne';
import UserHomeAboutUs from './UserHomeAboutUs';

export default function UserHome() {
    return (
        <div>
            <div className='bg-bone w-100'>
                <div className='main-user-layout'>
                <UserHomeHeroBannerOne />
                </div>
            </div>

            <UserHomeAboutUs />
        </div>
    )
}
