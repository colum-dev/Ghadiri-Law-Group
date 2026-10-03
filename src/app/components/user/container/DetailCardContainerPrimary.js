import React from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal';

export default function DetailCardContainerPrimary(props) {
    const { details, title, subtitle } = props;

    const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>
        {children}
    </svg>
)

    return (
        <section className='ab-full ab-panel ab-panel--navy'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--1' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='ab-grid ab-grid--3'>
                    {details.map((r, i) => (
                        <Reveal key={r.title} delay={i * 80}>
                            <article className='ab-card ab-card--glass ab-reason'>
                                <span className='ab-reason-ico'><Svg>{r.icon}</Svg></span>
                                <div className='fw-bold fs-5 mb-2'>{r.title}</div>
                                <div className='ab-text'>{r.text}</div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
