"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

const ProductSection6 = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <div className=" mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[100%]  sm:py-10 w-full sm:w-[1440px] mt-[3rem] ">
        <div className='block sm:flex justify-between items-center gap-4'>
          <div>
            <div className="sm:ml-[3rem]">
              <h2 className=" !font-semibold text-left  sm:text-2xl text-[22px] text-[#252C47] sm:w-[34rem]  md:text-h2 lg:text-[35px] tracking-wide sm:text-h2 sm:leading-none ">
                {loading ? (
                  <SkeletonLoader count={1} height={45} width="80%" />
                ) : (
                  "Enterprise"
                )} </h2>
              <p className="sm:my-3 text-left my-3 sm:text-[20px] text-sm sm:w-[650px] font-light sm:mb-[40px] leading-7 tracking-[0.5px]">
                {loading ? (
                  <SkeletonLoader count={4} height={30} width="100%" />
                ) : (
                  "Enjoy bulk rates and enterprise level bespoke solutions with high volume SMS for your business. Get in touch with our sales team to learn more."
                )}
              </p>
              <div className='text-white flex gap-2'>
                {loading ? (
                  <SkeletonLoader count={1} height={45} width={180} />
                ) : (
                  <button className='border border-white rounded-3xl mt-3 p-2 sm:w-52 w-[100%] font-bold hover:bg-white hover:text-[#FF5721] hover:border-[#FF5721] bg-[#FF5721]'>Speak With Us</button>
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
          <div>  <div className="block">
            {loading ? (
              <SkeletonLoader count={1} height={350} width={550} />
            ) : (
              <div className="relative w-[100%] h-[250px] sm:w-[703px] sm:h-[400px]">
                <Image
                  src="https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/bltdf63954f1c76ceb0/60edeea46a54304c40590734/API-keys-d.png?cache=90b93b464074248a9faeebc2cc4032dd&tr=fo-auto,noWrapper-true,w-800"
                  className="w-full mx-auto bg-contain object-cover sm:object-contain"
                  fill={true}
                />
              </div>
            )}

          </div>

          </div>

        </div>

      </div>
      <div className='sm:grid grid-cols-2 gap-4 sm:p-[0px] p-[2rem]'>
        <div className='sm:mb-[0px] mb-[3rem]'>
          <p className='flex tracking-wide  text-[20px] font-semibold leading-7 text-[#000000b3] sm:mb-[0px] mb-[20px]'>
          {loading ? (
                  <SkeletonLoader count={1} height={40} width={180} />
                ) : (
            "Pay-per-use"
                )}</p>
          <p className='sm:text-[18px] tracking-wide sm:mt-[20px] font-light leading-7 sm:w-[100%]'>
          {loading ? (
                  <SkeletonLoader count={4} height={30} width="100%" />
                ) : (
            "Only pay for what you need. SMS pricing is dependent on the destination, message type and carrier the SMS will be sent to."
                )}
                </p>
          <div className=' flex gap-2'>
          {loading ? (
                  <SkeletonLoader count={1} height={35} width={200} />
                ) : (
            <button className='border border-[#0057ff] rounded-3xl mt-3 p-2 sm:w-auto w-[100%] font-bold hover:bg-custom_text hover:text-[#0057ff]'>Download SMS prices (.xls)</button>
                )}
          </div>
          <div className='mt-[1rem] '>
            {loading ? (
              <SkeletonLoader className="mb-4" count={1} height={50} width="100%" />
            ) : (
              <>
                <input
                  type={"text"}
                  placeholder={"Country"}
                  // value={country.data}
                  // onChange={(e) => setCountry({ data: e.target.value })}
                  className={
                    "mb-3 border border-input_color w-full block  px-2 py-3 sm:px-3 sm:py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  }
                />
                {/* {country.error == true ? <p className='text-[red] text-left'>This field is required</p> : ""} */}
              </>
            )}
          </div>
        </div>
        <div className='sm:mb-[0px] mb-[3rem]'>
          <p className='flex tracking-wide  text-[20px] font-semibold leading-7 text-[#000000b3]'>
          {loading ? (
                  <SkeletonLoader count={1} height={40} width={180} />
                ) : (
            "Get started, it's free!"
                )}</p>
          <p className='sm:text-[18px] tracking-wide sm:mt-[20px] font-light leading-7 sm:w-[100%]'>
          {loading ? (
                  <SkeletonLoader count={4} height={30} width="100%" />
                ) : (
            "See it in action. Create an account with 8x8 Connect – an all-in-one business communication platform used by knowledge-driven businesses to manage omni-channel campaigns, send text or voice messages, and get real-time reports and analytics."
                )}</p>
          <div className=' flex gap-2'>
          {loading ? (
                  <SkeletonLoader count={1} height={35} width={200} />
                ) : (
            <button className='border border-[#0057ff] rounded-3xl mt-3 p-2 sm:w-auto w-[100%] font-bold hover:bg-custom_text hover:text-[#0057ff]'>Create an Account</button>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSection6;