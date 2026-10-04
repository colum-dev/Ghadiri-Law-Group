import React from 'react'
import Link from 'next/link'
import Svg from '@/app/components/user/common/Svg'
import AuthorBadge from '@/app/components/user/avatar/AuthorBadge'

export default function BlogCard({ article, categoryLabel, icon, featured = false }) {
    const { slug, title, excerpt, date, read, author } = article
    const Title = featured ? 'h2' : 'h3'

    return (
        <Link
            href={`/articles/${slug}`}
            className={`ar-card${featured ? ' ar-card--feat' : ''} hover-to-background-navy bg-bone border border-1`}
        >
            <span className='ar-tag'>{categoryLabel}</span>

            {featured && icon && (
                <svg className='ar-ico' viewBox='0 0 24 24' aria-hidden>
                    <Svg sw={0.9}>{icon}</Svg>
                </svg>
            )}

            <Title>{title}</Title>
            <p>{excerpt}</p>
            {author && <AuthorBadge name={author} />}
            <div className='ar-meta'>
                <span>{date}</span>
                <i />
                <span>{read} دقیقه مطالعه</span>
            </div>
        </Link>
    )
}
