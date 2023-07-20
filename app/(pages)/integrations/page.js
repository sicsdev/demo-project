"use client";
import Image from "next/image";
import React from "react";

const slides = [
  {
    id: 1,
    logo: "/integrations/1.svg",
    title: "AlloyDB",
    text: "Google Cloud's fully managed PostgreSQL database service optimized for performance, scale, and availability.",
    tag: "New",
  },
  {
    id: 2,
    logo: "/integrations/2.svg",
    title: "Athena",
    text: "Amazon Athena is a fully managed service for querying your S3 data.",
    tag: "New",
  },
  {
    id: 3,
    logo: "/integrations/3.svg",
    title: "AWS Redshift",
    text: "Amazon Redshift is a fully managed, petabyte-scale data warehouse service.",
  },
  {
    id: 4,
    logo: "/integrations/4.svg",
    title: "BigQuery",
    text: "Google BigQuery is a fully-managed, serverless data warehouse.",
  },
  {
    id: 1,
    logo: "/integrations/1.svg",
    title: "AlloyDB",
    text: "Google Cloud's fully managed PostgreSQL database service optimized for performance, scale, and availability.",
    tag: "New",
  },
  {
    id: 2,
    logo: "/integrations/2.svg",
    title: "Athena",
    text: "Amazon Athena is a fully managed service for querying your S3 data.",
    tag: "New",
  },
  {
    id: 3,
    logo: "/integrations/3.svg",
    title: "AWS Redshift",
    text: "Amazon Redshift is a fully managed, petabyte-scale data warehouse service.",
  },
  {
    
    id: 4,
    logo: "/integrations/4.svg",
    title: "BigQuery",
    text: "Google BigQuery is a fully-managed, serverless data warehouse.",
  },
  {
    id: 1,
    logo: "/integrations/1.svg",
    title: "AlloyDB",
    text: "Google Cloud's fully managed PostgreSQL database service optimized for performance, scale, and availability.",
    tag: "New",
  },
  {
    id: 2,
    logo: "/integrations/2.svg",
    title: "Athena",
    text: "Amazon Athena is a fully managed service for querying your S3 data.",
    tag: "New",
  },
  {
    id: 3,
    logo: "/integrations/3.svg",
    title: "AWS Redshift",
    text: "Amazon Redshift is a fully managed, petabyte-scale data warehouse service.",
  },
  {
    id: 4,
    logo: "/integrations/4.svg",
    title: "BigQuery",
    text: "Google BigQuery is a fully-managed, serverless data warehouse.",
  },
];

const page = () => {
  return (
    <>
      <div className="bg-background sm:py-6">
        <div className="mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%] py-10">
          <h1 class="font-bold text-2xl text-white md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none text-center">
            Connect to anything with an API
          </h1>
          <p class="text-white  text-xl align-bottom font-semibold text-center mt-6 sm:max-w-[80%] m-auto">
            Out of the box, Retool will connect to nearly anything with a REST
            or GraphQL API. A growing library of native integrations makes it
            even easier to connect with your data sources.
          </p>
          <div className="relative sm:max-w-[30%] mt-6 m-auto">
            <input
              type={"search"}
              placeholder={"Search Integrations"}
              className={
                "border border-input_color w-full block  px-3 py-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10"
              }
              id={"search"}
            />
            <img
              className="w-5 top-[13px] left-[14px] absolute"
              src="/search.png"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#e6f7fd] pt-8 pb-8 sm:pb-4">
        <div className="mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]">
          <div className="max-w-[1400px] w-full m-auto sm:py-8 sm:px-4 px-4 lg:px-4 relative group">
            <p class="text-black-color text-2xl font-semibold mb-8 sm:mb-0">
              Database integrations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 lg:px-4">
              {slides.map((item, key) => (
                <div
                  className="bg-white flex flex-col justify-between cursor-pointer shadow-lg hover:translate-y-[-4px] transition-transform duration-300 integration_cards"
                  style={{
                    border: "1px solid rgb(237, 237, 237)",
                    borderRadius: "8px",
                  }}
                  key={key}
                >
                  <div className="p-6 sm:p-8 md:py-7 md:px-4 ">
                    <div className="relative w-[35px] h-[35px] gap-2 rounded-lg m-auto mb-5">
                      <Image
                        fill={"true"}
                        className="bg-contain mx-auto w-full rounded-lg"
                        alt="logo.png"
                        src={item.logo}
                      />
                    </div>
                    <h5 className="mb-4 text-center font-semibold text-xl md:text-h6 sm:leading-2 lg:text-h6 sm:text-h6 text-black js-show-on-scroll">
                      {item.title}
                    </h5>
                    <div className="flex flex-co justify-start items-center gap-4">
                      <p className="text-black text-center text-base sm:text-para opacity-70 js-show-on-scroll">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <div className="learnmore_integration_btn">
                    <button class="learnmore_integration py-2 px-8 sm:w-[100%] w-[100%] sm:px-8 mt-2 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-b-md">
                      Learn more →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-[1400px] w-full m-auto sm:py-8 sm:px-4 px-4 lg:px-4 relative group">
            <p class="text-black-color text-2xl font-semibold my-8 sm:my-0">
              API integrations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 lg:px-4">
              {slides.map((item, key) => (
                <div
                  className="bg-white flex flex-col justify-between cursor-pointer shadow-lg hover:translate-y-[-4px] transition-transform duration-300 integration_cards"
                  style={{
                    border: "1px solid rgb(237, 237, 237)",
                    borderRadius: "8px",
                  }}
                  key={key}
                >
                  <div className="p-6 sm:p-8 md:py-7 md:px-4 ">
                    <div className="relative w-[35px] h-[35px] gap-2 rounded-lg m-auto mb-5">
                      <Image
                        fill={"true"}
                        className="bg-contain mx-auto w-full rounded-lg"
                        alt="logo.png"
                        src={item.logo}
                      />
                    </div>
                    <h5 className="mb-4 text-center font-semibold text-xl md:text-h6 sm:leading-2 lg:text-h6 sm:text-h6 text-black js-show-on-scroll">
                      {item.title}
                    </h5>
                    <div className="flex flex-co justify-start items-center gap-4">
                      <p className="text-black text-center text-base sm:text-para opacity-70 js-show-on-scroll">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <div className="learnmore_integration_btn">
                    <button class="learnmore_integration py-2 px-8 sm:w-[100%] w-[100%] sm:px-8 mt-2 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-b-md">
                      Learn more →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
