import React from 'react'
import SectionTitle from '../title/SectionTitle'
import { faIndex } from '@/app/utilities/persianDigits'
import '../../../assets/styles/views/user/services/FinancialCrimes.scss'

// مسیر پرونده به شکل «ردّ پول»: یک سکه روی سیم حرکت می‌کند و از هر ایستگاه که می‌گذرد، آن ایستگاه روشن می‌شود.
const LOOP = 12 // ثانیه

export default function MoneyTrailContainer({ id, title, subtitle, steps = [] }) {
    if (!steps.length) return null
    const last = Math.max(steps.length - 1, 1)
    return (
        <section id={id} className='ab-full ab-panel ab-panel--navy fc-trail-sec'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='fc-trail' style={{ '--loop': `${LOOP}s`, '--n': steps.length }}>
                    <span className='fc-wire' aria-hidden><i className='fc-coin' /></span>
                    <ol>
                        {steps.map((s, i) => (
                            <li key={`${s?.t}-${i}`} style={{ '--hit': `${(i / last) * LOOP * 0.85}s` }}>
                                <span className='fc-node' aria-hidden>{faIndex(i)}</span>
                                <b>{s?.t || s?.title}</b>
                                {s?.who && <small>{s.who}</small>}
                                {s?.text && <p>{s.text}</p>}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}
