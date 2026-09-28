import React from 'react'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'

const departments = [
  {
    title: 'حقوق خانواده',
    text: 'این یک متن نمونه است. توضیح کوتاه دربارهٔ خدمات این دپارتمان.',
    icon: <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />,
  },
  {
    title: 'دعاوی کیفری',
    text: 'این یک متن نمونه است. توضیح کوتاه دربارهٔ خدمات این دپارتمان.',
    icon: <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />,
  },
  {
    title: 'املاک و ثبت اسناد',
    text: 'این یک متن نمونه است. توضیح کوتاه دربارهٔ خدمات این دپارتمان.',
    icon: <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z" />,
  },
  {
    title: 'حقوق تجارت و شرکت‌ها',
    text: 'این یک متن نمونه است. توضیح کوتاه دربارهٔ خدمات این دپارتمان.',
    icon: <path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm5-3h6v3H9V5z" />,
  },
  {
    title: 'قراردادها',
    text: 'این یک متن نمونه است. توضیح کوتاه دربارهٔ خدمات این دپارتمان.',
    icon: <path d="M6 3h9l4 4v14H6V3zm3 8h7M9 15h7" />,
  },
  {
    title: 'دعاوی اداری و مالیاتی',
    text: 'این یک متن نمونه است. توضیح کوتاه دربارهٔ خدمات این دپارتمان.',
    icon: <path d="M12 3v18M5 7h14M5 7l-2 6a3 3 0 0 0 4 0L5 7zm14 0l-2 6a3 3 0 0 0 4 0l-2-6z" />,
  },
]

export default function UserHomeDepartments() {
  return (
    <div className='my-5 main-user-layout'>
      <div className='text-center mb-5'>
        <div className='fw-bold fs-2 mb-3'>حوزه‌های تخصصی ما</div>
        <div className='fs-6 mx-auto dept-sub'>
          این یک متن نمونه است. این یک متن نمونه است. این یک متن نمونه است.
        </div>
      </div>

      <Row className='g-4'>
        {departments.map((d) => (
          <Col key={d.title} md={6} lg={4}>
            <div className='dept-card glass-gold radius-md hover-to-background-navy bg-bone border border-1 p-4 h-100'>
              <span className='dept-blob' />

              <div className='dept-icon glass-gold border border-1 mb-3'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round'>
                  {d.icon}
                </svg>
              </div>

              <div className='fw-bold fs-5 mb-2'>{d.title}</div>
              <div className='fs-6 mb-3 dept-text'>{d.text}</div>

              <Link href='#' className='dept-more text-decoration-none'>
                بیشتر بدانید <span aria-hidden>←</span>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}