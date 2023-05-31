'use client'
import React from 'react'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import BasicDetails from '@/app/components/Forms/ReadOnly/BasicDetails';
const Page = () => {
    return (
        <>
            <div className="border-b border-border dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a href="#" className=" flex justify-start gap-2 items-center p-4 text-heading font-bold border-b-2 border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                            <WrenchScrewdriverIcon className="h-6 w-6 text-gray-500" /> Setting
                        </a>
                    </li>
                </ul>
            </div>
            <p className='float-right my-5 cursor-pointer'>Edit</p>
            <BasicDetails />
        </>
    )
}

export default Page