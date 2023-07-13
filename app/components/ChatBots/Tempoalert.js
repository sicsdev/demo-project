import Image from "next/image";
import React from "react";
import { useState } from "react";
import Card from "../Common/Card/Card";
import Button from "../Common/Button/Button";

const Tempoalert = () => {
  const [hide, setHide] = useState({
    first: false,
  });
  return (
    <div className="bg-background py-6 sm:py-5">
      <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
        <div className="flex flex-col sm:grid sm:grid-cols-2">
          <div>
            <h2 className="font-bold  text-[25px]   px-6 sm:px-0 sm:text-[25px] text-center  sm:my-8 sm:text-start leading-[35px] sm:ml-[75px] sm:leading-[44px] text-white">
              Stay Ahead with Round-the-Clock Support and Seamless Integration{" "}
            </h2>
          </div>

          <div>
            <Button
              className="flex  sm:w-full mx-auto max-w-[70%] sm:max-w-[50%] mt-4 sm:mt-10 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg- border border-gray-300 rounded-md shadow-sm checkout"
            >
              Learn more about security{" "}
            </Button>
          </div>
        </div>

        <div className="block sm:grid sm:grid-cols-2 justify-evenly ">
          <div className="p-4">
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
                  quality. Tempo Chat is always there when your customers need
                  support.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 ">
            <div className="flex justify-start gap-6 ">
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
          </div>
          <div className="p-4 ">
            <div className="flex justify-start gap-6 ">
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
                <p
                  className="text-white relative"
                  onMouseLeave={() => setHide({ first: false })}
                >
                  At Tempo Chat, transparency is our mantra. Our straightforward
                  billing structure charges only 25 cents per chat response.
                  Enjoy the simplicity of paying only for what you truly use.{" "}
                  <span
                    className="cursor-pointer"
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
                        "animate-fadeIn w-[320px] sm:w-[400px] absolute z-50 top-[30px] bg-white ml-auto mr-auto left-0 right-0"
                      }
                    >
                      <p
                        className="text-heading"
                        onMouseLeave={() => setHide({ first: false })}
                      >
                        Usage-based pricing includes customer-initiated
                        interactions. If you would like to limit the number of
                        interactions, you can set a hard spend limit within your
                        profile.
                      </p>
                    </Card>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tempoalert;
