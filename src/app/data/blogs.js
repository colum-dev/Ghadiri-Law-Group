export const CATEGORIES = [
    { key: 'all', t: 'همه' },
    { key: 'family', t: 'خانواده' },
    { key: 'criminal', t: 'کیفری' },
    { key: 'business', t: 'تجارت' },
    { key: 'real-estate', t: 'املاک' },
    { key: 'contracts', t: 'قراردادها' },
    { key: 'tax', t: 'اداری و مالیاتی' },
]

export const ARTICLES = [
    {
        slug: 'divorce-agreement-steps', cat: 'family', title: 'طلاق توافقی چگونه و در چه مدتی انجام می‌شود؟',
        excerpt: 'مراحل، مدارک لازم و نکاتی که پیش از مراجعه به دادگاه خانواده باید بدانید.', date: '۱۴۰۴/۰۴/۱۲', read: '۶', size: 'tall',
        author: 'سارا احمدی',
    },
    {
        slug: 'checking-property-deed', cat: 'real-estate', title: 'پیش از پرداخت بیعانه، سند را این‌طور استعلام بگیرید',
        excerpt: 'پنج نکتهٔ ساده که از خیلی از اختلافات ملکی جلوگیری می‌کند.', date: '۱۴۰۴/۰۴/۰۵', read: '۴', size: 'wide',
        author: 'سارا احمدی',
    },
    {
        slug: 'first-hours-arrest', cat: 'criminal', title: 'ساعت‌های اول پس از بازداشت؛ چه بگوییم، چه نگوییم؟',
        excerpt: 'حق سکوت، حق داشتن وکیل و اشتباهاتی که در بازجویی نباید مرتکب شد.', date: '۱۴۰۴/۰۳/۲۸', read: '۵', size: 'wide'
    },
    {
        slug: 'startup-shareholder-agreement', cat: 'business', title: 'چرا استارتاپ‌ها بدون قرارداد سهام شروع نمی‌کنند؟',
        excerpt: 'نگاهی به بندهای کلیدی توافق‌نامهٔ سهام میان بنیان‌گذاران.', date: '۱۴۰۴/۰۳/۲۰', read: '۷', size: 'small'
    },
    {
        slug: 'contract-red-flags', cat: 'contracts', title: 'شش نشانهٔ خطر در یک قرارداد که نباید نادیده بگیرید',
        excerpt: 'از مهلت‌های مبهم تا شرایط فسخ یک‌طرفه.', date: '۱۴۰۴/۰۳/۱۵', read: '۵', size: 'small'
    },
    {
        slug: 'tax-assessment-appeal', cat: 'tax', title: 'اعتراض به برگ تشخیص مالیات؛ از کجا شروع کنیم؟',
        excerpt: 'مهلت قانونی، مدارک لازم و مسیر رسیدگی در هیئت حل اختلاف.', date: '۱۴۰۴/۰۳/۰۸', read: '۶', size: 'small'
    },
    {
        slug: 'child-custody-basics', cat: 'family', title: 'حضانت فرزند بعد از طلاق؛ معیار دادگاه چیست؟',
        excerpt: 'مصلحت کودک، سن فرزند و نحوهٔ تعیین حق ملاقات.', date: '۱۴۰۴/۰۲/۳۰', read: '۵', size: 'small'
    },
    {
        slug: 'tenant-landlord-disputes', cat: 'real-estate', title: 'اختلاف مالک و مستأجر؛ ودیعه چگونه مطالبه می‌شود؟',
        excerpt: 'مسیر قانونی استرداد ودیعه و تخلیهٔ ملک استیجاری.', date: '۱۴۰۴/۰۲/۲۲', read: '۴', size: 'small'
    },
    {
        slug: 'company-types-comparison', cat: 'business', title: 'مسئولیت محدود یا سهامی خاص؛ کدام برای شما مناسب‌تر است؟',
        excerpt: 'مقایسه‌ای کوتاه از تفاوت‌های ساختاری، سرمایه و مسئولیت.', date: '۱۴۰۴/۰۲/۱۴', read: '۶', size: 'small'
    },
]

export const ICONS = {
    family: <path d='M12 21C5 16 3 12 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 12 19 16 12 21z' />,
    criminal: <path d='M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z' />,
    business: <path d='M4 21V9l8-5 8 5v12z M9 21v-6h6v6' />,
    'real-estate': <path d='M3 11l9-8 9 8 M5 10v11h14V10 M10 21v-6h4v6' />,
    contracts: <path d='M4 20l4-1L19 8l-3-3L5 16l-1 4z M14 7l3 3' />,
    tax: <path d='M6 3h9l4 4v14H6V3zm3 8h7M9 15h7' />,
}
