'use client'

import React, { useMemo, useState } from 'react'
import FaqCard from '../card/FaqCard'
import '../../../assets/styles/views/user/faqs/Faqs.scss'

export default function FaqListContainer({ faqs, categories, digits, query = '', basePath = '/faqs', actionLabel }) {
    const [cat, setCat] = useState('all')
    const labels = useMemo(() => Object.fromEntries(categories.map((c) => [c.key, c.t])), [categories])

    const list = useMemo(() => {
        const q = query.trim()
        return faqs.filter((f) => (cat === 'all' || f.cat === cat) && (!q || f.title.includes(q)))
    }, [faqs, cat, query])

    return (
        <div className='main-user-layout'>
            <section className='ab-panel ab-panel--bone radius-md fq-sec'>
                <span className='ab-blob ab-blob--gold' />
                <div className='fq-cats' role='tablist'>
                    {categories.map((c) => (
                        <button key={c.key} type='button' role='tab' aria-selected={cat === c.key}
                            className={`fq-cat-btn${cat === c.key ? ' is-active' : ''}`} onClick={() => setCat(c.key)}>
                            {c.t}
                        </button>
                    ))}
                </div>

                {list.length === 0 ? (
                    <p className='fq-empty'>سؤالی با این مشخصات پیدا نشد؛ می‌توانید مستقیم از ما بپرسید.</p>
                ) : (
                    <div className='ab-grid ab-grid--3' key={cat}>
                        {list.map((f, i) => (
                            <FaqCard
                                key={f.id}
                                title={f.title}
                                text={f.text}
                                href={`${basePath}/${f.id}`}
                                number={digits[i % digits.length]}
                                tag={labels[f.cat]}
                                actionLabel={actionLabel}
                                delay={(i % 3) * 80}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}