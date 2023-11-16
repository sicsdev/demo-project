import React, { useState } from 'react'
import StripeWrapper from '../Stripe/Wrapper/StripeWrapper'
import { useDispatch } from 'react-redux'
import { editBillingType } from '../store/slices/billingTypeSlice'
import { createEnterpriseAccount } from '@/app/API/pages/EnterpriseService'
import BillingNew from '../Stripe/Billing/NewPayment'

const Method = () => {
    const dispatch = useDispatch()
    const setBillingValueAfterSubmit = async () => {
        dispatch(editBillingType("normal"))
        const response = await createEnterpriseAccount({ billing_type: "normal" })
        console.log(response)
    }
    return (
        <div className='flex justify-center '>
            <div>
                <StripeWrapper>

                    <h3 className=" mb-4 text-center text-[#007c8f] !font-semibold ">Enter payment Information to unlock all features</h3>
                    <BillingNew
                        setBillingValueAfterSubmit={setBillingValueAfterSubmit}
                    />
                </StripeWrapper></div></div>
    )
}

export default Method