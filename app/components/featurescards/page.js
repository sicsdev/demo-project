"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { nav_links } from "../Layout/data/navData";
const Featurescards = () => {
  const [activeTab, setActiveTab] = useState(false);

  const handlerFeaturecard = () => {
    setActiveTab(!activeTab);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[white] pt-6 sm:pt-12 sm:pb-8 px-2">
      <h2 class="text-center pb-4 text-2xl md:text-h2 lg:text-h2 sm:text-h2 sm:leading-8 my-2 font-bold text-black">
        {loading ? (
          <SkeletonLoader height={50} width={"70%"} />
        ) : (
          "Explore more powerful monday.com products"
        )}
      </h2>
      <div class="hidden sm:block sm:mt-6 mx-auto max-w-[80%] sm:max-w-[70%] md:max-w-[70%] lg:max-w-[70%] py-4 sm:py-10">
        <div class="flex flex-wrap -mx-2">
          {nav_links[0].card.links[0].data.map((ele) => (
            <div class="w-full md:w-1/3 px-2 mb-4">
              {loading ? (
                <SkeletonLoader height={350} width={"100%"} />
              ) : (
                <div class="bg-white rounded-lg shadow-lg p-4 featurecards">
                  <div className="m-auto relative w-[170px] h-[54px] gap-2 rounded-lg">
                    <Image
                      fill={"true"}
                      className="object-contain mx-auto rounded-lg"
                      alt="logo.png"
                      src={ele.icon}
                    />
                  </div>
                  <h1 className="font-bold text-base text-center my-3">
                    {ele["heading"]}
                  </h1>
                  {/* <p className="text-[#9CA3AF] text-center  mx-auto sm:max-w-[70%] text-sm pt-1 pb-6">
                {ele["para"]}
                </p> */}
                  <p className="text-md text-left">{ele["para"]}</p>
                  <div className="text-center">
                    <Link href="/checkout">
                      {" "}
                      <button
                        type="button"
                        className="w-[90%] mt-6 m-auto  px-6 pb-2 pt-2.5 text-xs rounded-2xl bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]  "
                      >
                        Start Now →
                        <span className="underline cursor-pointer text-white"></span>
                      </button>{" "}
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link href={ele.link}>
                      {" "}
                      <button
                        type="button"
                        className="w-[90%] mt-6 mb-4 m-auto bg-white px-6 pb-2 pt-2.5 text-xs rounded-2xl font-medium leading-normal text-heading "
                      >
                        Learn more →
                        <span className="underline cursor-pointer text-white"></span>
                      </button>{" "}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div class="block sm:hidden sm:mt-6 mx-auto max-w-[80%] sm:max-w-[70%] md:max-w-[70%] lg:max-w-[70%] py-4 sm:py-10">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/3 px-2 mb-4">
            {nav_links[0].card.links[0].data.map((ele) => (
              <div class="bg-white rounded-md shadow-lg p-4">
                <div onClick={handlerFeaturecard}>
                  <Accordion allowZeroExpanded className="border-0">
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton className="p-0 bg-white">
                          <div
                            className={
                              activeTab
                                ? "relative featurecards_mobile"
                                : "relative featurecards_mobile2"
                            }
                          >
                            <div className="flex">
                            <div className="relative w-[40%] h-[40px] gap-2 rounded-lg">
                              <Image
                                fill={"true"}
                                className="object-contain mx-auto rounded-lg"
                                alt="logo.png"
                                src={ele.icon}
                              />
                            </div>
                          <p className="font-semibold">  {ele?.heading}{" "}</p>
                          </div>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="p-0">
                        <p className="text-md text-left my-2 pt-8">{ele.para}</p>
                        <div className="text-center w-[100%]">
                          <Link href={`${ele.link}`} className="text-center">
                            {" "}
                            <button
                              type="button"
                              className="flex gap-8 items-center p-2 justify-center text-primary font-bold left-0 bottom-[-11px] "
                            >
                              Learn more →
                              <span className="underline cursor-pointer text-white"></span>
                            </button>{" "}
                          </Link>
                        </div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featurescards;
