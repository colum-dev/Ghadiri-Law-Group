import UserContractsPage from '@/app/views/services/UserContractsPage'
import { getPublicPage } from '@/app/utilities/serverApi'
export default async function Page(){const r=await getPublicPage('contracts');return <UserContractsPage content={r?.content}/>}
