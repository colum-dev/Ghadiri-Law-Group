import React from 'react'
import Link from 'next/link'
import Reveal from '../animation/Reveal'
import '../../../assets/styles/components/user/card/FaqCard.scss'

export default function FaqCard({ title, text, href, number, tag, actionLabel = 'بیشتر بخوانید', delay = 0 }) {
    return (
        <Reveal delay={delay} className='fqc-wrap'>
            <article className='fqc hover-to-background-navy bg-bone border border-1'>
                <div className='fqc-top'>
                    <span className='fqc-n' aria-hidden>{number}</span>
                    {tag && <span className='fqc-tag'>{tag}</span>}
                </div>
                <h3 className='fqc-q'>{title}</h3>
                <p className='fqc-a'>{text}</p>
                <Link href={href} className='fqc-btn'>
                    {actionLabel}
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
                        <path d='M19 12H5M11 6l-6 6 6 6' />
                    </svg>
                </Link>
            </article>
        </Reveal>
    )
}