import React, { useEffect, useState } from 'react'
import StripeWrapper from '../Stripe/Wrapper/StripeWrapper'
import { useDispatch } from 'react-redux'
import { editBillingType } from '../store/slices/billingTypeSlice'
import { createEnterpriseAccount, removeTrialFromSlack } from '@/app/API/pages/EnterpriseService'
import BillingNew from '../Stripe/Billing/NewPayment'
import { CreditCardIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import SkeletonLoader from '../Skeleton/Skeleton'

const Method = ({ billingState }) => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user)

    const setBillingValueAfterSubmit = async () => {

        // Update plan in Slack channel
        let payloadForSlack = { channel_id: userData?.data?.enterprise?.slack_channel_id }
        await removeTrialFromSlack(payloadForSlack)

        // Change account type in db
        const response = await createEnterpriseAccount({ billing_type: "normal" })

        dispatch(editBillingType("normal"))

    }
    
    const [skeltonLoading, setSkeltonLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setSkeltonLoading(false);
        }, 300);
    }, [])

    return (


        <>
            {billingState == 'demo' &&
                <div className='flex justify-center'>
                    <div className='w-full mx-5'>
                        <StripeWrapper>
                            <span className="px-2 text-xs sm:text-lg mb-4 text-center !font-semibold bg-sidebar-hover text-white py-2 rounded-md flex gap-2 justify-center items-center">
                                {skeltonLoading ?
                                    <SkeletonLoader count={1} height={30} width={30} />
                                    :
                                    <CreditCardIcon className='h-5 w-5'></CreditCardIcon>
                                }
                                {skeltonLoading ?
                                    <SkeletonLoader count={1} height={30} width={300} />
                                    :
                                    "Enter payment Information to unlock all features"
                                }
                            </span>
                            <BillingNew setBillingValueAfterSubmit={setBillingValueAfterSubmit} />
                        </StripeWrapper>
                        <div className='border-b border-lowgray pt-5'></div>
                    </div>
                </div>}

        </>

    )
}

export default Method