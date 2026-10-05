import UserDetailCardSecondary from '@/app/components/user/card/UserDetailCardSecondary'
import SectionTitle from '@/app/components/user/title/SectionTitle'
import Link from 'next/link'
import { Row } from 'react-bootstrap'
import { iconOf } from '@/app/data/icons'
export default function UserHomeDepartments({ content }) { const data=content||{}; const departments=(data.items||[]).map((item,index)=>({...item,icon:iconOf(item.icon,index)})); return <div className='my-5 main-user-layout'><SectionTitle title={data.title||'دپارتمان ها'} subtitle={data.subtitle||''}/><Row className='g-4'>{departments.map((d,i)=><UserDetailCardSecondary detail={d} key={i}/>)}</Row>{data.buttonText!==''&&<div className='d-flex justify-content-center mt-5'><Link href={data.buttonLink||'/departments'} className='bg-gold color-white pb-1 pt-2 px-4 rounded-pill glass-hover-effect cursor-pointer hover-to-background-navy fw-bold shadow text-decoration-none'>{data.buttonText||'مشاهده بیشتر'} <span aria-hidden>←</span></Link></div>}</div> }
