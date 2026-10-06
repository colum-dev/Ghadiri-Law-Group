import React from 'react'
import PointerGlow from '../common/PointerGlow'
import MarqueeBand from '../common/MarqueeBand'
import ContactActions from '../common/ContactActions'
import ContactInfoList from '../common/ContactInfoList'
import ContactRequestForm from './ContactRequestForm'
import { CONTACT_ICONS } from '@/app/data/contact'

export default function UserContactCtaContainer({ contact, words, departments, status, title, subtitle, endpoint }) {
  const info = [
    { text: contact.address, icon: <><path d='M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z' /><circle cx='12' cy='10' r='2.5' /></> },
    { text: contact.email, ltr: true, icon: <><rect x='3' y='5' width='18' height='14' rx='2' /><path d='M3 7l9 6 9-6' /></> },
    { text: contact.hours, icon: <><circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' /></> },
  ].filter((item) => item.text)
  return <div className='my-5 main-user-layout'><PointerGlow className='cta-panel radius-md'><span className='cta-blob cta-blob--1' /><span className='cta-blob cta-blob--2' /><MarqueeBand words={words} /><div className='row align-items-center g-5 position-relative'><div className='col-lg-7'><span className='cta-status'><i className='cta-dot' />{status}</span><h2 className='cta-title'>{title}</h2><p className='cta-sub'>{subtitle}</p><ContactActions phone={contact.phone} phoneLabel={contact.phoneLabel} whatsapp={contact.whatsapp} phoneIcon={CONTACT_ICONS.phone} whatsappIcon={CONTACT_ICONS.whatsapp} /><ContactInfoList items={info} /></div><div className='col-lg-5'><ContactRequestForm departments={departments} endpoint={endpoint} /></div></div></PointerGlow></div>
}
