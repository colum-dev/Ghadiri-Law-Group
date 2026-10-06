'use client'
import React from 'react'
import AdminHomeHero from './AdminHomeHero'
import AdminHomeSections from './AdminHomeSections'

export default function AdminHomeContent() {
    return (
        <div>
            <AdminHomeHero />
            <hr className='my-5' />
            <AdminHomeSections initialSection='departments' />
        </div>
    )
}
