"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ComputerDesktopIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { elements } from "chart.js";
import { useRouter } from "next/navigation";

const List = ({ nav_links, className, setShow }) => {
  const { push } = useRouter();
  const data = [
    {
      name: "Chat Automation ",
      para: "Enhance your service capabilities",
      bgColor: "#e8f1fe",
      borderColor: "#1d74f5",
      slug: "#chat-automation",
    },
    {
      name: "Phone Automation ",
      para: "Revolutionize voice interactions",
      bgColor: "#edf8f3",
      borderColor: "#4ebe8c",
      slug: "#phone-automation",
    },
    {
      name: "Learning Centre",
      para: "Automate with intelligence",
      bgColor: "#feecee",
      borderColor: "#f5455c",
      slug: "#learning-center",
    },
    {
      name: "Workflow Builder",
      para: "Streamline your business processes      ",
      bgColor: "#f5e8f9",
      slug: "#workflow-builder",

      borderColor: "#9f22c7",
    },
  ];

  function scrollToIfNotVisible(element) {
    const rect = element.getBoundingClientRect();
    // Eventually an offset corresponding to the height of a fixed navbar for example.
    const offset = 500;
    let scroll = false;
    if (rect.top < offset) {
      scroll = true;
    }
    if (rect.top > window.innerHeight) {
      scroll = true;
    }
    if (scroll) {
      window.scrollTo({
        top: window.scrollY + rect.top - offset,
        behavior: "smooth",
        // duration:500
      });
    }
  }

  return (
    <>
      <div className={className}>
        <div
          className={`p-1  
            `}
          style={{ borderColor: "#e3e3e3" }}
        >
          <div className=" flex gap-4">
            <p>
              <ComputerDesktopIcon class="h-6 w-6 text-[#f5455c]" />
            </p>
            <h3 className=" uppercase text-sm text-[#6c727a] !font-semibold sm:pt-[4px]">
              Conversations{" "}
            </h3>
          </div>
          <div className={`mt-5 `}>
            {data.map((element, key) => (
              <div
                className={`cursor-pointer border-t-[${element.borderColor}] bg-[${element.bgColor}] pb-9`}
                key={key}
                style={{
                  backgroundColor: element.bgColor,
                  padding: "20px 24px 24px",
                  borderTop: `4px solid ${element.borderColor}`,
                }}
                onClick={() => {
                  setShow(true);
                  // setTimeout(() => {
                    // push(element.slug);
                  // }, 100);
                  scrollToIfNotVisible(document.querySelector(element.slug));
                }}
              >
      

               <a href={element.slug}>
               <div className="hover:bg-[#d3f4ff] p-2 rounded-lg flex gap-4 justify-between  items-start">
                  <div className="w-[100%]">
                    <h3 className="text-[#000000]  !font-semibold ] flex items-center gap-4 sm:gap-0 justify-between mb-3">
                      {element.name}
                    </h3>
                    <p className="">{element.para}</p>
                  </div>
                </div>
               </a>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2">
          {nav_links?.map((element, key) => (
            <div
              key={key}
              className={`p-1  ${key !== nav_links.length - 1 && ""}`}
              style={{ borderColor: "#e3e3e3" }}
            >
              <div className=" flex gap-4">
                <p>{element.icon}</p>
                <h3 className="text-[#6c727a] !font-semibold uppercase text-sm  sm:pt-[4px]">
                  {element.list_heading}
                </h3>
              </div>
              <ul className="mt-5">
                {element.data.map((element, key) => (
                  <li
                    className="cursor-pointer"
                    key={key}
                    onClick={(e) => {
                      setShow(false);
                      console.log("ele");
                    }}
                  >
                    <Link href={element.link}>
                      <div className="hover:bg-[#d3f4ff] p-2 rounded-lg flex gap-4 justify-between  items-start">
                        <div className="w-[100%]">
                          <h3 className="text-heading text-semibold flex items-center gap-4 sm:gap-0 justify-between">
                            {element.heading}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div
            className="mt-[] w-[100%] bg-[#f7f8fa] p-[48px]  col-span-2"
            style={{
              backgroundImage: "url(/bg-red.png)",
              backgroundSize: "609px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "200% -350px",
            }}
          >
            <div className="max-w-[420px] w-[100%]">
              <p className="text-[24px] leading-[2.5rem] sm:mb-6">
                The communications platform you can fully control and trust
              </p>
              <Link
                href={"/get-trial"}
                className={`text-sm text-[red] text-center m-auto lg:ml-[24px] cursor-pointer`}
              >
                <strong>Get Started — it’s free</strong>
              </Link>
            </div>
          </div>
        </div>
        <div className="ml-[-181px] ">
          <XMarkIcon
            class="h-6 w-6 text-[#686d76] sm:font-semibold"
            onClick={() => setShow(true)}
          />
        </div>
      </div>
    </>
  );
};

export default List;
