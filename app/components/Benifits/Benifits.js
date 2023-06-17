'use client'
import React, { useEffect } from "react";
import Carasual from "../Providers/Carasual";
import Image from "next/image";
const slides = [
  {
    background: `bg-sky`,
    name: "Customer service headaches are history.",
    title:
      "Customer service is a solved problem. Automating support for our enterprise clients has been an immense cost-saver and has provided us with an industry-leading advantage.        ",
    editor: "Dean",
    position: "CEO & Founder ",
    brand: "Perry",
    img: "/testimonial/perry.svg",
  },
  {
    background: `bg-orange`,
    title:
      "The ability to scale up customer-facing staffing and back office operations, coupled with Tempo's ChatGPT-powered automations, has really powered our business's fulfillment.      ",
    name: "We supercharged our business with Tempo.",

    editor: "Frank",
    position: "Vice President",
    brand: "LabPass",
    img: "labpass-color2.svg",
  },
  {
    background: `bg-neon`,
    title:
      "Instead of wasting my time hiring freelancers and trying to figure out new software platforms, I plugged into Tempo and was able to focus on what matters: growing my business.      ",
    name: "I can finally focus on what matters.",
    editor: "Matthew",
    brand: "Simple Senti",
    position: "Founder ",

    img: "/testimonial/simplesentiments.svg",
  },
];
const Benifits = () => {
  return (
    <>
      {/* <div className=" py-5  ">
        <h1 className="font-bold  text-2xl  md:text-5xl lg:text-5xl sm:text-5xl text-center  my-8  text-heading">
          Why customers love Tempo
        </h1>
        <Carasual>
          {slides.map((element, key) => (
            <div
              key={key}
              className={`${element.background} ease-in rounded-2xl bg-center bg-cover duration-1000 h-[500px]`}
            >
              <div className="block p-2 sm:p-5 md:p-5 lg:p-5 sm:flex md:flex lg:flex justify-center items-center gap-4">
                <div className="sm:w-[900px] md:w-[900px] lg:w-[900px] text-xs sm:text-lg md:text-lg lg:text-lg  col-span-2 font-bold text-center p-2 sm:p-10 md:p-10 lg:p-10 sm:my-16 md:my-16 lg:my-16  rounded-lg order-2 sm:-order-none md:-order-none lg:-order-none ">
                  <h1 className="text-start sm:text-start md:text-start lg:text-start text-lg sm:text-2xl md:text-3xl lg:text-4xl my-2 font-semibold sm:font-normal md:font-normal lg:font-normal text-white">
                    {element.title}
                  </h1>
                  <h3 className="text-start text-lg font-normal text-gray-600 text-white">
                    {element.editor}
                  </h3>
                  <h3 className="text-start text-lg  font-semibold  text-violet-700 text-white">
                    {element.position}
                  </h3>
                </div>

                <div className="relative p-10 sm:mt-16 md:mt-16 lg:mt-16  h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px] sm:w-[300px] md:w-[300px] lg:w-[300px]  rounded-lg order-1 sm:-order-none md:-order-none lg:-order-none">
                  <Image
                    src={element.img}
                    fill={true}
                    alt="Picture of the author"
                    className="rounded-3xl bg-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </Carasual>
      </div> */}

      <div className="bg-white py-6 sm:py-5">
        <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
          <h2 className="font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 text-center  my-8  text-heading">
            Why customers love Tempo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 px-4 lg:px-4 mb-6">
            {slides.map((item, key) => (
              <div
                className="bg-black shadow-lg rounded-lg p-6 sm:p-12 md:py-10 md:px-8"
                key={key}
              >
                <div className="py-45 px-35">
                  <div>
                    <h4 className="font-semibold text-2xl md:text-h4 lg:text-h4 sm:text-h4sm:leading-8 text-white mb-3 js-show-on-scroll">
                      {item.name}
                    </h4>
                    <p className="font-normal text-base sm:text-para my-4 text-white  sm:leading-8 opacity-80 js-show-on-scroll">
                     "{item.title}"
                    </p>
                  </div>
                  <div className="flex flex-co justify-start items-center gap-4 js-show-on-scroll">
                    <img src={item.img} alt="img" className="w-24" />
                    <div className="js-show-on-scroll">
                      <p className="text-100 bold color-neutral-100 text-white opacity-70">
                        {item.editor}
                      </p>
                      {/* <p className="text-100 bold color-neutral-100 text-white opacity-80">
                      {item.brand}
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Benifits;
