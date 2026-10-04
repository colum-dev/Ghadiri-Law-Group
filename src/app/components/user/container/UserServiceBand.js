import React from 'react'
import UserSectionHead from '../title/UserSectionHead'
import StretchLinkButton from '../common/StretchLinkButton'
import Svg from '../common/Svg'

export default function UserServiceBand({ service: s, index: i, digits }) {
    return (
        <section id={s.slug} className='ab-full ab-panel ab-panel--navy sv-sec'>
            <span className='ab-gridbg' />
            <span className={`ab-blob ab-blob--${i % 2 ? 2 : 1}`} />
            <div className='main-user-layout ab-inner'>
                <div className={`sv-band${s.flip ? ' sv-band--flip' : ''}`}>
                    <div>
                        <UserSectionHead eyebrow={`${digits[i]} · ${s.kicker}`} title={s.title} subtitle={s.text} />
                        {s.stat && <div className='sv-stat'><b>{s.stat.v}</b><span>{s.stat.u}</span></div>}
                        <ul className='sv-tags'>{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
                        <StretchLinkButton href={`/services/${s.slug}`}>ورود به صفحهٔ {s.title}</StretchLinkButton>
                    </div>
                    <div className='sv-art' aria-hidden>
                        <span className='sv-ico'><Svg sw={0.9}>{s.icon}</Svg></span>
                        {s.items.slice(0, 3).map((t, k) => <span key={t} className={`sv-float sv-float--${k}`}>{t}</span>)}
                    </div>
                </div>
            </div>
        </section>
    )
}
