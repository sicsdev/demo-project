"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Workflowslider = () => {
  var workflowslider = {
    arrows: true,

    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: false,
    centerPadding: "11%",
    responsive: [
      {
        breakpoint: 1024,
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
  return (
    <>
      <div className="bg-[white] pt-6 pb-8 workflowslider">
        <div className="sm:mb-[-30px] sm:ml-[18px]  mb-[-42px]">
        <h4 class="sm:text-left sm:px-0 px-6 text-xl sm:pb-1 sm:text-2xl md:text-md  font-semibold text-black">
          TEMPO IN ACTION
        </h4>
        <h2 class=" px-6 sm:px-0 pb-4 sm:w-[50%]  text-left">
          Workflows for any project, big or small
        </h2>
        </div>

        {/* slider */}
        <Slider {...workflowslider}>
          <div className="p-4">
            <div
              className="rounded-lg mt-8 "
              style={{ boxShadow: "rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px" }}
            >
              <div
                className="h-[2.8rem] rounded-t-lg"
                style={{ background: "rgb(255, 116, 82)" }}
              ></div>
              <div className="relative p-4">
                <span className="absolute top-[-17px] p-2 bg-white rounded-lg">
                  <img className="w-[30px]" src="/workflowslider/1.png" />
                </span>
                <h3 className="text-start mb-6 sm:mb-2 mt-10 sm:mt-8 text-xl font-semibold text-heading">
                  Project management
                </h3>
                <p className="text-md">
                  Keep tasks in order, deadlines on track, and team members
                  aligned with Trello.
                </p>
            </div>
            </div>
          </div>
          <div className="p-4">
            <div
              className="rounded-lg mt-8"
              style={{ boxShadow: "rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px" }}
            >
              <div
                className="h-[2.8rem] rounded-t-lg"
                style={{ background: "rgb(38, 132, 255)" }}
              ></div>
              <div className="relative p-4">
                <span className="absolute top-[-17px] p-2 bg-white rounded-lg">
                  <img className="w-[30px]" src="/workflowslider/2.png" />
                </span>
                <h3 className="text-start mb-6 sm:mb-2 mt-10 sm:mt-8 text-xl font-semibold text-heading">
                  Project management
                </h3>
                <p className="text-md">
                  Keep tasks in order, deadlines on track, and team members
                  aligned with Trello.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div
              className="rounded-lg mt-8"
              style={{ boxShadow: "rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px" }}
            >
              <div
                className="h-[2.8rem] rounded-t-lg"
                style={{ background: "rgb(87, 217, 163)" }}
              ></div>
              <div className="relative p-4">
                <span className="absolute top-[-17px] p-2 bg-white rounded-lg">
                  <img className="w-[30px]" src="/workflowslider/3.png" />
                </span>
                <h3 className="text-start mb-6 sm:mb-2 mt-10 sm:mt-8 text-xl font-semibold text-heading">
                  Project management
                </h3>
                <p className="text-md">
                  Keep tasks in order, deadlines on track, and team members
                  aligned with Trello.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div
              className="rounded-lg mt-8"
              style={{ boxShadow: "rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px" }}
            >
              <div
                className="h-[2.8rem] rounded-t-lg"
                style={{ background: "rgb(255, 196, 0)" }}
              ></div>
              <div className="relative p-4">
                <span className="absolute top-[-17px] p-2 bg-white rounded-lg">
                  <img className="w-[30px]" src="/workflowslider/4.png" />
                </span>
                <h3 className="text-start mb-6 sm:mb-2 mt-10 sm:mt-8 text-xl font-semibold text-heading">
                  Project management
                </h3>
                <p className="text-md">
                  Keep tasks in order, deadlines on track, and team members
                  aligned with Trello.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div
              className="rounded-lg mt-8"
              style={{ boxShadow: "rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px" }}
            >
              <div
                className="h-[2.8rem] rounded-t-lg"
                style={{ background: "rgb(0, 199, 229)" }}
              ></div>
              <div className="relative p-4">
                <span className="absolute top-[-17px] p-2 bg-white rounded-lg">
                  <img className="w-[30px]" src="/workflowslider/5.svg" />
                </span>
                <h3 className="text-start mb-6 sm:mb-2 mt-10 sm:mt-8 text-xl font-semibold text-heading">
                  Project management
                </h3>
                <p className="text-md">
                  Keep tasks in order, deadlines on track, and team members
                  aligned with Trello.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div
              className="rounded-lg mt-8"
              style={{ boxShadow: "rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px" }}
            >
              <div
                className="h-[2.8rem] rounded-t-lg"
                style={{ background: "rgb(249, 156, 219)" }}
              ></div>
              <div className="relative p-4">
                <span className="absolute top-[-17px] p-2 bg-white rounded-lg">
                  <img className="w-[30px]" src="/workflowslider/6.png" />
                </span>
                <h3 className="text-start mb-6 sm:mb-2 mt-10 sm:mt-8 text-xl font-semibold text-heading">
                  Project management
                </h3>
                <p className="text-md">
                  Keep tasks in order, deadlines on track, and team members
                  aligned with Trello.
                </p>
              </div>
            </div>
          </div>
        </Slider>
        {/* slider */}
      </div>
    </>
  );
};

export default Workflowslider;
