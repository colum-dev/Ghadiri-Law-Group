import React from 'react'
import Reveal from '../animation/Reveal'

const Stars = () => (
    <div className='ab-stars' aria-label='۵ از ۵'>
        {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox='0 0 24 24'>
                <path d='M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z' />
            </svg>
        ))}
    </div>
)

export default function UserReviewCard({ review, i }) {
    return (
        <Reveal delay={i * 100}>
            <figure className='ab-card ab-card--frost ab-review'>
                <span className='ab-qm' aria-hidden>“</span>
                <Stars />
                <blockquote>{review.text}</blockquote>
                <figcaption>
                    <span className='ab-rv-av'>{review.name}</span>
                    <span>
                        <b>موکل محترم</b>
                        <small>{review.kind}</small>
                    </span>
                </figcaption>
            </figure>
        </Reveal>
    )
}
