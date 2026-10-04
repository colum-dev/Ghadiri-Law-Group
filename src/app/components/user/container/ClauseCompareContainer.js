'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import Svg from '../common/Svg'
import '../../../assets/styles/views/user/services/Contracts.scss'

export default function ClauseCompareContainer({ title, subtitle, items, digits, labels = { bad: 'بند مبهم', good: 'بند روشن' } }) {
    const [cur, setCur] = useState(0)
    const C = items[cur]
    const next = () => setCur((c) => (c + 1) % items.length)
    const prev = () => setCur((c) => (c - 1 + items.length) % items.length)

    return (
        <section className='ab-full ab-panel ab-panel--navy'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='ct-cmp'>
                    <button type='button' className='ct-cmp-nav' onClick={prev} aria-label='نمونهٔ قبلی'><Svg sw={2.4}><path d='M9 6l6 6-6 6' /></Svg></button>
                    <div className='ct-cmp-cards' key={cur}>
                        <div className='ct-cmp-card ct-cmp-card--bad'>
                            <span className='ct-cmp-tag'>{labels.bad}</span>
                            <p>{C.bad}</p>
                        </div>
                        <span className='ct-cmp-arrow' aria-hidden><Svg sw={2.2}><path d='M5 12h14M13 6l6 6-6 6' /></Svg></span>
                        <div className='ct-cmp-card ct-cmp-card--good'>
                            <span className='ct-cmp-tag'>{labels.good}</span>
                            <p>{C.good}</p>
                        </div>
                    </div>
                    <button type='button' className='ct-cmp-nav' onClick={next} aria-label='نمونهٔ بعدی'><Svg sw={2.4}><path d='M15 6l-6 6 6 6' /></Svg></button>
                </div>
                <p className='ct-cmp-note'>{C.note}</p>
                <div className='ct-cmp-dots'>
                    {items.map((_, i) => (
                        <button key={i} type='button' aria-label={`نمونهٔ ${digits[i]}`} className={i === cur ? 'is-on' : ''} onClick={() => setCur(i)} />
                    ))}
                </div>
            </div>
        </section>
    )
}