import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { getArticlePage, getAllArticles ,getArticleCategory} from "@/app/API/pages/Wpdata";
import Link from "next/link";
import SkeletonLoader from "../Skeleton/Skeleton";
export const ArticleSidebar = ({ children }) => {
  const [article, setArticle] = useState([]);
  const [single, setSingle] = useState("");
  useEffect(() => {
    let params = "what-is-tempo";
    getArticlePage(params).then((res) => {
      setSingle(res.data[0]);
    });
    relatedPosts();
  }, []);

  const relatedPosts = () => {
    getArticleCategory().then(
      (res) => {
        console.log(res)
        setArticle(res.data);
      },
      (err) => {}
    );
  };


  const [show, setShow] = useState(false);
  const handler_closemenu = () => {
    setShow(false);
  };
  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "_");
    }
  };
  console.log("article 45", article);
  return (
    <>
      <div className="bg-white sm:flex md:flex lg:flex justify-evenly items-start gap-0">
        <div
          className="sm:w-[20%] hidden sm:block"
          style={{ borderRight: "1px solid #C0C0C0" }}
        >
          <div className="article_left_accordion pt-6">
            {article?.map((ele, key) => (
              <>
                <Accordion allowZeroExpanded style={{ border: "none" }}>
                  <AccordionItem style={{ border: "none" }}>
                    <AccordionItemHeading>
                      <AccordionItemButton
                        style={{
                          background: "transparent",
                          padding: "5px 12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row-reverse",
                        }}
                      >
                        <Link
                          key={key}
                          href={`/article/${ele.slug}`}
                          className="w-full"
                        >
                          <p className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                            {ele?.title?.rendered== null ? (
                              <SkeletonLoader className="sm:h-[70px] sm:w-[580px]" />
                            ) : (
                              ele?.title?.rendered
                            )}
                          </p>
                        </Link>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className=" ml-4  font-medium SideOptions">
                        <div className="group " onClick={(e) => {}}>
                          <Link
                            href={`/article/${ele?.slug}#${removeSpacesAndHyphens(
                              ele?.acf?.first_head
                            )}`}
                          >
                            <p className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                              {ele?.acf?.first_head}
                            </p>
                          </Link>
                          <Link
                            href={`/article/${ele?.slug}#${removeSpacesAndHyphens(
                              ele?.acf?.sedond_head
                            )}`}
                          >
                            <p className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                              {ele?.acf?.sedond_head}
                            </p>
                          </Link>
                          <Link
                            href={`/article/${ele?.slug}#${removeSpacesAndHyphens(
                              ele?.acf?.third_head
                            )}`}
                          >
                            <p className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                              {ele?.acf?.third_head}
                            </p>
                          </Link>
                          <Link
                            href={`/article/${ele?.slug}#${removeSpacesAndHyphens(
                              ele?.acf?.fourth_head
                            )}`}
                          >
                            <p className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                              {ele?.acf?.fourth_head}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </>
            ))}
          </div>
        </div>
        <div className="sm:hidden flex items-center justify-start z-[10] fixed w-full bg-white pl-2 py-3">
          <button
            onClick={() => setShow((prev) => !prev)}
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>

        {show && (
          <div className="block sm:hidden z-[9] w-full fixed top-[auto] bg-white shadow-lg">
            <div className="pb-3 article_left_accordion pt-6 space-y-2 font-medium  w-full relative mb-4">
              {article?.map((ele, key) => (
                <>
                  <Accordion allowZeroExpanded style={{ border: "none" }}>
                    <AccordionItem style={{ border: "none" }}>
                      <AccordionItemHeading>
                        <AccordionItemButton
                          style={{
                            background: "transparent",
                            padding: "5px 12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <Link
                            key={key}
                            href={`/article/${ele.slug}`}
                            className="w-full"
                            onClick={handler_closemenu}
                          >
                            <p className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                              {single?.acf?.article_para_copy == null ? (
                                <SkeletonLoader className="sm:h-[70px] sm:w-[580px]" />
                              ) : (
                                ele?.title?.rendered
                              )}
                            </p>
                          </Link>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                      <div className=" ml-4  font-medium SideOptions">
                        <div className="group " onClick={(e) => {}}>
                          <Link
                            href={`/article/${ele?.slug}#${removeSpacesAndHyphens(
                              ele?.acf?.first_head
                            )}`}
                            
                          >
                            <p 
                            onClick={handler_closemenu}
                            
                            className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                              {ele?.acf?.first_head}
                            </p>
                          </Link>
                          <Link
                            href={`/article/${ele?.slug}#${removeSpacesAndHyphens(
                              ele?.acf?.sedond_head
                            )}`}
                          >
                            <p
                            onClick={handler_closemenu}
                            
                            className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                              {ele?.acf?.sedond_head}
                            </p>
                          </Link>
                          <Link
                            href={`/article/${ele?.slug}#${removeSpacesAndHyphens(
                              ele?.acf?.third_head
                            )}`}
                          >
                            <p
                            onClick={handler_closemenu}
                            
                            className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                              {ele?.acf?.third_head}
                            </p>
                          </Link>
                          <Link
                            href={`/article/${ele?.slug}#${removeSpacesAndHyphens(
                              ele?.acf?.fourth_head
                            )}`}
                          >
                            <p
                            onClick={handler_closemenu}
                            
                            className="cursor-pointer text-base sm:text-para md:text-para lg:text-para sm:leading-8 font-semibold text-[#606770]">
                              {ele?.acf?.fourth_head}
                            </p>
                          </Link>
                        </div>
                      </div>

                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </>
              ))}
            </div>
          </div>
        )}

        <div className="sm:w-[80%] pb-6 pt-10 sm:pt-0">{children}</div>
      </div>
    </>
  );
};
