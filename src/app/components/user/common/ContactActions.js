import React from 'react'
import Svg from './Svg'

export default function ContactActions({ phone, phoneLabel, whatsapp, phoneIcon, whatsappIcon, callLabel = 'تماس مستقیم', whatsappLabel = 'پیام در واتساپ' }) {
    return (
        <div className='cta-actions'>
            <a href={`tel:${phone}`} className='cta-call'>
                <span className='cta-call-icon'><Svg><path d={phoneIcon} /></Svg></span>
                <span>
                    <small>{callLabel}</small>
                    <b dir='ltr'>{phoneLabel}</b>
                </span>
            </a>
            <a href={whatsapp} target='_blank' rel='noopener noreferrer' className='cta-wa'>
                <Svg><path d={whatsappIcon} /></Svg>
                {whatsappLabel}
            </a>
        </div>
    )
}