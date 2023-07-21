"use client"
import React from "react";
import { ConfigureIntegration } from "../Integration/Integration";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const Integrationform = ({ setIntegrationform, name }) => {
  return (
    <>
      <div className="block sm:flex items-center justify-between">
        <div class="flex items-center gap-2 mt-8">
          <span
            className="text-[#b3b3b3] cursor-pointer"
            onClick={() => setIntegrationform(false)}
          >
            <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M6.99951 9L3.99994 6L6.99951 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
          <p class="text-black-color text-xl font-semibold">
            Configure {name}
          </p>
        </div>
        <div class="text-center my-3 flex justify-between items-center gap-3 sm:w-[27%]">
          <button class="py-2 px-8  w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary bg-white hover:bg-primary dark:focus:ring-yellow-900 rounded-lg hover:text-[white]" style={{ border: "1px solid #ebebeb" }}>
            Test connection</button>
          <button class="py-2 px-8  w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-white bg-primary hover:bg-white dark:focus:ring-yellow-900 rounded-lg hover:text-primary" style={{ border: "1px solid #ebebeb" }}>
            Create resource</button>
        </div>
      </div>

      <div className="pt-8">
        <div class="grid grid-cols-1 md:grid-cols-5">
          <div class="col-span-1 md:col-span-4 bg-red-300">
            <div className="sm:mr-8">
              <ConfigureIntegration
                fetchIntegrations="dummy"
                setShow="dummy"
                mode="dummy"
                integrationRecord="dummy"
                type="dummy"
              />
            </div>
          </div>
          <div class="col-span-4 md:col-span-1 bg-blue-300">
            <div className="bg-[#F9F9F9] p-5 rounded-md mt-5 sm:mt-0">
              <p className="font-semibold text-sm mb-2">Need help?</p>
              <a href="#" className="font-normal text-sm flex items-center gap-2 hover:text-primary">
                <BookOpenIcon className="h-4 w-4 text-gray-500" />
                <span className="">Rest API guide</span>
              </a>
              <a href="#" className="font-normal text-sm flex items-center gap-2 hover:text-primary">
                <BookOpenIcon className="h-4 w-4 text-gray-500" />
                <span>Troubleshoot connections</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Integrationform;
