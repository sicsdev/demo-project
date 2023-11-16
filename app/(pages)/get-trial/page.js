"use client";
import React, { useState } from "react";
import TrialForm from "./Form";
import { submitCheckout } from "@/app/API/pages/Checkout";
import { createBotKnowledge, createCheckoutBot } from "@/app/API/pages/Bot";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { editBillingType } from "@/app/components/store/slices/billingTypeSlice";
import Link from "next/link";

const Trial = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    urls: [],
    billing_type: "demo",
    checked: false,
  });
  const [loading, setLoading] = useState(false);
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
      "password",
      "url",
    ];
    const formValues = requiredKeys.some(
      (key) => !formData[key] || formData[key].trim() === ""
    );
    const arr_values = ["urls"].every(
      (key) => !formData[key] || formData[key].length === 0
    );
    const isEmailValid = formData["email"]
      ? !validateEmail(formData["email"])
      : true;
    const isUrlValid = formData["url"] ? !validateUrl(formData["url"]) : true;
    return arr_values || formValues || isEmailValid || isUrlValid;
  };
  const SubmitTheForm = async () => {
    setLoading(true);
    let payload = {
      enterprise: {
        name: formData.company_name,
        billing_type: "demo",
      },
      email: formData?.email,
      name: formData?.first_name + " " + formData?.last_name,
      phone_prefix: "+1",
      slug_domain: formData?.company_name,
      phone: formData.phone,
      password: formData?.password,
      password_confirm: formData?.password,
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
      if (bot.status === 200 || bot.status === 201) {
        dispatch(editBillingType("demo"));
        // await createBotKnowledge(bot.data.id, { urls: formData.urls });
        router.push("/dashboard");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  
  return (
    <div className="container my-12">
      <div className="justify-center relative h-8  items-center  flex my-4">
        <Link href="/">
          <img
            width="300px"
            className="opacity-100 mt-0.5"
            alt="logo.png"
            src="/logo-b.png"
          />
        </Link>
      </div>
      <div>
        <h1 className="text-[26px] sm:text-[40px] md:text-[40px] lg:text-[40px] text-heading font-[500] text-center mx-auto sm:w-[35%]">
          Demo <span className="text-[#F5455C]">Deflection AI</span> now
          tailored to your brand
        </h1>
        <p className="sm:w-[65%] text-xl sm:my-2 text-center mx-auto">
          Deflection AI will configure a beautiful customized bot with your
          basic content within 24 hours. Completely free and no commitment
          required.
        </p>
        <TrialForm formData={formData} setFormData={setFormData} />
        <button
          className="sm:w-[40%] md:w-[40%] lg:w-[40%] mx-auto my-6 w-full flex items-center justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 focus:ring-yellow-300 bg-[#F5455C]  text-white hover:shadow-[0_8px_9px_-4px_#F5455C] disabled:bg-input_color disabled:shadow-none disabled:text-white"
          disabled={DisablingButton()}
          onClick={SubmitTheForm}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Trial;
