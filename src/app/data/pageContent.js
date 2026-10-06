export const PAGE_META = [
    { slug: 'colleagues', label: 'همکاران', path: '/colleagues' },
    { slug: 'blogs', label: 'بلاگ حقوقی', path: '/blogs' },
    { slug: 'departments', label: 'دپارتمان‌ها', path: '/departments' },
    { slug: 'faqs', label: 'سوالات متداول', path: '/faqs' },
    { slug: 'contact', label: 'تماس با ما', path: '/contact-us' },
    { slug: 'services', label: 'همهٔ خدمات', path: '/services' },
    { slug: 'family', label: 'حقوق خانواده', path: '/services/family' },
    { slug: 'criminal', label: 'دعاوی کیفری', path: '/services/criminal-cases' },
    { slug: 'business', label: 'تجارت و شرکت‌ها', path: '/services/commercial-and-corporate' },
    { slug: 'real-estate', label: 'املاک و ثبت اسناد', path: '/services/real-estate' },
    { slug: 'contracts', label: 'قراردادها و مشاوره', path: '/services/contracts' },
    { slug: 'tax', label: 'دعاوی اداری و مالیاتی', path: '/services/administrative-and-tax' },
]

export const PAGE_BY_SLUG = Object.fromEntries(PAGE_META.map((page) => [page.slug, page]))
