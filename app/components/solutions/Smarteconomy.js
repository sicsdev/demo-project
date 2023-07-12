"use client";
import React from "react";
import { useState } from "react";
import Card from "../Common/Card/Card";
const Smarteconomy = () => {
  const [hide, setHide] = useState({
    first: false,
    second: false,
    third: false,
  });
  return (
    <div className="bg-white">
      <div className=" mx-auto max-w-[90%] sm:max-w-[90%]   py-10 "
       onClick={() =>
        setHide({ first: false, second: false, third: false, fourth: false })
      }
      >
        <div className="sm:max-w-[50%] w-full">
          {/* <h6 class="font-bold text-xl black py-1 text-primary">Pricing</h6> */}
          <h1 class="text-left text-2xl tracking-wide text-heading sm:text-3xl md:text-4xl lg:text-4xl mb-2 font-bold ">
            Revolutionize Your Customer Service with Smart Inbox{" "}
          </h1>
          <p className="sm:mt-4 sm:mb-3 mb-3 text-justify">
            Breathe life into your email management system and never let an
            inbox message go unanswered again. With Smart Inbox, your responses
            are proactive, swift, and aligned with your company policies,
            maintaining SLAs under 5 minutes. Transform customer service into a
            realm of swift, smart solutions.
          </p>
        </div>
        <div className=" flex flex-col sm:grid sm:grid-cols-2 justify-evenly items-center gap-10">
          <div className="">
            <h6 class="font-bold text-xl black py-1 text-primary">
              24/7 Email support  
            </h6>
            <p className="sm:mt-4 text-justify">
              Whether it's day or night, no email remains unanswered. Smart
              Inbox provides 24/7 support to handle all your email tickets
              promptly, guaranteeing a response time of less than 5 minutes<span
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
                    "animate-fadeIn w-[320px]	sm:w-[400px]  absolute bg-white ml-auto sm:ml-[100px] mr-auto left-0 right-0"
                  }
                >
                  <p
                    className="text-heading"
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setHide({ first: false });
                      }, 5000)
                    }
                  >
                    *Depending on your rules, certain requests may be cascaded to human handoff, if they are outside of the scope of your FAQ or help center documents.
                  </p>
                </Card>
              ) : (
                ""
              )}
            </p>{" "}
            <div className=" sm:w-[80%] sm:mt-10">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/tabs/smartinbox2.gif"
                    className="w-auto sm:h-[354px] m-auto shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:mt-8">
            {" "}
            <h6 class="font-bold text-xl black py-1 text-primary">
              Intelligent Automation{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Utilize the cutting-edge AI models, ChatGPT and GPT-4, to
              transform your operations. Smart Inbox's intelligent automation
              reduces time on task, and continually learns from your data for
              enhanced performance.
            </p>
            <div className=" sm:w-[80%] sm:mt-10">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/tabs/Analytics-Gif.gif"
                    className="w-auto sm:h-[354px] m-auto shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:mt-8">
            <h6 class="font-bold text-xl black py-1 text-primary">
              Seamless Integration{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Experience the ease of one-click integration. Connect your
              payments, CRM, inventory management, and backend systems to Smart
              Inbox in an instant
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
                    "animate-fadeIn w-[320px]	sm:w-[400px]  absolute bg-white ml-auto mr-auto left-0 right-0"
                  }
                >
                  <p
                    className="text-heading"
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setHide({ first: false });
                      }, 5000)
                    }
                  >
                    *During initial installation, if questions are outside of the
                    scope of your FAQ and Help Center, Tempo Chat may take
                    longer to resolve more complicated queries.
                  </p>
                </Card>
              ) : (
                ""
              )}
            </p>{" "}
            <div className=" sm:w-[80%] sm:mt-10">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/tabs/three.gif"
                    className="w-auto sm:h-[354px] m-auto shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mt-8">
            {" "}
            <h6 class="font-bold text-xl black py-1 text-primary">
              Transparent, Fair Billing{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Experience clarity and simplicity in billing. With Smart Inbox,
              you're charged only 50 cents per email response. You only pay for
              what you use - no hidden fees, no fine print.{" "}
            </p>
            <div className=" sm:w-[80%] sm:mt-10">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/tabs/Billing-GIF.gif"
                    className="w-auto sm:h-[354px] m-auto shadow-md "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smarteconomy;
