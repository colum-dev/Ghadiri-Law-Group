import React from 'react'
import UserContactUsComponent from '../contactUs/UserContactUsComponent'
import '../../assets/styles/views/user/contactUs/ContactUs.scss'

export default function UserHomeContact() {

  const Svg = ({ children, sw = 1.7 }) => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
  )
  const DEPARTMENTS = [
    { key: 'family', t: 'حقوق خانواده', name: 'سارا احمدی', field: 'کارشناسی ارشد حقوق خصوصی' },
    { key: 'criminal', t: 'دعاوی کیفری', name: 'مهدی رضایی', field: 'کارشناسی ارشد حقوق جزا و جرم‌شناسی' },
    { key: 'business', t: 'تجارت و شرکت‌ها', name: 'امیر غدیری', field: 'دکتری حقوق خصوصی' },
    { key: 'real-estate', t: 'املاک و ثبت اسناد', name: 'نگار کریمی', field: 'کارشناسی ارشد حقوق خصوصی' },
    { key: 'other', t: 'سایر موضوعات', name: 'تیم پذیرش', field: 'راهنمایی و ارجاع اولیه پرونده' },
  ]
  return (
    <div className='ab cn' dir='rtl'>
      <UserContactUsComponent departments={DEPARTMENTS} Svg={Svg} />
    </div>
  )
}
