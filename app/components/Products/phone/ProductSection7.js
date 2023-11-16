"use client"
import React, { useEffect, useState } from 'react';
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Link from 'next/link';

const data = [
  {
    name: "Deflection AI Chat: Instant, Intelligent, Integrated",
    para: "Why settle for a basic chatbot when you can have Deflection AI Chat? Seamlessly handle customer queries and connect to your backend APIs for a comprehensive customer service solution.",
    link: "/solutions/chatbot",
  },
  {
    name: "Smart Inbox: Your Email, But Better",
    para: "Manage your email support effortlessly with Smart Inbox. Automatically sort, prioritize, and respond to emails, freeing your team to focus on what really matters.",
    link: "/solutions/email",
  },
  {
    name: "Workflow Builder: Streamline Operations Like Never Before",
    para: "Unify your customer service processes with our intuitive Workflow Builder. Chain together steps from multiple platforms, apply conditional logic, and automate your way to efficiency.",
    link: "/features/workflow-builder",
  },
  {
    name: "Learning Center: Your Bot's Brain Trust",
    para: "The Learning Center is where your bot becomes an expert. Upload ticket histories and leverage real-time recommendations to make your bot smarter with each interaction.",
    link: "/features/learning-center",
  }
  
];

const ProductSection7 = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, []);
  
  return (
    <div className='sm:p-[0rem] px-[2rem] shadow-box mb-[30px]'>
          <div className='pb-[6px] sm:mt-[0rem]  sm:!p-[3rem]'>
          <p className=" mb-5  sm:p-0 text-center sm:mt-0 mt-5  text-[black] sm:leading-[45px] text-[1.5rem] sm:text-[38px] font-bold sm:mb-1 ">
                {loading ? (
                  <SkeletonLoader count={1} height={45} width="80%" />
                ) : (
                    "Explore our suite of features and products"
                )}
                </p>
            <div class="sm:grid grid-cols-2 gap-4">
            {data.map((ele,key)=>
                <div className='sm:p-[50px]'>
              <p className="w-full font-bold md:ml-[px]  xl:w-[597px] text-blue-400 text-left sm:mb-3 px-0 sm:px-0 text-[#0057ff]  xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader count={1} height={45} width={200} />
                ) : (
                   <> {ele.name}</>
                )}
                   </p>
                   <p className="w-full md:ml-[px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-0 sm:px-0 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader count={5} height={30} width="100%" />
                ) : (
                    <>{ele.para}</>
                )}</p>
                  {loading ? (
                  <SkeletonLoader count={1} height={35} width={200} />
                ) : (
                  <Link href={ele.link}>
                  <p className="flex sm:mt-[2rem] font-bold gap-1 cursor-pointer hover:underline underline-offset-4 sm:mb-[0px] mb-[2rem]">
                    learn more
                    {ele.learn == "" ? (
                      ""
                    ) : (
                      <ArrowLongRightIcon class="h-6 w-6 text-[#FF5721]" />
                    )}
                  </p>
                </Link>
                )}
                </div>  
                )}
            </div>
            </div>
    </div>
  )
}

export default ProductSection7;