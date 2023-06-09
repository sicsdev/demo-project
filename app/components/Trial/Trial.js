import React from "react";
import Link from "next/link";
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
            <h2 className="font-bold text-2xl md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none my-4 text-heading">
              Sign up for your{" "}
              <span className="text-primary">free trial today</span>
            </h2>
            <p className="text-base flex- sm:text-para md:text-para lg:text-para my-4 sm:my-8 font-base text-heading">
              7 days. No commitment. No strings attached.
            </p>
            <Button
              type={"submit"}
              className={
                "mr-2  group py-[11px] px-2 focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-voilet-900"
              }
            >
              <Link href="/free-trial">Start Free Trial</Link>
            </Button>
            <Button
              type={"submit"}
              className={
                "mr-2 py-[11px]  px-2 focus:ring-yellow-300 text-white bg-black hover:bg-primary dark:focus:ring-voilet-900"
              }
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: `
       <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
       <span className="underline cursor-pointer text-white"> Request Demo
       </span>
       </a>
      `,
                }}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trial;
