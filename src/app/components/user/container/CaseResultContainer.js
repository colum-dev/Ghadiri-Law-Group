import React from 'react'
import Link from 'next/link'
import UserSectionHead from '../title/UserSectionHead'
import Reveal from '../animation/Reveal'
import RingStat from '../animation/RingStat'
import '../../../assets/styles/components/user/container/Caseresult.scss'

export default function CaseResultContainer({ eyebrow, title, subtitle, text, action, stat }) {
    return (
        <div className='main-user-layout'>
            <section className='ab-bare cr-result'>
                <div>
                    <UserSectionHead eyebrow={eyebrow} title={title} subtitle={subtitle} />
                    <p className='ab-text'>{text}</p>
                    {action && (
                        <Link href={action.href} className='ab-btn ab-btn--gold mt-3'>
                            {action.label} <span aria-hidden>←</span>
                        </Link>
                    )}
                </div>
                <Reveal><RingStat to={stat.to} label={stat.label} /></Reveal>
            </section>
        </div>
    )
}