import React from "react";

import Image from "next/image";
import Button from "../Common/Button/Button";
const Trial = () => {
  return (
    <div className="bg-white">
   

      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2">
          <img
            src="freetrial.jpeg"
            alt="Full-width Image"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center">
            <div className="  items-center flex-col text-center my-5 sm:text-center md:text-center lg:text-center px-4 sm:px-8 ">
              <h1 className="font-bold text-2xl md:text-4xl lg:text-4xl sm:text-4xl my-4 text-heading">
                Sign up for your{" "}
                <span className="text-primary">free trial today</span>
              </h1>
              <h3 className="text-base flex- sm:text-2xl md:text-2xl lg:text-2xl my-4 sm:my-8 font-base text-heading">
              7 days. No commitment. No strings attached.

              </h3>
              <Button
                type={"submit"}
                className={
                  "mr-2  group py-[11px] px-2 focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-voilet-900"
                }
              >
                Start Free Trial
              </Button>
              <Button
                type={"submit"}
                className={
                  "mr-2 py-[11px]  px-2 focus:ring-yellow-300 text-white bg-black hover:bg-primary dark:focus:ring-voilet-900"
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
