"use client"
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';
import Link from 'next/link';
import Image from 'next/image';
const Reliability = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])
    return (
        <>
            {/* <div className='sm:grid sm:grid-cols-2 block pt-10 sm:pb-10 pb-5'>
                <div className='sm:pt-5 sm:pl-40 p-10'>
                    {loading ? <div className='px-10'><SkeletonLoader count={1} height={300} className="w-full sm:w-[500px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <img src='https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltb389cd4253304b67/5df2a31c4e76c55d401ba6bc/8x8_office_31996_web.jpg?cache=ba57d30cdbd7470c61ff1b2e0fb4eb4a&tr=ar-1-1' className='w-[450px]'>
                    </img>}
                </div>
                {loading ? <div className='px-10 py-10'><SkeletonLoader count={7} height={40} className="w-full sm:w-[700px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div className='sm:pt-10 p-4'>
                    <div className='text-xl font-semibold'>
                        Peace of mind through availability and reliability
                    </div>
                    <div className='pt-3 text-lg'>
                        Over the last 20 years, there have been an average of 386 natural disasters. Ensuring business resilience is mandatory in this environment of constent potential disruptions. 8x8’s cloud-based business communications solutions are delivered from mirrored, top-tier, secure, fully redundant, and geographically diverse state-of-the-art data centers that are "Statement on Standards for Attestation Engagements (SSAE) 16" audited.
                    </div>
                    <div>
                        <button className='sm:pt-5 sm:text-xl pt-5 text-sm font-bold onHoveLine'>Learn More<i class="fa fa-arrow-right text-orange text-sm"></i></button>
                    </div>
                </div>}

            </div> */}
            {/* <div className='flex sm:p-28 p-5 sm:gap-10 gap-5'>
                <div className='border-l-4 border-red h-20 mt-2'>
                </div>
                <div className='block'>
                    <div className='sm:text-2xl text-sm italic'>
                        "8x8 XCaaS has all the features we were looking for, with a robust contact center system and native Microsoft Teams integration, all in one secure platform."
                    </div>
                    <div className='sm:pt-4 sm:text-xl sm:font-normal text-sm font-semibold'>
                        - Matt Cox, IT Manager
                    </div>
                </div>
            </div> */}



            <div className="mx-4 sm:mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%] mt-[30px] sm:py-10 w-auto sm:w-[1440px] ">
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
                                    src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltb389cd4253304b67/5df2a31c4e76c55d401ba6bc/8x8_office_31996_web.jpg?cache=ba57d30cdbd7470c61ff1b2e0fb4eb4a&tr=ar-1-1"
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
                                "Peace of mind through availability and reliability"
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
                                `Over the last 20 years, there have been an average of 386 natural disasters. Ensuring business resilience is mandatory in this environment of constent potential disruptions. 8x8’s cloud-based business communications solutions are delivered from mirrored, top-tier, secure, fully redundant, and geographically diverse state-of-the-art data centers that are "Statement on Standards for Attestation Engagements (SSAE) 16" audited."`
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
                                    <Link href={"/"}>Learn More</Link>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Reliability