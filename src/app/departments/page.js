import UserDepartments from '../views/departments/UserDepartments'
import { getPublicPage } from '../utilities/serverApi'

export default async function Page() {
    const result = await getPublicPage('departments')
    return <UserDepartments content={result?.content} />
}
