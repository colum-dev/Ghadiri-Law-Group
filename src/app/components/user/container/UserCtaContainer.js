import React from 'react'
import Link from 'next/link'
import Reveal from '../animation/Reveal'

export default function UserCtaContainer({ title, subtitle, action }) {
    return (
        <div className='main-user-layout'>
            <section className='ab-bare sv-end'>
                <Reveal className='text-center'>
                    <h2 className='ab-h2'>{title}</h2>
                    <p className='ab-sub mb-4'>{subtitle}</p>
                    <Link href={action.href} className='ab-btn'>{action.label} <span aria-hidden>←</span></Link>
                </Reveal>
            </section>
        </div>
    )
}
