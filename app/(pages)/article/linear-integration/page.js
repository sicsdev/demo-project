"use client";
import React, { useEffect, useState } from "react";
import { getArticlePage, getAllArticles } from "@/app/API/pages/Wpdata";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Link from "next/link";

const page = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  const [single, setSingle] = useState("");
  const scrollSlug = "/article/linear-integration";
  useEffect(() => {
    let params = "linear-integration";
    getArticlePage(params).then((res) => {
      setSingle(res.data[0]);
    });
    relatedPosts();
  }, []);

  const relatedPosts = () => {
    getAllArticles().then(
      (res) => {
        setArticle(res.data.posts);
        sekeletonData();
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const sekeletonData = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const filterPosts = article.filter((x) => x.ID != single?.id);

  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "_");
    }
  };
  return (
    <div className="bg-white px-[20px] sm:px-0  sm:pl-[3%]">
    <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-5">
      <div className="sm:w-[74%] mt-[25px]">
      {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
          </h1>
        ) : (
          <h1 className="font-bold sm:text-center sm:mt-0 mt-[2rem] text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            {single?.acf?.article_name || (
              <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
            )}
          </h1>
        )}
        {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="h-[70px] sm:h-[70px] sm:w-[800px]" />
          </h1>
        ) : (
          <p className="  text-base sm:text-para    pt-8 md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading">
            {single?.acf?.aritcle_para_t || (
              <SkeletonLoader className="h-[70px] sm:h-[200px] sm:w-[800px]" />
            )}
          </p>
        )}
        
        {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
          </h1>
        ) : (
          <h1 className="font-bold sm:text-center sm:mt-0 mt-[2rem] text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            {single?.acf?.first_head || (
              <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
            )}
          </h1>
        )}
        {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
          </h1>
        ) : (
          <p
            className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
            dangerouslySetInnerHTML={
              { __html: single?.acf?.article_para } || (
                <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
              )
            }
          ></p>
        )}
          {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
          </h1>
        ) : (
          <p
            id={removeSpacesAndHyphens(single?.acf?.sedond_head)}
            className="font-bold  pt-8 text-heading text-2xl md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none"
          >
            1.{single?.acf?.sedond_head} 
          </p>
        )}
        {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
          </h1>
        ) : (
          <p
            className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
            dangerouslySetInnerHTML={
              { __html: single?.acf?.article_para_copy } || (
                <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
              )
            }
          ></p>
        )}
          {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
          </h1>
        ) : (
          <p
            id={removeSpacesAndHyphens(single?.acf?.third_head)}
            className="font-bold  pt-8 text-heading text-2xl md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none"
          >
            2. {single?.acf?.third_head} 
          </p>
        )}
        {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="sm:h-[70px] sm:w-[58px]" />
          </h1>
        ) : (
          <p
            className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
            dangerouslySetInnerHTML={
              { __html: single?.acf?.article_para_copy2 } || (
                <SkeletonLoader className="sm:h-[70px] sm:w-[580px]" />
              )
            }
          ></p>
        )}
        {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
          </h1>
        ) : (
          <p
            id={removeSpacesAndHyphens(single?.acf?.fourth_head)}
            className="font-bold pb-4 pt-8 text-heading text-2xl md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none"
          >
            {single?.acf?.fourth_head} 
          </p>
        )}
        {loading ? (
          <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
            <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
          </h1>
        ) : (
          <p
            className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8  font-base text-heading"
            dangerouslySetInnerHTML={
              { __html: single?.acf?.article_para_copy3 } || (
                <SkeletonLoader className="sm:h-[70px] sm:w-[800px]" />
              )
            }
          ></p>
        )}
      
      </div>
      <div className="hidden sm:block w-[26%]">
        * <div
          style={{
            borderLeft: "solid 1px",
            height: "300px",
            overflowY: "scroll",
          }}
          className="top-0 fixed mt-[130px]"
        >
          {loading ? (
            <p className="hidden sm:block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
              <SkeletonLoader className="sm:h-[30px] sm:w-[200px]" />
            </p>
          ) : (
            <p className="hidden sm:block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
              {single?.acf?.article_para_copy == null ||
                " Table of contents  "}
            </p>
          )}

          <div className=" ml-4  font-medium SideOptions">
            <div className="group " onClick={(e) => {}}>
            <Link
                href={`${scrollSlug}#${removeSpacesAndHyphens(
                  single?.acf?.sedond_head
                )}`}
              >
                {" "}
                {loading ? (
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    {" "}
                    <SkeletonLoader className="sm:h-[30px] sm:w-[580px]" />
                  </p>
                ) : (
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    1. {single?.acf?.sedond_head}
                  </p>
                )}
              </Link>
              <Link
                href={`${scrollSlug}#${removeSpacesAndHyphens(
                  single?.acf?.third_head
                )}`}
              >
                {" "}
                {loading ? (
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    {" "}
                    <SkeletonLoader className="sm:h-[30px] sm:w-[580px]" />
                  </p>
                ) : (
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    2. {single?.acf?.third_head}
                  </p>
                )}
              </Link>
              <Link
                href={`${scrollSlug}#${removeSpacesAndHyphens(
                  single?.acf?.fourth_head
                )}`}
              >
                {" "}
                {loading ? (
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    {" "}
                    <SkeletonLoader className="sm:h-[30px] sm:w-[580px]" />
                  </p>
                ) : (
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    3. {single?.acf?.fourth_head}
                  </p>
                )}
              </Link>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
  )
}

export default page