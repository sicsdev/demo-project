"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';


const ContactCarousel = () => {
  var workflowslider = {
    arrows: true,

    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "11%",
    // autoplay:true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          speed: 900,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0%",
        },
      },
    ],
  };

  const data = [
    {
      img: "/career1.jpg",
      heading: "Matt Cox",
      para: "It feels really good to have people compliment my IT team on a big change we’ve made.",
      desgnation: "Vice President - Technology & Business Analytics, Kansas City Royals"
    },
    {
      img: "/career2.jpg",
      heading: "Michele Sandoe",
      para: "When my peers in the 211 community ask about this transition, I can honestly, happily talk about the experiences I've had with 8x8 and connecTel.",
      desgnation: "Vice President - Technology & Business Analytics, Kansas City Royals"
    },
    {
      img: "/career3.jpg",
      heading: "Mobashir Ahmed",
      para: "There was just this sense of comfort that we got from working with 8x8.  And of course, the product itself is wonderful.",
      desgnation: "Vice President - Technology & Business Analytics, Kansas City Royals"
    },
    {
      img: "/career4.png",
      heading: "Brian Himstedt",
      para: "The platform helps us better understand our customers and provide more value in each of our interactions with them.",
      desgnation: "Vice President - Technology & Business Analytics, Kansas City Royals"
    }
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="bg-white special">
      <div className="w-full sm:w-[1440px] mx-auto">
        <div className="relative sm:pt-10  sm:pb-10 !text-center !w-[100%] ">
          <Slider {...workflowslider} className="sliderMaine ">
            {data.map((ele, key) => (
              <div className="p-4 sm:!w-[90%]" >
                <div className="rounded-[20px] shadow-2xl mt-8 sm:h-[20rem]">
                  <div className="sm: flex sm:flex-row flex-col relative sm:gap-[4rem]">
                    {/* <h2 className="text-h5 !font-bold">
                  {ele.name}
                </h2> */}
                    <h3 className="text-start mb-6 sm:mb-2 mt-10 sm:mt-8 text-[20px] text-heading sm:p-3rem">
                      <p className="mt-[30px] sm:text-[20px] text-[16px] text-[#727382]">
                        {loading ? (
                          <SkeletonLoader count={2} height={35} width="100%" />
                        ) : (
                          <>{ele.para}</>
                        )}
                      </p>

                      {loading ? (
                        <SkeletonLoader count={1} height={30} width="50%" />
                      ) : (
                        <p className="sm:text-[25px] text-[18px] font-semibold sm:mt-[5rem] ">
                          {ele.heading}
                        </p>
                      )}
              
                        <p className="sm:text-[18px] text-[18px] font-medium sm:mt-[5px] text-[#727382]">
                        {loading ? (
                        <SkeletonLoader count={1} height={30} width="50%" />
                      ) : (
                        <>
                          {ele.desgnation}
                          </>
                      )}

                        </p>
                      

                    </h3>
                    {loading ? (
                        <SkeletonLoader count={1} height={250} width={350} />
                      ) : (
                    <img src={ele.img} className="h-[16rem]" alt="" />
                      )}
                  </div>
                </div>
              </div>

            ))}


          </Slider>
        </div>
      </div>
    </div>
  )
}

export default ContactCarousel;