"use client";
import Card from "@/app/components/Common/Card/Card";
import Container from "@/app/components/Container/Container";
import React, { useEffect } from "react";
import FaqAccordian from "@/app/components/FaqAccordian/Faq";
import { price_data, questions } from "./data";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/Common/Button/Button";
import DTC from "@/app/components/DTC/DTC";
import Testimonial from "@/app/components/Testimonial/Testimonial";
import Resource from "@/app/components/Resource/Resource";
import Iconanimation from "@/app/components/Iconanimation/Iconanimation";
import Trial from "@/app/components/Trial/Trial";
import Image from "next/image";
const Pricing = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailQuery = searchParams.get("email");
  const handleGetFreeTrial = (select) => {
    router.push(`/checkout?plan=${select}`);
  };
  useEffect(() => {
    const callback = function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        } else {
          entry.target.classList.remove("animate-fadeIn");
        }
      });
    };
    const observer = new IntersectionObserver(callback);
    const targets = document.querySelectorAll(".js-show-on-scroll");
    targets.forEach(function (target) {
      target.classList.add("opacity-0");
      observer.observe(target);
    });
  }, []);

  // return (
  //     <div>
  //         <Container>
  //             <h1 className='text-center text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold text-heading'>Choose your plan</h1>
  //             <div className='w-full sm:w-[60%] md:w-[60%] lg:w-[60%]  grid grid-cols-1 align sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-4 gap-4 mx-auto js-show-on-scroll'>
  //                 {price_data.map((ele, key) =>
  //                     <Card className={'cursor-pointer bg-white hover:bg-card_bg border border-border'} key={key} >
  //                         <div>
  //                             <div className="flex items-center mr-4">
  //                                 <label htmlFor="purple-radio" className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300">{ele.title}</label>
  //                             </div>
  //                             <p className='text-slate font-normal text-sm my-4'>$200 in free credits then <span className='font-bold text-heading'>$0.25 per chat & $0.50 per email/</span>mo</p>
  //                             <h3 className='font-bold text-heading my-6'> Plan includes:</h3>
  //                             <ul>
  //                                 {ele.feature_list.map((element, key) =>
  //                                     <li key={key} className='text-sm flex gap-3 items-center my-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="w-5 h-5 text-voilet">
  //                                         <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  //                                     </svg>
  //                                         {element.title}</li>
  //                                 )}
  //                             </ul>
  //                         </div>
  //                         <Button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm" disabled={false} onClick={(e) => handleGetFreeTrial(key)}>Get Free Trial</Button>
  //                     </Card>
  //                 )}

  return (
    <div>
      <Container>
        <h1 className="text-center text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold text-heading">
          Choose your plan
        </h1>
        <div className="w-full sm:w-[60%]  md:w-[60%] lg:w-[60%]  grid grid-cols-1 align sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-4 gap-4 mx-auto js-show-on-scroll">
          {price_data.map((ele, key) => (
            <Card
              className={
                ele.title == "Starter"
                  ? "cursor-pointer bg-type-section hover:bg-card_bg border border-border"
                  : "cursor-pointer  bg-white  hover:bg-card_bg border border-border"
              }
              key={key}
            >
              <div>
                <div className="flex items-center mr-4">
                  <div className="relative w-[22px] h-[22px]">
                    <Image
                      fill={true}
                      src={ele.icons_svg}
                      className="bg-contain mx-auto"
                      alt="img"
                    />
                  </div>{" "}
                  <label
                    htmlFor="purple-radio"
                    className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300"
                  >
                    {ele.title}
                  </label>
                </div>
                {ele.title == "Starter" ? (
                  <p className="text-slate font-normal text-sm my-4">
                    $200 free, then just{" "}
                    <span className="font-bold text-heading"> 25¢ </span>per
                    chat and
                    <span className="font-bold text-heading"> 50¢ </span>per
                    email
                  </p>
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
                <Button
                  className="flex w-full mx-auto mt-[52px] justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm"
                  disabled={false}
                  onClick={(e) => handleGetFreeTrial(key)}
                >
                  Get Free Trial
                </Button>
              ) : (
                <Button
                  dangerouslySetInnerHTML={{
                    __html: `
             <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
             <span className="underline cursor-pointer text-white font-bold">                            Schedule Demo

             </span>
             </a>
            `,
                  }}
                  className="flex w-full font-bold mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm"
                ></Button>
              )}
            </Card>
          ))}
        </div>
      </Container>
      <DTC />
      <Testimonial />
      <Iconanimation />
      {/* <Trial /> */}
      {/* <Resource /> */}

      {/* Pricing section */}
      <div className="bg-white pt-4">
        <div className="pb-4 sm:pb-16 mx-auto max-w-[90%] py-10">
          <h6 class="font-bold text-xl black py-1 text-primary">
            Pricing
          </h6>
          <h1 class="text-left text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold text-heading">
            Know what you'll pay
          </h1>

          <div class="flex flex-wrap mt-8 shadow-sm">
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="font-bold text-heading border-l-2 border-[#2563EB] px-4">
                  Pay-as-you-go
                </p>
                <h6 class="font-bold cursor-pointer text-xs black py-1 text-primary mt-1 px-4">
                  Pricing details {">"}
                </h6>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="text-sm font-normal text-heading px-4">
                  With Tempo AI, pay only for the usage you accumulate. No
                  charges for one week, or until you’ve accumulated $100
                </p>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="border-l-2 border-[#2563EB] h-[100%]">
                <div className="py-6">
                  <p class="text-md font-bold text-heading px-4">25 cents</p>
                  <p class="text-sm font-normal text-heading px-4">per chat response</p>

                  <p class="text-md font-bold text-heading px-4 mt-4">50 cents</p>
                  <p class="text-sm font-normal text-heading px-4">per email response</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-6 shadow-sm">
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="font-bold text-heading border-l-2 border-[#2563EB] px-4">
                  Free signup bonus
                </p>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="text-sm font-normal text-heading px-4">
                  For a limited time only, get $200 in free Tempo free credits
                  when you sign up.
                </p>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="border-l-2 border-[#2563EB] h-[100%]">
                <div className="py-6">
                  <p class="text-md font-bold text-heading px-4">$200</p>
                  <p class="text-sm font-normal text-heading px-4">credits</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-8 shadow-sm">
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="font-bold text-heading border-l-2 border-[#2563EB] px-4">
                No added fees
                </p>
                <h6 class="font-bold cursor-pointer text-xs black py-1 text-primary mt-1 px-4">
                  Learn more {">"}
                </h6>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="text-sm font-normal text-heading px-4">
                At Tempo, there are no cost to onboard and connect Osay [ $0
                </p>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="border-l-2 border-[#2563EB] h-[100%]">
                <div className="py-6">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing section */}

      <Container>
        <FaqAccordian title={"Frequently Asked Questions"} items={questions} />
      </Container>
    </div>
  );
};

export default Pricing;
