import React, { useEffect, useState } from 'react'
import StripeWrapper from '../Stripe/Wrapper/StripeWrapper'
import { useDispatch } from 'react-redux'
import { editBillingType } from '../store/slices/billingTypeSlice'
import { createEnterpriseAccount, removeTrialFromSlack } from '@/app/API/pages/EnterpriseService'
import BillingNew from '../Stripe/Billing/NewPayment'
import { CreditCardIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import SkeletonLoader from '../Skeleton/Skeleton'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Swal from 'sweetalert2'
import UpdateAccount from '../SideModal/UpdateAccount'

const Method = ({ billingState }) => {
    const [show, setShow] = useState(false)
    const [failed, setFailed] = useState(false)
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user)
    const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
    const [stripe, setStripe] = useState(null);
    const [skeltonLoading, setSkeltonLoading] = useState(true);

    useEffect(() => {
        let stripePromise = loadStripe(STRIPE_KEY);
        stripePromise.then(stripeInstance => { setStripe(stripeInstance); setSkeltonLoading(false) });
    }, []);

    const setBillingValueAfterSubmit = async () => {
        // Update plan in Slack channel
        let payloadForSlack = { channel_id: userData?.data?.enterprise?.slack_channel_id }
        await removeTrialFromSlack(payloadForSlack)
        // Change account type in db
        const response = await createEnterpriseAccount({ billing_type: "normal" })

        if (response?.status == 200 || response.status == 201) {
            dispatch(editBillingType("normal"));
            setShow(true);
            // Swal.fire({
            //     title: 'Account Updated!',
            //     text: 'Your payment method has been successfully updated.',
            //     icon: 'success',
            //     confirmButtonText: 'Got it'
            // });
        } else {
            setFailed(true);
            // Swal.fire({
            //     title: 'Update Failed',
            //     text: 'Failed to update the enterprise account. Please try again or contact support.',
            //     icon: 'error',
            //     confirmButtonText: 'Close'
            // });
        }

    }

    return (
        <>
            {stripe &&
                <Elements stripe={stripe}>
                    <div className='flex justify-center relative'>
                        <div className='w-full mx-5'>
                            <span className="px-2 text-xs sm:text-lg mb-4 text-center !font-semibold bg-sidebar-hover text-white py-2 rounded-md flex gap-2 justify-center items-center">
                                <CreditCardIcon className='h-5 w-5'></CreditCardIcon>
                                Enter payment Information to unlock all features
                            </span>
                            <BillingNew setBillingValueAfterSubmit={setBillingValueAfterSubmit} />
                            <div className='border-b border-lowgray pt-5'></div>
                        </div>
                        {show ? <UpdateAccount setShow={setShow} title={'Account Updated!'} text={'Your payment method has been successfully updated.'} icon={'success'} confirmButtonText={'Got it'} /> : ""}
                        {failed ? <UpdateAccount setShow={setFailed} title={'Update Failed'} text={'Failed to update the enterprise account. Please try again or contact support.'} icon={'error'} confirmButtonText={'Close'} /> : ""}
                    </div>
                </Elements>
            }
        </>
    )
}

export default Method