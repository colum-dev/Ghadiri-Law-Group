'use client'
import React,{useEffect,useState} from 'react'
import {api,ApiError} from '@/app/utilities/api'
import {useAdminAuth} from '@/app/layouts/admin/admin/AdminAuthContext'
import ListEditor,{FieldInput} from '@/app/components/admin/ListEditor'
import {ICON_OPTIONS} from '@/app/data/icons'
const T=(key,label,type='text',extra={})=>({key,label,type,...extra}); const iconField=T('icon','آیکون','select',{options:ICON_OPTIONS})
const S={
 departments:{label:'دپارتمان‌ها',path:'departments',fields:[T('title','عنوان'),T('subtitle','توضیحات','textarea'),T('buttonText','متن دکمه'),T('buttonLink','لینک دکمه')],lists:[{key:'items',label:'دپارتمان‌ها',newItem:{title:'',text:'',icon:'family'},fields:[T('title','نام دپارتمان'),T('text','توضیح','textarea'),iconField}]},
 bestCases:{label:'پرونده‌های برتر',path:'bestCases',fields:[T('title','عنوان'),T('subtitle','توضیحات','textarea'),T('buttonText','متن دکمه'),T('buttonLink','لینک دکمه')],lists:[{key:'items',label:'پرونده‌ها',newItem:{tag:'',title:'',result:'',statValue:'',statUnit:'',text:''},fields:[T('tag','برچسب'),T('title','عنوان'),T('result','نتیجه'),T('text','توضیح','textarea'),T('statValue','عدد آمار'),T('statUnit','واحد آمار')}]},
 cases:{label:'خلاصه پرونده‌ها',path:'cases',fields:[T('title','عنوان'),T('subtitle','توضیحات','textarea')],lists:[{key:'items',label:'پرونده‌ها',newItem:{type:'cover',tag:'',title:'',result:'',summary:'',steps:[],icon:'family',pattern:'dots',size:'m',inv:false},fields:[T('type','نوع کارت','select',{options:[{value:'cover',label:'کاور'},{value:'quote',label:'نقل‌قول'},{value:'stat',label:'آمار'}]}),T('tag','برچسب'),T('title','عنوان'),T('result','نتیجه'),T('summary','شرح','textarea'),T('quote','نقل‌قول','textarea'),T('statValue','عدد آمار'),T('statUnit','واحد'),T('steps','مراحل','lines'),iconField]}]},
 coworkers:{label:'همکاران',path:'coworkers',fields:[T('title','عنوان'),T('subtitle','توضیحات','textarea')],lists:[{key:'team',label:'اعضای تیم',newItem:{name:'',field:'',edu:'',photo:null},fields:[T('name','نام'),T('field','حوزه'),T('edu','تحصیلات'),T('photo','عکس','image')]}]},
 principles:{label:'اصول',path:'coworkers',fields:[T('principlesTitle','عنوان بخش'),T('principlesSubtitle','زیرعنوان بخش')],lists:[{key:'principles',label:'اصول',newItem:{title:'',text:''},fields:[T('title','عنوان'),T('text','متن','textarea')]}]},
 reasons:{label:'چرا ما',path:'coworkers',fields:[T('reasonsTitle','عنوان بخش'),T('reasonsSubtitle','توضیحات بخش','textarea')],lists:[{key:'reasons',label:'دلایل انتخاب ما',newItem:{title:'',text:'',icon:'scale'},fields:[T('title','عنوان'),T('text','متن','textarea'),iconField]}]},
 contact:{label:'تماس با ما',path:'contact',fields:[T('status','وضعیت'),T('title','عنوان'),T('subtitle','توضیحات','textarea'),T('marqueeWords','کلمات متحرک','lines')],lists:[]},
 blogs:{label:'وبلاگ‌ها',path:'blogs',fields:[T('title','عنوان'),T('subtitle','توضیحات','textarea')],lists:[]},
}
const readPath=(obj,path)=>path.split('.').reduce((v,k)=>v?.[k],obj)||{}
export default function AdminHomeSections({initialSection}){const {expire}=useAdminAuth();const [content,setContent]=useState(null);const [error,setError]=useState('');const [notice,setNotice]=useState('');const [saving,setSaving]=useState(false);const active=initialSection||'departments';const section=S[active]||S.departments;const data=content?readPath(content,section.path):{}
 useEffect(()=>{api('/api/admin/home').then(setContent).catch(e=>{if(e instanceof ApiError&&e.status===401)return expire();setError(e.message)})},[expire])
 const update=(key,value)=>setContent(c=>({...c,[section.path]:{...readPath(c,section.path),[key]:value}}))
 const submit=async e=>{e.preventDefault();setSaving(true);setError('');setNotice('');try{setContent(await api('/api/admin/home',{method:'PUT',body:content}));setNotice('تغییرات ذخیره شد.')}catch(e){if(e instanceof ApiError&&e.status===401)return expire();setError(e.message)}finally{setSaving(false)}}
 if(!content)return <div className='p-4'>{error||'در حال بارگذاری…'}</div>
 return <form onSubmit={submit} className='p-4' dir='rtl'><h1>تغییر محتوای {section.label}</h1>{section.fields.map(f=><label key={f.key} className='d-block mb-3'><span className='d-block mb-1'>{f.label}</span><FieldInput field={f} value={data[f.key]} onChange={v=>update(f.key,v)}/></label>)}{section.lists.map(l=><ListEditor key={l.key} {...l} items={data[l.key]||[]} onChange={v=>update(l.key,v)}/>)}{error&&<div className='alert alert-danger'>{error}</div>}{notice&&<div className='alert alert-success'>{notice}</div>}<button type='submit' className='btn btn-success' disabled={saving}>{saving?'در حال ذخیره…':'ذخیره تغییرات'}</button></form>}
