'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import logoImg from '../../../../assets/images/brand/logo_500_500.png'
import '../../../../assets/styles/layouts/user/header.scss'
import { SERVICES, LINKS, PHONE_DISPLAY, PHONE_HREF, Svg } from './UserHeader'

export default function UserMobileHeader() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => { setOpen(false) }, [pathname])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
        document.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    const isServicesActive = pathname?.startsWith('/services')

    return (
        <>
            <header className={`mnav bg-bone${scrolled ? ' mnav--scrolled' : ''}`} dir='rtl'>
                <div className='mnav-bar'>
                    <Link href='/' className='mnav-logo' aria-label='صفحهٔ اصلی گروه حقوقی غدیری'>
                        <Image src={logoImg} width={42} height={42} alt='گروه حقوقی غدیری' priority />
                    </Link>

                    <div className='mnav-actions'>
                        <a href={PHONE_HREF} className='mnav-icon-btn mnav-icon-btn--gold' aria-label='تماس تلفنی'>
                            <Svg d='M4 5c0-1 1-2 2-2h2l2 5-2 2c1 3 3 5 6 6l2-2 5 2v2c0 1-1 2-2 2C10 20 4 14 4 5z' sw={1.8} />
                        </a>
                        <button
                            type='button'
                            className='mnav-icon-btn'
                            aria-label='باز کردن منو'
                            aria-expanded={open}
                            aria-controls='mnav-drawer'
                            onClick={() => setOpen(true)}
                        >
                            <Svg d='M4 7h16M4 12h16M4 17h16' sw={2} />
                        </button>
                    </div>
                </div>
            </header>

            <div className={`mnav-overlay${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden />

            <aside id='mnav-drawer' className={`mnav-drawer${open ? ' is-open' : ''}`} dir='rtl' aria-hidden={!open}>
                <div className='mnav-drawer-head'>
                    <Link href='/' className='mnav-logo'>
                        <Image src={logoImg} width={40} height={40} alt='گروه حقوقی غدیری' />
                    </Link>
                    <button type='button' className='mnav-icon-btn mnav-icon-btn--light' aria-label='بستن منو' onClick={() => setOpen(false)}>
                        <Svg d='M6 6l12 12M18 6L6 18' sw={2} />
                    </button>
                </div>

                <nav className='mnav-drawer-body' aria-label='منوی موبایل'>
                    <button
                        type='button'
                        className={`mnav-row${isServicesActive ? ' is-active' : ''}`}
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((v) => !v)}
                    >
                        <span>خدمات ما</span>
                        <span className={`mnav-caret${servicesOpen ? ' is-open' : ''}`} aria-hidden><Svg d='M6 9l6 6 6-6' sw={2.2} /></span>
                    </button>

                    <div className={`mnav-acc${servicesOpen ? ' is-open' : ''}`}>
                        <div className='mnav-acc-inner'>
                            {SERVICES.map((s) => (
                                <Link key={s.slug} href={`/services/${s.slug}`}
                                    className={`mnav-sub${pathname === `/services/${s.slug}` ? ' is-active' : ''}`}>
                                    <span className='mnav-sub-ico'><Svg d={s.icon} sw={1.6} /></span>
                                    <span>{s.t}</span>
                                </Link>
                            ))}
                            <Link href='/services' className='mnav-sub mnav-sub--all'>
                                مشاهدهٔ همهٔ خدمات <span aria-hidden>←</span>
                            </Link>
                        </div>
                    </div>

                    {LINKS.map((l) => (
                        <Link key={l.href} href={l.href} className={`mnav-row${pathname === l.href ? ' is-active' : ''}`}>
                            <span>{l.t}</span>
                        </Link>
                    ))}
                </nav>

                <div className='mnav-drawer-foot'>
                    <a href={PHONE_HREF} className='mnav-call'>
                        <Svg d='M4 5c0-1 1-2 2-2h2l2 5-2 2c1 3 3 5 6 6l2-2 5 2v2c0 1-1 2-2 2C10 20 4 14 4 5z' sw={1.8} />
                        <span dir='ltr'>{PHONE_DISPLAY}</span>
                    </a>
                </div>
            </aside>
        </>
    )
}