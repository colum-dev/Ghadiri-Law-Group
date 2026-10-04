import React from 'react'
import Svg from './Svg'

export default function SearchInput({ value, onChange, placeholder = 'جست‌وجو…' }) {
    return (
        <form className='ar-search' role='search' onSubmit={(e) => e.preventDefault()}>
            <Svg sw={2}><circle cx='11' cy='11' r='7' /><path d='M21 21l-4.3-4.3' /></Svg>
            <input type='text' value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
        </form>
    )
}
