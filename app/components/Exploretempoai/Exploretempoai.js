import React, { useState } from "react";

const slides = [
  {
    image:"/menu/7.png",
    title: "Inbound Smart IVR",
    text: "Utilize our LLM connectors to analyze your FAQ and shipping/return policy to customize your workflows.",
   },
  {
    image:"/menu/6.png",
    title: "Outbound Agent",
    text: "Utilize our LLM connectors to analyze your FAQ and shipping/return policy to customize your workflows.",
  },
  {
    image:"/menu/5.png",
    title: "Train on your policies",
    text: "Utilize our LLM connectors to analyze your FAQ and shipping/return policy to customize your workflows.",
  },
];
const Exploretempoai = () => {

  return (
    <div className="bg-white py-8 ">
      <div
        className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 relative group"
      >
        <h2 className="text-center  text-2xl md:text-h2 lg:text-h2 sm:text-h2 sm:leading-8 my-2 font-bold text-heading">
          Explore Tempo AI's other solutions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 lg:px-4 mt-10">
          {slides.map((item, key) => (
            <div
              className="bg-white shadow-lg rounded-lg p-6 sm:p-12 md:py-7 md:px-8 hover:scale-105 transition-transform duration-300"
              key={key}
            >
                <div className="text-center mb-4">
                <img className="w-[45px] m-auto" src={item.image} alt="menu_icons"/>
                </div>
              <div className="flex flex-col-reverse sm:flex-row justify-center items-start sm:items-center gap-4 sm:mb-3">
                <h5 className="font-semibold text-xl md:text-h6 sm:leading-2 lg:text-h6 sm:text-h6 text-heading js-show-on-scroll">
                  {item.title}
                </h5>
              </div>
              <p className="text-black text-base sm:text-para js-show-on-scroll relative">
                {item.text}
              </p>
              <div className="text-center mt-6">
                <button
                  type="button"
                  className="inline-block w-[90%] px-6 pb-2.5 pt-2.5 text-xs rounded-full font-medium  leading-normal bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                >
                  Coming Soon →
                </button>
              </div>
              <div className="text-center mt-6">
                <button
                  type="button"
                  className="inline-block w-[90%] px-6 pb-2.5 pt-2.5 text-xs rounded-full font-medium leading-normal text-heading "
                >
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exploretempoai;
