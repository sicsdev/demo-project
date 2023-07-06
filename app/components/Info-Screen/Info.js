import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import { InboxIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

const Info = () => {
  const slides = [
    {
      url: "https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];
  useEffect(() => {
    const callback = function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        } else {
          entry.target.classList.remove("animate-fadeIn");
        }
      });
    };
    const observer = new IntersectionObserver(callback);
    const targets = document.querySelectorAll(".js-show-on-scroll");
    targets.forEach(function (target) {
      target.classList.add("opacity-0");
      observer.observe(target);
    });
  }, []);

  // for tabs
  const tabs = [
    {
      id: "1",
      title: "AI Chat",
      coming_soon: "",
      icon: <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-500" />,

      content_video: "/tabs/aichat.gif",
      h3: "Discover a revolution in customer communication with Tempo Chat.",
      p: "Integrate Tempo Chat seamlessly into your existing infrastructure, and watch as it adapts to reflect your business's unique brand. Capable of processing orders, administering returns, and managing inquiries round-the-clock, Tempo Chat is the comprehensive solution your business needs. The crowning glory? Your customers will remain blissfully unaware they're engaging with an AI.",
    },
    {
      id: "2",
      title: "Smart Inbox",
      coming_soon: "",
      icon: <InboxIcon className="h-5 w-5 text-gray-500" />,
      content_video: "/tabs/smartinbox2.gif",
      h3: "Experience cost savings even when you're off the clock.",
      p: "Smart Inbox quietly handles your operations in the backdrop, adeptly pacifying disgruntled customers with refunds, preserving subscriptions, and curtailing churn rates. Our blend of highly intelligent AI and human intervention as needed forms the ultimate workforce at your disposal.",
    },

    {
      id: "3",
      title: "Save Big",
      coming_soon: "",
      icon: <BanknotesIcon className="h-5 w-5 text-gray-500" />,
      content_video: "/tabs/Billing-GIF.gif",

      h3: "Experience unrivaled clarity with our Transparent Billing.",
      p: "Say goodbye to unexpected charges. At Tempo, we believe in full transparency. You're billed a straightforward 50 cents per email response and 25 cents per chat response. Payments are only required when predefined usage thresholds are reached. With Tempo, expect fairness, affordability, and no surprises in your billing.",
    },
    {
      id: "4",
      title: "Scale Fast",
      coming_soon: "",
      content_video: "/tabs/Analytics-Gif.gif",

      icon: <ArrowTrendingUpIcon className="h-5 w-5 text-gray-500" />,
      h3: "Gain Insight with our Advanced Analytics Dashboard.",
      p: "Steer your business with confidence, armed with valuable data at your fingertips. Our analytics dashboard provides crucial metrics such as SLAs and response times. These measurable insights allow you to track performance, enhance efficiency, and elevate your customer service experience to new heights. Trust Tempo to illuminate your path to success.",
    },
    {
      id: "5",
      title: "Smart IVR",
      coming_soon: "",
      icon: <DevicePhoneMobileIcon class="h-5 w-5 text-gray-500" />,
      content_video: "/tabs/IVR-Gif-4-30percent.gif",
      h3: "Elevate your customer service with Smart IVR.",
      p: "Like top-tier telecom companies, leverage cutting-edge IVR technology. Automatically identify and link customers to their inbound calls using data from your CRM, streamlining interactions and personalizing experiences. Trust Smart IVR to drive your business towards unparalleled service excellence.",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [timer, setTimer] = useState(11);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      if (activeTab === tabs.length - 1) {
        setActiveTab(0);
      } else {
        setActiveTab((prevTab) => prevTab + 1);
      }
      setTimer(11);
    }
  }, [timer]);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setTimer(11);
  };

  return (
    <>
      <div className="bg-white pt-5 sm:pt-8 sm:pb-14 py-0 sm:py-8">
        <h2 class="font-bold text-2xl md:text-h2 lg:text-h2 sm:text-h2 text-center my-8  text-heading">
          <span className="text-[#2563eb]">Replace Your Customer Service</span> Team
          Today.
        </h2>
        <div className="sm:ml-12 sm:mr-6 sm:mt-16 flex flex-wrap sm:flex-nowrap items-start justify-center sm:justify-between gap-4 sm:gap-2 div-anima">
          <div className="tabs overflow-x-scroll sm:overflow-visible mx-4 sm:mx-0">
            <div className="flex sm:flex-col h-full bg-white gap-3">
              {tabs.map((tab, index) => (
                <>
                  <div
                    key={index}
                    className={`min-w-[170px] w-[192px] flex items-center relative justify-center sm:justify-start sm:pl-[40px] gap-3 w-100 text-center my-2 py-3 sm:px-4 cursor-pointer rounded-full shadow-lg px-3 sm:px-6 ${
                      index === activeTab
                        ? "active bg-background text-white start-rainbow"
                        : "start-rainbow hover:bg-gray"
                    } ${
                      index === activeTab + 1 || index === activeTab - 4
                        ? "border-animation"
                        : ""
                    }`}
                    onClick={(e) => handleTabChange(index)}
                  >
                    <div className="relative ">{tab.icon}</div>
                    <p
                      className={`relative sm:mt-[2px] ${
                        index === activeTab ? "text-white" : "text-heading"
                      }`}
                    >
                      {tab.title}{" "}
                      <span style={{ fontSize: "12px" }} className="font-light">
                        {tab.coming_soon}
                      </span>
                    </p>
                    {index === activeTab + 1 || index === activeTab - 4 ? (
                      <svg
                        className="facet-pill-border"
                        height="54"
                        width="100%"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <rect
                          height="54"
                          width="100%"
                          ry="26"
                          style={{
                            strokeDasharray: 376.373,
                            strokeDashoffset: 376.373,
                          }}
                        ></rect>
                      </svg>
                    ) : (
                      ""
                    )}
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
                    className="w-100 sm:h-[328px] m-auto rounded-2xl"
                    style={{ minHeightL: "200px" }}
                  />
                </div>
              </div>
              <div className="w-full sm:px-12">
                <h3
                  class="font-bold text-2xl  md:text-h3 lg:text-h3 sm:text-h3 text-left mt-6 sm:mt-2 mb-2 sm:mb-4 text-heading"
                  style={{ lineHeight: "38px" }}
                >
                  {tabs[activeTab].h3}
                </h3>
                <p>{tabs[activeTab].p}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
