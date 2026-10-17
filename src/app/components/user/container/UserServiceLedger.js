import React from 'react'
import UserSectionHead from '../title/UserSectionHead'
import StretchLinkButton from '../common/StretchLinkButton'
import { toFa } from '@/app/utilities/persianDigits'
import '../../../assets/styles/views/user/services/FinancialCrimes.scss'

// ردیف «دفتر حساب» در صفحهٔ همهٔ خدمات (kind: 'ledger')
export default function UserServiceLedger({ service: s, index: i, digits = [] }) {
    const items = s.items || []
    return (
        <section id={s.slug} className='ab-full ab-panel ab-panel--navy sv-sec fc-hub'>
            <span className='ab-gridbg' />
            <span className={i % 2 ? 'ab-blob ab-blob--2' : 'ab-blob ab-blob--1'} />
            <div className='main-user-layout ab-inner'>
                <div className='sv-band fc-hub-grid'>
                    <div>
                        <UserSectionHead eyebrow={`${digits[i] || toFa(String(i + 1).padStart(2, '0'))} · ${s.kicker || ''}`} title={s.title} subtitle={s.text} />
                        <ul className='sv-tags'>{items.map((t) => <li key={t}>{t}</li>)}</ul>
                        <StretchLinkButton href={`/services/${s.slug}`}>ورود به صفحهٔ {s.title}</StretchLinkButton>
                    </div>
                    <div className='fc-receipt' aria-hidden>
                        <span className='fc-scan' />
                        <div className='fc-receipt-head'>
                            <b>صورت‌وضعیت پرونده</b>
                            <span>رسیدگی سطربه‌سطر</span>
                        </div>
                        <ul>
                            {items.map((t, k) => (
                                <li key={t} style={{ '--k': k }}>
                                    <span>{t}</span><i />
                                    <svg viewBox='0 0 24 24'><path d='M4 13l5 5L20 6' /></svg>
                                </li>
                            ))}
                        </ul>
                        <div className='fc-receipt-total'><span>نتیجهٔ رسیدگی</span><b>دفاع مستند</b></div>
                        <span className='fc-receipt-stamp'>بررسی شد</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
