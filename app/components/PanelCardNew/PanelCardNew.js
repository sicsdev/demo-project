"use client";
import React, { useEffect } from "react";
import Button from "../Common/Button/Button";
import Card from "../Common/Card/Card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import price_data from "./price_data";
import { useState } from "react";
import { getCalApi } from "@calcom/embed-react";
const Panelcardnew = () => {
  const router = useRouter();

  const handleGetFreeTrial = (e) => {
    router.push(`/checkout?plan=${e.target.id}`);
  };
  const [hide, setHide] = useState({
    first: false,
  });
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
  return (
    <div className="bg-white px-[16px] sm:py-[64px] py-[34px]">
      <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:mb-8 relative text-heading md:leading-[3rem]">

        AI Customer Service Solutions
      </h2>
      <div className="w-full   md:w-[80%] lg:w-[60%]  grid grid-cols-1 align sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-4 gap-4    mx-auto js-show-on-scroll">
        {price_data.map((ele, key) => (
          <div className="bg-[#F7F8FA] p-3">
            <div key={key}>
              <div className="flex items-center mr-4">
                <div className="relative w-[22px] h-[22px]">
                  <Image
                    fill={true}
                    src={ele.icons_svg}
                    className="bg-contain mx-auto"
                    alt="img"
                  />
                </div>{" "}
                <p className="ml-2 text-xl font-[600] text-gray-900 dark:text-gray-300">
                  {ele.title}
                </p>
              </div>
              {ele.title == "Starter" ? (
                <>
                  <p
                    className="text-[#6C727A] font-normal text-sm mt-6"
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setHide({ first: false });
                    }}
                  >
                    $200 free, then just{" "}
                    <span className="font-bold text-[#6C727A]"> $1 </span>per
                    ticket resolution{" "}
                    <span
                      className="cursor-pointer"
                      onMouseOver={(e) => {
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
                          className="text-[#6C727A]"
                          onMouseLeave={() =>
                            setTimeout(() => {
                              setHide({ first: false });
                            }, 5000)
                          }
                        >
                          Resolution is any conversation that does not result in
                          a human hand off or a customer marks as a bad answer
                          and has at least 3 total interactions.
                        </p>
                      </Card>
                    ) : (
                      ""
                    )}{" "}
                  </p>
                </>
              ) : (
                <p className="text-[#6C727A] font-normal text-sm mt-6">
                  Custom pricing. Schedule demo for proposal.
                </p>
              )}
               <div className=" mt-12 mb-12">
                {ele.title == "Starter" ? (
                  <button
                    className="my-6 w-full flex items-center justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 focus:ring-yellow-300 bg-[#F5455C]  text-white hover:shadow-[0_8px_9px_-4px_#F5455C] disabled:bg-input_color disabled:shadow-none disabled:text-white"
                    disabled={false}
                    id={key}
                    onClick={handleGetFreeTrial}
                  >
                    Get Started{" "}
                  </button>
                ) : (
                  <button
                    data-cal-link="tempoai/sales-call"
                    data-cal-config='{"layout":"month_view"}'
                    className="my-6 flex items-center justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 w-full focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">

                    Schedule Demo
                  </button>
                )}
              </div>
              <h3 className="font-bold text-heading my-6"> Includes:</h3>
              <ul>
                {ele.feature_list.map((element, key) => (
                  <li
                    key={key}
                    className="text-sm text-[#6C727A] flex gap-3 items-center my-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill=""
                      className="w-5 h-5 text-voilet"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {element.title}
                  </li>
                ))}
              </ul>

             
            </div>
          </div>
        ))}
      </div>
      {/* <div className="w-full   md:w-[80%] lg:w-[60%]  grid grid-cols-1 align sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-4 gap-4    mx-auto js-show-on-scroll">
        {price_data.map((ele, key) => (
          <Card
            className={`flex flex-col justify-between  ${ele.title == "Starter"
              ? "cursor-pointer bg-type-section  hover:bg-card_bg border border-border"
              : "cursor-pointer  bg-white   border border-border"
              }`}
          >
            <div key={key}>
              <div className="flex items-center mr-4">
                <div className="relative w-[22px] h-[22px]">
                  <Image
                    fill={true}
                    src={ele.icons_svg}
                    className="bg-contain mx-auto"
                    alt="img"
                  />
                </div>{" "}
                <p className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300 sm:text-[25px]">
                  {ele.title}
                </p>
              </div>
              {ele.title == "Starter" ? (
                <>
                  <p
                    className="text-slate font-normal text-sm my-4"
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setHide({ first: false });
                    }}
                  >
                    $200 free, then just{" "}
                    <span className="font-bold text-heading"> $1 </span>per
                    ticket resolution{" "}
                    <span
                      className="cursor-pointer"
                      onMouseOver={(e) => {
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
                          Resolution is any conversation that does not result in
                          a human hand off or a customer marks as a bad answer
                          and has at least 3 total interactions.
                        </p>
                      </Card>
                    ) : (
                      ""
                    )}{" "}
                  </p>
                </>
              ) : (
                <p className="text-slate font-normal text-sm my-4">
                  Custom pricing. Schedule demo for proposal.
                </p>
              )}

              <h3 className="font-bold text-heading my-6"> Includes:</h3>
              <ul>
                {ele.feature_list.map((element, key) => (
                  <li
                    key={key}
                    className="text-sm flex gap-3 items-center my-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill=""
                      className="w-5 h-5 text-voilet"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {element.title}
                  </li>
                ))}
              </ul>
            </div>
            {ele.title == "Starter" ? (
              <button
                className="flex w-full mx-auto  justify-center px-4 py-2 text-white hover:border   bg-[#fe9327] hover:text-white hover:bg-black rounded-md shadow-sm mt-7"
                disabled={false}
                id={key}
                onClick={handleGetFreeTrial}
              >
                Get Started{" "}
              </button>
            ) : (
              <button
                data-cal-link="tempoai/sales-call"
                data-cal-config='{"layout":"month_view"}'
                className="flex w-full font-bold mx-auto mt-7 justify-center px-4 py-2 text-white hover:outline-1 hover:outline-black hover:outline hover:bg-white hover:text-black bg-black rounded-md shadow-sm">

                Schedule Demo
              </button>
            )}
          </Card>
        ))}
      </div> */}
    </div>
  );
};

export default Panelcardnew;
