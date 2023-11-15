"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "../Common/Input/Input";
const Testimonial = () => {
  return (
    <div className="bg-white py-0 pb-6 sm:pb-0 sm:py-5 pt-0">
      <div className="pt-2 sm:pt-8 pb-4 sm:pb-16 cursor-pointer mx-auto max-w-[90%]">
        <div
          className={
            "js-show-on-scroll bg-type-section block sm:grid grid-cols-2 gap-[190px] shadow-2xl rounded-lg py-8 px-8 sm:py-20 md:py-20 lg:py-20  sm:px-12 lg:px-12 md:px-12   items-center relative"
          }
        >
          <div className=" ">
            {" "}
            <h2 className="mb-5 md:mb-0 font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none text-heading  ">
              Demo Fin now with your own support content
            </h2>
            <p className="my-8">
              Enter your help center URL to create a custom, shareable Fin demo.
              Fin will ingest your content and then use it to answer questions
              automatically.
            </p>
          </div>

          <div className="block sm:grid md:grid lg:grid grid-cols-1 gap-4  ">
            <input
              id="1"
              type="text"
              class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
              placeholder="Your work email"
            />
            <input
              id="1"
              type="text"
              class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
              placeholder="Your help center homepage link"
            />
            <button
              type={"submit"}
              className={
                "py-2 px-8 focus:ring-yellow-300 text-white w-full  mt-2 mb-4 sm:mb-0 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold bg-[#f5455c] hover:bg-black dark:focus:ring-yellow-900 "
              }
            >
              <div className="trytempo">
                <Link href="/checkout">Create demo &#8594; </Link>
              </div>
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-[#818992]">
        By sharing URL, you are confirming that you have the necessary right to
        share the content at this URL.
        <br />
        By submitting your email, you agree to receive marketing email related
        to the demo.
      </p>
    </div>
  );
};

export default Testimonial;
