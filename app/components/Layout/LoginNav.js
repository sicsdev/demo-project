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
   
        <div className="flex-wrap flex md:flex sm:flex lg:flex  items-center mt-[60px] sm:mb-4 mb-[60px]  h-[57px]">
          <div className="relative flex flex-row items-center justify-center w-full px-6 sm:px-12 md:px-12 lg:px-12 h-[57px]">
            <div className="relative h-12 ">
              <Link href="/">
                <img
                  width='170px'
                  className="opacity-100 mt-0.5 w-[237px] sm:w-[224px]"
                  alt="logo.png"
                  src="/logo-b.png"
                />
              </Link>
            </div>
          </div>
        </div>

    </>
  );
};

export default LoginNav;
