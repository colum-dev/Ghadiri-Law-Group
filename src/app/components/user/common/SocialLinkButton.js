import React from 'react'
import Svg from './Svg'

export const LINKEDIN_ICON = (
    <>
        <rect x='3' y='3' width='18' height='18' rx='3' />
        <path d='M8 11v5M8 8v.01M12 16v-5M12 13c0-1.5 1-2 2-2s2 .8 2 2v3' />
    </>
)

export default function SocialLinkButton({ href, label, icon = LINKEDIN_ICON }) {
    return (
        <a href={href} target='_blank' rel='noopener noreferrer' className='tm-social' aria-label={label}>
            <Svg>{icon}</Svg>
            <span>{label}</span>
        </a>
    )
}
