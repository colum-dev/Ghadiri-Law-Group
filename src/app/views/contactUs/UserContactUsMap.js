import React from 'react'
import SectionTitle from '@/app/components/user/title/SectionTitle'

export default function UserContactUsMap({
    Svg,
    hours,
    address,
    title = 'آدرس و ساعات کاری',
    sub = 'این یک متن نمونه است.',
}) {
    return (
        <section id='office' className='ab-full ab-panel ab-panel--navy'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <SectionTitle title={title} sub={sub} />
                <div className='cn-office'>
                    <div className='cn-map' aria-hidden>
                        <Svg sw={1}>
                            <path d='M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z' />
                            <circle cx='12' cy='9' r='2.5' />
                        </Svg>
                        <span>این یک نقشهٔ نمونه است</span>
                    </div>
                    <div className='cn-office-info'>
                        <p className='cn-address'>{address}</p>
                        <table className='cn-hours'>
                            <tbody>
                                {hours.map(([d, h]) => (
                                    <tr key={d}>
                                        <td>{d}</td>
                                        <td dir='ltr'>{h}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}