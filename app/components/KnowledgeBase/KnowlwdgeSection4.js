"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";



const KnowlwdgeSection4 = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);
  
    
  const data = [
    {
      img: "https://ik.imagekit.io/8x8/tdpWqi6TsCT37nr73Rzx3F.jpg?tr=ar-16-9,fo-auto,w-500",
      title: "100% Confidence with 8x8",
      description: "Remove the risk with 8x8, with guaranteed call quality and a risk-free agreement."
    }, {
      img: "https://ik.imagekit.io/8x8/wipqavuRZTGqFZaQR1TkzH.jpg?tr=ar-16-9,fo-auto,w-500",
      title: "Strategy and Analysis Workshop",
      description: ""
    }, {
      img: "https://ik.imagekit.io/8x8/mZmJR3NQkniLHbahTiJkh1.jpg?tr=ar-16-9,fo-auto,w-500",
      title: "8x8 Global Reach",
      description: ""
    }

  ]

    return (

        <>

<footer className=" bg-[#142543] shadow text-center text-white relative">

<div className="mx-auto lg:max-w-[100%]">


    <div className="sm:p-[5rem] p-[2rem]">
        <p className="sm:text-[29px] text-[22px] font-semibold ">Integrate with Deflection AI
        </p>
        <p className=" text-[16px] my-4">Discover the advantages of seamless integration with our platform</p>
        <button className="text-white   w-full sm:mt-4 sm:flex sm:mx-auto justify-center hover:text-heading my-5 text-center sm:my-0  text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg">
            <Link
                href="/checkout"
                className=" px-[20px] py-[5px] rounded-[25px] bg-[#fe9327] hover:bg-black hover:text-white"
            >
                Get Started
            </Link>
        </button>
    </div>



</div>

</footer>
            {/* <div className='sm:p-[0px] p-[2rem]'>
      <div className='sm:p-[3rem]'>
        <p className='sm:text-[27px] text-[21px] font-medium'>
          {loading ? (
            <SkeletonLoader count={1} height={45} width="70%" />
          ) : (
            "Explore more 8x8 resources"
          )}</p>
        
      </div>
      <div className=' sm:p-[3rem] sm:grid grid-cols-3 gap-4 grid-cols-[30%_30%_30%] justify-between'>
        {data.map((ele, key) =>
          <div className='border-[1px] border-[#808080b5] mb-[2rem]'>
            
            {loading ? (
              <SkeletonLoader className="mb-2" count={1} height={70} width="100%" />
            ) : (
              <img className="sm:w-[100%]" src={ele.img} alt="" />
            )}
            <p className='flex justify-center sm:text-[20px] text-[17px] mt-[12px] font-bold'>
            {loading ? (
            <SkeletonLoader count={1} height={35} width={200}/>
          ) : (
             <> {ele.title}</>
          )}
              </p>
            <p className='p-[1rem]  sm:text-[18px] font-light'>
            {loading ? (
            <SkeletonLoader count={5} height={30} width="100%"/>
          ) : (<>
              {ele.description}
              </>
          )}
          </p>
         
          </div>
        )}


      </div>
      

    </div> */}
        </>

    );

};



export default KnowlwdgeSection4;