'use client'

import React, { useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import '../../../assets/styles/views/user/services/Contracts.scss'

export default function ContractTypeContainer({ id, title, subtitle, types, digits, docPrefix = 'قرارداد' }) {
    const [sel, setSel] = useState(0)
    const T = types[sel]

    return (
        <div className='main-user-layout'>
            <section id={id} className='ab-panel ab-panel--bone radius-md'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='ct-chips'>
                    {types.map((t, i) => (
                        <button key={t.t} type='button' aria-pressed={sel === i}
                            className={`ct-chip${sel === i ? ' is-active' : ''}`} onClick={() => setSel(i)}>{t.t}</button>
                    ))}
                </div>
                <div className='ct-doc-wrap'>
                    <div className='ct-doc' key={sel} aria-live='polite'>
                        <div className='ct-doc-head'>
                            <span className='ct-doc-dot' /><span className='ct-doc-dot' /><span className='ct-doc-dot' />
                            <b>{docPrefix} {T.t}</b>
                        </div>
                        <ul className='ct-doc-lines'>
                            {T.clauses.map((c, i) => (
                                <li key={c} style={{ '--d': `${i * 90}ms` }}>
                                    <span className='ct-doc-n'>{digits[i]}</span>{c}
                                </li>
                            ))}
                        </ul>
                        <div className='ct-doc-sign'><span /><span /></div>
                    </div>
                </div>
            </section>
        </div>
    )
}