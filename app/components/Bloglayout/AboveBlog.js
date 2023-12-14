import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const AboveBlog = ({ blogData, getFormatDate, removeSpacesAndHyphens }) => {

  return (
    <div className="bg-white px-[16px] sm:py-[64px] py-[34px]">
      <div className="sm:w-[80%%] max-w-[1080px]">
        <div className=" mb-[24px] flex items-center">
          <img
            src="https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/611a72f179c0f04dab2b18b2_Vector%2063.svg"
            loading="lazy"
            alt=""
            className="mr-[12px]"
          />
          <div>Blog</div>
        </div>

        <div>
          <h2 className="block  text-2xl sm:text-[56px] sm:leading-[4rem] tracking-[-2px]  text-left my-[1rem] md:mb-[4rem] relative text-heading ">
            Read about best practices, strategies and insights in the world of
            communications{" "}
          </h2>
        </div>
      </div>
      <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%] mt-[30px]  sm:py-10 w-full sm:w-[1440px] sm:mt-[0rem] shadow-lg">
      <Link href={`/resources/blog/data?article=${removeSpacesAndHyphens(blogData?.fields?.heading?.toLowerCase())}`}>

        <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
          {" "}
          <div className="hidden  sm:block">
            <div className="relative w-[100%] h-[207px] sm:w-[] sm:h-[400px]">
              <Image
            src={blogData?.fields?.previewImage?.fields?.file?.url}
            className="w-full mx-auto bg-contain object-cover sm:object-contain"
                fill={true}
              />
            </div>
          </div>
          <div className="relative sm:h-[351px]">
            <div className="sm:mt-[-98px] sm:mb-11">
              {getFormatDate(blogData?.sys?.createdAt)}
            </div>
            <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
              {blogData?.fields?.heading}{" "}
            </p>
            <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {blogData?.fields?.blogBody?.content[0]?.content[0]?.value}{" "}
            </p>
            <div className="absolute sm:right-[33px] sm:top-[330px]">
              <ArrowRightIcon className="h-8 w-8 text-heading  cursor-pointer icon1" />
            </div>
          </div>
          <div className="block my-[3.5rem]  sm:hidden">
            <div className="relative w-[100%] h-[207px] sm:w-[703px] sm:h-[400px]">
              <Image
            src={blogData?.fields?.previewImage?.fields?.file?.url}
            className="w-full mx-auto bg-contain object-cover sm:object-contain"
                fill={true}
              />
            </div>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default AboveBlog;
