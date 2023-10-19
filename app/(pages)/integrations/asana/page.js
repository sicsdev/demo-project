"use client"

import React from "react";
import { ArrowLongLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { useEffect } from "react";
import { useState } from "react";


const page = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
<div className="w-full sm:w-[1440px] mx-auto" >
      <div className="bg-white sm:p-[120px] sm:pb-[20px] sm:p-12 p-2 text-center ">
        <div className="grid grid-cols-1  sm:grid-cols-[75%_25%]  ">
          <div className=" flex flex-col">
            <p className="text-[#ff5721] font-bold text-left">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="70%" />
              ) : (
                "Asana Integration with Tempo"
              )}
            </p>

            <h2 className="!font-bold text-h3 text-left">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                "Asana"
              )}</h2>
                 <p className="text-heading text-xl text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Integrate Asana's comprehensive task and project management features with Tempo's robust workflow capabilities for an all-in-one solution."
                )}
              </p>
          </div>
          <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]  sm:justify-center my-[21px] sm:my-0">
            <div className="">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                <img src="/asaa.png" className="w-[200px] h-[200px] mb-[3rem]"></img>
              )}</div>
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
                  "Streamline Your Work Management for Unbeatable Productivity"
                )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Why Integrate Asana with Tempo?"
                )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Holistic Work Management"
                )}
              </p>
              <p className="text-heading text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Integrate Asana's comprehensive task and project management features with Tempo's robust workflow capabilities for an all-in-one solution."
                )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Unified Control Panel"
                )}
              </p>
              <p className="text-heading text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Manage Asana tasks, projects, and users directly from Tempo's centralized dashboard for seamless work orchestration."
                )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Data-Driven Decisions"
                )}
              </p>
              <p className="text-heading text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Utilize Tempo's analytics to gain insights from your Asana data, empowering your team to work smarter, not harder."
                )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="50%" />
                ) : (
                  "How It Works"
                )}
              </p>
              <p className="text-[#363866] !font-semibold  sm:mt-[20px] text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "1. Connect Asana to Tempo's Workflow Builder"
                )}
              </p>
              <p className="text-heading text-xl sm:mb-3">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Seamlessly integrate your Asana account with Tempo in a matter of clicks."
                )}
              </p>
              <p className="text-[#363866] !font-semibold text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "2.Customize Your Workflow with Asana Endpoints"
                )}
              </p>
              <p className="text-heading text-xl sm:mb-3">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Incorporate Asana's versatile endpoints into your Tempo workflows for a tailored work management experience."
                )}
              </p>
              <p className="text-[#363866] !font-semibold  text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "3. Analyze and Optimize"
                )}
              </p>
              <p className="text-heading text-xl sm:mb-3">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Leverage Tempo's analytics to derive actionable insights from your Asana data, enabling continuous improvement."
                )}
              </p>

              <div>
                {loading ? (
                  <SkeletonLoader count={1} height={60} width={140} />
                ) : (
                  <img
                    src="/integration_page/Asana_tab_1.png"
                    className="w-[full] sm:[465px] sm:h-[465px]"
                  />
                )}
              </div>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[35px] text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "Features"
                )}
              </p>
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-heading text-xl sm:mb-3">
                  <b>Task Management:</b> Create, update, and delete tasks with
                  ease.
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-heading text-xl sm:mb-3">
                  <b> Project Oversight:</b> Manage all aspects of your projects,
                  from creation to completion.
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-heading text-xl sm:mb-3">
                  <b> User Role:</b> Customize user roles for optimal team
                  collaboration.
                </p>
              )}
              <div>
                {loading ? (
                  <SkeletonLoader count={1} height={60} width={140} />
                ) : (
                  <img
                    src="/integration_page/Asana_tab2.png"
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
                  "    Ready to elevate your work management strategy? Integrate Asana with Tempo today."
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
                <p className="flex gap-[1rem] text-[20px] font-semibold text-[white]"><span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span>Integration Guide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default page;