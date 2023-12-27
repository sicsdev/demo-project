import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../../Skeleton/Skeleton';

const HeadIp = () => {
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
            <div className='py-[30px] lg:py-[50px] px-4 sm:px-0'>
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
                        Discover the transformative impact of Deflection AI in your contact center. Our solution is engineered for peak efficiency and unwavering reliability, facilitating seamless interactions across all channels and in any language, all day, every day.
                    </p>
                )}
            </div>
        </div>
    )
}

export default HeadIp