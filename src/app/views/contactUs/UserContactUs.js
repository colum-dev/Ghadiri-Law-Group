'use client'
import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import '../../assets/styles/views/user/contactUs/ContactUs.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import UserHeroBannerSecondary from '../../components/user/banner/UserHeroBannerSecondary'
import UserContactCard from '../../components/user/card/UserContactCard'
import UserContactUsComponent from './UserContactUsComponent'
import UserContactUsMap from './UserContactUsMap'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'

const ICONS={
 phone:<path d='M4 5c0-1 1-2 2-2h2l2 5-2 2c1 3 3 5 6 6l2-2 5 2v2c0 1-1 2-2 2C10 20 4 14 4 5z'/>,
 whatsapp:<><path d='M4 20l1.4-4.2A8 8 0 1 1 9 19L4 20z'/><path d='M9 10c0 3 2.5 5.5 5.5 5.5'/></>,
 email:<><rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 7l9 6 9-6'/></>,
 address:<><path d='M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z'/><circle cx='12' cy='9' r='2.5'/></>,
}
const DEFAULT_CHANNELS=[{kind:'phone',t:'تماس تلفنی',v:'۰۲۱-۱۲۳۴۵۶۷۸',href:'tel:+982112345678'},{kind:'whatsapp',t:'واتس‌اپ',v:'۰۹۱۲-۱۲۳-۴۵۶۷',href:'https://wa.me/989121234567'},{kind:'email',t:'ایمیل',v:'info@ghadiri-law.example',href:'mailto:info@ghadiri-law.example'},{kind:'address',t:'آدرس دفتر',v:'تهران، خیابان نمونه، پلاک ۰ (نمونه)',href:'#office'}]
const DEFAULT_DEPARTMENTS=[{key:'family',t:'حقوق خانواده',name:'سارا احمدی',field:'کارشناسی ارشد حقوق خصوصی'},{key:'criminal',t:'دعاوی کیفری',name:'مهدی رضایی',field:'کارشناسی ارشد حقوق جزا و جرم‌شناسی'},{key:'business',t:'تجارت و شرکت‌ها',name:'امیر غدیری',field:'دکتری حقوق خصوصی'},{key:'real-estate',t:'املاک و ثبت اسناد',name:'نگار کریمی',field:'کارشناسی ارشد حقوق خصوصی'},{key:'other',t:'سایر موضوعات',name:'تیم پذیرش',field:'راهنمایی و ارجاع اولیه پرونده'}]
const DEFAULT_PRINCIPLES=[{title:'استقلال',text:'وکیل باید مستقل از هر فشار و نفوذی بیندیشد و تصمیم بگیرد. استقلال ما شرط اول دفاع مؤثر از موکل است.'},{title:'امانت‌داری',text:'اسناد، اسرار و اعتماد موکل امانتی است که با دقت و رازداری حفظ می‌شود.'},{title:'صداقت با موکل',text:'تصویر واقعی پرونده، با نقاط قوت و ضعف، همیشه پیش از هر تصمیمی با موکل در میان گذاشته می‌شود.'}]
const Svg=({children,sw=1.7})=><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={sw} strokeLinecap='round' strokeLinejoin='round'>{children}</svg>
export default function UserContactUs({content}){const channels=(content?.channels?.length?content.channels:DEFAULT_CHANNELS).map(x=>({...x,icon:ICONS[x.kind]||ICONS.phone}));const departments=content?.departments?.length?content.departments:DEFAULT_DEPARTMENTS;const office=content?.office||{};const hours=office.hours?.length?office.hours.map(x=>[x.day,x.time]):[['شنبه تا چهارشنبه','۹:۰۰ تا ۱۷:۰۰'],['پنجشنبه','۹:۰۰ تا ۱۳:۰۰'],['جمعه','تعطیل']];const principles=content?.principles||{};return <MainUserLayout><div className='ab cn' dir='rtl'><UserHeroBannerSecondary><div className='cn-channels'>{channels.map((c,i)=><UserContactCard contact={c} i={i} key={i}/>)}</div></UserHeroBannerSecondary><UserContactUsComponent departments={departments} title={content?.formTitle||'پیام‌تان را برای ما بفرستید'} subtitle={content?.formSubtitle||'ابتدا موضوع پرونده را انتخاب کنید تا پیام شما مستقیم به همکار مربوطه برسد.'} Svg={Svg}/><UserContactUsMap Svg={Svg} hours={hours} address={office.address||'تهران، خیابان نمونه، پلاک ۰ (نمونه)'} title={office.title||'آدرس و ساعات کاری'} sub={office.subtitle||'این یک متن نمونه است.'}/><StaticDescriptionTextContainerSecondary containerTitle={principles.title||'این یک متن نمونه است.'} containerSubTitle={principles.subtitle||'اصولی که وکالت را معنا می‌دهد'} contents={principles.items||DEFAULT_PRINCIPLES}/></div></MainUserLayout>}
