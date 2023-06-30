"use client";
import Image from "next/image";
import React from "react";
import Card from "../Common/Card/Card";
import List from "./components/List";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Accordian from "../Accordian/Accordian";
import { useState } from "react";
import Link from "next/link";
import { nav_links } from "./data/navData";
import Banner from "./Banner";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  return (
    <>
      <nav className="sticky top-0 start-0 z-[999999] sm:z-50 w-full  shadow-xl bg-heading border-gray-200 ">
        <Banner />

        <div className="flex-wrap flex md:flex sm:flex lg:flex  items-center  h-[60px]">
          <div className="relative flex flex-row items-center w-full px-6 sm:px-12 md:px-12 lg:px-12 h-[60px]">
            <div className="relative w-28 h-8 mr-24">
              <Link href="/">
                <Image
                  fill={"true"}
                  className="bg-contain mx-auto w-full"
                  alt="logo.png"
                  src={"/logo.png"}
                />
              </Link>
            </div>
            <ul className="hidden relative md:flex text-white gap-8 flex-row">
              {nav_links.map((element, key) => (
                <li
                  key={key}
                  className="py-[15px] h-[60px] group relative cursor-pointer hover:border hover:border-b-white hover:border-r-0 hover:border-l-0 hover:border-t-0 "
                >
                  <Link href={element.link}>{element.name}</Link>
                  {element.card.links.length > 0 && (
                    <Card
                      className={`animate-fadeIn w-[800px] hidden ${
                        hide === true && "group-hover:block"
                      } absolute top-[61px] bg-white`}
                      onClick={(e) => {
                        setHide(false);
                        setTimeout(() => {
                          setHide(true);
                        }, 100);
                      }}
                    >
                      <List
                        className={"grid grid-cols-2 gap-8"}
                        nav_links={element.card.links}
                      />
                    </Card>
                  )}
                </li>
              ))}
            </ul>
            <div className="hidden md:flex flex-row gap-10 items-center ml-auto">
              <Link href={"/login"}>
                {" "}
                <p className="text-white">Sign In</p>
              </Link>
              <Link href={"/free-trial"}>
                {" "}
                <button
                  type="button"
                  className="inline-block  bg-white px-6 pb-2 pt-2.5 text-xs rounded-2xl font-medium uppercase leading-normal text-heading shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                >
                  Get Started
                </button>{" "}
              </Link>
            </div>
            <div className="flex md:hidden flex-row relative ml-auto cursor-pointer">
              {show === false ? (
                <Bars4Icon
                  className="animate-fadeIn h-8 w-8 text-white"
                  onClick={(e) => {
                    setShow(true);
                  }}
                />
              ) : (
                <XMarkIcon
                  className="animate-fadeIn h-8 w-8 text-white"
                  onClick={(e) => {
                    setShow(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {show === true && (
          <div className="block md:hidden lg:hidden sm:hidden w-full ">
            <Accordian setShow={setShow} nav_links={nav_links} />
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
