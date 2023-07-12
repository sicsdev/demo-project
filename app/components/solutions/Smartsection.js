import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Common/Button/Button";
import { ClockIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { ScissorsIcon } from "@heroicons/react/24/outline";
import { InboxIcon } from "@heroicons/react/24/outline";
import validator from "validator";
import Card from "../Common/Card/Card";
const Smartsection = () => {

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [hide, setHide] = useState({
    first: false,
    second: false,
    third: false,
  });
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

  const handleBlur = (email) => {
    if (validator.isEmail(email)) {
      hj("identify", userId, {
        Email: email,
      });
      let payload = {
        event: "Blur-Email",
      };
      window.dataLayer?.push(payload);
      // sendDataToFreshsales(email);
      if (blacklist.includes(email.split("@")[1])) {
        let payload = {
          event: "lead-generic",
        };
        window.dataLayer?.push(payload);
      } else {
        let payload = {
          event: "lead-business",
        };
        window.dataLayer?.push(payload);
      }
      if (email?.includes("@")) {
        window._learnq.push([
          "track",
          "$email",
          {
            $email: email,
          },
        ]);
      }
    }
  };

  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  return (
    <div className="bg-background">
      <div className=" mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-10 "
       onClick={() =>
        setHide({ first: false, second: false, third: false, fourth: false })
      }
      >
        <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
          <div className="">
            <h1 className=" font-bold  text-2xl text-white  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none ">
              Introducing your
              <span className="text-first-section-color">
                {" "}
                email superhero.{" "}
              </span>{" "}
              Don't miss an inbox beat.
            </h1>
            <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 mt-8">
              <div className="inline col-span-2 ">
                <input
                  type={"email"}
                  placeholder={"Work Email*"}
                  className={
                    "border border-input_color w-full block  px-3 py-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                  }
                  id={"email"}
                  //   value={email}
                  onBlur={(e) => handleBlur(email)}
                  onChange={(e) => {
                    {
                      setEmail(e.target.value);
                    }
                    validateEmail(e);
                  }}
                />
              </div>
              <div className="inline mt-5 sm:m-0 md:m-0 lg:m-0">
                <Button
                  className={
                    "py-[11px] px-2 w-full focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900"
                  }
                  disabled={validEmail}
                >
                  Request Demo
                </Button>
              </div>
            </form>
            <div className=" block sm:hidden mt-6">
              <div className="ml-auto mr-auto sm:mr-2 relative w-[343px] sm:w-[478px] sm:h-[500px] mt-5 sm:mt-0 h-[286px] flex shrink-0 items-center justify-center rounded-full leading-normal">
                <Image
                  src="/smart-inbox.png"
                  className="w-full bg-contain mx-auto"
                  fill={true}
                />
              </div>
            </div>

            <p className="text-white mt-4 text-[14px] sm:text-[16px] ">
              Responding proactively, not just reactively: With Smart Inbox,
              handle email tickets swiftly and efficiently. Achieve SLAs under 5
              minutes and ensure every response aligns with provided company
              policies and guardrails. Transform your customer experience into a
              journey of intelligent solutions{" "}
              <span
                className="cursor-pointer"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setHide({ first: true });
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setHide({ first: true });
                }}
              >
                *
              </span>
              {hide.first == true ? (
                <Card
                  className={
                    "animate-fadeIn w-[320px]	sm:w-[400px]  absolute bg-white ml-auto mr-auto left-0 right-0 z-[111]"
                  }
                >
                  <p
                    className="text-heading"
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setHide({ first: false });
                      }, 3000)
                    }
                  >
                    *Matching tone of responses with your brand for Smart Inbox
                    may take some training, unless Help Center and FAQ are
                    extremely robust. To better align, provide more documents
                    during setup.
                  </p>
                </Card>
              ) : (
                ""
              )}
            </p>
            <div className="flex sm:gap-6 gap-2  sm:flex-row  sm:items-center sm:justify-between my-5 ">
              <div className="w-[33%] text-center sm:text-left">
                {" "}
                <div className="sm:mr-2 mx-auto sm:mx-0 relative w-[30px] sm:w-[57px] sm:h-[50px] mt-5 sm:mt-0 h-[26px] flex shrink-0 items-center justify-center rounded-full leading-normal">
                  {" "}
                  <ClockIcon className="h-10 w-10 text-[#2563eb]" />
                </div>
                <p className="text-white  text-[13px] sm:text-[15px]  js-show-on-scroll ">
                  Minimize your pending tickets, round-the-clock{" "}
                </p>
              </div>
              <div className="w-[33%] text-center sm:text-left ">
                <div className="sm:mr-2 mx-auto sm:mx-0 relative w-[30px] sm:w-[57px] sm:h-[50px] mt-5 sm:mt-0 h-[26px] flex shrink-0 items-center justify-center rounded-full leading-normal">
                  <CurrencyDollarIcon className="h-10 w-10 text-[#2563eb]" />
                </div>
                <p className="text-white text-[13px] sm:text-[15px] js-show-on-scroll ">
                  Spend cents, not dollars on responses{" "}
                </p>
              </div>
              <div className="w-[33%] text-center sm:text-left ">
                <div className="sm:mr-2 mx-auto sm:mx-0 relative w-[30px] sm:w-[70px] sm:h-[50px] mt-5 sm:mt-0 h-[26px] flex shrink-0 items-center justify-center rounded-full leading-normal">
                  {" "}
                  <ScissorsIcon className="h-10 w-10 text-[#2563eb]" />
                </div>
                <p className="text-white text-[13px] sm:text-[15px] js-show-on-scroll ">
                  Cut your customer service costs, and never look back{" "}
                </p>
              </div>
            </div>
          </div>
          <div className=" hidden sm:block">
            <div className="mr-2 relative w-[343px] sm:w-[478px] sm:h-[500px] mt-5 sm:mt-0 h-[286px] flex shrink-0 items-center justify-center rounded-full leading-normal">
              <Image
                src="/smart-inbox.png"
                className="w-full bg-contain mx-auto"
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smartsection;
