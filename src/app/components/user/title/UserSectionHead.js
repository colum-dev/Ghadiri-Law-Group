import React from 'react'
import Reveal from '../animation/Reveal'

export default function UserSectionHead({ eyebrow, title, subtitle, center = false }) {
    return (
        <Reveal className={`ab-head${center ? ' ab-head--center' : ''}`}>
            {eyebrow && <span className='ab-eyebrow'>{eyebrow}</span>}
            <h2 className='ab-h2'>{title}</h2>
            {subtitle && <p className='ab-sub'>{subtitle}</p>}
        </Reveal>
    )
}
