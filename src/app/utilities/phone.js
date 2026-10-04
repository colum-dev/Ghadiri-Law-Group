const FA = '۰۱۲۳۴۵۶۷۸۹'
const AR = '٠١٢٣٤٥٦٧٨٩'

export const toEnglishDigits = (s = '') =>
    String(s).replace(/[۰-۹٠-٩]/g, (d) => {
        const i = FA.indexOf(d)
        return i > -1 ? i : AR.indexOf(d)
    })

export const normalizePhone = (s = '') => toEnglishDigits(s).replace(/[\s-]/g, '')

export const isValidIranMobile = (s) => /^09\d{9}$/.test(s)