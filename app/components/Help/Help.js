import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';
import { useRouter } from 'next/navigation';

const Help = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    const router = useRouter();

  const handleGetFreeTrial = () => {
    router.push(`/checkout?plan=0`);
  };
    return (
        <div className='bg-[#F8FCFA] shadow-md '>
            <div className='py-[30px] px-3 lg:py-[50px]'>
                {loading ? (
                    <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
                        <SkeletonLoader height={30} width={"70%"} />
                    </div>
                ) : (
                    <h2 class="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]" >
                    Ready to get started?
                    </h2>
                )}
                {loading ? (
                    <div className="m-auto text-center text-base py-1 sm:mt-8  px-1 rounded-full">
                        <SkeletonLoader height={30} width={"50%"} />
                    </div>
                ) : (
                    <p className="text-blue-400 w-full sm:w-[60%] mx-auto text-center font-[400] text-heading text-[15px] leading-[22px] gap-2">
                        At Deflection AI, we're more than ready to address any questions. Why not give our platform a whirl? Start your free trial today and gain full access to our exclusive enterprise features for an entire month.    </p>
                )}
                <div className='block  sm:flex justify-center gap-4 items-center'>
                    <button
                        className="my-6 w-[300px] mx-auto sm:mx-0 flex items-center justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 focus:ring-yellow-300 bg-[#F5455C]  text-white hover:shadow-[0_8px_9px_-4px_#F5455C] disabled:bg-input_color disabled:shadow-none disabled:text-white"
                        disabled={false}
                        onClick={handleGetFreeTrial}
                    >
                        Jump into your Free Trial{" "}
                    </button>
                    <button
                        data-cal-link="tempoai/sales-call"
                        data-cal-config='{"layout":"month_view"}'
                        className="my-6 flex items-center mx-auto sm:mx-0 justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 w-[300px] focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">

Chat with Our Expert Team
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Help