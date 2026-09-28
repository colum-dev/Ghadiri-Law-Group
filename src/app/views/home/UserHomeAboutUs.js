import React from 'react'
import { Col, Row } from 'react-bootstrap'
import aboutUsImg from '../../assets/images/home/aboutUs.png'
import Image from 'next/image'

export default function UserHomeAboutUs() {
  return (
    <div className='my-5 main-user-layout'>
      <Row className='d-flex align-items-center glass-gold p-3 radius-md hover-to-background-navy py-5 justify-content-between bg-bone border border-1'>
        <Col md={6}>
          <div className='fw-bold fs-2 mb-4'>این یک تایتل نمونه است</div>
          <div className='fs-6'>این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل  </div>
          <br />
          <div className='fs-6'>این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است این یک تایتل نمونه است  </div>

        </Col>
        <Col md={4}>
          <Image
            src={aboutUsImg}
            // width={500}
            height={350}
            alt="logo"
            className='radius-md w-100'
          />
        </Col>
      </Row>
    </div>
  )
}
