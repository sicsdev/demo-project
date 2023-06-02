'use client'
import BasicDetailsReadOnly from '@/app/components/Forms/ReadOnly/BasicDetails'
import React, { useEffect, useState } from 'react'

import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import BasicDetails from '@/app/components/Forms/BasicDetails';
import { useSelector } from 'react-redux';
const Page = () => {

    const state = useSelector(state => state.user)
    const [isEdit, setIsEdit] = useState(true)
    const [basicFormData, setBasicFormData] = useState(null)
    useEffect(() => {
        if (state.data) {
            setBasicFormData({
                "business_name": state?.data?.enterprise?.name,
                "country": "US",
                "business_address": state?.data?.enterprise?.address,
                "business_industry": state?.data?.enterprise?.industry,
                "business_company_size": state?.data?.enterprise?.company_size,
                "ecommerce_platform": state?.data?.enterprise?.ecommerce_platform
            })
        }
    }, [state.data])
    return (
        <div>
             {isEdit == true ?
                <>
                    <p className='float-right my-5 cursor-pointer' onClick={() => { setIsEdit(false) }}>Edit</p>
                </> :
                <>
                    <p className='float-right my-5 cursor-pointer' onClick={() => { setIsEdit(true) }}>Back</p>
                </>
            }
            <div className="border-b border-border dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a href="#" className=" flex justify-start gap-2 items-center p-4 text-heading font-bold border-b-2 border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                            <CodeBracketSquareIcon className="h-6 w-6 text-gray-500" /> Enterprise
                        </a>
                    </li>

                </ul>

            </div>
            {isEdit == true ?
                <>

                    <BasicDetailsReadOnly state={basicFormData} />
                </> :
                <>
                    <BasicDetails form={false} basicFormData={basicFormData} setBasicFormData={setBasicFormData} setIsEdit={setIsEdit}/>
                </>
            }
        </div>
    )
}

export default Page