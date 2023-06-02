import React from "react";

import Image from "next/image";
import Button from "../Common/Button/Button";
const Trial = () => {
  return (
    <div className="bg-white">
      {/* <div className="mx-auto  max-w-[80%] py-6">
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
              <img
                src="/freetrial.jpeg"
                fill={"true"}
                alt="Picture of the author"
                className="rounded-3xl mb-5 bg-contain mx-auto  "
              />
            </div>
        </div>
      </div> */}

      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2">
          <img
            src="freetrial.jpeg"
            alt="Full-width Image"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center">
            <div className=" my-5 sm:text-center md:text-center lg:text-center px-4 sm:px-8 ">
              <h1 className="font-bold text-2xl md:text-4xl lg:text-4xl sm:text-4xl my-4 text-heading">
                Sign up for your{" "}
                <span className="text-voilet">free trial today</span>
              </h1>
              <h3 className="text-base sm:text-2xl md:text-2xl lg:text-2xl my-4 sm:my-8 font-base text-heading">
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
        </div>
      </div>
    </div>
  );
};

export default Trial;
