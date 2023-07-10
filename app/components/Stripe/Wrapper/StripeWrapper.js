import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
const StripeWrapper = ({ children, options = null }) => {
    const stripeLib = loadStripe(STRIPE_KEY);
    return (
        <Elements options={options} stripe={stripeLib}>{children}</Elements>
    )
}
export default StripeWrapper