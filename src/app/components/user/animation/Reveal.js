'use client'

import { useEffect, useRef } from 'react'
import '../../../assets/styles/components/user/animation/Reveal.scss'

export default function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                el.classList.add('ab-in')
                io.disconnect()
            }
        }, { threshold: 0.12 })
        io.observe(el)
        return () => io.disconnect()
    }, [])
    return (
        <div ref={ref} className={`ab-reveal ${className}`} style={{ '--d': `${delay}ms` }}>
            {children}
        </div>
    )
}