import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";

const ContactSection2 = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="about bg-white] w-full sm:w-[1440px] mx-auto conetct ">
     
      <div className=" mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]  pt-2 sm:py-10">
        <div className="mt-4 sm:mt-[-3rem] block sm:flex md:flex lg:flex justify-between items-center">
          <div className="text-center sm:text-left">

            <h2 className=" font-bold  text-2xl text-left text-[#252C47] sm:w-[34rem] sm:mt-0 mt-4 md:text-h2 lg:text-[32px] sm:text-h2 sm:leading-none ">
              {loading ? (
                <SkeletonLoader count={2} height={35} width="100%" />
              ) : (
                "Empower your agents with unbeatable customer experiences."
              )}</h2>
            <div className='text-center'>
              <p className="sm:my-12 my-3 sm:text-xl text-left text-sm sm:w-[580px]">
                {loading ? (
                  <SkeletonLoader count={3} height={30} width="100%" />
                ) : (
                  "Easily integrate with your existing systems to create a seamless customer service experience."
                )}
              </p>
              <div className='ml-[19px] text-left  text-sm sm:text-[19px] '>
                <ul className='text-left sm:text-inherit'>
                  <li className='mt-2'>
                    {loading ? (
                      <SkeletonLoader count={1} height={30} width="100%" />
                    ) : (
                      "Easy API Integrations"
                    )}
                  </li>
                  <li className='mt-2'>
                    {loading ? (
                      <SkeletonLoader count={1} height={30} width="100%" />
                    ) : (
                      "Plug-and-Play Automations"
                    )}
                  </li>
                  <li className='mt-2'>
                    {loading ? (
                      <SkeletonLoader count={1} height={30} width="100%" />
                    ) : (
                      "Drag-and-Drop Workflow Builder"
                    )}</li>
                </ul>
              </div>
            </div>
            <div className="block">
              <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8">
                <div className="block sm:flex w-[100%] items-center gap-8">
                  {loading ? (
                    <SkeletonLoader count={1} height={50} width={180} />
                  ) : (
                    <button
                      className={
                        "mb-4 sm:mb-0 py-[18px] px-2 w-full font-bold sm:w-[177px] focus:ring-yellow-300 text-white bg-[#FF5721] hover:bg-black dark:focus:ring-yellow-900 rounded-2xl"
                      }
                    >
                      Schedule Demo
                    </button>
                  )}
                </div>
                <div className="inline mt-5  sm:max-w-[30%] sm:mt-[20px]"></div>
              </div>
            </div>
          </div>
          <div className="block">
            {loading ? (
              <SkeletonLoader count={1} height={350} width={"100%"} />
            ) : (
              <div className="relative w-[100%] h-[250px] sm:w-[693px] sm:h-[530px]">
                <Image

                  src="/ipbot/Image2.png"
                  className="w-full mx-auto bg-contain object-contain"
                  fill={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection2