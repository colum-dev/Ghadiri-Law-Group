import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import StageExplorerContainer from '@/app/components/user/container/StageExplorerContainer'
import RiskScanContainer from '@/app/components/user/container/RiskScanContainer'
import CompareCardsContainer from '@/app/components/user/container/CompareCardsContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { DIGITS } from '@/app/data/services'
import { BUILDING, CHIPS, FAQ, FLAGS, RISK_LABELS, STAGES, TYPES } from '@/app/data/commercialandcorporate'

export default function UserBusinessPage() {
    return (
        <MainUserLayout>
            <div className='ab bz' dir='rtl'>
                <UserHeroBannerTertiary
                    crumb={[{ label: 'خانه', href: '/' }, { label: 'خدمات حقوقی', href: '/services' }, { label: 'حقوق تجارت و شرکت‌ها' }]}
                    badge='مشاوره پیش از ثبت و پیش از امضا'
                    title={<>کسب‌وکارتان را از <em>روز اول</em> ببندید</>}
                    description='این یک متن نمونه است. از ثبت شرکت تا اختلاف شرکا، حقوق تجاری شما را با قرارداد و ساختار درست از ابتدا محکم می‌کنیم.'
                    primaryAction={{ href: '#', label: 'مشاوره برای شرکت من' }}
                    secondaryAction={{ href: '#stage', label: 'مرحلهٔ کسب‌وکارم کدام است؟' }}
                    icon={<path d={BUILDING} />}
                    chips={CHIPS}
                />

                <StageExplorerContainer
                    id='stage'
                    title='الان در کدام مرحله‌اید؟'
                    subtitle='یکی را از فهرست انتخاب کنید تا جزئیاتش را ببینید.'
                    stages={STAGES}
                    digits={DIGITS}
                    icon={<path d={BUILDING} />}
                />

                <RiskScanContainer
                    title='قراردادتان چند نشانهٔ خطر دارد؟'
                    subtitle='هر موردی که در قرارداد شما وجود دارد را علامت بزنید.'
                    flags={FLAGS}
                    labels={RISK_LABELS}
                    action={{ href: '#', label: 'بازبینی این قرارداد' }}
                />

                <CompareCardsContainer
                    title='کدام نوع شرکت مناسب شماست؟'
                    subtitle='این یک متن نمونه است. مقایسه‌ای کلی؛ تصمیم نهایی در جلسهٔ مشاوره گرفته می‌شود.'
                    items={TYPES}
                />

                <StaticDescriptionTextContainerSecondary
                    containerTitle='قبل از تماس، شاید بپرسید'
                    contents={FAQ}
                />

                <UserCtaContainer
                    title='کسب‌وکارتان لایق قرارداد درست است.'
                    subtitle='یک جلسهٔ مشاوره، پیش از هر ثبت یا امضایی.'
                    action={{ href: '/contact-us', label: 'مشاوره برای شرکت من' }}
                />
            </div>
        </MainUserLayout>
    )
}