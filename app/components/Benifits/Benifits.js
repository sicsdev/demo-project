"use client";
import React, { useEffect } from "react";
import Carasual from "../Providers/Carasual";
import Image from "next/image";
const slides = [
  {
    background: `bg-sky`,
    name: "Customer service headaches are history.",
    title:
      "Customer service is a solved problem. Automating support for our enterprise clients has been an immense cost-saver and has provided us with an industry-leading advantage.        ",
    editor: "Dean Z",
    position: "CEO & Founder ",
    brand: "Perry",
    img: "/testimonial/perry.svg",
    class:"mb-[-7px]"
  },
  {
    background: `bg-orange`,
    title:
      "The ability to scale up customer-facing staffing and back office operations, coupled with Tempo's ChatGPT-powered automations, has really powered our business's fulfillment.      ",
    name: "We supercharged our business with Tempo.",

    editor: "Frank P",
    position: "Vice President",
    brand: "LabPass",
    img: "/labpass-color2.svg",
    class:""
  },
  {
    background: `bg-neon`,
    title:
      "Instead of wasting my time hiring freelancers and trying to figure out new software platforms, I plugged into Tempo and was able to focus on what matters: growing my business.      ",
    name: "I can finally focus on what matters.",
    editor: "Matthew E",
    brand: "Simple Senti",
    position: "Founder ",
class:"",
    img: "/testimonial/simplesentiments.svg",
  },
];
const Benifits = () => {
  return (
    <>
      <div className="bg-white pt-2 sm:pt-5 pb-6 sm:pb-6">
        <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
          <h2 className="font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 text-center mt-0 sm:mt-8 mb-8 text-heading">
            Why customers love Tempo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 px-4 lg:px-4 mb-6">
            {slides.map((item, key) => (
              <div
                className="relative bg-black shadow-lg rounded-lg p-6 sm:p-12 md:py-10 md:px-8"
                key={key}
              >
                <div className="py-45 px-35">
                  <div className="mb-[40px] sm:mb-[25px]">
                    <h4 className="font-semibold text-2xl md:text-h4 lg:text-h4 sm:text-h4sm:leading-8 text-white mb-3 js-show-on-scroll">
                      {item.name}
                    </h4>
                    <p className="font-normal text-base sm:text-para my-4 text-white  sm:leading-8 opacity-80 js-show-on-scroll">
                      "{item.title}"
                    </p>
                  </div>
                  <div className={`flex flex-row justify-start  gap-4 js-show-on-scroll absolute bottom-[20px] ${item.class}`}>
                
                    <img src={item.img} alt="img" className="w-24 " />
                    <div className="js-show-on-scroll">
                      <p className="text-100 bold color-neutral-100 text-white opacity-70 ">
                        {item.editor}
                      </p>
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
