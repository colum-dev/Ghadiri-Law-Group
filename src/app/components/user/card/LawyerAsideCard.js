import React from 'react'
import Link from 'next/link'

export default function LawyerAsideCard({ initials, name, role, bio, action }) {
    return (
        <aside className='ab-card ab-card--navy fs-lawyer'>
            <span className='ab-avatar-frame'><span className='ab-initials'>{initials}</span></span>
            <div className='fw-bold fs-5'>{name}</div>
            <span className='ab-pill'>{role}</span>
            <p className='ab-text'>{bio}</p>
            <Link href={action.href} className='ab-btn ab-btn--gold'>{action.label} <span aria-hidden>←</span></Link>
        </aside>
    )
}