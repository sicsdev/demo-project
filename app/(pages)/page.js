"use client";

import Info from "../components/Info-Screen/Info";
import Trial from "../components/Trial/Trial";
import Benifits from "../components/Benifits/Benifits";
import Start from "../components/Get-Start/Start";
import Testimonial from "../components/Testimonial/Testimonial";
import DTC from "../components/DTC/DTC";
import Head from "next/head";
import SecondBan from "../components/Layout/SecondBan";
import Social from "../components/Social/Social";
import Faq from "../components/Faq/Faq";
import Newstandard from "../components/Newstandardpage/Newstandard";
import Brandpercentage from "../components/Brandpercentage/Brandpercentage";
import Iconanimation from "../components/Iconanimation/Iconanimation";
import Launch from "../components/Get-Start/Launch";
import Image from "next/image";
import Aipowered from "../components/solutions/Aipowered";
import Motioncards from "../components/Motioncards/page";
import Marketing from "../components/Marketing/Marketing";
import Homefold from "../components/Get-Start/Homefold";
import Panelcard from "../components/PanelCard/PanelCard";
import Panelcardnew from "../components/PanelCardNew/PanelCardNew";
import Middlebar from "../components/Info-Screen/Middlebar";
import { useEffect, useRef } from "react";
import { Router, useRouter } from "next/router";
import NewAbovepage from "../components/LayoutNew/NewAbovepage";
import Homeintegration from "../components/LayoutNew/Homeintegration";
import Homeinte from "../components/LayoutNew/Homeinte";
import Whyhome from "../components/LayoutNew/Whyhome";
import Reach from "../components/LayoutNew/Reach";
import Communication from "../components/LayoutNew/Communication";
import Bottombutton from "../components/LayoutNew/Bottombutton";
import { Homeform } from "../components/LayoutNew/Homeform";
import ContactBanner2 from "../components/Ip/Chatbot/Contact/ContactBanner2";
import HomeComponent from "../components/Home/HomeComponent";

export default function Home() {
  const reachData = [
    {
      reach: "99.999%        ",
      name: "Higher CSATs   ",
      para: "Companies using our platform can anticipate higher customer satisfaction scores, contributing to overall customer loyalty.   ",
      link_title: "Leverage your data",
    },
    {
      reach: "99.999%        ",
      name: "More Deflections ",
      para: "Experience a significant reduction in the number of tickets that require human intervention, optimizing your operations.    ",
      link_title: "Leverage your data",
    },
    {
      reach: "55++",

      name: "24/7/365 Uptime",
      para: "Benefit from round-the-clock system availability, ensuring uninterrupted service for your customers.   ",
      link_title: "Leverage your data",
    },
  ];
  const ref = useRef(null);
  const handleClickscroll = () => {
    console.log("clicked")
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <main className="">
        <Head></Head>
        <NewAbovepage />
        <Homeinte />
        <Communication />
        <Homeintegration />
        <Reach handleClickscroll={handleClickscroll} data={reachData}/>
        <Panelcardnew />
        <Middlebar />
        <Homeform reff={ref} />
        <HomeComponent />
      </main>
    </>
  );
}
