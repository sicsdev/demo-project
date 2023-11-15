import React from "react";

const HomeContent = ({ handleClickScroll }) => {
  return (
    <>
      <div className="mt-4 sm:mt-8 max-w-[1400px] w-full m-auto sm:py-4 sm:px-4 px-3 lg:px-4 relative">
        <div className="flex flex-wrap justify-between">
          <div className="md:w-[50%] p-4">
            <h2 className="text-left p-0 py-2 sm:p-3 md:py-2 md:px-0 !font-bold text-[20px] sm:text-[24px] text-[#000] ">
              Pay Per Resolution, Not Per Seat or Per Hour
            </h2>
            <div className="flex gap-2">
              <img className="w-[20px] h-[17px] mt-[4px]" src="/1.jpg" alt="" />
              <p className="text-left">
                Deflection AI's straightforward pricing means you only pay for the
                resolutions you need, allowing for complete scalability aligned
                with your customer service demand.
              </p>
            </div>
          </div>
          <div className="md:w-[50%] p-4">
            <h2 className="text-left p-0 py-2 sm:p-3 md:py-2 md:px-0 !font-bold text-[20px] sm:text-[24px] text-[#000] ">
              Tailored Plans with White-Glove Onboarding
            </h2>
            <div className="flex gap-2">
              <img className="w-[20px] h-[17px] mt-[4px]" src="/1.jpg" alt="" />
              <p className="text-left">
                Choose the flexibility of pay-as-you-go pricing or the dedicated
                support of our enterprise plans, each including white-glove
                onboarding to ensure seamless integration into your operations.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          <div className="md:w-[50%] p-4">
            <h2 className="text-left p-0 py-2 sm:p-3 md:py-2 md:px-0 !font-bold text-[20px] sm:text-[24px] text-[#000] ">
              Efficiency-Driven Cost Savings
            </h2>
            <div className="flex gap-2">
              <img className="w-[20px] h-[17px] mt-[4px]" src="/1.jpg" alt="" />
              <p className="text-left">
                Embrace the power of AI with Deflection AI to streamline your support
                needs. Businesses can reduce the number of agents and save
                significantly, thanks to the efficiencies gained from our
                advanced platform.
              </p>
            </div>
          </div>
          <div className="md:w-[50%] p-4">
            <h2 className="text-left p-0 py-2 sm:p-3 md:py-2 md:px-0 !font-bold text-[20px] sm:text-[24px] text-[#000] ">
              Zero Hidden Fees
            </h2>
            <div className="flex gap-2">
              <img className="w-[20px] h-[17px] mt-[4px]" src="/1.jpg" alt="" />
              <p className="text-left">
                Transparent pricing is at the core of Deflection AI's philosophy. Enjoy
                a clear, predictable billing cycle with zero hidden costs,
                giving you the financial clarity your business deserves.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center px-3 sm:px-0 items-center mt-8 sm:mb-8 sm:ml-[62px] cursor-pointer">
        <button
          onClick={handleClickScroll}
          className="inline-block font-semibold  rounded-lg bg-white px-6 pb-2 pt-2 border-2 border-primary  leading-normal text-primary hover:text-white hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
        >
          Get a Quote
        </button>
      </div>
    </>
  );
};

export default HomeContent;
