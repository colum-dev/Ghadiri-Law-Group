'use client'

import React, { useState } from 'react'

const ICONS = {
  family: 'M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z',
  criminal: 'M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z',
  property: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z',
  business: 'M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm5-3h6v3H9V5z',
  contract: 'M6 3h9l4 4v14H6V3zm3 8h7M9 15h7',
  tax: 'M12 3v18M5 7h14M5 7l-2 6a3 3 0 0 0 4 0L5 7zm14 0l-2 6a3 3 0 0 0 4 0l-2-6z',
}

// type: cover | quote | stat  —  همه متن‌ها و عددها نمونه‌اند
const cases = [
  {
    id: 1, type: 'cover', tag: 'حقوق خانواده', icon: 'family', pattern: 'dots', size: 'l',
    title: 'توافق در پرونده مهریه و حضانت', result: 'صلح و سازش',
    summary: 'زوجی با اختلاف شدید بر سر مهریه و حضانت فرزند به دفتر مراجعه کردند و پرونده وارد مرحلهٔ دادگاه شده بود.',
    steps: ['بررسی مدارک و مطالبات دو طرف', 'مذاکرهٔ حضوری با حضور وکلا', 'ثبت توافق‌نامه در دادگاه'],
  },
  {
    id: 2, type: 'quote', tag: 'دعاوی کیفری',
    title: 'برائت از اتهام کلاهبرداری', result: 'حکم برائت',
    quote: 'چند ماه دفاع دقیق و مستند، و در نهایت برائت کامل.',
  },
  {
    id: 3, type: 'stat', tag: 'املاک و ثبت اسناد',
    stat: { value: '۴۵', unit: 'روز تا رفع تصرف' },
    title: 'رفع تصرف ملک تجاری', result: 'رفع تصرف',
    summary: 'اثبات مالکیت با اسناد رسمی و پیگیری سریع اجرای حکم.',
  },
  {
    id: 4, type: 'cover', tag: 'حقوق تجارت', icon: 'business', pattern: 'grid', size: 'm', inv: true,
    title: 'حل اختلاف شرکا', result: 'داوری موفق',
    summary: 'اختلاف بر سر تقسیم سود، فعالیت شرکت را متوقف کرده بود.',
    steps: ['بررسی اساسنامه و صورتجلسات', 'ارجاع به داوری', 'تقسیم سهام و تسویه'],
  },
  {
    id: 5, type: 'cover', tag: 'قراردادها', icon: 'contract', pattern: 'waves', size: 's',
    title: 'فسخ قرارداد پیمانکاری', result: 'بازگشت وجه',
    summary: 'پیمانکار تعهداتش را انجام نداده بود.',
    steps: ['ارسال اظهارنامه رسمی', 'کارشناسی میزان پیشرفت کار', 'مطالبهٔ وجه و خسارت'],
  },
  {
    id: 6, type: 'stat', tag: 'دعاوی اداری و مالیاتی',
    stat: { value: '۷۰٪', unit: 'کاهش جریمه' },
    title: 'اعتراض به برگ تشخیص مالیات', result: 'اصلاح برگ تشخیص',
    summary: 'لایحهٔ اعتراض در مهلت قانونی و دفاع در هیئت حل اختلاف.',
  },
  {
    id: 7, type: 'quote', tag: 'حقوق تجارت',
    title: 'میانجی‌گری در اختلاف شرکا', result: 'توافق نهایی',
    quote: 'شرکایی که ماه‌ها با هم حرف نمی‌زدند، دوباره پای یک میز نشستند.',
  },
  {
    id: 8, type: 'cover', tag: 'املاک و ثبت اسناد', icon: 'property', pattern: 'rings', size: 'l', inv: true,
    title: 'ابطال سند معارض ملک', result: 'ابطال سند',
    summary: 'برای یک ملک دو سند با مالکان متفاوت ثبت شده بود و معامله متوقف مانده بود.',
    steps: ['استعلام سوابق ثبتی', 'طرح دعوای ابطال سند', 'کارشناسی و اثبات تقدم مالکیت', 'اصلاح سند در دفتر املاک'],
  },
]

function PatternDef({ id, type }) {
  switch (type) {
    case 'dots':
      return (
        <pattern id={id} width='22' height='22' patternUnits='userSpaceOnUse'>
          <circle cx='4' cy='4' r='2' fill='currentColor' />
        </pattern>
      )
    case 'lines':
      return (
        <pattern id={id} width='16' height='16' patternUnits='userSpaceOnUse'>
          <path d='M-2 18L18 -2' stroke='currentColor' strokeWidth='1.5' />
        </pattern>
      )
    case 'grid':
      return (
        <pattern id={id} width='28' height='28' patternUnits='userSpaceOnUse'>
          <path d='M28 0H0V28' fill='none' stroke='currentColor' strokeWidth='1' />
        </pattern>
      )
    case 'waves':
      return (
        <pattern id={id} width='60' height='20' patternUnits='userSpaceOnUse'>
          <path d='M0 10Q15 0 30 10T60 10' fill='none' stroke='currentColor' strokeWidth='1.5' />
        </pattern>
      )
    default:
      return (
        <pattern id={id} width='44' height='44' patternUnits='userSpaceOnUse'>
          <circle cx='22' cy='22' r='15' fill='none' stroke='currentColor' strokeWidth='1.2' />
        </pattern>
      )
  }
}

