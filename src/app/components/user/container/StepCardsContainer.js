import React from 'react'
import SectionTitle from '../title/SectionTitle'
import Reveal from '../animation/Reveal'
import '../../../assets/styles/views/user/services/Contracts.scss'

export default function StepCardsContainer({ title, subtitle, steps, digits }) {
    return (
        <div className='main-user-layout'>
            <section className='ab-bare'>
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='ct-steps'>
                    {steps.map((s, i) => (
                        <Reveal key={s.t} delay={i * 90}>
                            <div className='ct-step glass-gold hover-to-background-navy bg-bone border border-1'>
                                <span className='ct-step-n'>{digits[i]}</span>
                                <b>{s.t}</b>
                                <small>{s.text}</small>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    )
}