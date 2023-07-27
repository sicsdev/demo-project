// "use client";
import React from "react";
import Button from "../Common/Button/Button";
import Card from "../Common/Card/Card";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import price_data from "./price_data";

const Panelcardnew = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailQuery = searchParams.get("email");

  const handleGetFreeTrial = (e) => {
    router.push(`/checkout?plan=${e.target.id}`);
  };

  return (
    
    <div className="bg-white p-[64px] ">
      <h1 className="text-center text-2xl tracking-wide sm:text-h2 sm:mt-[-28px] sm:mb-[50px] font-bold text-heading">
        Choose your plan
      </h1>
      <div className="w-full sm:w-[60%]  md:w-[60%] lg:w-[60%]  grid grid-cols-1 align sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-4 gap-4 mx-auto js-show-on-scroll">
        {price_data.map((ele, key) => (
          <Card
            className={`flex flex-col justify-between ${
              ele.title == "Starter"
                ? "cursor-pointer bg-type-section hover:bg-card_bg border border-border"
                : "cursor-pointer  bg-white  hover:bg-card_bg border border-border"
            }`}
          >
            <div 
            key={key}
            
            >
              <div className="flex items-center mr-4">
                <div className="relative w-[22px] h-[22px]">
                  <Image
                    fill={true}
                    src={ele.icons_svg}
                    className="bg-contain mx-auto"
                    alt="img"
                  />
                </div>{" "}
                <p className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300">
                  {ele.title}
                </p>
              </div>
              {ele.title == "Starter" ? (
                <>
                  <p className="text-slate font-normal text-sm my-4">
                    $200 free, then just{" "}
                    <span className="font-bold text-heading"> $1 </span>per
                    ticket resolution{" "}
                  </p>
                </>
              ) : (
                <p className="text-slate font-normal text-sm my-4">
                  Custom pricing. Schedule demo for proposal.
                </p>
              )}

              <h3 className="font-bold text-heading my-6"> Plan includes:</h3>
              <ul>
                {ele.feature_list.map((element, key) => (
                  <li
                    key={key}
                    className="text-sm flex gap-3 items-center my-2"
                  >
                    {/* <svg
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
                    </svg> */}
                    {element.title}
                  </li>
                ))}
              </ul>
            </div>
            {ele.title == "Starter" ? (
              <Button
                className="flex w-full mx-auto  justify-center px-4 py-2 text-white hover:border   bg-[#fe9327] hover:text-white hover:bg-black rounded-md shadow-sm"
                disabled={false}
                id={key}
                onClick={handleGetFreeTrial}
              >
                Get Started{" "}
              </Button>
            ) : (
              <Button
                className="flex w-full font-bold mx-auto mt-7 justify-center px-4 py-2 text-white hover:outline-1 hover:outline-black hover:outline hover:bg-white hover:text-black bg-black rounded-md shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  Calendly.initPopupWidget({
                    url: "https://calendly.com/tempo-sales/30min",
                  });
                }}
              >
                Schedule Demo
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Panelcardnew;
