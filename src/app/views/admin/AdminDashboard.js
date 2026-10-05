'use client'

import React from 'react'
import Link from 'next/link'

const SECTIONS = [
    { t: 'بنر صفحهٔ اول', d: 'شعار، عنوان، توضیح، تصویر، لینک‌ها و آمارها', href: '/admin/home-hero' },
]

export default function AdminDashboard() {
    return (
        <div>
            <h1 className='h4 mb-4'>داشبورد</h1>
            <div className='row g-3'>
                {SECTIONS.map((s) => (
                    <div className='col-md-6 col-xl-4' key={s.href}>
                        <Link href={s.href} className='adm-card d-block h-100 text-decoration-none'>
                            <div className='fw-bold mb-1'>{s.t}</div>
                            <div className='small text-secondary'>{s.d}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
