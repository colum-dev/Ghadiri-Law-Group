import UserBusinessPage from '@/app/views/services/UserBusinessPage'
import { getPublicPage } from '@/app/utilities/serverApi'
export default async function Page(){const r=await getPublicPage('business');return <UserBusinessPage content={r?.content}/>}
