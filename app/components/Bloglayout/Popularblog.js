import {
  ArrowDownRightIcon,
} from "@heroicons/react/24/outline";
import React from "react";

import Link from "next/link";
const Popularblog = ({ data, getFormatDate ,removeSpacesAndHyphens}) => {
  return (
    <div className="bg-white px-[16px] sm:py-[64px] ">
      <div className="sm:w-[80%%] ">
        <div className=" mb-[24px] flex items-center font-semibold">
          <div>Most Popular Posts</div>
        </div>

        <div className="sm:flex sm:gap-11">
          {data.slice(2, 5).map((ele, key) => (
            <Link href={`/resources/blog/data?article=${removeSpacesAndHyphens(ele.fields.heading.toLowerCase())}`}>

            <div className="p-[1rem] shadow-xl sm:w-[420px] ">
              <div className="flex gap-3 sm:my-0  my-6">
                <p className="sm:mb-11">
                  {" "}
                  {getFormatDate(ele?.sys?.createdAt)}
                </p>
                <p className="text-[#f38c39] sm:text-[16px] text-[16px] ">
                  {ele?.fields?.tag}{" "}
                </p>
              </div>
              <p className="text-[#363744] sm:text-[16px] text-[16px] ">
                {ele.fields?.heading}
              </p>

              <p className="text-[#363744] sm:text-sm text-[14px] mt-[10px] flex justify-end sm:mt-[25px]">
                <ArrowDownRightIcon className="h-8 w-8 text-heading cursor-pointer  icon" />
              </p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popularblog;
