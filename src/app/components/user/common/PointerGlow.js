'use client'

import React from 'react'

export default function PointerGlow({ className, children }) {
    const onMove = (e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    return <section className={className} onPointerMove={onMove}>{children}</section>
}