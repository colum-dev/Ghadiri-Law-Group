'use client'

import React, { useEffect, useRef, useState } from 'react'
import '../../../assets/styles/components/user/animation/RingStat.scss'

export default function RingStat({ to = 70, label, duration = 1400 }) {
    const ref = useRef(null)
    const [v, setV] = useState(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
        let raf
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return
            io.disconnect()
            const t0 = performance.now()
            const tick = (t) => {
                const p = Math.min((t - t0) / duration, 1)
                setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
                if (p < 1) raf = requestAnimationFrame(tick)
            }
            raf = requestAnimationFrame(tick)
        }, { threshold: 0.4 })
        io.observe(el)
        return () => { io.disconnect(); cancelAnimationFrame(raf) }
    }, [to, duration])

    const c = 2 * Math.PI * 54

    return (
        <div ref={ref} className='rs'>
            <svg viewBox='0 0 130 130'>
                <circle cx='65' cy='65' r='54' className='rs-track' />
                <circle cx='65' cy='65' r='54' className='rs-fill' style={{ strokeDasharray: c, strokeDashoffset: c - (c * v) / 100 }} />
            </svg>
            <div className='rs-v' dir='ltr'>{v.toLocaleString('fa-IR')}٪</div>
            <div className='rs-l'>{label}</div>
        </div>
    )
}