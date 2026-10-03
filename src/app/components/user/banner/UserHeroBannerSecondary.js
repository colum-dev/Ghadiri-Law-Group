import Link from 'next/link';
import React from 'react'

export default function UserHeroBannerSecondary(props) {
    const {children} = props;

    const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
)

const MSG = 'M4 5h16v11H8l-4 4V5z'

    return (
        <section className='ab-full ab-panel ab-panel--navy ab-hero'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--1' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <div className='ab-hero-grid'>
                    <div>
                        <span className='ab-badge'><i />{}</span>
                        <h1 className='ab-h1'>بگویید <em>چه کمکی</em> لازم دارید</h1>
                        <p className='ab-lead'>
                            این یک متن نمونه است. از یک تماس ساده تا رزرو جلسهٔ مشاوره؛ هر مسیری که راحت‌ترید را انتخاب کنید.
                        </p>
                    </div>
                    <div className='ab-hero-art' aria-hidden>
                        <svg className='ab-ring' viewBox='0 0 200 200'><circle cx='100' cy='100' r='94' /></svg>
                        <svg className='ab-ring ab-ring--2' viewBox='0 0 200 200'><circle cx='100' cy='100' r='72' /></svg>
                        <div className='ab-hero-icon'><Svg sw={1.2}><path d={MSG} /></Svg></div>
                    </div>
                </div>

                {children}
            </div>
        </section>
    )
}
