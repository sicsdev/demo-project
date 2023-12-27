"use client"
import React from 'react';
import AboveThefold from '@/app/components/Help/AboveThefold';
import Resources from '@/app/components/Help/Resources';
import Link from 'next/link';


const page = () => {

  const customStyles = {
    backgroundColor: "black",
    backgroundSize: "cover",
    backgroundPosition: "center",
    left: 0,
    right: 0,
    zIndex: 9,
  };
  return (
    <div className="bg-white  px-[20px] sm:px-0   ">
      <AboveThefold/>
      <Resources/>
      <div className="bg-black sm:absolute for-bg-s relative text-white py-20 mb-2 sm:mb-0"
      style={customStyles}
      >
        <div className="sm:px-20 px-5 mx-auto ">
        
              <p className="sm:text-2xl text-lg">Integrate with Deflection</p>
              <p className="sm:text-[55px] text-[25px] sm:font-normal font-light sm:w-[70%] w-[100%] leading-snug mt-3 sm:mt-5">
                Discover <span className="text-red">the advantages</span> of
                seamless integration with our platform
              </p>
              <button
                className="text-white bg-red sm:px-[55px] px-[60px] font-semibold py-[8px] rounded-[8px] my-0 mt-16 sm:mt-20 sm:my-5"
                type="button"
              >
                <Link href="/checkout">Get Started</Link>
              </button>
           
        
        </div>
      </div>
    </div>
  )
}

export default page