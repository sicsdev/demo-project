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
    img: <ChatBubbleLeftIcon className="h-12 w-12 text-red" />,
    heading: "AI Chatbot",
    description: "Automate customer interactions for efficiency and satisfaction.",
    list: [
      "Widget and Embeds",
      "Segment Bots by URL",
      "Fast Query Handling",
    ]
  },
  {
    img: <EnvelopeIcon className="h-12 w-12 text-red" />,

    heading: "Email Automation    ",
    description: "Automate email support without drowning in tickets.",
    list: [
      "Trigger Workflows",
      "Handle Complex Tickets",
      "Rapid Responses",
    ]
  },
  {
    img: <DevicePhoneMobileIcon className="h-12 w-12 text-red" />,

    heading: "Phone IVR    ",
    description: "Optimize phone support with real-time interactions.",
    list: [

      "Real-time and Dynamic",
      "Low Latency",
      "24/7 Uptime",
    ]
  },
  {
    img: <BookOpenIcon className="h-12 w-12 text-red" />,

    heading: "Knowledge Base",
    description: "Empower customers with a dynamic knowledge base.",
    list: [
      "Train on Ticket History      ",
      "Upload your FAQs      ",
      "Expand Knowledge Daily      ",
    ]
  },
  {
    img: <BriefcaseIcon className="h-12 w-12 text-red" />,

    heading: "Workflow Builder",
    description: "Design custom workflows with our low-code builder.",
    list: [
      "Low-Code Integrations",
      "Custom Automations",
      "Combine APIs",
    ]
  },
  {
    img: <AcademicCapIcon className="h-12 w-12 text-red" />,
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
      <div className='text-[24px] text-center font-semibold mt-[5rem] text-[#363744] '>
        {loading ? (
          <SkeletonLoader count={1} height={30} width={120} />
        ) : (
          "Tempo Features"
        )}</div>
      <div className=' sm:grid block grid-cols-3 justify-center gap-4'>
        {data.map((ele, key) =>
          <div className='sm:pl-[7rem] sm:pr-[7rem] ml-[45px] sm:ml-[0px]'>
            {loading ? (
              <SkeletonLoader count={1} height={50} width={70} />
            ) : (
              <div className="my-8 flex sm:justify-start"> {ele.img}</div>
            )}
            <p className=''>
              {loading ? (
                <SkeletonLoader count={2} height={35} width="100%" />
              ) : (
                <div className=" font-bold mt-4 mb-4 sm:mb-4 sm:mt-4 " >
                  {ele.heading}
                </div>
              )}</p>
            <p className=''>
              {loading ? (
                <SkeletonLoader count={5} height={30} width="100%" />
              ) : (
                <div className="">
                  {ele.description}
                </div>
              )}</p>
            <ul className='chatbot list-disc mt-[20px]  text-sm  ml-[15px]'>
              {ele.list.map
                ((elem, key) =>
                  <li>
                    {loading ? (
                      <SkeletonLoader count={2} height={30} width="80%" />
                    ) : (
                      <>{elem}</>

                    )}</li>
                )}
            </ul>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 w-[100%] sm:flex p-8 sm:p-0 gap-4 sm:w-auto items-center mx-auto mt-[50px] mb-[2rem] justify-center">
        {loading ? (
          <SkeletonLoader count={1} height={50} width={180} />
        ) : (

          <button
            type="button"
            className="inline-block font-semibold  rounded-lg bg-white px-6 pb-2 pt-2 border-2 border-primary  leading-normal text-primary hover:text-white hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
          >
            <p>Get a Quote </p>
          </button>
        )}By checking this box, you agree
        {loading ? (
          <SkeletonLoader count={1} height={50} width={180} />
        ) : (

          <button
            type="button"
            className="inline-block   px-6 pb-2 pt-2.5 text-xs rounded-xl font-medium  leading-normal bg-[#FF5721] hover:bg-[white] text-white font-bold hover:text-[#FF5721]  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]   active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
          >
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: `
       <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;" >
       <span className="underline cursor-pointer text-white ">Chat with Sales
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