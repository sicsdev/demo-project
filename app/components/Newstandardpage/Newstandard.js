import React from "react";

const slides = [
  {
    title: "GPT-4 infrastructure",
    text: "Automate more resolutions with less effort and radically advanced automation experiences.",
  },
  {
    title: "GPT-4 infrastructure",
    text: "Automate more resolutions with less effort and radically advanced automation experiences.",
  },
  {
    title: "GPT-4 infrastructure",
    text: "Automate more resolutions with less effort and radically advanced automation experiences.",
  },
  {
    title: "GPT-4 infrastructure",
    text: "Automate more resolutions with less effort and radically advanced automation experiences.",
  },
];
const Newstandard = () => {
  return (
    <div className="bg-background py-8 mb-12">
      <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 relative group">
        <h2 className="text-center  text-2xl md:text-5xl lg:text-5xl sm:text-5xl my-2 font-bold text-white">
          A new standard for intelligent automation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 mt-10">
          {slides.map((item,key) => (
            <div
              className="bg-black shadow-lg rounded-lg p-12 md:py-7 md:px-8 hover:scale-105 transition-transform duration-300"
              style={{ border: "1px solid #2f2f2f", borderRadius: "20px" }}
              key={key}
            >
              <div className="flex flex-co justify-start items-center gap-4 mb-10">
                <h3 className="font-semibold text-xl md:text-xl lg:text-xl sm:text-xl text-white js-show-on-scroll">
                  {item.title}
                </h3>
                <button
                  class="font-semibold rounded-full px-4 py-1 text-black js-show-on-scroll"
                  style={{ background: "#dbff1d" }}
                >
                  New
                </button>
              </div>
              <div className="flex flex-co justify-start items-center gap-4">
                <p className="text-white opacity-80 js-show-on-scroll">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newstandard;
