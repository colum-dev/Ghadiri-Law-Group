import { cache } from 'react'
import { notFound } from 'next/navigation'
import UserArticle from '@/app/views/blogs/UserArticle'
import { getPublicBlogPost } from '@/app/utilities/serverApi'
import { formatFaDate, mediaUrl, toCardArticle, toFaDigits } from '@/app/utilities/blog'
const load=cache(slug=>getPublicBlogPost(slug))
export async function generateMetadata({params}){const {slug}=await params;const d=await load(slug);if(!d?.post)return {title:'مقاله پیدا نشد'};const p=d.post;return {title:p.metaTitle||p.title,description:p.metaDescription||p.excerpt,openGraph:{type:'article',title:p.metaTitle||p.title,description:p.metaDescription||p.excerpt,images:p.coverImage?.path?[{url:mediaUrl(p.coverImage.path),alt:p.coverImage.alt||p.title}]:undefined}}}
export default async function Page({params}){const {slug}=await params;const d=await load(slug);if(!d?.post)notFound();const p=d.post;const article={...p,dateLabel:formatFaDate(p.publishedAt),updatedLabel:formatFaDate(p.updatedAt),readLabel:toFaDigits(p.readingMinutes||1),coverUrl:mediaUrl(p.coverImage?.path)};return <UserArticle article={article} related={(d.related||[]).map(toCardArticle)}/>}
