import React from 'react'
import UserHeader from './header/UserHeader'
import '../../../assets/styles/layouts/user/MainUserLayout.scss';

export default function MainUserLayout(props) {

    const { children } = props;
    return (
        <div dir='rtl' className='yekan-bakh-bold'>
            <div>
                <UserHeader />
                {children}
            </div>
        </div>
    )
}
