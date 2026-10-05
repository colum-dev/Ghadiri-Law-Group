'use client'

import React from 'react'
import Link from 'next/link'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import Reveal from '@/app/components/user/animation/Reveal'
import SectionTitle from '@/app/components/user/title/SectionTitle'
import UserCaseCard from '@/app/components/user/card/UserCaseCard'

export default function UserHomeBestCases({ content }) {
    const cases = (content?.items || []).map(({ statValue, statUnit, text, ...item }) => ({
        ...item,
        text: text || item.text || item.summary || '',
        ...(statValue ? { stat: { v: statValue, u: statUnit || '' } } : {}),
    }))

    return <div className='ab' dir='rtl'><div className='main-user-layout'><section className='ab-bare'>
        <SectionTitle title={content?.title || ''} subtitle={content?.subtitle || ''} />
        <div className='ab-grid ab-grid--3'>{cases.map((item, i) => <UserCaseCard content={item} key={i} i={i} />)}</div>
        {content?.buttonText && <Reveal className='text-center mt-4'><Link href={content.buttonLink || '#'} className='ab-btn'>{content.buttonText} <span aria-hidden>←</span></Link></Reveal>}
    </section></div></div>
}
