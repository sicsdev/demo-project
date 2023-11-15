import Image from "next/image";
import React from "react";

const Requestdemo = () => {
  return (
    <>
      <div className="bg-[#fff] sm:px-16 sm:pb-16 rounded-lg">
        <div className="bg-[#142543] rounded-lg grid grid-cols-8 gap-4 sm:grid-cols-12 py-10 sm:py-16 px-10 sm:px-14">
          <div className="col-span-12 sm:col-span-8">
            <h3 className="sm:leading-[42px] font-bold  text-2xl text-white md:text-h3 lg:text-h3 sm:text-h3 sm:leading-none">
              Why spend hours hunting for the perfect verbatims
              <span className="text-first-section-color">
                when you can automatically pull a tailored list?
              </span>
            </h3>
          </div>
          <div className="col-span-12 sm:col-span-4 flex items-center justify-center">
            <button
              type="submit"
              className="focus:outline-none focus:ring-4  font-bold rounded-md text-base py-2.5 mb-2 mr-2 py-[11px] px-8 focus:ring-yellow-300 text-white bg-black hover:bg-primary dark:focus:ring-voilet-900 disabled:bg-input_color disabled:text-white"
            >
              <div>
                <a href="">
                  <span className="underline cursor-pointer text-white">
                    {" "}
                    Request Demo
                  </span>
                </a>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pb-4 max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
        <h2 className="font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 text-center mx-4 sm:my-8  text-heading">
          Critical Context That Fills In the Blanks
        </h2>
        <div className="block sm:flex md:flex lg:flex justify-evenly gap-10">
          <div className="p-4 sm:p-28">
            <div className="flex justify-start gap-6">
              <div className="relative w-[70px] h-[35px]">
                <Image
                  fill={true}
                  src="/ico-bullet.svg"
                  className="bg-contain rounded-full mx-auto"
                  alt="img"
                />
              </div>
              <div>
                <h3 className="font-bold  text-2xl  md:text-h5 lg:text-h5 sm:text-h5    text-heading">
                  Understand nontraditional use cases
                </h3>
                <p className="">
                  Customers are doing what with your reporting tool? Share what
                  your customers are trying to do so you and Product can better
                  serve them.
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-6 mt-6">
              <div className="relative w-[70px] h-[35px]">
                <Image
                  fill={true}
                  src="/ico-bullet.svg"
                  className="bg-contain rounded-full mx-auto"
                  alt="img"
                />
              </div>
              <div>
                <h3 className="font-bold text-2xl md:text-h5 lg:text-h5 sm:text-h5    text-heading">
                  Distinguish power users from fringe users
                </h3>
                <p className="">
                  Patchwork of end-users? Contextualize product feedback based
                  on personas so that you can prioritize your most important
                  users.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="relative h-100 sm:h-[546px] w-100 sm:w-[565px]">
              <Image
                src="/criticalcontext.png"
                className="bg-contains w-full"
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* three columns section */}
      <div className="bg-white py-6 sm:py-5">
        <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
          <h2 className="font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 text-center  my-8  text-heading">
            Why customers love Deflection AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 px-4 lg:px-4 mb-6">
            <div className="relative bg-#fff shadow-lg rounded-lg p-6 sm:p-12 md:py-10 md:px-8">
              <div className="py-45 px-35">
                <div className="mb-[40px] sm:mb-[25px]">
                  <div className="flex js-show-on-scroll">
                    <img src="/frame.png" alt="img" className="w-14 mb-6" />
                  </div>
                  <h3 className="font-bold text-2xl md:text-h5 lg:text-h5 sm:text-h5    text-heading">
                    Build for your actual customer experience
                  </h3>
                  <p className="font-normal text-base sm:text-para my-4 text-black  sm:leading-8 opacity-80 js-show-on-scroll">
                    Increase Product alignment with what your customers need to
                    succeed and don’t build in the opposite direction.
                    Data-driven product feedback reporting cuts through politics
                    and clarifies priorities.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative bg-#fff shadow-lg rounded-lg p-6 sm:p-12 md:py-10 md:px-8">
              <div className="py-45 px-35">
                <div className="mb-[40px] sm:mb-[25px]">
                  <div className="flex js-show-on-scroll">
                    <img src="/frame.png" alt="img" className="w-14 mb-6" />
                  </div>
                  <h3 className="font-bold text-2xl md:text-h5 lg:text-h5 sm:text-h5    text-heading">
                    Save days out of every month
                  </h3>
                  <p className="font-normal text-base sm:text-para my-4 text-black  sm:leading-8 opacity-80 js-show-on-scroll">
                    Stop spending precious time toiling away hunting for the
                    perfect verbatims. AI-based case analysis puts everything
                    you’re looking for right at your fingertips, neatly packaged
                    with minimal manual effort.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative bg-#fff shadow-lg rounded-lg p-6 sm:p-12 md:py-10 md:px-8">
              <div className="py-45 px-35">
                <div className="mb-[40px] sm:mb-[25px]">
                  <div className="flex js-show-on-scroll">
                    <img src="/frame.png" alt="img" className="w-14 mb-6" />
                  </div>
                  <h3 className="font-bold text-2xl md:text-h5 lg:text-h5 sm:text-h5    text-heading">
                    Reduce dependence on surveys
                  </h3>
                  <p className="font-normal text-base sm:text-para my-4 text-black  sm:leading-8 opacity-80 js-show-on-scroll">
                    Stop waiting around for low response rates and
                    out-of-context commentary. Understand the organic feedback
                    you already have and get the answers to all of your
                    questions — including the ones you didn’t know to ask.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* talk to us */}
      <div className="bg-white text-center">
      <h2 className="mb-5 md:mb-0 font-bold text-2xl  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none   text-heading  ">
        Want to finally see your feedback on the<br/> roadmap?
      </h2>
      <div className="col-span-4 sm:col-span-4 flex items-center justify-center pt-10 pb-16">
            <button
              type="submit"
              className="focus:outline-none focus:ring-4  font-bold rounded-md text-base py-2.5 mb-2 mr-2 py-[11px]  px-8 focus:ring-yellow-300 text-white bg-black hover:bg-primary dark:focus:ring-voilet-900 disabled:bg-input_color disabled:text-white"
            >
              <div>
                <a href="">
                  <span className="underline cursor-pointer text-white">
                    {" "}
                    TALK TO US
                  </span>
                </a>
              </div>
            </button>
          </div>
          </div>
    </>
  );
};

export default Requestdemo;
