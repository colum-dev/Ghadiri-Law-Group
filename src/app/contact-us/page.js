import UserContactUs from '../views/contactUs/UserContactUs'
import { getPublicPage } from '../utilities/serverApi'

export default async function Page() {
    const result = await getPublicPage('contact')
    return <UserContactUs content={result?.content} />
}
