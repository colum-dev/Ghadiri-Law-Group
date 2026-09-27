import React from 'react'
import UserHeader from './header/UserHeader'
import '../../../assets/styles/layouts/user/MainUserLayout.scss';

export default function MainUserLayout(props) {

    const { children } = props;
    return (
        <div className='bg-bone h-100'>
        <div className='main-user-layout'>
            <UserHeader />
            {children}
        </div>
        </div>
    )
}
