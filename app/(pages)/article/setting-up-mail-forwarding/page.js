"use client";
import React, { useEffect, useState } from "react";
import { getArticlePage } from "@/app/API/pages/Wpdata";
const page = () => {
  const [single, setSingle] = useState("");

  useEffect(() => {
    let params = "setting-up-mail-forwarding";
    getArticlePage(params).then((res) => {
      setSingle(res.data[0]);
  console.log("resss", res);

    });
  }, []);
  console.log("single", single);


  
  return (
    <div className="bg-white  pl-[10%] ">
    <h1 className=" font-bold  px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none ">
      {single?.acf?.article_name}
    </h1>
    <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para }}
    ></p>
      <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para_copy }}
    ></p>

    <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para_copy2 }}
    ></p>
   <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para_copy3 }}
    ></p>

   
  </div>


  )
}

export default page