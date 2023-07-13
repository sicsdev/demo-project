'use client'
import Image from "next/image";
import React,{useState} from "react";
import Card from "../Common/Card/Card";

const Smartsocialalert = () => {
  const [hide, setHide] = useState({
    first: false,
    second: false,
    third: false,
  });
  return (
    <div className="bg-background py-6 sm:py-5">
      <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group"
       onClick={() =>
        setHide({ first: false, second: false, third: false, fourth: false })
      }
      >
        <h2 className="font-bold  text-[14px]  md:text-[29px]  text-center  sm:my-8  leading-[28px] sm:leading-[38px] text-white"></h2>
        <div className="block sm:flex md:flex lg:flex justify-evenly gap-10">
          <div className="p-4 sm:p-[3rem]">
            <div className="flex justify-start gap-6 mt-6">
              <div className="relative w-[90px] h-[35px]">
                <span className="flex sm:gap-3  text-custom-small  sm:mt-1 sm:text-3xl align-bottom font-semibold">
                  {" "}
                  &#x2713;
                </span>
              </div>
              <div>
                <p className="text-white ml-[-40px] sm:ml-[-62px]">
                  Redefine Engagement with 24/7 Support and Seamless
                  Integration<span
                className="cursor-pointer"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setHide({ first: true });
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setHide({ first: true });
                }}
              >
                *
              </span>
              {hide.first == true ? (
                <Card
                  className={
                    "animate-fadeIn w-[320px]	sm:w-[400px]  absolute bg-white ml-auto mr-auto left-0 right-0 z-[111]"
                  }
                >
                  <p
                    className="text-heading"
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setHide({ first: false });
                      }, 3000)
                    }
                  >
                 *Smart Social responses may be delated subject to Facebook, Instagram, Twitter, and WhatsApp platform downtime.
                  </p>
                </Card>
              ) : (
                ""
              )}
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-6 mt-6">
              <div className="relative w-[90px] h-[35px]">
                <span className="flex sm:gap-3  text-custom-small  sm:mt-1 sm:text-3xl align-bottom font-semibold">
                  {" "}
                  &#x2713;
                </span>
              </div>
              <div>
                <p className="text-white">
                  Stay Connected with 24/7 Support Stay connected with your
                  customers with Smart Social. Forget the hassle of managing a
                  round-the-clock support team or compromising on quality. With
                  Smart Social, you are always present for your customers,
                  across Facebook, Instagram, Twitter, and WhatsApp.
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-6 mt-6">
              <div className="relative w-[90px] h-[35px]">
                <span className="flex sm:gap-3  text-custom-small  sm:mt-1 sm:text-3xl align-bottom font-semibold">
                  {" "}
                  &#x2713;
                </span>
              </div>
              <div>
                <p className="text-white">
                  Effortless Integration with Your Existing Systems Simplicity
                  and convenience are our guiding principles. Smart Social
                  integrates seamlessly with your backend processes, ensuring a
                  smooth and stress-free transition that boosts your efficiency.
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-6 mt-6">
              <div className="relative w-[90px] h-[35px]">
                <span className="flex  sm:gap-3  text-custom-small  sm:mt-1 sm:text-3xl  align-bottom font-semibold">
                  {" "}
                  &#x2713;
                </span>
              </div>
              <div>
                <p className="text-white">
                  Transparent and Fair Pricing: Pay Only for What You Respond
                  Smart Social stands for transparency. We charge a simple 25
                  cents per response. Enjoy the straightforwardness of paying
                  only for what you actually use.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="relative h-100 sm:h-[363px] w-100 sm:w-[543px]">
              <Image
                src="/middle.png"
                className="bg-contains w-full"
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smartsocialalert;
