'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal'
import '../../../assets/styles/views/user/services/RealState.scss'

const FACE = 'glass-gold hover-to-background-navy bg-bone border border-1'

export default function DeedFlipContainer({ title, subtitle, deeds, riskPrefix = 'ریسک', hint = 'برای توضیح بزنید' }) {
    const [flip, setFlip] = useState(0)

    return (
        <div className='main-user-layout'>
            <section className='ab-panel ab-panel--bone radius-md'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='re-flip-grid'>
                    {deeds.map((d, i) => (
                        <Reveal key={d.t} delay={i * 80}>
                            <button type='button' className={`re-flip${flip === i ? ' is-flipped' : ''}`}
                                onClick={() => setFlip(flip === i ? -1 : i)} aria-pressed={flip === i}>
                                <span className='re-flip-inner'>
                                    <span className={`re-flip-face re-flip-front ${FACE}`}>
                                        <b>{d.t}</b>
                                        <em className={`re-risk re-risk--${d.level}`}>{riskPrefix} {d.risk}</em>
                                        <span className='re-flip-hint'>{hint}</span>
                                    </span>
                                    <span className={`re-flip-face re-flip-back ${FACE}`}>{d.text}</span>
                                </span>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    )
}