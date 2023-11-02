"use client"
import React, { useState, useEffect } from "react";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Card from "@/app/components/Common/Card/Card";

const ContactComplaint = () => {
  const images = [
    { url: "/securitylogo/logo1.png" },
    { url: "/securitylogo/logo2.png" },
    { url: "/securitylogo/logo3.png" },
    { url: "/securitylogo/logo4.png" },
  ]
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="bot-page-shadow  icons bg-[#ffffff] pt-[1px] sm:pt-4 pb-4 sm:pb-12 w-full sm:w-[1440px] mx-auto">
      <div className=" sm:mb-8 mx-auto max-w-[90%] ">
      <h1 className='mb-5  sm:mt-5 text-black px-3 text-center text-2xl sm:text-[38px] font-bold sm:mb-0' >
          {loading ? (
            <SkeletonLoader count={2} height={20} width="60%" />
          ) : (
            "Secure and Compliant"
          )}
        </h1>
        <h1 className="text-center text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-[#252C47]">
          {loading ? (
            <SkeletonLoader count={2} height={20} width="60%" />
          ) : (
            <p>Choose Tempo for advanced security features and robust compliance standards. <span className="group w-[2px] relative">
              <sup className='font-bold'>*</sup>
              <Card className="animate-fadeIn bg-white hidden absolute w-[350px] sm:top-[-59px] sm:w-[500px] md:w-[500px] lg:w-[500px] z-50 group-hover:block top-0  right-[-341px] sm:right-0 sm:left-auto lg:left-auto md:left-auto ">
                {" "}
                <span className="text-xs font-light">
                  PCI compliance through Tempo's payment processor Stripe. For more information, please read more about Tempo's <a href="https://usetempo.ai/article/security-overview" target="_blank" className="text-primary"> Security Features.</a>
                </span>
              </Card>
            </span></p>
          )}
        </h1>
        <div className="grid sm:flex sm:justify-center grid-cols-2 sm:grid-cols-7 text-center gap-2 sm:gap-0">
          {images.map((element, key) => (
            <div
              className="relative w-full mx-auto sm:mx-10 mt-6 img-div-2"

              key={key}
            >
              {loading ? (
                <SkeletonLoader count={1} height={40} width={150} />
              ) : (
                <img
                  src={element.url}
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto object-contain h-[55px]`}
                />
              )}
            </div>
          ))}
        </div>

      </div>
      {/* <div className="text-center">
      <button
        className="text-[#252C47] text-[20px] px-6 border-[3px] border-[#dfe2eb] hover:border-[#252c47] sm:mt-4 mx-auto rounded-2xl p-4 font-semibold"
      >
        See customer stories
      </button>
    </div> */}
    </div>
  );
};

export default ContactComplaint;
