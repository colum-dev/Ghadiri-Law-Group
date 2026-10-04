'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import SectionTitle from '../title/SectionTitle'
import '../../../assets/styles/views/user/services/CommercialAndCorporate.scss'

export default function RiskScanContainer({ title, subtitle, flags, labels, action }) {
    const [checked, setChecked] = useState([])
    const n = checked.length
    const label = n === 0 ? labels.none : n <= 2 ? labels.low : labels.high
    const toggle = (f) => setChecked((c) => c.includes(f) ? c.filter((x) => x !== f) : [...c, f])

    return (
        <section className='ab-full ab-panel ab-panel--navy'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='bz-scan'><ul className='bz-flags'>
                        {flags.map((f) => (
                            <li key={f}>
                                <label className={checked.includes(f) ? 'is-on' : ''}>
                                    <input type='checkbox' checked={checked.includes(f)} onChange={() => toggle(f)} />
                                    <span className='bz-mark' aria-hidden>!</span>
                                    {f}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div className='bz-result'>
                        <div className='bz-dots'>
                            {flags.map((f, i) => <span key={f} className={i < n ? 'is-on' : ''} />)}
                        </div>
                        <div className='bz-result-n'>{n.toLocaleString('fa-IR')} از {flags.length.toLocaleString('fa-IR')} نشانه</div>
                        <div className='bz-result-l'>{label}</div>
                        <Link href={action.href} className='ab-btn ab-btn--gold'>{action.label} <span aria-hidden>←</span></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}