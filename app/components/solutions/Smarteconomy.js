"use client";
import React from "react";
import './accordian.css'

import { useState, useEffect } from "react";
import Card from "../Common/Card/Card";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
const Smarteconomy = () => {
  const [hide, setHide] = useState({
    first: false,
    second: false,
    third: false,
  });

  // for tabs
  const tabs = [
    {
      id: "1",
      title: "24/7 Email support",
      content_video: "/tabs/smartinbox2.gif",
      p: "Whether it's day or night, no email remains unanswered. Smart Inbox provides 24/7 support to handle all your email tickets promptly, guaranteeing a response time of less than 5 minutes.",
    },
    {
      id: "2",
      title: "Intelligent Automation",
      content_video: "/tabs/Analytics-Gif.gif",
      p: "Utilize the cutting-edge AI models, ChatGPT and GPT-4, to transform your operations. Smart Inbox's intelligent automation reduces time on task, and continually learns from your data for enhanced performance.",
    },

    {
      id: "3",
      title: "Seamless Integration",
      content_video: "/tabs/three.gif",
      p: "Experience the ease of one-click integration. Connect your payments, CRM, inventory management, and backend systems to Smart Inbox in an instant.",
    },
    {
      id: "4",
      title: "Transparent Fair Billing",
      content_video: "/tabs/Billing-GIF.gif",
      p: "Experience clarity and simplicity in billing. With Smart Inbox, you're charged only 50 cents per email response. You only pay for what you use - no hidden fees, no fine print.",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [timer, setTimer] = useState(11);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setTimer(11);
  };

  return (
    <div className="bg-white">
      <div
        className=" mx-auto max-w-[90%] sm:max-w-[90%]   py-10 "
        onClick={() =>
          setHide({ first: false, second: false, third: false, fourth: false })
        }
      >
          <div className="sm:max-w-[50%] w-full">
          <h1 class="text-left text-2xl tracking-wide text-heading sm:text-3xl md:text-4xl lg:text-4xl mb-2 font-bold ">
            Revolutionize Your Customer Service with Smart Inbox{" "}
          </h1>
          <p className="sm:mt-4 sm:mb-3 mb-3 text-justify">
            Breathe life into your email management system and never let an
            inbox message go unanswered again. With Smart Inbox, your responses
            are proactive, swift, and aligned with your company policies,
            maintaining SLAs under 5 minutes. Transform customer service into a
            realm of swift, smart solutions.
          </p>
        </div>
        <div className="sm:ml-12 sm:mr-6 sm:mt-16 hidden sm:flex flex-wrap sm:flex-col items-center justify-center sm:justify-center gap-4 sm:gap-2 div-anima">
          <div className="tabs overflow-x-scroll sm:overflow-visible mx-4 sm:mx-0">
            <div className="flex sm:flex-row h-full bg-white gap-3">
              {tabs.map((tab, index) => (
                <>
                  <div
                    key={index}
                    className={`min-w-[220px] w-[192px] flex items-center relative   ${
                      index == activeTab ? "active-class" : ""
                    } justify-center sm:justify-start sm:pl-[0] gap-3 w-100 text-center my-2 py-3 sm:px-4 cursor-pointer   px-3  `}
                    onClick={(e) => handleTabChange(index)}
                  >
                    <p
                      className={`relative sm:mt-[2px] text-heading font-semibold
                      `}
                    >
                      {tab.title}{" "}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* content */}
          <div className="bg-white px-4 pb-10 sm:pb-2">
            <div className="flex flex-wrap sm:flex-nowrap items-center">
              <div className="w-full sm:px-12 mt-[40px] sm:mt-0">
                <div className="h-[100%] sm:h-[328px] mb-6 sm:mb-0">
                  <img
                    src={tabs[activeTab].content_video}
                    className="w-100 h-[200px] sm:h-[328px] m-auto rounded-2xl"
                    style={{ minHeightL: "200px" }}
                  />
                </div>
              </div>
              <div className="w-full sm:px-12">
                <p>{tabs[activeTab].p}</p>
              </div>
            </div>
          </div>
        </div>
        <div className=' sm:hidden faq-accordian js-show-on-scroll'>
            <Accordion allowZeroExpanded>
                {tabs.map((element, key) =>
                    <AccordionItem key={key}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <h3 className='text-heading tracking-wider text-lg sm:text-xl md:text-xl lg:text-xl font-semibold'> {element.title}</h3>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                        {element.p}
                        <div className="w-full sm:px-12 mt-[40px] sm:mt-0">
                <div className="h-[100%] sm:h-[328px] mb-6 sm:mb-0">
                  <img
                    src={element.content_video}
                    className="w-100 h-[200px] sm:h-[328px] m-auto rounded-2xl"
                    style={{ minHeightL: "200px" }}
                  />
                </div>
              </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                )}
            </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Smarteconomy;
