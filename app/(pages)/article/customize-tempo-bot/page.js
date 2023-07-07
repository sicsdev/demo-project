"use client";
import React, { useEffect, useState } from "react";
import { getArticlePage } from "@/app/API/pages/Wpdata";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Link from "next/link";
import Articleside from "@/app/components/Article/Articleside";


const page = () => {
  const [single, setSingle] = useState("");

  useEffect(() => {
    let params = "customize-tempo-bot";
    getArticlePage(params).then((res) => {
      setSingle(res.data[0]);
      console.log("resss", res);
    });
  }, []);
  console.log("single", single);
  return (
 
    <div className="bg-white  px-[20px] sm:px-0  sm:pl-[10%] ">
       <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
       <div className="sm:w-[70%]">
    <h1 className=" font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
      {single?.acf?.article_name || (
        <SkeletonLoader height={40} width={580} />
      )}
    </h1>
    <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
    >{single?.acf?.aritcle_para_t}</p>
    <p
    style={{ marginBottom: "0px" }}
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para }}
    ></p>
      <div  style={{ marginBottom: "0px" }} className="mb-4 sm:mb-4 sm:w-[20%] sm:m-auto py-4 mx-6">
          <button
            className={
              "py-2 px-8 focus:ring-yellow-300 text-white w-full  mt-2 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold bg-primary hover:bg-primary dark:focus:ring-yellow-900 rounded-lg"
            }
          >
            <Link
              href="/checkout
"
            >
              Get Started &#8594;{" "}
            </Link>
          </button>
        </div>
        <h1
              id={single?.acf?.heading6}
            className="mt-2.5 font-bold  text-2xl   md:text-h4 lg:text-h5 sm:text-h4 sm:leading-none "
          >
            Want to know more?
          </h1>
          <p className="underline-offset-1 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
            <ul className="
            list-disc cursor-pointer" >
              <li>
                <u>Intercom's AI bot - Fin</u>
              </li>
              <li>
                <u>Intercom's Inbox for customer support</u>
              </li>
              <li>
                <u>Intercom for live chat</u>
              </li>
              <li>
                <u>Intercom for self-service support</u>
              </li>
              <li>
                <u>Intercom for targeted messages and campaigns</u>
              </li>
              <li>
                <u>Intercom for customer engagement</u>
              </li>
              <li>
                <u>Intercom for customer intelligence & analytics</u>
              </li>
            </ul>
          </p>
        </div>
        <div className="w-[30%]">
        
        <div className="top-0 absolute mt-[130px]">
        <p className="hidden sm:block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
              Table of contents
            </p>
      
            </div>
      </div>
        </div>
  </div>
 
  )
}

export default page