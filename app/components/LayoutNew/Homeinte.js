"use client"
import React, { useState, useEffect } from "react";
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';

const Homeinte = () => {
    const images = [
      { url: "/nextmed-color2.svg" },
      { url: "/simplesentiments-color3.svg" },
      { url: "/labpass-color2.svg" },
      { url: "/perry_logo.png" },
    ];
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, []);
    return (
      <div className="icons pt-[1px] sm:pt-4 pb-12 w-full mx-auto shadow-box">
        <div className="sm:mb-8 mx-auto max-w-[90%]">
        <h1 className='text-center text-2xl sm:text-[38px]  sm:leading-8 my-2 font-bold sm:my-6 font-base text-[black]' >
                {loading ? <SkeletonLoader count={1} height={30} width={"60%"} /> :
                    "Demo chat with common industries:"
                }
            </h1>
          <div className="grid sm:flex sm:justify-center grid-cols-2 sm:grid-cols-7 text-center gap-2 sm:gap-0">
            {images.map((element, key) => (
              <div
                className="relative w-full mx-auto sm:mx-10 mt-6 img-div-2"
  
                key={key}
              >
              {loading ? (
                <SkeletonLoader count={1} height={40} width={150} />
              ) : (
                <img
                  src={element.url}
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto object-contain`}
                />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="text-center">
        <button
          className="text-[#252C47] text-[20px] px-6 border-[3px] border-[#dfe2eb] hover:border-[#252c47] sm:mt-4 mx-auto rounded-2xl p-4 font-semibold"
        >
          See customer stories
        </button>
      </div> */}
      </div>
    );
  };

export default Homeinte