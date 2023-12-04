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
import Cookies from "js-cookie";
import { createSlackChannel, setDemoKnowledge } from "@/app/API/pages/get-trial";
import { updateScrapperKnowledgeState } from "../store/slices/scrapperKnowledgeSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


const CheckOutForm = ({ checkoutForm, boxValid, googleAuthInfo, client_secret, paymentId, pop }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch()

  const [message, setMessage] = useState(null)

  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState();
  const paymentElementOptions = {
    layout: "tabs"
  }

  function extractDomainFromEmail(email) {
    var parts = email.split('@');
    var domain = parts[1];
    return 'https://' + domain;
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

      let randomUUIDpassword = uuidv4()
      let formatedPhone = '+1' + checkoutForm.phone

      let checkoutForm2 = {
        ...checkoutForm,
        phone: formatedPhone,
        password: randomUUIDpassword,
        password_confirm: randomUUIDpassword,
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
        phone: '1' + checkoutForm.phone,
      }

      const result = googleAuthInfo.googleLogin ? await createNewGoogleUser(googleAuthInfoPayload) : await submitCheckout(checkoutForm2)

      if (result.token) {
        let bodyForSubscribe = {
          token: confirmStatus.paymentIntent.payment_method,
        };
        const response = await subscribeCustomer(bodyForSubscribe, result.token);


        // Create channel in Slack
        let payloadForHubspot = {
          properties: {
            firstname: checkoutForm.name,
            lastname: checkoutForm.name,
            email: checkoutForm.email,
            phone: '1' + checkoutForm.phone,
            company: checkoutForm2.enterprise.name,
            website: extractDomainFromEmail(checkoutForm.email),
            gclid: gclid,
            msclkid: msclkid,
            lifecyclestage: "130379889"
          },
        };

        // Create channel in Slack
        let payloadForSlack = {
          channel_name: checkoutForm2.enterprise.name,
          members: ["U05H5HSLS9X", "U05GSUCQ1PU"],
          account_type: "paid",
          external_emails: [checkoutForm2?.email],
          hubspot_contact: payloadForHubspot
        }

        await createSlackChannel(payloadForSlack, result.token)


        if (response) {
          // localStorage.setItem("Token", result.token);
          Cookies.set("Token", result.token)
          let payload = {
            "category": "standard",
            "description": "",
            "automation_tolerance": 0,
            "logo": "",
            "chat_title": 'Deflection AI Agent',
            "payment_platform": "Order",
            "ticketing_platform": "Other",
            "refund_tolerance": 0,
            "ecommerce_platform": 'Other',
          }
          const bot = await createCheckoutBot(payload, result.token);
          if (bot.status === 200 || bot.status === 201) {

            // Set demo knowledge. (basic knowledge about the customer)
            let domainFromEmail = checkoutForm.email.split('@')[1];
            let urlFromEmail = "https://" + domainFromEmail;
            let payloadForDemoKnowledge = { main_webpage: urlFromEmail, }
            dispatch(updateScrapperKnowledgeState(payloadForDemoKnowledge));

            router.push("/dashboard?triggerBot=true");
          } else {
            setLoading(false);
          }

        }
        setError([]);
      } else {
        setLoading(false);
        // setError(getErrorsArray(result.response.data));
      }

    } catch (error) {
      console.log(error)
      setError([error.message]);
    }

    setLoading(false);
  };

  const validateEmail = (email) => {
    // Simple email regex validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

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
        <Button type={"submit"} className="my-6 w-full flex items-center justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 focus:ring-yellow-300 bg-[#F5455C]  text-white hover:shadow-[0_8px_9px_-4px_#F5455C] disabled:bg-input_color disabled:shadow-none disabled:text-white"
          disabled={loading || !stripe || !elements || !validateEmail(checkoutForm?.email) || pop}
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
