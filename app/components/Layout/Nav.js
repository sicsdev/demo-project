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
import DemoAccountsBanner from "./DemoAccountsBanner";
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Nav = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [showmenu, setShowmenu] = useState(false);
  const [isHovered, setIsHovered] = useState({ signIn: false, dashboard: false });

  const [profile, setProfile] = useState({});
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        if (res.email) setProfile(res);
        console.log(res);
      })
      .catch((err) => {
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
        {profile?.enterprise?.billing_type == "demo" && <DemoAccountsBanner></DemoAccountsBanner>}

        {/* {profile.email && !profile.verified && <VerifyEmailBanner userEmail={profile.email} />} */}
        <div className="flex-wrap flex md:flex sm:flex lg:flex  items-center  h-[57px]">
          <div className="relative flex flex-row items-center w-full px-6 sm:px-12 md:px-12 lg:px-12 h-[57px]">
            <div className="relative h-8 mr-24 items-center flex">
              <Link href="/">
                <img
                  width='140px'
                  className="opacity-100 mt-0.5"
                  alt="logo.png"
                  src="/logo-b.png"
                />
              </Link>
            </div>
            {pathname == "/ip/chat-bot" || pathname == "/ip/contact-center" ? "" :



              <ul className="hidden  sm:hidden md:hidden lg:flex static text-black gap-8 flex-row ">
                {nav_links.map((element, key) => (
                  <li
                    key={key}
                    className="menus_desk static py-[15px] h-[60px] sm:h-[55px] group  cursor-pointer hover:border hover:border-b-white hover:border-r-0 hover:border-l-0 hover:border-t-0 "
                    onMouseEnter={(e) => {
                      setShowmenu(false);
                    }}
                  >
                    <a
                      href={element.link}
                      className="sm:py-[6px] sm:px-[12px]  hover:shadow-[0_2px_0_0_#f5455c] "
                    >
                      {element.name}
                    </a>

                    {element.card.links.length > 0 && (

                      <Card
                        className={`h-[auto] overflow-y-hidden left-0 w-[100%] !pt-[74px] !pl-[110px] animate-fadeIn  hidden group-hover:block absolute top-[55px] bg-white ${showmenu ? "desk_headermenupopup" : ""
                          }`}
                      >

                        <List
                          className={"grid grid-cols-1 sm:grid-cols-[30%,60%,2%] gap-8"}
                          nav_links={element.card.links}
                          setShow={setShowmenu}
                        />
                      </Card>
                    )}
                  </li>
                ))}
              </ul>
            }
  <div className="hidden lg:flex flex-row gap-10 items-center ml-auto">
      {pathname !== "/lp/chat-bot" && pathname !== "/lp/contact-center" ? (
        profile.email ? (
          <span className="text-black">{profile.email}</span>
        ) : (
          <Link href="/login">
            <p
              onMouseEnter={() => setIsHovered({ ...isHovered, signIn: true })}
              onMouseLeave={() => setIsHovered({ ...isHovered, signIn: false })}
              className="text-black border border-transparent hover:border-[#F5455C] rounded px-6 py-2 transition-all duration-150 flex items-center justify-center"
            >
              Contact sales
              {isHovered.signIn ? (
                <ArrowRightIcon className="ml-2 h-5 w-5"style={{strokeWidth:"3px"}} />
              ) : (
                <ChevronRightIcon className="ml-2 h-5 w-5" style={{strokeWidth:"3px"}} />
              )}
            </p>
          </Link>
        )
      ) : null}

      <Link href={profile.email ? "/dashboard" : "/free-trial"}>
        <p
          onMouseEnter={() => setIsHovered({ ...isHovered, getStarted: true })}
          onMouseLeave={() => setIsHovered({ ...isHovered, getStarted: false })}
          className="text-xs font-medium uppercase leading-normal bg-[#F5455C] hover:bg-black text-white rounded px-6 py-2 transition-all duration-150 flex items-center justify-center"
        >
          {profile.email ? 'Dashboard' : 'Start now'}
          {isHovered.getStarted ? (
       <ArrowRightIcon className="ml-2 h-5 w-5"style={{strokeWidth:"3px"}} />
       ) : (
         <ChevronRightIcon className="ml-2 h-5 w-5" style={{strokeWidth:"3px"}} />
          )}
        </p>
      </Link>
    </div>

            <div className="flex sm:flex md:flex lg:hidden flex-row relative ml-auto cursor-pointer">
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
          <div className=" block sm:block md:block lg:hidden w-full ">
            <Accordian setShow={setShow} nav_links={nav_links} />
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
