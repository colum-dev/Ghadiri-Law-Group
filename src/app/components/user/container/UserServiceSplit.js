import React from 'react'
import UserSectionHead from '../title/UserSectionHead'
import StretchLinkButton from '../common/StretchLinkButton'
import Reveal from '../animation/Reveal'

export default function UserServiceSplit({ service: s, index: i, digits }) {
    return (
        <div className='main-user-layout'>
            <section id={s.slug} className='ab-bare sv-sec sv-split'>
                <div>
                    <span className='sv-num' aria-hidden>{digits[i]}</span>
                    <UserSectionHead eyebrow={`${digits[i]} · ${s.kicker}`} title={s.title} subtitle={s.text} />
                    <StretchLinkButton href={`/services/${s.slug}`}>ورود به صفحهٔ {s.title}</StretchLinkButton>
                </div>
                <ul className='sv-rows'>
                    {s.cards.map(([t, d], k) => (
                        <Reveal key={t} delay={k * 80}>
                            <li><b>{t}</b><small>{d}</small></li>
                        </Reveal>
                    ))}
                </ul>
            </section>
        </div>
    )
}
