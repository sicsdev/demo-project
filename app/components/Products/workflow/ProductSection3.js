"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";

const ProductSection3 = ({handleClickScroll}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="sm:px-[0px] px-[2rem]">
        <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[0rem] ">
          <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
              <div className="sm:ml-[3rem]">
                <p className="   mb-5  sm:p-0 sm:mt-0 mt-0 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                  {loading ? (
                    <SkeletonLoader
                      count={1}
                      className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                    />
                  ) : (
                    "Error Handling and Human Handoff                    "
                  )}{" "}
                </p>
                <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                  {loading ? (
                    <SkeletonLoader count={4} height={30} width="100%" />
                  ) : (
                    "If a workflow encounters an error, it's designed to break and kick the process over to the recommendation engine or a human handoff, ensuring uninterrupted service.                    "
                  )}
                </p>
                <div className="grid grid-cols-1 w-[100%] sm:flex px-0 sm:px-0 sm:p-0 gap-4 sm:w-auto items-center mx-auto mt-[25px] sm:mt-10 mb-[2rem] sm:pb-[30px] ">
                  {loading ? (
                    <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                      <SkeletonLoader height={60} width={300} />
                    </div>
                  ) : (
                    <button
                      onClick={handleClickScroll}
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
              <Link href={"/checkout"}>
              Start Now
              </Link>
       
            </button>
          )}
                </div>
              </div>
              <div className="block">
                {loading ? (
                  <SkeletonLoader
                    count={1}
                    className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                  />
                ) : (
                  <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[400px]">
                    <Image
                      src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt55f54263f3f85ca3/63374103eb84042358356821/delivery-person-sms-4x3-2060703047.png?cache=31300e7b4a96f3c1924839ef2de23459&tr=fo-auto,noWrapper-true,w-800"
                      className="w-full mx-auto bg-contain object-cover sm:object-contain"
                      fill={true}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:px-[0px] px-[2rem] shadow-box mb-6">
        <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[0rem] ">
          <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
            <div className="sm:block hidden">
              {loading ? (
                <SkeletonLoader
                  count={1}
                  className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                />
              ) : (
                <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[400px]">
                  <Image
                    src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt55f54263f3f85ca3/63374103eb84042358356821/delivery-person-sms-4x3-2060703047.png?cache=31300e7b4a96f3c1924839ef2de23459&tr=fo-auto,noWrapper-true,w-800"
                    className="w-full mx-auto bg-contain object-cover sm:object-contain"
                    fill={true}
                  />
                </div>
              )}
            </div>
            <div className="sm:ml-[3rem]">
              <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                {loading ? (
                  <SkeletonLoader
                    count={1}
                    className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                  />
                ) : (
                  "Dynamic Workflow Recommendations                  "
                )}{" "}
              </p>
              <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader count={4} height={30} width="100%" />
                ) : (
                  "Over time, the Learning Engine suggests new dynamic workflows to further optimize your operations and customer interactions.                  "
                )}
              </p>
              <div className="grid grid-cols-1 w-[100%] sm:flex px-0 sm:px-0 sm:p-0 gap-4 sm:w-auto items-center mx-auto mt-[25px] sm:mt-10 mb-[2rem] sm:pb-[30px] ">
                {loading ? (
                  <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                    <SkeletonLoader height={60} width={300} />
                  </div>
                ) : (
                  <button
                    onClick={handleClickScroll}
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
              <Link href={"/checkout"}>
              Start Now
              </Link>
       
            </button>
          )}
              </div>
            </div>
            <div className="block sm:hidden pb-[33px]">
              {loading ? (
                <SkeletonLoader
                  count={1}
                  className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                />
              ) : (
                <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[400px]">
                  <Image
                    src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt55f54263f3f85ca3/63374103eb84042358356821/delivery-person-sms-4x3-2060703047.png?cache=31300e7b4a96f3c1924839ef2de23459&tr=fo-auto,noWrapper-true,w-800"
                    className="w-full mx-auto bg-contain object-cover sm:object-contain"
                    fill={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSection3;
