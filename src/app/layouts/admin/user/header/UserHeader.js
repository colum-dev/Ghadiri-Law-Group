'use client'

import { useIsMobile } from '@/app/utilities/CommonHelper'
import React from 'react'
import UserDesktopHeader from './UserDesktopHeader';

export default function UserHeader() {

    const isMobile = useIsMobile();

    return (
        isMobile
            ? <div></div>
            : <UserDesktopHeader />
    )
}
