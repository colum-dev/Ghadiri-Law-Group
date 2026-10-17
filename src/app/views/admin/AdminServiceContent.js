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
import { CRIMES, TRAIL, DOCS as FC_DOCS, FAQ as FC_FAQ, SECTION_TITLES as FC_TITLES, FINANCIAL_CRIMES_CONTENT as FC_CONTENT } from '@/app/data/financialcrimes'

const CONFIG = {
    family: { label: 'حقوق خانواده', sections: [['situations', 'موقعیت‌ها', SITUATIONS], ['paths', 'مسیرها', PATHS], ['docs', 'مدارک', DOCS], ['faq', 'سؤالات متداول', FAMILY_FAQ]] },
    criminal: { label: 'دعاوی کیفری', sections: [['stages', 'مراحل', CRIMINAL_STAGES], ['rights', 'حقوق', RIGHTS], ['clocks', 'زمان‌های مهم', CLOCK], ['faq', 'سؤالات متداول', CRIMINAL_FAQ]] },
    business: { label: 'تجارت و شرکت‌ها', sections: [['stages', 'مراحل', BUSINESS_STAGES], ['risk', 'نشانه‌های خطر', FLAGS], ['types', 'انواع شرکت', BUSINESS_TYPES], ['faq', 'سؤالات متداول', BUSINESS_FAQ]] },
    'real-estate': { label: 'املاک و ثبت اسناد', sections: [['deeds', 'انواع سند', DEEDS], ['risk', 'موارد بررسی ریسک', RISK_ITEMS], ['roles', 'نقش‌ها', ROLES], ['faq', 'سؤالات متداول', REAL_FAQ]] },
    contracts: { label: 'قراردادها و مشاوره', sections: [['types', 'انواع قرارداد', CONTRACT_TYPES], ['compare', 'مقایسه بندها', COMPARE], ['steps', 'مراحل', STEPS], ['faq', 'سؤالات متداول', CONTRACT_FAQ]] },
    tax: { label: 'اداری و مالیاتی', sections: [['notices', 'ابلاغیه‌ها', NOTICES], ['stairs', 'مراحل رسیدگی', STAIRS], ['faq', 'سؤالات متداول', TAX_FAQ]] },
    'financial-crimes': {
        label: 'جرایم مالی و اقتصادی',
        sections: [['crimes', 'دفتر اتهام‌ها', CRIMES], ['trail', 'مسیر پرونده (ردّ پول)', TRAIL, { t: 'نام ایستگاه' }], ['docs', 'مدارک لازم', FC_DOCS], ['faq', 'سؤالات متداول', FC_FAQ, { text: 'پاسخ' }]],
        titles: [['ledgerTitle', 'عنوان دفتر اتهام‌ها'], ['ledgerSubtitle', 'توضیح دفتر اتهام‌ها', true], ['ledgerTotal', 'برچسب سطر جمع'], ['ledgerResult', 'نتیجهٔ سطر جمع'], ['trailTitle', 'عنوان مسیر پرونده'], ['trailSubtitle', 'توضیح مسیر پرونده', true], ['docsTitle', 'عنوان مدارک'], ['docsSubtitle', 'توضیح مدارک', true], ['faqTitle', 'عنوان سؤالات متداول']],
        titleDefaults: FC_TITLES,
        // پیش‌فرض بنر و دعوت به تماس؛ وقتی در دیتابیس چیزی ذخیره نشده، فرم خالی نماند
        defaults: { hero: { primaryLabel: 'مشاورهٔ فوری و محرمانه', primaryHref: '/contact-us', secondaryLabel: 'اتهام شما کدام است؟', secondaryHref: '#ledger', ...FC_CONTENT.hero }, cta: FC_CONTENT.cta },
        heroHint: 'برای تأکید روی بخشی از عنوان، آن را داخل {{ }} بنویسید؛ مثلاً: پرونده‌ای که با {{اعداد}} نوشته می‌شود',
        heroFields: [['title', 'عنوان'], ['badge', 'برچسب بالای عنوان'], ['description', 'توضیحات', true], ['primaryLabel', 'متن دکمهٔ اصلی'], ['primaryHref', 'لینک دکمهٔ اصلی'], ['secondaryLabel', 'متن دکمهٔ دوم'], ['secondaryHref', 'لینک دکمهٔ دوم']],
        fieldLabels: { code: 'کد ردیف', t: 'عنوان', law: 'مستند قانونی', level: 'سطح ریسک', risk: 'برچسب ریسک', text: 'توضیح', defense: 'رویکرد دفاع', who: 'مرجع / مسئول', title: 'سؤال' },
        selects: { level: [['high', 'شدید (high)'], ['mid', 'متوسط (mid)']] },
    },
}

// قالب آیتم جدید از روی اولین آیتم پیش‌فرض ساخته می‌شود (فهرست رشته‌ای → رشتهٔ خالی)
const templateOf = (defaults) => {
    const first = Array.isArray(defaults) ? defaults[0] : undefined
    if (typeof first === 'string') return ''
    if (first && typeof first === 'object') return Object.fromEntries(Object.keys(first).filter((key) => typeof first[key] === 'string' && key !== 'icon' && key !== 's').map((key) => [key, '']))
    return { title: '', t: '', text: '' }
}

