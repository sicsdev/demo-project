"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";
import SkeletonLoader from "../Skeleton/Skeleton";
const NewAbovepage = () => {
  const [showVideo, setShowvideo] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <div className=" relative py-8 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 relative">


        <div>
          {loading ? (
            <div className="block !font-[700] md:ml-[40px] text-[33px] leading-[40px] px-3 md:px-6 md:!leading-[55px] text-left md:text-[50px] my-[1rem] md:my-8 relative text-[black]">
              <SkeletonLoader height={60} width={"90%"} />
            </div>
          ) : (
            <h2 className="block !font-[500] md:ml-[40px] text-[33px] leading-[40px] px-3 md:px-6 md:!leading-[55px] text-left md:text-[56px] my-[1rem] md:my-8 relative text-[black]">
              Intelligent Automation for Exceptional Customer Service{" "}
            </h2>
          )}
          {loading ? (
            <div className="w-full md:ml-[56px] xl:w-[597px] text-blue-400 text-left font-[400]  px-3 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              <SkeletonLoader height={60} width={"90%"} />
            </div>
          ) : (
            <p className="w-full md:ml-[56px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-3 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[17px] md:leading-8 gap-2">
              Elevate customer satisfaction and agent efficiency with Deflection AI's
              AI-driven solutions.
            </p>
          )}

          {loading ? (
            <div className="flex  px-3 sm:px-0 items-center my-8 sm:ml-[62px] cursor-pointer">
              <SkeletonLoader height={60} width={200} />
            </div>
          ) : (
            <div className="flex  px-3 sm:px-0 items-center mt-8 sm:mb-8 sm:ml-[62px] cursor-pointer">
              <button
                className={
                  "mb-4 sm:mb-0 py-[18px] px-2 w-full font-bold sm:w-[177px] focus:ring-yellow-300 text-white bg-[#f5455c] hover:bg-black dark:focus:ring-yellow-900 "
                }
                data-cal-link="tempoai/sales-call"
                data-cal-config='{"layout":"month_view"}'
              >
                Schedule Demo
              </button>{" "}
            </div>
          )}

          {/* {loading ? (
            <div className="flex  px-3 sm:px-0 items-center my-8 sm:ml-[62px] cursor-pointer">
              <SkeletonLoader height={60} width={200} />
            </div>
          ) : (
            <div
              className="flex  px-3 sm:px-0 items-center my-8 sm:ml-[62px] cursor-pointer"
              onClick={() => {
                document.body.classList.add("modal-open");

                setShowvideo(true);

              }}
            >
              <p>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M14.9 14.9166V14.9168V28.0832L14.9 28.0834C14.9003 28.2659 14.9494 28.445 15.0421 28.602C15.1349 28.759 15.2679 28.888 15.4274 28.9755C15.5868 29.0631 15.7668 29.1059 15.9484 29.0994C16.13 29.0929 16.3064 29.0373 16.4593 28.9386L16.4594 28.9386L26.634 22.3563C26.777 22.2641 26.8946 22.1373 26.976 21.9875C27.0574 21.8377 27.1 21.6697 27.1 21.4991C27.1 21.3284 27.0574 21.1605 26.976 21.0107C26.8946 20.8609 26.777 20.734 26.634 20.6418L16.4594 14.0614L16.4593 14.0614C16.3064 13.9627 16.13 13.9072 15.9484 13.9007C15.7668 13.8942 15.5868 13.9369 15.4274 14.0245C15.2679 14.112 15.1349 14.2411 15.0421 14.398C14.9494 14.555 14.9003 14.7341 14.9 14.9166ZM21 0.9C9.89932 0.9 0.9 9.89932 0.9 21C0.9 32.1007 9.89932 41.1 21 41.1C32.1007 41.1 41.1 32.1007 41.1 21C41.1 9.89932 32.1007 0.9 21 0.9ZM8.85705 8.85705C12.0776 5.63654 16.4455 3.82727 21 3.82727C25.5545 3.82727 29.9224 5.63654 33.143 8.85705C36.3635 12.0776 38.1727 16.4455 38.1727 21C38.1727 25.5545 36.3635 29.9224 33.143 33.143C29.9224 36.3635 25.5545 38.1727 21 38.1727C16.4455 38.1727 12.0776 36.3635 8.85705 33.143C5.63654 29.9224 3.82727 25.5545 3.82727 21C3.82727 16.4455 5.63654 12.0776 8.85705 8.85705Z"
                    fill="#fe9327"
                    stroke="#fe9327"
                    stroke-width="0.2"
                  ></path>
                </svg>
              </p>
              <p className="font-semibold ml-3 see">Schedule Demo today </p>
            </div>
          )} */}
          {/* {showVideo ? (
            <div
              className="fixed flex justify-center right-0 left-0  top-0 bg-[#ffffffd9] bottom-0 z-[999999] overflow-hidden"
              onClick={() => {
                document.body.classList.remove("modal-open");

                setShowvideo(false);
              }}
            >
              <div className="video_popup">
                <video
                  className="!static"
                  width="800"
                  height="400"
                  autoPlay={true}
                  controls
                >
                  <source
                    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="video_popup_cross">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            ""
          )} */}
        </div>
        <div>
          {loading ? (
            <div className="!m-auto mr-2 border-solid  relative w-[343px] sm:w-[477px] sm:h-[383px] mt-5 sm:mt-0 h-[286px]  shrink-0 items-center justify-center leading-normal">
              <SkeletonLoader className="w-[400px] sm:w-[477px] sm:h-[383px]  h-[206px] " />
            </div>
          ) : (
            <div className=" block">
              <div className="!m-auto mr-2 ml-[10px] border-solid  relative w-full sm:h-[383px] mt-5 sm:mt-0 h-[286px] flex shrink-0 items-center justify-center  leading-normal">
                <Image
                  src="/MicrosoftTeams-image.png"
                  className="w-full bg-contain object-contain mx-auto "
                  fill={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAbovepage;