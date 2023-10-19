"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";
import { AcademicCapIcon, EnvelopeIcon, ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/outline";

const Communication = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  const tabs = [
    {
      id: "1",
      title: "Chat Automation            ",
      logo: <ChatBubbleLeftIcon className="h-[84px] w-10 text-gray-500" />,
      content_video: "/ChatAutomation.png",
      h3: "Elevate your customer service with Smart IVR.",
      p: "Automate support to increase efficiency and customer satisfaction through effective deflections.           ",
    },
    {
      id: "2",
      title: "Email Automation            ",
      logo: <EnvelopeIcon className="h-[84px] w-10 text-gray-500" />,


      content_video: "/EmailAutomation.png",
      h3: "Elevate your customer service with Smart IVR.",
      p: "Automate email interactions with intelligent workflows, ensuring timely and relevant responses to customer queries.",
    },
    {
      id: "3",
      title: "Learning Center            ",
      logo: <AcademicCapIcon className="h-[84px] w-10 text-gray-500" />,
      content_video: "/LearningCenter.png",
      h3: "Elevate your customer service with Smart IVR.",
      p: "Continuously refine your service through daily AI recommendations, enhancing workflows and knowledge bases.",
    },
    {
      id: "4",
      title: "Integrations",
      logo: <ShareIcon className="h-[84px] w-10 text-gray-500" />,
      content_video: "/Integration.png",
      h3: "Elevate your customer service with Smart IVR.",
      p: "Integrate with your favorite business tools to implement advanced automations through workflows, enhancing operational efficiency.",
    },
  ];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-white pt-5 px-5 sm:px-0 sm:pt-8 sm:pb-14 py-0 sm:py-8 ">
      <div>
        {loading ? (
          <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
            <SkeletonLoader height={30} width={"70%"} />
          </div>
        ) : (
          <h2 class="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]" >
            Tempo AI-Powered Customer Service Platform
          </h2>
        )}
        {loading ? (
          <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
            <SkeletonLoader height={30} width={"50%"} />
          </div>
        ) : (
          <p className="text-blue-400 w-full md-w-[339px] text-center font-[400] text-heading xs:flex-row xs:flex-col sm:flex justify-center text-[16px] leading-[22px] sm:text-[24px] sm:leading-8 gap-2">
            Unify and automate customer engagement across your organization with
            our intelligent, AI-driven solutions.
          </p>
        )}
        {/* {loading ? (
          <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
            <SkeletonLoader height={30} width={"20%"} />
          </div>
        ) : (
          <button className="text-[black] !mt-3 communi w-full sm:mt-4 sm:flex justify-center hover:text-heading my-3 text-center sm:my-0 text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg sm:mb-10">
            <Link href="/checkout"> Learn more →  </Link>
          </button>
        )} */}
      </div>
      <div className="md:mx-0 mx-4 low-section block md:hidden mb-5">
        <div className="flex flex-col justify-center">
          {tabs.map((ele, key) => (
            <div
              className={`flex flex-col `}
            >
              {loading ? (
                <div className=" py-1 sm:mt-12  px-1 rounded-full">
                  <SkeletonLoader height={30} width={200} />
                </div>
              ) : (
                <div className={` ${key == activeTab ? "border-b-[1px] border-[#fe9327] text-[#fe9327]" : ""} flex flex-row`}>
                  <p>  {ele.logo} </p>

                  <p
                    className={`${key == activeTab ?"":""} font-semibold h-[65px] text-[17px] flex items-center relative justify-start sm:justify-start sm:pl-[40px] gap-1 w-100 text-center my-2 py-2 cursor-pointer px-3 sm:px-6 start-rainbow   `}
                    key={key}
                    onClick={() => handleTabChange(key)}
                  >
                    {ele.title}
                  </p>
                </div>
              )}

              {loading && key == activeTab ? (
                <div className=" py-1 sm:mt-8  px-1 rounded-full">
                  <SkeletonLoader height={80} width={350} />
                </div>
              ) : (
                <>
                  {key == activeTab ? (
                    <div className=" flex flex-col  self-center	md:w-[420px] px-[41px] pt-[27px]">
                      <p className="text-blue-400 w-full   text-left  md:w-full text-heading xs:flex-row xs:flex-col md:flex justify-center text-[16px] leading-[22px] md:text-para lg:text-para md:text-para md:leading-8 gap-2">
                        {tabs[0].p}
                      </p>
                      <button className="text-white text-left pt-[20px]  w-full md:mt-4 md:flex justify-start hover:text-heading my-3  md:my-0  text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg">
                        <Link
                          href="/checkout"
                          className=" px-[20px] py-[8px] rounded-[25px] bg-[#fe9327] hover:bg-black hover:text-white"
                        >
                          {" "}
                          Learn more
                        </Link>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="low-section hidden md:block px-[88px]">
        <div className="grid grid-cols-1 md:grid-cols-[30%,70%] ">
          <div className="flex flex-col justify-center">
            {loading ? (
              <div className="m-auto text-center text-base py-8 sm:mt-2  px-1 rounded-full">
                <SkeletonLoader
                  count={4}
                  height={50}
                  width={350}
                  className={"mt-8"}
                />
              </div>
            ) : (
              <>
                {tabs.map((ele, key) => (
                  <div
                    className={`flex   ${key == activeTab ? "" : ""
                      } `}
                  >
                    {/* <img src={ele.logo} className={`h-[65px]  w-10  `} /> */}
                    <div
                    className={`flex   ${key == activeTab ? "border-b-[1px] border-[#fe9327] text-[#fe9327]" : ""
                      } `}
                  >
                    <p>

                      {ele.logo}
                    </p>


                    <p
                      className="font-[400] h-[65px] text-[24px]  flex items-center relative justify-start sm:justify-start sm:pl-[15px] gap-1 w-100 text-center my-2 py-2 cursor-pointer px-3 sm:pl-6 start-rainbow "
                      key={key}
                      onClick={() => handleTabChange(key)}
                    >
                      {ele.title}
                    </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex flex-col  sm:flex-row sm:gap-[30px]">
            {loading ? (
              <div className=" text-center text-base py-8 sm:mt-2  px-1 rounded-full">
                <SkeletonLoader
                  count={1}
                  height={300}
                  width={250}
                  className={"mt-8 sm:ml-[40px]"}
                />
              </div>
            ) : (
              <div className="ml-auto mr-auto sm:mr-2  rounded-md relative w-[343px] md:w-[300px] md:h-[300px] mt-5 sm:mt-0 h-[286px] flex shrink-0 items-center justify-center  leading-normal">
                <img
                  src={tabs[activeTab].content_video}
                  className="w-full absolute bg-contain mx-auto xl:ml-[-120px]"
                  fill={true}
                />
              </div>
            )}
            <div className=" flex flex-col  self-center	sm:w-[420px] gap-[0.29rem">
              {loading ? (
                <div className=" text-blue-400 w-[339px]  text-left  sm:w-full text-heading xs:flex-row xs:flex-col sm:flex justify-center text-[12px] md:text-para lg:text-para sm:text-para sm:leading-8 gap-2">
                  <SkeletonLoader
                    count={1}
                    height={80}
                    width={420}
                    className="sm:ml-[80px]"
                  />
                </div>
              ) : (
                <p className="text-blue-400 w-[339px]  text-left  sm:w-full text-heading xs:flex-row xs:flex-col sm:flex justify-center text-[24px] leading-8 gap-2">
                  {tabs[activeTab].p}
                </p>
              )}
              {loading ? (
                <div className="text-white   w-full sm:mt-4 sm:flex justify-start hover:text-heading my-3 text-center sm:my-0  text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg">
                  <SkeletonLoader
                    count={1}
                    height={50}
                    width={210}
                    className="sm:ml-[80px]"
                  />
                </div>
              ) : (
                <button className="text-white   w-full sm:mt-4 sm:flex justify-start hover:text-heading my-3 text-center sm:my-0  text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg">
                  <Link
                    href="/checkout"
                    className=" px-[20px] py-[5px] rounded-[25px] bg-[#fe9327] hover:bg-black hover:text-white"
                  >
                    {" "}
                    Get Started
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;