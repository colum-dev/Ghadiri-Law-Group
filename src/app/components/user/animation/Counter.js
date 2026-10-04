'use client'

import { useEffect, useRef, useState } from 'react'

export default function Counter({ to, suffix = '', duration = 1600 }) {
    const ref = useRef(null)
    const [v, setV] = useState(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setV(to)
            return
        }
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
        return () => {
            io.disconnect()
            cancelAnimationFrame(raf)
        }
    }, [to, duration])

    return (
        <span ref={ref} dir='ltr'>
            {v.toLocaleString('fa-IR')}
            {suffix}
        </span>
    )
}
