'use client'
import React from 'react'
import { UsersIcon } from '@heroicons/react/24/outline';
import QuickStart from '@/app/components/Dashboard/QuickStart';

const Page = () => {

    return (
        <div>
            <div className="border-b border-primary dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <span
                            className={`flex justify-start text-xs sm:text-sm gap-2 cursor-pointer items-center py-2  "border-b-2 text-primary border-primary  font-bold  rounded-t-lg active  group`}
                            aria-current="page"
                        >
                            <UsersIcon className="h-5 w-5 text-primary" /> Home
                        </span>
                    </li>

                </ul>
            </div>
            <QuickStart />
        </div>
    );
}

export default Page