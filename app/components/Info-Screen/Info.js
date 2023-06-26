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
      icon: "/search.png",
      content_video: "firstvideo.mp4",
      h3: "ChatGPT becomes the brain of your business.",
      p: "Tempo connects to your existing systems. Tempo is branded to your business, fulfills orders, issues refunds, and handles all inquiries 24/7. The best part? Your customers will never know they're speaking to an AI.",
    },
    {
      id: "2",
      title: "Display",
      icon: "/search.png",
      content_video: "secondvideo.mp4",
      h3: "We'll save you money while you sleep.",
      p: "Runs your ops in the background. Automatically issue refunds to angry customers, retain subscribers, and reduce churn. Tempo combines a super smart AI bot with humans when you need it.",
    },
    {
      id: "3",
      title: "Shopping",
      icon: "/search.png",
      content_video: "thirdvideo.mp4",
      h3: "Instant integration process.",
      p: "Time is money, so we make things fast and easy. Tempo AI integrates into your existing ecommerce platform, billing platform, and ERP system so you can get up and running in minutes, not months.",
    },
  ];
  const [activeTab, setActiveTab] = useState({
    previous: null,
    next: 1,
    current: 0,
  });
  const [timer, setTimer] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab({
      previous: index === 0 ? 0 : index - 1,
      next: tabs.length - 1 === index ? 1 : index + 1,
      current: index,
    });
    setTimer(10);
  };
  const passClassesByValue = (index) => {
    if (activeTab.next === 0 && index === 0) {
      return "start-rainbow rainbow ";
    }
    if (activeTab.next === index) {
      return "rainbow";
    }
    if (activeTab.current === index) {
      return "bg-black text-white";
    }
    if (activeTab.previous === null) {
      return "";
    }
    return "";
  };
  let time_timer = 8000;
  function startTimer() {
    setInterval(updateState, time_timer);
   
    clearInterval();
  }
  function updateState() {
    setActiveTab({
      previous: activeTab.previous ? activeTab.previous + 1 : null,
      next: tabs.length - 1 === activeTab.next ? 0 : activeTab.next + 1,
      current:
        activeTab.current === tabs.length - 1 ? 0 : activeTab.current + 1,
    });
    if (time_timer === 8000) {
      time_timer = 10000;
    }
  }
  // Call startTimer to begin the continuous state update
  useEffect(() => {
    startTimer();
  }, [activeTab.current]);

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
                    className={`flex items-center relative justify-center  gap-2 w-100 text-center my-2 py-3 sm:p-4 cursor-pointer rounded-full shadow-lg px-3 sm:px-6 ${passClassesByValue(
                      index
                    )}`}
                    onClick={() => handleTabClick(index)}
                  >
                    <div className="relative w-[20px] h-[20px]  ">
                      <Image
                        fill={true}
                        src={tab.icon}
                        className={`bg-contain rounded-full mx-auto ${
                          activeTab === index ? "filter invert" : "btn-3"
                        }`}
                        alt="img"
                      />
                    </div>
                    <p>{tab.title}</p>
                    <svg
                      className="facet-pill-border"
                      height="52"
                      width="100%"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <rect
                        height="52"
                        width="100%"
                        ry="26"
                        class=""
                        style={{
                          strokeDasharray: 376.373,
                          strokeDashoffset: 376.373,
                        }}
                      ></rect>
                    </svg>
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
                    src={tabs[activeTab.current].content_video}
                    loop
                    playsInline
                    className="w-100"
                    style={{ minHeightL: "200px" }}
                  />
                </div>
              </div>
              <div className="w-full sm:px-12">
                <h3
                  class="font-bold text-2xl  md:text-h3 lg:text-h3 sm:text-h3 text-left mt-6 sm:mt-2 mb-2 sm:mb-4 text-heading"
                  style={{ lineHeight: "38px" }}
                >
                  {tabs[activeTab.current].h3}
                </h3>
                <p>{tabs[activeTab.current].p}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
