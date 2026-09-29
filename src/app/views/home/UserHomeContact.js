'use client'

import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

const CONTACT = {
  phone: '02100000000',
  phoneLabel: '۰۲۱-۰۰۰۰۰۰۰۰',
  whatsapp: 'https://wa.me/989000000000',
  email: 'info@example.com',
  address: 'تهران، خیابان نمونه، پلاک ۰',
  hours: 'شنبه تا پنجشنبه، ۹ تا ۱۷',
}

const DEPARTMENTS = [
  'حقوق خانواده',
  'دعاوی کیفری',
  'املاک و ثبت اسناد',
  'حقوق تجارت و شرکت‌ها',
  'قراردادها',
  'دعاوی اداری و مالیاتی',
]

const WORDS = 'مشاوره حقوقی ✦ وکالت ✦ داوری ✦ تنظیم قرارداد ✦ '

const toEn = (s) =>
  s
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))

const Svg = ({ children }) => (
  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round'>
    {children}
  </svg>
)

export default function UserHomeContact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const phone = toEn(String(data.phone || '')).replace(/[\s-]/g, '')

    if (!/^09\d{9}$/.test(phone)) {
      setError('شمارهٔ موبایل معتبر نیست. مثال: ۰۹۱۲۳۴۵۶۷۸۹')
      return
    }
    setError('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 700))

    setLoading(false)
    setSent(true)
  }

  return (
    <div className='my-5 main-user-layout'>
      <section className='cta-panel radius-md' onPointerMove={onMove}>
        <span className='cta-blob cta-blob--1' />
        <span className='cta-blob cta-blob--2' />

        <div className='cta-marquee' aria-hidden>
          <div className='cta-marquee-track'>
            <span>{WORDS.repeat(3)}</span>
            <span>{WORDS.repeat(3)}</span>
          </div>
        </div>

        <Row className='align-items-center g-5 position-relative'>
          <Col lg={7}>
            <span className='cta-status'>
              <i className='cta-dot' />
              کنار شما، از همان اولین تماس
            </span>

            <h2 className='cta-title'>پرونده‌ات را به دست‌های مطمئن بسپار</h2>
            <p className='cta-sub'>
              این یک متن نمونه است. یک تماس کوتاه کافی است تا مسیر پرونده‌ات روشن شود.
            </p>

            <div className='cta-actions'>
              <a href={`tel:${CONTACT.phone}`} className='cta-call'>
                <span className='cta-call-icon'>
                  <Svg>
                    <path d='M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z' />
                  </Svg>
                </span>
                <span>
                  <small>تماس مستقیم</small>
                  <b dir='ltr'>{CONTACT.phoneLabel}</b>
                </span>
              </a>

              <a href={CONTACT.whatsapp} target='_blank' rel='noopener noreferrer' className='cta-wa'>
                <Svg>
                  <path d='M21 12a8 8 0 0 1-11.7 7L4 20l1.1-4.6A8 8 0 1 1 21 12z' />
                </Svg>
                پیام در واتساپ
              </a>
            </div>

            <ul className='cta-info'>
              <li>
                <Svg>
                  <path d='M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z' />
                  <circle cx='12' cy='10' r='2.5' />
                </Svg>
                {CONTACT.address}
              </li>
              <li>
                <Svg>
                  <rect x='3' y='5' width='18' height='14' rx='2' />
                  <path d='M3 7l9 6 9-6' />
                </Svg>
                <span dir='ltr'>{CONTACT.email}</span>
              </li>
              <li>
                <Svg>
                  <circle cx='12' cy='12' r='9' />
                  <path d='M12 7v5l3 2' />
                </Svg>
                {CONTACT.hours}
              </li>
            </ul>
          </Col>

          <Col lg={5}>
            <div className='cta-form'>
              {sent ? (
                <div className='cta-success' role='status' aria-live='polite'>
                  <svg viewBox='0 0 52 52' aria-hidden>
                    <circle cx='26' cy='26' r='23' />
                    <path d='M15 27l8 8 14-16' />
                  </svg>
                  <div className='fw-bold fs-5 mb-1'>درخواست شما ثبت شد</div>
                  <div className='cta-sub mb-0'>به‌زودی با شما تماس می‌گیریم.</div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div className='fw-bold fs-4 mb-1'>درخواست تماس</div>
                  <div className='cta-sub mb-4'>شماره‌ات را بگذار، ما تماس می‌گیریم.</div>

                  <input name='name' className='cta-input' placeholder='نام و نام خانوادگی' aria-label='نام و نام خانوادگی' required />
                  <input name='phone' className='cta-input' placeholder='شمارهٔ موبایل' aria-label='شمارهٔ موبایل' inputMode='tel' dir='ltr' style={{ textAlign: 'right' }} required />
                  <select name='department' className='cta-input' defaultValue='' aria-label='موضوع'>
                    <option value=''>موضوع پرونده (اختیاری)</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  {error && <div className='cta-error' role='alert'>{error}</div>}

                  <button type='submit' className='cta-submit' disabled={loading}>
                    {loading ? 'در حال ارسال…' : 'ثبت درخواست تماس'}
                    {!loading && <span aria-hidden>←</span>}
                  </button>
                </form>
              )}
            </div>
          </Col>
        </Row>
      </section>
    </div>
  )
}