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
    <div className="bg-white  px-[20px] sm:px-0  sm:pl-[10%] ">
      <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
        <div className="sm:w-[70%]">
          {" "}
          {loading ? (
            <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
              <SkeletonLoader height={40} width={580} />
            </h1>
          ) : (
            <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
              {single?.acf?.article_name || (
                <SkeletonLoader height={40} width={580} />
              )}
            </h1>
          )}
          {loading ? (
            <p className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
              <SkeletonLoader height={40} width={200} />
            </p>
          ) : (
            <p className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading">
              {single?.acf?.aritcle_para_t || (
                <SkeletonLoader height={40} width={580} />
              )}
            </p>
          )}
          {loading ? (
            <h1
              id={removeSpacesAndHyphens(single?.acf?.first_head)}
              className=" font-bold px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h5 sm:text-h2 sm:leading-none"
            >
              {" "}
              <SkeletonLoader height={40} width={800} />
            </h1>
          ) : (
            <h1
              id={removeSpacesAndHyphens(single?.acf?.first_head)}
              className=" font-bold px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h5 sm:text-h2 sm:leading-none"
            >
              {" "}
              {single?.acf?.first_head || (
                <SkeletonLoader height={40} width={800} />
              )}
            </h1>
          )}
          {loading ? (
            <h1 className="pb-6 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading">
              {" "}
              <SkeletonLoader height={40} width={580} />
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
              <SkeletonLoader height={40} width={580} />
            </h1>
          ) : (
            <h1
              id={removeSpacesAndHyphens(single?.acf?.sedond_head)}
              className=" font-bold px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h5 sm:text-h2 sm:leading-none"
            >
              {single?.acf?.sedond_head || (
                <SkeletonLoader height={40} width={580} />
              )}
            </h1>
          )}
            {loading ? (
            <h1
              id={removeSpacesAndHyphens(single?.acf?.first_head)}
              className=" font-bold px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h5 sm:text-h2 sm:leading-none"
            >
              {" "}
              <SkeletonLoader height={40} width={800} />
            </h1>
          ) :
          <p
            style={{ marginBottom: "0px" }}
            className="pb-6 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
            dangerouslySetInnerHTML={
              { __html: single?.acf?.article_para_copy } || (
                <SkeletonLoader height={40} width={580} />
              )
            }
          ></p>}
          {loading ? (
            <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
              {" "}
              <SkeletonLoader height={40} width={580} />
            </p>
          ) : single?.acf?.article_para_copy == null ? (
            <SkeletonLoader height={40} width={580} />
          ) : (
            <h1 className="mt-2.5 font-bold  text-2xl   md:text-h4 lg:text-h5 sm:text-h4 sm:leading-none ">
              Want to know more?
            </h1>
          )}
          {loading ? (
            <p className="underline-offset-1 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
              <SkeletonLoader height={40} width={200} />
            </p>
          ) : (
            <p className="underline-offset-1 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
              <ul
                className="
            list-disc cursor-pointer"
              >
                <Link href="/solutions/tempo-chat">
                  <li>
                    {single?.acf?.article_para_copy == null ? (
                      <SkeletonLoader height={40} width={580} />
                    ) : (
                      <u>Solutions: Tempo Chat</u>
                    )}
                  </li>
                </Link>
                <Link href="/solutions/smart-inbox">
                  <li>
                    {single?.acf?.article_para_copy == null ? (
                      <SkeletonLoader height={40} width={580} />
                    ) : (
                      <u>Solutions: Smart Inbox</u>
                    )}
                  </li>
                </Link>
                <Link href="/solutions/smart-social">
                  <li>
                    {single?.acf?.article_para_copy == null ? (
                      <SkeletonLoader height={40} width={580} />
                    ) : (
                      <u>Solutions: Smart Social</u>
                    )}
                  </li>
                </Link>
              </ul>
            </p>
          )}
          <div className="mt-[60px]">
            {loading ? (
              <h1 className="mt-2.5 mb-5 font-bold  text-2xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
                {" "}
                <SkeletonLoader height={40} width={580} />
              </h1>
            ) : (
              <h1 className="mt-2.5 mb-5 font-bold  text-2xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
                {single?.acf?.article_para_copy == null ? (
                  <SkeletonLoader height={40} width={580} />
                ) : (
                  "Related Articles"
                )}
              </h1>
            )}
            {loading ? (
              <div className="border-2 rounded-xl mb-[25px] sm:w-[42rem]">
                {" "}
                <SkeletonLoader height={40} width={580} />
              </div>
            ) : (
              <div className="border-2 rounded-xl mb-[25px] sm:w-[42rem]">
                {filterPosts?.map((ele, key) => (
                  <>
                    {" "}
                    <Link key={key} href={`/article/${ele.slug}`}>
                      <p className="cursor-pointer ml-3 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading hover:bg-backhover">
                        {single?.acf?.article_para_copy == null ? (
                          <SkeletonLoader height={40} width={580} />
                        ) : (
                          ele?.title
                        )}
                      </p>
                    </Link>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="hidden sm:block w-[30%]">
          <div
            style={{
              borderLeft: "solid 1px",
              height: "300px",
              overflowY: "scroll",
            }}
            className="top-0 fixed mt-[130px]"
          >
            {loading ? (
              <p className="hidden sm:block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
                <SkeletonLoader height={40} width={200} />
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
                    single?.acf?.first_head
                  )}`}
                >
                  {loading ? (
                    <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                      {" "}
                      <SkeletonLoader height={40} width={580} />
                    </p>
                  ) : (
                    <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                      {single?.acf?.first_head || (
                        <SkeletonLoader height={40} width={580} />
                      )}
                    </p>
                  )}
                </Link>
                <Link
                  href={`${scrollSlug}#${removeSpacesAndHyphens(
                    single?.acf?.sedond_head
                  )}`}
                >
                  {" "}
                  {loading ? (
                    <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                      {" "}
                      <SkeletonLoader height={40} width={580} />
                    </p>
                  ) : (
                    <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                      {single?.acf?.sedond_head || (
                        <SkeletonLoader height={40} width={580} />
                      )}
                    </p>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
