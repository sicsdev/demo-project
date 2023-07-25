import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Link from "next/link";
import Image from "next/image";

const Marketing = () => {
  const data = [
    {
      name: "Marketing",
      logo: "/icon1.svg",

      dataTabs: [
        {
          headingone:
            "Expand your market reach with SalesIQ. Approach and interact with different prospects across borders and various sources in one place.",
          logo: "/icon1.svg",
          heading: "Grab their attention with tailored messaging",
          paragraph:
            "Engage every prospect that visits your website. Set up automated triggers for different scenarios to initiate a chat with visitors at exactly the right moment. Strike up a conversation with prospects by sending a message or showing a custom banner based on their areas of interest and how much time they've spent on your web pages.",
        },
        {
          logo: "/icon1.svg",
          heading: "Grab their attention with tailored messaging",
          paragraph:
            "Get an overview of each prospect’s areas of interest by analyzing which pages they’ve visited and what they've said in previous conversations with your agents. Use those insights to respond with relevant information or route them to the perfect live chat agent for their particular needs.",
        },
        {
          logo: "/icon1.svg",
          heading: "Integrate with major marketing apps            ",
          paragraph:
            "Connect Zoho CRM with Zoho SalesIQ to view, add, access, and sync prospect data from both applications. This powerful two-way sync ensures your data is easily accessible at all times. Use the contact information available in Zoho CRM to send targeted emails and newsletters to your prospects, thanks to our integration with Zoho Campaigns.              ",
        },
        {
          button: "EXPLORE MORE",
          buttonPara: "Check out our marketing features",
        },
      ],
    },
    {
      name: "Sales",
      logo: "/icon2.svg",

      dataTabs: [
        {
          headingone:
            "Experience better sales and rapid lead conversion with minimal effort. Captivate your prospects with proactive customer engagement using SalesIQ.          ",
          logo: "/icon1.svg",
          heading: "Grab their attention with tailored messaging",
          paragraph:
            "Engage every prospect that visits your website. Set up automated triggers for different scenarios to initiate a chat with visitors at exactly the right moment. Strike up a conversation with prospects by sending a message or showing a custom banner based on their areas of interest and how much time they've spent on your web pages.",
        },
        {
          logo: "/icon1.svg",
          heading: "Grab their attention with tailored messaging",
          paragraph:
            "Get an overview of each prospect’s areas of interest by analyzing which pages they’ve visited and what they've said in previous conversations with your agents. Use those insights to respond with relevant information or route them to the perfect live chat agent for their particular needs.",
        },
        {
          logo: "/icon1.svg",
          heading: "Integrate with major marketing apps            ",
          paragraph:
            "Connect Zoho CRM with Zoho SalesIQ to view, add, access, and sync prospect data from both applications. This powerful two-way sync ensures your data is easily accessible at all times. Use the contact information available in Zoho CRM to send targeted emails and newsletters to your prospects, thanks to our integration with Zoho Campaigns.              ",
        },
        {
          button: "EXPLORE MORE",
          buttonPara: "Check out our marketing features",
        },
      ],
    },
    {
      name: "Support",
      logo: "/icon3.svg",

      dataTabs: [
        {
          headingone:
            "Experience better sales and rapid lead conversion with minimal effort. Captivate your prospects with proactive customer engagement using SalesIQ.          ",
          logo: "/icon1.svg",
          heading: "Grab their attention with tailored messaging",
          paragraph:
            "Engage every prospect that visits your website. Set up automated triggers for different scenarios to initiate a chat with visitors at exactly the right moment. Strike up a conversation with prospects by sending a message or showing a custom banner based on their areas of interest and how much time they've spent on your web pages.",
        },
        {
          logo: "/icon1.svg",
          heading: "Grab their attention with tailored messaging",
          paragraph:
            "Get an overview of each prospect’s areas of interest by analyzing which pages they’ve visited and what they've said in previous conversations with your agents. Use those insights to respond with relevant information or route them to the perfect live chat agent for their particular needs.",
        },
        {
          logo: "/icon1.svg",
          heading: "Integrate with major marketing apps            ",
          paragraph:
            "Connect Zoho CRM with Zoho SalesIQ to view, add, access, and sync prospect data from both applications. This powerful two-way sync ensures your data is easily accessible at all times. Use the contact information available in Zoho CRM to send targeted emails and newsletters to your prospects, thanks to our integration with Zoho Campaigns.              ",
        },
        {
          button: "EXPLORE MORE",
          buttonPara: "Check out our marketing features",
        },
      ],
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [downicon, setDownicon] = useState(false);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handlerFeaturecard = () => {
    setDownicon(!downicon);
  };
  return (
    <>
      <div className="hidden sm:block bg-white pt-5 sm:pt-8 sm:pb-14 py-0 sm:py-8">
        <div className="m-auto flex flex-row justify-center sm:gap-12 gap-4 text-center pb-[40px] sm:pb-0 sm:p-[0]">
          {data.map((ele, index) => (
            <div
              className={`relative cursor-pointer ${
                index === activeTab ? "active2" : ""
              }`}
              onClick={(e) => handleTabChange(index)}
            >
              <div className="shadow-lg  rounded-lg  market-border w-[100px] h-[110px] sm:w-[240px] sm:h-[240px]">
                <div
                  className=" relative w-full mx-auto mt-3 sm:mt-6 sm:mb-[0px] hover:text-white p-0 py-4 sm:py-0 px-0 sm:p-3 "
                  key={index}
                >
                  <img
                    src={ele.logo}
                    fill={true}
                    alt="Picture of the author"
                    className={`m-auto object-contain w-[50px] sm:w-auto`}
                  />
                </div>
                <p className="pb-2 m-auto font-semibold absolute left-0 right-0  bottom-2  sm:text-h5">
                  {ele.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* tabs section */}
        <div className=" sm:max-w-[50%] sm:ml-[50px] flex justify-start sm:mt-12 sm:mb-[-40px]">
          <p className="m-auto font-bold bottom-2 text-[36px] sm:text-[60px]">
            {data[activeTab].name}
          </p>
        </div>
        <div className="bg-white sm:max-w-[80%] flex flex-wrap justify-center m-auto sm:pl-[67px] sm:pr-[67px] relative sm:mt-[25px]">
          <div className="sm:grid sm:grid-cols-2 flex-col flex sm:gap-8">
            {data[activeTab].dataTabs.map((ele, key) => (
              <>
                <div
                  className="col-span-1 sm:px-12  mt-[0px] sm:mt-12  p-[15px] sm:p-[40px]"
                  key={key}
                >
                  <p className="m-auto text-center sm:text-left text-[16px] sm:text-[18px]">
                    {ele.headingone}
                  </p>

                  {key == 3 ? (
                    <div className="shadow-lg bg-heading  rounded-lg  h-[400px] m-auto p-7 sm:p-0  sm:w-[440px] sm:h-[400px] sm:pt-[-95px] sm:py-[50px] sm:px-[20px]">
                      <div className="  sm:w-[440px] sm:h-[300px] sm:py-[50px] sm:px-[50px]">
                        <p className=" font-semibold text-white  text-h5">
                          {ele?.buttonPara}
                        </p>
                        <p className="py-2 px-8 sm:w-[60%] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 text-white text-lg font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg">
                          {ele.button}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="shadow-lg rounded-lg h-auto m-3 sm:m-0 sm:w-[440px] sm:h-[600px] py-2 sm:py-[50px] px-3 sm:px-[50px]">
                      <div
                        className=" relative w-full sm:w-[90px] sm:h-[90px] mt-6 hover:text-white px-3 sm:px-0 sm:py-3 "
                        key={key}
                      >
                        <img
                          src={ele?.logo}
                          fill={true}
                          alt="Picture of the author"
                          className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                        />
                      </div>
                      <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                        {ele?.heading}
                      </p>
                      <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                        {ele?.paragraph}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>

          {/* images section */}
          <div className="sm:block hidden w-full marketing-image">
            <div className=" ">
              <div className=" relative marketing-image w-full mx-auto mt-6 hover:text-white p-3 img1">
                <img
                  src="/profile4.svg"
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto object-contain  `}
                />
              </div>
              <div className=" relative  marketing-image w-full mx-auto mt-6 hover:text-white p-3 img2">
                <img
                  src="/profile4.svg"
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto object-contain  `}
                />
              </div>
              <div className=" relative marketing-image w-full mx-auto mt-6 hover:text-white p-3 img3">
                <img
                  src="/profile4.svg"
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto object-contain  `}
                />
              </div>
              <div className=" relative w-full marketing-image mx-auto mt-6 hover:text-white p-3 img4">
                <img
                  src="/profile4.svg"
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto object-contain  `}
                />
              </div>
            </div>
          </div>
          {/* end images section */}
        </div>
        {/* end tabs section */}
      </div>

      {/* mobile */}
      <div class="block sm:hidden  mx-auto max-w-[90%] pt-8 py-4">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/3 px-2 mb-4">
            <div class="bg-white rounded-md shadow-lg p-4">
              <div onClick={handlerFeaturecard}>
                <Accordion allowZeroExpanded className="border-0">
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton
                        className={
                          downicon
                            ? "relative featurecards_mobile p-0 bg-white"
                            : "relative featurecards_mobile2 p-0 bg-white"
                        }
                      >
                        <div className="flex items-center justify-start gap-2">
                          <img
                            src="/icon1.svg"
                            fill={true}
                            alt="Picture of the author"
                            className="object-contain w-[50px] sm:w-auto"
                          />

                          <p className="font-semibold sm:text-h5">Marketing</p>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="p-0">
                      <div className=" sm:max-w-[50%] sm:ml-[50px] flex justify-start sm:mt-12 sm:mb-[-40px]">
                        <p className="m-auto font-bold mt-4 text-[26px] sm:text-[60px]">
                          Marketing
                        </p>
                      </div>
                      <div className="bg-white sm:max-w-[80%] flex flex-wrap justify-center m-auto sm:pl-[67px] sm:pr-[67px] relative sm:mt-[25px]">
                        <div className="sm:grid sm:grid-cols-2 flex-col flex sm:gap-8">
                          <>
                            <div className="col-span-1 mt-2">
                              <p className="m-auto text-center sm:text-left text-[16px] sm:text-[18px]">
                                Expand your market reach with SalesIQ. Approach
                                and interact with different prospects across
                                borders and various sources in one place.
                              </p>
                              <div className="shadow-lg rounded-lg h-auto mt-2 py-2 px-3">
                                <div className=" relative w-full mt-6 hover:text-white ">
                                  <img
                                    src="/icon1.svg"
                                    fill={true}
                                    alt="Picture of the author"
                                    className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                                  />
                                </div>
                                <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                                  Grab their attention with tailored messaging
                                </p>
                                <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                                  Engage every prospect that visits your
                                  website. Set up automated triggers for
                                  different scenarios to initiate a chat with
                                  visitors at exactly the right moment. Strike
                                  up a conversation with prospects by sending a
                                  message or showing a custom banner based on
                                  their areas of interest and how much time
                                  they've spent on your web pages.
                                </p>
                              </div>
                            </div>

                            <div className="shadow-lg rounded-lg h-auto mt-2 py-2 px-3">
                              <div className=" relative w-full mt-6 hover:text-white ">
                                <img
                                  src="/icon1.svg"
                                  fill={true}
                                  alt="Picture of the author"
                                  className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                                />
                              </div>
                              <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                                Grab their attention with tailored messaging
                              </p>
                              <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                                Get an overview of each prospect’s areas of
                                interest by analyzing which pages they’ve
                                visited and what they've said in previous
                                conversations with your agents. Use those
                                insights to respond with relevant information or
                                route them to the perfect live chat agent for
                                their particular needs.
                              </p>
                            </div>
                            <div className="shadow-lg rounded-lg h-auto mt-2 py-2 px-3">
                              <div className=" relative w-full mt-6 hover:text-white ">
                                <img
                                  src="/icon1.svg"
                                  fill={true}
                                  alt="Picture of the author"
                                  className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                                />
                              </div>
                              <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                                Integrate with major marketing apps
                              </p>
                              <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                                Connect Zoho CRM with Zoho SalesIQ to view, add,
                                access, and sync prospect data from both
                                applications. This powerful two-way sync ensures
                                your data is easily accessible at all times. Use
                                the contact information available in Zoho CRM to
                                send targeted emails and newsletters to your
                                prospects, thanks to our integration with Zoho
                                Campaigns.
                              </p>
                            </div>
                            <div className="shadow-lg bg-heading  rounded-lg  h-[200px] m-auto p-7 sm:p-0  sm:w-[440px] sm:h-[400px] sm:pt-[-95px] sm:py-[50px] sm:px-[20px] mt-4">
                              <div className="  sm:w-[440px] sm:h-[300px] sm:py-[50px] sm:px-[50px]">
                                <p className=" font-semibold text-white  text-h5">
                                  Check out our marketing features
                                </p>
                                <p className="py-2 px-8 sm:w-[60%] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 text-white text-lg font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg">
                                  EXPLORE MORE
                                </p>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/3 px-2 mb-4">
            <div class="bg-white rounded-md shadow-lg p-4">
              <div onClick={handlerFeaturecard}>
                <Accordion allowZeroExpanded className="border-0">
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton
                        className={
                          downicon
                            ? "relative featurecards_mobile p-0 bg-white"
                            : "relative featurecards_mobile2 p-0 bg-white"
                        }
                      >
                        <div className="flex items-center justify-start gap-2">
                          <img
                            src="/icon2.svg"
                            fill={true}
                            alt="Picture of the author"
                            className="object-contain w-[50px] sm:w-auto"
                          />

                          <p className="font-semibold sm:text-h5">Sales</p>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="p-0">
                      <div className=" sm:max-w-[50%] sm:ml-[50px] flex justify-start sm:mt-12 sm:mb-[-40px]">
                        <p className="m-auto font-bold mt-4 text-[26px] sm:text-[60px]">
                        Sales
                        </p>
                      </div>
                      <div className="bg-white sm:max-w-[80%] flex flex-wrap justify-center m-auto sm:pl-[67px] sm:pr-[67px] relative sm:mt-[25px]">
                        <div className="sm:grid sm:grid-cols-2 flex-col flex sm:gap-8">
                          <>
                            <div className="col-span-1 mt-2">
                              <p className="m-auto text-center sm:text-left text-[16px] sm:text-[18px]">
                              Experience better sales and rapid lead conversion with minimal effort. Captivate your prospects with proactive customer engagement using SalesIQ.
                              </p>
                              <div className="shadow-lg rounded-lg h-auto mt-2 py-2 px-3">
                                <div className=" relative w-full mt-6 hover:text-white ">
                                  <img
                                    src="/icon2.svg"
                                    fill={true}
                                    alt="Picture of the author"
                                    className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                                  />
                                </div>
                                <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                                  Grab their attention with tailored messaging
                                </p>
                                <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                                  Engage every prospect that visits your
                                  website. Set up automated triggers for
                                  different scenarios to initiate a chat with
                                  visitors at exactly the right moment. Strike
                                  up a conversation with prospects by sending a
                                  message or showing a custom banner based on
                                  their areas of interest and how much time
                                  they've spent on your web pages.
                                </p>
                              </div>
                            </div>

                            <div className="shadow-lg rounded-lg h-auto mt-2 py-2 px-3">
                              <div className=" relative w-full mt-6 hover:text-white ">
                                <img
                                  src="/icon2.svg"
                                  fill={true}
                                  alt="Picture of the author"
                                  className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                                />
                              </div>
                              <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                                Grab their attention with tailored messaging
                              </p>
                              <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                                Get an overview of each prospect’s areas of
                                interest by analyzing which pages they’ve
                                visited and what they've said in previous
                                conversations with your agents. Use those
                                insights to respond with relevant information or
                                route them to the perfect live chat agent for
                                their particular needs.
                              </p>
                            </div>
                            <div className="shadow-lg rounded-lg h-auto mt-2 py-2 px-3">
                              <div className=" relative w-full mt-6 hover:text-white ">
                                <img
                                  src="/icon2.svg"
                                  fill={true}
                                  alt="Picture of the author"
                                  className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                                />
                              </div>
                              <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                                Integrate with major marketing apps
                              </p>
                              <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                                Connect Zoho CRM with Zoho SalesIQ to view, add,
                                access, and sync prospect data from both
                                applications. This powerful two-way sync ensures
                                your data is easily accessible at all times. Use
                                the contact information available in Zoho CRM to
                                send targeted emails and newsletters to your
                                prospects, thanks to our integration with Zoho
                                Campaigns.
                              </p>
                            </div>
                            <div className="shadow-lg bg-heading  rounded-lg  h-[200px] m-auto p-7 sm:p-0  sm:w-[440px] sm:h-[400px] sm:pt-[-95px] sm:py-[50px] sm:px-[20px] mt-4">
                              <div className="  sm:w-[440px] sm:h-[300px] sm:py-[50px] sm:px-[50px]">
                                <p className=" font-semibold text-white  text-h5">
                                  Check out our marketing features
                                </p>
                                <p className="py-2 px-8 sm:w-[60%] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 text-white text-lg font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg">
                                  EXPLORE MORE
                                </p>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          
          <div class="w-full md:w-1/3 px-2 mb-4">
            <div class="bg-white rounded-md shadow-lg p-4">
              <div onClick={handlerFeaturecard}>
                <Accordion allowZeroExpanded className="border-0">
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton
                        className={
                          downicon
                            ? "relative featurecards_mobile p-0 bg-white"
                            : "relative featurecards_mobile2 p-0 bg-white"
                        }
                      >
                        <div className="flex items-center justify-start gap-2">
                          <img
                            src="/icon3.svg"
                            fill={true}
                            alt="Picture of the author"
                            className="object-contain w-[50px] sm:w-auto"
                          />

                          <p className="font-semibold sm:text-h5">Support</p>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="p-0">
                      <div className=" sm:max-w-[50%] sm:ml-[50px] flex justify-start sm:mt-12 sm:mb-[-40px]">
                        <p className="m-auto font-bold mt-4 text-[26px] sm:text-[60px]">
                        Support
                        </p>
                      </div>
                      <div className="bg-white sm:max-w-[80%] flex flex-wrap justify-center m-auto sm:pl-[67px] sm:pr-[67px] relative sm:mt-[25px]">
                        <div className="sm:grid sm:grid-cols-2 flex-col flex sm:gap-8">
                          <>
                            <div className="col-span-1 mt-2">
                              <p className="m-auto text-center sm:text-left text-[16px] sm:text-[18px]">
                              Experience better sales and rapid lead conversion with minimal effort. Captivate your prospects with proactive customer engagement using SalesIQ.
                              </p>
                              <div className="shadow-lg rounded-lg h-auto mt-2 py-2 px-3">
                                <div className=" relative w-full mt-6 hover:text-white ">
                                  <img
                                    src="/icon3.svg"
                                    fill={true}
                                    alt="Picture of the author"
                                    className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                                  />
                                </div>
                                <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                                  Grab their attention with tailored messaging
                                </p>
                                <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                                  Engage every prospect that visits your
                                  website. Set up automated triggers for
                                  different scenarios to initiate a chat with
                                  visitors at exactly the right moment. Strike
                                  up a conversation with prospects by sending a
                                  message or showing a custom banner based on
                                  their areas of interest and how much time
                                  they've spent on your web pages.
                                </p>
                              </div>
                            </div>

                            <div className="shadow-lg rounded-lg h-auto mt-2 py-2 px-3">
                              <div className=" relative w-full mt-6 hover:text-white ">
                                <img
                                  src="/icon3.svg"
                                  fill={true}
                                  alt="Picture of the author"
                                  className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                                />
                              </div>
                              <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                                Grab their attention with tailored messaging
                              </p>
                              <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                                Get an overview of each prospect’s areas of
                                interest by analyzing which pages they’ve
                                visited and what they've said in previous
                                conversations with your agents. Use those
                                insights to respond with relevant information or
                                route them to the perfect live chat agent for
                                their particular needs.
                              </p>
                            </div>
                            <div className="shadow-lg rounded-lg h-auto mt-2 py-2 px-3">
                              <div className=" relative w-full mt-6 hover:text-white ">
                                <img
                                  src="/icon3.svg"
                                  fill={true}
                                  alt="Picture of the author"
                                  className={`mr-auto sm:m-auto object-contain w-[70px] sm:w-auto`}
                                />
                              </div>
                              <p className="m-auto font-semibold text-2xl sm:text-h5 p-4 sm:p-0">
                                Integrate with major marketing apps
                              </p>
                              <p className="m-auto text-[16px] sm:text-[20px] pb-6 sm:pb-0 sm:p-4 px-3 sm:px-0 sm:py-3">
                                Connect Zoho CRM with Zoho SalesIQ to view, add,
                                access, and sync prospect data from both
                                applications. This powerful two-way sync ensures
                                your data is easily accessible at all times. Use
                                the contact information available in Zoho CRM to
                                send targeted emails and newsletters to your
                                prospects, thanks to our integration with Zoho
                                Campaigns.
                              </p>
                            </div>
                            <div className="shadow-lg bg-heading  rounded-lg  h-[200px] m-auto p-7 sm:p-0  sm:w-[440px] sm:h-[400px] sm:pt-[-95px] sm:py-[50px] sm:px-[20px] mt-4">
                              <div className="  sm:w-[440px] sm:h-[300px] sm:py-[50px] sm:px-[50px]">
                                <p className=" font-semibold text-white  text-h5">
                                  Check out our marketing features
                                </p>
                                <p className="py-2 px-8 sm:w-[60%] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 text-white text-lg font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg">
                                  EXPLORE MORE
                                </p>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
    </>
  );
};

export default Marketing;
