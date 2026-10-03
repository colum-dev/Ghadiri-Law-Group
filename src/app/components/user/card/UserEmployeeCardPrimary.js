import React from 'react'
import Reveal from '../animation/Reveal'
import '../../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../../assets/styles/common/Common.scss'
import Avatar from '../avatar/EmployeeAvatar'

export default function UserEmployeeCardPrimary(props) {

    const Svg = ({ children, sw = 1.7 }) => (
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>
            {children}
        </svg>
    )

    const { employee, i } = props
    return (
        <Reveal key={employee.name} delay={i * 90}>
            <article className='ab-card ab-card--bone ab-member'>
                <Avatar m={employee} />
                <div className='fw-bold fs-5 mb-2'>{employee.name}</div>
                <span className='ab-pill'>{employee.field}</span>
                <div className='ab-edu'>
                    <Svg><path d='M2 9l10-5 10 5-10 5L2 9zm5 3v5c0 1 2.2 2 5 2s5-1 5-2v-5' /></Svg>
                    <span>{employee.edu}</span>
                </div>
            </article>
        </Reveal>
    )
}
