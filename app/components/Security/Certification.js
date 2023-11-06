"use client"
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';
import Link from 'next/link';
import Image from 'next/image';
const Certification = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])
    return (
        <>
            {/* <div className='sm:pl-20 border p-5 border-gray sm:pb-20'>
                {loading ? <div className='sm:px-10 sm:pt-24 sm:w-[400px] p-10 w-full'><SkeletonLoader count={1} height={40} className="w-full sm:w-[400px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div className='text-3xl font-semibold sm:pt-20 pt-10'>
                    Comprehensive Security Measures!
                </div>}
                {loading ? <div className='px-10'><SkeletonLoader count={2} height={40} className="w-full sm:w-[700px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div className='pt-2 text-xl sm:w-[850px]'>
                    Guarding Your Data at Every Juncture. Tempo's security framework is comprehensive, ensuring data is managed, stored, and protected to the highest standards:
                </div>}

                <div className='sm:grid sm:grid-cols-2 flex flex-col-reverse pt-10'>
                    <div >
                        {loading ? <div className='px-10 py-10'><SkeletonLoader count={10} height={40} className="w-full sm:w-[700px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <ul className='list-disc pl-5 text-lg'>
                            <li>Content Moderation at the API Level: Strict blacklisting of categories like violence, sexual content, and hate speech.</li>
                            <li>AWS Infrastructure: Utilizing secure and robust data centers for unparalleled data integrity and confidentiality.</li>
                            <li>SSL/TLS Encryption: All interactions between Tempo's servers, website, and clients are secured by HTTPS protocols.</li>
                            <li>Proactive Input Filtering: Employing heuristics and a dedicated language learning model to scrutinize and filter potentially harmful prompts.</li>
                            <li>Secure Payment Processing: Payments are securely handled, adhering to robust security measures and PCI compliance.</li>

                        </ul>}
                        <div>
                            {loading ? <div className='px-10 py-10'><SkeletonLoader count={1} height={40} className="w-full sm:w-[500px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <button className='sm:pt-5 sm:text-xl pt-5 text-sm font-bold onHoveLine'>Learn More<i class="fa fa-arrow-right text-orange text-sm"></i></button>}

                        </div>
                    </div>
                    <div className='sm:pl-44 sm:pt-2 p-10'>
                        {loading ? <div className='px-5'><SkeletonLoader count={1} height={200} className="w-full sm:w-[500px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <img src='https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt795eda3edded5fef/5ea0d5023acb0660063ff57d/straight-talk-about-cloud-communications.jpg?cache=ebe672b81e366b7b67cee3907a12fa0c&tr=ar-1-1' className='sm:h-80 h-[250px]'></img>}
                    </div>
                </div>
            </div> */}

            <div className="mx-4 sm:mx-auto max-w-[100%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%] mt-[30px] sm:py-10 w-auto sm:w-[1440px] ">
                <div className="block sm:grid sm:grid-cols-2 justify-between items-center gap-4">
                <div className="block sm:hidden">
                        {loading ? (
                            <SkeletonLoader
                                count={1}
                                className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                            />
                        ) : (
                            <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[400px]">
                                <Image
                                    src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt795eda3edded5fef/5ea0d5023acb0660063ff57d/straight-talk-about-cloud-communications.jpg?cache=ebe672b81e366b7b67cee3907a12fa0c&tr=ar-1-1"
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
                                "Comprehensive Security Measures!"
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
                                "Guarding Your Data at Every Juncture. Tempo's security framework is comprehensive, ensuring data is managed, stored, and protected to the highest standards:"
                            )}
                        </p>

                        <div className='sm:pt-5 sm:pl-5 pt-5 pl-5 sm:text-xl text-lg'>
                            <ul className='list-disc'>
                                <li className='text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading text-[15px] leading-[22px] md:text-[24px] md:leading-8 '>Content Moderation at the API Level: Strict blacklisting of categories like violence, sexual content, and hate speech.</li>
                                <li className='text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading text-[15px] leading-[22px] md:text-[24px] md:leading-8'>AWS Infrastructure: Utilizing secure and robust data centers for unparalleled data integrity and confidentiality.</li>
                                <li className='text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading text-[15px] leading-[22px] md:text-[24px] md:leading-8'>SSL/TLS Encryption: All interactions between Tempo's servers, website, and clients are secured by HTTPS protocols.</li>
                                <li className='text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading text-[15px] leading-[22px] md:text-[24px] md:leading-8'>Proactive Input Filtering: Employing heuristics and a dedicated language learning model to scrutinize and filter potentially harmful prompts.</li>
                                <li className='text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading text-[15px] leading-[22px] md:text-[24px] md:leading-8'>Secure Payment Processing: Payments are securely handled, adhering to robust security measures and PCI compliance.</li>
                            </ul>
                        </div>
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

                    <div className="hidden sm:block">
                        {loading ? (
                            <SkeletonLoader
                                count={1}
                                className="w-[120px] sm:w-[455px] h-[220px] mb-9 sm:h-[325px] "
                            />
                        ) : (
                            <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[400px]">
                                <Image
                                    src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt795eda3edded5fef/5ea0d5023acb0660063ff57d/straight-talk-about-cloud-communications.jpg?cache=ebe672b81e366b7b67cee3907a12fa0c&tr=ar-1-1"
                                    className="w-full mx-auto bg-contain object-cover sm:object-contain"
                                    fill={true}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Certification