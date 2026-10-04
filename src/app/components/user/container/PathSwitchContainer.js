'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import '../../../assets/styles/views/user/services/FamilyServices.scss'

export default function PathSwitchContainer({ title, subtitle, paths, ariaLabel = 'انتخاب مسیر' }) {
    const [idx, setIdx] = useState(0)
    const P = paths[idx]

    return (
        <section className='ab-full ab-panel ab-panel--navy'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='fs-switch' role='group' aria-label={ariaLabel}>
                    <span className={`fs-thumb${idx === paths.length - 1 ? ' is-end' : ''}`} aria-hidden />
                    {paths.map((p, i) => (
                        <button key={p.key} type='button' aria-pressed={idx === i} onClick={() => setIdx(i)}>{p.label}</button>
                    ))}
                </div>
                <div className='fs-path' key={P.key}>
                    <p className='fs-path-sum'>{P.sum}</p>
                    <ol className='fs-line'>
                        {P.steps.map((s) => <li key={s.t}><b>{s.t}</b><small>{s.text}</small></li>)}
                    </ol>
                    <div className='fs-meter'>
                        {P.meter.map((m) => (
                            <div key={m.label}><span>{m.label}</span><i><em style={{ width: `${m.value}%` }} /></i></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}