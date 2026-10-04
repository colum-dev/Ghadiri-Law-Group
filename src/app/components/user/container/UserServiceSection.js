import React from 'react'
import UserServiceBand from './UserServiceBand'
import UserServiceSteps from './UserServiceSteps'
import UserServiceGrid from './UserServiceGrid'
import UserServiceSplit from './UserServiceSplit'

const VARIANTS = {
    band: UserServiceBand,
    steps: UserServiceSteps,
    grid: UserServiceGrid,
    split: UserServiceSplit,
}

export default function UserServiceSection({ service, index, digits }) {
    const Variant = VARIANTS[service.kind] || UserServiceSplit
    return <Variant service={service} index={index} digits={digits} />
}
