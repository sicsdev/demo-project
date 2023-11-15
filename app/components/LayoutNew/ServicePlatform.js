import { AcademicCapIcon, ChatBubbleLeftIcon, EnvelopeIcon, ShareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';
import { el } from '@faker-js/faker';

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
            h3: "Enhance your service capabilities",
            p: "Leverage Tempo's chatbot and email automations to integrate seamlessly with your existing systems, offering real-time data synchronization and streamlined customer interactions.",
            className: "bg-[#f6f9ff]",
            buttonColor: "",
            link: "/solutions/chat-bot"

        },
        {
            id: "2",
            title: "Phone Automation",
            logo: <EnvelopeIcon className="h-[84px] w-10 text-gray-500" />,
            content_video: "https://usetempo.ai/solutions_/Phone/Instant%20voice%20responses.png",
            h3: "Revolutionize voice interactions",
            p: "Utilize Tempo's smart IVR features to offer superior automated voice support, connecting fluidly with your backend APIs for a comprehensive and efficient customer service experience.",
            className: "bg-[#fcf7fc]",
            link: "/solutions/phone"

        },
        {
            id: "3",
            title: "Learning Center",
            logo: <AcademicCapIcon className="h-[84px] w-10 text-gray-500" />,
            content_video: "/LearningCenter.png",
            h3: "Automate with intelligence",
            p: "Deploy Learning Center to utilize AI-driven recommendations, automating customer interactions and linking workflows and knowledge bases for a more efficient service experience.",
            className: "bg-[#fff8f8]",
            link: "/features/learning-center"

        },
        {
            id: "4",
            title: "Workflow Builder",
            logo: <ShareIcon className="h-[84px] w-10 text-gray-500" />,
            content_video: "https://usetempo.ai/solutions_/Workflow_Builder/Seamless%20Integration%20and%20Customization.png",
            h3: "Streamline your business processes",
            p: "Employ Workflow Builder to create and implement custom automated workflows, enhancing operational efficiency and reducing manual effort in your business activities.",
            className: "bg-[#fcf7fc]",
            link: "/integrations"

        },

    ];

    return (
        <div className='bg-white pt-5 px-5 sm:px-0 sm:pt-8 sm:pb-4 py-0 sm:py-8'>
   
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
                                    <Link href={element.link} className='text-sm text-[#fe9327] lg:ml-[24px] cursor-pointer'><strong>learn more</strong></Link>
                                </div>
                            </div>
                            <div className='relative lg:w-1/2 mt-[20px] lg:mt-[0px] max-w-none w-full'>
                                <img sizes="(max-width: 479px) 100vw, (max-width: 767px) 96vw, (max-width: 991px) 97vw, 800px" loading="lazy" src={element.content_video} alt="" className=" w-[73%] m-auto  sm:min-w-[100%]  lg:min-w-[800px] transform preserve-3d lg:translate-y-[-74px] lg:translate-x-[31px] lg:translate-z-[1px]" />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ServicePlatform