'use client'

import React, { useState } from 'react'
import { isValidIranMobile, normalizePhone } from '@/app/utilities/phone'

const LABELS = {
    title: 'درخواست تماس',
    subtitle: 'شماره‌ات را بگذار، ما تماس می‌گیریم.',
    name: 'نام و نام خانوادگی',
    phone: 'شمارهٔ موبایل',
    department: 'موضوع پرونده (اختیاری)',
    submit: 'ثبت درخواست تماس',
    sending: 'در حال ارسال…',
    successTitle: 'درخواست شما ثبت شد',
    successText: 'به‌زودی با شما تماس می‌گیریم.',
    nameError: 'نام و نام خانوادگی را وارد کنید.',
    phoneError: 'شمارهٔ موبایل معتبر نیست. مثال: ۰۹۱۲۳۴۵۶۷۸۹',
    failed: 'ارسال انجام نشد؛ لطفاً دوباره تلاش کنید.',
}

export default function ContactRequestForm({ departments = [], endpoint, labels }) {
    const L = { ...LABELS, ...labels }
    const [status, setStatus] = useState('idle') 
    const [error, setError] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))
        const name = String(data.name || '').trim()
        const phone = normalizePhone(data.phone)

        if (!name) return setError(L.nameError)
        if (!isValidIranMobile(phone)) return setError(L.phoneError)

        setError('')
        setStatus('loading')
        try {
            if (endpoint) {
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...data, name, phone }),
                })
                if (!res.ok) throw new Error('request failed')
            } else {
                await new Promise((r) => setTimeout(r, 700)) 
            }
            setStatus('sent')
        } catch {
            setError(L.failed)
            setStatus('idle')
        }
    }

    return (
        <div className='cta-form'>
            {status === 'sent' ? (
                <div className='cta-success' role='status' aria-live='polite'>
                    <svg viewBox='0 0 52 52' aria-hidden>
                        <circle cx='26' cy='26' r='23' />
                        <path d='M15 27l8 8 14-16' />
                    </svg>
                    <div className='fw-bold fs-5 mb-1'>{L.successTitle}</div>
                    <div className='cta-sub mb-0'>{L.successText}</div>
                </div>
            ) : (
                <form onSubmit={onSubmit} noValidate>
                    <div className='fw-bold fs-4 mb-1'>{L.title}</div>
                    <div className='cta-sub mb-4'>{L.subtitle}</div>

                    <input name='name' className='cta-input' placeholder={L.name} aria-label={L.name} autoComplete='name' required />
                    <input name='phone' className='cta-input' placeholder={L.phone} aria-label={L.phone}
                        inputMode='tel' autoComplete='tel' dir='ltr' style={{ textAlign: 'right' }} required />
                    <select name='department' className='cta-input' defaultValue='' aria-label={L.department}>
                        <option value=''>{L.department}</option>
                        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>

                    {error && <div className='cta-error' role='alert'>{error}</div>}

                    <button type='submit' className='cta-submit' disabled={status === 'loading'}>
                        {status === 'loading' ? L.sending : L.submit}
                        {status !== 'loading' && <span aria-hidden>←</span>}
                    </button>
                </form>
            )}
        </div>
    )
}