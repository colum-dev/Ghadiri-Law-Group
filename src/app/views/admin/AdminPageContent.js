'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { api, ApiError } from '@/app/utilities/api'
import { useAdminAuth } from '@/app/layouts/admin/admin/AdminAuthContext'
import { PAGE_BY_SLUG } from '@/app/data/pageContent'

const pretty = (value) => JSON.stringify(value || {}, null, 2)

export default function AdminPageContent() {
    const { slug } = useParams()
    const meta = PAGE_BY_SLUG[slug]
    const { expire } = useAdminAuth()
    const [json, setJson] = useState('{}')
    const [customized, setCustomized] = useState(false)
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!meta) return
        api(`/api/admin/pages/${slug}`).then((data) => {
            setJson(pretty(data.content))
            setCustomized(Boolean(data.content))
        }).catch((e) => {
            if (e instanceof ApiError && e.status === 401) expire()
            else setError(e.message)
        })
    }, [slug, meta, expire])

    if (!meta) return <div className='alert alert-warning m-4'>این صفحه وجود ندارد.</div>

    const save = async (event) => {
        event.preventDefault(); setError(''); setNotice('')
        let content
        try { content = JSON.parse(json) } catch { setError('ساختار JSON معتبر نیست.'); return }
        if (!content || Array.isArray(content) || typeof content !== 'object') { setError('محتوا باید یک شیء JSON باشد.'); return }
        setSaving(true)
        try {
            const data = await api(`/api/admin/pages/${slug}`, { method: 'PUT', body: { content } })
            setJson(pretty(data.content)); setCustomized(true); setNotice('تغییرات ذخیره شد.')
        } catch (e) { if (e instanceof ApiError && e.status === 401) expire(); else setError(e.message) }
        finally { setSaving(false) }
    }

    const reset = async () => {
        if (!window.confirm('محتوای اختصاصی این صفحه حذف و پیش‌فرض برگردانده شود؟')) return
        setSaving(true); setError(''); setNotice('')
        try { await api(`/api/admin/pages/${slug}`, { method: 'DELETE' }); setJson('{}'); setCustomized(false); setNotice('محتوای پیش‌فرض برگشت.') }
        catch (e) { if (e instanceof ApiError && e.status === 401) expire(); else setError(e.message) }
        finally { setSaving(false) }
    }

    return <form onSubmit={save} className='p-4 d-grid gap-3' dir='rtl'>
        <div className='d-flex justify-content-between align-items-center gap-2 flex-wrap'>
            <div><h1 className='h4 mb-1'>ویرایش صفحهٔ {meta.label}</h1><div className='small text-secondary'>{customized ? 'محتوای اختصاصی فعال است.' : 'هنوز محتوای اختصاصی ذخیره نشده.'}</div></div>
            <div className='d-flex gap-2'><Link href={meta.path} target='_blank' className='btn btn-outline-secondary btn-sm'>مشاهدهٔ صفحه</Link>{customized && <button type='button' className='btn btn-outline-danger btn-sm' disabled={saving} onClick={reset}>بازگشت به پیش‌فرض</button>}</div>
        </div>
        <div className='adm-card'><label className='form-label'>محتوای صفحه به‌صورت JSON</label><textarea className='form-control font-monospace' dir='ltr' rows={28} value={json} onChange={(e) => setJson(e.target.value)} /><div className='form-text'>این نسخه ساختار کامل صفحه را آزاد می‌گذارد؛ متن، لیست، لینک و تنظیمات هر بخش را می‌توانی در همین JSON ذخیره کنی.</div></div>
        {error && <div className='alert alert-danger'>{error}</div>}{notice && <div className='alert alert-success'>{notice}</div>}
        <button className='btn btn-success' disabled={saving}>{saving ? 'در حال ذخیره…' : 'ذخیره تغییرات'}</button>
    </form>
}
