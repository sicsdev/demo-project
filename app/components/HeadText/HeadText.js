import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';

const HeadText = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    // bg-[#F8FCFA]
    return (
        <div className='shadow-md bg-white'>
            <div className='py-[30px] lg:py-[50px]'>
                {loading ? (
                    <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
                        <SkeletonLoader height={30} width={"70%"} />
                    </div>
                ) : (
                    <h2 class="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]" >
                        Every Channel. Every Language. 24/7.

                    </h2>
                )}
                {loading ? (
                    <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
                        <SkeletonLoader height={30} width={"50%"} />
                    </div>
                ) : (
                    <p className="text-blue-400 w-full sm:w-[60%] mx-auto text-center font-[400] text-heading text-[15px] leading-[22px] gap-2">
                        Experience the power of Deflection AI in enhancing customer interactions across every channel. Our platform, designed for efficiency and reliability, ensures seamless communication in any language, around the clock.
                    </p>
                )}
            </div>
        </div>
    )
}

export default HeadText