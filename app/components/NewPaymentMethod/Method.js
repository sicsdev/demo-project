import React, { useState } from 'react'
import StripeWrapper from '../Stripe/Wrapper/StripeWrapper'
import { useDispatch } from 'react-redux'
import { editBillingType } from '../store/slices/billingTypeSlice'
import { createEnterpriseAccount } from '@/app/API/pages/EnterpriseService'
import BillingNew from '../Stripe/Billing/NewPayment'
import { CreditCardIcon } from '@heroicons/react/24/outline'

const Method = () => {
    const dispatch = useDispatch()
    const setBillingValueAfterSubmit = async () => {
        dispatch(editBillingType("normal"))
        const response = await createEnterpriseAccount({ billing_type: "normal" })
        console.log(response)
    }
    return (
        <div className='flex justify-center'>
            <div className='w-full mx-5'>
                <StripeWrapper>
                    <span className="px-2 text-xs sm:text-lg mb-4 text-center text-[#007c8f] !font-semibold bg-lowgray py-2 rounded-md flex gap-2 justify-center items-center">
                        <CreditCardIcon className='h-5 w-5'></CreditCardIcon> 
                        Enter payment Information to unlock all features
                    </span>
                    <BillingNew setBillingValueAfterSubmit={setBillingValueAfterSubmit} />
                </StripeWrapper>
                <div className='border-b border-lowgray pt-5'></div>
            </div>
        </div>
    )
}

export default Method