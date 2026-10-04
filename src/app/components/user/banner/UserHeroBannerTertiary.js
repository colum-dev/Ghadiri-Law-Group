import React from 'react'
import Link from 'next/link'
import Reveal from '../animation/Reveal'
import Counter from '../animation/Counter'
import Svg from '../common/Svg'

export default function UserHeroBannerTertiary(props) {
    const {
        crumb,         
        badge,
        title,         
        description,
        primaryAction,  
        secondaryAction,
        keywords = [],
        chips = [],
        stats = [],
        icon,          
    } = props

    return (
        <section className='ab-full ab-panel ab-panel--navy ab-hero'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--1' />
            <span className='ab-blob ab-blob--2' />

            <div className='main-user-layout ab-inner'>
                <div className='ab-hero-grid'>
                    <div>
                        {crumb?.length > 0 && (
                            <nav className='ab-crumb' aria-label='مسیر'>
                                {crumb.map((c, i) => (
                                    <React.Fragment key={c.label}>
                                        {i > 0 && <> <span>/</span> </>}
                                        {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                                    </React.Fragment>
                                ))}
                            </nav>
                        )}

                        {badge && <span className='ab-badge'><i /> {badge}</span>}

                        <h1 className='ab-h1'>{title}</h1>
                        <p className='ab-lead'>{description}</p>

                        <div className='ab-actions'>
                            {primaryAction && (
                                <Link href={primaryAction.href} className='ab-btn ab-btn--gold'>
                                    {primaryAction.label} <span aria-hidden>←</span>
                                </Link>
                            )}
                            {secondaryAction && (
                                <a href={secondaryAction.href} className='ab-btn ab-btn--ghost'>{secondaryAction.label}</a>
                            )}
                        </div>

                        {keywords.length > 0 && (
                            <div className='ab-keys'>
                                {keywords.map((k, i) => (
                                    <React.Fragment key={k}>
                                        {i > 0 && <i />}
                                        <span>{k}</span>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='ab-hero-art' aria-hidden>
                        <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                        <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                        <div className='ab-hero-icon'><Svg sw={1.2}>{icon}</Svg></div>
                        {chips.map((c) => (
                            <span key={c.t} className='ab-chip' style={c.s}><i /> {c.t}</span>
                        ))}
                    </div>
                </div>

                {stats.length > 0 && (
                    <div className='ab-stats'>
                        {stats.map((s, i) => (
                            <Reveal key={s.label} delay={i * 90}>
                                <div className='ab-sc'>
                                    <div className='ab-sc-v'><Counter to={s.to} suffix={s.suffix} /></div>
                                    <div className='ab-sc-l'>{s.label}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
