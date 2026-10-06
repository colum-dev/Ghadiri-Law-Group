import React from 'react'
import UserContactCtaContainer from '@/app/components/user/container/UserContactCtaContainer'
import { MARQUEE_WORDS } from '@/app/data/contact'
import { SERVICES } from '@/app/data/services'

export default function UserHomeContact({ content, departments }) {
  const data = content || {}
  const deptTitles = departments?.length ? departments.map((d) => d.title) : SERVICES.map((s) => s.title)
  const words = data.marqueeWords?.length ? data.marqueeWords : MARQUEE_WORDS
  const contact = {
    phone: data.phone || '', phoneLabel: data.phoneLabel || data.phone || '', whatsapp: data.whatsapp || '',
    email: data.email || '', address: data.address || '', hours: data.hours || '',
  }
  return <UserContactCtaContainer contact={contact} words={words} departments={deptTitles} endpoint={data.endpoint || ''}
    status={data.status || ''} title={data.title || ''} subtitle={data.subtitle || ''} />
}
