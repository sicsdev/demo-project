"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../Layout/Footer";
import "../Accordian/Accordian.css";
import { getAllArticles } from "@/app/API/pages/Wpdata";
import "react-accessible-accordion/dist/fancy-example.css";
import { get } from "react-hook-form";

const Articleside = ({ children }) => {
  const [index, setIndex] = useState(null);
  const title = [
    {
      id: "1",
      name: "Books & Guides",
      href: "",
      color: "voilet",
    },
    {
      id: "2",
      name: "AI and Automation",
      href: "",
      color: "orange",
    },
    {
      id: "3",
      name: "Intercom for Enterprise",
      href: "",
      color: "voilet",
    },
    {
      id: "4",
      name: "Intercom on Product",
      href: "",
      color: "orange",
    },
  ];

  useEffect(() => {
    
    getAllArticles().then((res) => {
      console.log("ressc", );
      let params =res.data.posts.slug ;
    });
  }, []);
  const upperTitle = [
    {
      id: "1",
      name: "Customer Service",
      href: "",
      subheading: [],
      color: "sky",
    },
    {
      id: "2",
      name: "Customer Engagement",
      href: "",
      subheading: [],
      color: "bot",
    },
    {
      id: "3",
      name: "Product & Design",
      href: "",
      subheading: [],
      color: "neon",
    },
    {
      id: "4",
      name: "Engineering",
      href: "",
      subheading: [{ name: "Handling errors", href: "/docs#Handling-errors" }],
      color: "voilet",
    },
    {
      id: "5",
      name: "News & Updates",
      href: "",
      subheading: [{ name: "Handling errors", href: "/docs#Handling-errors" }],
      color: "orange",
    },
  ];

  const [show, setShow] = useState(false);
  return (
    <>
      <div className="block sm:flex md:flex lg:flex justify-start mt-5">
        <div className="w-full px-10 sm-w-[80%] md-w-[80%] lg-w-[80%] ">
          {children}
          <Footer/>
        </div>
        <div className="hidden sm:block md:block lg:block w-[40%]">
          <div class="mb-3   top-0  border-border rounded-sm border-t-0 border-l-0 min-h-screen ">
            <div
              style={{ borderLeft: "solid 1px" }}
              className="fixed top-30 mt-[70px]"
            >
              <p className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
                Table of contents
              </p>
              <div className=" ml-4  font-medium SideOptions">
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
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Articleside;
