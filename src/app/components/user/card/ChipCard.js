import React from 'react'

export default function ChipCard({ label, active = false, onClick }) {
    return (
        <button
            type='button'
            role='tab'
            aria-selected={active}
            className={`ar-cat${active ? ' is-active' : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}