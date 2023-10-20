import React, { useState, useEffect } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";

const Reach = ({handleClickscroll}) => {

  const data = [
    {
      reach: "99.999%        ",
      name: "Higher CSATs   ",
      para: "Companies using our platform can anticipate higher customer satisfaction scores, contributing to overall customer loyalty.   ",
      link_title: "Leverage your data",
    },
    {
      reach: "99.999%        ",
      name: "More Deflections ",
      para: "Experience a significant reduction in the number of tickets that require human intervention, optimizing your operations.    ",
      link_title: "Leverage your data",
    },
    {
      reach: "55++",

      name: "24/7/365 Uptime",
      para: "Benefit from round-the-clock system availability, ensuring uninterrupted service for your customers.   ",
      link_title: "Leverage your data",
    },
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-white p-0 sm:p-[0px] sm:mb-[40px]  shadow-box">
      {loading ? (
        <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
          <SkeletonLoader height={60} width={"50%"} />
        </div>
      ) : (
        <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3  sm:text-center text-2xl sm:text-[38px] font-bold sm:mb-0">
          Exceptional Performance{" "}
        </h1>
      )}

      <div className="sm:pt-[0px] bg-white">
        <div className="max-w-[90%] sm:max-w-[100%]">
          {data.length === 0 ? (
            <p className=" text-xl align-bottom font-semibold italic text-center">
              No data found!
            </p>
          ) : (
            ""
          )}
          <div className="max-w-[1400px] w-full m-auto sm:py-4 sm:px-4 px-3 lg:px-4 relative group">
            <div className="grid grid-cols-1 md:grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3      gap-5 sm:gap-12  w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 lg:px-4">
              {data?.map((ele, key) => (
                <div
                  className="bg-white flex flex-col justify-start cursor-pointer sm:p-[0px] hover:outline-[1px] hover:outline-[black]  transition-transform duration-300 "
                  key={key}
                >
                  {/* <div className="p-0 text-[50px] font-bold leading-[60px] py-2 sm:p-8 md:py-7 md:px-0 text-[#fe9327] ">
                      {ele.reach}
                    </div> */}
                  {loading ? (
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-semibold">
                      <SkeletonLoader height={60} className="w-[100%] sm:w-[50%]" />
                    </div>
                  ) : (
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-bold text-[20px] sm:text-[24px] text-[#fe9831] ">
                      {ele.name}
                    </div>
                  )}
                  {loading ? (
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-semibold">
                      <SkeletonLoader height={60} className="w-[100%] sm:w-[50%]" />
                    </div>
                  ) : (
                    <div className="p-0 py-2 sm:p-3  md:px-0 ">
                      {ele.para}
                    </div>
                  )}
                  {/* {loading ? (
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-semibold">
                      <SkeletonLoader height={60} className="w-[100%] sm:w-[50%]" />
                    </div>
                  ) : (
                    <div className="p-0 py-2 sm:p-8 md:py-7 md:px-0 font-semiEbold cursor-pointer">
                      Schedule Demo →
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 w-[100%] sm:flex p-8 sm:p-0 gap-4 sm:w-auto items-center mx-auto mt-[0px] mb-[2rem] sm:pb-[30px] justify-center">
        {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
          onClick={handleClickscroll}
            type="button"
            className="inline-block px-6 pb-2 pt-2.5 text-xs rounded-xl sm:text-[20px]  leading-normal bg-[white] hover:bg-[#fe9327] text-[#fe9327] font-semibold hover:text-white  border active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
          >
            <p>Get a Quote</p>
          </button>
        )}
        {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
            type="button"
            className="inline-block px-6 pb-2 pt-2.5 text-xs sm:text-[20px] rounded-xl  leading-normal bg-[#fe9327] hover:bg-[white] text-white font-semibold hover:text-[#fe9327]  border  active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
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
  );
};

export default Reach;
