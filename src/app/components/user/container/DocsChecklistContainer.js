'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal'
import Svg from '../common/Svg'
import '../../../assets/styles/views/user/services/FamilyServices.scss'

export default function DocsChecklistContainer({ title, subtitle, docs, readyLabel = 'آماده', aside }) {
    const [checked, setChecked] = useState([])
    const pct = Math.round((checked.length / docs.length) * 100)
    const toggle = (d) => setChecked((c) => (c.includes(d) ? c.filter((x) => x !== d) : [...c, d]))

    return (
        <div className='main-user-layout'>
            <section className='ab-bare fs-docs'>
                <div>
                    <SectionTitle title={title} subtitle={subtitle} />
                    <div className='fs-bar' aria-label={`${pct} درصد ${readyLabel}`}><i style={{ width: `${pct}%` }} /></div>
                    <div className='fs-bar-l'>{pct.toLocaleString('fa-IR')}٪ {readyLabel}</div>
                    <ul className='fs-check'>
                        {docs.map((d) => (
                            <li key={d}>
                                <label className={checked.includes(d) ? 'is-on' : ''}>
                                    <input type='checkbox' checked={checked.includes(d)} onChange={() => toggle(d)} />
                                    <span className='fs-box'><Svg sw={2.6}><path d='M5 12l5 5L20 7' /></Svg></span>
                                    {d}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                {aside && <Reveal>{aside}</Reveal>}
            </section>
        </div>
    )
}