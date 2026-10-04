'use client'

import React from 'react'
import '../../assets/styles/views/user/aboutUs/AboutUs.scss'
import '../../assets/styles/common/Common.scss'
import MainUserLayout from '../../layouts/admin/user/MainUserLayout'
import SectionTitle from '@/app/components/user/title/SectionTitle'
import Reveal from '@/app/components/user/animation/Reveal'
import UserHeroBannerTertiary from '@/app/components/user/banner/UserHeroBannerTertiary'
import UserPolicyContainer from '@/app/components/user/container/UserPolicyContainer'
import UserPledgeContainer from '@/app/components/user/container/UserPledgeContainer'
import UserEmployeeCardPrimary from '@/app/components/user/card/UserEmployeeCardPrimary'
import StaticDescriptionTextContainerSecondary from '@/app/components/user/container/StaticDescriptionTextContainerSecondary'
import DetailCardContainerPrimary from '@/app/components/user/container/DetailCardContainerPrimary'
import UserCaseCard from '@/app/components/user/card/UserCaseCard'
import UserReviewContainer from '@/app/components/user/container/UserReviewContainer'
import Link from 'next/link'

const POLICIES = [
    {
        title: 'حق‌مداری',
        short: 'حفاظت از حقوق موکل در چارچوب قانون و انصاف.',
        heading: 'دفاع از حق، تنها در چارچوب قانون',
        text: 'این یک متن نمونه است. هر پرونده با این پرسش آغاز می‌شود که حق موکل چیست و چگونه می‌توان آن را قانونی و مؤثر مطالبه کرد.',
        points: ['بررسی دقیق مستندات پیش از هر اقدام', 'دفاع از منافع موکل بدون تعارض منافع', 'پرهیز از هر اقدام خارج از چارچوب قانون'],
        practice: 'پیش از ورود به دادگاه، نقاط قوت و ضعف پرونده به‌صورت مکتوب با موکل مرور می‌شود.',
        icon: <path d='M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zm14 0l-3 7a3.5 3.5 0 0 0 6 0l-3-7z' />,
    },
    {
        title: 'شفافیت',
        short: 'اطلاع‌رسانی صادقانه از وضعیت پرونده، هزینه‌ها و نتیجه.',
        heading: 'روشن بودن همهٔ مراحل برای موکل',
        text: 'این یک متن نمونه است. موکل باید در هر لحظه بداند پرونده‌اش در چه مرحله‌ای است، چه هزینه‌ای دارد و چه انتظاری واقع‌بینانه است.',
        points: ['قرارداد مکتوب و حق‌الوکاله روشن از ابتدا', 'گزارش‌دهی منظم از روند پرونده', 'بیان واقع‌بینانهٔ احتمال نتیجه، بدون وعدهٔ قطعی'],
        practice: 'پس از هر جلسه یا اقدام مهم، خلاصهٔ آن برای موکل ارسال می‌شود.',
        icon: <><path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z' /><circle cx='12' cy='12' r='3' /></>,
    },
    {
        title: 'کیفیت',
        short: 'بررسی چندمرحله‌ای هر پرونده توسط متخصص همان حوزه.',
        heading: 'دقت، پیش از سرعت',
        text: 'این یک متن نمونه است. هر لایحه و هر اقدام حقوقی پیش از ارسال، مورد بازبینی همکاران متخصص قرار می‌گیرد.',
        points: ['سپردن پرونده به متخصص همان حوزه', 'بازبینی لوایح توسط یک وکیل دوم', 'به‌روزرسانی مستمر بر اساس رویه‌های قضایی'],
        practice: 'هیچ لایحه‌ای بدون بازبینی مستقل از دفتر خارج نمی‌شود.',
        icon: <path d='M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z' />,
    },
    {
        title: 'پیشگیری',
        short: 'اولویت با حل‌وفصل مسالمت‌آمیز و پیشگیری از دعوا.',
        heading: 'بهترین دعوا، دعوایی است که پیش نیاید',
        text: 'این یک متن نمونه است. بسیاری از اختلافات با مشاورهٔ به‌موقع و قرارداد دقیق قابل پیشگیری یا حل‌وفصل غیرقضایی است.',
        points: ['مشاوره پیش از امضای قرارداد و معامله', 'مذاکره و میانجی‌گری پیش از طرح دعوا', 'ورود به دادگاه فقط در صورت ضرورت'],
        practice: 'در نخستین جلسه، راه‌های غیرقضایی حل اختلاف هم بررسی و پیشنهاد می‌شود.',
        icon: <><path d='M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z' /><path d='M9 12l2 2 4-4' /></>,
    },
]

