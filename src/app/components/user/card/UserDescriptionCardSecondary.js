import React from 'react'
import { Col, Row } from 'react-bootstrap'
import aboutUsImg from '../../../assets/images/home/aboutUs.png'
import Image from 'next/image'

export default function UserDescriptionCardSecondary(props) {

    const { title, descriptions, aboutUsImg, imgWidth, imgHeight, imgAlt } = props;

    return (
        <div className='my-5 main-user-layout'>
            <Row className='d-flex align-items-center glass-gold p-3 radius-md hover-to-background-navy py-5 justify-content-between bg-bone border border-1'>
                <Col md={6}>
                    <div className='fw-bold fs-2 mb-4'>{title}</div>
                    {descriptions?.length > 0 &&
                        descriptions?.map((item, i) =>
                            <div key={i}>
                                <div className='fs-6'>{item?.description}</div>
                                <br />
                            </div>
                        )
                    }
                </Col>
                <Col md={4}>
                    <Image
                        src={aboutUsImg}
                        width={imgWidth}
                        height={imgHeight}
                        alt={imgAlt}
                        className='radius-md w-100'
                    />
                </Col>
            </Row>
        </div>
    )
}
