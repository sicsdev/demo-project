import React from "react";

const Launch = () => {
  return (
    <div className="bg-background">
      <div className=" mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-10">
        <div className="block sm:flex md:flex lg:flex justify-between  items-start ">
          <div className="max-w-[100%] sm:max-w-[35%] md:max-w-[35%] lg:max-w-[35%]">
            <p className="text-first-section-color text-2xl font-semibold mb-5 sm:mb-7">
              Designed for developers
            </p>
            <h2 className="mb-5 text-white text-xl sm:text-3xl font-bold sm:mb-7">
              Launch quickly with powerful and easy-to-use APIs
            </h2>
            <p className="text-gray sm:mb-7">
              Save engineering resources with seamless back-office
              functionality. While API's are not required to use Deflection AI, our
              machine learning team has built an intuitive, customizable, and
              powerful solution you can deploy to automate customer service and
              operations with just a few lines of code.
            </p>
            <button className="py-2 px-8 sm:w-[60%] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 text-white text-lg font-semibold bg-primary hover:bg-white hover:text-primary dark:focus:ring-yellow-900 rounded-lg">
              <a href="https://docs.usetempo.ai"> Read the docs </a>
            </button>
          </div>
          <div className="sm:w-[45%] md:w-[45%] lg:w-[45%]">
            <div className="w-full  mt-[40px] sm:mt-0">
              <div className="h-[100%]  mb-6 sm:mb-0">
                <img
                  src="/tabs/typing2.gif"
                  className="w-full sm:h-[454px] m-auto rounded-[32px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launch;
