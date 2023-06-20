"use client";
import React from 'react'
import { useEffect , useState} from 'react';
import { getSingleBlogsPage } from '@/app/API/pages/Wpdata';
const Page = ({params}) => {
  const [single, setSingle] = useState([])
    console.log(params)
    useEffect(() =>{
      getSingleBlogsPage(params).then((res)=>{
        console.log("res", res.data)
        setSingle(res.data[0])
      })
    },[])
   console.log("sing", single)
    return (
  <>

  <div>
    <h1 className=" font-bold  text-1xl   md:text-h3 lg:text-h3 sm:text-h3 sm:leading-none ">{single?.title?.rendered}</h1>
    <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.para1}
             </p>
             <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">{single?.acf?.heading1}</h1>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.para2}
             </p>
             <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">{single?.acf?.heading2}</h1>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.para3}
             </p>
             <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">{single?.acf?.headingg}</h1>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.text1}
             </p><p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.text2}
             </p><p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.text3}
             </p><p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.text4}
             </p><p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.text5}
             </p>
             <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">{single?.acf?.heading3}</h1>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.head3_text1}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.head3_text2}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.head3_text3}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.head3_text4}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.head3_text5}
             </p>
             <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">{single?.acf?.heading4}</h1>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading4_text}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading4_text1}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading4_text2}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading4_text3}
             </p>
             <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">{single?.acf?.heading5}</h1>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading5_text}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading5_text1}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading5_text2}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading5_text3}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading5_text4}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading5_text5}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading5_text6}
             </p>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading5_text7}
             </p>
             <h1 className=" font-bold  text-1xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">{single?.acf?.heading6}</h1>
             <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
             {single?.acf?.heading6_text}
             </p>

  </div>
  </>
  )
}

export default Page