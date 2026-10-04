import React from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal'
import '../../../assets/styles/views/user/services/CommercialAndCorporate.scss'

export default function CompareCardsContainer({ title, subtitle, items }) {
    return (
        <div className='main-user-layout'>
            <section className='ab-bare'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='ab-grid ab-grid--3'>
                    {items.map((t, i) => (
                        <Reveal key={t.t} delay={i * 90}>
                            <article className='ab-card ab-card--bone glass-gold hover-to-background-navy bg-bone border border-1'>
                                <div className='fw-bold fs-5 mb-2'>{t.t}</div>
                                <div className='bz-type-for'>{t.for}</div><ul className='bz-type-attrs'>
                                    {t.attrs.map((a) => <li key={a.label}><b>{a.label}</b><span>{a.value}</span></li>)}
                                </ul>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    )
}