import Image from "next/image";
import React, { useState } from "react";
import Card from "../Common/Card/Card";
const SmartAlert = () => {
  const [hide, setHide] = useState({
    first: false,
    second: false,
    third: false,
  });
  return (
    <div className="bg-background py-6 sm:py-5">
      <div
        className="max-w-[1400px] w-full m-auto sm:py-14  px-0 sm:px-14  relative group"
        onClick={() =>
          setHide({ first: false, second: false, third: false, fourth: false })
        }
      >
        <h2 className="font-bold  text-2xl  md:text-h4  text-center  sm:my-8  leading-[40px] sm:leading-[60px] text-white">
          Navigate effortlessly with 24/7 Rapid Responses and Cross-Platform
          Integration{" "}
        </h2>
        <div className="block sm:flex md:flex lg:flex justify-evenly gap-10">
          <div className="p-4 pr-[0px] sm:p-[0] sm:pl-[0px]">
            <div className="sm:flex justify-center items-center mx-auto sm:w-[800px] ">
              <div className="relative  sm:h-[200px] w-100 sm:w-[543px] flex items-center">
                <img
                  src="/first.webp"
                  className="bg-contains w-full"
                  fill={true}
                />
              </div>

              <div className="w-[100%]">
                <h3 className="font-bold  text-[18px] md:text-h5 lg:text-h5 sm:text-h5    text-[#ffff]">
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
              <div className="text-center sm:flex sm:items-center"></div>
            </div>
            <div className="sm:flex justify-center items-center mx-auto sm:w-[800px] mt-6">
              <div className="relative h-100 sm:h-[200px] w-100 sm:w-[543px]  flex items-center">
                <img
                  src="/second.webp"
                  className="bg-contains w-full"
                  fill={true}
                />
              </div>
              {/* <div className="relative w-[90px] h-[35px]">
                <span className="flex  sm:gap-3  text-custom-small  sm:mt-1 sm:text-3xl  align-bottom font-semibold">
                  {" "}
                  &#x2713;
                </span>
              </div> */}
              <div className="w-[100%]">
                <h3 className="font-bold text-[18px]  md:text-h5 lg:text-h5 sm:text-h5 text-white">
                  Easy Integration Across Platforms{" "}
                </h3>
                <p className="text-[#e6f7fd]">
                  We're committed to seamless solutions. Smart Inbox integrates
                  smoothly with your existing inboxes and major ticketing
                  systems including Zoho, Zendesk, Freshdesk, and Gorgias.
                  Enhance your workflow with effortless synchronicity.
                </p>
              </div>
            </div>
            <div className="sm:flex justify-center items-center sm:w-[800px] mx-auto  mt-6">
              <div className="relative h-100 sm:h-[200px] w-100 sm:w-[543px]  flex items-center">
                <img
                  src="/threeee.webp"
                  className="bg-contains w-full"
                  fill={true}
                />
              </div>

              <div className="w-[100%]">
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
