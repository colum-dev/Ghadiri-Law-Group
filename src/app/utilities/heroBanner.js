import React from 'react'
import heroBannerImg from '../assets/images/home/herobanner1.png'
import samplePng from '../assets/images/icons/sample.png'

export const DEFAULT_HERO = {
    slogan: 'بیش از یک دهه دفاع از حق موکلان',
    title: 'این یک\nتایتل نمونه و\n{{اتفاقی}} است.',
    description: 'این یک متن نمونه است. جای این پاراگراف، معرفی کوتاهی از دفتر، رویکرد شما و اینکه چرا موکلان باید به شما اعتماد کنند قرار می‌گیرد.',
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    imageAlt: 'مجسمه عدالت',
    moreInfoLink: '/services',
    contactUsLink: '/contact-us',
    stats: [
        { iconUrl: null, value: 94, suffix: '٪', label: 'نرخ موفقیت بالا' },
        { iconUrl: null, value: 22, suffix: '+', label: 'افتخار همکاری' },
        { iconUrl: null, value: 5, suffix: '+', label: 'سال سابقه' },
    ],
}

export function renderHeroTitle(title = '') {
    return title.split('\n').map((line, i, lines) => (
        <React.Fragment key={i}>
            {line.split(/(\{\{.*?\}\})/g).map((part, j) =>
                /^\{\{.*\}\}$/.test(part)
                    ? <span key={j} className='color-gold'>{part.slice(2, -2)}</span>
                    : part
            )}
            {i < lines.length - 1 && <br />}
        </React.Fragment>
    ))
}

export function toBannerProps(h) {
    const hero = h || DEFAULT_HERO
    return {
        heroBannerImg: hero.imageUrl
            ? { src: hero.imageUrl, width: hero.imageWidth, height: hero.imageHeight }
            : heroBannerImg,
        imageAlt: hero.imageAlt,
        slogan: hero.slogan,
        title: <span>{renderHeroTitle(hero.title)}</span>,
        description: hero.description,
        moreInfoLink: hero.moreInfoLink,
        contactUsLink: hero.contactUsLink,
        stats: hero.stats.map((s) => ({
            icon: s.iconUrl ? { src: s.iconUrl, width: 40, height: 40 } : samplePng,
            to: Number(s.value) || 0,
            suffix: s.suffix,
            label: s.label,
        })),
    }
}
