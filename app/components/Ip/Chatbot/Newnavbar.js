"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Card from "../../Common/Card/Card";
import List from "../../Layout/components/List";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Accordian from "../../Accordian/Accordian";
import { useState } from "react";
import Link from "next/link";
import { nav_links } from "../../Layout/data/navData";
import Banner from "../../Layout/Banner";
import { getUserProfile } from "@/app/API/components/Sidebar";
import VerifyEmailBanner from "../../Layout/VerifyEmailBanner";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Newnavbar = () => {
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
  if (pathname == "/sitemap.html") {
    return false;
  }
  return (
    <>
      <nav
        id="header"
        className={` ${
          shouldHideHeader && pathname !== "/login"
            ? "hidden"
            : "sticky top-0 start-0 z-[999999]  sm:z-50 w-full   bg-white border-gray-200"
        }`}
      >
        {/* {profile.email && !profile.verified && <VerifyEmailBanner userEmail={profile.email} />} */}
        <div className="flex-wrap   flex md:flex sm:flex lg:flex  items-center  h-[60px]">
          <div className="relative    flex flex-row items-center w-full px-6 sm:px-[0px\] h-[60px]">
            <div className="relative h-8 mr-24 items-center flex sm:mt-[20px]">
              <Link href="/">
                <img
                  width="140px"
                  className="opacity-100 mt-0.5"
                  alt="logo.png"
                  src="/logo-b.png"
                />
              </Link>
            </div>

            <div className="hidden md:flex flex-row gap-[0.5rem] items-center ml-auto">
              {profile.email ? (
             <div className="mt-[20px] sm:mt-[20px] flex gap-5 lg:block flex-col items-start">
             <Link
               href={`/dashboard`}
               className={`rounded-[4px] text-[14px] text-white bg-[red] hover:bg-black hover:text-white text-center px-6 py-2 text-lg font-semibold leading-7 no-underline transition duration-300`}
             >
              Dashboard
             </Link>
           </div>
              ) : (
                <div className="mt-[20px] sm:mt-[20px] flex gap-5 lg:block flex-col items-start">
                  <Link
                    href={`/checkout`}
                  >
      <button
                    type="button"
                    className="inline-block  rounded-sm  px-6 pb-2 pt-2.5 text-xs  font-medium uppercase leading-normal bg-[#F5455C] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]   active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                  >
                    Get Started
                  </button>{" "}                  </Link>
                </div>
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
          <div className="block md:hidden lg:hidden sm:hidden w-full pb-[20px] ">
            <Accordian
              setShow={setShow}
              nav_links={nav_links}
              profile={profile}
            />
          </div>
        )}
      </nav>
    </>
  );
};

export default Newnavbar;