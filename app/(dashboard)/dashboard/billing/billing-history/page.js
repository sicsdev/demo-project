'use client'
import React from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';


const PaymentMethod = () => {
    return (
        <>
        <div>
            <div className="border-b border-primary dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a href="#" className=" flex justify-start gap-2 items-center py-2 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group" aria-current="page">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-500" /> Billing history
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <p className='mt-4 text-sm text-[#9CA3AF]'>Showinf invoices within the past 12 months</p>
            <p className='mt-4 text-sm '>No invoices found</p>

        </div>
        </>
    )
}

export default PaymentMethod