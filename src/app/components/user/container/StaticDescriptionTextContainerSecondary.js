'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle';

export default function StaticDescriptionTextContainerSecondary(props) {
    const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵', '۰۶']
    const [open, setOpen] = useState(0)
    const [pol, setPol] = useState(0)

    const Svg = ({ children, sw = 1.7 }) => (
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>
            {children}
        </svg>
    )

    const { containerTitle, containerSubTitle, contents } = props;
    return (
        <div className='main-user-layout'>
            <section className='ab-panel ab-panel--gold radius-md'>
                <span className='ab-blob ab-blob--white' />
                <div className='ab-split ab-split--acc'>
                    <div className='ab-acc-side'>
                        <SectionTitle title={containerTitle} subtitle={containerSubTitle} />
                        <div className='ab-bignum' key={open} aria-hidden>{DIGITS[open]}</div>
                    </div>

                    <div className='ab-acc'>
                        {contents.map((contents, i) => (
                            <div key={contents.title} className={`ab-acc-item${open === i ? ' is-open' : ''}`}>
                                <button type='button' className='ab-acc-btn' onClick={() => setOpen(i)} aria-expanded={open === i}>
                                    <span className='ab-acc-n'>{DIGITS[i]}</span>
                                    <span className='ab-acc-t'>{contents.title}</span>
                                    <span className='ab-acc-i' aria-hidden><Svg sw={2}><path d='M12 5v14M5 12h14' /></Svg></span>
                                </button>
                                <div className='ab-acc-body'>
                                    <div><p>{contents.text}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
