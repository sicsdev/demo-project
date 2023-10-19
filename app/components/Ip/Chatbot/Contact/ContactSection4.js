"use client"
import React, { useEffect, useState } from 'react';
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import Card from '@/app/components/Common/Card/Card';

const ContactSection4 = () => {



    const data = [{
        heading: "Higher CSATs",
        description: "Companies using our platform can anticipate higher customer satisfaction scores, contributing to overall customer loyalty."
    },
    {
        heading: "More Deflections",
        description: "Experience a significant reduction in the number of tickets that require human intervention, optimizing your operations."
    },
    {
        heading: "24/7/365 Uptime",
        description: "Benefit from round-the-clock system availability, ensuring uninterrupted service for your customers."
    }
    ]
    // ont-size: 24px;
    //     font-weight: 600;
    //     margin-left: 15rem;
    //     margin-top: 5rem;
    //     margin-bottom: 4rem;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    return (
        <div className='py-4 sm:py-8 w-full sm:w-[1440px] mx-auto'>
                <div className='main-wrapper-integrate  mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]  py-10 w-full sm:w-[1440px] '>
            <h1 className='text-center text-base sm:text-para md:text-para lg:text-[32px] sm:leading-8 my-2 sm:my-6 font-base text-[#252C47]' >
                {loading ? <SkeletonLoader count={1} height={30} width={"60%"} /> :
                    "Exceptional Performance"
                }
            </h1>
            <div className='sm:flex'>
                {data.map((ele, key) =>
                    <div className='p-[1rem]'>
                        <p className='text-[#363744] sm:text-[19px] text-[17px] font-semibold'>
                            {loading ? (
                                <SkeletonLoader count={1} height={30} width={250} />
                            ) : (
                                <> {ele.heading}</>
                            )}</p>
                        <p className='text-[#363744] sm:text-sm text-[14px] mt-[10px] sm:mt-[25px]'>
                            {loading ? (
                                <SkeletonLoader count={3} height={20} width={250} />
                            ) : (
                                <div className='flex justify-start gap-2'>
                                    <p>   {ele.description} {key === 2 && (
                                        <span className="group w-[2px] relative">
                                            <sup className='font-bold'>*</sup>
                                            <Card className="animate-fadeIn bg-white sm:top-[-59px] hidden absolute w-[350px] sm:w-[500px] md:w-[500px] lg:w-[500px] z-50 group-hover:block  right-[-341px] sm:right-0 sm:left-auto lg:left-auto md:left-auto ">
                                                {" "}
                                                <span className="text-xs font-light">
                                                    *Uptime subject to limitations. For more information, <a href='https://demo-portal-n9zfjkpji-jacktempo7-s-team.vercel.app/list-of-subprocessors' className="text-primary" target='_blank'>view our subprocessors list.</a>
                                                </span>
                                            </Card>
                                        </span>
                                    )}</p>

                                </div>
                            )}
                        </p>
                    </div>
                )}

            </div>
        </div>
        </div>
    )
}

export default ContactSection4;