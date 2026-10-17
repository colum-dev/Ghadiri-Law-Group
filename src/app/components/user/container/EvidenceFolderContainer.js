'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import { toFa, faIndex } from '@/app/utilities/persianDigits'
import '../../../assets/styles/views/user/services/FinancialCrimes.scss'

// پوشه‌های مدارک: کاربر هر مدرکی را که دارد علامت می‌زند و نوار «آمادگی پرونده» پر می‌شود.
const label = (d) => (typeof d === 'string' ? d : d?.t || d?.title || d?.text || '')

export default function EvidenceFolderContainer({ title, subtitle, docs = [] }) {
    const [ready, setReady] = useState(() => new Set())
    if (!docs.length) return null
    const toggle = (i) => setReady((cur) => { const next = new Set(cur); next.has(i) ? next.delete(i) : next.add(i); return next })
    const pct = Math.round((ready.size / docs.length) * 100)

    return (
        <div className='main-user-layout'>
            <section className='ab-panel ab-panel--bone radius-md fc-docs-sec'>
                <div className='fc-docs-head'>
                    <SectionTitle title={title} subtitle={subtitle} />
                    <div className='fc-meter' role='status'>
                        <b>{toFa(ready.size)}<small> از {toFa(docs.length)}</small></b>
                        <span className='fc-meter-bar'><i style={{ width: `${pct}%` }} /></span>
                        <small>{ready.size === docs.length ? 'پرونده آماده است' : 'آمادگی پرونده'}</small>
                    </div>
                </div>
                <ul className='fc-folders'>
                    {docs.map((d, i) => (
                        <li key={`${label(d)}-${i}`} style={{ '--r': `${i % 2 ? 1.2 : -1.2}deg` }}>
                            <button type='button' aria-pressed={ready.has(i)} className={`fc-folder${ready.has(i) ? ' is-ready' : ''}`} onClick={() => toggle(i)}>
                                <span className='fc-folder-tab'>{faIndex(i)}</span>
                                <span className='fc-folder-t'>{label(d)}</span>
                                <span className='fc-folder-check' aria-hidden>
                                    <svg viewBox='0 0 24 24'><path d='M5 12.5l4.5 4.5L19 7.5' /></svg>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}
