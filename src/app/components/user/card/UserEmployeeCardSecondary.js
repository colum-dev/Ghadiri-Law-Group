import React from 'react'

export default function UserEmployeeCardSecondary({ employee }) {
    const { name, t, field } = employee

    const initials = name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('\u200c')

    return (
        <aside className='ab-card ab-card--navy cn-person'>
            <span className='ab-avatar-frame'>
                <span className='ab-initials'>{initials}</span>
            </span>
            <div className='fw-bold fs-5'>{name}</div>
            <span className='ab-pill'>{t}</span>
            <p className='ab-text'>{field}</p>
            <p className='cn-person-note'>پیام‌های بخش «{t}» به این همکار ارجاع داده می‌شود.</p>
        </aside>
    )
}