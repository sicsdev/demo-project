'use client'
import BasicDetailsReadOnly from '@/app/components/Forms/ReadOnly/BasicDetails'
import React, { useEffect, useState } from 'react'

import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import BasicDetails from '@/app/components/Forms/BasicDetails';
import { useSelector } from 'react-redux';
import { state_data } from '@/app/components/Forms/data/FormData';
import EmailAgentSetting from '@/app/components/EmailAgentSetting/EmailAgentSetting';
import EmailConfig from '@/app/components/EmailConfig/EmailConfig';
import Button from '@/app/components/Common/Button/Button';
const Page = () => {
    const parseAddress = (address) => {
        let returned = {};
        const splitAddr = address.split(",");
        returned.zipcode = splitAddr[splitAddr.length - 1];
        returned.country = splitAddr[splitAddr.length - 2];
        returned.state = splitAddr[splitAddr.length - 3];
        returned.city = splitAddr[splitAddr.length - 4];
        let addr_line = splitAddr.splice(0, splitAddr.length - 3).concat(", ");
        if (addr_line.length > 0) {
            returned.addrline = addr_line.toString().replace(/[^\w\s]/gi, "");
        }
        // returned.addrline = returned.addrline
        return returned;
    };
    const state = useSelector(state => state.user)
    const [isEdit, setIsEdit] = useState(true)
    const [basicFormData, setBasicFormData] = useState(null)
    useEffect(() => {
        if (state.data) {
            let address = parseAddress(state?.data?.enterprise?.address)
            setBasicFormData({
                "business_name": state?.data?.enterprise?.name,
                "country": "US",
                "business_address": state?.data?.enterprise?.address,
                "business_industry": state?.data?.enterprise?.industry,
                "business_company_size": state?.data?.enterprise?.company_size,
                "ecommerce_platform": state?.data?.enterprise?.ecommerce_platform,
                business_street: address.addrline,
                business_city: address.city,
                business_state: returnStateName(address.state),
                business_zipcode: address.zipcode,

            })
        }
    }, [state.data])
    const returnStateName = (state) => {
        const find_state = state_data.find((x) => x.abbreviation === state.trim())
        if (find_state) {
            return find_state.name
        }
        return ""
    }
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
            <div className="border-b border-primary dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a href="#" className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                            <WrenchScrewdriverIcon className="h-6 w-6 text-gray-500" /> Settings
                        </a>
                    </li>
                </ul>
            </div>
            {isEdit == true ?
                <>
                    <BasicDetailsReadOnly state={basicFormData} />
                </> :
                <>
                    <EmailAgentSetting form={false} basicFormData={basicFormData} setBasicFormData={setBasicFormData} setIsEdit={setIsEdit} />
                    <EmailConfig form={false} basicFormData={basicFormData} setBasicFormData={setBasicFormData} setIsEdit={setIsEdit} />
                    <div className='my-3'>
                        <BasicDetails form={false} basicFormData={basicFormData} setBasicFormData={setBasicFormData} setIsEdit={setIsEdit} />
                    </div>
                    {/* <div className={`flex p-2 rounded-b mt-5 justify-between`}>


                        <>
                            <Button type={"button"}
                                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"

                            >
                                Submit

                            </Button>

                        </>
                    </div> */}
                </>
            }
        </div>
    )
}

export default Page