"use client";
import React, { useState, useEffect } from "react";
import TrialForm from "./Form";
import { useSearchParams, useRouter } from "next/navigation";
import { submitCheckout } from "@/app/API/pages/Checkout";
import { createBotKnowledge, createCheckoutBot } from "@/app/API/pages/Bot";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { editBillingType } from "@/app/components/store/slices/billingTypeSlice";
import Link from "next/link";
import { createHubspotContact } from "@/app/API/integrations/hubspot/Hubspot";
import { updateHubspotContact } from "@/app/API/integrations/hubspot/Hubspot";
import { createSlackChannel, setDemoKnowledge } from "@/app/API/pages/get-trial";
import { updateScrapperKnowledgeState } from "@/app/components/store/slices/scrapperKnowledgeSlice";
import { v4 as uuidv4 } from 'uuid';

const Trial = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const gclid = searchParams.get("gclid");

  const msclkid = searchParams.get("msclkid");
  console.log("gclid", gclid);

  console.log("msclkid", msclkid);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    billing_type: "demo",
    checked: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [pop, setPop] = useState(false);

  const validateEmail = (email) => {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validateUrl = (url) => {
    var regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return regex.test(url);
  };

  const DisablingButton = () => {
  
      const requiredKeys = [
        "first_name",
        "last_name",
        "email",
        "company_name",
        "phone",
        "url"
      ];
  
      const formValues = requiredKeys.some(
        (key) => !formData[key] || formData[key].trim() === ""
      );
  
      // const arr_values = ["urls"].every(
      //   (key) => !formData[key] || formData[key].length === 0
      // );
  
      const isEmailValid = formData["email"]
        ? !validateEmail(formData["email"])
        : true;
  
      const isUrlValid = formData["url"] ? !validateUrl(formData["url"]) : true;
  
      const isFaqValid = !validateUrl(formData["faq_url"])

      
  
      return isFaqValid || formValues || isEmailValid || isUrlValid;
    
  };

  console.log("popp", pop);

  function addHttpsToUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  }

  const SubmitTheForm = async () => {
    setLoading(true);

    let payloadForHubspot = {
      properties: {
        firstname: formData.first_name,
        lastname: formData.last_name,
        email: formData.email,
        phone: '1' + formData.phone,
        company: formData.company_name,
        website: formData.url,
        lifecyclestage: "subscriber",
        is_demo: "true",
        demo_status: "pending",
        gclid: gclid,
        msclkid: msclkid
      },
    };

    // Create contact in hubspot, and patch it after get contact id.
    let createContact = await createHubspotContact(payloadForHubspot);

    // If there is a conflict, it means contact already exist, so we patch it.
    if (createContact?.category == "CONFLICT") {
      const regex = /Existing ID: (\d+)/;
      const match = createContact.message.match(regex);
      if (match) {
        const id = match[1];
        await updateHubspotContact(payloadForHubspot, id);
      }
    }

    let randomUUIDpassword = uuidv4()

    let payload = {
      enterprise: {
        name: formData.company_name,
        billing_type: "demo",
      },
      email: formData?.email,
      name: formData?.first_name + " " + formData?.last_name,
      phone_prefix: "+1",
      slug_domain: formData?.company_name,
      phone: '+1' + formData.phone,
      password: randomUUIDpassword,
      password_confirm: randomUUIDpassword,
    };

    let payload2 = {
      category: "standard",
      description: "",
      automation_tolerance: 0,
      logo: "",
      chat_title: "Deflection AI Agent",
      payment_platform: "Order",
      ticketing_platform: "Other",
      refund_tolerance: 0,
      ecommerce_platform: "Other",
    };

    const response = await submitCheckout(payload);
    if (response?.token) {
      Cookies.set("Token", response.token);
      const bot = await createCheckoutBot(payload2, response.token);

      //Payload for create slack channel
      let payloadForSlack = {
        channel_name: formData.company_name,
        members: ["U05H5HSLS9X", "U05GSUCQ1PU"],
        account_type: "trial",
        external_emails: [formData?.email]
      }
      await createSlackChannel(payloadForSlack, response.token)



      if (bot.status === 200 || bot.status === 201) {
        // Set demo knowledge. (basic knowledge about the customer)
        let payloadForDemoKnowledge = {
          main_webpage: addHttpsToUrl(formData.url),
          faqs_webpage: addHttpsToUrl(formData.faq_url)
        }
        dispatch(updateScrapperKnowledgeState(payloadForDemoKnowledge));
        dispatch(editBillingType("demo"));
        router.push("/dashboard");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setErrors(["A user with that email already exists."]);
      setLoading(false);
    }
  };


  return (
    <div className="container my-12">
      <div className="justify-center relative h-8  items-center flex my-4">
        <Link href="/">
          <img
            // width="100px"
            className="opacity-100 mt-0.5 sm:w-[300px] w-[200px]"
            alt="logo.png"
            src="/deflection-logo.png"
          />
        </Link>
      </div>
      <div className="px-[25px] sm:px-0">
        <h1 className="text-[26px] mt-8 sm:text-[40px] md:text-[40px] lg:text-[40px] text-heading font-[500] text-center mx-auto sm:w-[38%]">
          Demo <span className="text-[#F5455C]">Deflection AI</span> now tailored{" "}
          to your brand
        </h1>
        <p className="sm:w-[40%] text-xl mt-8 text-center mx-auto">
          Deflection AI will configure a beautiful customized bot with your
          basic content within 24 hours. Completely free and no commitment
          required.
        </p>
        <TrialForm formData={formData} setFormData={setFormData} pop={pop} setPop={setPop} />
        <div className="flex justify-content-center">
          {errors.length > 0 &&
            errors.map((error, index) => (
              <div className="w-100 m-auto">
                <small className="text-danger" key={index}>
                  {error}
                </small>
              </div>
            ))}
        </div>
        <button
          className="sm:w-[40%] md:w-[40%] lg:w-[40%] mx-auto my-6 w-full flex items-center justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 focus:ring-yellow-300 bg-[#F5455C]  text-white hover:shadow-[0_8px_9px_-4px_#F5455C] disabled:bg-input_color disabled:shadow-none disabled:text-white"
          disabled= {DisablingButton() || pop} 
          onClick={SubmitTheForm}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Trial;
