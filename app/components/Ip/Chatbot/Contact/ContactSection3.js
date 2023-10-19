import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";


const ContactSection3 = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="about conetct">


      <div className=" mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]  sm:py-10 w-full sm:w-[1440px] ">
        <div className='block sm:flex justify-between items-center gap-4'>
          <div>  <div className="block">
            {loading ? (
              <SkeletonLoader count={1} height={350} width={"100%"} />
            ) : (
              <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[365px]">
                <Image

                  src="/ipbot/Image3.png"
                  className="w-full mx-auto bg-contain object-cover sm:object-contain"
                  fill={true}
                />
              </div>
            )}
          </div></div>
          <div>
            <div className="">

              <h2 className=" font-bold text-left  text-2xl text-[#252C47] sm:w-[34rem]  md:text-h2 lg:text-[32px] sm:text-h2 sm:leading-none ">
                {loading ? (
                  <SkeletonLoader count={2} height={35} width="100%" />
                ) : (
                  "Easily improve customer satisfaction and agent efficiency."
                )} </h2>
              <p className="sm:my-12 text-left my-3 sm:text-xl text-sm sm:w-[580px]">
                {loading ? (
                  <SkeletonLoader count={4} height={30} width="100%" />
                ) : (
                  "Harness the power of machine learning to optimize every customer interaction."
                )}
              </p>
              <div className='ml-[19px] sm:text-[19px] text-[15px]'>
                <ul className=' text-left sm:text-inherit '>
                  <li>
                    {loading ? (
                      <SkeletonLoader count={1} height={30} width="100%" />
                    ) : (
                      "Train with your Historic Data"
                    )}
                  </li>
                  <li>
                    {loading ? (
                      <SkeletonLoader count={1} height={30} width="100%" />
                    ) : (
                      "Daily Aggregated Recommendations"
                    )}</li>
                  <li>
                    {loading ? (
                      <SkeletonLoader count={1} height={30} width="100%" />
                    ) : (
                      "Connect to Workflows and Knowledge Base"
                    )}</li>

                </ul>
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
          
            </div></div>

        </div>

      </div>
    </div>
  )
}

export default ContactSection3;