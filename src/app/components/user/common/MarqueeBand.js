import React from 'react'

export default function MarqueeBand({ words, repeat = 3 }) {
    const text = words.repeat(repeat)
    return (
        <div className='cta-marquee' aria-hidden>
            <div className='cta-marquee-track'>
                <span>{text}</span>
                <span>{text}</span>
            </div>
        </div>
    )
}