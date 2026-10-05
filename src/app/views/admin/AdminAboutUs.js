'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { api, ApiError } from '@/app/utilities/api'
import { useAdminAuth } from '@/app/layouts/admin/admin/AdminAuthContext'
import ImageUploadField from '@/app/components/admin/ImageUploadField'

const toForm = (data) => ({
    title: data.title,
    imageAlt: data.imageAlt || '',
    image: data.imagePath ? { path: data.imagePath, url: data.imageUrl, width: data.imageWidth, height: data.imageHeight } : null,
    descriptions: data.descriptions?.length ? data.descriptions.map((item) => item.description) : [''],
})

const toPayload = (form) => ({
    title: form.title,
    imageAlt: form.imageAlt,
    imagePath: form.image?.path ?? null,
    descriptions: form.descriptions.map((description) => ({ description })),
})

export default function AdminAboutUs() {
    const { expire } = useAdminAuth()
    const [form, setForm] = useState(null)
    const [saved, setSaved] = useState('')
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        api('/api/admin/about')
            .then((data) => {
                const next = toForm(data)
                setForm(next)
                setSaved(JSON.stringify(toPayload(next)))
            })
            .catch((err) => {
                if (err instanceof ApiError && err.status === 401) return expire()
                setError(err.message)
            })
    }, [expire])

    const dirty = useMemo(() => form && JSON.stringify(toPayload(form)) !== saved, [form, saved])
    const update = (patch) => { setNotice(''); setForm((current) => ({ ...current, ...patch })) }
    const updateDescription = (index, value) => update({ descriptions: form.descriptions.map((item, i) => i === index ? value : item) })

    const submit = async (event) => {
        event.preventDefault()
        setSaving(true)
        setError('')
        setNotice('')
        try {
            const data = await api('/api/admin/about', { method: 'PUT', body: toPayload(form) })
            const next = toForm(data)
            setForm(next)
            setSaved(JSON.stringify(toPayload(next)))
            setNotice('تغییرات دربارهٔ ما ذخیره شد.')
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) return expire()
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    if (error) return <div className='alert alert-danger'>{error}</div>
    if (!form) return <span className='spinner-border' role='status' aria-label='در حال بارگذاری' />

    return (
        <div>
            <h1 className='h4 mb-4'>دربارهٔ ما</h1>
            <form onSubmit={submit} className='adm-card d-grid gap-4'>
                <div>
                    <label className='form-label' htmlFor='about-title'>عنوان</label>
                    <input id='about-title' className='form-control' value={form.title} maxLength={255} required onChange={(e) => update({ title: e.target.value })} />
                </div>
                <div>
                    <label className='form-label'>توضیحات</label>
                    {form.descriptions.map((description, index) => (
                        <textarea key={index} className='form-control mb-2' rows={3} maxLength={5000} required value={description} onChange={(e) => updateDescription(index, e.target.value)} />
                    ))}
                    {form.descriptions.length < 20 && <button type='button' className='btn btn-outline-secondary btn-sm' onClick={() => update({ descriptions: [...form.descriptions, ''] })}>افزودن پاراگراف</button>}
                </div>
                <div>
                    <ImageUploadField label='تصویر دربارهٔ ما' value={form.image} onChange={(image) => update({ image })} onError={setError} help='PNG، JPG یا WebP تا ۳ مگابایت.' />
                    <label className='form-label mt-3' htmlFor='about-alt'>متن جایگزین تصویر</label>
                    <input id='about-alt' className='form-control' value={form.imageAlt} maxLength={255} onChange={(e) => update({ imageAlt: e.target.value })} />
                </div>
                {notice && <div className='alert alert-success'>{notice}</div>}
                <button type='submit' className='btn btn-dark align-self-start' disabled={saving || !dirty}>{saving ? 'در حال ذخیره…' : 'ذخیرهٔ تغییرات'}</button>
            </form>
        </div>
    )
}
