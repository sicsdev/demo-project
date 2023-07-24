import React from "react";
import { useState } from "react";
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

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="bg-white pt-5 sm:pt-8 sm:pb-14 py-0 sm:py-8">
      <div className="m-auto flex flex-row justify-center sm:gap-12 gap-4   text-center p-[32px] sm:p-[0]">
        {data.map((ele, index) => (
          <div
            className={`relative cursor-pointer ${
              index === activeTab ? "active2" : ""
            }`}
            onClick={(e) => handleTabChange(index)}
          >
            <div className="shadow-lg  rounded-lg  market-border w-[110px] h-[120px] sm:w-[240px] sm:h-[240px]">
              <div
                className=" relative w-full mx-auto mt-6 sm:mb-[0px] mb-[16px] hover:text-white p-3 "
                key={index}
              >
                <img
                  src={ele.logo}
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto object-contain  `}
                />
              </div>
              <p className="m-auto font-semibold absolute left-0 right-0  bottom-2  text-[15px] sm:text-h5">
                {ele.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* tabs section */}
      <div className=" sm:max-w-[50%] sm:ml-[50px] flex justify-start sm:mt-12 sm:mb-[-40px]">
        <p className="m-auto font-bold bottom-2 text-[20px] sm:text-[60px]">
          {data[activeTab].name}
        </p>
      </div>
      <div className="bg-white sm:max-w-[80%] flex flex-wrap justify-center m-auto sm:pl-[67px] sm:pr-[67px] relative sm:mt-[25px]">
        <div className="sm:grid sm:grid-cols-2 flex-col flex gap-8">
          {data[activeTab].dataTabs.map((ele, key) => (
            <>
              <div className="col-span-1 sm:px-12  mt-[0px] sm:mt-12  p-[15px] sm:p-[40px]" key={key}>
                <p className="m-auto text-[18px]">{ele.headingone}</p>

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
                  <div className="shadow-lg  rounded-lg  h-auto  sm:w-[440px] sm:h-[600px] sm:py-[50px] sm:px-[50px]">
                    <div
                      className=" relative w-full sm:w-[90px] sm:h-[90px] mt-6 hover:text-white p-3 "
                      key={key}
                    >
                      <img
                        src={ele?.logo}
                        fill={true}
                        alt="Picture of the author"
                        className={`m-auto object-contain  `}
                      />
                    </div>
                    <p className="m-auto font-semibold  text-h5 p-4 sm:p-0">
                      {ele?.heading}
                    </p>
                    <p className="m-auto   text-[20px] p-4 sm:p-0">{ele?.paragraph}</p>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
   

      {/* images section */}
      <div className="  sm:block hidden w-full marketing-image">
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
  );
};

export default Marketing;
