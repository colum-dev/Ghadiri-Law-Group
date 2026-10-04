'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal'
import Svg from '../common/Svg'

const DIGITS = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵', '۰۶']

export default function UserPolicyContainer({ title, subtitle, policies }) {
    const [pol, setPol] = useState(0)
    const P = policies[pol]

    return (
        <div className='main-user-layout'>
            <section className='ab-panel ab-panel--bone radius-md'>
                <span className='ab-blob ab-blob--gold' />
                <SectionTitle title={title} subtitle={subtitle} />

                <div className='ab-pol'>
                    <div className='ab-pol-list'>
                        {policies.map((p, i) => (
                            <Reveal key={p.title} delay={i * 80}>
                                <button
                                    type='button'
                                    className={`ab-pol-item${pol === i ? ' is-active' : ''}`}
                                    onClick={() => setPol(i)}
                                    aria-pressed={pol === i}
                                >
                                    <span className='ab-pol-n'>{DIGITS[i]}</span>
                                    <span className='ab-pol-txt'>
                                        <b>{p.title}</b>
                                        <small>{p.short}</small>
                                    </span>
                                    <span className='ab-pol-arrow' aria-hidden>
                                        <Svg sw={2}><path d='M15 6l-6 6 6 6' /></Svg>
                                    </span>
                                </button>
                            </Reveal>
                        ))}
                    </div>

                    <div className='ab-pol-detail' aria-live='polite'>
                        <span className='ab-pol-ring' aria-hidden />
                        <div className='ab-pol-content' key={pol}>
                            <span className='ab-pol-big' aria-hidden>{DIGITS[pol]}</span>
                            <div className='ab-pol-head'>
                                <span className='ab-pol-ico'><Svg>{P.icon}</Svg></span>
                                <span className='ab-pol-kicker'>{P.title}</span>
                            </div>
                            <h3 className='ab-pol-h'>{P.heading}</h3>
                            <p className='ab-pol-p'>{P.text}</p>
                            <ul className='ab-pol-points'>
                                {P.points.map((pt) => (
                                    <li key={pt}>
                                        <span><Svg sw={2.4}><path d='M5 12l5 5L20 7' /></Svg></span>
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                            <div className='ab-pol-practice'>
                                <b>در عمل</b>
                                {P.practice}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
