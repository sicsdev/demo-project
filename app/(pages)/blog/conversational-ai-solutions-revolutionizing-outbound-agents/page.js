"use client";
import React, { useEffect, useState } from "react";
import { getSingleBlogsPage,getBlogsPage } from "@/app/API/pages/Wpdata";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Button from "@/app/components/Common/Button/Button";
import Link from "next/link";

const page = () => {
  const[blog, setBlog] = useState([]);
  const [single, setSingle] = useState("");
  const scrollSlug =
    "/blog/conversational-ai-solutions-revolutionizing-outbound-agents";
  useEffect(() => {
    let params = "conversational-ai-solutions-revolutionizing-outbound-agents";
    getSingleBlogsPage(params).then((res) => {
      setSingle(res.data[0]);
    });
    relatedPosts();
  }, []);

  const relatedPosts=()=>{
  getBlogsPage().then(
    (res) => {
      setBlog(res.data);
     
    },
    (err) => {
      console.log(err);
    }
  );
}

const filterPosts = blog.filter((x)=>x.id != single.id);
console.log("filterposts",filterPosts )
  console.log("sing", single);

  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "_");
    }
  };

  return (
    <div className="bg-white  px-[20px] sm:px-0  sm:pl-[10%] ">
      <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
        <div className="sm:w-[70%]">
          {" "}
          <h1 className=" font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            {single?.title?.rendered}
          </h1>
          <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
            {single?.acf?.para1}
          </p>
          <h1
            id={removeSpacesAndHyphens(single?.acf?.heading1)}
            className=" font-bold  text-1xl  md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none "
          >
            {single?.acf?.heading1}
          </h1>
          <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
            {single?.acf?.para2}
          </p>
          <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
            {single?.acf?.para3}
          </p>
          <h1
             id={removeSpacesAndHyphens(single?.acf?.heading2)}
            className=" font-bold  text-1xl  md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none "
          >
            {single?.acf?.heading2}
          </h1>
          <p
            className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
            dangerouslySetInnerHTML={{ __html: single?.acf?.heading_points1 }}
          ></p>
          <h1
            id={removeSpacesAndHyphens(single?.acf?.heading3)}
            className=" font-bold  text-1xl  md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none "
          >
            {single?.acf?.heading3}
          </h1>
          <p
            className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
            dangerouslySetInnerHTML={{ __html: single?.acf?.heading_points_2 }}
          ></p>
          <h1
           id={removeSpacesAndHyphens(single?.acf?.heading4)}
            className=" font-bold  text-1xl  md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none "
          >
            {single?.acf?.heading4}
          </h1>
          <p
            className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
            dangerouslySetInnerHTML={{ __html: single?.acf?.heading_points3 }}
          ></p>
 <h1
              id={removeSpacesAndHyphens(single?.acf?.heading6)}
            className="mt-2.5 font-bold  text-2xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none "
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
 <div className="mt-[60px]">
          <h1
              id={removeSpacesAndHyphens(single?.acf?.heading6)}
            className="mt-2.5 mb-5 font-bold  text-2xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none "
          >
            Related Articles
          </h1>
          <div className="border-2 rounded-xl mb-[25px] sm:w-[42rem]">
          {filterPosts?.map((ele,key)=>
<>   <Link key={key} href={`/blog/${ele.slug}`}>
            <p className="cursor-pointer ml-3 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading hover:bg-backhover">
           
            {ele?.title?.rendered}
            </p>   
            </Link>     
          </>   )} 
        </div>
          </div>
        </div>
        <div className="hidden sm:block w-[30%]">
          <div
            style={{
              borderLeft: "solid 1px",
              height: "300px",
              overflowY: "scroll",
            }}
            className="top-0 fixed mt-[130px]"
          >
            <p className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
              Table of contents
            </p>
            <div className=" ml-4  font-medium SideOptions">
              <div
                className="group "
                onClick={(e) => {
                }}
              >
                <Link href={`${scrollSlug}#${removeSpacesAndHyphens(single?.acf?.heading1)}`}>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    {single?.acf?.heading1}
                  </p>
                </Link>
                <Link href={`${scrollSlug}#${removeSpacesAndHyphens(single?.acf?.heading2)}`}>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    {single?.acf?.heading2}
                  </p>
                </Link>
                <Link href={`${scrollSlug}#${removeSpacesAndHyphens(single?.acf?.heading3)}`}>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    {single?.acf?.heading3}
                  </p>
                </Link>
                <Link href={`${scrollSlug}#${removeSpacesAndHyphens(single?.acf?.heading4)}`}>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    {single?.acf?.heading4}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
