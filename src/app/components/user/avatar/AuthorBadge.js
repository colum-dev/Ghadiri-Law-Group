import React from 'react'

export default function AuthorBadge({ name }) {
    const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('\u200c')
    return (
        <div className='ar-author'>
            <span className='ar-author-av' aria-hidden>{initials}</span>
            <span>نوشته شده توسط <b>{name}</b></span>
        </div>
    )
}
