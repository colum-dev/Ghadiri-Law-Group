'use client'

import React, { useEffect, useRef, useState } from 'react'
import heroBannerImg from '../../assets/images/home/herobanner1.png'
import '../../assets/styles/views/user/home/Home.scss';
import { Col, Row } from 'react-bootstrap';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ScienceIcon from '@mui/icons-material/Science';
import Link from 'next/link';
import Image from 'next/image';

const STATS = [
    { Icon: ThumbUpIcon, to: 94, suffix: '٪', label: 'نرخ موفقیت بالا' },
    { Icon: Diversity1Icon, to: 22, suffix: '+', label: 'افتخار همکاری' },
    { Icon: ScienceIcon, to: 5, suffix: '+', label: 'سال سابقه' },
]

function Counter({ to, suffix = '' }) {
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
            const t0 = performance.now(); const dur = 1300
            const tick = (t) => {
                const p = Math.min((t - t0) / dur, 1)
                setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
                if (p < 1) raf = requestAnimationFrame(tick)
            }
            raf = requestAnimationFrame(tick)
        }, { threshold: 0.4 })
        io.observe(el)
        return () => { io.disconnect(); cancelAnimationFrame(raf) }
    }, [to])

    return <span ref={ref} dir='ltr'>{v.toLocaleString('fa-IR')}{suffix}</span>
}

export default function UserHomeHeroBannerOne() {
    return (
        <section className='hb'>
            <Row className='home-hero-banner-1 justify-content-between align-items-center py-5'>
                <Col md={5} className='hb-media order-2 order-md-1'>
                    <div className='hb-media-frame'>
                        <span className='hb-blob' aria-hidden />
                        <svg className='hb-ring' viewBox='0 0 200 200' aria-hidden><circle cx='100' cy='100' r='96' /></svg>
                        <svg className='hb-ring hb-ring--2' viewBox='0 0 200 200' aria-hidden><circle cx='100' cy='100' r='74' /></svg>
                        <Image src={heroBannerImg} alt='مجسمهٔ عدالت' className='hb-img' priority sizes='(max-width: 767px) 80vw, 40vw' />
                    </div>
                </Col>

                <Col md={6} lg={5} className='order-1 order-md-2'>
                    <div className='hb-in'>
                        <span className='hb-badge'>
                            <i /> بیش از یک دهه دفاع از حق موکلان
                        </span>

                        <h1 className='fs-1 mb-4'>
                            این یک<br />تایتل نمونه و<br /><span className='color-gold'>اتفاقی</span> است.
                        </h1>

                        <p className='fs-6 mb-4 hb-lead'>
                            این یک متن نمونه است. جای این پاراگراف، معرفی کوتاهی از دفتر، رویکرد شما و اینکه چرا موکلان باید به شما اعتماد کنند قرار می‌گیرد.
                        </p>

                        <div className='d-flex flex-wrap gap-3 mb-5'>
                            <Link href='/services'
                                className='bg-gold color-white pb-1 pt-2 px-4 rounded-pill glass-hover-effect cursor-pointer hover-to-background-navy fw-bold shadow fs-5 text-decoration-none'>
                                بیشتر بدانید <span aria-hidden>←</span>
                            </Link>
                            <Link href='/contact' className='hb-ghost pb-1 pt-2 px-4 rounded-pill fw-bold fs-5 text-decoration-none'>
                                تماس با ما
                            </Link>
                        </div>

                        <div className='hb-stats d-flex align-items-stretch justify-content-start flex-wrap'>
                            {STATS.map(({ Icon, to, suffix, label }, i) => (
                                <React.Fragment key={label}>
                                    {i > 0 && <div className='vr mx-3 hb-vr' />}
                                    <div className='d-flex flex-column align-items-center justify-content-center hb-stat'>
                                        <Icon />
                                        <span className='hb-stat-v fs-4 fw-bold mt-2'><Counter to={to} suffix={suffix} /></span>
                                        <span className='fs-6 text-center hb-stat-l'>{label}</span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </section>
    )
}
