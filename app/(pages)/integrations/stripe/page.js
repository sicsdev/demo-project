"use client"

import React, { useState } from "react";
import { ArrowLongLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
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
                "Stripe Integration with Tempo"
                )}
                </p>

                <h2 className="!font-bold text-h3 text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={60} width={140} />
                ) : (
                  "Stripe"
                )}</h2>
                 <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px] text-left">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              "Automate Your Billing and Payment Processes with Precision"
              )}
              </p>
              </div>
              <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px] my-[21px] sm:my-0">

              <div className="">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                <img src="/stripee.png" className="w-[120px] h-[120px]"></img>
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
              "Why Integrate Stripe with Tempo?"
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
              "Automated Payment Workflows"
              )}
              </p>
              <p className="text-heading text-xl">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              "Combine Stripe's robust payment processing with Tempo's Workflow Builder to automate your entire payment cycle."
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
              "Enhanced Security"
              )}
              </p>
              <p className="text-heading text-xl">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              "Both Tempo and Stripe adhere to stringent data security protocols, ensuring that your financial transactions are secure."
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-[26px]">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
                "How It Works"
              )}
              </p>
              <p className="text-[#363866] mb-1  sm:mt-[20px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (<>
                <span className="font-semibold"> Connect Stripe to Tempo's Workflow Builder:</span>Easily link your Stripe account to Tempo's Workflow Builder.</>
              )}
              </p>
              {/* <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Easily link your Stripe account to Tempo's Workflow Builder."
              )}
              </p> */}
              <p className="text-[#363866] mb-1  text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (<>
                <span className="font-semibold">Select and Add Stripe Endpoints: </span> Choose from a variety of Stripe endpoints to create custom billing and payment workflows.</>
              )}
              </p>
              {/* <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Choose from a variety of Stripe endpoints to create custom billing and payment workflows."
              )}
              </p> */}
              <p className="text-[#363866] mb-1  text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (<>
                <span className="font-semibold">Leverage the Learning Center: </span> Utilize recommendations from Tempo's Learning Center to optimize your payment workflows.</>
              )}
              </p>
              {/* <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Utilize recommendations from Tempo's Learning Center to optimize your payment workflows."
  )}
              </p> */}
              <div>
              {loading ? (
                <SkeletonLoader count={2} height={150} width="100%" />
              ) : (
              <img
                src="/integration_page/Stripe_tab2.png"
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
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Create and Manage Charges:</b> Automate the process of creating new charges and retrieving charge details.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Subscription Handling:</b> Create, update, and cancel subscriptions seamlessly.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Customer Management:</b> Create and update customer records without manual intervention.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Refund Operations:</b> Automate the creation and retrieval of refunds.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Dispute Resolution:</b> Handle and update dispute details automatically.
              </p>
              )}
              <div>
          
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
              "Ready to optimize your payment and billing processes? Integrate Stripe with Tempo today."
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
  ) : (
    <p className="flex gap-[1rem] text-[20px] font-semibold text-[white] justify-center">

      <span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/stripe-integration">Integration Guide</a></p>)}
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
