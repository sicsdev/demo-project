"use client"
import React from 'react'
import HealthCare from '@/app/components/Industry-Experts/HealthCare'
const page = () => {
    const defaultLoaderTime = 1000;
    return (
        <>
            <HealthCare defaultLoaderTime={defaultLoaderTime} />
        </>
    )
}

export default page