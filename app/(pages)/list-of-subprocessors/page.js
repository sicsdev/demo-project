"use client";
import React, { useEffect } from "react";
import Subprocessor from "@/app/components/Get-Start/Subprocessor";
import { Homeform } from "@/app/components/LayoutNew/Homeform";
import { useRef } from "react";

const page = () => {
  const ref = useRef()
  return (
    <div className="bg-white">
      <div className=" block sm:flex md:flex lg:flex  items-center gap-10 sm:pt-8">
        <div className="">
        <h2 className="block !font-[700] text-2xl md:text-[38px]    my-[1rem] md:mb-8 relative text-heading md:leading-[3rem]">
        List of subprocessors      </h2>
        </div>
        <div className="max-w-[90%] sm:max-w-[30%] pl-6 pr-6 sm:pl-0 sm:pr-0 ">
          {/* <hr class="h-px mt-0 sm:my-8 bg-black border-0 dark:bg-gray-700" /> */}
          {/* <h1 className="font-bold text-xl text-heading md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none border-t pt-4">
              Last updated and effective as of: December 7, 2022
          </h1> */}
        </div>
      </div>
      <hr class="h-px my-8 bg-black border-0 dark:bg-gray-700" />
      <div className="pl-4 pr-4 sm:pl-0 sm:pr-0">
        <p className="text-blue-400 w-full sm:mb-5 sm:w-[80%] font-[400] text-heading xs:flex-row xs:flex-col sm:flex  text-[16px] leading-[22px] sm:text-[24px] sm:leading-8 gap-2">
          Below is a list of subprocessors we work with and the purpose for why
          we use their services.
        </p>
      </div>
      <Subprocessor />
      <div className=" pl-4 pr-4 sm:pl-0 sm:pr-0 sm:mt-6">
      <p className="text-blue-400 w-full sm:mb-5 sm:w-[100%] font-[400] text-heading xs:flex-row xs:flex-col sm:flex  text-[16px] leading-[22px] sm:text-[24px] sm:leading-8 gap-2">
        If you have any questions, please email <span className="text-[blue] cursor-pointer">security@usetempo.ai.</span> Please read our Privacy Policy for more information.
        
        </p>
      </div>
      {/* <Homeform reff={ref} /> */}
    </div>
  );
};

export default page;
