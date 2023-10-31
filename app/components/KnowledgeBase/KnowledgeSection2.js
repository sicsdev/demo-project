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
        <p className="sm:text-[25px] text-[21px] font-medium mb-[20px]">
          {loading ? (
            <SkeletonLoader count={1} height={45} width="70%" />
          ) : (
            "Features to help your move to the cloud"
          )}
        </p>

        {data.map((ele, key) => (
          <>
            <p
              className="text-[18px] font-semibold  border-[1px] p-[10px] border-[#80808059] bg-[white] cursor-pointer"
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
                            <p className="px-2 sm:px-0">{ele.description}</p>
                          )}
                        </p>
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
