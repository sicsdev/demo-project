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
      <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
   
            <div className=" flex flex-col">
              <p className="text-[#ff5721] font-bold text-left">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="70%" />
              ) : (
              "Zendesk Integration with Tempo"
              )}
              </p>
              <h2 className="!font-bold text-h3 text-left">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                "Zendesk"
              )}</h2>
            </div>
          <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]   my-[21px] sm:my-0">

            <div className="">
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
            <img src="/zenenew.png" className="w-[120px] h-[120px]"></img>
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
         "   Optimize Your Customer Support and Ticket Management with Real-Time Data Sync"
            )}
            </p>
      
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
            "Why Integrate Zendesk with Tempo?"
            )}
            </p>
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Centralized Ticket Management:</b>Manage all your Zendesk tickets, users, and organizations directly from Tempo's unified dashboard.
            </p>)}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Workflow Automation:</b> Utilize Tempo's powerful workflow features to automate your Zendesk ticketing and user management operations.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Data-Driven Support:</b> Leverage Tempo's analytics to gain actionable insights from your Zendesk data, enabling smarter customer support strategies.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              How It Works
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Connect Zendesk to Tempo:</b> Seamlessly integrate Zendesk with Tempo in just a few clicks.
            </p>)}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Customize Your Support Workflow with Zendesk Endpoints:</b> Incorporate Zendesk's diverse endpoints into your Tempo workflows for a tailored customer support management experience.
            </p>)}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Analyze and Optimize:</b>Use Tempo's analytics to derive valuable insights from your Zendesk data, driving continuous improvement.
            </p>
            )}
            <div>
            {loading ? (
              <SkeletonLoader count={2} height={150} width="100%" />
            ) : (
              <img
                src="/integration_page/Zendesk_tab-1.png"
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
              <b>Ticket Management:</b>Create, update, and manage your Zendesk tickets effortlessly.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b> User Engagement:</b>Keep track of all your users and their statuses in real-time.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Organization Management:</b> Easily manage organizations and their associated data.
            </p>
            )}
            <div>
            {loading ? (
              <SkeletonLoader count={2} height={150} width="100%" />
            ) : (
              <img
                src="/integration_page/Zendesk_tab2.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            )}
            </div>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              "Get Started"
            )}
            </p>
            <p className="text-heading text-xl sm:mb-3">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
           " Ready to take your customer support operations to the next level? Integrate Zendesk with Tempo today.")}
            </p>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              "Integrate Now"
            )}
            </p>
          </div>
        </div>
        
        <div className="p-12 bg-[#363744]">
            <div class="stick-right ">
        

              <div className="text-left">
                <p className="flex gap-[1rem] text-[20px] font-semibold text-[white]"><span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/zendesk-integration">Integration Guide</a></p>
              </div>
            </div>
          </div>
      </div>
      </div>
    </div>
  );
};

export default page;
