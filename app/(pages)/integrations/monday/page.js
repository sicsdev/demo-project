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
    <>
<div className="w-full sm:w-[1440px] mx-auto" >

      <div className="bg-white sm:p-[120px] sm:p-12 p-2 text-center">
        <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
              <div className=" flex flex-col">
                <p className="text-[#ff5721] font-bold text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="70%" />
                ) : (
                "Monday Integration with Deflection AI"
                )}
                </p>

                <h2 className="!font-bold text-h3 text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={60} width={140} />
                ) : ("Monday"
                )}</h2>
                 <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px] text-left">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Empower Your Team with Seamless Workflow Management"
              )}
              </p>
              </div>
              <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px] my-[21px] sm:my-0">

              <div className="">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                <img src="/monday_logo_icon_168967_1.png" className="w-[120px] h-[120px]"></img>
              )}
              </div>
            </div>
            </div>
            </div>
            <div className="bg-white sm:py-[120px] sm:py-12 p-2 sm:pt-0 text-center">
      <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
      <div className="bg-[#f8f9fa!important]  sm:px-[120px] sm:px-12">
            <div className="text-left sm:mt-7 p-[24px] sm:p-0">
             
             
              <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px]">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Why Integrate monday.com with Deflection AI?"
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
              "Unmatched Flexibility"
              )}
              </p>
              <p className="text-heading text-xl">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              "Combine monday.com's customizable boards and items with Deflection AI's Workflow Builder for a tailored project management experience."
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Unified Dashboard"
              )}
              </p>
              <p className="text-heading text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Manage all your monday.com boards, items, and users directly from Deflection AI's centralized interface."
              )}</p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Data-Driven Insights"
              )}
              </p>
              <p className="text-heading text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Leverage Deflection AI's Learning Center to analyze metrics from your monday.com boards for informed decision-making."
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-[26px]">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
                "How It Works"
              )}
              </p>
              <p className="text-[#363866]   sm:mt-[20px] text-xl mb-[1rem]">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (<>
                <span className="font-semibold">Connect monday.com to Deflection AI's Workflow Builder: </span>Integrate your monday.com account with Deflection AI in just a few clicks.</>
              )}
              </p>
              {/* <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Integrate your monday.com account with Deflection AI in just a few clicks."
              )}
              </p> */}
              <p className="text-[#363866]  text-xl mb-[1rem]">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (<>
                <span className="font-semibold">Customize Your Workflow with monday.com Endpoints:</span>Add monday.com endpoints to your Deflection AI workflow for a fully personalized project management solution.</>
              )}
              </p>
              {/* <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
           "   Add monday.com endpoints to your Deflection AI workflow for a fully personalized project management solution."
              )}
              </p> */}
              <p className="text-[#363866]   text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (<>
                <span className="font-semibold">Analyze and Optimize:</span>Use Deflection AI’s Learning Center to gain actionable insights into your monday.com boards and optimize them based on real-time data.</>
              )}
              </p>
              {/* <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Use Deflection AI’s Learning Center to gain actionable insights into your monday.com boards and optimize them based on real-time data."
              )}
              </p> */}
              <div>
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
              <img
                src="/integration_page/Monday_tab-1.png"
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
                <b>Board Management:</b> Create, update, and delete boards effortlessly.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Item Tracking:</b> Manage all items across your boards.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> User Roles:</b> Assign and manage user roles for enhanced collaboration.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Invoice Operations:</b> Create and send invoices to
                customers.
              </p>
              )}
              <div>
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
              <img
                src="/integration_page/Monday_tab2.png"
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
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              "Ready to take your project management to the next level? Integrate monday.com with Deflection AI today."
              )}
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
  {loading ? (
    <SkeletonLoader count={1} height={20} width="100%" />
  ) : (
    <p className="flex gap-[1rem] text-[20px] font-semibold text-[white] justify-center">

      <span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/monday-integration">Integration Guide</a></p>)}
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
    </>
  );
};

export default page;
