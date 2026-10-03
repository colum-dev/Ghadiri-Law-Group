import Link from 'next/link';
import React from 'react'
import { Col } from 'react-bootstrap'

export default function UserDetailCardSecondary(props) {
    const { detail } = props;
    return (
        <Col key={detail.title} md={6} lg={4}>
            <div className='dept-card glass-gold radius-md hover-to-background-navy bg-bone border border-1 p-4 h-100'>
                <span className='dept-blob' />

                <div className='dept-icon glass-gold border border-1 mb-3'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round'>
                        {detail.icon}
                    </svg>
                </div>

                <div className='fw-bold fs-5 mb-2'>{detail.title}</div>
                <div className='fs-6 mb-3 dept-text'>{detail.text}</div>

                <Link href={detail?.link || '#'} className='dept-more text-decoration-none'>
                    بیشتر بدانید <span aria-hidden>←</span>
                </Link>
            </div>
        </Col>
    )
}
