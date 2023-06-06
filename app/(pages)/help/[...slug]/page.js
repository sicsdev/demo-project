"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import data from "../../../data/article.json";
import articleData from "../../../data/subarticle.json";
import Button from "@/app/components/Common/Button/Button";
import Link from "next/link";
import ss from "../../../data/article_detail.json";

const Page = ({ params }) => {
  const [article, setArticle] = useState();
  const [subArticle, setSubArticle] = useState();

  const hobbies = ss.map((element, index) => (
    <>
      <div key={index}>
        <h2 className="font-semibold text-2xl md:text-2xl lg:text-2xl sm:text-2xl text-black mb-5 mt-6 js-show-on-scroll">
          {element?.name}
        </h2>
        <h5 className="text-left text-1xl mb-6 tracking-wide sm:text-1xl md:text-1xl lg:text-1xl">
          {element.subheader}
        </h5>
        <div className="flex flex-co justify-start items-center gap-4 js-show-on-scroll">
          <div className="mr-2 flex shrink-0 items-center justify-center rounded-full leading-normal ">
            <img
              width="24"
              height="24"
              src="https://static.intercomassets.com/avatars/2/square_128/0000002-1665139916.jpg"
              alt=""
              className="inline-flex items-center justify-center rounded-full bg-primary text-lg font-bold leading-6 text-white shadow-solid-2 shadow-white [&amp;:nth-child(n+2)]:hidden lg:[&amp;:nth-child(n+2)]:inline-flex h-6 w-6 z-4"
            />
          </div>

          <div className="js-show-on-scroll">
            <p className="text-100 bold color-neutral-100 text-black opacity-70">
              Written by Damon Alexander{" "}
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
        </div>
        <p className="mt-10">{element.title_def}</p>
        <div className="inline  h-6 mt-5 sm:m-0 md:m-0 lg:m-0">
          <Button
              className={
                "mt-5 py-[11px] px-2 w-70 focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900"
              }
            >
              {element.button_one}
            </Button>
        </div>
      </div>
    </>
  ));

  useEffect(() => {
    if (params.slug.length == 1) {
      console.log("slug length", params.slug.length);
      setArticle(data.find((slug) => slug.slug === params.slug[0]));
    } else if (params.slug.length == 2) {
      setSubArticle(articleData.find((ele) => ele.slug == params.slug[1]));
    } else {
      console.log("not defined");
    }
  }, [params.slug]);

  console.log(article);
  console.log(subArticle);

  return (
    <div className="bg-white py-6 sm:py-5 help" >
      <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
        <div class="grid grid-cols-1 sm:grid-cols-12">
          <div class="col-span-1 sm:col-span-8 my-2 ml-5 sm:ml-4">
            {article === undefined ? (
              " "
            ) : (
              <>
                <div className="">
                  <div>
                  <h5 className="text-left text-1xl mb-6 tracking-wide sm:text-1xl md:text-1xl lg:text-1xl" style={{color:"rgba(34,34,34)"}}>
                  All Collections &#8594; {article.name}
                </h5>
                    <h1 className="text-left text-2xl mb-6 tracking-wide sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold text-heading ">
                      {/* {params?.slug}  */}
                      Intercom Overview
                    </h1>
                    <p
                      className="font-normal text-base sm:text-lg my-4 text-black opacity-80 js-show-on-scroll
                    overflow-hidden line-clamp-3 sm:font-medium h-18 
                    "
                    >
                      See how your customer service solution works.
                    </p>
                  </div>
                  {/* <div className="flex flex-co justify-start items-center gap-4 js-show-on-scroll">
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
                        By Des and 12 others{" "}
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
                        16 articles{" "}
                      </p>
                    </div>
                  </div>{" "} */}
                </div>
              </>
            )}

            {/* {subArticle === undefined ? (
              ""
            ) : (
              <>
                <h5 className="text-left text-1xl mb-6 tracking-wide sm:text-1xl md:text-1xl lg:text-1xl my-2  ml-5 sm:ml-4">
                  All Collections &#8594; {subArticle.name}
                </h5>
                <h2 className="font-semibold text-2xl md:text-2xl lg:text-2xl sm:text-2xl text-black mb-3 js-show-on-scroll">
                  {subArticle?.name}
                </h2>
                <h5 className="text-left text-1xl mb-6 tracking-wide sm:text-1xl md:text-1xl lg:text-1xl my-2  ml-5 sm:ml-4">
                  {subArticle.subheader}
                </h5>
                <div className="flex flex-co justify-start items-center gap-4 js-show-on-scroll">
                  <div className="mr-2 flex shrink-0 items-center justify-center rounded-full leading-normal ">
                    <img
                      width="24"
                      height="24"
                      src="https://static.intercomassets.com/avatars/2/square_128/0000002-1665139916.jpg"
                      alt=""
                      className="inline-flex items-center justify-center rounded-full bg-primary text-lg font-bold leading-6 text-white shadow-solid-2 shadow-white [&amp;:nth-child(n+2)]:hidden lg:[&amp;:nth-child(n+2)]:inline-flex h-6 w-6 z-4"
                    />
                  </div>

                  <div className="js-show-on-scroll">
                    <p className="text-100 bold color-neutral-100 text-black opacity-70">
                      Written by Damon Alexander{" "}
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
                </div>
                <p className="mt-10">{subArticle.title_def}</p>
                <div className="inline  h-6 mt-5 sm:m-0 md:m-0 lg:m-0">
                  <button
                    className={
                      "py-[11px] px-2  w-70 focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900"
                    }
                  >
                    {subArticle.button_one}
                  </button>
                </div>
              </>
            )} */}

            {hobbies}
          </div>

          <div class="col-span-1 sm:col-span-4">
            {/* sidebar */}
            <div
              className="border-1 mt-10 relative sm:fixed top-auto sm:top-48"
              style={{ borderLeft: "2px solid #e5e7eb" }}
            >
              {article?.article[0]?.data?.map((faq, index) => (
                <Link href={`${faq?.slug}`} key={index}>
                  <div class="relative">
                    <p
                      className="flex items-center space-x-2 px-4 py-2"
                      style={{ color: "rgb(115 115 115)" }}
                    >
                      <span>{faq?.name}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {/* sidebar */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
