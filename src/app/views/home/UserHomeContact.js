import React from 'react'
import UserContactCtaContainer from '@/app/components/user/container/UserContactCtaContainer'
import { CONTACT, MARQUEE_WORDS } from '@/app/data/contact'
import { SERVICES } from '@/app/data/services'

const DEPARTMENTS = SERVICES.map((s) => s.title)

export default function UserHomeContact() {
    return (
        <UserContactCtaContainer
            contact={CONTACT}
            words={MARQUEE_WORDS}
            departments={DEPARTMENTS}
            status='کنار شما، از همان اولین تماس'
            title='پرونده‌ات را به دست‌های مطمئن بسپار'
            subtitle='این یک متن نمونه است. یک تماس کوتاه کافی است تا مسیر پرونده‌ات روشن شود.'
        />
    )
}