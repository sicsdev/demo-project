"use client"
import React, { useEffect, useState } from 'react';
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";

const data=[ {
  title:"Voice API/SDK",
  description:"Ensure privacy with Call Masking, or give your applications a voice with interactive app to app calls, text-to-speech (TTS) phone calls",
  learn:"Learn more"
}, {
  title:"Chat Apps",
  description:"Reach wider audiences by sending richer messages and content to users of ALL major chat apps including WhatsApp Business, LINE, WeChat and Viber",
  learn:"Learn more"

}, {
  title:"Video Interaction",
  description:"From consultations, to insurance claims to customer support, our Video Interaction API lets you be there, even when you can’t",
  learn:"Learn more"

}, {
  title:"8x8 Connect",
  description:"8x8 Connect is an all-in-one business communication platform which is used by knowledge-driven business to manage omni channel campaigns, send text or voice messages, and get real-time reports and analytics",
  learn:"Learn more"

}]


const ProductSection7 = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }, []);
  
  return (
    <div className='sm:p-[0rem] px-[2rem] shadow-box'>
          <div className=' sm:mt-[0rem]  sm:p-[3rem]'>
          <p className=" mb-5  sm:p-0 sm:mt-0 mt-5 text-black text-left sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                {loading ? (
                  <SkeletonLoader count={1} height={45} width="80%" />
                ) : (
                    "Explore other 8x8 APIs for a complete customer engagement strategy"
                )}
                </p>
            <div class="sm:grid grid-cols-2 gap-4">
            {data.map((ele,key)=>
                <div className='sm:p-[50px]'>
              <p className="w-full font-bold md:ml-[px]  xl:w-[597px] text-blue-400 text-left sm:mb-3 px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader count={1} height={45} width={200} />
                ) : (
                   <> {ele.title}</>
                )}
                   </p>
                   <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader count={5} height={30} width="100%" />
                ) : (
                    <>{ele.description}</>
                )}</p>
                  {loading ? (
                  <SkeletonLoader count={1} height={35} width={200} />
                ) : (
                <p className='flex sm:mt-[2rem] font-bold gap-1 cursor-pointer hover:underline underline-offset-4 sm:mb-[0px] mb-[2rem]'>{ele.learn}
                {ele.learn == "" ? "" :<ArrowLongRightIcon class="h-6 w-6 text-[#FF5721]" />}
 </p>
                )}
                </div>  
                )}
            </div>
            </div>
    </div>
  )
}

export default ProductSection7;