'use client'
import TopBar from '@/app/components/Common/Card/TopBar'
import PhoneHandle from '@/app/components/Customize/PhoneHandle'
import { DevicePhoneMobileIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {

    return (
        <div>
            <TopBar title={`Phone`} icon={<DevicePhoneMobileIcon className="h-5 w-5 text-primary" />} isBackButton={true} backButtonUrl={`/dashboard`} />
            <PhoneHandle />
        </div>
    )
}

export default Page