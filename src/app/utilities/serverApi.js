import 'server-only'

const BASE = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, '')

export async function getPublicHero(slug) {
    try {
        const res = await fetch(`${BASE}/api/public/hero/${slug}`, { next: { revalidate: 30 } })
        if (!res.ok) return null
        return await res.json()
    } catch {
        return null
    }
}
