'use client'
import Intake from '@/app/components/Form/Intake';
import React, { useState } from 'react'
import { QrCodeIcon  } from '@heroicons/react/24/outline';
import Embed from '@/app/components/Embed/Embed';
const Page = () => {
    return (
        <>
        <div className="border-b border-border dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a href="#" className=" flex justify-start gap-2 items-center p-4 text-heading font-bold border-b-2 border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                            <QrCodeIcon className="h-6 w-6 text-gray-500" /> Install Widget
                        </a>
                    </li>

                </ul>
                
            </div>
            <Embed />
           <Intake />
        </>
    );
}

export default Page