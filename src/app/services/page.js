import UserServices from '../views/services/UserServices'
import { getPublicPage } from '../utilities/serverApi'

export default async function Page() {
    const result = await getPublicPage('services')
    return <UserServices content={result?.content} />
}
