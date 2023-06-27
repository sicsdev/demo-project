"use client";
import React, { useEffect } from "react";
import Subprocessor from "@/app/components/Get-Start/Subprocessor";

const page = () => {
  return (
    <div className="bg-white">
      <div className=" block sm:flex md:flex lg:flex justify-evenly items-center gap-10 ">
        <div>
          <h1 className=" font-bold  p-5 text-3xl text-heading  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none ">
            List of subprocessors
          </h1>
        </div>
        <div className=" max-w-[90%] sm:max-w-[30%] pl-6  pr-6 sm:pl-0 sm:pr-0  ">
          <hr class="h-px mt-0  sm:my-8 bg-black border-0 dark:bg-gray-700" />

          <h1 className=" font-bold  text-xl text-heading  md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
            Last updated and effective as of: December 7, 2022
          </h1>
        </div>
      </div>
      <hr class="h-px my-8 bg-black border-0 dark:bg-gray-700" />
      <div className=" pl-4 pr-4 sm:pl-0 sm:pr-0">
        <p className="text-heading font-normal text-para  pt-0 sm:pt-3 mb-4">
          Below is a list of subprocessors we work with and the purpose for why
          we use their services.
        </p>
      </div>
      <Subprocessor />
      <div className=" pl-4 pr-4 sm:pl-0 sm:pr-0">
        <p className="text-heading font-normal text-para  pt-3 pb-5  mt-9">
          For more information about Tempo data handling practices, please
          read our  <span className="text-[blue] cursor-pointer">Privacy Policy</span>  and Data Processing Addendum. For any other
          questions, please email privacy@ketch.com.
        </p>
      </div>
    </div>
  );
};

export default page;
