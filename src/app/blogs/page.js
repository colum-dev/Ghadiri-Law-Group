import UserBlogs from '../views/blogs/UserBlogs'
import { getPublicPage, getPublicBlogPosts } from '../utilities/serverApi'
import { toCardArticle } from '../utilities/blog'
export const metadata={title:'بلاگ حقوقی'}
export default async function Page(){const [result,posts]=await Promise.all([getPublicPage('blogs'),getPublicBlogPosts({limit:50})]);return <UserBlogs content={result?.content} posts={(posts?.items||[]).map(toCardArticle)} />}
