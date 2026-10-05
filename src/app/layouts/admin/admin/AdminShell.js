'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import '../../../assets/styles/layouts/admin/Admin.scss'
import { AdminAuthProvider, useAdminAuth } from './AdminAuthContext'
import '../../../assets/styles/common/Common.scss'

const NAV_GROUPS = [
    {
        title: 'تغییر محتوای وبسایت',
        items: [
            { t: 'بنرها', href: '/admin/banners' },
            { t: 'دربارهٔ ما', href: '/admin/about-us' },
        ],
    },
]

function Shell({ children }) {
    const { status, username, logout } = useAdminAuth()
    const pathname = usePathname()
    const router = useRouter()
    const isLogin = pathname === '/admin/login'

    useEffect(() => {
        if (status === 'out' && !isLogin) router.replace('/admin/login')
        if (status === 'in' && isLogin) router.replace('/admin')
    }, [status, isLogin, router])

    if (status === 'loading' || (status === 'out' && !isLogin) || (status === 'in' && isLogin)) {
        return <div className='adm adm-center' dir='rtl'><span className='spinner-border' role='status' aria-label='در حال بارگذاری' /></div>
    }

    if (isLogin) return <div className='adm adm-center' dir='rtl'>{children}</div>

    return (
        <div className='adm yekan-bakh-bold' dir='rtl'>
            <aside className='adm-side'>
                <div className='adm-brand'>پنل مدیریت</div>
                <nav aria-label='منوی مدیریت' className='adm-nav'>
                    {NAV_GROUPS.map((group) => (
                        <div className='adm-nav-group' key={group.title}>
                            <div className='adm-nav-title'>{group.title}</div>
                            {group.items.map((item) => (
                                <Link key={item.href} href={item.href}
                                    className={`adm-link adm-sub-link${pathname.startsWith(item.href) ? ' is-active' : ''}`}>{item.t}</Link>
                            ))}
                        </div>
                    ))}
                </nav>
                <div className='adm-side-foot'>
                    <Link href='/' target='_blank' className='adm-link'>مشاهدهٔ سایت</Link>
                    <div className='adm-user'>{username}</div>
                    <button type='button' className='btn btn-outline-light btn-sm' onClick={logout}>خروج</button>
                </div>
            </aside>
            <main className='adm-main'>{children}</main>
        </div>
    )
}

export default function AdminShell({ children }) {
    return (
        <AdminAuthProvider>
            <Shell>{children}</Shell>
        </AdminAuthProvider>
    )
}
