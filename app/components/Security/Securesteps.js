"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";

const Securesteps = ({handleClickScroll}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="about conetct sm:p-[0px] p-[2rem] ">
      <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[5rem] ">
        <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
          <div className="sm:ml-[3rem]">
            <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
              {loading ? (
                <SkeletonLoader
                  className="my-1"
                  count={1}
                  height={45}
                  width="100%"
                />
              ) : (
                "Advanced Security Compliance and Protocols            "
              )}{" "}
            </p>
            <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (
                "Experience unmatched data protection with Tempo's stringent security measures."
              )}
            </p>

            <p className="w-full md:ml-[px] mt-3   xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (<p>
                <b> Base API Moderation : </b>Our AI-driven platform enforces
                strict content standards, blacklisting sensitive categories
                such as violence and hate speech to ensure a safe user
                environment.</p>           )}
            </p>
            <p className="w-full md:ml-[px] mt-3  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (<p>
                <b> SSL and TLS Certificates
: </b>All client-server interactions are shielded with HTTPS protocols, establishing a secure line of communication to preserve data privacy.</p>           )}
            </p>
            <div className="grid grid-cols-1 w-[100%] sm:flex px-0 sm:px-0 sm:p-0 gap-4 sm:w-auto items-center mx-auto mt-[25px] sm:mt-10 mb-[2rem] sm:pb-[30px] ">
              {loading ? (
                <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                  <SkeletonLoader height={60} width={300} />
                </div>
              ) : (
                <button
                  onClick={handleClickScroll}
                  type="button"
                  className="inline-block font-semibold  rounded-lg bg-white px-6 pb-2 pt-2 border-2 border-primary  leading-normal text-primary hover:text-white hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
                >
                  Get a Quote
                </button>
              )}
              {loading ? (
                <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                  <SkeletonLoader height={60} width={300} />
                </div>
              ) : (
                <button
                  type="button"
                  className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
                >
                  <Link href={"/checkout"}>Start Now</Link>
                </button>
              )}
            </div>
          </div>
          <div className="block">
            {loading ? (
              <SkeletonLoader
                count={1}
                className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
              />
            ) : (
              <div className="relative w-[100%] h-[319px] sm:w-[703px] sm:h-[400px]">
                <Image
                  src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltc02bb0e77fa1098d/5ea76e572229b2251db004d6/securing-data-at-every-step2.png?cache=48f963a3cfaf2f677ea8fc38c26dd27b&tr=ar-1-1"
                  className="w-full mx-auto bg-contain object-cover sm:object-contain"
                  fill={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%] mt-[30px]  sm:py-10 w-full sm:w-[1440px] sm:mt-[0rem] ">
        <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
          {" "}
          <div className="hidden  sm:block">
            {loading ? (
              <SkeletonLoader
                count={1}
                className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
              />
            ) : (
              <div className="relative w-[100%] h-[319px] sm:w-[703px] sm:h-[400px]">
                <Image
                  src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltc02bb0e77fa1098d/5ea76e572229b2251db004d6/securing-data-at-every-step2.png?cache=48f963a3cfaf2f677ea8fc38c26dd27b&tr=ar-1-1"
                  className="w-full mx-auto bg-contain object-cover sm:object-contain"
                  fill={true}
                />
              </div>
            )}
          </div>
          <div className="sm:ml-[3rem]">
            <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
              {loading ? (
                <SkeletonLoader
                  className="my-1"
                  count={1}
                  height={45}
                  width="100%"
                />
              ) : (
                "Infrastructure and Data Integrity       "
              )}{" "}
            </p>
            <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (
                "Tempo utilizes state-of-the-art hosting and data management to safeguard your communications."
              )}
            </p>

            <p className="w-full md:ml-[px] mt-3   xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (<p>
                

                <b> AWS Server Hosting : </b> By utilizing Amazon's highly secure and robust data centers, we offer leading-edge protection for data integrity and confidentiality.</p>           )}
            </p>
            <p className="w-full md:ml-[px] mt-3  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (<p>
                <b> Prompt Injection Protection: </b>Employing sophisticated heuristics and a dedicated language model, we meticulously scrutinize incoming data for enhanced defense against security threats.</p>           )}
            </p>
            <div className="grid grid-cols-1 w-[100%] sm:flex px-0 sm:px-0 sm:p-0 gap-4 sm:w-auto items-center mx-auto mt-[25px] sm:mt-10 mb-[2rem] sm:pb-[30px] ">
              {loading ? (
                <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                  <SkeletonLoader height={60} width={300} />
                </div>
              ) : (
                <button
                  onClick={handleClickScroll}
                  type="button"
                  className="inline-block font-semibold  rounded-lg bg-white px-6 pb-2 pt-2 border-2 border-primary  leading-normal text-primary hover:text-white hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
                >
                  Get a Quote
                </button>
              )}
              {loading ? (
                <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                  <SkeletonLoader height={60} width={300} />
                </div>
              ) : (
                <button
                  type="button"
                  className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
                >
                  <Link href={"/checkout"}>Start Now</Link>
                </button>
              )}
            </div>
          </div>
          <div className="block  sm:hidden">
            {loading ? (
              <SkeletonLoader
                count={1}
                className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
              />
            ) : (
              <div className="relative w-[100%] h-[319px] sm:w-[703px] sm:h-[400px]">
                <Image
                  src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltc02bb0e77fa1098d/5ea76e572229b2251db004d6/securing-data-at-every-step2.png?cache=48f963a3cfaf2f677ea8fc38c26dd27b&tr=ar-1-1"
                  className="w-full mx-auto bg-contain object-cover sm:object-contain"
                  fill={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[5rem] ">
        <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
          <div className="sm:ml-[3rem]">
            <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
              {loading ? (
                <SkeletonLoader
                  className="my-1"
                  count={1}
                  height={45}
                  width="100%"
                />
              ) : (
                " Enhanced Quality Controls "
              )}{" "}
            </p>
            <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (
                "Optimize your operations with Tempo’s customizable quality management features."
              )}
            </p>

            <p className="w-full md:ml-[px] mt-3   xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (<p>
                <b> Smart workflows for your common tickets : </b>From day one Tempo will start to analyze and interpret common responses and resolutions.</p>           )}
            </p>
            <p className="w-full md:ml-[px] mt-3  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (<p>
                <b> Train on your own FAQ and Help Center
