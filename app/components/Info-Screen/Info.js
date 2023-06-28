import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
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
      title: "Search",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      ),

      content_video: "firstvideo.mp4",
      h3: "ChatGPT becomes the brain of your business.",
      p: "Tempo connects to your existing systems. Tempo is branded to your business, fulfills orders, issues refunds, and handles all inquiries 24/7. The best part? Your customers will never know they're speaking to an AI.",
    },
    {
      id: "2",
      title: "Display",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      ),
      content_video: "secondvideo.mp4",
      h3: "We'll save you money while you sleep.",
      p: "Runs your ops in the background. Automatically issue refunds to angry customers, retain subscribers, and reduce churn. Tempo combines a super smart AI bot with humans when you need it.",
    },
    {
      id: "3",
      title: "Shopping",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
          />
        </svg>
      ),
      content_video: "thirdvideo.mp4",
      h3: "Instant integration process.",
      p: "Time is money, so we make things fast and easy. Tempo AI integrates into your existing ecommerce platform, billing platform, and ERP system so you can get up and running in minutes, not months.",
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
          Save Millions with Tempo.
        </h2>
        <div className="sm:mt-16 flex flex-wrap sm:flex-nowrap items-start justify-center sm:justify-between gap-4 sm:gap-20 div-anima">
          <div className="">
            <div className="flex sm:flex-col h-full bg-white gap-3">
              {tabs.map((tab, index) => (
                <>
                  <div
                    key={index}
                    className={`flex items-center relative justify-center gap-3 w-100 text-center my-2 py-3 sm:px-4 cursor-pointer rounded-full shadow-lg px-3 sm:px-6 ${
                      index === activeTab
                        ? "active bg-black text-white start-rainbow"
                        : "start-rainbow"
                    }`}
                    onClick={(e) => handleTabChange(index)}
                  >
                    <div className="relative w-[18px] h-[18px]">{tab.icon}</div>
                    <p>{tab.title}</p>
                    {index === activeTab + 1 || index === activeTab - 2 ? (
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
              <div className="w-full sm:px-12">
                <div className="h-[228px] sm:h-[328px]">
                  <video
                    autoPlay
                    muted
                    src={tabs[activeTab].content_video}
                    loop
                    playsInline
                    className="w-100 rounded-2xl"
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
