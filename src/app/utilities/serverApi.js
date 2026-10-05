import 'server-only'

const BASE = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, '')

async function getJson(path) {
    try {
        const res = await fetch(`${BASE}${path}`, { next: { revalidate: 30 } })
        if (!res.ok) return null
        return await res.json()
    } catch {
        return null
    }
}

export function getPublicHero(slug) {
    return getJson(`/api/public/hero/${slug}`)
}

export function getPublicAbout() {
    return getJson('/api/public/about')
}
