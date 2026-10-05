'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { api, ApiError } from '@/app/utilities/api'
import ImageUploadField from '@/app/components/admin/ImageUploadField'
import StatsEditor, { makeStat } from '@/app/components/admin/StatsEditor'
import UserHeroBannerPrimary from '@/app/components/user/banner/UserHeroBannerPrimary'
import { toBannerProps } from '@/app/utilities/heroBanner'
import { useAdminAuth } from '@/app/layouts/admin/admin/AdminAuthContext'

const SLUG = 'home'

const FIELD_LABELS = {
    slogan: 'شعار',
    title: 'عنوان',
    description: 'توضیح',
    imagePath: 'تصویر اصلی',
    imageAlt: 'متن جایگزین تصویر',
    moreInfoLink: 'لینک «بیشتر بدانید»',
    contactUsLink: 'لینک «تماس با ما»',
}

function fieldLabel(field) {
    const m = /^stats\.(\d+)\.(\w+)$/.exec(field)
    if (m) {
        const part = { label: 'عنوان', value: 'عدد', suffix: 'پسوند', iconPath: 'آیکن' }[m[2]] || m[2]
        return `آمار ${Number(m[1]) + 1} (${part})`
    }
    return FIELD_LABELS[field] || field
}

const toForm = (d) => ({
    slogan: d.slogan,
    title: d.title,
    description: d.description,
    imageAlt: d.imageAlt,
    moreInfoLink: d.moreInfoLink,
    contactUsLink: d.contactUsLink,
    image: d.imagePath ? { path: d.imagePath, url: d.imageUrl, width: d.imageWidth, height: d.imageHeight } : null,
    stats: d.stats.map((s) => makeStat({
        icon: s.iconPath ? { path: s.iconPath, url: s.iconUrl, width: 40, height: 40 } : null,
        value: String(s.value),
        suffix: s.suffix,
        label: s.label,
    })),
})

const toPayload = (f) => ({
    slogan: f.slogan,
    title: f.title,
    description: f.description,
    imageAlt: f.imageAlt,
    moreInfoLink: f.moreInfoLink,
    contactUsLink: f.contactUsLink,
    imagePath: f.image?.path ?? null,
    stats: f.stats.map((s) => ({
        iconPath: s.icon?.path ?? null,
        value: Number(s.value),
        suffix: s.suffix,
        label: s.label,
    })),
})

const toPreviewHero = (f) => ({
    slogan: f.slogan,
    title: f.title,
    description: f.description,
    imageAlt: f.imageAlt,
    moreInfoLink: f.moreInfoLink || '#',
    contactUsLink: f.contactUsLink || '#',
    imageUrl: f.image?.url ?? null,
    imageWidth: f.image?.width ?? null,
    imageHeight: f.image?.height ?? null,
    stats: f.stats.map((s) => ({ iconUrl: s.icon?.url ?? null, value: s.value, suffix: s.suffix, label: s.label || ' ' })),
})

