"use client"
import React, { useEffect, useState } from "react";
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';

const ContactBlog = () => {
    const data = [{
        img: "/ContactBlog1.png",
        description: "2022 Gartner Magic Quadrant for Contact Center as a Service"
    },
    {
        img: "/ContactBlog2.jpg",

        description: "Contact Center Buyers' Checklist"
    },
    {
        img: "/ContactBlog3.jpg",

        description: "Contact Center Predictions for 2023 and Beyond"
    }
    ]

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div>
            <div className='sm:flex grid w-full sm:w-[1440px] mx-auto'>
                {data.map((ele, key) =>
                    <div className='sm:p-[5rem] p-[2rem]'>
                        {loading ? (
                            <SkeletonLoader count={1} height="100%" width="100%" />
                        ) : (
                            <img src={ele.img} alt="" className='h-[14rem] w-[37rem]' />
                        )}
                        <p className=' text-[18px] mt-[25px] text-primary'>
                        {loading ? (
                            <SkeletonLoader count={2} height={30} width={300} />
                        ) : (
                            <>
                            {ele.description}
                            </>
                        )}</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ContactBlog;