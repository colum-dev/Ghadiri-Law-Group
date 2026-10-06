import UserFaqs from '../views/faqs/UserFaqs'
import { getPublicPage } from '../utilities/serverApi'

export const metadata = { title: 'سؤالات متداول' }

export default async function Page() {
    const result = await getPublicPage('faqs')
    return <UserFaqs content={result?.content} />
}
