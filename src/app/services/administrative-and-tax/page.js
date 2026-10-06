import UserAdministrativeAndTax from '@/app/views/services/UserAdministrativeAndTax'
import { getPublicPage } from '@/app/utilities/serverApi'
export default async function Page(){const r=await getPublicPage('tax');return <UserAdministrativeAndTax content={r?.content}/>}
