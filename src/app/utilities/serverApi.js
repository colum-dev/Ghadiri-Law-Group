import 'server-only'
const BASE=(process.env.API_URL||process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000').replace(/\/$/,'')
async function getJson(path){try{const res=await fetch(`${BASE}${path}`,{next:{revalidate:30}});if(!res.ok)return null;return await res.json()}catch{return null}}
export function getPublicHero(slug){return getJson(`/api/public/hero/${slug}`)}
export function getPublicAbout(){return getJson('/api/public/about')}
export function getPublicHome(){return getJson('/api/public/home')}
export function getPublicPage(slug){return getJson(`/api/public/pages/${slug}`)}
export function getPublicBlogPosts({category,q,page,limit}={}){const sp=new URLSearchParams();if(category)sp.set('category',category);if(q)sp.set('q',q);if(page)sp.set('page',String(page));if(limit)sp.set('limit',String(limit));const qs=sp.toString();return getJson(`/api/public/blog-posts${qs?`?${qs}`:''}`)}
export function getPublicBlogPost(slug){return getJson(`/api/public/blog-posts/${encodeURIComponent(slug)}`)}
