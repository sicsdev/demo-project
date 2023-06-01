import React, { useState } from 'react'
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { submitCheckout } from '@/app/API/pages/Checkout';
import { useRouter } from 'next/navigation';
import { subscribeCustomer } from '@/app/API/pages/Checkout';

const stripe_api = 'pk_test_51NC19PGMZM61eRRVpg4gaTiEaXZcPjougGklYq3nBN3tT7Ulmkbu2MNV6e86l6Yf8re51wVMdSEZ8dyAQ3ZR7Q4i00vjeqlGWW'
const stripeLib = loadStripe(stripe_api);

const CheckOutForm = ({ checkoutForm, validateForm }) => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState();

    const handleSubscribe = async (paymentMethod, userToken) => {
        let bodyForSubscribe = {
            token: paymentMethod.id,
            price: '77f3ee07-46ab-4c6d-8d3e-8da3d42bee54'
        }
        subscribeCustomer(bodyForSubscribe, userToken)
    }

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            validateForm();
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });
            if (error) { setError(error); setLoading(false); return; }

            const result = await submitCheckout(checkoutForm);
            if (result.token) {
                handleSubscribe(paymentMethod, result.token);
                localStorage.setItem("token", result.token);
                router.push("/dashboard");
                setError(null);
            } else {
                setError({message: 'Check user form fields and try again.'});
            }

        } catch (error) {
            setError(error);
        }

        setLoading(false);
    };


    return (
        <form onSubmit={handleCheckout}>
            <CardElement className="form-control" options={{
                style: {
                    base: {
                        fontSize: '16px',
                        padding: '2vh',
                        lineHeight: '2.5',
                        color: '#495057',
                        border: 'solid',
                        borderRadius: '1vh',
                    },
                },
            }} />
            {error && <p className="message">{error.message}</p>}
            {loading && <p className="message">Processing Payment...</p>}
            <button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm checkout" disabled={false}>Checkout</button>
        </form>
    );
}

export default CheckOutForm