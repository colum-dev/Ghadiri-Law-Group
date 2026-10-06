import UserRealEstatePage from '@/app/views/services/UserRealEstatePage'
import { getPublicPage } from '@/app/utilities/serverApi'
export default async function Page(){const r=await getPublicPage('real-estate');return <UserRealEstatePage content={r?.content}/>}
