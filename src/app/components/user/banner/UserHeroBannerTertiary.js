import React from 'react'
import Link from 'next/link'
import Reveal from '../animation/Reveal'
import Counter from '../animation/Counter'
import Svg from '../common/Svg'

const cx = (...parts) => parts.filter(Boolean).join(' ')

function Breadcrumb({ items }) {
    return (
        <nav className='ab-crumb' aria-label='مسیر'>
            {items.map((c, i) => (
                <React.Fragment key={c.label}>
                    {i > 0 && <> <span>/</span> </>}
                    {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                </React.Fragment>
            ))}
        </nav>
    )
}

function Actions({ primary, secondary }) {
    return (
        <div className='ab-actions'>
            {primary && (
                <Link href={primary.href} className='ab-btn ab-btn--gold'>
                    {primary.label} <span aria-hidden>←</span>
                </Link>
            )}
            {secondary && (
                <a href={secondary.href} className='ab-btn ab-btn--ghost'>{secondary.label}</a>
            )}
        </div>
    )
}

function Keywords({ items }) {
    return (
        <div className='ab-keys'>
            {items.map((k, i) => (
                <React.Fragment key={k}>
                    {i > 0 && <i />}
                    <span>{k}</span>
                </React.Fragment>
            ))}
        </div>
    )
}

function HeroArt({ icon, iconClassName, chips }) {
    return (
        <div className='ab-hero-art' aria-hidden>
            <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
            <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
            <div className={cx('ab-hero-icon', iconClassName)}><Svg sw={1.2}>{icon}</Svg></div>
            {chips.map((c) => (
                <span key={c.t} className='ab-chip' style={c.s}><i /> {c.t}</span>
            ))}
        </div>
    )
}

function Stats({ items }) {
    return (
        <div className='ab-stats'>
            {items.map((s, i) => (
                <Reveal key={s.label} delay={i * 90}>
                    <div className='ab-sc'>
                        <div className='ab-sc-v'><Counter to={s.to} suffix={s.suffix} /></div>
                        <div className='ab-sc-l'>{s.label}</div>
                    </div>
                </Reveal>
            ))}
        </div>
    )
}

export default function UserHeroBannerTertiary({
    crumb = [],
    badge,
    badgeClassName,
    title,
    description,
    primaryAction,
    secondaryAction,
    keywords = [],
    chips = [],
    stats = [],
    icon,
    iconClassName,
    className,
    children,
}) {
    return (
        <section className={cx('ab-full ab-panel ab-panel--navy ab-hero', className)}>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--1' />
            <span className='ab-blob ab-blob--2' />

            <div className='main-user-layout ab-inner'>
                <div className='ab-hero-grid'>
                    <div>
                        {crumb.length > 0 && <Breadcrumb items={crumb} />}
                        {badge && <span className={cx('ab-badge', badgeClassName)}><i /> {badge}</span>}

                        <h1 className='ab-h1'>{title}</h1>
                        {description && <p className='ab-lead'>{description}</p>}

                        {(primaryAction || secondaryAction) && (
                            <Actions primary={primaryAction} secondary={secondaryAction} />
                        )}
                        {keywords.length > 0 && <Keywords items={keywords} />}
                        {children}
                    </div>

                    <HeroArt icon={icon} iconClassName={iconClassName} chips={chips} />
                </div>

                {stats.length > 0 && <Stats items={stats} />}
            </div>
        </section>
    )
}