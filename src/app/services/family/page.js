import UserFamilyPage from '@/app/views/services/UserFamilyPage'
import { getPublicPage } from '@/app/utilities/serverApi'
export default async function Page(){const r=await getPublicPage('family');return <UserFamilyPage content={r?.content}/>}
