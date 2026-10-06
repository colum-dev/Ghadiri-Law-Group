'use client'
import React,{useEffect} from 'react'
import Link from 'next/link'
import {usePathname,useRouter} from 'next/navigation'
import '../../../assets/styles/layouts/admin/Admin.scss'
import {AdminAuthProvider,useAdminAuth} from './AdminAuthContext'
import '../../../assets/styles/common/Common.scss'

const PAGE_ITEMS=[
 {t:'صفحه اصلی',href:'/admin/home-hero',children:[
  {t:'بنر',href:'/admin/home-hero'},
  {t:'بنرهای داخلی',href:'/admin/banners'},
  {t:'دپارتمان‌ها',href:'/admin/home/departments'},
  {t:'پرونده‌های برتر',href:'/admin/home/best-cases'},
  {t:'خلاصه پرونده‌ها',href:'/admin/home/cases'},
  {t:'همکاران',href:'/admin/home/coworkers'},
  {t:'اصول',href:'/admin/home/principles'},
  {t:'چرا ما',href:'/admin/home/reasons'},
  {t:'تماس با ما',href:'/admin/home/contact'},
 ]},
 {t:'درباره ما',href:'/admin/about-us'},
 {t:'همکاران',href:'/admin/colleagues'},
 {t:'دپارتمان‌ها',href:'/admin/departments'},
 {t:'تماس با ما',href:'/admin/contact-us'},
 {t:'سؤالات متداول',href:'/admin/faqs'},
 {t:'بلاگ حقوقی',href:'/admin/pages/blogs'},
 {t:'همهٔ خدمات',href:'/admin/pages/services'},
 {t:'خدمات جزئی',href:'/admin/pages/family'},
]
function Shell({children}){
 const {status,username,logout}=useAdminAuth();const pathname=usePathname();const router=useRouter();const isLogin=pathname==='/admin/login'
 useEffect(()=>{if(status==='out'&&!isLogin)router.replace('/admin/login');if(status==='in'&&isLogin)router.replace('/admin')},[status,isLogin,router])
 if(status==='loading'||(status==='out'&&!isLogin)||(status==='in'&&isLogin))return <div className='adm adm-center' dir='rtl'><span className='spinner-border' role='status' aria-label='در حال بارگذاری'/></div>
 if(isLogin)return <div className='adm adm-center' dir='rtl'>{children}</div>
 return <div className='adm yekan-bakh-bold' dir='rtl'><aside className='adm-side'><div className='adm-brand'>پنل مدیریت</div><nav aria-label='منوی مدیریت' className='adm-nav'><div className='adm-nav-group'><div className='adm-nav-title'>ویرایش محتوای وبسایت</div>{PAGE_ITEMS.map(item=><React.Fragment key={item.href}><Link href={item.href} className={`adm-link adm-sub-link${item.href==='/admin/home-hero'?pathname.startsWith('/admin/home')||pathname.startsWith('/admin/banners')?' is-active':'':pathname.startsWith(item.href)?' is-active':''}`}>{item.t}</Link>{item.children&&<div className='adm-tree-children'>{item.children.filter(child=>child.href!==item.href).map(child=><Link key={child.href} href={child.href} className={`adm-link adm-sub-link${pathname.startsWith(child.href)?' is-active':''}`}>{child.t}</Link>)}</div>}</React.Fragment>)}</div></nav><div className='adm-side-foot'><Link href='/' target='_blank' className='adm-link'>مشاهدهٔ سایت</Link><div className='adm-user'>{username}</div><button type='button' className='btn btn-outline-light btn-sm' onClick={logout}>خروج</button></div></aside><main className='adm-main'>{children}</main></div>
}
export default function AdminShell({children}){return <AdminAuthProvider><Shell>{children}</Shell></AdminAuthProvider>}
