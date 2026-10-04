'use client'

import { useIsMobile } from '@/app/utilities/CommonHelper'
import React from 'react'
import UserDesktopHeader from './UserDesktopHeader';
import UserMobileHeader from './UserMobileHeader';

export const SERVICES = [
    { slug: 'family', t: 'حقوق خانواده', icon: 'M12 21C5 16 3 12 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 12 19 16 12 21z' },
    { slug: 'criminal-cases', t: 'دعاوی کیفری', icon: 'M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z' },
    { slug: 'commercial-and-corporate', t: 'تجارت و شرکت‌ها', icon: 'M4 21V9l8-5 8 5v12z M9 21v-6h6v6' },
    { slug: 'real-estate', t: 'املاک و ثبت اسناد', icon: 'M3 11l9-8 9 8 M5 10v11h14V10 M10 21v-6h4v6' },
    { slug: 'contracts', t: 'قراردادها و مشاوره', icon: 'M4 20l4-1L19 8l-3-3L5 16l-1 4z M14 7l3 3' },
    { slug: 'administrative-and-tax', t: 'دعاوی اداری و مالیاتی', icon: 'M6 3h9l4 4v14H6V3zm3 8h7M9 15h7' },
]

export const LINKS = [
    { t: 'درباره ما', href: '/about-us' },
    { t: 'همکاران', href: '/colleagues' },
    { t: 'بلاگ حقوقی', href: '/blogs' },
    { t: 'تماس با ما', href: '/contact-us' },
    { t: 'سوالات متداول', href: '/faqs' },
]

export const PHONE_DISPLAY = '۰۲۱-۱۲۳۴۵۶۷۸'
export const PHONE_HREF = 'tel:+982112345678'

export const Svg = ({ d, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'><path d={d} /></svg>
)

export default function UserHeader() {

    const isMobile = useIsMobile();


    return (
        isMobile
            ? <UserMobileHeader />
            : <UserDesktopHeader />
    )
}
