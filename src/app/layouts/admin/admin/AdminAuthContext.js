'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api } from '@/app/utilities/api'

const AuthContext = createContext(null)

export const useAdminAuth = () => useContext(AuthContext)

export function AdminAuthProvider({ children }) {
    const [state, setState] = useState({ status: 'loading', username: null })

    useEffect(() => {
        const ac = new AbortController()
        api('/api/auth/me', { signal: ac.signal })
            .then((d) => setState({ status: 'in', username: d.username }))
            .catch((e) => { if (e.name !== 'AbortError') setState({ status: 'out', username: null }) })
        return () => ac.abort()
    }, [])

    const login = useCallback(async (username, password) => {
        const d = await api('/api/auth/login', { method: 'POST', body: { username, password } })
        setState({ status: 'in', username: d.username })
    }, [])

    const logout = useCallback(async () => {
        try { await api('/api/auth/logout', { method: 'POST' }) } catch {}
        setState({ status: 'out', username: null })
    }, [])

    const expire = useCallback(() => setState({ status: 'out', username: null }), [])

    return <AuthContext.Provider value={{ ...state, login, logout, expire }}>{children}</AuthContext.Provider>
}
