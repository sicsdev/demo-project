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
    <>
<div className="w-full sm:w-[1440px] mx-auto" >

      <div className="bg-white sm:p-[120px] sm:p-12 p-2 text-center">
        <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
              <div className=" flex flex-col">
                <p className="text-[#ff5721] font-bold text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="70%" />
                ) : (
                  "Twilio Integration with Tempo"
                )}
                </p>

                <h2 className="!font-bold text-h3 text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={60} width={140} />
                ) : (
                  "Twilio"
                )}</h2>
              </div>
              <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px] my-[21px] sm:my-0">

              <div className="">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                <img
                  src="/twilio-logo-png-transparent.png"
                  className="w-[120px] h-[120px]"
                ></img>
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
                "Elevate Your Communication Capabilities with Unmatched Versatility"
                )}              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
                "Why Integrate Twilio with Tempo?"
              )}
              </p>
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Multi-Channel Communication:</b> Leverage Twilio's API to
                send SMS, MMS, and make voice calls directly from Tempo's
                interface.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Unified Dashboard:</b> Manage all your Twilio messages,
                conversations, and call logs in one centralized Tempo dashboard.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Data-Driven Insights:</b> Utilize Tempo's analytics to
                evaluate the effectiveness of your communication strategies.
              </p>
              )}
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
                "How It Works"
              )}
              </p>
              <p>
                <span className="text-[#363866] !font-semibold  sm:mt-[20px] text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="50%" />
                ) : (
                  "1. Connect Twilio to Tempo:"
                )}
                </span>
                <span className="text-heading text-xl sm:mb-3">
                {loading ? (
                  <SkeletonLoader count={2} height={20} width="100%" />
                ) : (
                  "Seamlessly link your PayPal account to Tempo's Workflow Builder."
                )}
                </span>
              </p>
              <p>
                <span className="text-[#363866] !font-semibold text-xl">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="100%" />
                ) : (
                  "2. Customize Your Workflow with Twilio Endpoints"
                )}
                </span>
                <span className="text-heading text-xl sm:mb-3">
                {loading ? (
                  <SkeletonLoader count={2} height={20} width="100%" />
                ) : (
                  "Add Twilio API endpoints to your Tempo workflow for a fully personalized communication solution."
                )}
                </span>
              </p>
              <p>
                <span className="text-[#363866] !font-semibold  text-xl">
                {loading ? (
                  <SkeletonLoader count={2} height={20} width="50%" />
                ) : (
                  "3. Analyze and Optimize"
                )}
                </span>
                <span className="text-heading text-xl sm:mb-3">
                {loading ? (
                  <SkeletonLoader count={2} height={20} width="100%" />
                ) : (
                  "Use Tempo's analytics to gain actionable insights into your Twilio communication data."
                )}
                </span>
              </p>
              <div>
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                <img
                  src="/integration_page/Twilio_tab-1.png"
                  className="w-[full] sm:[465px] sm:h-[465px]"
                />
              )}
              </div>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[35px] text-xl">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
                "Features"
              )}
              </p>
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Message Management</b> List, get, send, and delete messages
                with ease.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Conversation Control:</b> Create, fetch, read, update, and
                delete conversations for enhanced communication.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Data Privacy:</b> Private endpoints for deleting messages
                and conversations.
              </p> 
                 )}   <div>
                 {loading ? (
                  <SkeletonLoader count={1} height={60} width={140} />
                ) : (
                <img
                  src="/integration_page/Twilio_tab2.png"
                  className="w-[full] sm:[465px] sm:h-[465px]"
                />
                )}
              </div>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
                "Get Started"
              )}
              </p>
              <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
                "Ready to take your communication to the next level? Integrate Twilio with Tempo today."
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="50%" />
              ) : (
                "Integrate Now"
              )}
              </p>
            </div>
</div>

<div className="p-12 bg-[#363744]">
            <div class="stick-right ">
        

              <div className="text-left">
                <p className="flex gap-[1rem] text-[20px] font-semibold text-[white]"><span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/twilio-integration">Integration Guide</a></p>
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
