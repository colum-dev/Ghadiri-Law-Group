import React from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal'
import Svg from '../common/Svg'

export default function UserPledgeContainer({ title, subtitle, pledges, quote }) {
    return (
        <section className='ab-full ab-panel ab-panel--navy'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--2' />
            <span className='ab-blob ab-blob--1' />
            <div className='main-user-layout ab-inner'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='ab-grid ab-grid--2'>
                    {pledges.map((e, i) => (
                        <Reveal key={e} delay={i * 70}>
                            <div className='ab-pledge'>
                                <span className='ab-check'><Svg sw={2.2}><path d='M5 12l5 5L20 7' /></Svg></span>
                                <span>{e}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
                {quote && (
                    <Reveal>
                        <blockquote className='ab-oath'>
                            <span aria-hidden>“</span>
                            {quote}
                        </blockquote>
                    </Reveal>
                )}
            </div>
        </section>
    )
}
