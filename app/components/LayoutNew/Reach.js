import React, { useState, useEffect } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";
const Reach = () => {
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

      name: "24/7/365 Uptime ",
      para: "Benefit from round-the-clock system availability, ensuring uninterrupted service for your customers.  ",
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
    <div className="bg-white p-0 sm:p-[0px] sm:mb-12  shadow-box">
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
                  className="bg-white flex flex-col justify-between cursor-pointer sm:p-[0px] hover:outline-[1px] hover:outline-[black]  transition-transform duration-300 "
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
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-semibold ">
                      {ele.name}
                    </div>
                  )}
                  {loading ? (
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-semibold">
                      <SkeletonLoader height={60}className="w-[100%] sm:w-[50%]"/>
                    </div>
                  ) : (
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 ">
                      {ele.para}
                    </div>
                  )}
                  {loading ? (
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-semibold">
                      <SkeletonLoader height={60} className="w-[100%] sm:w-[50%]" />
                    </div>
                  ) : (
                    <div className="p-0 py-2 sm:p-8 md:py-7 md:px-0 font-semibold cursor-pointer">
                      Schedule Demo →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reach;
