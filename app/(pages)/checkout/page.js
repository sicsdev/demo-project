"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import { Input } from "../../components/Common/Input/Input";
import Logos from "../../components/Checkout/Logos";
import Button from "../../components/Common/Button/Button";

import Card from "../../components/Common/Card/Card";
import Image from "next/image";
import CheckOutForm from "@/app/components/Checkout/CheckOutForm";
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import Link from "next/link";
import { testimonialsArray } from "@/app/assets/Testimonials/Testimonials";
import StripeWrapper from "@/app/components/Stripe/Wrapper/StripeWrapper";
import validator from "validator";
import {
  createContactInFreshsales,
  updateContactInHubspot,
} from "@/app/API/components/Demo";
import { createPaymentIntent } from "@/app/API/pages/Checkout";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import SelectField from "@/app/components/Common/Input/SelectField";
import { business_company_size_data, business_industry_data } from "@/app/components/Forms/data/FormData";
import TextField from "@/app/components/Common/Input/TextField";
import price_data from "@/app/components/PanelCard/price_data";
import { CheckIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const gclid = searchParams.get("gclid");
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_term = searchParams.get("utm_term");
  const matchtype = searchParams.get("matchtype");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");
  const msclkid = searchParams.get("msclkid");


  const [planQuery, setPlanQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [boxValid, setBoxValid] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [grayColor, setGrayColor] = useState(false);
  const [grayColor1, setGrayColor1] = useState(false);
  const [pop, setPop] = useState(false);


  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [googleAuthInfo, setGoogleAuthInfo] = useState({
    googleLogin: false,
    access_token: "",
    email: "",
  });
  const getPaymentIntent = async () => {
    const clientSecret = await createPaymentIntent({ amount: "500" });
    if (clientSecret?.client_secret) {
      setClientSecret(clientSecret?.client_secret);
      setPaymentId(clientSecret.id);
    }
  };
  useEffect(() => {
    getPaymentIntent();
    searchParams.get("plan")
      ? setPlanQuery(searchParams.get("plan"))
      : setPlanQuery("");
    searchParams.get("email")
      ? setCheckoutForm({ ...checkoutForm, email: searchParams.get("email") })
      : setCheckoutForm({ ...checkoutForm, email: "" });

    if (searchParams.get("gauth") == "true")
      setGoogleAuthInfo({
        ...googleAuthInfo,
        googleLogin: true,
        access_token: searchParams.get("gtoken"),
        email: searchParams.get("email"),
      });
    // Changing testimonials every 9 seconds
    // const interval = setInterval(() => {
    //     let random = Math.floor(Math.random() * (testimonialsArray.length - 2))
    //     let random2 = Math.floor(Math.random() * (testimonialsArray.length - 2))
    //     setRandomIndex(random)
    //     setRandomIndex2(random2)
    // }, 9000);
    // return () => clearInterval(interval);
  }, []);

  const [checkoutForm, setCheckoutForm] = useState({ phone_prefix: "+1" }); // phone_prefix: "+1" Hardcoded for testing, need to add to the form later
  const [userformErrors, setUserformErrors] = useState([]);

  const handleFormValues = (e) => {
    if (e.target.name === "email") {
      setPop(false);
    }
    let value = e.target.value

    setCheckoutForm({
      ...checkoutForm,
      [e.target.name]: value,
    });
  };

  const appearance = {
    theme: 'stripe',
    variables: {
      fontSizeBase: '16px',
      colorPrimary: '#55555', colorText: '#555555',


    }
  };
  const options = {
    clientSecret,
    appearance,
  };
  const [hubID, setHubid] = useState(null);


  const blacklist = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "yopmail.com",
    "outlook.com",
    "me.com",
    "comcast.net",
    "msn.com",
    "live.com",
    "att.net",
    "ymail.com",
    "sbcglobal.net",
    "mac.com",
    "verizon.net",
    "bellsouth.net",
    "cox.net",
    "rocketmail.com",
    "protonmail.com",
    "charter.net",
    "mail.com",
    "optonline.net",
    "aim.com",
    "earthlink.net",
  ];


  const handleBlur = async (e) => {


    if (validator.isEmail(checkoutForm.email)) {

      if (blacklist.includes(checkoutForm?.email.split("@")[1])) {
        console.log("got it")
        setPop(true);
      } 
      else {
        setPop(false);
      }

      let first_name = checkoutForm.name?.split(" ")[0] || null;
      let last_name = checkoutForm.name?.split(" ")[1] || null;
      let payload = { email: checkoutForm.email };
      if (checkoutForm.phone) payload.phone = '+1' + checkoutForm.phone;
      if (checkoutForm.business_name) payload.company = '+1' + checkoutForm.business_name;
      if (first_name) payload.firstname = first_name;
      if (last_name) payload.lastname = last_name;
      if (gclid) payload.gclid = gclid;
      if (msclkid) payload.msclkid = msclkid;
      // if(lifecyclestage)payload.lifecyclestage= "subscriber";
      // if(is_demo)payload.is_demo = "false";
      // if(demo_status)payload.demo_status = "pending";
      console.log("payload", payload)
      if (hubID) {
        await updateContactInHubspot(payload, hubID)
      } else {
        const res = await createContactInFreshsales(payload);
        if (res) {
          setHubid(res.id);
          localStorage.setItem("hubId", res.id)
        }
      }
    }
  };

  const Abc = () => {
    setBoxValid(!boxValid);
  };

  const handleDownload = () => {
    // const pdfPath = "Deflection AI.docx.pdf";
    // const link = document.createElement("a");
    // link.href = pdfPath;
    // link.target = "_blank";
    // link.download = "downloaded_file.pdf";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  const toggleClass = () => {
    setShowSummary(!showSummary);
  };
  const [showOrderSummary, setShowOrderSummary] = useState(false);




  const formatPhoneNumber = (value) => {
    // Remove all characters except digits
    let numbersOnly = value.replace(/[^\d]/g, "");

    // Add back the +1 country code
    numbersOnly =
      "1" + numbersOnly.substring(numbersOnly.startsWith("1") ? 1 : 0);

    // Apply formatting to match the pattern +1 (XXX) XXX-XXXX
    if (numbersOnly.length > 1) {
      // Add parentheses and space after the area code (3 digits)
      if (numbersOnly.length < 5) {
        return `+1 (${numbersOnly.slice(1)}`;
      }
      // Add a space and hyphen after the next block of 3 digits
      if (numbersOnly.length < 8) {
        return `+1 (${numbersOnly.slice(1, 4)}) ${numbersOnly.slice(4)}`;
      }
      // Full format
      return `+1 (${numbersOnly.slice(1, 4)}) ${numbersOnly.slice(
        4,
        7
      )}-${numbersOnly.slice(7, 11)}`;
    }

    return "+1 ";
  };


  return (
    <div className="bg-white">
      <Container>
        <div className="relative h-8 mr-24 items-center flex sm:mb-4">
          <Link href="/">
            <img
              width='140px'
              className="opacity-100 mt-0.5"
              alt="logo.png"
              src="/checkout-logo.png"
            />
          </Link>
        </div>
        <hr className=" sm:block md:block lg:block border-border" />

        <div
          className="flex justify-between items-center sm:hidden md:hidden lg:hidden cursor-pointer my-4 "
          onClick={() => {
            setShowOrderSummary((prev) => !prev);
          }}
        >
          <div className="flex justify-between items-center gap-4">
            <ShoppingCartIcon className="h-6 w-6 text-gray-500" />
            {showOrderSummary === true ? (
              <>
                Hide Order Summary{" "}
                <ChevronUpIcon className="h-6 w-6 text-heading" />
              </>
            ) : (
              <>
                Show Order Summary{" "}
                <ChevronDownIcon class="h-6 w-6 text-heading" />
              </>
            )}
          </div>
          <div>$0</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* {showOrderSummary === true && (
            <div className="block sm:hidden md:hidden">
              <Card className={"border bg-white border-border "}>
                <h2 className="sm:text-center sm:text-left text-xl mb-2">
                  Order Summary
                </h2>
                <hr style={{ borderColor: "#CCCCCC" }}></hr>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 -lg">
                  <tbody>
                    <tr className="dark:bg-gray-800 bg-white">
                      <th
                        scope="row"
                        className="px-6 py-4 font-lg text-base text-gray-900 whitespace-nowrap text-black"
                      >
                        {planQuery == 1 && "Enterprise Plan"}
                        {planQuery == 0 && "Starter Plan"}
                      </th>
                      <td className="px-6 py-4 text-base">$200 Free Credits</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="text-base text-gray-900 bg-white text-black">
                      <th scope="row" className="px-6 py-3 text-base">
                        Total Today
                      </th>
                      <td className="px-6 py-3">$0</td>
                    </tr>
                  </tfoot>
                </table>
              </Card>
            </div>
          )} */}
          <div>
            <h1 className="text-start text-lg tracking-wide  my-4 font-bold text-heading">
              Checkout
            </h1>
            <h1 className="text-start text-sm tracking-wide  my-4 font-bold text-heading ">
              1. Enter Your Info
            </h1>
            <div className=" bg-white -lg r py-6 px-4">
              <div className="grid gap-2 sm:mt-[12px] sm:gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                <div>
                  {pop == true ? <>    <div id="tooltip-bottom" role="tooltip" className="absolute z-10 ml-[5rem]  inline-block  text-[14px]  text-red shadow-sm  tooltip ">
                    Please enter a valid work email
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div></> : ""}
                  <TextField
                    type={"email"}
                    placeholder={"Email"}
                    className="py-3 mt-1  "
                    name="email"
                    id={"email"}
                    onChange={handleFormValues}
                    onBlur={handleBlur}
                    value={checkoutForm?.email ?? ''}
                    title={
                      <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                        <span>Email</span>{" "}
                      </div>
                    }
                    error={""}
                  />
                </div>
                <div>
                  <TextField
                    type={"text"}
                    placeholder={"Full Name"}
                    className="py-3 mt-1  "
                    name="name"
                    id={"name"}
                    onChange={handleFormValues}
                    onBlur={handleBlur}
                    value={checkoutForm?.name ?? ''}
                    title={
                      <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                        <span>Full Name</span>{" "}
                      </div>
                    }
                    error={""}
                  />
                </div>
                <div>
                  <TextField
                    type={"text"}
                    placeholder={"Business Name"}
                    className="py-3 mt-1  "
                    name="business_name"
                    id={"business_name"}
                    onChange={handleFormValues}
                    onBlur={handleBlur}
                    value={checkoutForm?.business_name ?? ''}
                    title={
                      <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                        <span>Business Name</span>{" "}
                      </div>
                    }
                    error={""}
                  />
                </div>
                {/* <div className='my-2 sm:my-0'>
                  <TextField
                    type="text"
                    id="phone"
                    name="phone"
                    value={checkoutForm?.phone ?? "+1"}
                    onChange={handleFormValues}
                    className="py-3 mt-1 outline-none"
                    title={
                      <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                        <span>Cell Phone</span>{" "}
                      </div>
                    }
                    placeholder={"Cell Phone"}
                    error={""}
                  />
                </div> */}
                <div className='my-2 sm:my-0'>

                  <div className='flex items-center inline'>
                    <label className={`opacity-90 block text-sm text-heading text-lg`}>
                      Cell Phone
                    </label>
                  </div>
                  <div className="relative flex items-center mt-1">
                    <small className="z-50 m-auto text-[#b5b5b5] absolute inset-y-0 left-0 flex items-center pointer-events-none mx-2" style={{ fontSize: '14px' }}>
                      +1
                    </small>
                    <input
                      style={{ paddingLeft: '27px' }}
                      onChange={handleFormValues}
                    onBlur={handleBlur}
                      value={checkoutForm.phone}
                      className="w-1/2 new_input_phone block border-[0.2px] bg-white  rounded-md shadow-sm placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 border-input_color border-danger invalid:border-danger invalid:text-danger"
                      placeholder=''
                      id='phone'
                      name='phone'
                      title={"Phone"}
                      type="Number"
                    >
                    </input>
                  </div>
                </div>


                <div className="">
                  <SelectField
                    onChange={handleFormValues}
                    onClick={(e) => {
                      setGrayColor(true)
                    }}
                    onBlur={() => {
                      if (!checkoutForm?.business_industry) {
                        setGrayColor(false)
                      }
                    }}
                    value={checkoutForm?.business_company_size ?? ''}
                    name="business_company_size"
                    id="business_company_size"
                    values={business_company_size_data}
                    title={
                      <div className="flex items-center gap-2 w-[150px] mb-3 text-sm md:text-[14px] sm:text-[14px]">
                        <span> Company size</span>{" "}

                      </div>
                    }
                    className="py-3"
                  />{" "}
                </div>
                <div className="">
                  <SelectField
                    onChange={handleFormValues}
                    onClick={(e) => {
                      setGrayColor(true)
                    }}
                    onBlur={() => {
                      if (!checkoutForm?.business_industry) {
                        setGrayColor(false)
                      }
                    }}
                    value={checkoutForm?.business_industry ?? ''}
                    name="business_industry"
                    id="business_industry"
                    values={business_industry_data}
                    title={
                      <div className="flex items-center gap-2 w-[150px] mb-3 text-sm md:text-[14px] sm:text-[14px]">
                        <span> Industry</span>{" "}

                      </div>
                    }
                    className="py-3"
                  />{" "}
                </div>
                {/* {!googleAuthInfo.googleLogin && (
                  <div className=" col-span-2">
                    <TextField
                      type={"password"}
                      placeholder={"Password"}
                      className="py-3 mt-1  "
                      name="password"
                      id={"password"}
                      onChange={handleFormValues}
                      onBlur={handleBlur}
                      value={checkoutForm?.password ?? ''}
                      title={
                        <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                          <span>Password</span>{" "}
                        </div>
                      }
                      error={""}
                    />
                  </div>)} */}
              </div>
            </div>
            <div className="flex items-center my-6 sm:ml-[14px]">
              <input
                id="link-checkbox"
                type="checkbox"
                className="custom-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => Abc(e)}
              />
              <label
                htmlFor="link-checkbox"
                className="ml-2  text-sm md:text-[14px] sm:text-[14px] font-medium text-border "
              >
                I agree with the{" "}
                <a
                  href="/terms-of-service"
                  className="text-primary dark:text-blue-500 hover:underline"
                  onClick={(e) => handleDownload()}
                >
                  Terms of Service{" "}
                </a>
                and{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary dark:text-blue-500 hover:underline"
                  onClick={(e) => handleDownload()}
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            <div className="flex justify-center flex-col">
              {userformErrors &&
                userformErrors.map((error, index) => {
                  return (
                    <div key={index}>
                      <p className="text-red-500 text-sm">&#9888; {error}</p>
                    </div>
                  );
                })}
            </div>
            <h1 className="text-start text-sm tracking-wide  my-4 font-bold text-heading ">
              2. Select Payment Method
            </h1>
            <div className=" -lg p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="payment-element-child">
                  <h3 className="text-sm md:text-[14px] sm:text-[14px] ">Credit or Debit Card</h3>
                  {/* <p className="text-sm text-black mt-1">HSA / FSA accepted</p> */}
                </div>
                <Logos />
              </div>
              {clientSecret && (
                <div className="my-3 mb-0 p-3 pb-0">
                  <StripeWrapper options={options}>
                    <CheckOutForm
                      pop={pop}
                      checkoutForm={checkoutForm}
                      paymentId={paymentId}
                      boxValid={boxValid}
                      setBoxValid={setBoxValid}
                      client_secret={clientSecret}
                      googleAuthInfo={googleAuthInfo}
                    />
                  </StripeWrapper>
                </div>
              )}
            </div>
            <div className="mt-5 ">
              <p className="text-justify text-xs ">
                By entering your information, you authorize Deflection AI to
                automatically charge your card for your usage once your credits
                according to our{" "}
                <span className="text-[blue]">
                  <Link href="https://usetempo.ai/article/pricing-overview">
                    Pricing Policy.
                  </Link>{" "}
                </span>{" "}
                To establish your account and verify your payment method, we
                will charge $1 to your credit card today.
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative overflow-x-auto sm:p-8 md:p-8 lg:p-8 bg-sky2 my-8 -lg bg-white">
              {/* <Card className={"border bg-white border-border "}>
                <h1 className="text-left text-sm mb-2">Order Summary</h1>
                <hr style={{ borderColor: "#CCCCCC" }}></hr>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 -lg">
                  <tbody>
                    <tr className="dark:bg-gray-800 bg-white">
                      <th
                        scope="row"
                        className="px-6 pl-0 py-4 font-lg text-xs text-gray-900 whitespace-nowrap text-black"
                      >
                        {planQuery == 1 && "Enterprise Plan"}
                        {planQuery == 0 && "Starter Plan"}
                      </th>
                      <td className="px-6 py-4 text-xs">$200 Free Credits</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="text-base xs-gray-900 bg-white text-black text-black">
                      <th scope="row" className="px-6 pl-0 py-4 font-lg text-xs text-gray-900 whitespace-nowrap text-black">
                        Total Today
                      </th>

                      <td className="px-6 py-4 text-xs">$0</td>
                    </tr>
                  </tfoot>
                </table>
              </Card> */}
              <div className=" bg-[#F7F8FA]  border-input_color p-5 -md my-4">
                <div className="">
                  <div >
                    <div className="flex items-center mr-4">
                      <div className="relative w-[22px] h-[22px]">
                        <Image
                          fill={true}
                          src={price_data[0].icons_svg}
                          className="bg-contain mx-auto"
                          alt="img"
                        />
                      </div>{" "}
                      <p className="ml-2 text-xl font-[600] text-gray-900 dark:text-gray-300">
                        {price_data[0].title}
                      </p>
                    </div>
                    {price_data[0].title == "Starter" ? (
                      <>
                        <p
                          className="text-[#6C727A] font-normal text-sm md:text-[14px] sm:text-[14px] mt-6"
                          onMouseLeave={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          $200 free, then just{" "}
                          <span className="font-bold text-[#6C727A]"> $1 </span>per
                          ticket resolution{" "}
                          <span
                            className="cursor-pointer"
                            onMouseOver={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            *
                          </span>
                        </p>
                      </>
                    ) : (
                      <p className="text-[#6C727A] font-normal text-sm md:text-[14px] sm:text-[14px] mt-6">
                        Custom pricing. Schedule demo for proposal.
                      </p>
                    )}
                    <h3 className="font-bold text-heading my-6"> Includes:</h3>
                    <ul>
                      {price_data[0].feature_list.map((element, key) => (
                        <li
                          key={key}
                          className="text-sm md:text-[14px] sm:text-[14px] text-[#6C727A] flex gap-3 items-center my-2"
                        >
                          <CheckIcon className="h-[15px] w-[18px] text-[#53c08f]" />


                          {element.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className="p-4 sm:p-8 md:p-8 lg:p-8">
              {testimonialsArray.map((item, index) => {
                return (
                  <Card
                    className={`border bg-white border-border my-10 animate-fadeIn`}
                    key={index}
                  >
                    <h1 className="my-2 text-lg text-heading font-bold">
                      {item.Title}
                    </h1>
                    <p className="my-2 text-sm text-heading mb-4">
                      {item.Text}
                    </p>
                    <div className="flex justify-start gap-4 items-center">
                      <div className="relative w-[70px] h-[70px]">
                        <Image
                          fill={true}
                          src={item.Photo}
                          className="bg-contain -full mx-auto"
                          alt="img"
                        />
                      </div>
                      <h1 className="my-2 text-heading text-lg font-semibold">
                        {item.Name}
                      </h1>
                    </div>
                  </Card>
                );
              })}
            </div> */}
            </div>
          </div>
        </div>
        <hr className=" my-1 mb-3 text-[black] w-[50%]"></hr>

        <p className="mt-2 text-xs ">
          {" "}
          All rights reserved 2023 ©{" "}
          <span className="text-[blue]">Deflection AI Ventures, Inc.</span>
        </p>
      </Container>
    </div>
  );
};

export default Checkout;