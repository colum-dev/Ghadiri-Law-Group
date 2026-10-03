import UserHeroBannerPrimary from '@/app/components/user/banner/UserHeroBannerPrimary'
import React from 'react'
import heroBannerImg from '../../assets/images/home/herobanner1.png';
import samplePng from '../../assets/images/icons/sample.png';

export default function UserHomeHeroBannerOne() {

    const stats = [
        { icon: samplePng, to: 94, suffix: '٪', label: 'نرخ موفقیت بالا' },
        { icon: samplePng, to: 22, suffix: '+', label: 'افتخار همکاری' },
        { icon: samplePng, to: 5, suffix: '+', label: 'سال سابقه' },
    ]

    return (
        <div className='bg-bone w-100'>
            <div className='main-user-layout'>
                <UserHeroBannerPrimary heroBannerImg={heroBannerImg}
                    imageAlt='مجسمه عدالت'
                    slogan='بیش از یک دهه دفاع از حق موکلان'
                    title={<span> این یک<br />تایتل نمونه و<br /><span className='color-gold'>اتفاقی</span> است.</span>}
                    description=' این یک متن نمونه است. جای این پاراگراف، معرفی کوتاهی از دفتر، رویکرد شما و اینکه چرا موکلان باید به شما اعتماد کنند قرار می‌گیرد.'
                    moreInfoLink='/services'
                    contactUsLink='/contact-us'
                    stats={stats}
                />
            </div>
        </div>
    )
}