function CoverArt({ id, pattern, icon }) {
  const pid = `case-pat-${id}`
  return (
    <svg className='case-cover-svg' viewBox='0 0 400 260' preserveAspectRatio='xMidYMid slice' aria-hidden>
      <defs>
        <PatternDef id={pid} type={pattern} />
      </defs>
      <rect width='400' height='260' fill={`url(#${pid})`} opacity='0.2' />
      <g
        transform='translate(70 60) scale(5.5)'
        fill='none' stroke='currentColor' strokeWidth='.7'
        strokeLinecap='round' strokeLinejoin='round' opacity='.55'
      >
        <path d={ICONS[icon]} />
      </g>
    </svg>
  )
}

export default function UserHomeCases() {
  const [filter, setFilter] = useState('همه')
  const [saved, setSaved] = useState({})

  const tags = ['همه', ...new Set(cases.map((c) => c.tag))]
  const list = filter === 'همه' ? cases : cases.filter((c) => c.tag === filter)
  const toggle = (id) => setSaved((s) => ({ ...s, [id]: !s[id] }))

  const renderCard = (c, i) => {
    const key = `${filter}-${c.id}`
    const style = { '--i': i }

    if (c.type === 'quote') {
      return (
        <article key={key} style={style} className='case-item case-quote glass-gold radius-md bg-bone border border-1 p-4'>
          <span className='case-quote-mark' aria-hidden>“</span>
          <div className='case-quote-text'>{c.quote}</div>
          <div className='d-flex align-items-center justify-content-between gap-2 mb-2'>
            <span className='case-tag'>{c.tag}</span>
            <span className='case-result glass-gold border border-1'>{c.result}</span>
          </div>
          <div className='fw-bold'>{c.title}</div>
        </article>
      )
    }

    if (c.type === 'stat') {
      return (
        <article key={key} style={style} className='case-item case-invert radius-md border border-1 p-4'>
          <div className='case-tag mb-3'>{c.tag}</div>
          <div className='case-stat-value'>{c.stat.value}</div>
          <div className='case-stat-unit'>{c.stat.unit}</div>
          <div className='fw-bold fs-5 mb-2'>{c.title}</div>
          <div className='fs-6 mb-3 dept-text'>{c.summary}</div>
          <span className='case-result case-result--line'>{c.result}</span>
        </article>
      )
    }

    return (
      <article key={key} style={style} className='case-item glass-gold radius-md bg-bone border border-1'>
        <div className={`case-cover case-cover--${c.size}${c.inv ? ' case-cover--inv' : ''}`}>
          <CoverArt id={c.id} pattern={c.pattern} icon={c.icon} />
          <button
            type='button'
            className={`case-pin${saved[c.id] ? ' case-pin--on' : ''}`}
            onClick={() => toggle(c.id)}
            aria-label='ذخیره پرونده'
            aria-pressed={!!saved[c.id]}
          >
            <svg viewBox='0 0 24 24' fill={saved[c.id] ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round'>
              <path d='M6 3h12v18l-6-4-6 4V3z' />
            </svg>
          </button>
          <span className='case-cover-result'>{c.result}</span>
        </div>

        <div className='case-body'>
          <div className='case-tag mb-2'>{c.tag}</div>
          <div className='fw-bold fs-5 mb-3'>{c.title}</div>

          <div className='case-label'>شرح پرونده</div>
          <div className='fs-6 dept-text mb-3'>{c.summary}</div>

          <div className='case-label'>روش حل</div>
          <ol className='case-steps'>
            {c.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </article>
    )
  }

  return (
    <div className='my-5 main-user-layout'>
      <div className='text-center mb-4'>
        <div className='fw-bold fs-2 mb-3'>خلاصه پرونده‌ها</div>
        <div className='fs-6 mx-auto dept-sub'>
          نمونه‌ای از پرونده‌هایی که با موفقیت پیش بردیم و مسیری که برای حل هرکدام طی شد.
        </div>
      </div>

      <div className='case-filters'>
        {tags.map((t) => (
          <button
            key={t}
            type='button'
            onClick={() => setFilter(t)}
            className={`case-chip glass-gold border border-1${filter === t ? ' case-chip--on' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className='cases-masonry'>{list.map(renderCard)}</div>
    </div>
  )
}