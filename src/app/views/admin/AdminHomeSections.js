'use client'

import React, { useEffect, useState } from 'react'
import { api, ApiError } from '@/app/utilities/api'
import { useAdminAuth } from '@/app/layouts/admin/admin/AdminAuthContext'
import ListEditor, { FieldInput } from '@/app/components/admin/ListEditor'
import { ICON_OPTIONS } from '@/app/data/icons'

const T = (key, label, type = 'text', extra = {}) => ({ key, label, type, ...extra })
const iconField = T('icon', 'آیکون', 'select', { options: ICON_OPTIONS })

const SECTIONS = {
  departments: {
    label: 'دپارتمان‌ها',
    fields: [T('title', 'عنوان'), T('subtitle', 'توضیحات', 'textarea'), T('buttonText', 'متن دکمه'), T('buttonLink', 'لینک دکمه')],
    lists: [{
      key: 'items', label: 'دپارتمان‌ها',
      newItem: { title: '', text: '', icon: 'family' },
      fields: [T('title', 'نام دپارتمان'), T('text', 'توضیح', 'textarea'), iconField],
    }],
  },
  bestCases: {
    label: 'پرونده‌های برتر',
    fields: [T('title', 'عنوان'), T('subtitle', 'توضیحات', 'textarea'), T('buttonText', 'متن دکمه'), T('buttonLink', 'لینک دکمه')],
    lists: [{
      key: 'items', label: 'پرونده‌ها',
      newItem: { tag: '', title: '', result: '', statValue: '', statUnit: '', text: '' },
      fields: [T('tag', 'برچسب'), T('title', 'عنوان'), T('result', 'نتیجه'), T('text', 'توضیح', 'textarea'), T('statValue', 'عدد آمار'), T('statUnit', 'واحد آمار')],
    }],
  },
  cases: {
    label: 'خلاصه پرونده‌ها',
    fields: [T('title', 'عنوان'), T('subtitle', 'توضیحات', 'textarea')],
    lists: [{
      key: 'items', label: 'پرونده‌ها',
      newItem: {
        type: 'cover', tag: '', title: '', result: '', summary: '', quote: '',
        statValue: '', statUnit: '', steps: [], icon: 'family', pattern: 'dots', size: 'm', inv: false,
      },
      fields: [
        T('type', 'نوع کارت', 'select', { options: [
          { value: 'cover', label: 'کاور' },
          { value: 'quote', label: 'نقل‌قول' },
          { value: 'stat', label: 'آمار' },
        ] }),
        T('tag', 'برچسب'), T('title', 'عنوان'), T('result', 'نتیجه'),
        T('summary', 'شرح', 'textarea'), T('quote', 'نقل‌قول', 'textarea'),
        T('statValue', 'عدد آمار'), T('statUnit', 'واحد'), T('steps', 'مراحل', 'lines'), iconField,
      ],
    }],
  },
  coworkers: {
    label: 'همکاران',
    fields: [T('title', 'عنوان'), T('subtitle', 'توضیحات', 'textarea')],
    lists: [{
      key: 'team', label: 'اعضای تیم',
      newItem: { name: '', field: '', edu: '', photo: null },
      fields: [T('name', 'نام'), T('field', 'حوزه'), T('edu', 'تحصیلات'), T('photo', 'عکس', 'image')],
    }],
  },
  principles: {
    label: 'اصول',
    fields: [T('principlesTitle', 'عنوان بخش'), T('principlesSubtitle', 'زیرعنوان بخش')],
    lists: [{
      key: 'principles', label: 'اصول',
      newItem: { title: '', text: '' },
      fields: [T('title', 'عنوان'), T('text', 'متن', 'textarea')],
    }],
  },
  reasons: {
    label: 'چرا ما',
    fields: [T('reasonsTitle', 'عنوان بخش'), T('reasonsSubtitle', 'توضیحات بخش', 'textarea')],
    lists: [{
      key: 'reasons', label: 'دلایل انتخاب ما',
      newItem: { title: '', text: '', icon: 'scale' },
      fields: [T('title', 'عنوان'), T('text', 'متن', 'textarea'), iconField],
    }],
  },
  contact: {
    label: 'تماس با ما',
    fields: [T('status', 'وضعیت'), T('title', 'عنوان'), T('subtitle', 'توضیحات', 'textarea'), T('marqueeWords', 'کلمات متحرک', 'lines')],
    lists: [],
  },
}

export default function AdminHomeSections({ initialSection }) {
  const { expire } = useAdminAuth()
  const [content, setContent] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [saving, setSaving] = useState(false)
  const active = initialSection || 'departments'
  const section = SECTIONS[active] || SECTIONS.departments
  const data = content?.[active] || {}

  useEffect(() => {
    api('/api/admin/home').then(setContent).catch((err) => {
      if (err instanceof ApiError && err.status === 401) return expire()
      setError(err.message)
    })
  }, [expire])

  const update = (key, value) => setContent((current) => ({
    ...current,
    [active]: { ...(current?.[active] || {}), [key]: value },
  }))

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setNotice('')
    try {
      setContent(await api('/api/admin/home', { method: 'PUT', body: content }))
      setNotice('تغییرات ذخیره شد.')
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return expire()
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!content) return <div className='p-4'>{error || 'در حال بارگذاری…'}</div>

  return (
    <form onSubmit={submit} className='p-4' dir='rtl'>
      <h1>تغییر محتوای {section.label}</h1>
      {section.fields.map((field) => (
        <label key={field.key} className='d-block mb-3'>
          <span className='d-block mb-1'>{field.label}</span>
          <FieldInput field={field} value={data[field.key]} onChange={(value) => update(field.key, value)} />
        </label>
      ))}
      {section.lists.map((list) => (
        <ListEditor key={list.key} {...list} items={data[list.key] || []} onChange={(items) => update(list.key, items)} />
      ))}
      {error && <div className='alert alert-danger'>{error}</div>}
      {notice && <div className='alert alert-success'>{notice}</div>}
      <button type='submit' className='btn btn-success' disabled={saving}>
        {saving ? 'در حال ذخیره…' : 'ذخیره تغییرات'}
      </button>
    </form>
  )
}
