import React from "react";

import Image from "next/image";
import Button from "../Common/Button/Button";
const Trial = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto  max-w-[80%] py-6">
        {/* <div className="flex items-center justify-center"> */}
        <div className="block sm:flex md:flex   :flex justify-between  items-center gap-4">
          <div className=" my-5 sm:text-start md:text-start lg:text-start  ">
            <h1 className="font-bold  text-2xl   md:text-5xl lg:text-5xl sm:text-5xl  my-2  text-heading">
              Sign up for your{" "}
              <span className="text-voilet">free trial today</span>
            </h1>
            <h3 className="text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-heading">
              21 days. Unlimited Agents. No credit card required. No strings
              attached.
            </h3>
            <Button
              type={"submit"}
              className={
                "mr-2  group py-[11px] px-2 focus:ring-yellow-300 text-white bg-voilet hover:bg-black dark:focus:ring-voilet-900"
              }
            >
              Start Free Trail
            </Button>
            <Button
              type={"submit"}
              className={
                "mr-2 py-[11px]  px-2 focus:ring-yellow-300 text-white bg-black hover:bg-voilet dark:focus:ring-voilet-900"
              }
            >
              Request Demo
            </Button>
          </div>
            <div className="relative mx-auto h-[300px] w-[300px] sm:h-[500px] md:h-[500px] lg:h-[500px] sm:w-[500px] md:w-[500px] lg:w-[500px]">
              <Image
                src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F77e9d92a82b96dae%2Foriginal%2FFreshdesk-conversion-panel.webp&w=1920&q=75"
                fill={"true"}
                alt="Picture of the author"
                className="rounded-3xl mb-5 bg-contain mx-auto  "
              />
            </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Trial;
