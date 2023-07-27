import React from "react";
import Image from "next/image";
import SkeletonLoader from "../Skeleton/Skeleton";
import { useState } from "react";
import { useEffect } from "react";
const DTC = () => {
  const images = [
    { url: "/nextmed-color2.svg", animation: "mobile leftimg_sec animation" },
    {
      url: "/simplesentiments-color3.svg", animation: "mobile leftimg_sec animation2",
    },
    { url: "/labpass-color2.svg", animation: "mobile leftimg_sec animation3" },
    { url: "/perry_logo.png", animation: "mobile leftimg_sec animation2" }
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className=" bg-[#e6f7fd] py-4 sm:pb-12">
      <div className="my-8 mx-auto max-w-[90%]">
        <h1 className="text-center text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
        {loading ? (
              <SkeletonLoader count={1} height={30} width={"40%"} />
            ) : (
"Trusted by top ecommerce and digital services brands"
            )}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-2 sm:gap-40">
          {images.map((element, key) => (
            <div
              className="relative w-full mx-auto mt-6 hover:text-white img-div-2"
              key={key}
            >
              {loading ? (
              <SkeletonLoader height={50} width={150} />
            ) : (
              <img
                src={element.url}
                fill={true}
                alt="Picture of the author"
                className={`m-auto object-contain img-div-1  ${element.animation}`}
              />
              )}
            </div>
          ))}
        </div>

      </div>
      <p className="max-w-[90%] m-auto mb-4 sm:mb-0 mt-10 sm:mt-14 text-sm text-center text-[#9CA3AF]">
      {loading ? (
              <SkeletonLoader count={1} height={20} width={"40%"} />
            ) : (
       " Brands listed have material preexisting relationships to Tempo management."
            )}
        </p>
            
    </div>
  );
};

export default DTC;
