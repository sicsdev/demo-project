import React from "react";
import Image from "next/image";
const DTC = () => {
  const images = [
    "nextmed-color2.svg",
    "simplesentiments-color3.svg",
    "labpass-color2.svg",
    "perry-color4.svg",
  ];
  const images1 = [
    "nextmed.svg",
    "simplesentiments.svg",
    "labpass.svg",
    "labpass-color2.svg",
  ];
  return (
    <div className=" bg-white py-4 ">
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
                src={element}
                fill={true}
                alt="Picture of the author"
                className="m-auto object-contain img-div-1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DTC;
