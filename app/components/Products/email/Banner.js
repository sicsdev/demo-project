"use client";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../../Skeleton/Skeleton";
import Link from "next/link";
import { getCalApi } from "@calcom/embed-react";
const banner = ({ handleClickScroll }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
  const customStyles = {
    backgroundImage: `url('https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt7502941e41c99672/5ee7a43e8aa85c4a23eb61a6/xl-bnr-callstats.io-monitoring-data3.png?cache=59d90bb98e7585b9a89b84ef9e319161&tr=ar-16-9,fo-auto,w-1200')`,
    backgroundImage: `url('../solutions_/email.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    left: 0,
    right: 0,
    zIndex: 9,
  };
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <div
      className="sm:top-[58px] sm:absolute sm:h-[550px] sm:flex sm:justify-end sm:flex-col mb-[0px] sm:mb-[45px] for-bg relative"
      style={customStyles}
    >
      <div className="w-auto sm:p-14 relative p-4 sm:w-[1450px] mx-auto App w-full">
        {loading ? (
          <div className="block !font-[700] w-[100%] sm:w-[50%]  pt-5 sm:pt-0  text-[33px] leading-[40px]  relative text-[black]">
            <SkeletonLoader height={60} />
          </div>
        ) : (
          <div className="sm:text-5xl text-[22px] text-white sm:font-bold font-bold pt-5 sm:p-0">
            Optimize your email
            <br />
            management workflow
          </div>
        )}
        {loading ? (
          <div className="block !font-[700] w-[100%] sm:w-[50%]  pt-5 sm:pt-0 sm:mt-7 text-[33px] leading-[40px]  relative text-[black]">
            <SkeletonLoader height={90} />
          </div>
        ) : (
          <div className="text-white sm:mt-8 mt-2 sm:text-xl text-[15px] w-full sm:w-[600px]">

            Let Smart Inbox streamline your email processes—automatically respond to emails while connecting to your backend APIs seamlessly.        </div>
        )}
        {loading ? (
          <div className="block sm:flex items-center my-8 cursor-pointer gap-3">
            <SkeletonLoader height={60} width={200} />
            <SkeletonLoader height={60} width={200} />
          </div>
        ) : (
          <div className="block sm:flex md:flex lg:flex gap-4 items-center mt-8 sm:mb-8 cursor-pointer">
            <Link
              href={`/checkout`}
              className={
                "inline-block text-center mb-4 sm:mb-0 py-[18px] rounded-sm px-2 w-full font-bold sm:w-[200px] focus:ring-yellow-300 text-white bg-[black] hover:bg-primary dark:focus:ring-yellow-900 "
              }
            >
              Get Started
            </Link>{" "}
            <Link href={"/get-trial"}

              className={
                " inline-block text-center mb-4 sm:mb-0 py-[18px] rounded-sm px-2 w-full font-bold sm:w-[200px] focus:ring-yellow-300 text-white hover:bg-[black] bg-primary dark:focus:ring-yellow-900 "
              }
            >
              Start for Free
            </Link>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default banner;
