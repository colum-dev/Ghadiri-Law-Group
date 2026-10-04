import React from 'react'
import Svg from './Svg'

export default function TimelineList({ title, icon, items = [] }) {
    if (items.length === 0) return null
    return (
        <div className='tm-tl'>
            <h3 className='tm-tl-h'>
                <span className='tm-tl-ico'><Svg>{icon}</Svg></span>
                {title}
            </h3>
            <ol>
                {items.map((it) => (
                    <li key={`${it.year}-${it.title}`}>
                        <span className='tm-tl-year'>{it.year}</span>
                        <div>
                            <b>{it.title}</b>
                            {it.text && <small>{it.text}</small>}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}
