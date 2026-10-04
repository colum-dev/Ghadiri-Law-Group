import React from 'react'
import UserSectionHead from '../title/UserSectionHead'
import StretchLinkButton from '../common/StretchLinkButton'
import Reveal from '../animation/Reveal'
import Svg from '../common/Svg'

export default function UserServiceGrid({ service: s, index: i, digits }) {
    return (
        <div className='main-user-layout'>
            <section id={s.slug} className='ab-panel ab-panel--gold radius-md sv-sec'>
                <span className='ab-blob ab-blob--white' />
                <UserSectionHead eyebrow={`${digits[i]} · ${s.kicker}`} title={s.title} subtitle={s.text} />
                <div className='ab-grid ab-grid--3 sv-cards'>
                    {s.cards.map(([t, d], k) => (
                        <Reveal key={t} delay={k * 90}>
                            <article className='ab-card ab-card--frost'>
                                <span className='sv-mini'><Svg>{s.icon}</Svg></span>
                                <div className='fw-bold fs-5 mb-2'>{t}</div>
                                <div className='ab-text'>{d}</div>
                            </article>
                        </Reveal>
                    ))}
                </div>
                <StretchLinkButton href={`/services/${s.slug}`}>ورود به صفحهٔ {s.title}</StretchLinkButton>
            </section>
        </div>
    )
}
