'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import logoImg from '../../../../assets/images/brand/logo_500_500.png'
import '../../../../assets/styles/layouts/user/header.scss'

import { SERVICES, LINKS, PHONE_DISPLAY, PHONE_HREF, Svg } from './UserHeader'

export default function UserDesktopHeader() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const wrapRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => { setOpen(false) }, [pathname])

    useEffect(() => {
        const onClick = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
        document.addEventListener('mousedown', onClick)
        document.addEventListener('keydown', onKey)
        return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey) }
    }, [])

    const isServicesActive = pathname?.startsWith('/services')
    const isActive = (href) => pathname === href

    return (
        <header className={`nav bg-bone d-flex justify-content-center${scrolled ? ' nav--scrolled' : ''}`} dir='rtl'>
            <Row className='py-3 justify-content-center align-items-center main-user-layout w-100'>
                <Col md={3}>
                    <Link href='/' className='nav-logo d-inline-flex align-items-center' aria-label='صفحهٔ اصلی گروه حقوقی غدیری'>
                        <Image src={logoImg} width={50} height={50} alt='گروه حقوقی غدیری' priority />
                    </Link>
                </Col>

                <Col md={6}>
                    <nav className='nav-links d-flex align-items-center justify-content-center gap-2' aria-label='منوی اصلی' ref={wrapRef}>
                        <div className='nav-item nav-item--dd'>
                            <button
                                type='button'
                                className={`nav-link-btn glass-gold-hover fw-bold${isServicesActive || open ? ' is-active' : ''}`}
                                aria-haspopup='true'
                                aria-expanded={open}
                                onClick={() => setOpen((o) => !o)}
                            >
                                خدمات ما
                                <span className={`nav-caret${open ? ' is-open' : ''}`} aria-hidden><Svg d='M6 9l6 6 6-6' sw={2.2} /></span>
                            </button>

                            <div className={`nav-mega${open ? ' is-open' : ''}`} role='menu'>
                                <div className='nav-mega-inner bg-bone shadow rounded-4 border'>
                                    {SERVICES.map((s) => (
                                        <Link key={s.slug} href={`/services/${s.slug}`} role='menuitem'
                                            className={`nav-mega-item hover-to-background-navy${pathname === `/services/${s.slug}` ? ' is-active' : ''}`}>
                                            <span className='nav-mega-ico'><Svg d={s.icon} sw={1.6} /></span>
                                            <span>{s.t}</span>
                                        </Link>
                                    ))}
                                    <Link href='/services' role='menuitem' className='nav-mega-all hover-to-background-navy'>
                                        مشاهدهٔ همهٔ خدمات <span aria-hidden>←</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {LINKS.map((l) => (
                            <Link key={l.href} href={l.href}
                                className={`nav-link-btn glass-gold-hover fw-bold${isActive(l.href) ? ' is-active' : ''}`}>
                                {l.t}
                            </Link>
                        ))}
                    </nav>
                </Col>

                <Col md={3} className='d-flex align-items-center justify-content-end'>
                    <a href={PHONE_HREF} className='bg-navy color-white pb-1 pt-2 px-4 rounded-pill glass-hover-effect cursor-pointer hover-to-background-gold fw-bold shadow d-inline-flex align-items-center gap-2 text-decoration-none'>
                        <span aria-hidden><Svg d='M4 5c0-1 1-2 2-2h2l2 5-2 2c1 3 3 5 6 6l2-2 5 2v2c0 1-1 2-2 2C10 20 4 14 4 5z' sw={1.8} /></span>
                        <span dir='ltr'>{PHONE_DISPLAY}</span>
                    </a>
                </Col>
            </Row>
        </header>
    )
}
