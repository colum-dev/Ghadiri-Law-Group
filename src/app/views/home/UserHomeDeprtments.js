import UserDetailCardSecondary from '@/app/components/user/card/UserDetailCardSecondary'
import SectionTitle from '@/app/components/user/title/SectionTitle'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'

const icons = [
  <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />,
  <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />,
  <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z" />,
  <path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm5-3h6v3H9V5z" />,
  <path d="M6 3h9l4 4v14H6V3zm3 8h7M9 15h7" />,
  <path d="M12 3v18M5 7h14M5 7l-2 6a3 3 0 0 0 4 0L5 7zm14 0l-2 6a3 3 0 0 0 4 0l-2-6z" />,
]

export default function UserHomeDepartments({ content }) {
  const data = content || {}
  const departments = (data.items || []).map((item, index) => ({ ...item, icon: icons[index % icons.length] }))
  return (
    <div className='my-5 main-user-layout'>
      <SectionTitle title={data.title || 'دپارتمان ها'} subtitle={data.subtitle || ''} />
      <Row className='g-4'>{departments.map((d, i) => <UserDetailCardSecondary detail={d} key={i} />)}</Row>
      <div className='d-flex justify-content-center mt-5'><Link href='/departments' className='bg-gold color-white pb-1 pt-2 px-4 rounded-pill glass-hover-effect cursor-pointer hover-to-background-navy fw-bold shadow text-decoration-none'>مشاهده بیشتر <span aria-hidden>←</span></Link></div>
    </div>
  )
}
