'use client'

import React, { useRef, useState } from 'react'
import { api, API_URL } from '@/app/utilities/api'

const MAX_BYTES = 3 * 1024 * 1024

export default function ImageUploadField({ label, value, onChange, onError, help, compact = false }) {
    const inputRef = useRef(null)
    const [busy, setBusy] = useState(false)

    const pick = async (e) => {
        const file = e.target.files?.[0]
        e.target.value = ''
        if (!file) return
        if (file.size > MAX_BYTES) return onError('حجم تصویر نباید بیشتر از ۳ مگابایت باشد')

        setBusy(true)
        try {
            const fd = new FormData()
            fd.append('file', file)
            const r = await api('/api/admin/uploads', { method: 'POST', formData: fd })
            onChange({ path: r.path, url: `${API_URL}${r.path}`, width: r.width, height: r.height })
        } catch (err) {
            onError(err.message)
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className={`adm-img${compact ? ' adm-img--compact' : ''}`}>
            {label && <div className='form-label'>{label}</div>}
            <div className='d-flex align-items-center gap-3'>
                <div className='adm-img-box'>
                    {value
                        ? <img src={value.url} alt='' />
                        : <span className='small text-secondary'>بدون تصویر</span>}
                </div>
                <div className='d-flex flex-column gap-2 align-items-start'>
                    <input ref={inputRef} type='file' accept='image/png,image/jpeg,image/webp' hidden onChange={pick} />
                    <button type='button' className='btn btn-outline-dark btn-sm' disabled={busy} onClick={() => inputRef.current?.click()}>
                        {busy ? 'در حال آپلود…' : value ? 'تغییر تصویر' : 'انتخاب تصویر'}
                    </button>
                    {value && (
                        <button type='button' className='btn btn-link btn-sm text-danger p-0' onClick={() => onChange(null)}>حذف</button>
                    )}
                </div>
            </div>
            {help && <div className='form-text'>{help}</div>}
        </div>
    )
}
