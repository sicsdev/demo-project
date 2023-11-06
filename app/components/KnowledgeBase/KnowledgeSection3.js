"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";


const KnowledgeSection3 = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    return (
        <div className='sm:p-[3rem] p-[2rem] shadow-box'>
            <div className='sm:mt-[3rem]'>
            <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                    {loading ? (
                        <SkeletonLoader count={1} height={45} width="60%" />
                    ) : (
                        "Tools to meet your modern business demands"
                    )}</p>
            </div>
            <div>
                <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[3rem] mt-[2rem] sm:mb-[0px] mb-[3rem] ">
                    <div className='block sm:flex justify-between items-center gap-4'>
                        <div>
                            <div className="sm:ml-[3rem]">
                            <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                                    {loading ? (
                                        <SkeletonLoader count={1} height={35} width="100%" />
                                    ) : (
                                        "Choose the deployment method that fits your business"
                                    )} </p>
                                <p className="sm:my-3 text-left my-3 sm:text-[18px] text-sm sm:w-[650px] font-light sm:mb-[40px] leading-7 tracking-[0.5px]">
                                    {loading ? (
                                        <SkeletonLoader count={4} height={30} width="100%" />
                                    ) : (
                                        "8x8 provides a variety of deployment packages designed for the unique nature of your business. Managed, tailored or a la carte implementation deployment plans are available to ensure your communications are quickly moved to the cloud."
                                    )}
                                </p>
                                <div className=''>
                                {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
            type="button"
            className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
          >
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: `
   <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;" >
   <span className="underline cursor-pointer text-white ">Get Started
   </span>
   </a>
  `,
              }}
            />
          </button>
        )}
                                </div>
                    

                            </div></div>
                        <div>  <div className="block">
                            {loading ? (
                                <SkeletonLoader count={1} height={350} width={550}/>
                            ) : (
                                <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[315px]">
                                    <Image
                                        src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt31b33f4cb0e8bd1e/5df2a454d03adf37d49cda7a/8x8_office_13185_web.jpg?cache=20f66072924c66877dae949f7412abe3&tr=fo-auto,noWrapper-true,w-800"
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
                    <div className='block sm:flex justify-between items-center gap-4'>

                        <div>  <div className="block">
                            {loading ? (
                                <SkeletonLoader count={1} height={350} width={550} />
                            ) : (
                                <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[340px]">
                                    <Image
                                        src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt9905b44b02b33913/5dfd5b28300bb3438c3998ed/8x8_industry_115_web.jpg?cache=af993d68aa6d25f90fd66fbcc466dd0b&tr=fo-auto,noWrapper-true,w-800"
                                        className="w-full mx-auto bg-contain object-cover sm:object-contain"
                                        fill={true}
                                    />
                                </div>
                            )}

                        </div>

                        </div>
                        <div>
                            <div className="sm:ml-[3rem]">
                            <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                                    {loading ? (
                                        <SkeletonLoader count={1} height={45} width="100%" />
                                    ) : (
                                        "Leverage assets and resources when you need them"
                                    )} </p>
                                <p className="sm:my-3 text-left my-3 sm:text-[18px] text-sm sm:w-[650px] font-light sm:mb-[40px] leading-7 tracking-[0.5px]">
                                    {loading ? (
                                        <SkeletonLoader count={4} height={30} width="100%" />
                                    ) : (
                                        "Leverage assets and resources when you need them"
                                    )}
                                </p>
                                <div className=''>
                                {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
            type="button"
            className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
          >
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: `
   <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;" >
   <span className="underline cursor-pointer text-white ">Get Started
   </span>
   </a>
  `,
              }}
            />
          </button>
        )}
                                </div>
                                <div className="block">
                                    <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8">
                                        <div className="block sm:flex w-[100%] items-center gap-8">

                                        </div>
                                        <div className="inline mt-5  sm:max-w-[30%] sm:mt-[20px]"></div>
                                    </div>
                                </div>

                            </div></div>
                    </div>

                </div>
                <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[3rem] mt-[2rem] sm:mb-[0px] mb-[3rem] ">
                    <div className='block sm:flex justify-between items-center gap-4'>
                        <div>
                            <div className="sm:ml-[3rem]">
                            <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                                    {loading ? (
                                        <SkeletonLoader count={1} height={45} width="100%" />
                                    ) : (
                                        "Maximize uptime through reliability and security"
                                    )} </p>
                                <p className="sm:my-3 text-left my-3 sm:text-[18px] text-sm sm:w-[650px] font-light sm:mb-[40px] leading-7 tracking-[0.5px]">
                                    {loading ? (
                                        <SkeletonLoader count={4} height={30} width="100%" />
                                    ) : (
                                        "8x8’s fault tolerant architecture means there are no single points of failure. The service is designed to function with the loss of a server, a cluster of servers or even a database."
                                    )}
                                </p>
                                <div className=''>
                                {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
            type="button"
            className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
          >
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: `
   <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;" >
   <span className="underline cursor-pointer text-white ">Get Started
   </span>
   </a>
  `,
              }}
            />
          </button>
        )}
                                </div>
                            

                            </div></div>
                        <div>  <div className="block">
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

                </div>
                <div className=" mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] sm:mt-[3rem] ">
                    <div className='block sm:flex justify-between items-center gap-4'>

                        <div>  <div className="block">
                            {loading ? (
                                <SkeletonLoader count={1} height={350} width={550} />
                            ) : (
                                <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[340px]">
                                    <Image
                                        src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt41c516a2f7953c19/5df2a4544e76c55d401ba6ca/8x8_office_14765_web.jpg?cache=5bdf41ef6fdf146495e88032810549ea&tr=fo-auto,noWrapper-true,w-800"
                                        className="w-full mx-auto bg-contain object-cover sm:object-contain"
                                        fill={true}
                                    />
                                </div>
                            )}

                        </div>

                        </div>
                        <div>
                            <div className="sm:ml-[3rem]">
                            <p className="   mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                                    {loading ? (
                                        <SkeletonLoader count={1} height={45} width="100%" />
                                    ) : (
                                        "Unify and empower your workforce"
                                    )} </p>
                                <p className="sm:my-3 text-left my-3 sm:text-[18px] text-sm sm:w-[650px] font-light sm:mb-[40px] leading-7 tracking-[0.5px]">
                                    {loading ? (
                                        <SkeletonLoader count={4} height={30} width="100%" />
                                    ) : (<>
                                        <p>8x8’s global footprint allows users to access the same tools, regardless of location or device. All of your communication capabilities are in one modern interface. This eliminates app fatigue while increasing accountability, productivity and contact center agent retention.</p>
                                    </>
                                    )}
                                </p>
                                <div className=''>
                                {loading ? (
          <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
            <SkeletonLoader height={60} width={300} />
          </div>
        ) : (
          <button
            type="button"
            className="inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
          >
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: `
   <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;" >
   <span className="underline cursor-pointer text-white ">Get Started
   </span>
   </a>
  `,
              }}
            />
          </button>
        )}
                                </div>
                                <div className="block">
                                    <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8">
                                        <div className="block sm:flex w-[100%] items-center gap-8">

                                        </div>
                                        <div className="inline mt-5  sm:max-w-[30%] sm:mt-[20px]"></div>
                                    </div>
                                </div>

                            </div></div>
                    </div>

                </div>
                {/* <hr className='sm:mb-[3rem]'/>
                <div className='sm:flex'>
                    <img src="https://ik.imagekit.io/8x8/sJ3Khj1mV8kDMETjsZjQru.jpg?cache=cf3cfb1d4d293ae946e9c75e89501bcc&tr=fo-auto,noWrapper-true,w-800" className='sm:h-[18rem]' alt="" />
                    <p className='sm:text-[17px] m-[auto]'>Christian Brothers Services migrated their on-premises systems to the cloud. When the pandemic hit, 8x8 X Series enabled CBS to keep operations strong, and they continue to help improve efficiency, collaboration, and customer service.</p>
                </div> */}
            </div>
        </div>
    )
}

export default KnowledgeSection3;