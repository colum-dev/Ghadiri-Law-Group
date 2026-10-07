import UserCriminalPage from '@/app/views/services/UserCriminalPage'
import { getPublicPage } from '@/app/utilities/serverApi'
export default async function Page(){const r=await getPublicPage('criminal');return <UserCriminalPage content={r?.content}/>}
