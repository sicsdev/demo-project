"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import SkeletonLoader from "../Skeleton/Skeleton";
const Exceptions = () => {
  const reachData = [
    {
      reach: "99.999%",
      name: "Better Satisfaction",
      para: "American and outsourced customer service is terrible. Deflection improves customer satisfaction, meaning happier customers.  ",
      link_title: "Leverage your data",
    },
    {
      reach: "99.999%",
      name: "Instant Integration",
      para: "Deflection AI automatically grabs your website data and integrations to set up your account for you. Get up and running in minutes, not days.",
      link_title: "Leverage your data",
    },
    {
      reach: "55++",
      name: "Always on the Clock",
      para: "Benefit from magical 24/7 uptime and 0 minute response times, no staffing or humans required.",
      link_title: "Leverage your data",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-white special">
      <div className="mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%] py-10">
        <div className="grid grid-cols-1 sm:grid-cols-1 sm:mt-12 gap-[30px]  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[214px]">
            <div className="">
              <div className="hidden sm:block sticky top-[230px]">
                <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3  text-2xl sm:text-[26px] sm:w-[331px] md:w-[468px] lg:w-[500px] xl:w-[100%] md:text-[38px] font-bold sm:mb-0 sm:leading-[1.4em]">
                  {loading ? <SkeletonLoader count={2} height={35} width={"70%"} /> :
                    <>
                     Deflection is the leader in {" "}<br />
                      <span className="text-[#2563eb]">customer service AI</span> {" "}
                    </>
                  }
                </h1>
              </div>
              <div className=" sm:hidden block">
                <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3 text-center text-2xl sm:text-[38px] font-bold sm:mb-0">
                  {loading ? <SkeletonLoader count={2} height={35} width={"100%"} /> :
                    <>
                    Deflection is the leader in {" "}<br />
                     <span className="text-[#2563eb]">customer service AI</span> {" "}
                   </>
                  }
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1">
              {reachData.map((ele, key) => (
                <div
                  style={{ borderBottom: "1px solid rgba(203, 206, 209, .5)" }}
                  className={` scroll-child ${key == 0 ? "sm:pt-[0px]" : "sm:pt-[20px]"
                    } ${key == 2 ? "sm:pb-[0px] !border-b-0" : "sm:pb-[16px]"
                    } sm:px-[40px]  `}
                  key={key}
                >
                  <div className="flex flex-row sm:gap-[2rem] gap-4">
                    <p className="text-[#2563eb]   text-sm mt-8 sm:mt-3">
                      {loading ? <SkeletonLoader count={1} height={20} width={20} /> :
                        <>
                          {" "}
                          0{key + 1}{" "}
                        </>
                      }
                    </p>
                    <p className="text-[heading] text-sm mt-8 sm:mt-3 sm:text-[24px]">
                      {loading ? <SkeletonLoader count={1} height={30} width={150} /> :
                        <>
                          {ele.name}
                        </>
                      }
                    </p>
                  </div>
                  <div className="sm:pl-[49px] pt-[10px] sm:pt-[20px]">
                    <p className="text-[#474F70] text-sm sm:text-[16px]  mt-8 sm:mb-0 mb-3 sm:mt-3 sm:leading-[1.8em]">
                      {loading ? <SkeletonLoader count={3} height={20} width={"100%"} /> :
                        <>
                          {ele.para}
                        </>
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exceptions;
