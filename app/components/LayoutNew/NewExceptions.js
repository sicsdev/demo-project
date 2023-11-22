"use client";
import React from 'react'
import { useState, useEffect } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";
const NewExceptions = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);
    const [loading, setLoading] = useState(true);
    const data = [
        {

        }
    ]
    return (
        <div className="bg-black text-white special w-[90%] m-auto my-10">
            <div className="mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%] py-10">
                <div className="grid grid-cols-1 sm:grid-cols-1 sm:mt-12 gap-[30px]  ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[20px]">
                        <div className="">
                            <div className="hidden sm:block sticky top-[230px]">
                                <h1 className="mb-5 sm:mt-0 mt-5 text-white px-0  text-xl sm:text-[20px] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] md:text-[34px] font-bold sm:mb-0 sm:leading-[1.4em]">
                                    {loading ? <SkeletonLoader count={2} height={35} width={"70%"} /> :
                                        <>
                                            MS Teams is susceptible to attacks as it doesn{"'"}t offer end-to-end encryption
                                        </>
                                    }
                                </h1>
                            </div>
                            <div className=" sm:hidden block">
                                <h1 className="mb-5 sm:mt-0 mt-5 text-white px-3 text-center text-2xl sm:text-[38px] font-bold sm:mb-0">
                                    {loading ? <SkeletonLoader count={2} height={35} width={"100%"} /> :
                                        <>
                                            MS Teams is susceptible to attacks as it doesn{"'"}t offer end-to-end encryption
                                        </>
                                    }
                                </h1>
                            </div>
                        </div>

                        <div className="grid grid-cols-1">
                            <div
                                className={` scroll-child `}
                            >
                                <div className="sm:pl-[49px] pt-[10px] sm:pt-[20px]">
                                    <p className="text-white text-sm sm:text-[16px]  mt-8 sm:mb-0 mb-3 sm:mt-3 sm:leading-[1.8em]">
                                        {loading ? <SkeletonLoader count={3} height={20} width={"100%"} /> :
                                            <>
                                                Firstly, we{"'"}d like to give a quick nod to the team at Microsoft for what they{"'"}ve built. It does what it{"'"}s supposed to do, and it does it well - but it isn{"'"}t built for privacy-conscious organizations.
                                            </>
                                        }
                                    </p>
                                </div>
                                <div className="sm:pl-[49px] pt-[10px] sm:pt-[20px]">
                                    <p className="text-white text-sm sm:text-[26px]  mt-8 sm:mb-0 mb-3 sm:mt-3 sm:leading-[1.8em]">
                                        {loading ? <SkeletonLoader count={3} height={20} width={"100%"} /> :
                                            <>
                                                So why companies<span className='text-red'> choose Rocket.Chat Over Microsoft Teams?</span>
                                            </>
                                        }
                                    </p>
                                </div>
                                <div className="sm:pl-[49px] pt-[10px] sm:pt-[20px]">
                                    <p className="text-white text-sm sm:text-[16px]  mt-8 sm:mb-0 mb-3 sm:mt-3 sm:leading-[1.8em]">
                                        {loading ? <SkeletonLoader count={3} height={20} width={"100%"} /> :
                                            <>
                                                In short: Rocket.Chat is centered around legal compliance, scalability, and enterprise-level customizations.
                                            </>
                                        }
                                    </p>
                                </div>
                                <div className="sm:pl-[49px] pt-[10px] sm:pt-[20px]">
                                    <p className="text-white text-sm sm:text-[16px]  mt-8 sm:mb-0 mb-3 sm:mt-3 sm:leading-[1.8em]">
                                        {loading ? <SkeletonLoader count={3} height={20} width={"100%"} /> :
                                            <>
                                                Rocket.Chat offers much more flexibility and security than MS Teams. You can access the source code, access and build integrations, APIs, and more, enabling you to customize the platform to your specific needs.
                                            </>
                                        }
                                    </p>
                                </div>
                                <div className="sm:pl-[49px] pt-[10px] sm:pt-[20px]">
                                    <p className="text-white text-sm sm:text-[16px]  mt-8 sm:mb-0 mb-3 sm:mt-3 sm:leading-[1.8em]">
                                        {loading ? <SkeletonLoader count={3} height={20} width={"100%"} /> :
                                            <>
                                                Furthermore, although Microsoft Teams states they do not use or share your information for any purpose, it is still vulnerable to their security parameters and policies. Rocket.Chat removes that risk.
                                            </>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewExceptions