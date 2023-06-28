import React from "react";
import Image from "next/image";
import Button from "../Common/Button/Button";
import { ClockIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { ScissorsIcon } from "@heroicons/react/24/outline";
import { InboxIcon } from "@heroicons/react/24/outline";

const Smartsection = () => {
  return (
    <div className="bg-background">
      <div className=" mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-10">
        <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
          <div className="">
            <h1 className=" font-bold  text-2xl text-white  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none ">
              Introducing your  
              <span className="text-first-section-color">
                {" "}
                email superhero.              </span>{" "}
              Never miss an inbox beat.
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
                  // onBlur={(e) => handleBlur(email)}
                />
              </div>
              <div className="inline mt-5 sm:m-0 md:m-0 lg:m-0">
                <Button
                  className={
                    "py-[11px] px-2 w-full focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900"
                  }
                >
                  Request Demo
                </Button>
              </div>
            </form>
            <div className=" block sm:hidden">
            <div className="mr-2 relative w-[343px] sm:w-[478px] sm:h-[500px] mt-5 sm:mt-0 h-[286px] flex shrink-0 items-center justify-center rounded-full leading-normal">
              <Image
                src="/smart-inbox.png"
                className="w-full bg-contain mx-auto"
                fill={true}
              />
            </div>
          </div>
         
            <p className="text-white mt-4">
              Responding proactively, not just reactively: With Smart Inbox,
              handle email tickets swiftly and efficiently. Achieve SLAs under 5
              minutes and ensure every response aligns with your company
              policies and guardrails. Transform your customer service
              experience into a journey of instant, intelligent solutions.
            </p>
            <div className="flex sm:gap-6 gap-2  sm:flex-row  sm:items-center sm:justify-between my-5 ">
              <div className="w-[33%] text-center sm:text-left">
                {" "}
                <div className="sm:mr-2 mx-auto sm:mx-0 relative w-[30px] sm:w-[57px] sm:h-[50px] mt-5 sm:mt-0 h-[26px] flex shrink-0 items-center justify-center rounded-full leading-normal">
                  {" "}
                  <ClockIcon className="h-10 w-10 text-[#2563eb]" />

                </div>
                <p className="text-white  text-[15px]  js-show-on-scroll">
                  a future of no pending tickets, round-the-clock{" "}
                </p>
              </div>
              <div className="w-[33%] text-center sm:text-left ">
                <div className="sm:mr-2 mx-auto sm:mx-0 relative w-[30px] sm:w-[57px] sm:h-[50px] mt-5 sm:mt-0 h-[26px] flex shrink-0 items-center justify-center rounded-full leading-normal">
                  <CurrencyDollarIcon className="h-10 w-10 text-[#2563eb]" />
                </div>
                <p className="text-white  text-[15px]   js-show-on-scroll">
                  spend cents, not dollars on responses{" "}
                </p>
              </div>
              <div className="w-[33%] text-center sm:text-left ">
                <div className="sm:mr-2 mx-auto sm:mx-0 relative w-[30px] sm:w-[70px] sm:h-[50px] mt-5 sm:mt-0 h-[26px] flex shrink-0 items-center justify-center rounded-full leading-normal">
                  {" "}
                <InboxIcon className="h-10 w-10 text-[#2563eb]" />

                </div>
                <p className="text-white  text-[15px]  js-show-on-scroll">
                cut your CS costs in half, guaranteed                </p>
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
