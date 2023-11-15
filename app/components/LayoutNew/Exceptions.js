"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
const Exceptions = () => {
  const reachData = [
    {
      reach: "99.999%",
      name: "Higher CSATs",
      para: "Companies using our platform can anticipate higher customer satisfaction scores, contributing to overall customer loyalty.",
      link_title: "Leverage your data",
    },
    {
      reach: "99.999%",
      name: "More Deflections ",
      para: "Experience a significant reduction in the number of tickets that require human intervention, optimizing your operations.",
      link_title: "Leverage your data",
    },
    {
      reach: "55++",
      name: "24/7/365 Uptime",
      para: "Benefit from round-the-clock system availability, ensuring uninterrupted service for your customers.",
      link_title: "Leverage your data",
    },
  ];

  return (
    <div className="bg-white special">
      <div className="mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%] py-10">
        <div className="grid grid-cols-1 sm:grid-cols-1 sm:mt-12 gap-[30px]  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[214px]">
            <div className="">
              <div className="hidden sm:block sticky top-[230px]">
                <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3 text-justify text-2xl sm:text-[38px] font-bold sm:mb-0 sm:leading-[1.4em]">
                  Platform for intelligent,{" "}<br/>
                  <span className="text-[#2563eb]">high-growth</span> companies{" "}
                </h1>
              </div>
              <div className=" sm:hidden block">
                <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3 text-center text-2xl sm:text-[38px] font-bold sm:mb-0">
                  Platform for intelligent,{" "}
                  <span className="text-[#2563eb]">high-growth</span> companies{" "}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1">
              {reachData.map((ele, key) => (
                <div
                  style={{ borderBottom: "1px solid rgba(203, 206, 209, .5)" }}
                  className={` scroll-child ${
                    key == 0 ? "sm:pt-[0px]" : "sm:pt-[20px]"
                  } ${
                    key == 2 ? "sm:pb-[0px] !border-b-0" : "sm:pb-[16px]"
                  } sm:px-[40px]  `}
                  key={key}
                >
                  <div className="flex flex-row sm:gap-[2rem] gap-4">
                    <p className="text-[#f78f26]   text-sm mt-8 sm:mt-3">
                      {" "}
                      0{key + 1}{" "}
                    </p>
                    <p className="text-[heading] text-sm mt-8 sm:mt-3 sm:text-[24px]">
                      {ele.name}
                    </p>
                  </div>
                  <div className="sm:pl-[49px] pt-[10px] sm:pt-[20px]">
                    <p className="text-[#474F70] text-sm sm:text-[16px]  mt-8 sm:mb-0 mb-3 sm:mt-3 sm:leading-[1.8em]">
                      {ele.para}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exceptions;
