"use client"
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';
import Link from 'next/link';
import Image from 'next/image';
const Securesteps = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])
    return (
        <>
            {/* {loading ? <div className='px-10 py-10'><SkeletonLoader count={1} height={50} width={200} baseColor="gray" highlightColor="#f6f6f6" /></div> : <div className='sm:text-3xl text-2xl font-semibold sm:pl-20 sm:pt-10 p-5 sm:pb-20 pb-15'>
                Tempo AI
            </div>} */}

            {/* <div className='sm:grid sm:grid-cols-2 block pb-10'>
                <div className='sm:p-20 p-auto'>
                    {loading ? <div className='px-10 py-10'><SkeletonLoader count={1} height={300} className="w-full sm:w-[500px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <img src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltc02bb0e77fa1098d/5ea76e572229b2251db004d6/securing-data-at-every-step2.png?cache=48f963a3cfaf2f677ea8fc38c26dd27b&tr=ar-1-1" alt="image" className='sm:h-96 h-[350px] p-6'></img>}
                </div>
                {loading ? <div className='px-10 py-10'><SkeletonLoader count={10} height={40} className="w-full sm:w-[700px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div className='sm:pt-10 sm:pr-5 p-3'>
                    <div className='sm:text-3xl text-2xl font-semibold'>
                        Securing data at every step.
                    </div>
                    <div className='sm:text-xl text-lg sm:pt-5 pt-3'>
                        Security and privacy begin with the way data is handled, stored and protected. The 8x8 platform conforms to stringent specifications for securing financial information, customer privacy and computer networks:
                    </div>
                    <div className='sm:pt-5 sm:pl-5 pt-5 pl-5 sm:text-xl text-lg'>
                        <ul className='list-disc'>
                            <li>Consumer Proprietary Network Information (CPNI)</li>
                            <li>Secure Coding practices including the Open Web Application Security Project (OWASP) and Common Weakness Enumeration (CWE) List</li>
                            <li>Fraud Detection</li>
                            <li>Secure Endpoint Provisioning</li>
                        </ul>
                    </div>
                    <div className='sm:pt-5 sm:text-xl pt-5 text-lg'>
                        How is your current communications provider handling your data?
                    </div>
                    <div className='sm:pt-5 sm:text-xl pt-5 text-lg'>
                        Here are eight questions to ask.
                    </div>
                    <button className='sm:pt-5 sm:text-xl pt-5 text-sm font-bold onHoveLine'>Read the Report<i class="fa fa-arrow-right text-orange text-sm"></i></button>
                </div>}

            </div> */}




            <div className="mx-4 sm:mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%] mt-[30px] sm:py-10 w-auto sm:w-[1440px] sm:mt-[5rem] ">
                <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
                    {" "}
                    <div className="block">
                        {loading ? (
                            <SkeletonLoader
                                count={1}
                                className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                            />
                        ) : (
                            <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[400px]">
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
                                "Securing data at every step."
                            )}{" "}
                        </p>
                        <p className="w-full md:ml-[px] mb-1 xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                            {loading ? (
                                <SkeletonLoader
                                    className="mb-1"
                                    count={1}
                                    height={30}
                                    width="100%"
                                />
                            ) : (
                                "Security and privacy begin with the way data is handled, stored and protected. The 8x8 platform conforms to stringent specifications for securing financial information, customer privacy and computer networks:"
                            )}
                        </p>

                        <div className='sm:pt-5 sm:pl-5 pt-5 pl-5 sm:text-xl text-lg'>
                            <ul className='list-disc'>
                                <li className='text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading text-[15px] leading-[22px] md:text-[24px] md:leading-8 '>Consumer Proprietary Network Information (CPNI)</li>
                                <li className='text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading text-[15px] leading-[22px] md:text-[24px] md:leading-8'>Secure Coding practices including the Open Web Application Security Project (OWASP) and Common Weakness Enumeration (CWE) List</li>
                                <li className='text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading text-[15px] leading-[22px] md:text-[24px] md:leading-8'>Fraud Detection</li>
                                <li className='text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading text-[15px] leading-[22px] md:text-[24px] md:leading-8'>Secure Endpoint Provisioning</li>
                            </ul>
                        </div>

                        <p className="mt-4 w-full md:ml-[px] mb-1 xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                            {loading ? (
                                <SkeletonLoader
                                    className="mb-1"
                                    count={1}
                                    height={30}
                                    width="100%"
                                />
                            ) : (
                                "How is your current communications provider handling your data?"
                            )}
                        </p>
                        <p className="mt-4 w-full md:ml-[px] mb-1 xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                            {loading ? (
                                <SkeletonLoader
                                    className="mb-1"
                                    count={1}
                                    height={30}
                                    width="100%"
                                />
                            ) : (
                                "Here are eight questions to ask."
                            )}
                        </p>
                        <div className="mx-4 px-0 sm:px-0 sm:p-0 sm:mx-auto mt-[25px] mb-[2rem] sm:pb-[30px] ">
                            {loading ? (
                                <div className="mb-5 sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                                    <SkeletonLoader height={60} width={300} />
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="w-full sm:w-auto inline-block font-semibold  rounded-lg bg-[#fe9327] px-6 pb-2 pt-2 border-2 border-[#fe9327]  leading-normal text-white hover:text-[#fe9327] hover:bg-white  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#fe9327] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#fe9327] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#fe9327] text-[16px]"
                                >
                                    <Link href={"/"}>Read the Report</Link>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Securesteps
