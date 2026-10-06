'use client'

import React, { useEffect, useState } from 'react'
import { api, ApiError } from '@/app/utilities/api'
import { useAdminAuth } from '@/app/layouts/admin/admin/AdminAuthContext'
import { SERVICES } from '@/app/data/services'
import { SITUATIONS, PATHS, DOCS, FAQ as FAMILY_FAQ } from '@/app/data/family'
import { STAGES as CRIMINAL_STAGES, RIGHTS, CLOCK, FAQ as CRIMINAL_FAQ } from '@/app/data/criminal'
import { STAGES as BUSINESS_STAGES, FLAGS, TYPES as BUSINESS_TYPES, FAQ as BUSINESS_FAQ } from '@/app/data/commercialandcorporate'
import { DEEDS, RISK_ITEMS, ROLES, FAQ as REAL_FAQ } from '@/app/data/realestate'
import { TYPES as CONTRACT_TYPES, COMPARE, STEPS, FAQ as CONTRACT_FAQ } from '@/app/data/contracts'
import { NOTICES, STAIRS, FAQ as TAX_FAQ } from '@/app/data/administrativeandtax'

const CONFIG = {
    family: { label: 'حقوق خانواده', sections: [['situations', 'موقعیت‌ها', SITUATIONS], ['paths', 'مسیرها', PATHS], ['docs', 'مدارک', DOCS], ['faq', 'سؤالات متداول', FAMILY_FAQ]] },
    criminal: { label: 'دعاوی کیفری', sections: [['stages', 'مراحل', CRIMINAL_STAGES], ['rights', 'حقوق', RIGHTS], ['clocks', 'زمان‌های مهم', CLOCK], ['faq', 'سؤالات متداول', CRIMINAL_FAQ]] },
    business: { label: 'تجارت و شرکت‌ها', sections: [['stages', 'مراحل', BUSINESS_STAGES], ['risk', 'نشانه‌های خطر', FLAGS], ['types', 'انواع شرکت', BUSINESS_TYPES], ['faq', 'سؤالات متداول', BUSINESS_FAQ]] },
    'real-estate': { label: 'املاک و ثبت اسناد', sections: [['deeds', 'انواع سند', DEEDS], ['risk', 'موارد بررسی ریسک', RISK_ITEMS], ['roles', 'نقش‌ها', ROLES], ['faq', 'سؤالات متداول', REAL_FAQ]] },
    contracts: { label: 'قراردادها و مشاوره', sections: [['types', 'انواع قرارداد', CONTRACT_TYPES], ['compare', 'مقایسه بندها', COMPARE], ['steps', 'مراحل', STEPS], ['faq', 'سؤالات متداول', CONTRACT_FAQ]] },
    tax: { label: 'اداری و مالیاتی', sections: [['notices', 'ابلاغیه‌ها', NOTICES], ['stairs', 'مراحل رسیدگی', STAIRS], ['faq', 'سؤالات متداول', TAX_FAQ]] },
}

const Field = ({ label, value, onChange, area = false }) => (
    <label className='d-block mb-3'>
        <span className='form-label'>{label}</span>
        {area ? <textarea className='form-control' rows={3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} /> : <input className='form-control' value={value ?? ''} onChange={(e) => onChange(e.target.value)} />}
    </label>
)

const editableKeys = (item) => Object.keys(item || {}).filter((key) => typeof item[key] === 'string' && key !== 'icon' && key !== 's')
const areaKeys = new Set(['text', 'description', 'summary', 'quote', 'body', 'next', 'short', 'heading', 'practice', 'sum', 'l'])

