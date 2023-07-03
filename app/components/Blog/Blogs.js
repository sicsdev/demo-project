import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Blogs = ({blog,setBlog}) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 px-4 lg:px-4 mb-6">
      {blog.length>0 && blog.slice(1,2).map((item, key) => (
        <div className=" shadow-lg rounded-lg  p-3" key={key}>
          <Link href={`blog/blog-details?blogName=${item.slug}`}>
            <div className="flex flex-co relative h-[200px] w-[300px] justify-start items-center js-show-on-scroll">
              <Image
                fill={true}
                src="/imagone.png"
                alt="img"
                className="w-full h-full bg-contain"
              />
            </div>
            <div className="py-45 px-35">
              <div>
                <h4 className=" text-sm md:text-sm lg:text-sm sm:text-sm sm:leading-8 e mb-3 js-show-on-scroll">
                  CUSTOMER & DESIGN 59 MIN WATCH
                </h4>
                <p className="font-semibold text-base sm:text-para my-4 opacity-80 js-show-on-scroll">
                  {item.title.rendered}
                </p>
                <p className="font-normal text-base sm:text-para my-4 opacity-80 js-show-on-scroll overflow-hidden h-[72px]">
                  {item.acf.para1}
                </p>
              </div>
            </div>
            <div className="flex flex-co justify-start items-center gap-0 js-show-on-scroll">
              <div className="mr-2 relative h-[24px] w-[24px] flex shrink-0 items-center justify-center rounded-full leading-normal ">
                <Image
                  fill={true}
                  src="https://static.intercomassets.com/avatars/2/square_128/0000002-1665139916.jpg"
                  alt=""
                  className="inline-flex items-center justify-center rounded-full bg-primary text-lg font-bold leading-6 text-white shadow-solid-2 shadow-white [&amp;:nth-child(n+2)]:hidden lg:[&amp;:nth-child(n+2)]:inline-flex h-6 w-6 z-4"
                />
              </div>

              <div className="js-show-on-scroll">
                <p className="text-100 bold color-neutral-100 text-black opacity-70">
                  BETH MCENTEE
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
