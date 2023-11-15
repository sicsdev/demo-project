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
                "Gorgias API Integration"
              )}
              </p>

              <h2 className="!font-bold text-h3 text-left">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                "Gorgias"
              )}</h2>
                <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px] text-left">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "Streamline Customer Support and Business Operations with RESTful API"
            )}
            </p>
            </div>
            <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]  my-[21px] sm:my-0">

            <div className="">
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
              <img src="/geo.png" className="w-[120px] h-[120px]"></img>
            )}
            </div>
          </div>
          </div>
          </div>
          <div className="bg-white sm:py-[120px] sm:py-12 p-2 sm:pt-0 text-center">
      <div className="grid grid-cols-1  sm:grid-cols-[75%_25%] ">
      <div className="bg-[#f8f9fa!important]  sm:px-[120px] sm:px-12">
          <div className="text-left sm:mt-7 p-[24px] sm:p-0">
          
 
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 text-[26px]">
              Why Choose Gorgias API?{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
              Unified Customer Management:{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl">
              Retrieve, create, update, and delete customer profiles
              effortlessly.{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              Automated Rule Setting:{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl">
              Manage rules to automate your customer support and business
              processes.
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              Ticketing Simplified:{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl">
              Handle all your customer tickets in one place for optimal support.{" "}
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
            <p className="text-[#363866] sm:mt-[20px] text-xl mb-[1rem]">
              <span className="font-semibold">Secure Authentication:</span>Connect your Gorgias account securely with your application.
            </p>
          )}
          {/* {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl sm:mb-3">
              Connect your Gorgias account securely with your application.{" "}
            </p>
          )} */}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866]    text-xl mb-[1rem]">
             <span className="font-semibold">Resource Management:</span>&nbsp; Utilize Gorgias' RESTful API to manage customers, rules, tickets,
              teams, and users.
            </p>
          )}
          {/* {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl sm:mb-3">
              Utilize Gorgias' RESTful API to manage customers, rules, tickets,
              teams, and users.{" "}
            </p>
          )} */}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866]  text-xl">
             <span className="font-semibold">Data Utilization:</span>&nbsp; Leverage Deflection AI's analytics to gain valuable insights from your
              Shopify data, enabling continuous business improvement.
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl sm:mb-3">
              Leverage Deflection AI's analytics to gain valuable insights from your
              Shopify data, enabling continuous business improvement.{" "}
            </p>
          )}
            <div>
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
              <img
                src="/integration_page/Gorgias_tab-1.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            )}
            </div>
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[35px] text-xl">
              Key Features
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Customer Profiles:</b>Comprehensive management of customer
              data.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b> Ticket Handling: </b>Efficiently manage all customer tickets.
            </p>)}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Rule Automation:</b>Create and manage rules to automate various
              tasks.
            </p>
            )}
            <div>
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
              <img
                src="/integration_page/Gorgias_tab2.png"
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
              Ready to optimize your customer support and business operations?
              Integrate Gorgias API today.{" "}
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

      <span className="mt-[3px]"><BookOpenIcon class="h-6 w-6 text-gray-500" /></span><a href="/article/gorgias-integration">Integration Guide</a></p>)}
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
