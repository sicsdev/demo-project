"use client";
import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import SkeletonLoader from "../Skeleton/Skeleton";
const Defencegradeslider = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleClick = (index) => {
    setSelectedItemIndex(selectedItemIndex === index ? index : index);
    setProgress(0);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const data = [
    {
      img1: "/monday_logo_icon_168967_1.png",
      img2: "/integrations/1.svg",
      number: "01",
      title: "Optimize Task Management & Scheduling",
      text: "Enhance your team's efficiency in task management, project tracking, and scheduling.",
    },
    {
      img1: "/integrations/3.svg",
      img2: "/twilio-logo-png-transparent.png",
      number: "02",
      title: "Boost Communication Efficiency",
      text: "Automate essential communication processes, from email notifications to SMS alerts.",
    },
    {
      img1: "/pay.png",
      img2: "/integrations/square.svg",
      number: "03",
      title: "Revolutionize Your Retail Billing",
      text: "Streamline checkout processes and enhance transaction efficiency to boost sales performance.",
    },
    {
      img1: "/teams.png",
      img2: "/slack-logo-icon.png",
      number: "04",
      title: "Unify Your Communication Channels",
      text: "Create a cohesive and efficient communication ecosystem across your organization.",
    },
    {
      img1: "/stripee.png",
      img2: "/brain.png",
      number: "05",
      title: "Simplify Billing and Payments",
      text: "Automate invoicing, payments, and subscription management within Deflection AI Chat.",
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1) % 101);

      if (progress === 100) {
        setSelectedItemIndex((prevIndex) => (prevIndex + 1) % data.length);
        setProgress(0);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [progress, data.length]);

  return (
    <>
      <div className="bg-[#f7f8fa] py-10 sm:pb-20 sm:px-1 px-4 special">
        <div className="grid max-w-[90%] mx-auto sm:max-w-[70%] sm:py-10">
          <div className="sm:grid sm:grid-cols-2 grid grid-col-1 transition-all duration-500">
            <div className="">
              <div className="hidden sm:block sticky top-[230px]">
                {loading ? (
                  <div className="mb-5 sm:mt-0 sm:mb-5 mt-5 text-black   text-xl sm:text-[25px] sm:w-[350px] md:w-[350px] ">
                    <SkeletonLoader height={50} />
                  </div>
                ) : (
                  <h1 className="mb-5 sm:mt-0 sm:mb-5 mt-5 text-black   text-xl sm:text-[25px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] md:text-[25px] font-semibold  sm:leading-[1.4em]">
                  {data[selectedItemIndex].title}
                  </h1>
                )}
                {loading ? (
                  <div className="sm:mb-5 mb-5 sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px]">
                    <SkeletonLoader height={50} />
                  </div>
                ) : (
                  <p className="sm:mb-5 mb-5 sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px]">
                  {data[selectedItemIndex].text}
                  </p>
                )}
                {loading ? (
                  <div className="sm:mb-5 mb-5 sm:h-[300px] sm:w-[300px]">
                    <SkeletonLoader className="h-[300px]" />
                  </div>
                ) : (
                  <div className=" justify-start">
                    <div className="flex flex-row gap-5 absolute top-[110px]">
                        <div className="relative w-[50%] h-[45px] sm:w-[45px] mt-[3rem] sm:mt-[5rem] sm:h-[45px]">
                          <img
                          src={data[selectedItemIndex].img1}
                            className="w-full mx-auto bg-contain object-cover h-[100%] sm:h-auto"
                            fill={true}
                          />
                        </div>
                        <div className="relative w-[50%] h-[45px] sm:w-[45px] mt-[3rem] sm:mt-[5rem] sm:h-[45px]">
                        <img
                        src={data[selectedItemIndex].img2}
                          className="w-full mx-auto bg-contain object-cover h-[100%] sm:h-auto"
                          fill={true}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className=" sm:hidden block">
              {loading ? (
                <div className="mb-5 sm:mt-0 mt-5 text-black px-3 text-center text-2xl sm:text-[38px] font-bold sm:mb-0">
                  <SkeletonLoader height={50} />
                </div>
              ) : (
                <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3 text-center text-2xl sm:text-[38px] font-bold sm:mb-0">
                  {data[selectedItemIndex].title}
                </h1>
              )}
              {loading ? (
                <div className="sm:mb-5 mb-5">
                  <SkeletonLoader height={50} />
                </div>
              ) : (
                <p className="sm:mb-5 mb-5">
                  {data[selectedItemIndex].text}
                </p>
              )}
            </div>
            <div>
              {data.map((ele, key) => (
                loading ? (
                  <div className="sm:w-[95%] scroll-child w-[100%] sm:ml-10">
                    <SkeletonLoader height={120} />
                  </div>
                ) : (
                  <div
                    className="sm:w-[95%] scroll-child w-[100%] sm:ml-10"
                    key={key}
                  >

                    <div
                      className="flex cursor-pointer text-2xl font-normal my-5"
                      onClick={() => handleClick(key)}
                    >
                      <div
                        className="text-[#9EA2A8] p-[6px] text-base"
                        style={{ fontFamily: "Roboto Mono" }}
                      >
                        <p>{ele.number}</p>
                      </div>
                      <div className="flex justify-between w-[100%]">
                        <p className="ml-3 text-2xl font-medium">{ele.title}</p>
                        <PlusIcon
                          className={`h-6 w-[38px] text-gray-500 transform `}
                        />
                      </div>
                    </div>
                    <div
                      className={
                        selectedItemIndex === key
                          ? "h-auto my-3 ml-8 text-text-dark-color"
                          : "h-[50px] overflow-hidden"
                      }
                    >
                      {selectedItemIndex === key ? (
                        <div>
                          <p>{ele.text}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="w-full h-1 bg-graywhite">
                      <div
                        className={
                          selectedItemIndex === key
                            ? "h-1 bg-gray rounded-full"
                            : ""
                        }
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Defencegradeslider;