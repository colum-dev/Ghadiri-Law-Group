import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '@/app/layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import DeedFlipContainer from '@/app/components/user/container/DeedFlipContainer'
import RiskGaugeContainer from '@/app/components/user/container/RiskGaugeContainer'
import RoleStepsContainer from '@/app/components/user/container/RoleStepsContainer'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { DIGITS } from '@/app/data/services'
import { CHIPS, DEEDS, FAQ, KEY, RISK_ITEMS, RISK_LABELS, ROLES } from '@/app/data/realestate'

export default function UserRealEstatePage() {
    return (
        <MainUserLayout>
            <div className='ab re' dir='rtl'>
                <UserHeroBannerTertiary
                    crumb={[{ label: 'خانه', href: '/' }, { label: 'خدمات حقوقی', href: '/services' }, { label: 'املاک و ثبت اسناد' }]}
                    badge='استعلام سند، پیش از هر پرداختی'
                    title={<>یک <em>سند</em>، هزار داستان</>}
                    description='این یک متن نمونه است. از استعلام یک سند تا رفع تصرف یک ملک تجاری؛ حق مالکیت شما با مدرک اثبات می‌شود، نه با ادعا.'
                    primaryAction={{ href: '#', label: 'استعلام رایگان سند' }}
                    secondaryAction={{ href: '#risk', label: 'ریسک معامله‌ام چقدر است؟' }}
                    icon={<path d={KEY} />}
                    iconClassName='re-key'
                    chips={CHIPS}
                />

                <DeedFlipContainer
                    title='ملک شما چه سندی دارد؟'
                    subtitle='روی هر کارت بزنید تا پشت آن را ببینید؛ سطح ریسک هر نوع سند فرق دارد.'
                    deeds={DEEDS}
                />

                <RiskGaugeContainer
                    id='risk'
                    title='پیش از پرداخت هر مبلغی، این‌ها را چک کنید'
                    subtitle='هر مورد را که انجام داده‌اید علامت بزنید؛ عقربه‌ی ریسک زنده تغییر می‌کند.'
                    items={RISK_ITEMS}
                    labels={RISK_LABELS}
                />

                <RoleStepsContainer
                    title='مالک هستید یا مستأجر؟'
                    subtitle='مسیر رسیدگی برای هرکدام فرق دارد.'
                    roles={ROLES}
                    digits={DIGITS}
                />

                <StaticDescriptionTextContainerSecondary
                    containerTitle='قبل از تماس، شاید بپرسید'
                    contents={FAQ}
                />

                <UserCtaContainer
                    title='قبل از امضا، یک تماس بگیرید.'
                    subtitle='استعلام اولیهٔ سند رایگان است و شما را متعهد به ادامه نمی‌کند.'
                    action={{ href: '/contact-us', label: 'استعلام رایگان سند' }}
                />
            </div>
        </MainUserLayout>
    )
}