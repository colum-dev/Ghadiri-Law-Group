'use client'

import React from 'react'
import ImageUploadField from './ImageUploadField'

const MAX_STATS = 6
let uid = 0
export const makeStat = (p = {}) => ({ key: `s${++uid}`, icon: null, value: '0', suffix: '', label: '', ...p })

export default function StatsEditor({ stats, onChange, onError }) {
    const patch = (i, p) => onChange(stats.map((s, k) => (k === i ? { ...s, ...p } : s)))
    const remove = (i) => onChange(stats.filter((_, k) => k !== i))
    const move = (i, d) => {
        const j = i + d
        if (j < 0 || j >= stats.length) return
        const next = [...stats]
        ;[next[i], next[j]] = [next[j], next[i]]
        onChange(next)
    }

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <div className='fw-bold'>آمارها</div>
                <button type='button' className='btn btn-outline-dark btn-sm' disabled={stats.length >= MAX_STATS}
                    onClick={() => onChange([...stats, makeStat()])}>افزودن آمار</button>
            </div>
            {stats.length === 0 && <div className='small text-secondary'>آماری تعریف نشده است.</div>}

            <div className='d-grid gap-3'>
                {stats.map((s, i) => (
                    <div key={s.key} className='adm-stat'>
                        <ImageUploadField compact label='آیکن' value={s.icon} onChange={(icon) => patch(i, { icon })} onError={onError} />
                        <div className='row g-2 mt-1'>
                            <div className='col-4'>
                                <label className='form-label small'>عدد</label>
                                <input type='number' min='0' step='1' className='form-control' dir='ltr' value={s.value}
                                    onChange={(e) => patch(i, { value: e.target.value })} />
                            </div>
                            <div className='col-3'>
                                <label className='form-label small'>پسوند</label>
                                <input className='form-control' dir='ltr' maxLength={8} placeholder='+ یا ٪' value={s.suffix}
                                    onChange={(e) => patch(i, { suffix: e.target.value })} />
                            </div>
                            <div className='col-5'>
                                <label className='form-label small'>عنوان</label>
                                <input className='form-control' maxLength={100} value={s.label}
                                    onChange={(e) => patch(i, { label: e.target.value })} />
                            </div>
                        </div>
                        <div className='d-flex gap-2 mt-2'>
                            <button type='button' className='btn btn-outline-secondary btn-sm' disabled={i === 0} onClick={() => move(i, -1)} aria-label='بالا'>↑</button>
                            <button type='button' className='btn btn-outline-secondary btn-sm' disabled={i === stats.length - 1} onClick={() => move(i, 1)} aria-label='پایین'>↓</button>
                            <button type='button' className='btn btn-outline-danger btn-sm' onClick={() => remove(i)}>حذف آمار</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
