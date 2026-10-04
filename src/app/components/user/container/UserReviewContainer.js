import React from 'react'
import SectionTitle from '../title/SectionTitle'
import UserReviewCard from '../card/UserReviewCard'

export default function UserReviewContainer({ title, subtitle, reviews }) {
    return (
        <div className='main-user-layout'>
            <section className='ab-panel ab-panel--gold radius-md'>
                <span className='ab-blob ab-blob--white' />
                <SectionTitle title={title} subtitle={subtitle} />
                <div className='ab-grid ab-grid--3 ab-reviews'>
                    {reviews.map((r, i) => (
                        <UserReviewCard review={r} i={i} key={r.name} />
                    ))}
                </div>
            </section>
        </div>
    )
}
