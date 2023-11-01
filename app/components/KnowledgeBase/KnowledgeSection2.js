"use client";
import React, { useState, useEffect } from "react";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Image from "next/image";

const KnowledgeSection2 = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [showData, setShowData] = useState(0);

  const data = [
    {
      title: "It starts by understanding your business",
      description:
        "First, we listen to better understand how communications are incorporated into your current workflows. Then, we apply our experience to design an approach suited to your needs.",
      img: "https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt452f539552aca228/5df2a2d2aecae938595571fc/8x8_office_43343_web.jpg?cache=30f9159af42b529e78813e943b8c89d0&tr=fo-auto,noWrapper-true,w-800",
      show: false,
    },
    {
      title: "Proven methodology developed over time",
      description:
        "Your migration is underpinned by 8x8’s experience gained from tens of thousands of deployments across all industries, regions and degrees of complexity.",
      img: "https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt4388e52e20b5bc2c/5df2c6631202185d397ada6b/8x8_mobility_21331_web.jpg?cache=7bab010ba9c27dbb520f02bb31cf4b42&tr=fo-auto,noWrapper-true,w-800",
      show: false,
    },
    {
      title: "Delivery and support teams where you are",
      description:
        "Our delivery and support teams are in each region to ensure you have local people to deploy, train, and support your 8x8 communications solution.",
      img: "https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt432a2704b084b92b/5df2a3219ded9b38d4d12721/8x8_office_31230_web.jpg?cache=ae1c6dfd4917b665f3750e8f07aa21b0&tr=fo-auto,noWrapper-true,w-800",
      show: false,
    },
    {
      title: "Financially backed SLAs in the contract",
      description:
        "We put a financially backed, end-to-end Service Level Agreement (SLA) into the contract for both uptime and call quality.",
      img: "https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt26c610e6385a5433/5df2a34f1202185d397ad970/8x8_office_24489_web.jpg?cache=4bb7590818d4bf4ae6cffa80bbbe9fa7&tr=fo-auto,noWrapper-true,w-800",
      show: false,
    },
  ];

  const showPara = (id) => {
    setShowData(id);
  };

  return (
    <div className="sm:p-[0px] p-[2rem]">
      <div className="sm:p-[3rem]">
        <p className=" text-base sm:text-[38px]  sm:leading-8 my-2 font-bold sm:my-6 font-base text-[black]">
          {loading ? (
            <SkeletonLoader count={1} height={45} width="70%" />
          ) : (
            "Features to help your move to the cloud"
          )}
        </p>

        {data.map((ele, key) => (
          <>
            <p
              className=" py-2 sm:p-3 md:py-2 md:px-3 font-bold text-[20px] sm:text-[24px] text-[black]    border-[1px] p-[10px] border-[#80808059] bg-[white] cursor-pointer"
              key={key}
              onClick={(e) => showPara(key)}
            >
              {ele.title}
            </p>
            {showData == key ? (
              <div>
                <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%] w-full sm:w-[1440px] border-[#80808059] border-[1px]">
                  <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4 sm:p-[1rem]">
                      <div className="sm:ml-[1rem]">
                        <p className="sm:my-3 text-left my-3 sm:text-[19px] text-sm sm:w-[100%] font-light sm:mb-[40px]">
                        {loading ? (
                <SkeletonLoader count={1}    className=""/>
                ) : (
                            <p className="sm:my-3 text-left my-3 sm:text-[18px] text-sm sm:w-[650px] font-light sm:mb-[40px] leading-7 tracking-[0.5px]">{ele.description}</p>
                          )}
                        </p>
                        <div className=''>
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
   <span className="underline cursor-pointer text-white ">Start Now
   </span>
   </a>
  `,
              }}
            />
          </button>
        )}
                                </div>
                    </div>
                      {" "}
                      <div className="block">
                      {loading ? (
                <SkeletonLoader count={1}    className="w-[100%] h-[250px] sm:w-[100%] sm:h-[300px] "/>
                ) : (
                          <div className="relative w-[100%] h-[250px] sm:w-[100%] sm:h-[300px]">
                            <Image
                              src={ele.img}
                              className="w-full mx-auto bg-contain object-cover sm:object-contain"
                              fill={true}
                            />
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeSection2;
