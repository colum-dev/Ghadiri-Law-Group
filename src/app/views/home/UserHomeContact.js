import React from 'react'
import UserContactCtaContainer from '@/app/components/user/container/UserContactCtaContainer'
import { CONTACT, MARQUEE_WORDS } from '@/app/data/contact'
import { SERVICES } from '@/app/data/services'
export default function UserHomeContact({ content, departments }) { const deptTitles=departments?.length?departments.map(d=>d.title):SERVICES.map(s=>s.title); const words=content?.marqueeWords?.length?content.marqueeWords:MARQUEE_WORDS; return <UserContactCtaContainer contact={CONTACT} words={words} departments={deptTitles} status={content?.status||''} title={content?.title||''} subtitle={content?.subtitle||''}/> }
