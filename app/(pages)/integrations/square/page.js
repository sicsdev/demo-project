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
             "   Square Integration with Tempo"
                )}
                </p>

                <h2 className="!font-bold text-h3 text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={60} width={140} />
                ) : ("Square"
                )}</h2>
                  <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px] text-left">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
             " Unleash the Power of Comprehensive Business Management with Real-Time Data Sync"
              )}
              </p>
              </div>
              <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px] my-[21px] sm:my-0">

              <div className="">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                <img src="/integrations/square.svg" className="w-[120px] h-[120px]"></img>
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
              "Why Integrate Square with Tempo?"
              )}
              </p>
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Unified Business Dashboard:</b> Manage all aspects of your business, from inventory to payments, directly from Tempo's centralized interface.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Automated Workflows:</b> Leverage Tempo's workflow automation to streamline your Square operations, including customer management, payment processing, and dispute resolution.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Data-Driven Decisions:</b> Utilize Tempo's analytics to gain actionable insights from your Square data, enabling smarter business strategies.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-[26px]">
                How It Works
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-[#363866]   sm:mt-[20px] text-xl mb-1">
                <span className="font-semibold"> Connect Square to Tempo:</span>
              Seamlessly integrate Square with Tempo in just a few clicks.

              </p>
              )}
              {/* {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
              Seamlessly integrate Square with Tempo in just a few clicks.
              </p>
              )} */}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-[#363866]  text-xl mb-[1rem]">
                <span className="font-semibold"> Customize Your Business Workflow with Square Endpoints:</span>Incorporate Square's diverse API endpoints into your Tempo workflows for a tailored business management experience.
              </p>
              )}
              {/* {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
              Incorporate Square's diverse API endpoints into your Tempo workflows for a tailored business management experience.
              </p>
              )} */}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-[#363866] mb-1  text-xl">
                <span className="font-semibold"> Analyze and Optimize:</span>Use Tempo's analytics to derive valuable insights from your Square data, driving continuous improvement.
              </p>
              )}
              {/* {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (

              <p className="text-heading text-xl sm:mb-3">
              Use Tempo's analytics to derive valuable insights from your Square data, driving continuous improvement.
              </p>
              )} */}
              <div>
              {loading ? (
                <SkeletonLoader count={2} height={150} width="100%" />
              ) : (
              <img
                src="/integration_page/Square_tab-1.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
              )}
            </div>
            {loading ? (
              <SkeletonLoader count={1} height={20} width="50%" />
            ) : (
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[35px] text-xl">
                Features
              </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Customer Management:</b> Create, update, and manage Square customers effortlessly.
              </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Payment Processing:</b>Keep track of all your payments and their statuses in real-time.
              </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Dispute Resolution:</b> Manage disputes and submit evidence directly from Tempo's interface.
              </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Subscription Handling:</b> Easily manage and update customer subscriptions.
              </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Refund Operations:</b> Process refunds and keep track of their statuses.
              </p>
            )}
              <div>
              {loading ? (
                <SkeletonLoader count={2} height={150} width="100%" />
              ) : (
              <img
                src="/integration_page/Square_tab2.png"
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
              Ready to take your business operations to the next level? Integrate Square with Tempo today.
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

      <span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/square-integration">Integration Guide</a></p>)}
</div>
<div className="rounded-[20px] bg-white  shadow-2xl w-full sm:w-[100%] sm:py-[56px] sm:py-[30px] mt-[2rem]">
  <p className="text-[20px] text-[#363866] sm:mb-3 font-semibold">
    {loading ? (
      <SkeletonLoader count={1} height={20} width="100%" />
    ) : (
      "See how it works with Tempo AI"
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
