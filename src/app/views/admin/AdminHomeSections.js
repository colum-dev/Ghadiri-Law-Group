'use client'

import React, { useEffect, useState } from 'react'
import { api, ApiError } from '@/app/utilities/api'
import { useAdminAuth } from '@/app/layouts/admin/admin/AdminAuthContext'

const labels = { departments: 'دپارتمان‌ها', cases: 'پرونده‌ها', bestCases: 'پرونده‌های برتر', coworkers: 'همکاران', contact: 'تماس با ما', blogs: 'وبلاگ‌ها' }

export default function AdminHomeSections() {
    const { expire } = useAdminAuth()
    const [content, setContent] = useState(null)
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        api('/api/admin/home').then(setContent).catch((err) => {
            if (err instanceof ApiError && err.status === 401) return expire()
            setError(err.message)
        })
    }, [expire])

    const update = (slug, key, value) => setContent((current) => ({ ...current, [slug]: { ...current[slug], [key]: value } }))
    const submit = async (event) => {
        event.preventDefault()
        setSaving(true); setNotice(''); setError('')
        try { setContent(await api('/api/admin/home', { method: 'PUT', body: content })); setNotice('تغییرات همه سکشن‌ها ذخیره شد.') }
        catch (err) { if (err instanceof ApiError && err.status === 401) return expire(); setError(err.message) }
        finally { setSaving(false) }
    }

    if (error) return <div className='alert alert-danger'>{error}</div>
    if (!content) return <span className='spinner-border' role='status' aria-label='در حال بارگذاری' />

    return <form onSubmit={submit} className='d-grid gap-4'>
        <h1 className='h4 mb-0'>سکشن‌های صفحه اصلی</h1>
        {Object.entries(labels).map(([slug, label]) => <section className='adm-card d-grid gap-3' key={slug}>
            <h2 className='h6 mb-0'>{label}</h2>
            <input className='form-control' value={content[slug]?.title || ''} placeholder='عنوان' onChange={(e) => update(slug, 'title', e.target.value)} />
            <textarea className='form-control' rows={3} value={content[slug]?.subtitle || ''} placeholder='توضیح کوتاه' onChange={(e) => update(slug, 'subtitle', e.target.value)} />
            {slug === 'contact' && <input className='form-control' value={content[slug]?.status || ''} placeholder='وضعیت' onChange={(e) => update(slug, 'status', e.target.value)} />}
        </section>)}
        {notice && <div className='alert alert-success'>{notice}</div>}
        <button className='btn btn-dark align-self-start' disabled={saving}>{saving ? 'در حال ذخیره…' : 'ذخیره تغییرات'}</button>
    </form>
}
