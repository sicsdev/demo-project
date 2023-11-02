"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";
import Link from "next/link";
const Concierge = () => {
  
const [loading, setLoading]=useState(true)
useEffect(()=>{

  setTimeout(() => {
    setLoading(false)
  }, 3000);

},[]) 
const data = [
    {
      name: "Optimize Task Management & Scheduling   ",
      para: "Enhance your team's efficiency in task management, project tracking, and scheduling.   ",
      img: ["/integrations/1.svg", "/linear-logos-id-IUp6ZRH.png"],

    },
    {
      name: "Boost Communication Efficiency      ",
      para: "Automate essential communication processes, from email notifications to SMS alerts. ",
      img: ["/integrations/3.svg", "/twilio-logo-png-transparent.png"],
    },
    {
      name: "Elevate Your Sales Game   ",
      para: "Automate lead qualification, routing, and follow-ups to drive revenue growth.  ",
      img: ["/HUBS-3bd277ce.png", "/salesforce-logo.png"],
    },
    {
      name: "Unify Your Communication Channels  ",
      para: "Create a cohesive and efficient communication ecosystem across your organization.    ",
      img: ["/teams.png", "/slack-logo-icon.png"],
    },
    {
      name: "Simplify Billing and Payments   ",
      para: "Automate invoicing, payments, and subscription management within Tempo Chat.   ",
      img: ["/pay.png", "/stripee.png"],
    },
  ];
  return (
    <div className="bg-white">
      <div className=" mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]  py-10">
        <div>
     
            <>
          <h1 className="   mb-5  sm:p-0 sm:mt-0 mt-0 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
            Integrate Across Your Tech Stack and seamlessly connect
          </h1>
          <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
            Seamlessly connect with a wide range of APIs to supercharge your
            customer service.{" "}
          </p>
          </>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:mt-12 gap-[30px] ">
          {data.map((ele) => (
            
            <div className="shadow-lg p-9 pb-[90px] rounded-[20px] relative sm:h-[300px] ">
              <div>
         
            <>
              <p className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-bold text-[20px] sm:text-[24px] text-[black]" > {ele.name}</p>

              <p className="p-0 py-2 sm:p-3  md:px-0 ">{ele.para}</p>

              <div className="flex flex-row gap-5 absolute bottom-[25px]">
                {ele.img.map((ele) => (
                  <div className="relative w-[50%] h-[45px] sm:w-[45px] mt-[3rem] sm:mt-[5rem] sm:h-[45px]">
                    <img
                      src={ele}
                      className="w-full mx-auto bg-contain object-cover h-[100%] sm:h-auto"
                      fill={true}
                    />
                  </div>
                ))}
              </div>
              </>
          
          </div>
            </div>
          ))}

          <div className="shadow-lg sm:p-[18px] p-5 rounded-[20px] bg-type-section">
         
       
            <p className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-bold text-[20px] sm:text-[24px] text-[black]">
              {" "}
              Anywhere and Everywhere
            </p>
          
                   
         
            <>
            <p className="p-0 py-2 sm:p-3  md:px-0">
              Tempo Chat's adaptability allows for deployment in virtually any
              customer interaction scenario. Whatever your use case, we've got a
              solution
            </p>

            <div className="block sm:flex w-[100%] items-center gap-8 mt-[3rem] sm:mt-[5rem]">
       
                <button
                  type="button"
                  className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
                >
                  <Link href={"/checkout"}>Start Now</Link>
                </button>
            </div>
            </>
          
          </div>
        </div>

   
      </div>
    </div>
  );
};

export default Concierge;
