import Image from 'next/image'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import logoImg from '../../../../assets/images/brand/logo_500_500.png';

export default function UserDesktopHeader() {
    return (
        <Row className='py-4 justify-content-center align-items-between'>
            <Col md={3}>
                <Image
                    src={logoImg}
                    width={50}
                    height={50}
                    alt="logo"
                />
            </Col>
            <Col md={6} className='gap-3 d-flex justify-content-between'>
                <div className='d-flex align-items-center glass-gold-hover cursor-pointer fw-bold pb-1 pt-2'>F Item 1</div>
                <div className='d-flex align-items-center glass-gold-hover cursor-pointer fw-bold pb-1 pt-2'>F Item 2</div>
                <div className='d-flex align-items-center glass-gold-hover cursor-pointer fw-bold pb-1 pt-2'>F Item 3</div>
                <div className='d-flex align-items-center glass-gold-hover cursor-pointer fw-bold pb-1 pt-2'>F Item 4</div>
                <div className='d-flex align-items-center glass-gold-hover cursor-pointer fw-bold pb-1 pt-2'>F Item 5</div>
            </Col>
            <Col md={3} className='d-flex align-items-center justify-content-end'>
                <div className='d-flex'>
                    <div className='bg-navy color-white pb-1 pt-2 px-3 rounded-pill glass-hover-effect cursor-pointer  hover-to-background-gold fw-bold shadow'>
                        Call Us
                    </div>
                </div>
            </Col>
        </Row>
    )
}
