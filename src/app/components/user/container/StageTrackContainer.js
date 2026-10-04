'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import Svg from '../common/Svg'
import '../../../assets/styles/views/user/services/CriminalCases.scss'

export default function StageTrackContainer({ id, title, subtitle, stages, digits, whyLabel = 'چرا مهم است؟' }) {
    const [stage, setStage] = useState(0)
    const S = stages[stage]

    return (
        <div className='main-user-layout'>
            <section id={id} className='ab-panel ab-panel--bone radius-md'>
                <SectionTitle title={title} subtitle={subtitle} />
                <ol className='cr-track' role='tablist'>
                    {stages.map((s, i) => (
                        <li key={s.t}>
                            <button type='button' role='tab' aria-selected={stage === i}
                                className={`cr-stop${stage === i ? ' is-active' : ''}${i < stage ? ' is-passed' : ''}`}
                                onClick={() => setStage(i)}>
                                <span className='cr-stop-n'>{digits[i]}</span>
                                <span className='cr-stop-t'>{s.t}</span>
                            </button>
                        </li>
                    ))}
                </ol>
                <div className='cr-stage' key={stage}>
                    <p className='cr-stage-urgent'><b>{whyLabel}</b>{S.urgent}</p>
                    <ul className='cr-stage-does'>
                        {S.does.map((d) => (
                            <li key={d}><span><Svg sw={2.4}><path d='M5 12l5 5L20 7' /></Svg></span>{d}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}