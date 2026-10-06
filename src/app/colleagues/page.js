import UserColleagues from '../views/colleagues/UserColleagues'
import { getPublicPage } from '../utilities/serverApi'

export const metadata = { title: 'همکاران' }

export default async function Page() {
    const result = await getPublicPage('colleagues')
    return <UserColleagues content={result?.content} />
}
