'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import Svg from '../common/Svg'
import '../../../assets/styles/views/user/services/FamilyServices.scss'

export default function SituationTabsContainer({ id, title, subtitle, situations, digits, timeLabel = 'زمان تقریبی' }) {
    const [sel, setSel] = useState(0)
    const S = situations[sel]

    return (
        <div className='main-user-layout'>
            <section id={id} className='ab-panel ab-panel--bone radius-md'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='fs-tabs' role='tablist'>
                    {situations.map((x, i) => (
                        <button key={x.t} type='button' role='tab' aria-selected={sel === i}
                            className={`fs-tab${sel === i ? ' is-active' : ''}`} onClick={() => setSel(i)}>
                            {x.t}
                        </button>
                    ))}
                </div>
                <div className='fs-sit' key={sel} aria-live='polite'>
                    <span className='fs-sit-num' aria-hidden>{digits[sel]}</span>
                    <p className='fs-sit-text'>{S.text}</p>
                    <ul className='fs-sit-does'>
                        {S.does.map((d) => (
                            <li key={d}><span><Svg sw={2.4}><path d='M5 12l5 5L20 7' /></Svg></span>{d}</li>
                        ))}
                    </ul>
                    <div className='fs-sit-time'><b>{timeLabel}</b>{S.time}</div>
                </div>
            </section>
        </div>
    )
}