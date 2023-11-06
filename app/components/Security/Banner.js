"use client"
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';
const banner = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])
    const customStyles = {
        backgroundImage: `url('https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltcc01b1dc54cff62f/5ea89b7e55c7570a2503b86e/hero-safe-secure-compliant.jpg?cache=f946ef5071ef97ac7a2f59a7dd981a7a&tr=ar-1-1')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        left: 0,
        right: 0,
        zIndex: 9,
    };
    return (
        <div
        className="sm:top-[58px] sm:absolute sm:h-[70vh] sm:flex sm:justify-end sm:flex-col mb-[0px] sm:mb-[45px] for-bg relative"
        style={customStyles}
      >
        <div className="w-auto sm:p-14 relative p-4 sm:w-[1450px] mx-auto App w-full">
          {loading ? (
            <div className="block !font-[700] w-[100%] sm:w-[50%]  pt-5 sm:pt-0  text-[33px] leading-[40px]  relative text-[black]">
              <SkeletonLoader height={60} />
            </div>
          ) : (
            <div className="sm:text-5xl text-[22px] text-white sm:font-bold font-bold pt-5 sm:p-0">
              Secure
            </div>
          )}
          {loading ? (
            <div className="block !font-[700] w-[100%] sm:w-[50%]  pt-5 sm:pt-0 sm:mt-7 text-[33px] leading-[40px]  relative text-[black]">
              <SkeletonLoader height={90} />
            </div>
          ) : (
            <div className="text-white sm:mt-8 mt-2 sm:text-xl text-[15px] w-full sm:w-[600px]">
          From physical security to data at rest or in motion, 8x8 protects your business communications.
            </div>
          )}
          <div className="grid grid-cols-1 w-[100%] sm:grid-cols-2 md:w-[55%]  xl:w-[30%] p-0 mt-10 sm:p-0 gap-4  items-center   sm:mt-10 mb-[2rem] sm:pb-[30px] ">
            {loading ? (
              <div className="mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-center text-2xl sm:text-[38px] font-bold sm:mb-7">
                <SkeletonLoader height={60} width={300} />
              </div>
            ) : (
              <button
                onClick=""
                type="button"
                className="inline-block font-semibold  rounded-lg hover:bg-white px-6 pb-2 pt-2 border-2 border-primary  leading-normal hover:text-primary text-white bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#2563eb] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
              >
                Learn More
              </button>
            )}
          </div>
        </div>
      </div>
    )
}

export default banner