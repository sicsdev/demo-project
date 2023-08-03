"use client";
import React, { useEffect, useState } from "react";
import { getArticlePage, getAllArticles } from "@/app/API/pages/Wpdata";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Button from "@/app/components/Common/Button/Button";
import Link from "next/link";

const page = () => {
  const [article, setArticle] = useState([]);
  const [single, setSingle] = useState("");
  const [loading, setLoading] = useState(true);

  const scrollSlug = "/article/connecting-your-help-center";
  useEffect(() => {
    let params = "connecting-your-help-center";
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
  const filterPosts = article.filter((x) => x.ID != single.id);

  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "_");
    }
  };
  return (
    <div className="bg-white px-[20px] sm:px-0  sm:pl-[3%] ">
      <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-5">
        <div className="sm:w-[74%]">
          {" "}
          {loading ? (
            <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2  sm:text-h2 sm:leading-none">
              <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
            </h1>
          ) : (
            <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2  sm:text-h2 sm:leading-none">
              {single?.acf?.article_name || (
                <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
              )}
            </h1>
          )}
          {loading ? (
            <p className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2  sm:text-h2 sm:leading-none">
              <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
            </p>
          ) : (
            <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading">
              {single?.acf?.aritcle_para_t || (
                <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
              )}
            </p>
          )}
          {loading ? (
            <h1
              id={removeSpacesAndHyphens(single?.acf?.first_head)}
              className=" font-bold px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h5 sm:text-h2 sm:leading-none"
            >
              {" "}
              <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
            </h1>
          ) : (
            <h1
              id={removeSpacesAndHyphens(single?.acf?.first_head)}
              className=" font-bold px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h5 sm:text-h2 sm:leading-none"
            >
              {" "}
              {single?.acf?.first_head || (
                <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
              )}
            </h1>
          )}
          {loading ? (
            <h1 className="pb-6 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading">
              {" "}
              <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
            </h1>
          ) : (
            <p
              style={{ marginBottom: "0px" }}
              className="pb-6 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
              dangerouslySetInnerHTML={{ __html: single?.acf?.article_para }}
            ></p>
          )}
          {loading ? (
            <h1
              id={removeSpacesAndHyphens(single?.acf?.sedond_head)}
              className=" font-bold px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h5 sm:text-h2 sm:leading-none"
            >
              {" "}
              <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
            </h1>
          ) : (
            <h1
              id={removeSpacesAndHyphens(single?.acf?.sedond_head)}
              className=" font-bold px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h5 sm:text-h2 sm:leading-none"
            >
              {single?.acf?.sedond_head || (
                <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
              )}
            </h1>
          )}
            {loading ? (
            <h1
              id={removeSpacesAndHyphens(single?.acf?.first_head)}
              className=" font-bold px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h5 sm:text-h2 sm:leading-none"
            >
              {" "}
              <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
            </h1>
          ) :
          <p
            style={{ marginBottom: "0px" }}
            className="pb-6 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
            dangerouslySetInnerHTML={
              { __html: single?.acf?.article_para_copy } || (
                <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
              )
            }
          ></p>}
        
        </div>
        <div className="hidden sm:block w-[26%]">
      
        </div>
      </div>
    </div>
  );
};
export default page;
