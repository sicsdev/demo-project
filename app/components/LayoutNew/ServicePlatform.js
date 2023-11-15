import { AcademicCapIcon, ChatBubbleLeftIcon, EnvelopeIcon, ShareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';

const ServicePlatform = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const tabsData = [
        {
            id: "1",
            title: "Chat Automation",
            logo: <ChatBubbleLeftIcon className="h-[84px] w-10 text-gray-500" />,
            content_video: "/ChatAutomation.png",
            h3: "Elevate your customer service with Smart IVR.",
            p: "Automate support to increase efficiency and customer satisfaction through effective deflections.",
            className: "bg-[#f6f9ff]",
            buttonColor: ""
        },
        {
            id: "2",
            title: "Email Automation",
            logo: <EnvelopeIcon className="h-[84px] w-10 text-gray-500" />,
            content_video: "/EmailAutomation.png",
            h3: "Elevate your customer service with Smart IVR.",
            p: "Automate email interactions with intelligent workflows, ensuring timely and relevant responses to customer queries.",
            className: "bg-[#f8fcfa]"
        },
        {
            id: "3",
            title: "Learning Center",
            logo: <AcademicCapIcon className="h-[84px] w-10 text-gray-500" />,
            content_video: "/LearningCenter.png",
            h3: "Elevate your customer service with Smart IVR.",
            p: "Continuously refine your service through daily AI recommendations, enhancing workflows and knowledge bases.",
            className: "bg-[#fff8f8]"
        },
        {
            id: "4",
            title: "Integrations",
            logo: <ShareIcon className="h-[84px] w-10 text-gray-500" />,
            content_video: "/Integration.png",
            h3: "Elevate your customer service with Smart IVR.",
            p: "Integrate with your favorite business tools to implement advanced automations through workflows, enhancing operational efficiency.",
            className: "bg-[#fcf7fc]"
        },
    ];

    return (
        <div className='bg-white pt-5 px-5 sm:px-0 sm:pt-8 sm:pb-4 py-0 sm:py-8'>
            <div className='py-[30px] lg:py-[50px]'>
                {loading ? (
                    <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
                        <SkeletonLoader height={30} width={"70%"} />
                    </div>
                ) : (
                    <h2 class="block !font-[600] text-2xl md:text-[42px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]" >
                        Deflection AI-Powered Customer Service Platform
                    </h2>
                )}
                {loading ? (
                    <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
                        <SkeletonLoader height={30} width={"50%"} />
                    </div>
                ) : (
                    <p className="text-blue-400 w-full md-w-[339px] sm:mb-[3rem] text-center font-[400] text-heading xs:flex-row xs:flex-col sm:flex justify-center text-[16px] leading-[22px] sm:text-[16px] sm:leading-8 gap-2">
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
            <div className=''>
                {tabsData.map((element, key) =>
                    <div className={`${element.className} max-h-none lg:max-h-[596px] min-h-auto lg:min-h-[596px] mb-12 ml-[-16px] mr-[-16px] p-8 px-4 lg:mb-24 lg:pt-32 lg:pb-32 lg:pl-36 flex static top-0 bottom-0 left-0 right-0 overflow-hidden`} key={key}>
                        <div className='block bg-scroll lg:flex h-auto max-h-none lg:max-h-[376px] w-full'>
                            <div className='flex items-start justify-between flex-col lg:w-1/2 max-w-none w-full lg:max-w-[420px]'>
                                <div>
                                    <div className='mb-[15px] lg:mb-[32px] text-sm leading-9 text-[#6c727a]'>
                                        <strong>0{element.id}</strong> — {element.title}
                                    </div>
                                    <h3 className='mb-[15px] lg:mb-[32px] block !font-[700] text-2xl md:text-[38px] my-[1rem] md:my-8 relative text-heading md:leading-[3rem]'>{element.h3}</h3>
                                    <p className='max-w-[420px] my-0 text-sm'>{element.p}</p>
                                </div>
                                <div className='mt-[20px] lg:mt-[40px] flex gap-5 lg:block flex-col items-start'>
                                    <Link href={`/checkout`} className='rounded-[4px] text-[14px] text-white bg-[#fe9327] hover:bg-black hover:text-white text-center px-6 py-2 text-lg font-semibold leading-7 no-underline transition duration-300'>Get started</Link>
                                    <Link href={`/checkout`} className='text-sm text-[#fe9327] lg:ml-[24px]'><strong>Get started</strong> -- <span>it's free</span></Link>
                                </div>
                            </div>
                            <div className='relative lg:w-1/2 mt-[20px] lg:mt-[0px] max-w-none w-full'>
                                <img sizes="(max-width: 479px) 100vw, (max-width: 767px) 96vw, (max-width: 991px) 97vw, 800px" loading="lazy" src={element.content_video} alt="" className=" w-full lg:min-w-[800px] transform preserve-3d lg:translate-y-[-74px] lg:translate-x-[31px] lg:translate-z-[1px]" />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ServicePlatform