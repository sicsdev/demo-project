"use client";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../../Skeleton/Skeleton";
const banner = ({handleClickScroll}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const customStyles = {
    backgroundImage: `url('https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt7502941e41c99672/5ee7a43e8aa85c4a23eb61a6/xl-bnr-callstats.io-monitoring-data3.png?cache=59d90bb98e7585b9a89b84ef9e319161&tr=ar-16-9,fo-auto,w-1200')`,
    backgroundImage: `url('../solutions_/workflow.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    left: 0,
    right: 0,
    zIndex: 9,
  };
  return (
    <div
      className="sm:top-[58px] sm:absolute sm:h-[70vh] sm:flex sm:justify-end sm:flex-col mb-[0px] sm:mb-[45px] for-bg relative"
      style={customStyles}
    >
      <div className="w-auto sm:p-14 relative p-4 sm:w-[1450px] mx-auto App w-full">
        {loading ? (
          <div className="block !font-[700] w-[100%] sm:w-[50%]  pt-5 sm:pt-0  text-[33px] leading-[40px]  relative text-[black]">
            <SkeletonLoader height={60} />
          </div>
        ) : (
          <div className="sm:text-5xl text-[22px] text-white sm:font-bold font-bold pt-5 sm:p-0">
            Reach Your Customers
            <br />
            Anywhere, Anytime with SMS
          </div>
        )}
            {loading ? (
          <div className="block !font-[700] w-[100%] sm:w-[50%]  pt-5 sm:pt-0 sm:mt-7 text-[33px] leading-[40px]  relative text-[black]">
            <SkeletonLoader height={90} />
          </div>
        ) : (
        <div className="text-white sm:mt-8 mt-2 sm:text-xl text-[15px] w-full sm:w-[600px]">
      
            Efficiently reach your customers anywhere, anytime by automating notifications, one-time passwords, reminders, and alerts.
        </div>
        )}
        <div className="grid grid-cols-1 w-[100%] sm:grid-cols-2 md:w-[55%]  xl:w-[30%] p-0 mt-10 sm:p-0 gap-4  items-center   sm:mt-10 mb-[2rem] sm:pb-[30px] ">
      
        {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
          onClick={handleClickScroll}
            type="button"
            className="inline-block font-semibold  rounded-lg hover:bg-white px-6 pb-2 pt-2 border-2 border-primary  leading-normal hover:text-primary text-white bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#2563eb] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
          >
            Get a Quote
          </button>
        )}
        {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
            type="button"
            className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
          >
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: `
   <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;" >
   <span className="underline cursor-pointer text-white ">Get Started
   </span>
   </a>
  `,
              }}
            />
          </button>
        )}
    
        </div>
      </div>
    </div>
  );
};

export default banner;
