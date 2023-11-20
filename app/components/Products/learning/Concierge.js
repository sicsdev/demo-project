"use client"
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
// import SkeletonLoader from "../../Skeleton/Skeleton";
import SkeletonLoader from "../../Skeleton/Skeleton";
import Link from "next/link";
const Concierge = () => {
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
setTimeout(() => {
  setLoading(false)
}, 3000);
  },[])
  const data = [
    {
      name: "Intelligent Scheduling and Reservations",
      para: "Leverage the Learning Center to understand customer preferences and the Workflow Builder to automate bookings and appointments, enhancing the customer experience.",
      buttons: [{ buttonText: "Travel & Hospitality" },
      { buttonText: "Healthcare" }],
    },
    {
      name: "Automated Claim and Request Processing",
      para: "Utilize the Learning Center to analyze claim patterns and customer issues, and the Workflow Builder to streamline claim approvals and ticket resolutions, increasing customer satisfaction.",
      buttons: [{ buttonText: "Insurance" },
      { buttonText: "Telecoms" }],
    },
    {
      name: "Efficient Customer Onboarding",
      para: `Use the Learning Center to identify onboarding bottlenecks and the Workflow Builder to automate the onboarding process, from sign-up to personalized service offerings.`,
      buttons: [
        { buttonText: "Healthcare" },
        { buttonText: "Insurance" },
      ],
    },
    {
      name: "Real-Time Inventory and Order Management",
      para: "Employ the Learning Center to monitor inventory levels and customer preferences, and the Workflow Builder to automate order processing and room allocations, reducing errors and improving customer satisfaction.",
      buttons: [{ buttonText: "Retail Chains" },
      { buttonText: "Healthcare" }],
    },
    {
      name: "Proactive Customer Support and Issue Resolution",
      para: "Harness the Learning Center to identify common support issues and the Workflow Builder to automate ticketing and issue resolution, improving response times.",
      buttons: [
        { buttonText: "Telecoms" },
        { buttonText: "Retail Chains" },
      ],
    },
  ];
  return (
    <div className="bg-white">
      <div className=" mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]  py-10 ">
        <div className="flex flex-col sm:flex-row items-center justify-around text-center sm:text-left">
        {loading ? (
              <SkeletonLoader count={2} height={60} width="100%" />
            ) : (
          <div>
              <h1 className="   mb-5  sm:p-0 sm:mt-0 mt-0 text-black text-center sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
              Use Cases Across Industries
          </h1>
      
          <p className="w-full md:ml-[px]   text-blue-400 text-center font-[400] sm:mt-3  mb-8 sm:mb-0 px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
            Unlock Intelligent Customer Service and Operational Efficiency
            </p>
          </div>
            )}
 
        </div>
        {loading ? (
              <SkeletonLoader count={2} height={60} width="100%" />
            ) : (  
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:mt-12 gap-[30px] ">
 

      
          {data.map((ele) => (
            <div className="shadow-lg p-9 rounded-[20px] relative sm:pb-[80px] ">
              <p className="sm:text-h3 text-2xl   font-bold"> {ele.name}</p>
              <p className="text-[#474F70] text-sm mt-8 sm:mt-3">{ele.para}</p>
              <div className="flex items-center gap-[1.75rem] w-auto  sm:w-auto mt-[3rem] sm:mt-[2rem] sm:absolute sm:bottom-[20px] ">
                {ele.buttons.map((button) => (
                  <div
                    className=" p-[1px] rounded-full bg-transparent "
                    style={{
                      backgroundImage:
                        "linear-gradient(270deg, #6b54fb, #aa2bbe 36%, #ff5721 75%)",
                    }}
                  >
                    <div className="bg-[#fff] rounded-full ">
                      <div
                        className="px-2 py-2 text-[15px] sm:text-[16px] "
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #ff5721 20%, #e569f9 59%, #8673ff)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {button.buttonText}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="shadow-lg sm:p-9 p-5 rounded-[20px] bg-type-section  justify-evenly gap-2">
            <div className="">
              
              <p className="sm:text-h3  text-2xl  font-bold ">
                {" "}
                And many more...
              </p>
              <p className="text-[#474F70] text-sm mt-8 sm:mt-3">
              See how Deflection AI will transform your customer service and operations across industries.
              </p>
            </div>
            <div className="block sm:flex  m-auto items-center gap-8 mt-[3rem] sm:mt-[5rem]">
            <button
                  type="button"
                  className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
                >
                  <Link href={"/checkout"}>Start Now</Link>
                </button>
            </div>
          </div>
        </div>
            )}
      </div>
    </div>
  );
};

export default Concierge;
