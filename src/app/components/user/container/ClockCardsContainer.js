import React from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal'
import '../../../assets/styles/views/user/services/CriminalCases.scss'

export default function ClockCardsContainer({ title, subtitle, clocks }) {
    return (
        <div className='main-user-layout'>
            <section className='ab-bare'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='cr-clocks'>
                    {clocks.map((c, i) => (
                        <Reveal key={c.l} delay={i * 90}>
                            <div className='cr-clock glass-gold hover-to-background-navy bg-bone border border-1'>
                                <svg className='cr-clock-ico' viewBox='0 0 40 40' aria-hidden>
                                    <circle cx='20' cy='20' r='17' />
                                    <path d='M20 10v10l7 5' />
                                </svg>
                                <div className='cr-clock-v'><b>{c.h}</b><small>{c.u}</small></div>
                                <p>{c.l}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    )
}