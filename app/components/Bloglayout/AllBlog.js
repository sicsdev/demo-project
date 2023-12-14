"use client";
import React, { useState } from "react";
import { ArrowDownRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
const AllBlog = ({ data, getFormatDate, removeSpacesAndHyphens }) => {
  const [show, setShow] = useState(10);
  return (
    <div className="bg-white px-[16px] sm:py-[64px] py-[34px]">
      <div className="sm:w-[80%%] ">
        <div className=" mb-[24px] flex items-center font-semibold">
          <div>All Posts</div>
        </div>

        <div className="sm:grid sm:grid-cols-4 sm:gap-11">
          {data.slice(2, show).map((ele, key) => (
            <Link
              href={`/resources/blog/data?article=${removeSpacesAndHyphens(
                ele.fields.heading.toLowerCase()
              )}`}
            >
              <div className="p-[1rem] shadow-xl sm:w-[320px] sm:h-[452px] ">
                <div className="block my-5 sm:my-0">
                  <div className="relative w-[100%] h-[207px] sm:w-[] sm:h-[220px]">
                    <Image
                      src={ele?.fields?.previewImage?.fields?.file?.url}
                      className="w-full mx-auto bg-contain object-cover sm:object-contain"
                      fill={true}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <p className="sm:mb-11">
                    {" "}
                    {getFormatDate(ele?.sys?.createdAt)}
                  </p>
                  <p className="text-[#f38c39] sm:text-[16px] text-[16px] ">
                    {ele?.fields?.tag}{" "}
                  </p>
                </div>
                <p className="text-[#363744] sm:text-[16px] text-[16px] sm:my-0 my-3 ">
                  {ele.fields?.heading}
                </p>

                <p className="text-[#363744] sm:text-sm text-[14px] mt-[10px] flex justify-end sm:mt-[25px]">
                  <ArrowDownRightIcon className="h-8 w-8 text-heading cursor-pointer  icon" />
                </p>
              </div>
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShow((prev) => prev + 10)}
          className=" font-semibold flex sm:mt-8 m-auto  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default AllBlog;
