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

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [planQuery, setPlanQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [boxValid, setBoxValid] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [grayColor, setGrayColor] = useState(false);
  const [grayColor1, setGrayColor1] = useState(false);

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
  console.log("checkoutForm", checkoutForm)
  const handleFormValues = (e) => {
    setCheckoutForm({
      ...checkoutForm,
      [e.target.name]: e.target.value,
    });
  };
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  const [hubID, setHubid] = useState(null);
  const handleBlur = async (e) => {
    if (validator.isEmail(checkoutForm.email)) {
      let first_name = checkoutForm.name?.split(" ")[0] || null;
      let last_name = checkoutForm.name?.split(" ")[1] || null;

      let payload = { email: checkoutForm.email };
      if (checkoutForm.phone) payload.phone = checkoutForm.phone;
      if (first_name) payload.firstname = first_name;
      if (last_name) payload.lastname = last_name;
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
  return (
    <div className="bg-white">
      <Container>
        <div className="relative w-28 h-8 mb-4">
          <Image
            fill={"true"}
            className="bg-contain mx-auto w-full"
            alt="logo.png"
            src={"/dark-logo.png"}
          />
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
          {showOrderSummary === true && (
            <div className="block sm:hidden md:hidden">
              <Card className={"border bg-white border-border "}>
                <h2 className="sm:text-center sm:text-left text-xl mb-2">
                  Order Summary
                </h2>
                <hr style={{ borderColor: "#CCCCCC" }}></hr>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
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
          )}
          <div>
            <h1 className="text-start text-lg tracking-wide  my-4 font-bold text-heading">
              Checkout
            </h1>
            <h1 className="text-start text-sm tracking-wide  my-4 font-bold text-heading ">
              1. Enter Your Info
            </h1>
            <div className="border bg-white rounded-lg border-border">
              {googleAuthInfo.googleLogin ? (
                <div className="flex justify-start items-center py-4  bg-[#3c6df1]">
                  <span className="text-start text-sm font-normal text-border flex items-center">
                    <img
                      width="25px"
                      className="mx-5"
                      src="/icons/google-g.svg"
                    ></img>
                    <div className="flex items-center text-white">
                      Logged in with {checkoutForm.email}
                    </div>
                  </span>
                </div>
              ) : (
                <div className="flex justify-start gap-4 items-center  pl-5 p-1">
                  <span className="text-start text-xs font-normal w-[100px] text-black">
                    Email
                  </span>
                  <input
                    type={"email"}
                    placeholder={"Email"}
                    className={
                      "hide-focus p-4 w-full  focus:outline-none focus:border-0 focus:ring-0    invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "
                    }
                    name="email"
                    id={"email"}
                    onChange={handleFormValues}
                    onBlur={handleBlur}
                    value={checkoutForm?.email ?? ''}
                  />
                </div>
              )}

              <div className="flex justify-start gap-4 items-center border  border-l-0 border-r-0  border-b-0  border-top-1 border-border pl-5 p-1">
                <span className="text-start text-xs font-normal w-[100px] text-black">
                  Full Name
                </span>
                <input
                  type={"text"}
                  placeholder={"Full Name"}
                  className={
                    "hide-focus p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "
                  }

                  value={checkoutForm?.name ?? ''}
                  name="name"
                  id={"name"}
                  onChange={handleFormValues}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex justify-start gap-4 items-center border  border-l-0 border-r-0  border-b-0  border-top-1 border-border pl-5 p-1">
                <span className="text-start text-xs font-normal w-[100px] text-black">
                  Business Name
                </span>
                <input
                  type={"text"}
                  placeholder={"Business Name"}
                  className={
                    "hide-focus p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:border-0 focus:invalid:ring-0 "
                  }
                  name="business_name"
                  id={"business_name"}

                  value={checkoutForm?.business_name ?? ''}
                  onChange={handleFormValues}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex justify-start gap-4 items-center border  border-l-0 border-r-0  border-b-0  border-top-1 border-border pl-5 p-1">
                <span className="text-start text-xs font-normal w-[100px] text-black">
                  Company size
                </span>
                <select onChange={handleFormValues}
                  name="business_company_size"
                  onClick={(e) => {
                    setGrayColor(true)
                  }}
                  
                  onBlur={() => {
                    if (!checkoutForm?.business_industry) {
                      setGrayColor(false)
                    }
                  }}

                  value={checkoutForm?.business_company_size ?? ''}
                  id={"business_company_size"} className={
                    `${grayColor ? "" : "text-[#A2A3B7]"} hide-focus p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:ring-0 checkout-dropdown`
                  }>
                  <option value={''} disabled>Select</option>
                  {business_company_size_data.map((ele, key) =>
                    <option value={ele} key={key}>{ele}</option>
                  )}
                </select>
              </div>
              <div className="flex justify-start gap-4 items-center border  border-l-0 border-r-0  border-b-0  border-top-1 border-border pl-5 p-1">
                <span className="text-start text-xs font-normal w-[100px] text-black">
                  Industry
                </span>
                <select onChange={handleFormValues}
                  name="business_industry"
                  onClick={(e) => {
                    setGrayColor1(true)
                  }}
                  onBlur={() => {
                    if (!checkoutForm?.business_industry) {
                      setGrayColor1(false)
                    }
                  }}
                  value={checkoutForm?.business_industry ?? ''}
                  id={"business_industry"}
                  className={
                    `${grayColor1 ? "" : "text-[#A2A3B7]"} hide-focus p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:ring-0 checkout-dropdown`
                  }>
                  <option value={''} disabled>Select</option>
                  {business_industry_data.map((ele, key) =>
                    <option value={ele} key={key}>{ele}</option>
                  )}
                </select>
              </div>
              <div className="flex justify-start gap-4 items-center  pl-5 p-1 border border-l-0 border-r-0 border-border">
                <span className="text-start text-xs font-normal w-[100px] text-black">
                  Cell Phone
                </span>
                <input
                  type={"number"}

                  value={checkoutForm?.phone ?? ''}
                  placeholder={"Cell Phone"}
                  className={
                    "hide-focus p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "
                  }
                  min={0}
                  name="phone"
                  id={"mobile"}
                  onChange={handleFormValues}
                  onBlur={handleBlur}
                />
              </div>
              {!googleAuthInfo.googleLogin && (
                <div className="flex justify-start gap-4 items-center  pl-5 p-1 border border-t-0   border-b-0  border-l-0 border-r-0 border-border">
                  <span className="text-start text-xs font-normal w-[100px] text-black">
                    Password
                  </span>
                  <input
                    type={"password"}
                    placeholder={"Password"}
                    className={
                      "hide-focus p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "
                    }
                    name="password"
                    id={"password"}
                    value={checkoutForm?.password ?? ''}
                    onChange={handleFormValues}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center my-6">
              <input
                id="link-checkbox"
                type="checkbox"
                className="custom-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => Abc(e)}
              />
              <label
                htmlFor="link-checkbox"
                className="ml-2 text-xs font-medium text-border "
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
            <div className="border border-border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="payment-element-child">
                  <h3 className="text-xs text-black">Credit or Debit Card</h3>
                  {/* <p className="text-sm text-black mt-1">HSA / FSA accepted</p> */}
                </div>
                <Logos />
              </div>
              {clientSecret && (
                <div className="my-3 mb-0 p-3 pb-0">
                  <StripeWrapper options={options}>
                    <CheckOutForm
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
            <div className="relative overflow-x-auto sm:p-8 md:p-8 lg:p-8 bg-sky2 my-8 rounded-lg bg-white">
              <Card className={"border bg-white border-border "}>
                <h1 className="text-left text-sm mb-2">Order Summary</h1>
                <hr style={{ borderColor: "#CCCCCC" }}></hr>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
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
              </Card>

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
                          className="bg-contain rounded-full mx-auto"
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
