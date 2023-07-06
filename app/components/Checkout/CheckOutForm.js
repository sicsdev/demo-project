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
import { submitCheckout } from "@/app/API/pages/Checkout";
import { useRouter } from "next/navigation";
import { subscribeCustomer } from "@/app/API/pages/Checkout";
import Button from "../Common/Button/Button";
import { createNewGoogleUser } from "@/app/API/pages/Login";


const CheckOutForm = ({ checkoutForm, boxValid, googleAuthInfo }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState();
  const paymentElementOptions = {
    layout: "tabs"
  }

  const getPaymentIntent = async () => {
    if (!stripe) {
      return;
    }

    const clientSecret  = 'pi_1GszkK2eZvKYlo2CckVg2QWr_secret_ehO92VObd72SVqxkY48rAkxBS'
    // debugger
    
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }
  useEffect(() => {
    getPaymentIntent()
  }, [stripe]);
  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (error) {
        console.log(error)
        setError([error.message]);
        setLoading(false);
        return;
      }

      let checkoutForm2 = {
        ...checkoutForm,
        password_confirm: checkoutForm.password,
      };
      // Hardcoded  "password_confirm" because API expects password_confirm but we are not using it.

      let googleAuthInfoPayload = {
        ...googleAuthInfo,
        name: checkoutForm.name,
        phone: checkoutForm.phone,
      }

      const result = googleAuthInfo.googleLogin ? await createNewGoogleUser(googleAuthInfoPayload) : await submitCheckout(checkoutForm2)

      if (result.token) {
        let bodyForSubscribe = {
          token: paymentMethod.id,
        };
        const response = await subscribeCustomer(bodyForSubscribe, result.token);
        if (response) {
          localStorage.setItem("Token", result.token);
          router.push("/dashboard");
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

  function getErrorsArray(data) {
    const messages = [];
    for (const key in data) {
      if (Array.isArray(data[key])) {
        const title = key.charAt(0).toUpperCase() + key.slice(1);
        messages.push(...data[key].map((message) => `${title}: ${message}`));
      }
    }
    return messages;
  }

  return (
    <>
      <form onSubmit={handleCheckout}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
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

        {loading && <p className="message">Processing Payment...</p>}
        <Button type={"submit"} className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm checkout"
          disabled={boxValid}
        >
          Checkout
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
