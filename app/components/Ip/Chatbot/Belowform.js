"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";
import SkeletonLoader from "../../Skeleton/Skeleton";
import Link from "next/link";
import { Homeform } from "../../LayoutNew/Homeform";
import { CheckIcon } from "@heroicons/react/24/outline";
const Belowform = () => {
  const ref = useRef(null);
  const [showVideo, setShowvideo] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
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

  useEffect(() => {
    const checkPlayer = () => {
      const player = document.querySelector("lottie-player");
      if (player) {
        if (ref.current) {
          ref.current.addEventListener("complete", () => {
            player.seek(150);
            player.play();
          });
        }
      } else {
        setTimeout(checkPlayer, 100);
      }
    };

    checkPlayer();
  }, []);

  const List = [
    "Get custom demo of Deflection AI",
    "See Deflection AI with your content",
    "Schedule free consultation with specialist",
    "Evaluate and explore completely risk-free",
  ];

  return (
    <div className="relative py-8 sm:py-14 px-4 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 relative">
        <div>
          {loading ? (
            <div className="block !font-[700] md:ml-[40px] text-[33px] leading-[40px] px-3 md:px-6 md:!leading-[55px] text-left md:text-[50px] my-[1rem] md:my-8 relative text-[black]">
              <SkeletonLoader height={60} width={"90%"} />
            </div>
          ) : (
            <h2 className="block !font-[500] md:ml-[40px] text-[33px] sm:!mb-[55px] leading-[40px] px-3 md:px-6 md:!leading-[55px] text-left md:text-[56px] my-[1rem] md:my-8 relative text-[black]">
              Get a free demo of{" "}
              <span className="text-[#f5455c]">Deflection AI </span>
              tailored to your brand
            </h2>
          )}
          {loading ? (
            <div className="w-full md:ml-[56px] xl:w-[597px] text-blue-400 text-left font-[400]  px-3 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
              <SkeletonLoader height={60} width={"90%"} />
            </div>
          ) : (
            <div className="sm:ml-[65px]  sm:!mb-[55px]">
              <p className="w-full   xl:w-[597px] text-blue-400 text-left font-[400]  px-3 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[17px] md:leading-8 gap-2">
                Deflection AI will configure a beautiful customized bot with
                your basic content within 24 hours. Completely free and no
                commitment required.{" "}
              </p>
              <div className="mt-[15px] sm:mt-[40px]">
                {List.map((element) => (
                  <div className="text-sm text-[#6C727A] flex sm:flex-row gap-3 items-center my-2">
                    <CheckIcon class="h-[15px] w-[18px] text-[#53c08f]" />

                    {element}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
        <div className="relative">
          {loading ? (
            <div className="!m-auto mr-2 border-solid  relative w-[343px] sm:w-[477px] sm:h-[100%]  mt-5 sm:mt-0 h-[286px]  shrink-0 items-center justify-center leading-normal">
              <SkeletonLoader className="w-[400px] sm:w-[477px] sm:h-[383px]  h-[206px] " />
            </div>
          ) : (
            <>
            
              <div className=" block">
                <div className="!m-auto mr-2 ml-[10px] border-solid  relative w-full sm:h-[100%] mt-5 sm:mt-0 h-[583px] flex shrink-0 items-center justify-center  leading-normal">
                  <Homeform />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Belowform;