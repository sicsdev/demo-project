'use client'
import { getBillingDetails, getPaymentDetails } from '@/app/API/pages/Checkout';
import Button from '@/app/components/Common/Button/Button';
import Card from '@/app/components/Common/Card/Card';
import { logos } from '@/app/components/Forms/ReadOnly/logos_data';
import Loading from '@/app/components/Loading/Loading';
import Billing from '@/app/components/Stripe/Billing/Billing';
import StripeWrapper from '@/app/components/Stripe/Wrapper/StripeWrapper';
import { errorMessages } from '@/app/components/error/message';
import { CreditCardIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PaymentMethod = () => {
    const [basicFormData, setBasicFormData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [logo, setLogo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const state = useSelector((state) => state.user.data);
    const getBillingData = async () => {
        const customer_id = state.stripe_data.stripe_id
        const resp = await getBillingDetails(customer_id);
        if (resp?.data?.length > 0) {
            setBasicFormData((prev) => {
                return {
                    ...prev,
                    card: resp.data,
                };
            });
            setError(null)
            setLoading(false)
        } else {
            setLoading(false)
            setError(errorMessages.notFound)
        }
    };
    useEffect(() => {if(basicFormData === null && state) getBillingData() }, [state])


    const makeCapital = (str) => {
        if (str?.includes(" ")) {
            return str
                .split(" ")
                .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
                .join(" ");
        } else {
            return str?.charAt(0).toUpperCase() + str?.slice(1);
        }
    };
    const sendLogos = (element) => {
        const findlogo = logos.find((x) => x.name.toLowerCase() === element.toLowerCase())
        if (findlogo) return findlogo.logo
        return element
    }

    return (
        <div>
            <div className="border-b border-primary dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a href="#" className=" flex justify-start gap-2 items-center  py-2 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group" aria-current="page">
                            <CreditCardIcon className="h-5 w-5 text-gray-500" /> Payment Methods
                        </a>
                    </li>

                </ul>
            </div>
            {!isEdit && (
                <>
                    {loading === true ? <Loading /> :
                        <div className={`w-full sm:w-[80%] md:w-[80%] lg:w-[80%] mx-auto my-5`}>
                            <>
                                {basicFormData && basicFormData?.card ? (
                                    <>

                                        <h3 className="text-start text-lg sm:text-lg md:text-lg lg:text-lg sm:leading-9 my-2 font-semibold text-heading">
                                            Payment Methods
                                        </h3>
                                        <div className={'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4'}>
                                            {basicFormData.card.map((element, key) =>
                                                <div className='border border-border rounded-lg p-4 ' key={key}>
                                                    <div className=" text-start flex gap-6 items-center">
                                                        <div className="h-[30px] w-[50px]"
                                                            dangerouslySetInnerHTML={{ __html: sendLogos(element?.card?.brand) }}
                                                        />
                                                        <div>
                                                            <h2 class=" font-normal text-md text-heading">
                                                                ****{element?.card?.last4}
                                                            </h2>
                                                        </div>
                                                    </div>

                                                    <p className='text-border font-normal text-sm my-2'>Expires {element?.card?.exp_month}/{element?.card?.exp_year}</p>
                                                    {key === 0 && (
                                                        <p className='text-border font-normal text-sm mt-2'>Default</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : ""}

                                <Button type={"button"} className="inline-block my-4 rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                    onClick={() => { setIsEdit(true) }}
                                >
                                    Add Payment Method
                                </Button>



                            </>
                        </div>
                    }
                </>
            )}
            {isEdit && (
                <div className={`w-full sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto my-5`}>
                    <StripeWrapper>

                        <Card>
                            <h3 className='font-semibold mb-2'>Add payment method</h3>
                            <p className='text-sm text-border mb-4'>This card will be charged based on your metered usage. </p>
                            <Billing
                                basicFormData={basicFormData}
                                setShowBilling={setIsEdit}
                                getBillingData={getBillingData}
                            />
                        </Card>
                    </StripeWrapper>
                    <Button type={"button"} className="inline-block my-4 rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                        onClick={() => { setIsEdit(false) }}
                    >
                        Back
                    </Button>

                </div>
            )}
        </div>
    )
}

export default PaymentMethod