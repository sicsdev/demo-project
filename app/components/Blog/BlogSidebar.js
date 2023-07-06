"use client";
import React, { useState } from "react";
import Link from "next/link";
import Footer from "../Layout/Footer";
import Card from "../Common/Card/Card";
import List from "../Layout/components/List";
import SidebarCard from "../Common/Card/SidebarCard";
import "../Accordian/Accordian.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";
const BlogSidebar = ({ children }) => {
  const [index, setIndex] = useState(null);
  const title = [
    {
      id: "1",
      name: "Books & Guides",
      href: "/docs#api-reference",
      color: "voilet",
    },
    {
      id: "2",
      name: "AI and Automation",
      href: "/docs#Authentication",
      color: "orange",
    },
    {
      id: "3",
      name: "Intercom for Enterprise",
      href: "/docs#Connected-Accounts",
      color: "voilet",
    },
    {
      id: "4",
      name: "Intercom on Product",
      href: "/docs#Errors",
      color: "orange",
    },
  ];
  const upperTitle = [
    {
      id: "1",
      name: "Customer Service",
      href: "/docs#api-reference",
      subheading: [],
      color: "sky",
    },
    {
      id: "2",
      name: "Customer Engagement",
      href: "/docs#Authentication",
      subheading: [],
      color: "bot",
    },
    {
      id: "3",
      name: "Product & Design",
      href: "/docs#Connected-Accounts",
      subheading: [],
      color: "neon",
    },
    {
      id: "4",
      name: "Engineering",
      href: "/docs#Errors",
      subheading: [{ name: "Handling errors", href: "/docs#Handling-errors" }],
      color: "voilet",
    },
    {
      id: "5",
      name: "News & Updates",
      href: "/docs#Errors",
      subheading: [{ name: "Handling errors", href: "/docs#Handling-errors" }],
      color: "orange",
    },
  ];

  const [show, setShow] = useState(false);
  return (
    <>
      <div className="block sm:flex md:flex lg:flex justify-start mt-5">
        <div className="hidden sm:block md:block lg:block w-[20%]">
        
              {/* <div className=" ml-4  font-medium SideOptions">
                {upperTitle.map((ele, key) => (
                  <div
                    className="group "
                    key={key}
                    onClick={(e) => {
                      setIndex(key);
                    }}
                  >
                    <Link href={ele.href}>
                      <p
                        key={key}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]"
                      >
                        {ele.name}
                      </p>

                      <SidebarCard
                        className={`animate-fadeIn h-[100vh] hidden group-hover:block absolute bg-${ele.color} `}
                      >
                        <p className="text-para text-white  ">
                          Featured in {ele.name}
                        </p>
                        <hr class="h-px my-4 bg-gray-200 border-b-0 dark:bg-gray-700 left-0" />

                        <img
                          className=" cursor-pointer hover:underline  text-1xl mb-6 tracking-wide sm:text-1xl md:text-1xl lg:text-1xl"
                          src="cardimg.jpg"
                        />
                        <h4>
                          What will the future of customer service look like? We
                          asked 400 CS professionals to find out
                        </h4>
                        <div className="flex flex-co justify-start items-center gap-0 js-show-on-scroll">
                          <div className="mr-2   mt-3 flex shrink-0 items-center justify-center rounded-full leading-normal ">
                            <img
                              width="24"
                              height="24"
                              src="https://static.intercomassets.com/avatars/2/square_128/0000002-1665139916.jpg"
                              alt=""
                              className="inline-flex items-center justify-center rounded-full bg-primary text-lg font-bold leading-6 text-white shadow-solid-2 shadow-white [&amp;:nth-child(n+2)]:hidden lg:[&amp;:nth-child(n+2)]:inline-flex h-6 w-6 z-4"
                            />
                          </div>

                          <div className="js-show-on-scroll mt-3">
                            <p className="text-100 bold color-neutral-100 text-black opacity-70">
                              BETH MCENTEE
                            </p>
                            <hr class="h-px my-4 bg-gray-200 border-b-0 dark:bg-gray-700 left-0" />
                          </div>
                        </div>
                        <p className="text-para text-white mt-3  ">
                          Editors Picks
                        </p>
                        <p>
                          Introducing Fin: Intercoms breakthrough AI chatbot,
                          built on GPT-4 Announcing Intercoms new AI features
                        </p>
                        <p className="underline text-white mt-3">
                          See All Aticles
                        </p>
                        <hr class="h-px my-4 bg-gray-200 border-b-0 dark:bg-gray-700 left-0" />
                      </SidebarCard>
                    </Link>
                  </div>
                ))}
              </div> */}
             
        </div>
      </div>
    </>
  );
};

export default BlogSidebar;