const ETHICS = [
    'رازداری مطلق دربارهٔ اطلاعات و اسناد موکل',
    'پرهیز کامل از تعارض منافع',
    'عدم وعدهٔ نتیجهٔ قطعی به موکل',
    'صداقت در ارائهٔ مشاوره، حتی وقتی خوشایند نیست',
    'رعایت شأن و احترام همهٔ اصحاب دعوا',
    'تعیین شفاف حق‌الوکاله پیش از شروع همکاری',
]

const TEAM = [
    { name: 'امیر غدیری', field: 'حقوق تجارت و شرکت‌ها', edu: 'دکتری حقوق خصوصی، دانشگاه تهران', photo: null },
    { name: 'سارا احمدی', field: 'حقوق خانواده', edu: 'کارشناسی ارشد حقوق خصوصی، دانشگاه شهید بهشتی', photo: null },
    { name: 'مهدی رضایی', field: 'دعاوی کیفری', edu: 'کارشناسی ارشد حقوق جزا و جرم‌شناسی', photo: null },
    { name: 'نگار کریمی', field: 'املاک و ثبت اسناد', edu: 'کارشناسی ارشد حقوق خصوصی', photo: null },
]

const PRINCIPLES = [
    { title: 'استقلال', text: 'وکیل باید مستقل از هر فشار و نفوذی بیندیشد و تصمیم بگیرد. استقلال ما شرط اول دفاع مؤثر از موکل است.' },
    { title: 'امانت‌داری', text: 'اسناد، اسرار و اعتماد موکل امانتی است که با دقت و رازداری حفظ می‌شود.' },
    { title: 'صداقت با موکل', text: 'تصویر واقعی پرونده، با نقاط قوت و ضعف، همیشه پیش از هر تصمیمی با موکل در میان گذاشته می‌شود.' },
    { title: 'احترام به قانون و دادگاه', text: 'دفاع قدرتمند و رفتار محترمانه با هم تعارضی ندارند؛ دفاع ما همیشه در چارچوب قانون است.' },
    { title: 'تخصص و یادگیری مداوم', text: 'قوانین و رویه‌ها تغییر می‌کنند و تیم ما به‌طور مستمر دانش خود را به‌روز نگه می‌دارد.' },
]

