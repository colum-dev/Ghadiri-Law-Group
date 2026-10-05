export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, '')

export class ApiError extends Error {
    constructor(message, status, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }
}

export async function api(path, { method = 'GET', body, formData, signal } = {}) {
    const headers = {}
    let payload
    if (formData) {
        payload = formData
    } else if (body !== undefined) {
        headers['Content-Type'] = 'application/json'
        payload = JSON.stringify(body)
    }
    if (method !== 'GET') headers['X-Requested-With'] = 'XMLHttpRequest'

    let res
    try {
        res = await fetch(`${API_URL}${path}`, { method, headers, body: payload, credentials: 'include', signal })
    } catch (e) {
        if (e.name === 'AbortError') throw e
        throw new ApiError('ارتباط با سرور برقرار نشد', 0)
    }
    const data = await res.json().catch(() => null)
    if (!res.ok) throw new ApiError(data?.message || 'خطای ناشناخته', res.status, data?.errors)
    return data
}
