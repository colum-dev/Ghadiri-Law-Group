'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import Svg from '../common/Svg'
import '../../../assets/styles/views/user/services/RealState.scss'

const ARC = 'M10 110A90 90 0 0 1 190 110'
const ARC_LEN = 283

export default function RiskGaugeContainer({ id, title, subtitle, items, labels }) {
    const [checked, setChecked] = useState([])
    const toggle = (t) => setChecked((c) => (c.includes(t) ? c.filter((x) => x !== t) : [...c, t]))

    const done = items.filter((r) => checked.includes(r.t)).reduce((a, r) => a + r.w, 0)
    const risk = 100 - done
    const label = risk > 60 ? labels.high : risk > 25 ? labels.mid : labels.low
    const angle = Math.PI - (Math.PI * risk) / 100

    return (
        <section id={id} className='ab-full ab-panel ab-panel--navy'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='re-risk-grid'>
                    <ul className='re-risk-list'>
                        {items.map((r) => (
                            <li key={r.t}>
                                <label className={checked.includes(r.t) ? 'is-on' : ''}>
                                    <input type='checkbox' checked={checked.includes(r.t)} onChange={() => toggle(r.t)} />
                                    <span className='re-box'><Svg sw={2.6}><path d='M5 12l5 5L20 7' /></Svg></span>
                                    {r.t}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div className='re-gauge'>
                        <svg viewBox='0 0 200 120' aria-hidden>
                            <path d={ARC} className='re-gauge-track' />
                            <path d={ARC} className='re-gauge-fill' style={{ strokeDashoffset: ARC_LEN - (ARC_LEN * (100 - risk)) / 100 }} />
                            <line x1='100' y1='110' x2={100 + 70 * Math.cos(angle)} y2={110 - 70 * Math.sin(angle)} className='re-needle' />
                            <circle cx='100' cy='110' r='7' className='re-needle-hub' />
                        </svg>
                        <div className='re-gauge-v'>{label}</div>
                        <div className='re-gauge-l'>
                            {checked.length.toLocaleString('fa-IR')} از {items.length.toLocaleString('fa-IR')} مورد انجام‌شده
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}