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

const LoginNav = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [showmenu, setShowmenu] = useState(false);

  const [profile, setProfile] = useState({});
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        if (res.email) setProfile(res);
        console.log(res, 'profile');
      })
      .catch((err) => {
        // console.log(err);
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
        className={`${shouldHideHeader && pathname !== "/login"
            ? "hidden"
            : "sticky top-0 start-0 z-[999999] sm:z-50 w-full sm:mt-[25px] bg-white border-gray-200"
          }`}
      >
        {/* BANNERS */}
        {!profile.email && <Banner />}
        {profile?.enterprise?.billing_type === "demo" && (
          <DemoAccountsBanner></DemoAccountsBanner>
        )}

        {/* {profile.email && !profile.verified && <VerifyEmailBanner userEmail={profile.email} />} */}
        <div className="flex-wrap flex md:flex sm:flex lg:flex items-center h-[57px]">
          <div className="relative flex flex-row items-center w-full px-6 sm:px-12 md:px-12 lg:px-12 h-[57px]">
            <div className="relative h-8 mr-24">
              <Link href="/">
                <img
                  width="170px"
                  className="opacity-100 mt-0.5 w-[237px] sm:w-[224px]"
                  alt="logo.png"
                  src="/logo-b.png"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>


    </>
  );
};

export default LoginNav;
