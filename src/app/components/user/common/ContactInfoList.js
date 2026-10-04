import React from 'react'
import Svg from './Svg'

export default function ContactInfoList({ items }) {
    return (
        <ul className='cta-info'>
            {items.map((it) => (
                <li key={it.text}>
                    <Svg>{it.icon}</Svg>
                    {it.ltr ? <span dir='ltr'>{it.text}</span> : it.text}
                </li>
            ))}
        </ul>
    )
}