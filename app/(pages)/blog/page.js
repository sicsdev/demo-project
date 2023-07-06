"use client";
import React from "react";
import Link from "next/link";
import News from "@/app/components/Blog/News";
import { useState, useEffect } from "react";
import Blogmail from "@/app/components/Blog/Blogmail";
import { getBlogsPage } from "@/app/API/pages/Wpdata";
import Blogs from "@/app/components/Blog/Blogs";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    getBlogsPage().then(
      (res) => {
        setBlog(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  console.log("setCareer", blog);
  return (
    <div className="mb-4 ">
      {blog?.slice(0, 1).map((ele, key) => (
        <div className="bg-white  p-0" key={key}>
          <div className="ml-4 mt-5 ">
            <h1 className=" font-bold  text-2xl   md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none ">
              The Tempo Blog
            </h1>
            <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
          
            </p>
          </div>
          <Link href={`blog/${ele.slug}`}>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-1/2">
                <img
                  src="blog-image.png"
                  alt="Full-width Image"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full sm:w-1/2 flex items-center justify-center">
                <div className="  flex-col mt-5  sm:mt-0 lg:mt-0 md:mt-0 px-4 sm:px-8 ">
                  <h3 className="font-bold text-xl md:text-xl lg:text-xl sm:text-xl sm:leading-none my-4 text-heading">
                    {ele.title.rendered}
                  </h3>
                  <p className="text-base flex- sm:text-para md:text-para lg:text-para my-4 sm:my-8 font-base text-heading overflow-hidden h-[72px]">
                    {ele.acf.para1}
                  </p>
                  {/* <div className="flex flex-co justify-start items-center gap-0 js-show-on-scroll">
                    <div className="mr-2 flex shrink-0 items-center justify-center rounded-full leading-normal ">
                      <img
                        width="24"
                        height="24"
                        src="https://static.intercomassets.com/avatars/2/square_128/0000002-1665139916.jpg"
                        alt=""
                        className="inline-flex items-center justify-center rounded-full bg-primary text-lg font-bold leading-6 text-white shadow-solid-2 shadow-white [&amp;:nth-child(n+2)]:hidden lg:[&amp;:nth-child(n+2)]:inline-flex h-6 w-6 z-4"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <News blog={blog} setBlog={setBlog} />
      <Blogs blog={blog} setBlog={setBlog} />
      <Blogmail />
    </div>
  );
};

export default Blog;
