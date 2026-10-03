import React from 'react'
import Reveal from '../animation/Reveal'

export default function UserContactCard(props) {
    const { contact, i } = props;

    const Svg = ({ children, sw = 1.7 }) => (
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>)

    return (
        <Reveal key={contact.t} delay={i * 80}>
            <a href={contact.href} className='cn-ch glass-gold-hover hover-to-background-navy bg-bone border border-1'>
                <span className='cn-ch-ico'><Svg sw={1.6}>{contact.icon}</Svg></span>
                <span className='cn-ch-t'>{contact.t}</span>
                <span className='cn-ch-v' dir='ltr'>{contact.v}</span>
            </a>
        </Reveal>
    )
}