const Field = ({ label, value, onChange, area = false }) => (
    <label className='d-block mb-3'>
        <span className='form-label'>{label}</span>
        {area ? <textarea className='form-control' rows={3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} /> : <input className='form-control' value={value ?? ''} onChange={(e) => onChange(e.target.value)} />}
    </label>
)

const editableKeys = (item) => Object.keys(item || {}).filter((key) => typeof item[key] === 'string' && key !== 'icon' && key !== 's')
const areaKeys = new Set(['text', 'description', 'summary', 'quote', 'body', 'next', 'short', 'heading', 'practice', 'sum', 'l'])

function ItemList({ label, items, onChange, template, fieldLabels = {}, selects = {} }) {
    const update = (index, key, value) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item))
    const withSelectDefaults = (t) => (t && typeof t === 'object') ? Object.fromEntries(Object.entries(t).map(([k, v]) => [k, selects[k] ? selects[k][0][0] : v])) : t
    const add = () => onChange([...items, template === undefined ? { title: '', t: '', text: '' } : (typeof template === 'string' ? template : withSelectDefaults({ ...template }))])
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
                        editableKeys(item).map((key) => selects[key] ? (
                            <label className='d-block mb-3' key={key}>
                                <span className='form-label'>{fieldLabels[key] || key}</span>
                                <select className='form-select' value={item[key] || selects[key][0][0]} onChange={(e) => update(index, key, e.target.value)}>
                                    {selects[key].map(([val, text]) => <option key={val} value={val}>{text}</option>)}
                                </select>
                            </label>
                        ) : (
                            <Field key={key} label={fieldLabels[key] || key} value={item[key]} onChange={(value) => update(index, key, value)} area={areaKeys.has(key)} />
                        ))
                    )}
                    <button type='button' className='btn btn-sm btn-outline-danger' onClick={() => remove(index)}>حذف آیتم</button>
                </div>
            ))}
        </section>
    )
}

// داده‌های نمایشی مثل React icon و style را از payload دیتابیس حذف می‌کنیم.
function serializable(value) {
    if (Array.isArray(value)) return value.map(serializable)
    if (!value || typeof value !== 'object') return value
    if (value.$$typeof || value.type === Symbol.for('react.element')) return undefined
    return Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'icon' && key !== 's' && key !== 'Provider' && key !== 'Consumer').map(([key, item]) => [key, serializable(item)]).filter(([, item]) => item !== undefined))
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
                hero: { ...(config?.defaults?.hero || {}), ...(content.hero || {}) },
                items: (content.services || content.items || SERVICES).map(serializable),
                // کلیدهای دیگر بخش‌ها (مثل عنوان‌ها) حفظ می‌شوند تا با ذخیره پاک نشوند
                sections: {
                    ...serializable(content.sections || {}),
                    ...Object.fromEntries((config?.titles || []).map(([key]) => [key, content.sections?.[key] ?? config?.titleDefaults?.[key] ?? ''])),
                    ...Object.fromEntries((config?.sections || []).map(([key, , defaults]) => [key, serializable(content.sections?.[key] || defaults)])),
                },
                cta: { ...(config?.defaults?.cta || {}), ...(content.cta || {}) },
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
            const content = serializable({ ...form, services: slug === 'services' ? form.items : undefined })
            await api(`/api/admin/pages/${slug}`, { method: 'PUT', body: { content } })
            setNotice('تغییرات ذخیره شد.')
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) return expire()
            setError(err.message || 'ذخیره‌سازی انجام نشد')
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
                {(config?.heroFields || [['title', 'عنوان'], ['badge', 'برچسب'], ['description', 'توضیحات', true]]).map(([key, label, area]) => <Field key={key} label={label} value={form.hero[key]} onChange={(value) => updateHero(key, value)} area={!!area} />)}
                {config?.heroHint && <div className='form-text'>{config.heroHint}</div>}
            </section>
            {config?.titles && (
                <section className='adm-card'>
                    <h2 className='h5'>عنوان‌های بخش‌ها</h2>
                    {config.titles.map(([key, label, area]) => <Field key={key} label={label} value={form.sections[key]} onChange={(value) => setForm((current) => ({ ...current, sections: { ...current.sections, [key]: value } }))} area={!!area} />)}
                </section>
            )}
            {config ? config.sections.map(([key, label, defaults, labels]) => <ItemList key={key} label={label} template={templateOf(defaults)} fieldLabels={{ ...config.fieldLabels, ...labels }} selects={config.selects} items={form.sections[key] || []} onChange={(value) => setForm((current) => ({ ...current, sections: { ...current.sections, [key]: value } }))} />) : <ItemList label='خدمات' items={form.items} onChange={(value) => setForm((current) => ({ ...current, items: value }))} />}
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
