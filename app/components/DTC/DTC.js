import React from "react";
import Image from "next/image";
const DTC = () => {
  const images = [
    { url: "nextmed-color2.svg", animation: "mobile leftimg_sec animation" },
    {
      url: "simplesentiments-color3.svg", animation: "mobile leftimg_sec animation2",
    },
    { url: "labpass-color2.svg", animation: "mobile leftimg_sec animation3" },
    { url: "perry-color4.svg", animation: "mobile leftimg_sec animation2" }
  ];
  const images1 = [
    "/nextmed.svg",
    "/simplesentiments.svg",
    "/labpass.svg",
    "/labpass-color2.svg",
  ];
  return (
    <div className=" bg-white py-4 sm:pb-12">
      <div className="my-8 mx-auto max-w-[90%]">
        <h1 className="text-center text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
          Trusted by top ecommerce and digital services brands
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-2 sm:gap-40">
          {images.map((element, key) => (
            <div
              className="relative w-full mx-auto mt-6 hover:text-white img-div-2"
              key={key}
            >
              <img
                src={element.url}
                fill={true}
                alt="Picture of the author"
                className={`m-auto object-contain img-div-1  ${element.animation}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DTC;
