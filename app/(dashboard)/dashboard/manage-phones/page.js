'use client'
import PhoneHandle from '@/app/components/Customize/PhoneHandle'
import { PhoneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {

    return (
        <div>
            <div className="border-b border-primary ">
                <div className="flex items-center justify-between">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
                        <li className="mr-2">
                            <span
                                className=" flex justify-start gap-2 cursor-pointer items-center  py-2 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group"
                                aria-current="page"
                            >
                                <PhoneIcon className="h-5 w-5 text-gray-500" />{" "}
                                Phone
                            </span>
                        </li>
                    </ul>
                    <p className="text-sm">
                        <Link href="/dashboard">back</Link>
                    </p>
                </div>
            </div>
            <PhoneHandle />
        </div>
    )
}

export default Page