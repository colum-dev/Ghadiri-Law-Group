import React from 'react'
import UserContactCtaContainer from '@/app/components/user/container/UserContactCtaContainer'
import { CONTACT, MARQUEE_WORDS } from '@/app/data/contact'
import { SERVICES } from '@/app/data/services'

const DEPARTMENTS = SERVICES.map((s) => s.title)

export default function UserHomeContact({ content }) {
    return <UserContactCtaContainer contact={CONTACT} words={MARQUEE_WORDS} departments={DEPARTMENTS}
        status={content?.status || 'کنار شما، از همان اولین تماس'}
        title={content?.title || 'پرونده‌ات را به دست‌های مطمئن بسپار'}
        subtitle={content?.subtitle || 'این یک متن نمونه است. یک تماس کوتاه کافی است تا مسیر پرونده‌ات روشن شود.'} />
}
