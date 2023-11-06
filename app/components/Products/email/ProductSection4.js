"use client"
import React, { useEffect, useState } from 'react';
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import SkeletonLoader from '../../Skeleton/Skeleton';
const data = [
    {
        title: "Keep customers informed on their order via SMS",
        description: "Notify customers of their ordering, shipping, delivery updates and more in real time."
    }, {
        title: "Drive customer engagement with links and promotions",
        description: "Engage with your customers through embedded links within your SMS message campaigns"
    }, {
        title: "Authenticate users easily with mobile verification",
        description: "Authenticate users with our Mobile Verification API which layers code generation, delivery and verification, all in a single package."
    }
]

const data2 = [{
    title: "SMS Verification",
    description: "Verify your users' mobile numbers via one-time passwords (OTPs).",
    learn: "Learn more"
}, {
    title: "SMS Engage",
    description: "Integrate SMS surveys, forms, and QR codes into your SMS messages.",
    learn: "Learn more"

}, {
    title: "10DLC",
    description: "Upgrade your A2P messaging experience in the US with 10 Digit Long Code, now supported by 8x8.",
    learn: "Learn more"

}, {
    title: "Two-Way SMS",
    description: "Increase the quality of customer engagement by sending and receiving messages through our SMS gateways.",
    learn: ""
}, {
    title: "Number Lookup",
    description: "Clean your database and step up anti-fraud measures by checking the validity of phone number locations.",
    learn: ""
}, {
    title: "Integrations",
    description: "Get help integrating SMS functions and capabilities into your existing business tools with our applications and tutorials.",
    learn: ""
}, {
    title: "URL Shortener",
    description: "Automatically shorten dynamic URLs to ensure cost-savings with CTR performance tracking.",
    learn: ""
}, {
    title: "Business Hours",
    description: "Ensure messages are delivered according to country-specific regulations and within business hours.",
    learn: ""
},]

const ProductSection4 = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    return (
        <div className='sm:p-[3rem] px-[2rem]'>
            <div className=' sm:p-[3rem] sm:grid grid-cols-3 gap-4'>
                {data.map((ele, key) =>
                    <div className='sm:p-[67px]'>
                        <hr className='w-[40%] border-[4px] border-[#d0d0d0] mb-[10px]' />
                        <p className='flex justify-center text-[20px] font-semibold  leading-7 sm:mt-[40px]'>
                            {loading ? (
                                <SkeletonLoader count={1} height={40} width={180} />
                            ) : (
                                <> {ele.title}</>
                            )}
                        </p>
                        <p className='sm:text-[18px] sm:mt-[20px] font-light leading-7'>
                            {loading ? (
                                <SkeletonLoader count={5} height={30} width="100%" />
                            ) : (<>
                                {ele.description}
                            </>
                            )}
                        </p>
                        {loading ? (
                            <SkeletonLoader className="mt-2" count={1} height={35} width="50%" />
                        ) : (
                            <p className='flex sm:mt-[2rem] font-bold gap-1 cursor-pointer hover:underline underline-offset-4 sm:mb-[0px] mb-[30px]'>Learn more
                                <ArrowLongRightIcon class="h-6 w-6 text-[#FF5721]" /> </p>
                        )}
                    </div>
                )}

            </div>
        
            <div className='bg-[#f8f9fa] sm:mt-[6rem]  sm:p-[3rem]'>
                <h2 className='font-semibold  text-2xl text-left sm:leading-[42px] text-[#252C47] sm:w-[auto] sm:ml-[45px] sm:mt-0 mt-4 md:text-h2 lg:text-[32px] sm:text-h2 '>
                    {loading ? (
                        <SkeletonLoader className="mt-2" count={1} height={45} width="60%" />
                    ) : (
                        "SMS add-ons for better deliverability"
                    )}</h2>
                <div class="sm:grid grid-cols-4 gap-4">
                    {data2.map((ele, key) =>
                        <div className='sm:p-[50px]'>
                            <p className='flex tracking-wide  text-[20px] font-semibold leading-7 text-[#000000b3]'>
                                {loading ? (
                                    <SkeletonLoader count={1} height={45} width={180} />
                                ) : (
                                    <>  {ele.title}</>
                                )}</p>
                            <p className='sm:text-[18px] tracking-wide sm:mt-[20px] font-light leading-7 sm:w-[19rem]'>
                                {loading ? (
                                    <SkeletonLoader className="mt-2" count={4} height={30} width="100%" />
                                ) : (
                                    <>  {ele.description}</>
                                )}</p>
                            {loading ? (
                                <SkeletonLoader className="mt-2" count={1} height={3} width={180} />
                            ) : (
                                <p className='flex sm:mt-[2rem] font-bold gap-1 cursor-pointer hover:underline underline-offset-4 sm:mb-[0px] mb-[2rem]'>{ele.learn}
                                    {ele.learn == "" ? "" : <ArrowLongRightIcon class="h-6 w-6 text-[#FF5721]" />}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductSection4;