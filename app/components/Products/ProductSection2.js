"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Homeinte from '../LayoutNew/Homeinte';

const ProductSection2 = () => {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="about conetct sm:p-[0px] p-[2rem] ">
      <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[5rem] ">
        <div className='block sm:grid sm:grid-cols-2 justify-between items-center gap-4'>
            <div className="block">
              {loading ? (
                <SkeletonLoader count={1}    className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "/>
                ) : (
                <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[365px]">
                  <Image

                    src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt30c6350bcf051c94/60dbf2019ec66d5af9c19f3f/SMS-message.png?cache=a7dec639e661a474a15ea1743c559e94&tr=fo-auto,noWrapper-true,w-800"
                    className="w-full mx-auto bg-contain object-cover sm:object-contain"
                    fill={true}
                  />
                </div>
              )}
            </div>
            <div className="">

              <p className=" mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                {loading ? (
                  <SkeletonLoader className="my-1" count={1} height={45} width="100%" />
                ) : (
                  "Get your messages read faster with SMS APIs."
                )} </p>
              <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader count={1} height={150} width="100%" />
                ) : (
                  "SMS messaging is the most trusted communication source available. With a 98% open-rate, there’s no better way to keep your customers informed. We provide SMS solutions through our fully-supported SMS gateway which allows you to send and receive messages in a matter of minutes."
                )}
              </p>


            
            </div>

        </div>

      </div>
      <Homeinte/>
      <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[5rem] ">
        <div className='block sm:grid sm:grid-cols-2 justify-between items-center gap-4'>
          <div>
            <div className="sm:ml-[3rem]">
              <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                {loading ? (
                  <SkeletonLoader className="my-1" count={1} height={45} width="100%" />
                ) : (
                  "Simplify your messaging workflows"
                )} </p>
              <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader className="mb-1" count={1} height={30} width="100%" />
                ) : (
                  "Schedule notifications and other important information in advance."
                )}
              </p>
              <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                {loading ? (
                  <SkeletonLoader className="my-1" count={1} height={45} width="100%" />
                ) : (
                  "Keep customers in the loop"
                )} </p>
              <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader className="mb-1" count={1} height={30} width="100%" />
                ) : (
                  "Our customer portal, 8x8 Connect, lets you send notifications, authentications, and one-time passwords instantly."
                )}
              </p>  
              <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                {loading ? (
                  <SkeletonLoader className="my-1" count={1} height={45} width="100%" />

                ) : (
                  "Send as many as you need"
                )} </p>
              <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader className="mb-1" count={1} height={30} width="100%" />
                ) : (
                  "With no limits, you can send thousands — or even millions — of messages at a single time."
                )}
              </p>

            </div></div>
          <div>  <div className="block">
            {loading ? (
                <SkeletonLoader count={1}    className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "/>
                ) : (
              <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[400px]">
                <Image
                  src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt9307f9bf529bd42f/5ea2369f3e818760fab31c4b/sms_api_1.png?cache=8b27c467b96d923f65d89f90e635bb84&tr=fo-auto,noWrapper-true,w-800"
                  className="w-full mx-auto bg-contain object-cover sm:object-contain"
                  fill={true}
                />
              </div>
            )}
          </div></div>

        </div>

      </div>
    </div>
  )
}

export default ProductSection2;