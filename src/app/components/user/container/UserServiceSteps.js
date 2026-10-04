import React from 'react'
import UserSectionHead from '../title/UserSectionHead'
import StretchLinkButton from '../common/StretchLinkButton'
import Reveal from '../animation/Reveal'

export default function UserServiceSteps({ service: s, index: i, digits }) {
    return (
        <div className='main-user-layout'>
            <section id={s.slug} className='ab-panel ab-panel--bone radius-md sv-sec'>
                <UserSectionHead eyebrow={`${digits[i]} · ${s.kicker}`} title={s.title} subtitle={s.text} />
                <ol className='sv-steps'>
                    {s.steps.map(([t, d], k) => (
                        <Reveal key={t} delay={k * 90}>
                            <li><span className='sv-dot' /><b>{t}</b><small>{d}</small></li>
                        </Reveal>
                    ))}
                </ol>
                <StretchLinkButton href={`/services/${s.slug}`}>ورود به صفحهٔ {s.title}</StretchLinkButton>
            </section>
        </div>
    )
}
