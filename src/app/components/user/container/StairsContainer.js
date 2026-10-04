import React from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal'
import '../../../assets/styles/components/user/container/Stairs.scss'

export default function StairsContainer({ title, subtitle, steps, digits }) {
    return (
        <section className='ab-full ab-panel ab-panel--navy'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <SectionTitle title={title} subtitle={subtitle} />
                <ol className='esc-list'>
                    {steps.map((s, i) => (
                        <Reveal key={s.t} delay={i * 110}>
                            <li className='esc-item'>
                                <span className='esc-n'>{digits[i]}</span>
                                <div>
                                    <b>{s.t}</b>
                                    <p>{s.text}</p>
                                </div>
                            </li>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    )
}