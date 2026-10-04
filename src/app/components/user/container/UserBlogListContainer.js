'use client'

import React, { useMemo, useState } from 'react'
import Reveal from '../animation/Reveal'
import BlogCard from '../card/BlogCard'
import ChipCard from '../card/ChipCard'

export default function UserBlogListContainer({ articles, categories, icons = {}, query = '' }) {
    const [cat, setCat] = useState('all')

    const catLabel = useMemo(
        () => Object.fromEntries(categories.map((c) => [c.key, c.t])),
        [categories]
    )

    const list = useMemo(
        () => articles.filter((a) => (cat === 'all' || a.cat === cat) && a.title.includes(query.trim())),
        [articles, cat, query]
    )

    const featured = list[0]
    const rest = list.slice(1)

    return (
        <div className='main-user-layout'>
            <section className='ar-list'>
                <div className='ar-cats' role='tablist'>
                    {categories.map((c) => (
                        <ChipCard key={c.key} label={c.t} active={cat === c.key} onClick={() => setCat(c.key)} />
                    ))}
                </div>

                {list.length === 0 ? (
                    <p className='ar-empty'>مقاله‌ای با این مشخصات پیدا نشد.</p>
                ) : (
                    <div className='ar-grid'>
                        {featured && (
                            <BlogCard
                                featured
                                article={featured}
                                categoryLabel={catLabel[featured.cat]}
                                icon={icons[featured.cat]}
                            />
                        )}
                        {rest.map((a, i) => (
                            <Reveal key={a.slug} delay={i * 60} className={`ar-cell ar-cell--${a.size}`}>
                                <BlogCard article={a} categoryLabel={catLabel[a.cat]} />
                            </Reveal>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
