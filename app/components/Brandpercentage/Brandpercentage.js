import React from "react";

const Brandpercentage = () => {
  return (
    <div className="bg-background py-4 sm:py-8">
      <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 relative group">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 mt-10">

            <div className="data-wrapper text-center">
              <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">50%</p>
              <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">Lower CS Costs Guaranteed</p>
            </div>
            <div className="data-wrapper text-center">
              <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">24/7</p>
              <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">Round-the-clock support</p>
            </div>
            <div className="data-wrapper text-center">
              <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">0</p>
              <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">Lines of code needed</p>
            </div>
            <div className="data-wrapper text-center">
              <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">1,000+</p>
              <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">GPT-powered agents available </p>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Brandpercentage;
