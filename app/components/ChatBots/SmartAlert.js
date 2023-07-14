import Image from "next/image";
import React from "react";
import { useState } from "react";
import Card from "../Common/Card/Card";
import Button from "../Common/Button/Button";

const SmartAlert = () => {
  const [hide, setHide] = useState({
    first: false,
  });
  return (
    <div className="bg-background py-6 sm:py-5">
    <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
      <div className="flex flex-col sm:grid sm:grid-cols-2">
        <div>
          <h2 className="font-bold  text-[25px] px-6 sm:px-0  sm:text-[25px] text-center  sm:my-8 sm:text-start leading-[35px] sm:ml-[75px] sm:leading-[44px] text-white">
          Navigate effortlessly with 24/7 Rapid Responses and Cross-Platform
          Integration{" "}          </h2>
        </div>

        <div>
          <Button
            className="flex  sm:w-full mx-auto max-w-[70%] sm:max-w-[50%] mt-4 sm:mt-10 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg- border border-gray-300 rounded-md shadow-sm checkout"
          >
            Learn more about security{" "}
          </Button>
        </div>
      </div>

      <div className="block sm:grid sm:grid-cols-2 justify-evenly ">
        <div className="p-4">
          <div className="flex justify-start gap-6">
            <div className="relative w-[90px] h-[35px]">
              <span className="flex sm:gap-3  text-custom-small  sm:mt-1 sm:text-3xl align-bottom font-semibold">
                {" "}
                &#x2713;
              </span>
            </div>
            <div>
              <h3 className="font-bold  text-[18px] md:text-h5 lg:text-h5 sm:text-h5    text-white">
              Rapid Responses Round-the-Clock{" "}
              </h3>
              <p className="text-[#e6f7fd]">
                  With Smart Inbox, time is no constraint. Even for extremely
                  complicated requests, count on us for responses within 5
                  minutes, 24/7. Stay ahead with unmatched speed and efficiency
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
                        "animate-fadeIn w-[320px]	sm:w-[400px]  absolute bg-white ml-[41px] sm:ml-[74px] mr-auto left-[25rem] right-0 z-[111]"
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
                        *Extremely complicated requests can be responded to
                        within 5 minute SLAs, but resolution within that
                        timeframe may require successfully integrating your
                        backend with Tempo.
                      </p>
                    </Card>
                  ) : (
                    ""
                  )}
                </p>
            </div>
          </div>
        </div>
        <div className="p-4 ">
          <div className="flex justify-start gap-6 ">
            <div className="relative w-[90px] h-[35px]">
              <span className="flex  sm:gap-3  text-custom-small  sm:mt-1 sm:text-3xl  align-bottom font-semibold">
                {" "}
                &#x2713;
              </span>
            </div>
            <div>
              <h3 className="font-bold text-[18px]  md:text-h5 lg:text-h5 sm:text-h5 text-white">
              Easy Integration Across Platforms{" "}
              </h3>
              <p className="text-white">
              We're committed to seamless solutions. Smart Inbox integrates
                  smoothly with your existing inboxes and major ticketing
                  systems including Zoho, Zendesk, Freshdesk, and Gorgias.
                  Enhance your workflow with effortless synchronicity.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 ">
          <div className="flex justify-start gap-6 ">
            <div className="relative w-[90px] h-[35px]">
              <span className="flex  sm:gap-3  text-custom-small  sm:mt-1 sm:text-3xl  align-bottom font-semibold">
                {" "}
                &#x2713;
              </span>
            </div>
            <div>
              <h3 className="font-bold text-[18px]  md:text-h5 lg:text-h5 sm:text-h5 text-white">
              Transparent Billing Tailored to You{" "}
              </h3>
              <p className="text-[#e6f7fd]">
                  With Smart Inbox, we champion fair play. We charge a
                  straightforward rate of 50 cents per email response, providing
                  clarity and simplicity in our billing. Pay only for what you
                  use and nothing more.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SmartAlert;
