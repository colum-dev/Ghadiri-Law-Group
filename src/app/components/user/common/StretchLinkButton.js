import React from 'react'
import Link from 'next/link'

export default function StretchLinkButton({ href, children }) {
    return (
        <Link href={href} className='ab-btn ab-btn--gold sv-stretch'>
            {children} <span aria-hidden>←</span>
        </Link>
    )
}
