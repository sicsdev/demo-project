"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const Featurescards = () => {
  const [activeTab, setActiveTab] = useState(false);

  const handlerFeaturecard = () => {
    setActiveTab(!activeTab);
  };

  return (
    <div className="bg-[white] pt-6 sm:pt-12 sm:pb-8 px-2">
      <h2 class="text-center pb-4 text-2xl md:text-h2 lg:text-h2 sm:text-h2 sm:leading-8 my-2 font-bold text-black">
        Explore more powerful monday.com products
      </h2>
      <div class="hidden sm:block sm:mt-6 mx-auto max-w-[80%] sm:max-w-[70%] md:max-w-[70%] lg:max-w-[70%] py-4 sm:py-10">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/3 px-2 mb-4">
            <div class="bg-white rounded-lg shadow-lg p-4 featurecards">
              <div className="relative w-[170px] h-[54px] gap-2 rounded-lg">
                <Image
                  fill={"true"}
                  className="object-contain mx-auto rounded-lg"
                  alt="logo.png"
                  src="/featurescards/1.png"
                />
              </div>
              <p className="text-[#9CA3AF] sm:max-w-[70%] text-sm pt-1 pb-6">
                For professionals and teams managing tasks & workflows
              </p>
              <p className="text-md">
                Manage tasks and workflows to fuel team collaboration and
                productivity at scale.
              </p>
              <div className="text-center">
                <Link href={""}>
                  {" "}
                  <button
                    type="button"
                    className="w-[90%] mt-6 m-auto bg-white px-6 pb-2 pt-2.5 text-xs rounded-2xl font-medium leading-normal text-heading shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                  >
                    Get Started →
                    <span className="underline cursor-pointer text-white"></span>
                  </button>{" "}
                </Link>
              </div>
              <div className="text-center">
                <Link href={""}>
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
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <div class="bg-white rounded-lg shadow-lg p-4 featurecards">
              <div className="relative w-[170px] h-[54px] gap-2 rounded-lg">
                <Image
                  fill={"true"}
                  className="object-contain mx-auto rounded-lg"
                  alt="logo.png"
                  src="/featurescards/2.png"
                />
              </div>
              <p className="text-[#9CA3AF] sm:max-w-[70%] text-sm pt-1 pb-6">
                For professionals and teams managing tasks & workflows
              </p>
              <p className="text-md">
                Manage tasks and workflows to fuel team collaboration and
                productivity at scale.
              </p>
              <div className="text-center">
                <Link href={""}>
                  {" "}
                  <button
                    type="button"
                    className="w-[90%] mt-6 m-auto bg-white px-6 pb-2 pt-2.5 text-xs rounded-2xl font-medium leading-normal text-heading shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                  >
                    Get Started →
                    <span className="underline cursor-pointer text-white"></span>
                  </button>{" "}
                </Link>
              </div>
              <div className="text-center">
                <Link href={""}>
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
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <div class="bg-white rounded-lg shadow-lg p-4 featurecards">
              <div className="relative w-[170px] h-[54px] gap-2 rounded-lg">
                <Image
                  fill={"true"}
                  className="object-contain mx-auto rounded-lg"
                  alt="logo.png"
                  src="/featurescards/3.png"
                />
              </div>
              <p className="text-[#9CA3AF] sm:max-w-[70%] text-sm pt-1 pb-6">
                For professionals and teams managing tasks & workflows
              </p>
              <p className="text-md">
                Manage tasks and workflows to fuel team collaboration and
                productivity at scale.
              </p>
              <div className="text-center">
                <Link href={""}>
                  {" "}
                  <button
                    type="button"
                    className="w-[90%] mt-6 m-auto bg-white px-6 pb-2 pt-2.5 text-xs rounded-2xl font-medium leading-normal text-heading shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                  >
                    Get Started →
                    <span className="underline cursor-pointer text-white"></span>
                  </button>{" "}
                </Link>
              </div>
              <div className="text-center">
                <Link href={""}>
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
          </div>
        </div>
      </div>

      <div class="block sm:hidden sm:mt-6 mx-auto max-w-[80%] sm:max-w-[70%] md:max-w-[70%] lg:max-w-[70%] py-4 sm:py-10">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/3 px-2 mb-4">
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
                          <div className="relative w-[90%] h-[40px] gap-2 rounded-lg">
                            <Image
                              fill={"true"}
                              className="object-contain mx-auto rounded-lg"
                              alt="logo.png"
                              src="/featurescards/4.png"
                            />
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="p-0">
                      <p className="text-[#9CA3AF] sm:max-w-[70%] text-sm pt-4 pb-6">
                        For professionals and teams managing tasks & workflows
                      </p>
                      <p className="text-md">
                        Manage tasks and workflows to fuel team collaboration
                        and productivity at scale.
                      </p>
                      <div className="text-left w-[60%]">
                        <Link href={""}>
                          {" "}
                          <button
                            type="button"
                            className="w-[100%] mt-4 m-auto bg-white px-6 pb-2 pt-2.5 text-sm rounded-2xl font-medium leading-normal text-heading "
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
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <div class="bg-white rounded-md shadow-lg p-4">
              <div onClick={handlerFeaturecard2}>
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
                          <div className="relative w-[90%] h-[40px] gap-2 rounded-lg">
                            <Image
                              fill={"true"}
                              className="object-contain mx-auto rounded-lg"
                              alt="logo.png"
                              src="/featurescards/5.png"
                            />
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="p-0">
                      <p className="text-[#9CA3AF] sm:max-w-[70%] text-sm pt-4 pb-6">
                        For professionals and teams managing tasks & workflows
                      </p>
                      <p className="text-md">
                        Manage tasks and workflows to fuel team collaboration
                        and productivity at scale.
                      </p>
                      <div className="text-left w-[60%]">
                        <Link href={""}>
                          {" "}
                          <button
                            type="button"
                            className="w-[100%] mt-4 m-auto bg-white px-6 pb-2 pt-2.5 text-sm rounded-2xl font-medium leading-normal text-heading "
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
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <div class="bg-white rounded-md shadow-lg p-4">
              <div onClick={handlerFeaturecard3}>
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
                          <div className="relative w-[90%] h-[40px] gap-2 rounded-lg">
                            <Image
                              fill={"true"}
                              className="object-contain mx-auto rounded-lg"
                              alt="logo.png"
                              src="/featurescards/6.png"
                            />
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="p-0">
                      <p className="text-[#9CA3AF] sm:max-w-[70%] text-sm pt-4 pb-6">
                        For professionals and teams managing tasks & workflows
                      </p>
                      <p className="text-md">
                        Manage tasks and workflows to fuel team collaboration
                        and productivity at scale.
                      </p>
                      <div className="text-left w-[60%]">
                        <Link href={""}>
                          {" "}
                          <button
                            type="button"
                            className="w-[100%] mt-4 m-auto bg-white px-6 pb-2 pt-2.5 text-sm rounded-2xl font-medium leading-normal text-heading "
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featurescards;
