'use client'

import { useAdminAuth } from '@/app/layouts/admin/admin/AdminAuthContext'
import React, { useState } from 'react'

export default function AdminLogin() {
    const { login } = useAdminAuth()
    const [form, setForm] = useState({ username: '', password: '' })
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        setBusy(true)
        setError('')
        try {
            await login(form.username, form.password)
        } catch (err) {
            setError(err.message)
            setBusy(false)
        }
    }

    return (
        <form className='adm-card adm-login' onSubmit={submit}>
            <h1 className='h5 mb-4 text-center'>ورود به پنل مدیریت</h1>

            {error && <div className='alert alert-danger py-2' role='alert'>{error}</div>}

            <label className='form-label' htmlFor='adm-user'>نام کاربری</label>
            <input id='adm-user' className='form-control mb-3' dir='ltr' autoComplete='username' required
                value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />

            <label className='form-label' htmlFor='adm-pass'>رمز عبور</label>
            <input id='adm-pass' type='password' className='form-control mb-4' dir='ltr' autoComplete='current-password' required
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

            <button type='submit' className='btn btn-dark w-100' disabled={busy}>
                {busy ? 'در حال ورود…' : 'ورود'}
            </button>
        </form>
    )
}
