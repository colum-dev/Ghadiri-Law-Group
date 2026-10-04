import React from 'react'

export default function Svg({ children, sw = 1.7 }) {
    return (
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>
            {children}
        </svg>
    )
}