"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getSingleBlogsPage } from "@/app/API/pages/Wpdata";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [single, setSingle] = useState("");
   const searchParams = useSearchParams()
  useEffect(() => {
    getSingleBlogsPage(blogName).then((res) => {
      console.log("res", res.data);
      setSingle(res.data[0]);
    });
  }, []);
  console.log("sing", single);
  const blogName = searchParams.get("blogName");
  return (
    <>
      <div className="singleblog">
        <h1 className=" font-bold  text-1xl   md:text-h3 lg:text-h3 sm:text-h3 sm:leading-none ">
          {single?.title?.rendered}
        </h1>
        <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
          {single?.acf?.para1}
        </p>
        <h1 className=" font-bold  text-1xl  md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
          {single?.acf?.heading1}
        </h1>
        <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
          {single?.acf?.para2}
        </p>
        <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
          {single?.acf?.heading2}
        </h1>
        <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
          {single?.acf?.para3}
        </p>
        <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
          {single?.acf?.headingg}
        </h1>
        <p
          className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
          dangerouslySetInnerHTML={{ __html: single?.acf?.heading_points1 }}
        ></p>
        <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
          {single?.acf?.heading3}
        </h1>
        <p
          className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
          dangerouslySetInnerHTML={{ __html: single?.acf?.heading_points_2 }}
        ></p>
        <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
          {single?.acf?.heading4}
        </h1>

        <p
          className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
          dangerouslySetInnerHTML={{ __html: single?.acf?.heading_points3 }}
        ></p>
        <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
          {single?.acf?.heading5}
        </h1>

        <p
          className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
          dangerouslySetInnerHTML={{ __html: single?.acf?.heading_points4 }}
        ></p>
        <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
          {single?.acf?.heading6}
        </h1>
        <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
          {single?.acf?.heading6_text}
        </p>
      </div>
    </>
  );
};

export default Page;
