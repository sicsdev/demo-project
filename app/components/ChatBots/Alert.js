import Image from "next/image";
import React from "react";

const Alert = () => {
  return (
    <div className="bg-white py-6 sm:py-5">
      <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
        <h2 className="font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 text-center  sm:my-8  text-heading">
          Alert Relationship Owners to Churn Risks
        </h2>
        <div className="block sm:flex md:flex lg:flex justify-evenly gap-10">
          <div className="p-4 sm:p-28">
            <div className="flex justify-start gap-6">
              <div className="relative w-[90px] h-[35px]">
                <Image
                  fill={true}
                  src="/ico-bullet.svg"
                  className="bg-contain rounded-full mx-auto"
                  alt="img"
                />
              </div>
              <div>
                <h3 className="font-bold  text-[18px] md:text-h5 lg:text-h5 sm:text-h5    text-heading">
                  Automatically alert relationship owners
                </h3>
                <p className="">
                  Automatically alert relationship owners Nothing slips through
                  the cracks or gets lost in translation. Natural language AI
                  detects negative language so you can get everyone on the same
                  page while the iron is hot.
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-6 mt-6">
              <div className="relative w-[90px] h-[35px]">
                <Image
                  fill={true}
                  src="/ico-bullet.svg"
                  className="bg-contain rounded-full mx-auto"
                  alt="img"
                />
              </div>
              <div>
                <h3 className="font-bold text-[18px]  md:text-h5 lg:text-h5 sm:text-h5 text-heading">
                  See risks well before "cancel"
                </h3>
                <p className="">
                  Automatically alert relationship owners Nothing slips through
                  the cracks or gets lost in translation. Natural language AI
                  detects negative language so you can get everyone on the same
                  page while the iron is hot.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="relative h-100 sm:h-[546px] w-100 sm:w-[565px]">
              <Image
                src="/alert-relationship-owners-to-churn-risks.png"
                className="bg-contains w-full"
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] w-full py-5 m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group sm:bg-white bg-background">
        <h2 className="font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 text-center  sm:my-8 text-[#8ed1fc] sm:text-heading">
          Alert Relationship Owners to Churn Risks
        </h2>
        <div className="block sm:flex md:flex lg:flex justify-evenly gap-10">
          <div className="text-center">
            <div className="relative h-100 sm:h-[546px] w-100 sm:w-[565px]">
              <Image
                src="/alert-relationship-owners-to-churn-risks.png"
                className="bg-contains w-full"
                fill={true}
              />
            </div>
          </div>
          <div className="p-4 sm:p-28 ">
            <div className="flex justify-start gap-6">
              <div className="relative w-[90px] h-[35px]">
                <Image
                  fill={true}
                  src="/ico-bullet.svg"
                  className="bg-contain rounded-full mx-auto"
                  alt="img"
                />
              </div>
              <div>
                <h3 className="font-bold  text-[18px]   md:text-h5 lg:text-h5 sm:text-h5   text-white sm:text-heading">
                  Automatically alert relationship owners
                </h3>
                <p className="text-white sm:text-heading">
                  Automatically alert relationship owners Nothing slips through
                  the cracks or gets lost in translation. Natural language AI
                  detects negative language so you can get everyone on the same
                  page while the iron is hot.
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-6 mt-6  ">
              <div className="relative w-[90px] h-[35px]">
                <Image
                  fill={true}
                  src="/ico-bullet.svg"
                  className="bg-contain rounded-full mx-auto"
                  alt="img"
                />
              </div>
              <div>
                <h3 className="font-bold text-[18px] md:text-h5 lg:text-h5 sm:text-h5   text-white sm:text-heading">
                  See risks well before "cancel"
                </h3>
                <p className="text-white sm:text-heading">
                  Automatically alert relationship owners Nothing slips through
                  the cracks or gets lost in translation. Natural language AI
                  detects negative language so you can get everyone on the same
                  page while the iron is hot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
