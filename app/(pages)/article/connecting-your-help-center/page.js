"use client";
import React, { useEffect, useState } from "react";
import { getSingleBlogsPage } from "@/app/API/pages/Wpdata";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Button from "@/app/components/Common/Button/Button";
import Link from "next/link";

const page = () => {
  const [single, setSingle] = useState("");

  useEffect(() => {
    let params = "connecting-your-help-center";
    getSingleBlogsPage(params).then((res) => {
      setSingle(res.data[0]);
    });
  }, []);


  return (
    <div className="bg-white  px-[20px] sm:px-0  sm:pl-[10%] ">
      <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
        <div className="w-[70%]">
          {" "}
          <h1 className=" font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            {single?.acf?.article_name || (
              <SkeletonLoader height={40} width={580} />
            )}
          </h1>
          <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading">
            {single?.acf?.aritcle_para_t}
          </p>
          <p
            style={{ marginBottom: "0px" }}
            className="pb-6 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
            dangerouslySetInnerHTML={{ __html: single?.acf?.article_para }}
          ></p>
        </div>
        <div className="w-[30%]">
        
          <div className="top-0 absolute mt-[130px]">
          <p className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
                Table of contents
              </p>
        
              </div>
        </div>
      </div>
    </div>
  );
};
export default page;
