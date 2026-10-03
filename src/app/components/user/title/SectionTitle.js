import React from 'react'

export default function SectionTitle(props) {
    const { title, subtitle } = props;
    return (
        <div className='text-center mb-5'>
            <div className='fw-bold fs-2 mb-3'>{title}</div>
            <div className='fs-6 mx-auto dept-sub'>
                {subtitle}
            </div>
        </div>
    )
}
