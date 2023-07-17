import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Common/Button/Button";
import { ClockIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { ScissorsIcon } from "@heroicons/react/24/outline";
import { InboxIcon } from "@heroicons/react/24/outline";
import { createContactInFreshsales } from "@/app/API/components/Demo";
import validator from "validator";
import { useRouter } from "next/navigation";


const Socialabovesection = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

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
      let Freshsalespayload = {
        email: email,
      }
       createContactInFreshsales(Freshsalespayload);
      hj("identify", userId, {
        Email: email,
      });
      let payload = {
        event: "Blur-Email",
      };
      window.dataLayer?.push(payload);
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
  const router = useRouter();
  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };


  const handleNavigate = () => {
    console.log("clicked")
    let emailInput = document.getElementById("email").value;
    router.push(`/checkout?email=${emailInput}`);
  };

  return (
    <div className="sm:bg-type-above bg-type-mobile">
    <div
      className=" mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-10"
      onClick={() =>
        setHide({ first: false, second: false, third: false, fourth: false })
      }
    >
      <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-14">
        <div className="">
          <p className=" font-bold  text-xl text-white  md:text-h6 sm:mb-3 sm:ml-1 sm:leading-none ">
          SMART SOCIAL
          </p>
          <h1 className=" font-bold  text-[18px] text-white sm:mt-0 mt-4 md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none ">
          Become Your Customers'              <span className="text-first-section-color">
              {" "}
              Best Friend.              </span>{" "}
          </h1>

          <div className="block sm:hidden">
            <p className="text-white mt-4 text-[14px] sm:text-[16px]">
            From Simply Responding to Actively Engaging: Dive into the era of proactive support with Smart Social. Handle customer concerns across Facebook, Instagram, Twitter, and WhatsApp effortlessly, making their journey smooth and satisfying.

         
            </p>
          </div>
          <div className="block sm:hidden">
            <form className="grid   grid-cols-1 sm:grid-cols-1  gap-1 mt-8">
              <div className="inline col-span-2  sm:max-w-[70%]">
                <input
                  type={"email"}
                  placeholder={"Enter your email"}
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
              <div className="inline mt-5  sm:max-w-[30%] sm:mt-[20px]">
                <Button
                  className={
                    "py-[11px] px-2 w-full focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900"
                  }
                  disabled={validEmail}
                  onClick={handleNavigate}
                >
                  Start Now
                </Button>
              </div>
            </form>
          </div>
      
          <div className="block sm:hidden mt-4">
            <div className="ml-auto mr-auto sm:mr-2  rounded-md relative w-[343px] sm:w-[478px] sm:h-[500px] mt-5 sm:mt-0 h-[366px] flex shrink-0 items-center justify-center  leading-normal">
              <Image
              src="/social-trans.gif"
              className="w-full bg-contain mx-auto"
                fill={true}
              />
            </div>
          </div>

          <div className="hidden sm:block">
            <p className="text-white mt-4 text-[14px] sm:text-[16px]">
            From Simply Responding to Actively Engaging: Dive into the era of proactive support with Smart Social. Handle customer concerns across Facebook, Instagram, Twitter, and WhatsApp effortlessly, making their journey smooth and satisfying.

            </p>
          </div>
          <div className="hidden sm:block">
          <form className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8">
                <div className="flex col-span-2  w-[100%]">
                  <input
                    type={"email"}
                    placeholder={"Enter your email"}
                    className={
                      "border border-input_color w-[372px] block mr-5   px-3 py-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
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
                  <Button
                    className={
                      "py-[11px] px-2 w-[136px] focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900"
                    }
                    disabled={validEmail}
                    onClick={handleNavigate}
                  >
                    Start Now
                  </Button>
                </div>
                <div className="inline mt-5  sm:max-w-[30%] sm:mt-[20px]"></div>
              </form>
          </div>
        </div>
        <div className=" hidden sm:block">
          <div className="mr-2 ml-[10px] border-solid  rounded-md relative w-[343px] sm:w-[433px] sm:h-[469px] mt-5 sm:mt-0 h-[286px] flex shrink-0 items-center justify-center rounded-full leading-normal">
            <Image
              src="/social-trans.gif"
              className="w-full bg-contain mx-auto "
              fill={true}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Socialabovesection;
