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

          <div className=" flex flex-col text-left">
            <p className="text-[#ff5721] font-bold">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="70%" />
              ) : (
                "Slack Integration with Deflection AI"
              )}
            </p>
            <h2 className="!font-bold text-h3 text-left">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                "Slack"
              )}</h2>
                <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px] text-left">
                {loading ? (
                  <SkeletonLoader count={2} height={20} width="100%" />
                ) : (
                  "Transform Team Collaboration for Unparalleled Efficiency"
                )}
              </p>
          </div>
          <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]  my-[21px] sm:my-0">

            <div className="">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                <img src="/slack-logo-icon.png" className="w-[120px] h-[120px]"></img>
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
                  "Why Integrate Slack with Deflection AI?"
                )}
              </p>
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-heading text-xl sm:mb-3">
                  <b>Enhanced Team Collaboration:</b> Merge Slack's robust messaging and communication features with Deflection AI's workflow capabilities for a seamless team collaboration experience.
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-heading text-xl sm:mb-3">
                  <b> Unified Communication Hub:</b> Manage Slack channels, messages, and users directly from Deflection AI's centralized dashboard, making team interactions more efficient.
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-heading text-xl sm:mb-3">
                  <b>Data-Driven Collaboration:</b> Utilize Deflection AI's analytics to gain insights from your Slack data, empowering your team to collaborate more effectively.
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
                <p className="text-[#363866] text-xl  sm:mb-1">
                    <span className="font-semibold">Connect Slack to Deflection AI:</span> Integrate your Slack workspace with Deflection AI in just a few simple steps.
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-[#363866]  text-xl  sm:mb-1">
                 <span className="font-semibold"> Customize Your Workflow with Slack Endpoints:</span> Incorporate Slack's diverse API methods into your Deflection AI workflows for a tailored team collaboration experience.
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-[#363866] text-xl   sm:mb-1">
                <span className="font-semibold">Analyze and Optimize:</span> Leverage Deflection AI's analytics to derive actionable insights from your Slack data, enabling continuous improvement in team collaboration.
                </p>
              )}
              <div>
                {loading ? (
                  <SkeletonLoader count={2} height={150} width="100%" />
                ) : (
                  <img
                    src="/integration_page/Slack_tab-1.png"
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
                  <b>Channel Management:</b> Create, update, and manage your Slack channels effortlessly.
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-heading text-xl sm:mb-3">
                  <b> Message Automation:</b> Automate the posting of messages to channels based on triggers.
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-heading text-xl sm:mb-3">
                  <b> User Engagement:</b>Keep track of all users and their roles in your Slack workspace.
                </p>
              )}
              <div>
                {loading ? (
                  <SkeletonLoader count={2} height={150} width="100%" />
                ) : (
                  <img
                    src="/integration_page/Slack_tab2.png"
                    className="w-[full] sm:[465px] sm:h-[465px]"
                  />
                )}
              </div>
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
                  Get Started
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-heading text-xl sm:mb-3">
                  Ready to revolutionize your team's collaboration? Integrate Slack with Deflection AI today.
                </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">

                  Integrate Now
                </p>
              )}
            </div>
          </div>

          <div className="p-12 bg-[#363744]">
          <div class="stick-right ">


<div className="text-left">
  {loading ? (
    <SkeletonLoader count={1} height={20} width="100%" />
  ) : (
    <p className="flex gap-[1rem] text-[20px] font-semibold text-[white] justify-center">

      <span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/slack-integration">Integration Guide</a></p>)}
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
