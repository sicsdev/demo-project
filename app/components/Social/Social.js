import React from "react";
import Image from "next/image";
const Social = () => {
  const images = [
    {src:"/icons/PayPal1.svg", animation: "mobile leftimg_sec animation"},
    {src: "/icons/shopify-logo-svg-vector.svg", animation:"mobile leftimg_sec animation3"},
    { src:"zapier.svg", animation:"mobile leftimg_sec animation2"},
    {src:"gorgias.svg", animation:"mobile leftimg_sec animation2"},
    { src:"zendesk-icon-svgrepo-com.svg", animation:"mobile leftimg_sec animation3"},
    { src:"freshdesk.svg", animation:"mobile leftimg_sec animation"}
  ];
  return (
    <div className=" bg-[white] py-2 sm:py-10">
      <div className="my-8  mx-auto max-w-[90%]">
        <h2 className="text-center font-bold mb-4 sm:mb-0 text-2xl text-blue  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-8  js-show-on-scroll ">
          One platform, infinite possibilities
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-6  text-center">
          {images.map((element, key) => (
            <div
              className="relative h-auto w-[100px] py-4 sm:pt-24 m-auto hover:text-white js-show-on-scroll"
              key={key}
            >
              <img
                src={element.src}
                fill={true}
                alt="Picture of the author"
                className={`m-auto object-contain img-platform mx-auto , ${element.animation}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Social;
