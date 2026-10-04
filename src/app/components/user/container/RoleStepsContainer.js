'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import '../../../assets/styles/views/user/services/RealState.scss'

export default function RoleStepsContainer({ title, subtitle, roles, digits, ariaLabel = 'انتخاب موقعیت' }) {
    const [idx, setIdx] = useState(0)
    const R = roles[idx]

    return (
        <div className='main-user-layout'>
            <section className='ab-bare re-owner'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='re-switch' role='group' aria-label={ariaLabel}>
                    {roles.map((r, i) => (
                        <button key={r.key} type='button' aria-pressed={idx === i}
                            className={idx === i ? 'is-active' : ''} onClick={() => setIdx(i)}>{r.label}</button>
                    ))}
                </div>
                <div className='re-owner-body' key={R.key}>
                    <p className='re-owner-sum'>{R.sum}</p>
                    <ol className='re-owner-steps'>
                        {R.steps.map((s, i) => (
                            <li key={s.t}><span>{digits[i]}</span><b>{s.t}</b><small>{s.text}</small></li>
                        ))}
                    </ol>
                </div>
            </section>
        </div>
    )
}