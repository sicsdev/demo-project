"use client";
import React from "react";
import { useState, useEffect } from "react";
import integration from "../../data/newInt.json";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SkeletonLoader from "../Skeleton/Skeleton";
const Homeintegration = (props) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(integration);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white  sm:p-[0px] ">
      <div className="w-full m-auto flex justify-center sm:my-[50px]"></div>
      {loading ? (
        <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
          <SkeletonLoader height={60} width={"50%"} />
        </div>
      ) : (
        <h1 className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[42px] font-[600] sm:mb-7">
          Deflection AI Integration Ecosystem{" "}
        </h1>
      )}
      {loading ? (
        <div className="text-blue-400 w-full md-w-[339px] text-center font-[400] text-heading  justify-center text-[16px] leading-[22px] sm:text-[24px] sm:leading-8 gap-2">
          <SkeletonLoader height={60} width={"100%"} />
        </div>
      ) : (
        <p className="text-blue-400 w-full m-auto sm:w-[80%] text-center font-[400] text-heading xs:flex-row xs:flex-col sm:flex justify-center text-[16px] leading-[22px] sm:text-[16px] sm:leading-8 gap-2">
          Enhance your setup with APIs that integrate effortlessly into the Deflection AI
          platform, meeting your unique business needs.
        </p>
      )}

      <div className="sm:pt-[10px] bg-white">
        <div className="pt-8 pb-8 sm:pb-4">
          <div className="mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]">
            {data.length === 0 ? (
              <p className=" text-xl align-bottom font-semibold italic text-center">
                No data found!
              </p>
            ) : (

              ""
            )}
            <div className="max-w-[1400px] w-full m-auto sm:py-4 sm:px-4 px-0 lg:px-4 relative group">
              <div className=" flex justify-center items-center flex-wrap gap-4 ">
                {data?.map((item, key) => (
                  <div
                    className="bg-white w-[150px] flex flex-col items-center  justify-between cursor-pointer shadow-lg hover:translate-y-[-4px] transition-transform duration-300 "
                    style={{
                      border: "1px solid rgb(237, 237, 237)",
                      borderRadius: "8px",
                    }}
                    key={key}
                  >
                    <div className="p-[20px] sm:p-2 sm:p-8 md:py-7 md:px-4 ">
                      {/* <Link href={`${item.link}`} > */}
                      {loading ? (
                        <div className="relative mx-auto w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] gap-2 rounded-lg sm:m-auto sm:mb-5">
                          <SkeletonLoader className=" w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] " />
                        </div>
                      ) : (
                        <div className="relative mx-auto w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] gap-2 rounded-lg sm:m-auto sm:mb-5">
                          <Image
                            fill={"true"}
                            className="bg-contain mx-auto w-full rounded-lg"
                            alt="logo.png"
                            src={item.logo}
                          />
                        </div>
                      )}
                      {/* </Link> */}
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeintegration;
