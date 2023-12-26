import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
const StripeWrapper = ({ children, options = null }) => {

  // const [stripePromise, setStripePromise] = useState(() =>
  //   loadStripe(STRIPE_KEY)
  // );

  let stripePromise = loadStripe(STRIPE_KEY)

  return (
    <>
      <Elements stripe={stripePromise} options={options}>{children} </Elements>
    </>
  );
};
export default StripeWrapper;
