import React from 'react'
import { Row } from 'react-bootstrap'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import SectionTitle from '@/app/components/user/title/SectionTitle'
import UserDetailCardSecondary from '@/app/components/user/card/UserDetailCardSecondary'
import UserCtaContainer from '@/app/components/user/container/UserCtaContainer'
import { DEPARTMENTS } from '@/app/data/departments'

const SCALE_ICON = <path d='M12 3v18M5 7h14M5 7l-2 6a3 3 0 0 0 4 0L5 7zm14 0l-2 6a3 3 0 0 0 4 0l-2-6z' />

export default function UserDepartments() {
    return (
        <MainUserLayout>
            <div className='ab' dir='rtl'>
                <UserHeroBannerTertiary
                    crumb={[{ label: 'خانه', href: '/' }, { label: 'دپارتمان‌ها' }]}
                    badge='۱۲ حوزهٔ تخصصی، زیر یک سقف'
                    title={<>دپارتمان‌های <em>حقوقی</em> ما</>}
                    description='این یک متن نمونه است. هر دپارتمان به متخصص همان حوزه سپرده شده؛ برای آشنایی بیشتر با هرکدام، وارد صفحه‌اش شوید.'
                    icon={SCALE_ICON}
                />

                <div className='main-user-layout'>
                    <section className='ab-bare'>
                        <SectionTitle
                            title='دپارتمان‌های گروه حقوقی غدیری'
                            subtitle='این یک متن نمونه است. از خانواده تا فناوری اطلاعات، دوازده حوزهٔ تخصصی که پرونده‌ی شما را پوشش می‌دهند.'
                        />
                        <Row className='g-4'>
                            {DEPARTMENTS.map((d, i) => (
                                <UserDetailCardSecondary detail={d} key={d.slug} />
                            ))}
                        </Row>
                    </section>
                </div>

                <UserCtaContainer
                    title='نمی‌دانید پرونده‌تان به کدام دپارتمان مربوط است؟'
                    subtitle='کافی است با ما تماس بگیرید؛ دپارتمان مناسب را خودمان مشخص می‌کنیم.'
                    action={{ label: 'با ما تماس بگیرید', href: '/contact-us' }}
                />
            </div>
        </MainUserLayout>
    )
}