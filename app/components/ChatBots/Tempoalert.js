import Image from "next/image";
import React from "react";

const Tempoalert = () => {
  return (
    <div className="bg-background py-6 sm:py-5">
     <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
        <h2 className="font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 text-center  sm:my-8  leading-[40px] sm:leading-[60px] text-white">
        Stay Ahead with Round-the-Clock Support and Seamless Integration        </h2>
        <div className="block sm:flex md:flex lg:flex justify-evenly gap-10">
          <div className="p-4 sm:p-[3rem]">
            <div className="flex justify-start gap-6">
              <div className="relative w-[90px] h-[35px]">
              <span className="flex sm:gap-3  text-custom-small  sm:mt-1 sm:text-3xl align-bottom font-semibold">
                      {" "}
                      &#x2713; 
                    </span>
              </div>
              <div>
                <h3 className="font-bold  text-[18px] md:text-h5 lg:text-h5 sm:text-h5    text-white">
                  Never Miss a Beat with 24/7 Support{" "}
                </h3>
                <p className="text-white">
                  Stay ahead of the game with Tempo Chat. No need to hire around
                  the clock and overpay while missing your SLAs with subpar
                  quality. Tempo Chat is always being there when your customers
                  need support.
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
                <h3 className="font-bold text-[18px]  md:text-h5 lg:text-h5 sm:text-h5 text-white">
                  Smooth Integration with Your Existing Systems{" "}
                </h3>
                <p className="text-white">
                  We believe in making things easy. That's why Tempo Chat
                  integrates seamlessly with your backend processes, providing a
                  smooth, hassle-free transition that amplifies your efficiency.
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
              <h3 className="font-bold text-[18px]  md:text-h5 lg:text-h5 sm:text-h5 text-white">
                Clear and Fair Billing: Only Pay for What You Use{" "}
              </h3>
              <p className="text-white">
                At Tempo Chat, transparency is our mantra. Our straightforward
                billing structure charges only 25 cents per chat response. Enjoy
                the simplicity of paying only for what you truly use.{" "}
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

export default Tempoalert;
