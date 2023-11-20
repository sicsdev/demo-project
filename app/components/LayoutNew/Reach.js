import React, { useState, useEffect } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";

const Reach = ({ handleClickScroll, data, heading = ' Exceptional Performance' }) => {



  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="sm:mt-20 bg-white p-0 sm:p-[0px] sm:mb-[40px]  shadow-box p-[15px]">
      <div className="grid grid-cols-2">
        <div>
          <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3 text-center text-2xl sm:text-[38px] font-bold sm:mb-0">
            {heading}{" "}
          </h1>
        </div>
        <div></div>
      </div>
      {/* {loading ? (
        <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
          <SkeletonLoader height={60} width={"50%"} />
        </div>
      ) : (
        <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3 text-center text-2xl sm:text-[42px] font-bold sm:mb-0">
          {heading}{" "}
        </h1>
      )}

      <div className="sm:pt-[0px] bg-white">
        <div className="max-w-[90%] sm:max-w-[100%] m-auto">
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
                  {loading ? (
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-semibold">
                      <SkeletonLoader height={60} className="w-[100%] sm:w-[50%]" />
                    </div>
                  ) : (
                    <div className="text-center sm:text-left p-0 py-2 sm:p-3 md:py-2 md:px-0 font-bold text-[20px] sm:text-[28px] text-[#0057ff] ">
                      {ele.name}
                    </div>
                  )}
                  {loading ? (
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-semibold">
                      <SkeletonLoader height={60} className="w-[100%] sm:w-[50%]" />
                    </div>
                  ) : (
                    <div className="text-center sm:text-left p-0 py-2 sm:p-3  md:px-0 sm:text-[16px]">
                      {ele.para}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 w-[100%] sm:flex pt-8 pb-0 sm:pt-0 sm:pb-0 gap-4 sm:w-auto items-center mx-auto mt-[0px] mb-[2rem] sm:pb-[30px] justify-center">
        {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
            onClick={handleClickScroll}
            type="button"
            className="inline-block font-semibold  rounded-lg bg-white px-6 pb-2 pt-2 border-2 border-primary  leading-normal text-primary hover:text-white hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
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
      </div> */}
    </div>
  );
};

export default Reach;
