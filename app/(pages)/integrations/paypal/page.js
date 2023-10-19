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
                "PayPal Integration with Tempo"
              )}
              </p>
              <h2 className="!font-bold text-h3 text-left">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
              "Paypal"
              )}
              </h2>
            </div>
          <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]  my-[21px] sm:my-0">

            <div className="">
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
              <img src="/pay.png" className="w-[120px] h-[120px]"></img>
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
              "Automate Your Payment and Billing Operations with Unmatched Flexibility"
            )}
            </p>
         
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              "Why Integrate PayPal with Tempo?"
            )}
            </p>
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              "Streamlined Payment Workflows"
            )}
            </p>
            <p className="text-heading text-xl">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "Combine PayPal's versatile payment options with Tempo's Workflow Builder to automate your payment and billing processes."
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
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "Utilize Tempo's Learning Center to optimize your payment workflows based on real-time analytics and recommendations."
            )}
            </p>
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="40%" />
            ) : (
              "How It Works"
            )}
            </p>
            <p className="text-[#363866] !font-semibold  sm:mt-[20px] text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
    "1. Connect PayPal to Tempo's Workflow Builder"
            )}
            </p>
            <p className="text-heading text-xl sm:mb-3">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              "Seamlessly link your PayPal account to Tempo's Workflow Builder."
            )}
            </p>
            <p className="text-[#363866] !font-semibold   text-xl">
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
              "2. Select and Add PayPal Endpoints"
            )}
            </p>
            <p className="text-heading text-xl sm:mb-3">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "Choose from a range of PayPal endpoints to create custom payment and billing workflows."
            )}
            </p>
            <p className="text-[#363866] !font-semibold  text-xl">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "3. Leverage the Learning Center"
            )}
            </p>
            <p className="text-heading text-xl sm:mb-3">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
           "   Use insights from Tempo's Learning Center to continually improve your payment operations."
            )}
            </p>
            <div>
            {loading ? (
              <SkeletonLoader count={2} height={150} width="100%" />
            ) : (
              <img
                src="/integration_page/Paypal_tab-1.png"
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
              <b>Payment Management:</b> Create, execute, and retrieve payment
              details.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b> Subscription Plans:</b> Create, update, and manage billing
              plans.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b> Order Handling:</b> Create, update, and capture orders.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b> Invoice Operations:</b> Create and send invoices to customers.
            </p>
            )}
            <div>
            {loading ? (
              <SkeletonLoader count={1} height={200} width="100%" />
            ) : (
              <img
                src="/integration_page/Paypal_tab2.png"
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
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "Ready to take your payment and billing operations to the next level? Integrate PayPal with Tempo today."
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
                <p className="flex gap-[1rem] text-[20px] font-semibold text-[white]"><span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/paypal-integration">Integration Guide</a></p>
              </div>
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default page;
