import UserBlogs from '../views/blogs/UserBlogs'
import { getPublicPage } from '../utilities/serverApi'

export const metadata = { title: 'بلاگ حقوقی' }

export default async function Page() {
    const result = await getPublicPage('blogs')
    return <UserBlogs content={result?.content} />
}
