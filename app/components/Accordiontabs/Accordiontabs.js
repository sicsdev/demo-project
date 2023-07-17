import React from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  InboxIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { boolean } from "yup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// init Swiper:

const tabs = [
  {
    id: "1",
    title: "Tasks",
    coming_soon: "",
    icon: <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-500" />,

    content_video: "/accordion_tabs/1.png",
    h3: "Kickstart with Tempo Chat.",
    p: "Integrate Tempo Chat into your system and allow its adaptive AI to mirror your brand, enhancing customer interactions in perfect english and excellent accuracy.",
  },
  {
    id: "2",
    title: "Subtasks",
    coming_soon: "",
    icon: <InboxIcon className="h-5 w-5 text-gray-500" />,
    content_video: "/accordion_tabs/2.png",
    h3: "Automate with Smart Inbox.",
    p: "Harness the power of Smart Inbox, a blend of superior AI and human intervention, working diligently behind the scenes to manage operations and save costs, even after hours.",
  },

  {
    id: "3",
    title: "Folders",
    coming_soon: "",
    icon: <BanknotesIcon className="h-5 w-5 text-gray-500" />,
    content_video: "/accordion_tabs/1.png",

    h3: "Simplicity in Billing.",
    p: "Experience transparent billing with Tempo, where you only pay after hitting predefined usage limits, ensuring affordability and no surprise costs.",
  },
  {
    id: "4",
    title: "Milestones",
    coming_soon: "",
    content_video: "/accordion_tabs/2.png",

    icon: <ArrowTrendingUpIcon className="h-5 w-5 text-gray-500" />,
    h3: "Upgrade with Smart IVR.",
    p: "Like leading telecoms, use cutting-edge IVR technology. Auto-identify customers from your CRM data for inbound calls, personalizing interactions and streamlining processes.",
  },
  {
    id: "5",
    title: "Phases",
    coming_soon: "",
    icon: <DevicePhoneMobileIcon class="h-5 w-5 text-gray-500" />,
    content_video: "/accordion_tabs/1.png",
    h3: "Elevate your customer service with Smart IVR.",
    p: "Like top-tier telecom companies, leverage cutting-edge IVR technology. Automatically identify and link customers to their inbound calls using data from your CRM, streamlining interactions and personalizing experiences.",
  },
  {
    id: "6",
    title: "Projects",
    coming_soon: "",
    icon: <DevicePhoneMobileIcon class="h-5 w-5 text-gray-500" />,
    content_video: "/accordion_tabs/2.png",
    h3: "Elevate your customer service with Smart IVR.",
    p: "Like top-tier telecom companies, leverage cutting-edge IVR technology. Automatically identify and link customers to their inbound calls using data from your CRM, streamlining interactions and personalizing experiences.",
  },
];
const Accordiontabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  const [swiper, setWiper] = useState(0);
const handleSwiperChange =(ele)=>{
  setWiper(ele.realIndex)
}
  return (
    <div className="bg-[white] pt-6 pb-8">
      <h2 class="text-center pb-4 text-2xl md:text-h2 lg:text-h2 sm:text-h2 sm:leading-8 my-2 font-bold text-black">
        Cross-tag at every level
      </h2>
      <p className="px-4 pb-4 sm:w-[50%] m-auto text-center">
        Categorize your company’s entire workload with Wrike. Use our
        cross-tagging feature across tasks, subtasks, folders, milestones,
        phases, and projects.
      </p>
      <div className="hidden sm:flex sm:ml-12 sm:mr-6 sm:pt-16  flex-wrap sm:flex-nowrap items-start justify-center sm:justify-between gap-4 sm:gap-2 div-anima">
        <div className="w-[100%] sm:w-[30%] tabs mx-4 sm:mx-0">
          <div className="block sm:flex-col h-full bg-white gap-3">
            {tabs.map((tab, index) => (
              <>
                <Accordion className="b-0">
                  <AccordionItem
                    onClick={(e) => handleTabChange(index)}
                    className={
                      index === activeTab
                        ? "bg-background rounded-lg"
                        : "text-white"
                    }
                  >
                    <AccordionItemButton className="p-0 bg-white">
                      <div
                        key={index}
                        className={`font-semi-bold tab_accordion_heading min-w-[90%] h-[65px] flex items-center relative justify-start sm:justify-start sm:pl-[40px] gap-3 w-100 text-center my-2 py-3 cursor-pointer rounded-t-lg shadow-lg px-3 sm:px-6 ${
                          index === activeTab
                            ? "active bg-background text-white start-rainbow "
                            : "start-rainbow hover:bg-gray"
                        }`}
                      >
                        <p
                          className={`relative sm:mt-[2px] ${
                            index === activeTab ? "text-white" : "text-heading"
                          }`}
                        >
                          {tab.title}{" "}
                        </p>
                      </div>
                    </AccordionItemButton>
                    <AccordionItemPanel className="p-0 accordionitem_panel">
                      {index === activeTab ? (
                        <div
                          className={
                            index === activeTab
                              ? "p-6 text-white animate__animated animate__backInUp"
                              : "p-6 text-heading  animate__animated animate__backInUp"
                          }
                        >
                          {tabs[activeTab].p}

                          <div className="w-[100%] block sm:hidden">
                            <div className="flex flex-wrap sm:flex-nowrap items-center">
                              <div className="w-full sm:px-12 mt-[20px] sm:mt-0">
                                <div className="h-[100%] sm:h-[100%] mb-2 sm:mb-0">
                                  <img
                                    src={tabs[activeTab].content_video}
                                    className="w-100 m-auto rounded-2xl"
                                    style={{ minHeightL: "200px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </>
            ))}
          </div>
        </div>

        {/* content */}
        <div className="sm:block hidden sm:w-[70%] bg-white px-4 pb-10 sm:pb-2">
          <div className="flex flex-wrap sm:flex-nowrap items-center">
            <div className="w-full sm:px-12 mt-[40px] sm:mt-0">
              <div className="h-[100%] sm:h-[100%] mb-6 sm:mb-0">
                <img
                  src={tabs[activeTab].content_video}
                  className="w-100 m-auto rounded-2xl"
                  style={{ minHeightL: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(ele) => handleSwiperChange(ele)}
        pagination={true}
        loop={true}
      >
        {tabs.map((ele) => (
          <SwiperSlide>
            <div className="w-[100%] block sm:hidden">
              <div className="flex flex-wrap sm:flex-nowrap items-center">
                <div className="w-full sm:px-12 mt-[20px] sm:mt-0">
                  <div className="h-[100%] sm:h-[100%] mb-2 sm:mb-0">
                    <img
                      src={ele.content_video}
                      className="w-100 m-auto rounded-2xl"
                      style={{ minHeightL: "200px" }}
                    />
                  </div>
                </div>
              </div>
              <p
                className={`text-left px-6 text-xl  sm:leading-8  font-semibold text-black
                             `}
              >
                {ele.title}
              </p>
              <p className="text-left px-6 text-xl     text-black">{ele.p}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className=" sm:hidden flex flex-rows justify-center">
        {tabs.map((item, index) => {
          return (
            <div className="px-4" key={item}>
              <ul className="list-disc">
                <li
                  className={`${
                    index == swiper ? "text-[heading] " : "text-[#ededed]"
                  }`}
                ></li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordiontabs;
