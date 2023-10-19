"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Card from "../Common/Card/Card";
import List from "./components/List";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Accordian from "../Accordian/Accordian";
import { useState } from "react";
import Link from "next/link";
import { nav_links } from "./data/navData";
import Banner from "./Banner";
import { getUserProfile } from "@/app/API/components/Sidebar";
import VerifyEmailBanner from "./VerifyEmailBanner";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [showmenu, setShowmenu] = useState(false);

  const [profile, setProfile] = useState({});
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        if (res.email) setProfile(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const isMobile = window.innerWidth <= 768;

  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  useEffect(() => {
    const handleScroll = () => {

      const footer = document.getElementById("footer");
      const footerPosition = footer?.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      const header = document.getElementById("header");
      const headerPosition = header?.getBoundingClientRect().top;
      if (footerPosition <= viewportHeight && footerPosition > 0) {
        setShouldHideHeader(true);
      } else {
        setShouldHideHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav
        id="header"
        className={` ${shouldHideHeader && pathname !== "/login"
          ? "hidden"
          : "sticky top-0 start-0 z-[999999] sm:z-50 w-full  shadow-xl bg-white border-gray-200"
          }`}
      >
        {!profile.email && <Banner />}
        {/* {profile.email && !profile.verified && <VerifyEmailBanner userEmail={profile.email} />} */}
        <div className="flex-wrap flex md:flex sm:flex lg:flex  items-center  h-[60px]">
          <div className="relative flex flex-row items-center w-full px-6 sm:px-12 md:px-12 lg:px-12 h-[60px]">
            <div className="relative w-28 h-8 mr-24">
              <Link href="/">
                <Image
                  fill={"true"}
                  className="bg-contain mx-auto w-full"
                  alt="logo.png"
                  src={"/logo-b.png"}
                />
              </Link>
            </div>
            {pathname == "/ip/chat-bot" || pathname == "/ip/contact-center" ? "" :



              <ul className="hidden relative md:flex text-black gap-8 flex-row">
                {nav_links.map((element, key) => (
                  <li
                    key={key}
                    className="menus_desk py-[15px] h-[60px] group relative cursor-pointer hover:border hover:border-b-white hover:border-r-0 hover:border-l-0 hover:border-t-0 "
                    onMouseEnter={(e) => {
                      setShowmenu(false);
                    }}
                  >
                    <a
                      href={element.link}
                      className="sm:py-[6px] sm:px-[12px]  hover:outline-[#2563eb] hover:outline-1 hover:rounded-[2px]	hover:outline  hover:outline-offset-2 "
                    >
                      {element.name}
                    </a>
                    {element.card.links.length > 0 && (
                      <Card
                        className={`animate-fadeIn w-[500px] hidden group-hover:block absolute top-[61px] bg-white ${showmenu ? "desk_headermenupopup" : ""
                          }`}
                      >
                        <List
                          className={"grid grid-cols-1 gap-8"}
                          nav_links={element.card.links}
                          setShow={setShowmenu}
                        />
                      </Card>
                    )}
                  </li>
                ))}
              </ul>
            }
            <div className="hidden md:flex flex-row gap-10 items-center ml-auto">
            
            {pathname == "/lp/chat-bot" || pathname == "/lp/contact-center" ?"":
              profile.email ? (
                <>
                  {" "}
                  <p className="text-black">{profile.email}</p>
                </>
              ) : (
                <Link href={"/login"}>
                  {" "}
                  <p className="text-black sm:py-[6px] sm:px-[12px]  hover:outline-[#2563eb] hover:outline-1 hover:rounded-[2px]	hover:outline  hover:outline-offset-2 ">
                    Sign In
                  </p>
                </Link>
              )}
              
              {profile.email ? (
                <Link href={"/dashboard"}>
                  {" "}
                  <button
                    type="button"
                    className="inline-block   px-6 pb-2 pt-2.5 text-xs rounded-lg font-medium uppercase leading-normal bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]  active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                  >
                    Dashboard
                  </button>{" "}
                </Link>
              ) : (
                <Link href={"/free-trial"}>
                  {" "}
                  <button
                    type="button"
                    className="inline-block   px-6 pb-2 pt-2.5 text-xs rounded-lg font-medium uppercase leading-normal bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]   active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                  >
                    Get Started
                  </button>{" "}
                </Link>
              )}
            </div>
            <div className="flex md:hidden flex-row relative ml-auto cursor-pointer">
              {show === false ? (
                <Bars4Icon
                  className="animate-fadeIn h-8 w-8 text-black"
                  onClick={(e) => {
                    setShow(true);
                  }}
                />
              ) : (
                <XMarkIcon
                  className="animate-fadeIn h-8 w-8 text-black"
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
