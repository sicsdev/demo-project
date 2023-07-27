import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const Aipowered = () => {
  const data = [
    {
      title: "How to automate HR processes using Task Lists",
      desc: "Task Lists are an automation feature in bob that allows you to build chains of events, one",
      logo: "/1.webp",
      link: "",
    },

    {
      title:
        "How Heroes saves two working days a month using Bob’s automated workflows and integrations",
      desc: "Heroes is a tech startup based in London, with additional offices in Madrid and Barcelona,",
      logo: "/2.webp",
      link: "",
    },
    {
      title:
        "First impressions count! How Bob creates personalized onboarding experiences new hires won’t forget.",
      desc: "Providing your people with a successful onboarding experience is essential for employee satisfaction and retention, as ",
      logo: "/3.webp",
      link: "",
    },
  ];
  return (
    <div className=" bg-white pt-2 sm:pt-10 pb-2 sm:pb-4">
      <div className="my-8  mx-auto max-w-[90%]">
        <h2 className="text-center sm:max-w-[62%]  font-bold mb-8 sm:mb-16 text-2xl text-heading md:text-h2 lg:text-h2 sm:text-h2 sm:leading-[51px] sm:m-auto js-show-on-scroll ">
          Additional resources
        </h2>

        {/* desktop */}
        <div className="hidden sm:grid max-w-[90%] m-auto mt-4 grid-cols-3 gap-4 sm:grid-cols-3 text-center sm:gap-8">
          {data.map((element, key) => (
            <div className="shadow-md  pb-[101px]   relative">
              <div className="relative w-[100%]  hover:text-white " key={key}>
                <img
                  src={element.logo}
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto`}
                />
              </div>
              <p className="max-w-[100%] text-start m-auto mb-4 sm:mb-0 mt-10 sm:mt-8 text-xl ml-6 font-semibold text-heading">
                {element.title}
              </p>
              <p className=" m-auto  sm:mb-2 sm:mt-8 mb-4  pl-7 text-[16px] text-start text-heading">
                {element.desc}
              </p>
              <a
                href="#"
                className=" flex absolute justify-start gap-2 items-center p-9 text-primary font-bold left-0 bottom-[6px] "
                aria-current="page"
              >
                READ MORE
              </a>
              <a
                href="#"
                className=" flex absolute justify-start gap-2 items-center p-9 text-primary font-bold right-0 bottom-0 "
                aria-current="page"
              >
                <ArrowLongRightIcon className="h-10 w-10 text-gray-500" />
              </a>
            </div>
          ))}
        </div>
        {/* desktop */}
        <div className="flex sm:hidden max-w-[90%] m-auto mt-4 flex-col text-center sm:gap-8 ">
          {data.map((element, key) => (
            <div className="shadow pb-[56px] sm:pb-[101px] mb-8   relative">
              <div className="relative w-[100%]   hover:text-white " key={key}>
                <img
                  src={element.logo}
                  fill={true}
                  alt="Picture of the author"
                  className={`m-auto`}
                />
              </div>
              <p className="max-w-[100%] text-start m-auto mb-4 sm:mb-0 mt-10 sm:mt-8 text-xl ml-6  text-heading">
                {element.title}
              </p>
              <p className=" m-auto  sm:mb-2 sm:mt-8 mb-4  pl-7 text-[16px] text-start text-heading">
                {element.desc}
              </p>
              <a
                href="#"
                className=" flex absolute justify-start gap-2 items-center p-9 text-primary font-bold left-0 bottom-[-11px] "
                aria-current="page"
              >
                READ MORE
              </a>
              <a
                href="#"
                className=" flex absolute justify-start gap-2 items-center p-4 text-primary font-bold right-0 bottom-0 "
                aria-current="page"
              >
                <ArrowLongRightIcon className="h-10 w-10 text-gray-500" /> 
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aipowered;
