"use client";
import React,{useEffect, useState} from 'react';
import { getArticleCategory } from '@/app/API/pages/Wpdata';
import Link from 'next/link';

const page = () => {

    const [single, setSingle] = useState([]);

    useEffect(() => {
      getArticleCategory().then((res) => {
        setSingle(res.data);
        console.log("resss", res);
      });
    }, []);
    console.log("single", single);

  return (
    <div className='bg-[white]  px-[20px] sm:px-0  sm:pl-[10%] pb-[83px]'>
        <div>
<h2 className='font-bold  px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none'>Tempo Overview</h2>
<div className='border-2 rounded-lg mt-[60px] w-[68rem] px-3 py-2'>
    {/* {single?.map((ele,key)=> */}
   <Link href="/article/what-is-tempo"> <p  className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">What is Tempo?</p></Link>
   
   <Link href="/article/pricing-overview"> <p  className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">Pricing Overview</p></Link>
   
   
   <Link href="/article/security-overview"> <p  className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">Security Overview</p> </Link>
    {/* )} */}

</div>
        </div>
    </div>
  )
}

export default page;