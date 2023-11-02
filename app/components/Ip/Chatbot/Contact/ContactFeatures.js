"use client"
import React, { useState, useEffect } from "react";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, ChatBubbleLeftIcon, DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const ContactFeatures = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const data = [{
    img: <ChatBubbleLeftIcon className="h-12 w-12 text-[#0057ff]" />,
    heading: "AI Chatbot",
    description: "Automate customer interactions for efficiency and satisfaction.",
    list: [
      "Widget and Embeds",
      "Segment Bots by URL",
      "Fast Query Handling",
    ]
  },
  {
    img: <EnvelopeIcon className="h-12 w-12 text-[#0057ff]" />,

    heading: "Email Automation    ",
    description: "Automate email support without drowning in tickets.",
    list: [
      "Trigger Workflows",
      "Handle Complex Tickets",
      "Rapid Responses",
    ]
  },
  {
    img: <DevicePhoneMobileIcon className="h-12 w-12 text-[#0057ff]" />,

    heading: "Phone IVR    ",
    description: "Optimize phone support with real-time interactions.",
    list: [

      "Real-time and Dynamic",
      "Low Latency",
      "24/7 Uptime",
    ]
  },
  {
    img: <BookOpenIcon className="h-12 w-12 text-[#0057ff]" />,

    heading: "Knowledge Base",
    description: "Empower customers with a dynamic knowledge base.",
    list: [
      "Train on Ticket History      ",
      "Upload your FAQs      ",
      "Expand Knowledge Daily      ",
    ]
  },
  {
    img: <BriefcaseIcon className="h-12 w-12 text-[#0057ff]" />,

    heading: "Workflow Builder",
    description: "Design custom workflows with our low-code builder.",
    list: [
      "Low-Code Integrations",
      "Custom Automations",
      "Combine APIs",
    ]
  },
  {
    img: <AcademicCapIcon className="h-12 w-12 text-[#0057ff]" />,
    heading: "Learning Center",
    description: "Improve service through data-driven insights.",
    list: [
      "Daily Recommendations      ",
      "Robust, Interactive Logs      ",
      "Block Unwanted Actions",

    ]
  },

  ]

  return (
    <div className='w-full sm:w-[1440px] mx-auto'>
      <div className='mb-5 mt-5 sm:mt-5 text-black px-3 text-center text-2xl sm:text-[38px] font-bold sm:mb-0'>
        {loading ? (
          <SkeletonLoader count={1} height={30} width={120} />
        ) : (
          "Tempo Features"
        )}</div>
      <div className=' sm:grid block grid-cols-3 justify-center gap-4'>
        {data.map((ele, key) =>
          <div className='mx-[20px] sm:mx-[0px] sm:pr-[3.3rem] sm:pl-[3.3rem] sm:ml-[45px] sm:ml-[0px]'>
            {loading ? (
              <SkeletonLoader count={1} height={50} width={70} />
            ) : (
              <div className="mb-0 sm:mb-8 my-8 flex justify-center sm:justify-start"> {ele.img}</div>
            )}
            <p className=''>
              {loading ? (
                <SkeletonLoader count={2} height={35} width="100%" />
              ) : (
                <div className="text-center sm:text-left p-0 py-2 sm:p-3 md:py-2 md:px-0 font-bold text-[20px] sm:text-[25px] text-[#0057ff]" >
                  {ele.heading}
                </div>
              )}</p>
            <p className='text-center sm:text-left text-[17px]'>
              {loading ? (
                <SkeletonLoader count={5} height={30} width="100%" />
              ) : (
                <div className="p-0 py-2 sm:p-3  md:px-0 ">
                  {ele.description}
                </div>
              )}</p>
            <ul className='tempofeature_dot chatbot list-disc mt-[20px]  text-sm  ml-[15px]'>
              {ele.list.map
                ((elem, key) =>
                  <li>
                    {loading ? (
                      <SkeletonLoader count={2} height={30} width="80%" />
                    ) : (
                      <p className="text-[16px] text-center sm:text-left">{elem}</p>

                    )}</li>
                )}
            </ul>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:mt-[40px] w-[100%] sm:flex p-8 sm:p-0 gap-4 sm:w-auto items-center mx-auto mt-[0px] mb-[2rem] sm:pb-[30px] justify-center">
        {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
          // onClick={handleClickscroll}
            type="button"
            className="inline-block font-semibold  rounded-lg bg-white px-6 pb-2 pt-2 border-2 border-primary  leading-normal text-primary hover:text-white hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
          >
            Get a Quote
          </button>
        )}
        {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
            type="button"
            className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
          >
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: `
   <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;" >
   <span className="underline cursor-pointer text-white ">Get Started
   </span>
   </a>
  `,
              }}
            />
          </button>
        )}
      </div>
    </div>
  )
}

export default ContactFeatures;