export default function AdminHomeHero() {
    const { expire } = useAdminAuth()
    const [form, setForm] = useState(null)
    const [saved, setSaved] = useState('')
    const [loadError, setLoadError] = useState('')
    const [saving, setSaving] = useState(false)
    const [errors, setErrors] = useState([])
    const [notice, setNotice] = useState('')

    const handleErr = useCallback((err) => {
        if (err instanceof ApiError && err.status === 401) return expire()
        setNotice('')
        setErrors(err.errors?.length
            ? err.errors.map((e) => `${fieldLabel(e.field)}: ${e.message}`)
            : [err.message])
    }, [expire])

    useEffect(() => {
        const ac = new AbortController()
        api(`/api/admin/hero/${SLUG}`, { signal: ac.signal })
            .then((d) => {
                const f = toForm(d)
                setForm(f)
                setSaved(JSON.stringify(toPayload(f)))
            })
            .catch((e) => {
                if (e.name === 'AbortError') return
                if (e.status === 401) return expire()
                setLoadError(e.message)
            })
        return () => ac.abort()
    }, [expire])

    const dirty = form && JSON.stringify(toPayload(form)) !== saved

    useEffect(() => {
        if (!dirty) return
        const warn = (e) => { e.preventDefault(); e.returnValue = '' }
        window.addEventListener('beforeunload', warn)
        return () => window.removeEventListener('beforeunload', warn)
    }, [dirty])

    const bannerProps = useMemo(() => (form ? toBannerProps(toPreviewHero(form)) : null), [form])

    const set = (patch) => { setNotice(''); setForm((f) => ({ ...f, ...patch })) }
    const bind = (k) => ({ value: form[k], onChange: (e) => set({ [k]: e.target.value }) })

    const submit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setErrors([])
        setNotice('')
        try {
            const d = await api(`/api/admin/hero/${SLUG}`, { method: 'PUT', body: toPayload(form) })
            const f = toForm(d)
            setForm(f)
            setSaved(JSON.stringify(toPayload(f)))
            setNotice('تغییرات ذخیره شد. ظرف حدود نیم دقیقه در سایت دیده می‌شود.')
        } catch (err) {
            handleErr(err)
        } finally {
            setSaving(false)
        }
    }

    if (loadError) return <div className='alert alert-danger'>{loadError}</div>
    if (!form) return <span className='spinner-border' role='status' aria-label='در حال بارگذاری' />

    return (
        <div>
            <h1 className='h4 mb-4'>بنر صفحهٔ اول</h1>

            <form onSubmit={submit} className='row g-4'>
                <div className='col-xl-6'>
                    <div className='adm-card d-grid gap-3'>
                        <div>
                            <label className='form-label' htmlFor='f-slogan'>شعار (نشان بالای عنوان)</label>
                            <input id='f-slogan' className='form-control' maxLength={255} required {...bind('slogan')} />
                        </div>

                        <div>
                            <label className='form-label' htmlFor='f-title'>عنوان</label>
                            <textarea id='f-title' className='form-control' rows={4} maxLength={500} required {...bind('title')} />
                            <div className='form-text'>
                                هر خط یک خط جدید در بنر است. کلمهٔ طلایی را داخل دو آکولاد بگذارید؛ مثلاً: <span dir='ltr'>{'{{اتفاقی}}'}</span>
                            </div>
                        </div>

                        <div>
                            <label className='form-label' htmlFor='f-desc'>توضیح</label>
                            <textarea id='f-desc' className='form-control' rows={4} maxLength={2000} required {...bind('description')} />
                        </div>

                        <div className='row g-3'>
                            <div className='col-md-6'>
                                <label className='form-label' htmlFor='f-more'>لینک «بیشتر بدانید»</label>
                                <input id='f-more' className='form-control' dir='ltr' placeholder='/services' required {...bind('moreInfoLink')} />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label' htmlFor='f-contact'>لینک «تماس با ما»</label>
                                <input id='f-contact' className='form-control' dir='ltr' placeholder='/contact-us' required {...bind('contactUsLink')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-xl-6'>
                    <div className='adm-card d-grid gap-4'>
                        <div>
                            <ImageUploadField label='تصویر اصلی' value={form.image} onChange={(image) => set({ image })} onError={(m) => handleErr(new Error(m))}
                                help='PNG، JPG یا WebP تا ۳ مگابایت. اگر تصویری انتخاب نشود، تصویر پیش‌فرض سایت نمایش داده می‌شود.' />
                            <label className='form-label mt-3' htmlFor='f-alt'>متن جایگزین تصویر</label>
                            <input id='f-alt' className='form-control' maxLength={255} {...bind('imageAlt')} />
                        </div>

                        <StatsEditor stats={form.stats} onChange={(stats) => set({ stats })} onError={(m) => handleErr(new Error(m))} />
                    </div>
                </div>

                <div className='col-12'>
                    {errors.length > 0 && (
                        <div className='alert alert-danger' role='alert'>
                            <ul className='mb-0 ps-3'>{errors.map((m) => <li key={m}>{m}</li>)}</ul>
                        </div>
                    )}
                    {notice && <div className='alert alert-success' role='status'>{notice}</div>}

                    <div className='d-flex align-items-center gap-3'>
                        <button type='submit' className='btn btn-dark px-4' disabled={saving || !dirty}>
                            {saving ? 'در حال ذخیره…' : 'ذخیرهٔ تغییرات'}
                        </button>
                        {dirty && <span className='small text-secondary'>تغییرات ذخیره‌نشده دارید</span>}
                    </div>
                </div>
            </form>

            <h2 className='h6 mt-5 mb-3'>پیش‌نمایش زنده</h2>
            <div className='adm-preview bg-bone'>
                <div className='main-user-layout'>
                    <UserHeroBannerPrimary {...bannerProps} />
                </div>
            </div>
        </div>
    )
}
