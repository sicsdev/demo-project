"use client"
import React, { useEffect, useState } from "react";
import { ArrowLongLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";

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
              "Healthie Integration with Tempo"
              )}
              </p>
              <h2 className="!font-bold text-h3 text-left">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                "Healthie"
              )}</h2>
            </div>
          <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]  sm:justify-between my-[21px] sm:my-0">

            <div className="">
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
            <img src="/integrations/2.svg" className="w-[120px] h-[120px]"></img>
            )}
            </div>
          </div>
          </div>
          </div>
          <div className="bg-white sm:py-[120px] sm:py-12 p-2 sm:pt-0 text-center">
      <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
      <div className="bg-[#f8f9fa!important]  sm:px-[120px] sm:px-12">
          <div className="text-left sm:mt-7 p-[24px] sm:p-0">
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            "Empower Your Healthcare Practice with Seamless Patient and Workflow Management"
            )}
            </p>
       
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            "Why Integrate Healthie with Tempo?"
            )}
            </p>
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Unmatched Flexibility:</b>Combine Healthie's comprehensive healthcare management features with Tempo's Workflow Builder for a tailored healthcare experience.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Unified Dashboard:</b> Manage all your Healthie patients, appointments, and tasks directly from Tempo's centralized interface.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Data-Driven Insights:</b>Leverage Tempo's analytics to analyze metrics from your Healthie data for informed healthcare decision-making.
            </p>
            )}
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
              "How It Works"
            )}
            </p>
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Connect Healthie to Tempo's Workflow Builder:</b> Integrate your Healthie account with Tempo in just a few clicks.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Customize Your Workflow with Healthie Endpoints:</b> Add Healthie API endpoints to your Tempo workflow for a fully personalized healthcare management solution.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Analyze and Optimize:</b>Use Tempo’s analytics to gain actionable insights into your Healthie data and optimize healthcare delivery based on real-time data.
            </p>
            )}
            <div>
            {loading ? (
              <SkeletonLoader count={1} height={200} width="100%" />
            ) : (
              <img
                src="/integration_page/Healthie_tab-1.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            )}
            </div>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[35px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
              "Features"
            )}
            </p>
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Patient Management:</b>Retrieve, create, update, and delete patient information effortlessly.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Appointment Scheduling:</b>Manage all appointments across your practice.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="50%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Task and Document Management:</b> Assign and manage tasks and documents for comprehensive healthcare delivery.
            </p>
             )}
             {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
               <p className="text-heading text-xl sm:mb-3">
              <b>Availability Management:</b> Create and update availability slots for healthcare providers.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Custom Forms:</b> Utilize custom module forms for specialized healthcare services.
            </p>
            )}
            <div>
            {loading ? (
              <SkeletonLoader count={1} height={200} width="100%" />
            ) : (
              <img
                src="/integration_page/Healthie_tab2.png"
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
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
            "Ready to take your healthcare management to the next level? Integrate Healthie with Tempo today."
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
          <p className="flex gap-[1rem] text-[20px] font-semibold text-[white]"><span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/healthie-integration">Integration Guide</a></p>
        </div>
      </div>
        
        </div>
      </div>
      </div>
      </div>
  );
};

export default page;
