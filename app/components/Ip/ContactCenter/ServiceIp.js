import {
  AcademicCapIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../../Skeleton/Skeleton";
import { el } from "@faker-js/faker";

const ServiceIp = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const tabsData = [
    {
      id: "1",
      title: "Contact Center",
      scroll: "contact-center",
      logo: <ChatBubbleLeftIcon className="h-[84px] w-10 text-gray-500" />,
      content_video: "/ChatAutomation.png",
      h3: "Boost Your Contact Center's Efficiency",
      p: "Utilize Tempo's chatbot and email automation features to integrate flawlessly with your current systems. Achieve real-time data synchronization and enhance customer interactions with streamlined, efficient processes.",
      className: "bg-[#f6f9ff]",
      buttonColor: "bg-[#1d74f5]",
      textColor: "text-[#1d74f5]",
      link: "/solutions/chat-bot",
    },
    {
      id: "2",
      title: "Voice Support",
      logo: <EnvelopeIcon className="h-[84px] w-10 text-gray-500" />,
      scroll: "voice-support",
      content_video:
        "/solutions_/Phone/Instant%20voice%20responses.png",
      h3: "Transform Your Contact Center's Voice Support",
      p: "Implement Tempo's advanced IVR (Interactive Voice Response) capabilities to elevate automated voice interactions. Seamlessly connect with your backend APIs for a more comprehensive and efficient customer service experience, enhancing every aspect of voice-based customer engagement.",
      className: "bg-[#fcf7fc]",
      link: "/solutions/phone",
      buttonColor: "bg-[#4ebe8c]",
      textColor: "text-[#4ebe8c]",
    },
    {
      id: "3",
      title: "Smart Automation",
      scroll: "smart-automation",

      logo: <AcademicCapIcon className="h-[84px] w-10 text-gray-500" />,
      content_video: "/LearningCenter.png",
      h3: "Enhance Your Contact Center with Smart Automation",
      p: "Leverage the Learning Center to integrate AI-driven insights into your customer service operations. Automate interactions efficiently using AI recommendations, and link your workflows and knowledge bases for a streamlined, more effective customer service experience.",
      className: "bg-[#fff8f8]",
      link: "/features/learning-center",
      buttonColor: "bg-[#f5455c]",
      textColor: "text-[#f5455c]",
    },
    {
      id: "4",
      title: "Workflow Builder",
      scroll: "workflow-builder",
      logo: <ShareIcon className="h-[84px] w-10 text-gray-500" />,
      content_video:
        "/solutions_/Workflow_Builder/Seamless%20Integration%20and%20Customization.png",
      h3: "Optimize Contact Center Operations",
      p: "Harness the capabilities of Workflow Builder to design and implement tailor-made automated workflows in your contact center. This approach not only boosts operational efficiency but also significantly reduces manual effort, streamlining your contact center's business processes for better performance and customer engagement.",
      className: "bg-[#fcf7fc]",
      link: "/integrations",
      buttonColor: "bg-[#9f22c7]",
      textColor: "text-[#9f22c7]",
    },
  ];

  return (
    <div className="bg-white pt-5 px-5 sm:px-0 sm:pt-8 sm:pb-4 py-0 sm:py-8">
      <div className="">
        {tabsData.map((element, key) => (
          <div
            className={`${element.className} max-h-none lg:max-h-[596px] min-h-auto lg:min-h-[596px] sm:mb-12 ml-[-16px] mr-[-16px] p-8 px-4 lg:mb-24 lg:pt-32 lg:pb-32 lg:pl-36 flex static top-0 bottom-0 left-0 right-0 overflow-hidden`}
            key={key}
            id={element.scroll}
          >
            <div className="block bg-scroll lg:flex h-auto max-h-none lg:max-h-[376px] w-full">
              <div className="flex items-start sm:px-[50px] lg:px-0 justify-between flex-col lg:w-1/2 max-w-none w-full lg:max-w-[420px]">
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
                <div className="mt-[20px] lg:mt-[40px] flex gap-5 lg:block flex-col items-start">
                  {loading ? (
                    <SkeletonLoader count={1} height={35} width={180} />
                  ) : (
                    <Link
                      href={`/checkout`}
                      className={`rounded-[4px] text-[14px] text-white ${element.buttonColor} hover:bg-black hover:text-white text-center px-6 py-2 text-lg font-semibold leading-7 no-underline transition duration-300`}
                    >
                      Get started
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

export default ServiceIp;
