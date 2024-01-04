import {
  AcademicCapIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";
import { el } from "@faker-js/faker";
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ServicePlatform = () => {
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState({ getStarted: false, contactSales: false });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const tabsData = [
    {
      id: "1",
      title: "Chat Automation",
      scroll:"chat-automation",
      logo: <ChatBubbleLeftIcon className="h-[84px] w-10 text-gray-500" />,
      content_video: "/ChatAutomation.png",
      h3: "24/7 Human-level chat support",
      p: "White-labeled chat and email support, 24/7 with instant response times. Deflection integrates with your existing systems, offering real-time data and API access and fantastic customer interactions.",
      className: "bg-[#f6f9ff]",
      buttonColor: "bg-[#1d74f5]",
      textColor: "text-[#1d74f5]",
      link: "/solutions/chat-bot",
      btnName:"Start with Chat",
      btnName1:"Contact sales"
    },
    {
      id: "2",
      title: "Phone Automation",
      logo: <EnvelopeIcon className="h-[84px] w-10 text-gray-500" />,
      scroll:"phone-automation",
      content_video:
        "/solutions_/Phone/Instant%20voice%20responses.png",
      h3: "Powerful AI phone calls",
      p: "Deflection offers incoming and outgoing phone calls. Answer customers 24/7 or ask Deflection to call them with human-sounding and powerful voice interactions.",
      className: "bg-[#fcf7fc]",
      link: "/solutions/phone",
      buttonColor: "bg-[#4ebe8c]",
      textColor: "text-[#4ebe8c]",
      btnName:"Start with Phone",
      btnName1:"Contact sales"
    },
    {
      id: "3",
      title: "Learning Center",
      scroll:"learning-center",

      logo: <AcademicCapIcon className="h-[84px] w-10 text-gray-500" />,
      content_video: "/LearningCenter.png",
      h3: "Self-learning from your interactions.",
      p: "Better than ChatGPT. Deflection only answers questions it knows how to and will automatically learn from your website, help center, historical tickets, and ongoing customer interactions. ",
      className: "bg-[#fff8f8]",
      link: "/features/learning-center",
      buttonColor: "bg-[#f5455c]",
      textColor: "text-[#f5455c]",
      btnName:"Start with Learning Center",
      btnName1:"Contact sales"
    },
    {
      id: "4",
      title: "Workflow Builder",

      scroll:"workflow-builder",

      logo: <ShareIcon className="h-[84px] w-10 text-gray-500" />,
      content_video:
        "/solutions_/Workflow_Builder/Seamless%20Integration%20and%20Customization.png",
      h3: "Connects to your systems and processes.",
      p: "With a large library of native software integrations and database access, Deflection will connect to your systems to allow the AI to book sales, process refunds, and much more.  ",
      className: "bg-[#fcf7fc]",
      link: "/integrations",
      buttonColor: "bg-[#9f22c7]",
      textColor: "text-[#9f22c7]",
      btnName:"Start with Actions Library",
      btnName1:"Contact sales"
    },
  ];

  return (
    <div className="bg-white pt-5 px-5 sm:px-0 sm:pt-8 sm:pb-4 py-0 sm:py-8">
      <div className="">
        {tabsData.map((element, key) => (
          <div
            className={`${element.className} max-h-none lg:max-h-[596px] min-h-auto lg:min-h-[596px] mb-12 ml-[-16px] mr-[-16px] p-8 px-4 lg:mb-24 lg:pt-32 lg:pb-32 lg:pl-36 flex static top-0 bottom-0 left-0 right-0 overflow-hidden`}
            key={key}
            id={element.scroll}
          >
            <div className="block bg-scroll lg:flex h-auto max-h-none lg:max-h-[376px] w-full">
              <div className="flex items-start sm:px-[50px] lg:px-0 justify-between flex-col lg:w-1/2 max-w-none w-full lg:max-w-[508px]">
                <div className="w-full">
                  <div className="mb-[15px] lg:mb-[32px] text-sm leading-9 text-[#6c727a]">
                    {loading ? (
                      <SkeletonLoader count={1} height={20} width={150} />
                    ) : (
                      <>
                        <strong>0{element.id}</strong> — {element.title}
                      </>
                    )}
                  </div>
                  <h3 className="mb-[15px] lg:mb-[32px] block !font-[700] text-2xl md:text-[38px] my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
                    {loading ? (
                      <SkeletonLoader count={2} height={35} width={"90%"} />
                    ) : (
                      <>{element.h3}</>
                    )}
                  </h3>
                  <p className="max-w-[420px] my-0 text-sm">
                    {loading ? (
                      <SkeletonLoader count={3} height={20} width={"90%"} />
                    ) : (
                      <>{element.p}</>
                    )}
                  </p>
                </div>
                <div className="mt-[20px] lg:mt-[40px] flex flex-col sm:flex-row gap-[0.25rem] items-center">
  {loading ? (
    <SkeletonLoader count={1} height={35} width={180} />
  ) : (
    <Link href={`/checkout`}>
      <p
        onMouseEnter={() => setIsHovered({ ...isHovered, getStarted: true })}
        onMouseLeave={() => setIsHovered({ ...isHovered, getStarted: false })}
        className={`flex sm:items-center justify-center rounded-[4px] text-[14px] text-white ${element.buttonColor} hover:bg-black px-6 py-2 text-lg font-semibold leading-7 no-underline transition duration-300`}
      >
{element.btnName}
        {isHovered.getStarted ? <ArrowRightIcon className="ml-2 h-5 w-5"  style={{strokeWidth:"3px"}} /> : <ChevronRightIcon className="ml-2 h-5 w-5"  style={{strokeWidth:"3px"}}/>}
      </p>
    </Link>
  )}
  {loading ? (
    <SkeletonLoader count={1} height={35} width={180} />
  ) : (
    <Link href={"/get-trial"}>
      <p
        onMouseEnter={() => setIsHovered({ ...isHovered, contactSales: true })}
        onMouseLeave={() => setIsHovered({ ...isHovered, contactSales: false })}
        className={`flex sm:items-center justify-center text-lg ${element.textColor} hover:text-blue-600 text-center px-6 py-2 font-semibold leading-7 no-underline transition duration-300`}
      >
{element.btnName1}
        {isHovered.contactSales ? <ArrowRightIcon className="ml-2 h-5 w-5" style={{strokeWidth:"3px"}} /> : <ChevronRightIcon className="ml-2 h-5 w-5" style={{strokeWidth:"3px"}} />}
      </p>
    </Link>
  )}
</div>

              </div>
              <div className="relative lg:w-1/2 mt-[20px] lg:mt-[0px] max-w-none w-full">
                {loading ? (
                  <SkeletonLoader count={1} height={400} width={"93%"} />
                ) : (
                  <img
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 96vw, (max-width: 991px) 97vw, 800px"
                    loading="lazy"
                    src={element.content_video}
                    alt=""
                    className=" w-[73%] m-auto  sm:w-[68%]  lg:min-w-[800px] transform preserve-3d lg:translate-y-[-74px] lg:translate-x-[31px] lg:translate-z-[1px]"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePlatform;
