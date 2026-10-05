'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { api, ApiError } from '@/app/utilities/api'
import { useAdminAuth } from '@/app/layouts/admin/admin/AdminAuthContext'

export default function AdminBanners() {
    const { expire } = useAdminAuth()
    const [banners, setBanners] = useState(null)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        try {
            setError('')
            setBanners(await api('/api/admin/hero'))
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) return expire()
            setError(err.message)
        }
    }, [expire])

    useEffect(() => {
        load()
    }, [load])

    if (error) return <div className='alert alert-danger'>{error}</div>
    if (!banners) return <span className='spinner-border' role='status' aria-label='در حال بارگذاری' />

    return (
        <div>
            <h1 className='h4 mb-4'>بنرها</h1>
            {banners.length === 0 ? (
                <div className='adm-card text-secondary'>هنوز بنری ثبت نشده است.</div>
            ) : (
                <div className='row g-3'>
                    {banners.map((banner) => (
                        <div className='col-md-6 col-xl-4' key={banner.slug}>
                            <div className='adm-card h-100 d-flex flex-column gap-3'>
                                <div className='d-flex align-items-center gap-3'>
                                    <div className='adm-img-box adm-img--compact'>
                                        {banner.imageUrl && <img src={banner.imageUrl} alt={banner.imageAlt || banner.title} />}
                                    </div>
                                    <div className='min-w-0'>
                                        <h2 className='h6 mb-1'>{banner.title || banner.slug}</h2>
                                        <div className='small text-secondary' dir='ltr'>{banner.slug}</div>
                                    </div>
                                </div>
                                <div className='small text-secondary flex-grow-1'>{banner.slogan}</div>
                                {banner.slug === 'home' ? (
                                    <Link href='/admin/home-hero' className='btn btn-dark align-self-start'>ویرایش بنر</Link>
                                ) : (
                                    <span className='small text-secondary'>ویرایش این بنر هنوز در دسترس نیست</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
