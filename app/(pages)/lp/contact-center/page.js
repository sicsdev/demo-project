"use client";
import React, { useRef } from "react";
import Homeinte from "@/app/components/LayoutNew/Homeinte";
import Reach from "@/app/components/LayoutNew/Reach";
import Newnavbar from "@/app/components/Ip/Chatbot/Newnavbar";
import Newfooter from "@/app/components/Layout/Newfooter ";
import UpdatedFooter from "@/app/components/Layout/UpdatedFooter";
import Abovepage from "@/app/components/Ip/ContactCenter/Abovepage";
import HeadIp from "@/app/components/Ip/ContactCenter/HeadIp";
import ServiceIp from "@/app/components/Ip/ContactCenter/ServiceIp";
import Panelcardnew from "@/app/components/PanelCardNew/PanelCardNew";
import Exceptions from "@/app/components/LayoutNew/Exceptions";
import Homeintegration from "@/app/components/LayoutNew/Homeintegration";
import HomeComponent from "@/app/components/Home/HomeComponent";
import Belowform from "@/app/components/Ip/Chatbot/Belowform";
import AutoTabsComp from "@/app/components/LayoutNew/AutoTabsComp";
import Link from "next/link";

const Chatbot = () => {
  const tabData = [
    {
      id: 1,
      name: "Stefan Teubner",
      content: "Save More with Every Resolution",
      title: "Cost-Efficient",
      description: "Deflection AI's straightforward pricing means you only pay for the resolutions you need, allowing for complete scalability aligned with your customer service demand.",
      side_heading: "Pay Per Resolution",
      side_heading_m: <p>  Pay Per  <br />Resolution</p>,

      "points": ["Transparent, per-resolution pricing", "Significant cost savings", <Link href="/pricing">Learn more about pricing</Link>]

    },
    {
      id: 2,
      name: "Niki Papazoglakis",
      content: "Tailored Onboarding Experience",
      title: "Personalized Setup",
      description: "Our dedicated sales and implementation teams ensure your setup is seamless, efficient, and tailored to your business needs.",
      side_heading: "White-Glove Onboarding",
      side_heading_m: <p> White-Glove   <br />Onboarding</p>,

      "points": ['Expert implementation support', 'Customized setup and integration', 'Dedicated team for seamless transition']
    },
    {
      id: 3,
      name: "Oliver Jägle",
      content: "Speak To Your Customers, Anywhere",
      title: "Universal Communication",
      description: "Our platform offers support in all languages across every channel, ensuring your business is always connected and responsive.",
      side_heading: "Multi-Channel Synergy",
      side_heading_m: <p>Multi-Channel <br />Synergy</p>,

      "points": ['Multilingual support', '24/7 availability across all channels', 'Global reach for seamless communication']
    },
    {
      id: 4,
      title: "Trustworthy and Secure",
      name: "Niki Papazoglakis",
      content: "Upholding the Highest Standards",
      description: "With robust compliance measures and advanced security protocols, we provide a safe and secure environment for all your interactions.",
      side_heading: "Compliance and Security",
      side_heading_m: <p>Compliance and <br />Security</p>,

      "points": ['Adherence to strict compliance standards', 'Advanced security measures', 'Safe and secure data handling',]
    }
  ];
  const ref = useRef(null);
  const handleClickScroll = () => {
    console.log("clicked");
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <>
      <Newnavbar />
      <Abovepage />
      <div className="sm:mt-[172px]">
        <Homeinte />
      </div>
      <HeadIp />
      <ServiceIp />
      <Exceptions />
      <div className="static sm:absolute right-0 left-0">
        <AutoTabsComp tabData={tabData} handleClickScroll={handleClickScroll} />
      </div>
      <div className="hidden sm:block sm:mt-[35rem]">
      </div>
      <Belowform />
      <HomeComponent />
      {/* <UpdatedFooter /> */}
    </>
  );
};

export default Chatbot;