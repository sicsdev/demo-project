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
 

  const [show, setShow] = useState(false);
  return (
    <>
      <div className="block sm:flex md:flex lg:flex justify-start mt-5">
        <div className="hidden sm:block md:block lg:block w-[20%]">
        
             
        </div>
      </div>
    </>
  );
};

export default BlogSidebar;
