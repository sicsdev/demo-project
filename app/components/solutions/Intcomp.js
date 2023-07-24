import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const Intcomp = () => {
  const images = [
    {
      src: "/communication_channels/apple.svg",
      animation: "mobile leftimg_sec animation",
    },
    {
      src: "/communication_channels/fb.svg",
      animation: "mobile leftimg_sec animation3",
    },
    {
      src: "/communication_channels/imessage.svg",
      animation: "mobile leftimg_sec animation2",
    },
    {
      src: "/communication_channels/insta.svg",
      animation: "mobile leftimg_sec animation2",
    },
    {
      src: "/communication_channels/whatsapp.svg",
      animation: "mobile leftimg_sec animation3",
    },
    {
      src: "/communication_channels/twitter-x.webp",
      animation: "mobile leftimg_sec animation2",
    },
  ];
  return (
    <div className=" bg-white pt-2 sm:pt-10 pb-2 sm:pb-4">
      <div className="sm:my-8  mx-auto max-w-[90%]">
        <div className="flex flex-col sm:grid  sm:grid-cols-2">
          <div>
            <h2 className="text-center sm:max-w-[85%] font-bold mb-4 sm:mb-0 text-2xl text-heading md:text-h2 lg:text-h2 sm:text-h2 sm:leading-[56px] js-show-on-scroll ">
              Bring all the data you need into one place
            </h2>
          </div>
          <div>
            <p className=" m-auto  sm:mb-2 sm:mt-4 mb-4  sm:max-w-[65%]  pl-7 text-[16px] text-start font-semibold text-heading">
              Integrate with existing tools, add apps to gain valuable insights,
              and write your own scripts to further customize your workflow.
            </p>
            <a
              href="#"
              className=" flex  justify-start gap-2 items-center p-4 sm:ml-[120px] text-primary font-bold "
              aria-current="page"
            >
              See all integrations{" "}
              <ArrowLongRightIcon className="h-10 w-10 text-gray-500" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 text-center">
          {images.map((element, key) => (
            <div
              className={`${
                key === 4 ? "w-[63px]" : ""
              } relative h-auto w-[56px] sm:w-[65px] py-4 sm:pt-12 m-auto hover:text-white js-show-on-scroll`}
              key={key}
            >
              <img
                src={element.src}
                fill={true}
                alt="Picture of the author"
                className={`m-auto object-contain mx-auto , ${
                  key === 4 ? "img-platform-whatsapp" : "img-platform-1"
                } ${element.animation}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Intcomp;
