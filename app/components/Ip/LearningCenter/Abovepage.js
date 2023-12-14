"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";
import SkeletonLoader from "../../Skeleton/Skeleton";
import Link from "next/link";
import { Homeform } from "../../LayoutNew/Homeform";
import TrialForm from "../Chatbot/TrialForm";
import { createHubspotContact } from "@/app/API/integrations/hubspot/Hubspot";
import { updateHubspotContact } from "@/app/API/integrations/hubspot/Hubspot";
import {
  createSlackChannel,
  setDemoKnowledge,
} from "@/app/API/pages/get-trial";
import { updateScrapperKnowledgeState } from "@/app/components/store/slices/scrapperKnowledgeSlice";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams, useRouter } from "next/navigation";
import { submitCheckout } from "@/app/API/pages/Checkout";
import { createBotKnowledge, createCheckoutBot } from "@/app/API/pages/Bot";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { editBillingType } from "@/app/components/store/slices/billingTypeSlice";
const Abovepage = () => {
  const ref = useRef(null);
  const [showVideo, setShowvideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pop, setPop] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  useEffect(() => {
    const checkPlayer = () => {
      const player = document.querySelector("lottie-player");
      if (player) {
        if (ref.current) {
          ref.current.addEventListener("complete", () => {
            player.seek(150);
            player.play();
          });
        }
      } else {
        setTimeout(checkPlayer, 100);
      }
    };

    checkPlayer();
  }, []);
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
  const [errors, setErrors] = useState([]);

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
      "url",
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

    const isFaqValid = !validateUrl(formData["faq_url"]);

    return isFaqValid || formValues || isEmailValid || isUrlValid;
  };

  function addHttpsToUrl(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "https://" + url;
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
        phone: "1" + formData.phone,
        company: formData.company_name,
        website: formData.url,
        lifecyclestage: "subscriber",
        is_demo: "true",
        demo_status: "pending",
        gclid: gclid,
        msclkid: msclkid,
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

    let randomUUIDpassword = uuidv4();

    let payload = {
      enterprise: {
        name: formData.company_name,
        billing_type: "demo",
      },
      email: formData?.email,
      name: formData?.first_name + " " + formData?.last_name,
      phone_prefix: "+1",
      slug_domain: formData?.company_name,
      phone: "+1" + formData.phone,
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
        external_emails: [formData?.email],
      };
      await createSlackChannel(payloadForSlack, response.token);

      if (bot.status === 200 || bot.status === 201) {
        // Set demo knowledge. (basic knowledge about the customer)
        let payloadForDemoKnowledge = {
          main_webpage: addHttpsToUrl(formData.url),
          faqs_webpage: addHttpsToUrl(formData.faq_url),
        };
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
    <div className=" relative py-8 sm:py-14 sm:mt-[74px]">
      <div className="grid grid-cols-1 md:grid-cols-2 relative">
        <div>
          {loading ? (
            <div className="block !font-[700] md:ml-[40px] text-[33px] leading-[40px] px-3 md:px-6 md:!leading-[55px] text-left md:text-[50px] my-[1rem] md:my-8 relative text-[black]">
              <SkeletonLoader height={60} width={"90%"} />
            </div>
          ) : (
            <h2 className="block !font-[500] md:ml-[40px] text-[33px] sm:!mb-[55px] leading-[40px] px-3 md:px-6 md:!leading-[55px] text-left md:text-[56px] my-[1rem] md:my-8 relative text-[black]">
              <span className="text-[#f5455c]">AI-Powered </span> Tailored for Your Contact Center{" "}
            </h2>
          )}
          {loading ? (
            <div className="w-full md:ml-[56px] xl:w-[597px] text-blue-400 text-left font-[400]  px-3 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              <SkeletonLoader height={60} width={"90%"} />
            </div>
          ) : (
            <div
              className="sm:ml-[65px]  sm:!mb-[55px]"
              style={{
                borderLeft: "4px solid #1d74f5",
              }}
            >
              <p className="w-full   xl:w-[597px] text-blue-400 text-left font-[400]  px-3 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[17px] md:leading-8 gap-2">
              Secure, Intelligent, Low-Latency AI-Driven Solutions.
              </p>
              <p className="w-full  xl:w-[597px] text-blue-400 text-left font-[400]  px-3 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[17px] md:leading-8 gap-2">
              Instantly onboard, customize anything, and automate everything, enhancing efficiency and customer satisfaction in your contact center.
              </p>
            </div>
          )}

          {loading ? (
            <div className="flex  px-3 sm:px-0 items-center my-8 sm:ml-[62px] cursor-pointer ">
              <SkeletonLoader height={60} width={200} />
            </div>
          ) : (
            <div className="block sm:flex md:flex lg:flex gap-4   sm:!mb-[55px] px-3 sm:px-0 items-center mt-8 sm:mb-8 sm:ml-[62px] cursor-pointer">
              <Link href={"/get-trial"}>
                <button
                  className={
                    "mb-4 sm:mb-0 py-[18px] rounded-sm px-2 w-full font-bold sm:w-[200px] focus:ring-yellow-300 text-white hover:bg-[black] bg-primary dark:focus:ring-yellow-900 "
                  }
                >
                  Get started free
                </button>
              </Link>{" "}
            </div>
          )}
        </div>
        <div className="relative">
          {loading ? (
            <div className="!m-auto mr-2 border-solid  relative w-[343px] sm:w-[477px] sm:h-[383px] mt-5 sm:mt-0 h-[286px]  shrink-0 items-center justify-center leading-normal">
              <SkeletonLoader className="w-[400px] sm:w-[477px] sm:h-[383px]  h-[206px] " />
            </div>
          ) : (
            <>
              <div className="absolute animate_lottie right-0">
                <lottie-player
                  className="wrap_player"
                  id={"linesLottieAnimation"}
                  ref={ref}
                  src="/lines-animation.json"
                  direction={1}
                  autoplay={0}
                  renderer={"svg"}
                  delay={0}
                  easing={""}
                  duration={4000}
                  value={100}
                ></lottie-player>
              </div>
              <div className=" block">
                <div className="!m-auto mr-2 ml-[10px] border-solid  relative w-full sm:h-[383px] mt-5 sm:mt-0 h-[583px] flex shrink-0 items-center justify-center  leading-normal">
                  <TrialForm width={"80%"} formData={formData} setFormData={setFormData} pop={pop} setPop={setPop} />
                </div>
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
                  className="sm:w-[40%] md:w-[40%] z-[9999999999] relative lg:w-[40%] mx-auto my-6 w-full flex items-center justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 focus:ring-yellow-300 bg-[#F5455C]  text-white hover:shadow-[0_8px_9px_-4px_#F5455C] disabled:bg-input_color disabled:shadow-none disabled:text-white"
                  disabled={DisablingButton()}
                  onClick={SubmitTheForm}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Abovepage;