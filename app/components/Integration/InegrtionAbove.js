"use client";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";

export const InegrtionAbove = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="bg-white special">
      <div className=" mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]  py-10">
        <div className="text-center mb-5">
          <p className=" font-bold   text-center mb-12 sm:mb-0 sm:!leading-[3.75rem] sm:w-[900px] m-auto text-[#FF5721]">
            {loading ? (
              <SkeletonLoader count={1} height={40} width="100%" />
            ) : (
            "INTEGRATIONS"
            )}
          </p>

          <h2 className="font-bold text-xl  sm:text-h2 text-center  w-[296px] sm:!leading-[3.75rem] sm:my-[3rem] sm:w-[825px] m-auto">
            {/* <span className="text-[#FF5721]"> Form Concierge </span> */}
            {loading ? (
              <SkeletonLoader count={2} height={80} width="80%" />
            ) : (
            "Integrate Deflection AI With Your Revenue Ops Tech Stack"
            )}
          </h2>
          <p className="text-[#474F70] text-xl text-center  mt-3 sm:my-[3rem] sm:w-[600px] m-auto">
          {loading ? (
            <SkeletonLoader count={1} height={20} width="50%" />
          ) : (
            "All your favorite apps you use for sales and marketing"
          )}
          </p>
        </div>

        <div className="block text-center">
          <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8 sm:mt-0">
            <div className="block sm:flex justify-center w-[100%] items-center gap-8">
            {loading ? (
              <SkeletonLoader count={1} height={80} width={200} />
            ) : (
            <div className="uppercase cursor-pointer text-center getademo_animation mb-4 sm:mb-0 py-[22px] px-3 w-full sm:w-[170px] font-bold text-[20px] focus:ring-yellow-300 text-white dark:focus:ring-yellow-900 rounded-2xl">
            <button className="uppercase">
              Get a Demo
            </button>
          </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};