import React from "react";

const Smarteconomy = () => {
  return (
    <div className="bg-white">
      <div className=" mx-auto max-w-[90%] sm:max-w-[90%]   py-10">
        <div className="sm:max-w-[50%] w-full">
          {/* <h6 class="font-bold text-xl black py-1 text-primary">Pricing</h6> */}
          <h1 class="text-left text-2xl tracking-wide text-heading sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold ">
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
              24/7 Email Support{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Whether it's day or night, no email remains unanswered. Smart
              Inbox provides 24/7 support to handle all your email tickets
              promptly, guaranteeing a response time of less than 5 minutes.
            </p>{" "}
            <div className=" sm:w-[80%] sm:mt-5">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/ticketed_sales.webp"
                    className="w-full sm:h-[354px] m-auto shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
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
            <div className=" sm:w-[80%] sm:mt-5 ">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/tips_from_fans.webp"
                    className="w-full sm:h-[354px] m-auto shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h6 class="font-bold text-xl black py-1 text-primary">
              Seamless Integration{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Experience the ease of one-click integration. Connect your
              payments, CRM, inventory management, and backend systems to Smart
              Inbox in an instant.
            </p>{" "}
            <div className=" sm:w-[80%] sm:mt-5">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/membership_subscriptions.webp"
                    className="w-full sm:h-[354px] m-auto shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
       
          <div className="">
            {" "}
            <h6 class="font-bold text-xl black py-1 text-primary">
              Transparent, Fair Billing{" "}
            </h6>
            <p className="sm:mt-4 text-justify">
              Experience clarity and simplicity in billing. With Smart Inbox,
              you're charged only 50 cents per email response. You only pay for
              what you use - no hidden fees, no fine print.{" "}
            </p>
            <div className=" sm:w-[80%] sm:mt-5">
              <div className="w-full  mt-[40px] sm:mt-0">
                <div className="h-[100%]  mb-6 sm:mb-0">
                  <img
                    src="/digital_wallet.webp"
                    className="w-full sm:h-[354px] m-auto shadow-md "
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
