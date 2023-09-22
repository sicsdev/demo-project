"use-client";
import React, { useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  PaymentElement,
  LinkAuthenticationElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createPaymentIntent, submitCheckout } from "@/app/API/pages/Checkout";
import { useRouter } from "next/navigation";
import { subscribeCustomer } from "@/app/API/pages/Checkout";
import Button from "../Common/Button/Button";
import { createNewGoogleUser } from "@/app/API/pages/Login";
import { createBot, createCheckoutBot } from "@/app/API/pages/Bot";


const CheckOutForm = ({ checkoutForm, boxValid, googleAuthInfo, client_secret, paymentId }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null)

  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState();
  const paymentElementOptions = {
    layout: "tabs"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    elements.submit()

    setLoading(true);
    try {


      const { client_secret: clientSecret } = await createPaymentIntent({ amount: "500" })


      console.log(clientSecret)
      const confirmStatus = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // Make sure to change this to your payment completion page
          // return_url: "http://localhost:3000",
        },
        redirect: 'if_required',
      });

      if (confirmStatus.error) {
        confirmStatus.error.type === "card_error" || confirmStatus.error.type === "validation_error" ? setMessage(confirmStatus.error.message) : setMessage("An unexpected error occurred.");
        setLoading(false);
        return
      }

      let checkoutForm2 = {
        ...checkoutForm,
        password_confirm: checkoutForm.password,
        enterprise: {
          name: checkoutForm.business_name,
          industry: checkoutForm.business_industry,
          company_size: checkoutForm.business_company_size,
        }
      };
      delete checkoutForm2?.business_company_size
      delete checkoutForm2?.business_industry
      delete checkoutForm2?.business_name
      // Hardcoded  "password_confirm" because API expects password_confirm but we are not using it.

      let googleAuthInfoPayload = {
        ...googleAuthInfo,
        name: checkoutForm.name,
        phone: checkoutForm.phone,
      }

      const result = googleAuthInfo.googleLogin ? await createNewGoogleUser(googleAuthInfoPayload) : await submitCheckout(checkoutForm2)

      console.log('confirmStatus', confirmStatus)
      if (result.token) {
        let bodyForSubscribe = {
          token: confirmStatus.paymentIntent.payment_method,
        };
        const response = await subscribeCustomer(bodyForSubscribe, result.token);
        if (response) {
          localStorage.setItem("Token", result.token);
          let payload = {
            "category": "standard",
            "description": "",
            "automation_tolerance": 0,
            "logo": "",
            "chat_title": 'Tempo Agent',
            "payment_platform": "Order",
            "ticketing_platform": "Other",
            "cancellation_tolerance": 0,
            "refund_tolerance": 0,
            "ecommerce_platform": 'Other',  
          }
          const bot = await createCheckoutBot(payload, result.token);
          if (bot.status === 200 || bot.status === 201) {
            router.push("/dashboard");
          } else {
            setLoading(false);
          }

        }
        setError([]);
      } else {
        setError(getErrorsArray(result.response.data));
      }

    } catch (error) {
      console.log(error)
      setError([error.message]);
    }

    setLoading(false);
  };



  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        {/* <div
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
        </div> */}

        {loading && <p className="message">Processing Payment...</p>}
        <Button type={"submit"} className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-primary border border-gray-300 rounded-md shadow-sm checkout"
          disabled={loading || !stripe || !elements}
        >
          Start Now
        </Button>
      </form>

      <div>
        {errors.map((error, i) => (
          <p key={i} className="text-red text-center mt-3">
            {error}
          </p>
        ))}

        {errors.includes("A user with that email already exists.") && (
          <div className="text-center mt-2">
            <span>
              Please{" "}
              <a
                className="link underline text-sky text-center mt-1"
                href="/login"
              >
                login
              </a>{" "}
              to continue
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOutForm;
