'use client'

import TopBar from '@/app/components/Common/Card/TopBar'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

const page = () => {
    return (
        <div>
            <TopBar
                loading={false}
                title={` Customer details`}
                icon={<UserCircleIcon className="h-5 w-5 text-primary" />}
                isBackButton={false}
                backButtonUrl={`/dashboard`}
            />

        </div>
    )
}

export default page