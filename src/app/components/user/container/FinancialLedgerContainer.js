'use client'

import React, { useRef, useState } from 'react'
import SectionTitle from '../title/SectionTitle'
import { toFa, faIndex } from '@/app/utilities/persianDigits'
import '../../../assets/styles/views/user/services/FinancialCrimes.scss'

// دفتر کل اتهام‌ها: هر ردیف یک اتهام، پرونده‌ی کناری توضیح و نقطه‌ی شروع دفاع را نشان می‌دهد.
export default function FinancialLedgerContainer({ id, title, subtitle, items = [], totalLabel = 'جمع کل', resultLabel = 'یک دفاع مستند', defenseLabel = 'نقطهٔ شروع دفاع' }) {
    const [active, setActive] = useState(0)
    const dossierRef = useRef(null)
    // در موبایل پرونده زیر دفتر است؛ با انتخاب ردیف به آن اسکرول می‌کنیم
    const pick = (i) => {
        setActive(i)
        if (typeof window !== 'undefined' && window.matchMedia('(max-width: 991px)').matches) {
            requestAnimationFrame(() => dossierRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        }
    }
    if (!items.length) return null
    const index = Math.min(active, items.length - 1)
    const A = items[index] || {}
    const code = (it, i) => (it?.code ? toFa(it.code) : faIndex(i))

    return (
        <div className='main-user-layout'>
            <section id={id} className='ab-panel ab-panel--bone radius-md fc-ledger-sec'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='fc-ledger'>
                    <div className='fc-book'>
                        <div className='fc-book-head' aria-hidden>
                            <span>ردیف</span><span>شرح اتهام</span><span className='fc-col-law'>مستند قانونی</span><span>شدت</span>
                        </div>
                        <div className='fc-book-rows' role='tablist' aria-label={title}>
                            <span className='fc-scan' aria-hidden />
                            {items.map((it, i) => (
                                <button key={`${it?.t || it?.title}-${i}`} type='button' role='tab' aria-selected={index === i}
                                    className={`fc-row${index === i ? ' is-active' : ''}`} onClick={() => pick(i)}>
                                    <span className='fc-row-n'>{code(it, i)}</span>
                                    <b className='fc-row-t'>{it?.t || it?.title}</b>
                                    <span className='fc-row-law fc-col-law'>{it?.law}</span>
                                    <span className={it?.level === 'high' ? 'fc-level fc-level--high' : 'fc-level fc-level--mid'}>{it?.risk}</span>
                                    <svg className='fc-tick' viewBox='0 0 24 24' aria-hidden><path d='M4 13l5 5L20 6' /></svg>
                                </button>
                            ))}
                        </div>
                        <div className='fc-book-total'>
                            <span>{totalLabel}</span>
                            <b>{toFa(items.length)} سطر · {resultLabel}</b>
                        </div>
                    </div>

                    <article ref={dossierRef} className='fc-dossier' key={index} role='tabpanel' aria-live='polite'>
                        <span className='fc-stamp' aria-hidden>محرمانه</span>
                        <span className='fc-dossier-n'>پروندهٔ ردیف {code(A, index)}</span>
                        <h3 className='fc-dossier-t'>{A.t || A.title}</h3>
                        {A.law && <p className='fc-law'><i aria-hidden>§</i><span>{A.law}</span></p>}
                        {A.text && <p className='fc-dossier-text'>{A.text}</p>}
                        {A.defense && (
                            <div className='fc-defense'>
                                <b>{defenseLabel}</b>
                                <p>{A.defense}</p>
                            </div>
                        )}
                    </article>
                </div>
            </section>
        </div>
    )
}
