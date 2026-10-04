import React from 'react'
import Link from 'next/link'

export default function UserHeroBannerQuaternary({ crumb = [], title, description, indexTitle = 'فهرست', indexItems = [], digits = [] }) {
    return (
        <section className='ab-full ab-panel ab-panel--navy ab-hero'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--1' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <div className='sv-hero'>
                    <div>
                        {crumb.length > 0 && (
                            <nav className='ab-crumb' aria-label='مسیر'>
                                {crumb.map((c, i) => (
                                    <React.Fragment key={c.label}>
                                        {i > 0 && <> <span>/</span> </>}
                                        {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                                    </React.Fragment>
                                ))}
                            </nav>
                        )}
                        <h1 className='ab-h1'>{title}</h1>
                        <p className='ab-lead'>{description}</p>
                    </div>

                    <nav className='sv-index' aria-label={indexTitle}>
                        {indexItems.map((item, i) => (
                            <a key={item.href} href={item.href}>
                                <span>{digits[i]}</span><b>{item.label}</b><i aria-hidden>↓</i>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    )
}
