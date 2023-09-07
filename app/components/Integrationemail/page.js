"use client";
import React, { useState } from "react";
import { InformationCircleIcon, ShareIcon } from "@heroicons/react/24/outline";
import Card from "@/app/components/Common/Card/Card";

const Integrationemail = () => {
  return (
    <>
      <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <a
              href="#"
              className=" flex justify-start gap-2 items-center  py-2 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
              aria-current="page"
            >
              <ShareIcon className="h-5 w-5 text-primary" /> Email Settings
            </a>
          </li>
        </ul>
      </div>

      <div className="dark:border-gray-700 flex items-center justify-between">
        <Card className="w-full p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
          <div className="flex justify-between items-center mt-4 pb-2">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Email Introduction
              </h3>
            </div>
            <p className="cursor-pointer text-sm">Edit</p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-4 pb-2">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Agent Job Title
              </h3>
            </div>
            <p className="cursor-pointer text-sm">Edit</p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-4 pb-2">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Email Sign-Off
              </h3>
            </div>
            <p className="cursor-pointer text-sm">Edit</p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-4 pb-2">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Agent Name(s)
              </h3>
            </div>
            <p className="cursor-pointer text-sm">Edit</p>
          </div>
          <hr className="border-border" />
        </Card>
      </div>

    </>
  );
};

export default Integrationemail;
