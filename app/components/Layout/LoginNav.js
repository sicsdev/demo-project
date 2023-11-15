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

const LoginNav = () => {
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
            : "sticky top-0 start-0 z-[999999] sm:z-50 w-full  sm:mt-[25px] bg-white border-gray-200"
          }`}
      >
        {!profile.email && <Banner />}
        {/* {profile.email && !profile.verified && <VerifyEmailBanner userEmail={profile.email} />} */}
        <div className="flex-wrap flex md:flex sm:flex lg:flex  items-center  h-[57px]">
          <div className="relative flex flex-row items-center w-full px-6 sm:px-12 md:px-12 lg:px-12 h-[57px]">
            <div className="relative h-8 mr-24">
              <Link href="/">
                <img
                  width='170px'
                  className="opacity-100 mt-0.5"
                  alt="logo.png"
                  src="/logo-b.png"
                />
              </Link>
            </div>
            {pathname == "/forgot-password" ? (
              ""
            ) : (
              <>
                <div
                  className={`hidden  sm:hidden md:hidden lg:flex flex-row gap-10 sm:gap-0 items-center ml-auto`}
                >
                  {pathname == "/lp/chat-bot" ||
                    pathname == "/lp/contact-center" ? (
                    ""
                  ) : profile.email ? (
                    <>
                      {" "}
                      <p className="text-black">{profile.email}</p>
                    </>
                  ) : (
                    <p className="text-black sm:py-[6px] sm:px-[12px]  ">
                      New to Deflection AI?
                    </p>
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
              </>
            )}
          </div>
        </div>

        {show === true && (
          <div className=" block sm:block md:block lg:hidden  w-full ">
            <Accordian setShow={setShow} nav_links={nav_links} />
          </div>
        )}
      </nav>
    </>
  );
};

export default LoginNav;
