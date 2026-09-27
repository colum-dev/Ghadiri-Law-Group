import React from 'react'
import heroBannerImg from '../../assets/images/home/herobanner1.png'
import '../../assets/styles/views/user/home/Home.scss';
import { Col, Row } from 'react-bootstrap';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ScienceIcon from '@mui/icons-material/Science';

export default function UserHome() {
    return (
        <Row
            className='home-hero-banner-1 d-flex justify-content-between align-items-center py-5'
            style={{ backgroundImage: `url(${heroBannerImg.src})` }}>
            <Col md={5}>
                <div className='fs-1 mb-5 text-shadow'>
                    این یک<br />تایتل نمونه و<br /><span className='color-gold'>اتفاقی</span> است.
                </div>
                <div className='fs-6 mb-4'>
                    این یک متن نمونه است.
                    این یک متن نمونه است.
                    این یک متن نمونه است.
                    این یک متن نمونه است.
                    این یک متن نمونه است.
                    این یک متن نمونه است.
                    این یک متن نمونه است.
                    این یک متن نمونه است.
                </div>
                <div className='d-flex mb-5'>
                    <div className='bg-gold color-white pb-1 pt-2 px-3 rounded-pill glass-hover-effect cursor-pointer  hover-to-background-gold fw-bold shadow fs-5'>
                        بیشتر بدانید
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-center pt-3'>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <ThumbUpIcon className=''/>
                        <span className='fs-6 text-center mt-2'>نرخ موفقیت بالای 94 درصدی</span>
                    </div>
                    <div className="vr mx-2"></div>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <Diversity1Icon className=''/>
                        <span className='fs-6 text-center mt-2'>بیش از 22 افتخار همکاری</span>
                    </div>
                    <div className="vr mx-2"></div>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <ScienceIcon className=''/>
                        <span className='fs-6 text-center mt-2'>بیش از 5 سال سابقه</span>
                    </div>
                </div>
            </Col>
            <Col md={4}>
                section 2
            </Col>
        </Row>
    )
}
