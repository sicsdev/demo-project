import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ComputerDesktopIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { elements } from "chart.js";
const List = ({ nav_links, className, setShow }) => {
  const data = [
    {
      name: "Team Collaboration",
      para: "A single point for internal and cross-company communication and collaboration.",
      bgColor: "#e8f1fe",
      borderColor: "#1d74f5",
    },
    {
      name: "Omnichannel Customer Collaboration",
      para: "Seamless interactions with your customers, regardless of how they connect with you.",
      bgColor: "#edf8f3",
      borderColor: "#4ebe8c",
    },
    {
      name: "Chat Engine",
      para: "Customized messaging experiences within your mobile or web app.",
      bgColor: "#feecee",
      borderColor: "#f5455c",
    },
    {
      name: "Marketplace",
      para: "A wide range of apps and native integrations that help your business communicate more effectively.",
      bgColor: "#f5e8f9",
      borderColor: "#9f22c7",
    },
  ];
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
                onClick={(e) => setShow(false)}
              >
                <div className="hover:bg-[#d3f4ff] p-2 rounded-lg flex gap-4 justify-between  items-start">
                  <div className="w-[100%]">
                    <h3 className="text-[#000000]  !font-semibold ] flex items-center gap-4 sm:gap-0 justify-between mb-3">
                      {element.name}
                    </h3>
                    <p className="">{element.para}</p>
                  </div>
                </div>
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
                    onClick={(e) => setShow(false)}
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
              backgroundImage:
                "url(/bg-red.png)",
                backgroundSize:"609px",
                backgroundRepeat:"no-repeat",
                backgroundPosition:"200% -350px"
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
