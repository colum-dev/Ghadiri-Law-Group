'use client'

import UserEmployeeCardPrimary from '@/app/components/user/card/UserEmployeeCardPrimary'
import DetailCardContainerPrimary from '@/app/components/user/container/DetailCardContainerPrimary'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import SectionTitle from '@/app/components/user/title/SectionTitle'
import { API_URL } from '@/app/utilities/api'
import { iconOf } from '@/app/data/icons'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'

export default function UserHomeCoworkers({ content }) {
    const data = content || {}
    const team = (data.team || []).map((member) => ({
        ...member,
        photo: member.photo ? `${API_URL}${member.photo}` : null,
    }))
    const reasons = (data.reasons || []).map((reason, index) => ({
        ...reason,
        icon: iconOf(reason.icon, index),
    }))

    return <div className='ab' dir='rtl'>
        <div className='main-user-layout'>
            <section id='team' className='ab-bare'>
                <SectionTitle title={data.title || ''} subtitle={data.subtitle || ''} />
                <div className='ab-grid ab-grid--4'>
                    {team.map((member, i) => <UserEmployeeCardPrimary employee={member} i={i} key={i} />)}
                </div>
            </section>
        </div>

        {(data.principles || []).length > 0 && <StaticDescriptionTextContainerSecondary
            containerTitle={data.principlesTitle || ''}
            containerSubTitle={data.principlesSubtitle || ''}
            contents={data.principles}
        />}

        {reasons.length > 0 && <DetailCardContainerPrimary
            details={reasons}
            title={data.reasonsTitle || ''}
            subtitle={data.reasonsSubtitle || ''}
        />}
    </div>
}
