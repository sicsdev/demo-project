import React from 'react'

import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useState } from 'react';
import Button from '../../Common/Button/Button';
import { createBillingUser } from '@/app/API/pages/Checkout';
import Swal from 'sweetalert2';
import LoaderButton from '../../Common/Button/Loaderbutton';
import { useEffect } from 'react';
const Billing = ({ basicFormData, setShowBilling, getBillingData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errors, setError] = useState([]);
    const [loading, setLoading] = useState();
    const [cardFilled, setCardFilled] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        let card_token = await stripe.createToken(cardElement);
        const payload = {
            token: card_token.token?.id
        }
        const response = await createBillingUser(payload)
        if (response?.response?.status === 200 || response?.response?.status === 201) {
            Swal.fire(
                'Success !',
                response?.message,
                'success'
            )

            setLoading(false)
            getBillingData()
            setShowBilling(false)
        } else {
            Swal.fire(
                'Something wrong !',
                response?.message,
                'error'
            )
            setLoading(false)
        }
    }

    useEffect(() => {
        if (elements != null) {
            const cardElement = elements.getElement(CardElement);
            if (cardElement && cardElement != null) {
                cardElement.on("change", function (event) {
                    if (event.complete) {
                        setCardFilled(true);
                    } else {
                        setCardFilled(false);
                    }
                });
            }
        }
    }, [elements]);
    return (
        <div className=''>

            <div
                className="border rounded px-2 border-gray-100"
                style={{ borderColor: "#80808080" }}
            >
                <CardElement
                    className="form-control"
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                padding: "2vh",
                                lineHeight: "2.5",
                                color: "#495057",
                                borderRadius: "1vh",
                                borderStyle: "solid",
                            },
                        },
                    }}
                />
            </div>
            <div className='my-5'>
                {loading === true ? <LoaderButton /> :
                    <Button type={"button"} className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                        onClick={handleSubmit}
                        disabled={cardFilled == false}
                    >
                        Submit
                    </Button>}
            </div>
            <div>
                {errors.map((error, i) => (
                    <p key={i} className="text-red text-center">
                        {error}
                    </p>
                ))}

            </div>
        </div>
    )
}

export default Billing