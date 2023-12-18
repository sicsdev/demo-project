import React, { useRef } from 'react';

import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

import { useState } from "react";

import Button from "../../Common/Button/Button";

import { createBillingUser, subscribeCustomer } from "@/app/API/pages/Checkout";

import Swal from "sweetalert2";

import LoaderButton from "../../Common/Button/Loaderbutton";

import { useEffect } from "react";

import { errorMessage, successMessage } from "../../Messages/Messages";

import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

const BillingNew = ({ setBillingValueAfterSubmit }) => {
    const stripe = useStripe();
    // const cardElementRef = useRef();
    const elements = useElements();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState(false)
    const [errors, setError] = useState([]);
    const [loading, setLoading] = useState();
    const [cardFilled, setCardFilled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (elements) {
            const cardElement = elements.getElement(CardElement);
            let card_token = await stripe.createToken(cardElement);
            const payload = { token: card_token.token?.id, };

            const response = await subscribeCustomer(payload, Cookies.get("Token"));
            if (response) { setBillingValueAfterSubmit() }
            setLoading(false);

        }
    };

    useEffect(() => {

        if (elements) {
            const cardElement = elements.getElement(CardElement);

            if (cardElement && cardElement != null) {

                cardElement.on("change", function (event) {
                    setMessage(true)
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
        <div className="w-full">

            <div
                className="rounded-md border border-lowgray"
                style={{ borderColor: "#80808080" }}
            >

                <CardElement
                    className="form-control"
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                padding: "1.5vh",
                                lineHeight: "1.5",
                                color: "#495057",
                                borderRadius: "9px",
                                border: "1px solid #ced4da", // Agregar esta línea para definir un borde
                                width: "100%",
                            },
                        },
                    }}
                />

            </div>



            {cardFilled === true && (
                <div className="my-4 flex justify-end">
                    {loading === true ? (
                        <LoaderButton />
                    ) : (
                        <Button
                            type={"button"}
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                            onClick={handleSubmit}
                            disabled={cardFilled === false}
                        >
                            Submit
                        </Button>
                    )}
                </div>
            )}
            {message && (
                <p className="text-heading text-xs text-center mt-2">
                    Your card will not be charged. You will receive $200 in free credits.
                </p>
            )}



            <div>
                {errors.map((error, i) => (
                    <p key={i} className="text-red text-center">
                        {error}
                    </p>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
};

export default BillingNew;
