import { API_URL } from './api'
export const mediaUrl=p=>!p?'':/^https?:\/\//i.test(p)?p:`${API_URL}${p}`
const FA_DATE=new Intl.DateTimeFormat('fa-IR-u-ca-persian',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Tehran'})
export function formatFaDate(iso){if(!iso)return '';const d=new Date(iso);return Number.isNaN(d.getTime())?'':FA_DATE.format(d)}
export const toFaDigits=v=>String(v??'').replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d])
export function toCardArticle(p,i=99){return {slug:p.slug,cat:p.category,title:p.title,excerpt:p.excerpt,date:formatFaDate(p.publishedAt),read:toFaDigits(p.readingMinutes||1),size:['tall','wide','wide'][i]||'small',author:p.author||undefined,cover:mediaUrl(p.coverImage?.path)}}
