import UserFinancialCrimesPage from '@/app/views/services/UserFinancialCrimesPage'
import { getPublicPage } from '@/app/utilities/serverApi'

export const metadata = {
    title: 'جرایم مالی و اقتصادی | گروه حقوقی غدیری',
    description: 'دفاع تخصصی در پرونده‌های کلاهبرداری، خیانت در امانت، اختلاس، ارتشا، پولشویی و اخلال در نظام اقتصادی.',
}

export default async function Page() {
    const r = await getPublicPage('financial-crimes')
    return <UserFinancialCrimesPage content={r?.content} />
}
