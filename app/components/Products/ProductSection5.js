"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

const ProductSection5 = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  return (
    <div className="sm:p-[0rem] px-[2rem]">
      <div className="sm:mt-[3rem]">
        <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
          {loading ? (
            <SkeletonLoader count={1} height={45} width="60%" />
          ) : (
            "Automated SMS is the best way to contact your customers"
          )}
        </p>
      </div>
      <div>
        <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[3rem] mt-[2rem] sm:mb-[0px] mb-[3rem] ">
          <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
            <div>
              <div className="sm:ml-[3rem]">
                <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                  {loading ? (
                    <SkeletonLoader count={1} height={35} width="100%" />
                  ) : (
                    "Send two-way SMS messages"
                  )}{" "}
                </p>
                <p className="w-full md:ml-[px]  mb-5 xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                  {loading ? (
                    <SkeletonLoader count={1} height={120} width="100%" />
                  ) : (
                    "8x8's SMS API provides a programmatic way to create two way SMS conversations for uses such as a customer support channel and appointment confirmations. Watch the video to see the code in action."
                  )}
                </p>
                <div className=" flex gap-1">
                  {loading ? (
                    <SkeletonLoader count={1} height={35} width={180} />
                  ) : (
                    <p className="  sm:w-52 w-[100%] font-bold cursor-pointer hover:underline underline-offset-4 flex">
                      Watch the video &nbsp;{" "}
                      <ArrowLongRightIcon class="h-6 w-6 text-[#FF5721]" />
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              {" "}
              <div className="block">
                {loading ? (
                  <SkeletonLoader
                    count={1}
                    className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                  />
                ) : (
                  <div className="relative w-[100%] h-[250px] sm:w-[403px] sm:h-[255px]">
                    <Image
                      src="https://ik.imagekit.io/8x8/Zx4sKajThz6Wf96gwZCUoC.jpg?cache=dc2d3515c1f66c3a5006f411c5539510&tr=fo-auto,noWrapper-true,w-800"
                      className="w-full mx-auto bg-contain object-cover sm:object-contain"
                      fill={true}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[3rem] ">
          <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
            <div>
              {" "}
              <div className="block">
                {loading ? (
                  <SkeletonLoader
                    count={1}
                    className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                  />
                ) : (
                  <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[340px]">
                    <Image
                      src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blta1b39c6eceba42b6/5f4d93735acde4265bb2d948/secure-procedures-1129342100.jpg?cache=2727fa0daa59f98372c25dfafddf565c&tr=fo-auto,noWrapper-true,w-800"
                      className="w-full mx-auto bg-contain object-cover sm:object-contain"
                      fill={true}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="sm:ml-[3rem] mt-5 sm:mt-0">
                <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                  {loading ? (
                    <SkeletonLoader count={1} height={45} width="100%" />
                  ) : (
                    "Security built in"
                  )}{" "}
                </p>
                <p className="w-full mb-5 md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                  {loading ? (
                    <SkeletonLoader count={1} height={120} width="100%" />
                  ) : (
                    "We ensure that all SMS messages are sent and received securely so that you can have peace of mind. The linked web page below lists out a detailed description of the methods used to create strong security for the SMS APIs."
                  )}
                </p>
                <div className=" flex gap-1">
                  {loading ? (
                    <SkeletonLoader count={1} height={35} width={200} />
                  ) : (
                    <p className="  sm:w-[18rem] w-[100%] font-bold cursor-pointer hover:underline underline-offset-4 flex">
                      See more about SMS security &nbsp;{" "}
                      <ArrowLongRightIcon class="h-6 w-6 text-[#FF5721]" />
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[3rem]  sm:mb-[0px] mb-[3rem] ">
          <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
            <div>
              <div className="sm:ml-[3rem]">
                <h2 className=" !font-semibold text-left  text-2xl text-[#252C47] sm:w-[34rem]  md:text-h2 lg:text-[26px] tracking-wide sm:text-h2 sm:leading-none ">
                  {loading ? (
                    <SkeletonLoader count={1} height={45} width="100%" />
                  ) : (
                    "Hands-on with SMS API"
                  )}{" "}
                </h2>
                <p className="sm:my-3 text-left my-3 sm:text-[18px] text-sm sm:w-[650px] font-light sm:mb-[40px] leading-7 tracking-[0.5px]">
                  {loading ? (
                    <SkeletonLoader count={1} height={120} width="100%" />
                  ) : (
                    "Open the possibilities. 8x8 Developer Hub gives access to step-by-step guides and API references."
                  )}
                </p>
                <div className=" flex gap-1">
                  {loading ? (
                    <SkeletonLoader count={1} height={35} width={200} />
                  ) : (
                    <p className="  sm:w-52 w-[100%] font-bold cursor-pointer hover:underline underline-offset-4 flex">
                      Developer Resources &nbsp;{" "}
                      <ArrowLongRightIcon class="h-6 w-6 text-[#FF5721]" />
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              {" "}
              <div className="block">
                {loading ? (
                  <SkeletonLoader count={1} height={350} width={550} />
                ) : (
                  <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[315px]">
                    <Image
                      src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt54c7135a9d35183e/5ed70a378ad0af2c8e52890d/xl-bnr-open-lab-home.png?cache=6dfca07c2e8bcf11e1d260af18905a1f&tr=fo-auto,noWrapper-true,w-800"
                      className="w-full mx-auto bg-contain object-cover sm:object-contain"
                      fill={true}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> */}
        <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[3rem] ">
          <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
            <div>
              {" "}
              <div className="block">
                {loading ? (
                  <SkeletonLoader
                    count={1}
                    className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                  />
                ) : (
                  <div className="relative w-[100%] h-[250px] sm:w-[588px] sm:h-[340px]">
                    <Image
                      src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltbdcc0778769fd7a8/60c7df4fb930a53616fa1aa4/mobile-phone-city-162984065-rmg.jpg?cache=2e4924fa61f76a60833fbaa96f1445a0&tr=fo-auto,noWrapper-true,w-800"
                      className="w-full mx-auto bg-contain object-cover sm:object-contain"
                      fill={true}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="sm:ml-[0rem]">
                <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                  {loading ? (
                    <SkeletonLoader count={1} height={45} width="100%" />
                  ) : (
                    "8x8 - Your dedicated communications partner"
                  )}{" "}
                </p>
                <p className="sm:my-3 text-left my-3 sm:text-[18px] text-sm sm:w-[542px] font-light sm:mb-[40px] leading-7 tracking-[0.5px]">
                  {loading ? (
                    <SkeletonLoader count={1} height={120} width="100%" />
                  ) : (
                    <>
                      {/* <p className="font-semibold sm:mb-[20px]">
                        Direct connections with operators
                      </p> */}
                      <ul className="list-disc ">
                        <li>
                          <p className="w-full sm:mb-1 md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                            High quality direct connections with South East
                            Asia, APAC, EMEA and the Americas operators boosting
                            global coverage
                          </p>
                        </li>
                        <li>
                          <p className="w-full md:ml-[px]   sm:mb-1  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                            Redundancy assurance with fallbacks for each APAC
                            destinations
                          </p>
                        </li>
                        <li>
                          <p className="w-full md:ml-[px]  sm:mb-1 xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                            A single partner for the entire region with
                            expertise in local market constraints
                          </p>
                        </li>
                        <li>
                          <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                            24/7 support
                          </p>
                        </li>
                      </ul>
                    </>
                  )}
                </p>

                {/* <p className="sm:my-3 text-left my-3 sm:text-[18px] text-sm sm:w-[542px] font-light sm:mb-[40px] leading-7 tracking-[0.5px]">
                  {loading ? (
                    <SkeletonLoader count={1} height={120} width="100%" />
                  ) : (
                    <>

                      <ul className="list-disc">
                        <li>
                          <p className="w-full md:ml-[px]  sm:mb-1 xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                            A single partner for the entire region with
                            expertise in local market constraints
                          </p>
                        </li>
                        <li>
                          <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                            24/7 support
                          </p>
                        </li>
                      </ul>
                    </>
                  )}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection5;