function ItemList({ label, items, onChange }) {
    const update = (index, key, value) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item))
    const add = () => onChange([...items, { title: '', t: '', text: '' }])
    const remove = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index))

    return (
        <section className='adm-card mb-3'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h2 className='h5 mb-0'>{label} ({items.length})</h2>
                <button type='button' className='btn btn-sm btn-outline-primary' onClick={add}>+ افزودن</button>
            </div>
            {items.map((item, index) => (
                <div className='border rounded p-3 mb-2' key={index}>
                    {typeof item === 'string' ? (
                        <Field label={`آیتم ${index + 1}`} value={item} onChange={(value) => onChange(items.map((current, currentIndex) => currentIndex === index ? value : current))} area />
                    ) : (
                        editableKeys(item).map((key) => (
                            <Field key={key} label={key} value={item[key]} onChange={(value) => update(index, key, value)} area={areaKeys.has(key)} />
                        ))
                    )}
                    <button type='button' className='btn btn-sm btn-outline-danger' onClick={() => remove(index)}>حذف آیتم</button>
                </div>
            ))}
        </section>
    )
}

export default function AdminServiceContent({ slug = 'services' }) {
    const { expire } = useAdminAuth()
    const config = CONFIG[slug]
    const [form, setForm] = useState(null)
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        api(`/api/admin/pages/${slug}`).then((result) => {
            const content = result.content || {}
            setForm({
                hero: { ...(content.hero || {}) },
                items: content.services || content.items || SERVICES,
                sections: Object.fromEntries((config?.sections || []).map(([key, , defaults]) => [key, content.sections?.[key] || defaults])),
                cta: { ...(content.cta || {}) },
            })
        }).catch((err) => {
            if (err instanceof ApiError && err.status === 401) return expire()
            setError(err.message)
        })
    }, [slug, expire, config])

    const updateHero = (key, value) => setForm((current) => ({ ...current, hero: { ...current.hero, [key]: value } }))
    const updateCta = (key, value) => setForm((current) => ({ ...current, cta: { ...current.cta, [key]: value } }))

    const save = async (event) => {
        event.preventDefault()
        setSaving(true)
        setError('')
        setNotice('')
        try {
            const content = { ...form, services: slug === 'services' ? form.items : undefined }
            await api(`/api/admin/pages/${slug}`, { method: 'PUT', body: { content } })
            setNotice('تغییرات ذخیره شد.')
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) return expire()
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    if (!form) return <div className='p-4'>{error || 'در حال بارگذاری…'}</div>

    return (
        <form onSubmit={save} className='p-4 d-grid gap-3' dir='rtl'>
            <h1 className='h4'>ویرایش صفحه {config?.label || 'خدمات'}</h1>
            <section className='adm-card'>
                <h2 className='h5'>بنر صفحه</h2>
                <Field label='عنوان' value={form.hero.title} onChange={(value) => updateHero('title', value)} />
                <Field label='برچسب' value={form.hero.badge} onChange={(value) => updateHero('badge', value)} />
                <Field label='توضیحات' value={form.hero.description} onChange={(value) => updateHero('description', value)} area />
            </section>
            {config ? config.sections.map(([key, label]) => <ItemList key={key} label={label} items={form.sections[key] || []} onChange={(value) => setForm((current) => ({ ...current, sections: { ...current.sections, [key]: value } }))} />) : <ItemList label='خدمات' items={form.items} onChange={(value) => setForm((current) => ({ ...current, items: value }))} />}
            <section className='adm-card'>
                <h2 className='h5'>دعوت به تماس</h2>
                <Field label='عنوان' value={form.cta.title} onChange={(value) => updateCta('title', value)} />
                <Field label='توضیحات' value={form.cta.subtitle} onChange={(value) => updateCta('subtitle', value)} area />
                <Field label='متن دکمه' value={form.cta.actionLabel} onChange={(value) => updateCta('actionLabel', value)} />
                <Field label='لینک دکمه' value={form.cta.actionHref} onChange={(value) => updateCta('actionHref', value)} />
            </section>
            {error && <div className='alert alert-danger'>{error}</div>}
            {notice && <div className='alert alert-success'>{notice}</div>}
            <button className='btn btn-success' disabled={saving}>{saving ? 'در حال ذخیره…' : 'ذخیره تغییرات'}</button>
        </form>
    )
}
