const FA = '۰۱۲۳۴۵۶۷۸۹'
export const toFa = (value) => String(value ?? '').replace(/\d/g, (d) => FA[d])
export const faIndex = (i) => toFa(String(i + 1).padStart(2, '0'))