const REASONS = [
    { title: 'تخصص در چند حوزه', text: 'از خانواده تا تجارت، هر پرونده به متخصص همان حوزه سپرده می‌شود.', icon: <path d='M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zm14 0l-3 7a3.5 3.5 0 0 0 6 0l-3-7z' /> },
    { title: 'پاسخگویی سریع', text: 'پاسخ به تماس‌ها و پیام‌ها در کوتاه‌ترین زمان ممکن.', icon: <><circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' /></> },
    { title: 'شفافیت در هزینه', text: 'حق‌الوکاله و مراحل کار از همان ابتدا روشن و مکتوب است.', icon: <path d='M6 3h9l4 4v14H6V3zm3 8h7M9 15h7' /> },
    { title: 'رویکرد صلح‌محور', text: 'در صورت امکان، راه توافق را پیش از دعوای طولانی امتحان می‌کنیم.', icon: <><circle cx='9' cy='8' r='3' /><path d='M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6' /><circle cx='17' cy='9' r='2.5' /><path d='M17 14c2.5 0 4 1.8 4 4' /></> },
    { title: 'گزارش‌دهی منظم', text: 'موکل همیشه از آخرین وضعیت پرونده خود مطلع است.', icon: <path d='M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z' /> },
    { title: 'محرمانگی کامل', text: 'اطلاعات موکل با بالاترین سطح رازداری نگهداری می‌شود.', icon: <><rect x='5' y='11' width='14' height='9' rx='2' /><path d='M8 11V8a4 4 0 0 1 8 0v3' /></> },
]

const CASES = [
    { tag: 'دعاوی اداری و مالیاتی', title: 'اعتراض به برگ تشخیص مالیات', result: 'کاهش جریمه', stat: { v: '۷۰٪', u: 'کاهش جریمه' }, text: 'لایحهٔ اعتراض در مهلت قانونی و دفاع در هیئت حل اختلاف.' },
    { tag: 'حقوق خانواده', title: 'توافق در پرونده مهریه و حضانت', result: 'صلح و سازش', text: 'مذاکرهٔ حضوری با حضور وکلا و ثبت توافق‌نامه در دادگاه.' },
    { tag: 'املاک و ثبت اسناد', title: 'رفع تصرف ملک تجاری', result: 'رفع تصرف', text: 'اثبات مالکیت با اسناد رسمی و پیگیری سریع اجرای حکم.' },
]

const REVIEWS = [
    { text: 'از همان جلسهٔ اول مسیر پرونده برایم روشن شد. صداقت و پیگیری تیم واقعاً ستودنی بود.', name: 'م. ر.', kind: 'موکل پرونده حقوق خانواده' },
    { text: 'به‌جای وعده‌های بزرگ، تصویر واقعی پرونده را گفتند. همین باعث اعتمادم شد.', name: 'ع. ک.', kind: 'موکل پرونده ملکی' },
    { text: 'شرکت ما در یک اختلاف پیچیده گیر کرده بود و با راهکار غیرقضایی همه چیز حل شد.', name: 'ش. ن.', kind: 'موکل پرونده تجاری' },
]

const STATS = [
    { to: 15, suffix: '+', label: 'سال تجربهٔ حرفه‌ای' },
    { to: 500, suffix: '+', label: 'پرونده به نتیجه رسیده' },
    { to: 12, suffix: '', label: 'وکیل و مشاور متخصص' },
    { to: 6, suffix: '', label: 'حوزهٔ تخصصی' },
]

const CHIPS = [
    { t: 'حقوق خانواده', s: { top: '6%', right: '2%', '--fd': '0s' } },
    { t: 'دعاوی کیفری', s: { top: '32%', left: '-3%', '--fd': '-2s' } },
    { t: 'حقوق تجارت', s: { bottom: '24%', right: '-4%', '--fd': '-4s' } },
    { t: 'املاک و ثبت', s: { bottom: '3%', left: '8%', '--fd': '-1s' } },
]

const HERO_ICON = <path d='M12 3v18M6 21h12M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zm14 0l-3 7a3.5 3.5 0 0 0 6 0l-3-7z' />

export default function UserAboutUs() {
    return (
        <MainUserLayout>
            <div className='ab' dir='rtl'>
                <UserHeroBannerTertiary
                    crumb={[{ label: 'خانه', href: '/' }, { label: 'درباره ما' }]}
                    badge='وکالت با تخصص، صداقت و امانت‌داری'
                    title={<>گروه حقوقی <em>غدیری</em></>}
                    description='این یک متن نمونه است. معرفی کوتاهی از دفتر، سابقه، و اینکه چه کسانی هستید و برای چه ارزش‌هایی کار می‌کنید.'
                    primaryAction={{ label: 'با ما تماس بگیرید', href: '/contact-us' }}
                    secondaryAction={{ label: 'آشنایی با تیم', href: '#team' }}
                    keywords={['حق', 'امانت', 'تخصص']}
                    chips={CHIPS}
                    stats={STATS}
                    icon={HERO_ICON}
                />

                <UserPolicyContainer
                    title='خط مشی گروه حقوقی غدیری'
                    subtitle='این یک متن نمونه است. روی هر مورد کلیک کن تا جزئیاتش را ببینی.'
                    policies={POLICIES}
                />

                <UserPledgeContainer
                    title='تعهدات اخلاقی ما'
                    subtitle='این یک متن نمونه است. چارچوبی که هر عضو تیم به آن پایبند است.'
                    pledges={ETHICS}
                    quote='وکالت، امانتی است که با رازداری و صداقت حفظ می‌شود.'
                />

                <div className='main-user-layout'>
                    <section id='team' className='ab-bare'>
                        <SectionTitle title='آشنایی با همکاران ما' subtitle='این یک متن نمونه است. متخصصانی که پرونده شما را به عهده می‌گیرند.' />
                        <div className='ab-grid ab-grid--4'>
                            {TEAM.map((m, i) => (
                                <UserEmployeeCardPrimary employee={m} i={i} key={m.name} />
                            ))}
                        </div>
                    </section>
                </div>

                <StaticDescriptionTextContainerSecondary
                    containerTitle='اصولی که وکالت را معنا می‌دهد'
                    containerSubTitle='این یک متن نمونه است.'
                    contents={PRINCIPLES}
                />

                <DetailCardContainerPrimary
                    details={REASONS}
                    title='چرا گروه حقوقی غدیری؟'
                    subtitle='این یک متن نمونه است. دلایلی که موکلان ما را انتخاب می‌کنند.'
                />

                <div className='main-user-layout'>
                    <section className='ab-bare'>
                        <SectionTitle
                            title='گزیده‌ای از پرونده‌های موفق'
                            subtitle='اطلاعات موکلان محرمانه است و فقط نوع دعوا و روش حل نمایش داده می‌شود.'
                        />
                        <div className='ab-grid ab-grid--3'>
                            {CASES.map((c, i) => (
                                <UserCaseCard content={c} i={i} key={c.title} />
                            ))}
                        </div>
                        <Reveal className='text-center mt-4'>
                            <Link href='#' className='ab-btn'>مشاهده همهٔ پرونده‌ها <span aria-hidden>←</span></Link>
                        </Reveal>
                    </section>
                </div>

                <UserReviewContainer
                    title='آنچه موکلان ما می‌گویند'
                    subtitle='این یک متن نمونه است.'
                    reviews={REVIEWS}
                />
            </div>
        </MainUserLayout>
    )
}