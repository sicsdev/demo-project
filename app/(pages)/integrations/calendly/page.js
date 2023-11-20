"use client"
import React from "react";
import { ArrowLongLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { useEffect } from "react";

const page = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
<div className="w-full sm:w-[1440px] mx-auto" >
    <div className="bg-white sm:p-[120px] sm:p-12 p-2 text-center">
    <div className="grid grid-cols-1  sm:grid-cols-[75%_25%]">
            <div className=" flex flex-col">
              <p className="text-[#ff5721] font-bold text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="70%" />
                ) : (
                  "Calendly Integration with Deflection AI"
                )}
              </p>
              <h2 className="!font-bold text-h3 text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={60} width={140} />
                ) : (
                  "Calendly"
                )}</h2>
                  <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px] text-left">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "Streamline Your Scheduling with Unparalleled Efficiency"
            )}
            </p>
            </div>
          <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]  sm:justify-between my-[21px] sm:my-0">

            <div className="">
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
              <img src="/integrations/1.svg" className="w-[120px] h-[120px]"></img>
            )}
            </div>
          </div>
          </div>
      </div>
      <div className="bg-white sm:py-[120px] sm:py-12 p-2 sm:pt-0 text-center">
      <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
      <div className="bg-[#f8f9fa!important]  sm:px-[120px] sm:px-12">
          <div className="text-left sm:mt-7 p-[24px] sm:p-0">
            {/* <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px]">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "Streamline Your Scheduling with Unparalleled Efficiency"
            )}
            </p> */}
       
            <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px]">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
              "Why Integrate Calendly with Deflection AI?"
            )}
            </p>
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Automated Scheduling:</b>Eliminate the hassle of back-and-forth emails by integrating Calendly's powerful scheduling capabilities with Deflection AI.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Unified Dashboard:</b> Manage all your Calendly events, invitees, and availability directly from Deflection AI's centralized interface.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Data-Driven Decisions:</b>Utilize Deflection AI's analytics to gain insights into your Calendly scheduling data for optimized time management.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-[26px]">
              How It Works
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Connect Calendly to Deflection AI:</b>Seamlessly integrate your Calendly account with Deflection AI in a few simple steps.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Customize Your Workflow with Calendly Endpoints:</b> Add Calendly API endpoints to your Deflection AI workflow for a fully personalized scheduling solution.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Analyze and Optimize:</b>Use Deflection AI's analytics to gain actionable insights into your Calendly scheduling data and make data-driven decisions.
            </p>
            )}
            <div>
            {loading ? (
              <SkeletonLoader count={2} height={150} width="100%" />
            ) : (
              <img
                src="/integration_page/Calendly_tab_1.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            )}
            </div>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[35px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="60%" />
            ) : (
              "Features"
            )}
            </p>
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-[#363866] text-xl sm:mb-3">
               <span className="font-semibold">User Availability:</span>List all busy times and availability schedules for a user.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-[#363866] text-xl sm:mb-3">
              <span className="font-semibold">Event Management:</span>Manage all event types, scheduled events, and invitees.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-[#363866] text-xl sm:mb-3">
               <span className="font-semibold">Data Deletion:</span>Delete specific invitee data and scheduled event data for privacy compliance.
            </p> )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              <p className="text-[#363866] text-xl sm:mb-3">
               <span className="font-semibold">Special Features:</span> Create single-use scheduling links, shares, and manage no-shows.
            </p>
            )}
            <div>
            {loading ? (
              <SkeletonLoader count={1} height={200} width="100%" />
            ) : (
              <img
                src="/integration_page/Calendly_tab2.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            )}
            </div>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
              "Get Started"
            )}
            </p>
            <p className="text-heading text-xl sm:mb-3">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              "Ready to revolutionize your scheduling process? Integrate Calendly with Deflection AI today."
            )}
            </p>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
              "Integrate Now"
            )}
            </p>
          </div>
        </div>

        <div className="p-12 bg-[#363744]">
        <div class="stick-right ">
        

        <div className="text-left">
        {loading ? (
          <SkeletonLoader count={1} height={20} width="100%" />
        ):(
          <p className="flex gap-[1rem] text-[20px] font-semibold text-[white] justify-center">
            
            <span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/calendly-integration">Integration Guide</a></p>)}
        </div>
        <div className="rounded-[20px] bg-white  shadow-2xl w-full sm:w-[100%] sm:py-[56px] sm:py-[30px] mt-[2rem]">
        <p className="text-[20px] text-[#363866] sm:mb-3 font-semibold">
        {loading ? (
          <SkeletonLoader count={1} height={20} width="100%" />
        ) : (
          "See how it works with Deflection AI"
        )}
        </p>
        <div className="block text-center  ">
          <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8 sm:mt-0">
            <div className="block sm:flex justify-center w-[100%] items-center gap-8">
            {loading ? (
              <SkeletonLoader count={1} height={40} width={100} />
            ) : (
              <button
                className={
                  "mb-4 sm:mb-0 uppercase py-[18px] px-2  font-bold w-[177px] focus:ring-yellow-300 text-white bg-[#FF5721] hover:bg-black dark:focus:ring-yellow-900 rounded-2xl"
                }
              >
                Get A demo
              </button>
            )}
            </div>
          </div>
        </div>
      </div>
      </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default page;