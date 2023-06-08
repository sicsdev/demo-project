"use client";
import { data } from "autoprefixer";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { getHelpContent } from "@/app/API/pages/Wpdata";
import subArticle from "../../data/subarticle.json";
const slides = [
  {
    logo: "https://downloads.intercomcdn.com/i/o/413548/68ab50b2f4f155cc5e3af208/2bbe53ee6af29a766d79344e1ea19c97.png",
    background: `bg-sky`,
    name: "Intercom Overview",
    slug: "help/intercom-overview",
    title:
      "Everything you need to know to get started with Intercom you need to know to get started with Intercom See how your customer service solution works.",
    authors: "13 authors",
    articles: "16 articles",
    brand: "Perry",
  },
  {
    logo: "https://downloads.intercomcdn.com/i/o/413549/054b6b10aa2d16162599ee15/7f24055579819389d173ef129f9229c1.png",
    background: `bg-orange`,
    title:
      "Everything you need to know to get started with Intercom you need to know to get started with Intercom",
    name: "Getting Started",
    authors: "12 authors",
    articles: "58 articles",
    brand: "LabPass",
    slug: "help/getting-started",
  },
  {
    logo: "https://downloads.intercomcdn.com/i/o/413551/6be00b1bcf7682a45c0283b8/ca6f2b29513a2af85e89c8d1194a4582.png",
    background: `bg-neon`,
    title:
      "Set up and use the next-gen Inbox to give your teammates and customers a modern experience.",
    name: "Inbox",
    authors: "10 authors",
    articles: "61 articles",
    brand: "Simple Senti",
    slug: "help/inbox",
  },
  {
    logo: "https://downloads.intercomcdn.com/i/o/413548/68ab50b2f4f155cc5e3af208/2bbe53ee6af29a766d79344e1ea19c97.png",
    background: `bg-sky`,
    name: "Intercom Overview",
    title:
      "Everything you need to know to get started with Intercom you need to know to get started with Intercom See how your customer service solution works.",
    authors: "13 authors",
    articles: "16 articles",
    brand: "Perry",
    slug: "help/intercom-overview",
  },
  {
    logo: "https://downloads.intercomcdn.com/i/o/413549/054b6b10aa2d16162599ee15/7f24055579819389d173ef129f9229c1.png",
    background: `bg-orange`,
    title:
      "Everything you need to know to get started with Intercom you need to know to get started with Intercom",
    name: "Getting Started",
    authors: "12 authors",
    articles: "58 articles",
    brand: "LabPass",
    slug: "help/getting-started",
  },
  {
    logo: "https://downloads.intercomcdn.com/i/o/413551/6be00b1bcf7682a45c0283b8/ca6f2b29513a2af85e89c8d1194a4582.png",
    background: `bg-neon`,
    title:
      "Set up and use the next-gen Inbox to give your teammates and customers a modern experience.",
    name: "Inbox",
    authors: "10 authors",
    articles: "61 articles",
    brand: "Simple Senti",
    slug: "help/inbox",
  },
  {
    logo: "https://downloads.intercomcdn.com/i/o/413548/68ab50b2f4f155cc5e3af208/2bbe53ee6af29a766d79344e1ea19c97.png",
    background: `bg-sky`,
    slug: "help/intercom-overview",
    title:
      "Everything you need to know to get started with Intercom you need to know to get started with Intercom See how your customer service solution works.",
    authors: "13 authors",
    articles: "16 articles",
    brand: "Perry",
  },
];

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      logo: "https://downloads.intercomcdn.com/i/o/413548/68ab50b2f4f155cc5e3af208/2bbe53ee6af29a766d79344e1ea19c97.png",
      background: `bg-sky`,
      name: "Intercom Overview",
      slug: "help/intercom-overview",
      title:
        "Everything you need to know to get started with Intercom you need to know to get started with Intercom See how your customer service solution works.",
      authors: "13 authors",
      articles: "16 articles",
      brand: "Perry",
    },
    {
      logo: "https://downloads.intercomcdn.com/i/o/413549/054b6b10aa2d16162599ee15/7f24055579819389d173ef129f9229c1.png",
      background: `bg-orange`,
      title:
        "Everything you need to know to get started with Intercom you need to know to get started with Intercom",
      name: "Getting Started",
      authors: "12 authors",
      articles: "58 articles",
      brand: "LabPass",
      slug: "help/getting-started",
    },
    {
      logo: "https://downloads.intercomcdn.com/i/o/413551/6be00b1bcf7682a45c0283b8/ca6f2b29513a2af85e89c8d1194a4582.png",
      background: `bg-neon`,
      title:
        "Set up and use the next-gen Inbox to give your teammates and customers a modern experience.",
      name: "Inbox",
      authors: "10 authors",
      articles: "61 articles",
      brand: "Simple Senti",
      slug: "help/inbox",
    },
    {
      logo: "https://downloads.intercomcdn.com/i/o/413548/68ab50b2f4f155cc5e3af208/2bbe53ee6af29a766d79344e1ea19c97.png",
      background: `bg-sky`,
      name: "Intercom Overview",
      title:
        "Everything you need to know to get started with Intercom you need to know to get started with Intercom See how your customer service solution works.",
      authors: "13 authors",
      articles: "16 articles",
      brand: "Perry",
      slug: "help/intercom-overview",
    },
    {
      logo: "https://downloads.intercomcdn.com/i/o/413549/054b6b10aa2d16162599ee15/7f24055579819389d173ef129f9229c1.png",
      background: `bg-orange`,
      title:
        "Everything you need to know to get started with Intercom you need to know to get started with Intercom",
      name: "Getting Started",
      authors: "12 authors",
      articles: "58 articles",
      brand: "LabPass",
      slug: "help/getting-started",
    },
    {
      logo: "https://downloads.intercomcdn.com/i/o/413551/6be00b1bcf7682a45c0283b8/ca6f2b29513a2af85e89c8d1194a4582.png",
      background: `bg-neon`,
      title:
        "Set up and use the next-gen Inbox to give your teammates and customers a modern experience.",
      name: "Inbox",
      authors: "10 authors",
      articles: "61 articles",
      brand: "Simple Senti",
      slug: "help/inbox",
    },
    {
      logo: "https://downloads.intercomcdn.com/i/o/413548/68ab50b2f4f155cc5e3af208/2bbe53ee6af29a766d79344e1ea19c97.png",
      background: `bg-sky`,
      slug: "help/intercom-overview",
      name: "Intercom Overview",

      title:
        "Everything you need to know to get started with Intercom you need to know to get started with Intercom See how your customer service solution works.",
      authors: "13 authors",
      articles: "16 articles",
      brand: "Perry",
    },
  ]);
  const [WpData, setWpData] = useState([]);
  useEffect(() => {
    getHelpContent().then((res) => setWpData(res.data));
  }, []);

  const [showSearch, setShowSearch] = useState(false);
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (e.target.value.length == 0) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }

    const results = subArticle.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };
  console.log(searchResults);

  return (
    <>
      <div className="bg-white py-6 sm:py-5 help">
        <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
          <h1 className="text-left text-2xl mb-6 tracking-wide sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold text-heading ml-5 sm:ml-4">
            Advice and answers from the Intercom Team
          </h1>
          <div className="relative">
            <div
              className="relative flex items-center mx-4 shadow mb-16"
              style={{ boxShadow: "0 10px 20px rgba(0,0,0,.9))" }}
            >
              <input
                type="text"
                placeholder="Search for articles ..."
                onChange={(e) => handleSearch(e)}
                className="w-full rounded-l px-4 py-6 pl-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <img className="w-8 absolute left-5" src="/search.png" />
            </div>
            {showSearch ? (
              <>
                <div
                  className="absolute  	justify-start z-10 w-[100%]   max-h-[auto]  min-h-[100px] flex items-baseline  p-8 shadow-none mb-16  "
                  style={{ background: "white" }}
                >
                  <div className="flex flex-col	justify-center w-[100%]">
                    {searchResults.map((ele, key) => (
                      <Link href={`help/${ele.first_slug + "" + ele.slug}`}>
                        <div className="mb-14 shadow p-5 " key={key}>
                          <h2 className="font-semibold text-2xl md:text-2xl lg:text-2xl sm:text-2xl text-black mb-3 js-show-on-scroll">
                            {ele.name}
                          </h2>
                          <p
                            className="font-normal text-base sm:text-lg  text-black opacity-80 js-show-on-scroll
                    overflow-hidden line-clamp-3 font-medium text-lg h-18 mb-4
                    "
                          >
                            {ele.subheader}
                          </p>
                          <div className="flex flex-co justify-start items-center gap-2 js-show-on-scroll">
                            <div className="mr-2 flex shrink-0 items-center justify-center rounded-full leading-normal ">
                              <img
                                width="24"
                                height="24"
                                src="https://static.intercomassets.com/avatars/2/square_128/0000002-1665139916.jpg"
                                alt=""
                                className="inline-flex items-center justify-center rounded-full bg-primary text-lg font-bold leading-6 text-white shadow-solid-2 shadow-white [&amp;:nth-child(n+2)]:hidden lg:[&amp;:nth-child(n+2)]:inline-flex h-6 w-6 z-4"
                              />
                       
                            </div>


<div className="flex flex-col">
                            <div className="js-show-on-scroll ">
                              <p className="text-100 bold color-neutral-100 text-black opacity-70">
                                Written by Damon Alexander
                              </p>
                            </div>

                            <div className="js-show-on-scroll">
                              <p className="text-100 bold color-neutral-100 text-black opacity-70">
                                Updated over a week ago
                              </p>
                            </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 px-4 lg:px-4 mb-6">
            {slides.length == 0 ? (
              <h1 className="text-center text-2xl mb-6 tracking-wide sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold text-heading ml-5 ">
                no data found !
              </h1>
            ) : (
              ""
            )}
            {slides.map((item, key) => (
              <Link href={`${item?.slug}`} key={key}>
                <div
                  className="bg-white shadow-lg rounded-lg p-6"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  <div className="py-45 px-35">
                    <div>
                      <img className="w-8 pb-4" src={item.logo} />
                      <h2 className="font-semibold text-2xl md:text-2xl lg:text-2xl sm:text-2xl text-black mb-3 js-show-on-scroll">
                        {item.name}
                      </h2>
                      <p
                        className="font-normal text-base sm:text-lg my-4 text-black opacity-80 js-show-on-scroll
                    overflow-hidden line-clamp-3 font-medium text-lg h-18 mb-14
                    "
                      >
                        "{item.title}"
                      </p>
                    </div>
                    <div className="flex flex-co justify-start items-center gap-4 js-show-on-scroll">
                      <div className="mr-2 flex shrink-0 items-center justify-center rounded-full leading-normal ">
                        <img
                          width="24"
                          height="24"
                          src="https://static.intercomassets.com/avatars/2/square_128/0000002-1665139916.jpg"
                          alt=""
                          className="inline-flex items-center justify-center rounded-full bg-primary text-lg font-bold leading-6 text-white shadow-solid-2 shadow-white [&amp;:nth-child(n+2)]:hidden lg:[&amp;:nth-child(n+2)]:inline-flex h-6 w-6 z-4"
                        />
                        <img
                          width="24"
                          height="24"
                          src="https://static.intercomassets.com/avatars/1228308/square_128/Wave_Groot-1495029022.png"
                          alt=""
                          className="inline-flex items-center justify-center rounded-full bg-primary text-lg font-bold leading-6 text-white shadow-solid-2 shadow-white [&amp;:nth-child(n+2)]:hidden lg:[&amp;:nth-child(n+2)]:inline-flex h-6 w-6 z-3 -ml-1.5"
                        />
                        <img
                          width="24"
                          height="24"
                          src="https://static.intercomassets.com/avatars/39405/square_128/0039405-1665140002.jpg"
                          alt=""
                          className="inline-flex items-center justify-center rounded-full bg-primary text-lg font-bold leading-6 text-white shadow-solid-2 shadow-white [&amp;:nth-child(n+2)]:hidden lg:[&amp;:nth-child(n+2)]:inline-flex h-6 w-6 z-2 -ml-1.5"
                        />
                      </div>

                      <div className="js-show-on-scroll">
                        <p className="text-100 bold color-neutral-100 text-black opacity-70">
                          {item.authors}
                        </p>
                      </div>
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="opacity-70"
                      >
                        <path d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8Z"></path>
                      </svg>

                      <div className="js-show-on-scroll">
                        <p className="text-100 bold color-neutral-100 text-black opacity-70">
                          {item.articles}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
