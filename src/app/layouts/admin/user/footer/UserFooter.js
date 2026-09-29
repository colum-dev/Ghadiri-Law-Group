'use client'

import React from 'react'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'

const CONTACT = {
    phone: '02100000000',
    phoneLabel: '۰۲۱-۰۰۰۰۰۰۰۰',
    email: 'info@example.com',
    address: 'تهران، خیابان نمونه، پلاک ۰',
    hours: 'شنبه تا پنجشنبه، ۹ تا ۱۷',
}

const DEPARTMENTS = [
    { label: 'حقوق خانواده', href: '#' },
    { label: 'دعاوی کیفری', href: '#' },
    { label: 'املاک و ثبت اسناد', href: '#' },
    { label: 'حقوق تجارت و شرکت‌ها', href: '#' },
    { label: 'قراردادها', href: '#' },
    { label: 'دعاوی اداری و مالیاتی', href: '#' },
]

const QUICK_LINKS = [
    { label: 'صفحهٔ اصلی', href: '/' },
    { label: 'دربارهٔ ما', href: '#' },
    { label: 'خلاصه پرونده‌ها', href: '#' },
    { label: 'مقالات', href: '#' },
    { label: 'تماس با ما', href: '#' },
]

const SOCIALS = [
    {
        label: 'اینستاگرام',
        href: '#',
        icon: (
            <>
                <rect x='3' y='3' width='18' height='18' rx='5' />
                <circle cx='12' cy='12' r='4' />
                <path d='M17.5 6.5v.01' />
            </>
        ),
    },
    {
        label: 'تلگرام',
        href: '#',
        icon: <path d='M21 4L3 11l6 2 2 6 3-4 5 4 2-15z' />,
    },
    {
        label: 'لینکدین',
        href: '#',
        icon: <path d='M6 9v9M6 6v.01M10 18v-9m0 3c0-3 8-4 8 0v6' />,
    },
    {
        label: 'واتساپ',
        href: '#',
        icon: <path d='M21 12a8 8 0 0 1-11.7 7L4 20l1.1-4.6A8 8 0 1 1 21 12z' />,
    },
]

const Svg = ({ children }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round'>
        {children}
    </svg>
)

const WAVE = 'M0 30 Q180 0 360 30 T720 30 T1080 30 T1440 30 T1800 30 T2160 30 T2520 30 T2880 30 V60 H0 Z'

export default function UserFooter() {
    const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' })
    const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <footer className='ft' dir='rtl'>
            <div className='ft-wave' aria-hidden>
                <svg className='ft-wave-a' viewBox='0 0 2880 60' preserveAspectRatio='none'>
                    <path d={WAVE} />
                </svg>
                <svg className='ft-wave-b' viewBox='0 0 2880 60' preserveAspectRatio='none'>
                    <path d={WAVE} />
                </svg>
            </div>

            <div className='ft-inner'>
                <span className='ft-glow' />

                <div className='main-user-layout ft-content'>
                    <Row className='g-5'>
                        <Col lg={4}>
                            <div className='ft-brand'>
                                <span className='ft-logo'>
                                    <Svg>
                                        <path d='M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zm14 0l-3 7a3.5 3.5 0 0 0 6 0l-3-7z' />
                                    </Svg>
                                </span>
                                <span className='fw-bold fs-4'>گروه حقوقی غدیری</span>
                            </div>
                            <p className='ft-text'>
                                این یک متن نمونه است. معرفی کوتاهی از دفتر و رویکرد شما در ارائهٔ خدمات حقوقی.
                            </p>
                            <div className='ft-socials'>
                                {SOCIALS.map((s) => (
                                    <a key={s.label} href={s.href} aria-label={s.label} className='ft-social'>
                                        <Svg>{s.icon}</Svg>
                                    </a>
                                ))}
                            </div>
                        </Col>

                        <Col sm={6} lg={2}>
                            <div className='ft-title'>دپارتمان‌ها</div>
                            <ul className='ft-links'>
                                {DEPARTMENTS.map((l) => (
                                    <li key={l.label}>
                                        <Link href={l.href} className='ft-link'>{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </Col>

                        <Col sm={6} lg={2}>
                            <div className='ft-title'>دسترسی سریع</div>
                            <ul className='ft-links'>
                                {QUICK_LINKS.map((l) => (
                                    <li key={l.label}>
                                        <Link href={l.href} className='ft-link'>{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </Col>

                        <Col lg={4}>
                            <div className='ft-card'>
                                <div className='ft-title'>اطلاعات تماس</div>
                                <ul className='ft-contact'>
                                    <li>
                                        <span className='ft-ico'>
                                            <Svg><path d='M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z' /></Svg>
                                        </span>
                                        <a href={`tel:${CONTACT.phone}`} dir='ltr'>{CONTACT.phoneLabel}</a>
                                    </li>
                                    <li>
                                        <span className='ft-ico'>
                                            <Svg><rect x='3' y='5' width='18' height='14' rx='2' /><path d='M3 7l9 6 9-6' /></Svg>
                                        </span>
                                        <a href={`mailto:${CONTACT.email}`} dir='ltr'>{CONTACT.email}</a>
                                    </li>
                                    <li>
                                        <span className='ft-ico'>
                                            <Svg><path d='M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z' /><circle cx='12' cy='10' r='2.5' /></Svg>
                                        </span>
                                        <span>{CONTACT.address}</span>
                                    </li>
                                    <li>
                                        <span className='ft-ico'>
                                            <Svg><circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' /></Svg>
                                        </span>
                                        <span>{CONTACT.hours}</span>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>

                    <div className='ft-line' />

                    <div className='ft-bottom'>
                        <div>
                            <div className='ft-copy'>© {year} گروه حقوقی غدیری. تمامی حقوق محفوظ است.</div>
                            <div className='ft-note'>
                                محتوای این وب‌سایت جنبهٔ اطلاع‌رسانی دارد و جایگزین مشاورهٔ حقوقی تخصصی نیست.
                            </div>
                        </div>

                        <div className='ft-bottom-side'>
                            <Link href='#' className='ft-link'>حریم خصوصی</Link>
                            <Link href='#' className='ft-link'>قوانین و مقررات</Link>
                            <button type='button' className='ft-top' onClick={toTop} aria-label='بازگشت به بالا'>
                                <Svg><path d='M12 19V5M5 12l7-7 7 7' /></Svg>
                            </button>
                        </div>
                    </div>
                </div>

                <span className='ft-mark' aria-hidden>غدیری</span>
            </div>
        </footer>
    )
}