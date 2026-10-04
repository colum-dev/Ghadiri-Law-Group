'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal'
import Svg from '../common/Svg'
import '../../../assets/styles/views/user/services/CommercialAndCorporate.scss'

export default function StageExplorerContainer({ id, title, subtitle, stages, digits, icon }) {
    const [stage, setStage] = useState(0)
    const S = stages[stage]

    return (
        <div className='main-user-layout'>
            <section id={id} className='ab-panel ab-panel--bone radius-md'>
                <span className='ab-blob ab-blob--gold' />
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='ab-pol'>
                    <div className='ab-pol-list'>
                        {stages.map((s, i) => (
                            <Reveal key={s.t} delay={i * 70}>
                                <button type='button' className={`ab-pol-item${stage === i ? ' is-active' : ''}`} onClick={() => setStage(i)} aria-pressed={stage === i}>
                                    <span className='ab-pol-n'>{digits[i]}</span>
                                    <span className='ab-pol-txt'><b>{s.t}</b><small>{s.short}</small></span>
                                    <span className='ab-pol-arrow' aria-hidden><Svg sw={2}><path d='M15 6l-6 6 6 6' /></Svg></span>
                                </button>
                            </Reveal>
                        ))}
                    </div>
                    <div className='ab-pol-detail' aria-live='polite'>
                        <span className='ab-pol-ring' aria-hidden />
                        <div className='ab-pol-content' key={stage}>
                            <span className='ab-pol-big' aria-hidden>{digits[stage]}</span>
                            <div className='ab-pol-head'>
                                <span className='ab-pol-ico'><Svg>{icon}</Svg></span>
                                <span className='ab-pol-kicker'>{S.t}</span>
                            </div>
                            <h3 className='ab-pol-h'>{S.heading}</h3>
                            <p className='ab-pol-p'>{S.text}</p><ul className='ab-pol-points'>
                                {S.points.map((pt) => (
                                    <li key={pt}><span><Svg sw={2.4}><path d='M5 12l5 5L20 7' /></Svg></span>{pt}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}