: </b>Have an extensive knowledge base? Tempo will utilize your company’s policies to ensure responses and resolutions are relevant and appropriate.</p>           )}
            </p>
            <p className="w-full md:ml-[px] mt-3  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              {loading ? (
                <SkeletonLoader
                  className="mb-1"
                  count={1}
                  height={30}
                  width="100%"
                />
              ) : (<p>
                <b> Dynamic Keyword Filtering : </b>Control the scope of user interactions by specifying keywords that restrict workflows or access to certain knowledge, ensuring discussions remain focused and relevant.</p>           )}
            </p>
            <div className="grid grid-cols-1 w-[100%] sm:flex px-0 sm:px-0 sm:p-0 gap-4 sm:w-auto items-center mx-auto mt-[25px] sm:mt-10 mb-[2rem] sm:pb-[30px] ">
              {loading ? (
                <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                  <SkeletonLoader height={60} width={300} />
                </div>
              ) : (
                <button
                  onClick={handleClickScroll}
                  type="button"
                  className="inline-block font-semibold  rounded-lg bg-white px-6 pb-2 pt-2 border-2 border-primary  leading-normal text-primary hover:text-white hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
                >
                  Get a Quote
                </button>
              )}
              {loading ? (
                <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                  <SkeletonLoader height={60} width={300} />
                </div>
              ) : (
                <button
                  type="button"
                  className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
                >
                  <Link href={"/checkout"}>Start Now</Link>
                </button>
              )}
            </div>
          </div>
          <div className="block">
            {loading ? (
              <SkeletonLoader
                count={1}
                className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
              />
            ) : (
              <div className="relative w-[100%] h-[319px] sm:w-[703px] sm:h-[400px]">
                <Image
                  src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltc02bb0e77fa1098d/5ea76e572229b2251db004d6/securing-data-at-every-step2.png?cache=48f963a3cfaf2f677ea8fc38c26dd27b&tr=ar-1-1"
                  className="w-full mx-auto bg-contain object-cover sm:object-contain"
                  fill={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Securesteps;
