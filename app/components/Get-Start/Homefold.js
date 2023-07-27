import React, { useEffect, useState } from "react";
import Link from "next/link";
import SkeletonLoader from "../Skeleton/Skeleton";

const Homefold = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="bg-home-above relative h-[700px]">
        <div className="absolute w-[35%] h-full flex right-0">
          <img src="/home-fold.png" className="object-fill w-full md:opacity-100	opacity-[0.75]" />
        </div>
        <div className="absolute w-[35%] h-full flex left-0">
        <img src="/left-side.png" className="object-fill w-full md:opacity-100	opacity-[0.75]" />
      </div>
        <div className=" mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-12 sm:py-20 relative">
          <div className="block sm:flex   justify-center  gap-10">
            <div>
              {loading ? (
                <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
                  <SkeletonLoader height={30} width={120} baseColor="#230A5C"/>
                </div>
              ) : (
                <p
                  className={
                    "text-center   font-bold mt-[60px]   w-[40%] sm:w-[136px] m-auto text-base py-1 sm:mt-8  px-1  focus:ring-yellow-300 text-white rounded-[20px] bg-primary hover:bg-black dark:focus:ring-yellow-900"
                  }
                >
                  INTRODUCING{" "}
                </p>
              )}
              <div className="relative flex items-center gap-4 w-full my-6 sm:my-0 sm:w-[60%] mx-auto">
                <div
                  data-line-position="left"
                  class="connect-heading-line  sm:mt-8 mt-4"
                ></div>
                <h1 className=" font-bold  m-auto text-center sm:mt-8 mt-4 sm:text-[50px] text-h2 text-white  sm:leading-none  ">
                  {/* Tempo */}
                  {loading ? (
                    <>
                   <div className="hidden sm:block"> <SkeletonLoader height={80} width={240} baseColor="#230A5C"/></div>
                   <div className="block sm:hidden"><SkeletonLoader height={80} width={100}  baseColor="#230A5C"/></div>
                    </>
                  ) : (
                    <img src="/logo.png" className="w-[50rem] sm:w-[65rem]" />
                  )}
                </h1>

                <div
                  data-line-position="right"
                  class="connect-heading-line  sm:mt-8 mt-4"
                ></div>
              </div>

              <div className="font-bold text-2xl m-auto w-[300px] sm:w-full text-center mt-4  md:text-h3 lg:text-h3 sm:text-h3 t  sm:mt-8 mb-2 sm:mb-4 text-white">
                {loading ? (
                  <>
                    <div className="hidden sm:block">
                      <SkeletonLoader height={50} width={600}  baseColor="#230A5C"/>
                    </div>
                    <div className="block sm:hidden">
                      <SkeletonLoader height={50} width={"100%"}  baseColor="#230A5C"/>
                    </div>
                  </>
                ) : (
                  "Integrate anything. Automate everything."
                )}
              </div>
              {loading ? (
                <p className="text-center">
                  <SkeletonLoader count={2} height={30} width={"100%"}  baseColor="#230A5C"/>
                </p>
              ) : (
                <p className=" text-xl text-center  md:text-xl sm:max-w-[632px] sm:ml-[12rem] sm:mt-8   mt-[1.5rem] mb-[1.5rem] sm:mb-4 text-white">
                  Watch your costs plummet with AI-powered customer service.
                  50%+ deflection, instant SLAs, and 24/7 service.
                </p>
              )}
              <div className="block sm:grid md:grid lg:grid grid-cols-2 mx-auto sm:w-[60%] gap-4 sm:mt-8 mt-3 sm:mb-8">
                {loading ? (
                  <SkeletonLoader height={40} width={"100%"}  baseColor="#230A5C"/>
                ) : (
                  <button
                    className={
                      "py-2 px-8 mb-[12px] sm:mb-0 w-full first-letter:w-full focus:ring-yellow-300    text-lg font-semibold text-white bg-[#fe9327] hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                    }
                  >
                    <div className="trytempo">
                      <Link href="/checkout">Start Now</Link>
                    </div>
                  </button>
                )}
                {loading ? (
                  <SkeletonLoader height={40} width={"100%"}  baseColor="#230A5C"/>
                ) : (
                  <button
                    type={"submit"}
                    className={
                      "py-2 px-8 mb-[10px] sm-mb-0 focus:ring-yellow-300 text-white w-full hover:bg-white hover:text-primary  mt-2 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold border dark:focus:ring-yellow-900 rounded-lg"
                    }
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `
       <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
       <span className="underline cursor-pointer text-white"> Schedule Demo
       </span>
       </a>
      `,
                      }}
                    />{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homefold;
