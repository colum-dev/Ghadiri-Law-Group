import React from 'react'
import Reveal from '../animation/Reveal'
import Link from 'next/link';
import '../../../assets/styles/views/user/aboutUs/AboutUs.scss'

export default function UserCaseCard(props) {
    const { content, i } = props;

    return (
        <Reveal key={i} delay={i * 90} >
            <article className={`ab-card ab-case ${i === 0 ? 'ab-card--navy' : 'ab-card--bone'}`}>
                <div className='d-flex justify-content-between align-items-center gap-2 mb-3'>
                    <span className='ab-tag'>{content.tag}</span>
                    <span className='ab-result'>{content.result}</span>
                </div>
                {content.stat && (
                    <>
                        <div className='ab-stat'>{content.stat.v}</div>
                        <div className='ab-stat-u'>{content.stat.u}</div>
                    </>
                )}
                <div className='fw-bold fs-5 mb-2'>{content.title}</div>
                <div className='ab-text mb-3'>{content.text}</div>
                <Link href={content?.link || '#'} className='ab-more'>مشاهده جزئیات <span aria-hidden>←</span></Link>
            </article>
        </Reveal >
    )
}
