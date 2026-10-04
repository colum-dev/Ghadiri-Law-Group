'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import '../../../assets/styles/components/user/container/Deadlinefinder.scss'

export default function DeadlineFinderContainer({ id, title, subtitle, notices }) {
    const [sel, setSel] = useState(0)
    const N = notices[sel]

    return (
        <div className='main-user-layout'>
            <section id={id} className='ab-panel ab-panel--bone radius-md'>
                <SectionTitle title={title} subtitle={subtitle} />

                <div className='cf-chips'>
                    {notices.map((n, i) => (
                        <button key={n.t} type='button' aria-pressed={sel === i}
                            className={`cf-chip${sel === i ? ' is-active' : ''}`} onClick={() => setSel(i)}>
                            {n.t}
                        </button>
                    ))}
                </div>

                <div className='cf-detail' key={sel}>
                    <div className='cf-days'><b dir='ltr'>{N.days}</b><span>روز مهلت (نمونه)</span></div>
                    <div className='cf-body'>
                        <p>{N.body}</p>
                        <div className='cf-next'><b>قدم بعدی</b>{N.next}</div>
                    </div>
                </div>
            </section>
        </div>
    )
}