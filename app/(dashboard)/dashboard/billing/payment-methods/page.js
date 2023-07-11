'use client'
import { getBillingDetails, getPaymentDetails } from '@/app/API/pages/Checkout';
import Card from '@/app/components/Common/Card/Card';
import { logos } from '@/app/components/Forms/ReadOnly/logos_data';
import Billing from '@/app/components/Stripe/Billing/Billing';
import StripeWrapper from '@/app/components/Stripe/Wrapper/StripeWrapper';
import { TicketIcon } from '@heroicons/react/24/outline';
import { CreditCardIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { useState, useEffect } from 'react';

const PaymentMethod = () => {
    const [basicFormData, setBasicFormData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [logo, setLogo] = useState(null)
    const getBillingData = async () => {
        const response = await getPaymentDetails();
        if (response?.results?.length > 0) {
            const customer_id = response.results[0].stripe_id;
            const resp = await getBillingDetails(customer_id);
            if (resp?.data.length > 0) {
                setBasicFormData((prev) => {
                    return {
                        ...prev,
                        card: resp.data[0].card,
                    };
                });
                const findLogo = logos.find((x) => x.name.toLowerCase() === resp.data[0].card.brand.toLowerCase())
                if (findLogo) {
                    setLogo(findLogo.logo)
                }
            }
        }
    };
    useEffect(() => { getBillingData() }, [])
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

    return (
        <div>
            {isEdit == false ? (
                <>
                    <p
                        className="float-right my-5 cursor-pointer"
                        onClick={() => {
                            setIsEdit(true);
                        }}
                    >
                        Edit
                    </p>
                </>
            ) : (
                <>
                    <p
                        className="float-right my-5 cursor-pointer"
                        onClick={() => {
                            setIsEdit(false);
                        }}
                    >
                        Back
                    </p>
                </>
            )}
            <div className="border-b border-primary dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a href="#" className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group" aria-current="page">
                            <CreditCardIcon className="h-6 w-6 text-gray-500" /> Payment Methods
                        </a>
                    </li>

                </ul>
            </div>

            <div className='w-full sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto my-5'>
                {isEdit == false ? (
                    <>
                        {basicFormData && basicFormData?.card && (
                            <div className="bg-white rounded-lg sm:p-5 md:p-5 lg:p-5 p-5 mt-3">
                                <h3 className="text-start text-lg sm:text-lg md:text-lg lg:text-lg sm:leading-9 my-2 font-semibold text-heading">
                                    Card Details
                                </h3>
                                <div className=" text-start sm:flex md:flex lg:flex gap-6 items-center">
                                    <div className="h-[30px]"
                                        dangerouslySetInnerHTML={{ __html: logo }}
                                    />
                                    <div>
                                        <h2 class="font-semibold text-md text-heading">
                                            {makeCapital(basicFormData?.card?.brand)} ending in {basicFormData?.card?.last4}
                                        </h2>
                                        <p className="text-sm">
                                            You need a primary billing method when a balance due. To remove this one, set a new primary billing
                                            method first.
                                        </p>
                                    </div>
                                </div>


                            </div>
                        )}
                    </>) : (
                    <>
                        <h3 className="text-start text-lg sm:text-lg md:text-lg lg:text-lg sm:leading-9 my-2 font-semibold text-heading">
                            Billing
                        </h3>
                        <StripeWrapper>
                            <Billing
                                basicFormData={basicFormData}
                                setShowBilling={setIsEdit}
                                getBillingData={getBillingData}
                            />
                        </StripeWrapper>
                    </>
                )}
            </div>
        </div>
    )
}

export default PaymentMethod