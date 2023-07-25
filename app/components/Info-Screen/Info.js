import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import { InboxIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import Card from "../Common/Card/Card";

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
      h3: "Kickstart with Tempo Chat.",
      p: "Integrate Tempo Chat into your system and allow its adaptive AI to mirror your brand, enhancing customer interactions in perfect english and excellent accuracy.",
    },
    {
      id: "2",
      title: "Smart Inbox",
      coming_soon: "",
      icon: <InboxIcon className="h-5 w-5 text-gray-500" />,
      content_video: "/tabs/smartinbox2.gif",
      h3: "Automate with Smart Inbox.",
      p: "Harness the power of Smart Inbox, a blend of superior AI and human intervention, working diligently behind the scenes to manage operations and save costs, even after hours.",
    },

    {
      id: "3",
      title: "Save Big",
      coming_soon: "",
      icon: <BanknotesIcon className="h-5 w-5 text-gray-500" />,
      content_video: "/tabs/Billing-GIF.gif",

      h3: "Simplicity in Billing.",
      p: "Experience transparent billing with Tempo, where you only pay after hitting predefined usage limits, ensuring affordability and no surprise costs.",
    },
    {
      id: "4",
      title: "Scale Fast",
      coming_soon: "",
      content_video: "/tabs/Analytics-Gif.gif",

      icon: <ArrowTrendingUpIcon className="h-5 w-5 text-gray-500" />,
      h3: "Upgrade with Smart IVR.",
      p: "Like leading telecoms, use cutting-edge IVR technology. Auto-identify customers from your CRM data for inbound calls, personalizing interactions and streamlining processes.",
    },
    {
      id: "5",
      title: "Smart IVR",
      coming_soon: "",
      icon: <DevicePhoneMobileIcon class="h-5 w-5 text-gray-500" />,
      content_video: "/tabs/IVR-Gif-4-30percent.gif",
      h3: "Elevate your customer service with Smart IVR.",
      p: "Like top-tier telecom companies, leverage cutting-edge IVR technology. Automatically identify and link customers to their inbound calls using data from your CRM, streamlining interactions and personalizing experiences.",
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
  const [hide, setHide] = useState({
    first: false,
  });
  return (
    <>
      <div className="bg-white pt-5 sm:pt-8 sm:pb-14 py-0 sm:py-8">
        <h2
          class="hidden sm:block font-bold text-2xl md:text-h2 lg:text-h2 sm:text-h2 text-center my-8 relative text-heading"
          onMouseLeave={() => setHide({ first: false })}
        >
          <span className="text-[#2563eb]">Reduce Your</span> Headcount Today.
       
        </h2>
        <h2
          class="block sm:hidden font-bold text-2xl md:text-h2 lg:text-h2 sm:text-h2 text-center my-8 relative text-heading"
          onMouseLeave={() => setHide({ first: false })}
        >
          <span className="text-[#2563eb]">
          Reduce Your <br />
          </span>{" "}
          Headcount Today.  
          {/* <span
            className="cursor-pointer"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setHide({ first: true });
            }}
          >
            
          </span> */}
          {hide.first == true ? (
            <Card
              className={
                "animate-fadeIn w-[320px]	sm:w-[400px] absolute z-50 top-[40px] bg-white ml-auto mr-auto left-0 right-0"
              }
            >
              <p
                className="text-sm font-normal"
                onMouseLeave={() => setHide({ first: false })}
              >
                Tempo learns as you and your customers use it. Over time, it
                will expand it's knowledge and be able to answer a higher
                percentage of customer queries. We think 90% is a good target
                after ~3 months of heavy usage, but a full CS team replacement
                is not a guarantee or a likely outcome of using Tempo at this
                time.
              </p>
            </Card>
          ) : (
            ""
          )}
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
                    className="w-100 h-[200px] sm:h-[328px] m-auto rounded-2xl"
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
