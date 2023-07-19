"use client";
import React, { useEffect, useState } from "react";
import { getArticlePage, getAllArticles } from "@/app/API/pages/Wpdata";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Link from "next/link";


const page = () => {
  const[article, setArticle]= useState([]);
  const [single, setSingle] = useState("");
  const [loading, setLoading] = useState(true);

  const scrollSlug =
  "/article/email-agent-settings";
  useEffect(() => {
    let params = "email-agent-settings";
    getArticlePage(params).then((res) => {
      setSingle(res.data[0]);
      console.log("resss", res);
    });
    relatedPosts();
  }, []);

  const relatedPosts=()=>{
    getAllArticles().then(
      (res) => {
        setArticle(res.data.posts);
        sekeletonData()
      },
      (err) => {
        console.log(err);
      }
    );
  }
  const sekeletonData = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const filterPosts = article.filter((x)=>x.ID != single.id);
console.log("filterposts",filterPosts )

  console.log("single", single);

  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "_");
    }
  };


  return (
    <div className="bg-white  px-[20px] sm:px-0  sm:pl-[10%] ">
    <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
        <div className="sm:w-[70%]">
   <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
      {single?.acf?.article_name || (
        <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
      )}
    </h1>
    <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
    >{single?.acf?.aritcle_para_t|| (
      <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
    )}</p>
    <p
    style={{ marginBottom: "0px" }}
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para }|| (
        <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
      )}
    ></p>
         {single?.acf?.article_name == null?   <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" /> :   <div  style={{ marginBottom: "0px" }} className="mb-4 sm:mb-4 sm:w-[20%] sm:m-auto py-4 mx-6">
          <button
     

            className={
              "py-2  focus:ring-yellow-300 text-white w-full  mt-2 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold bg-primary hover:bg-primary dark:focus:ring-yellow-900 rounded-lg"
            }
          >
            <Link
              href="/checkout
"
            >
              Get Started &#8594;{" "}
            </Link>
          </button>
        </div>}
        {loading ? (
            <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
              {" "}
              <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
            </p>
          ) : single?.acf?.article_para_copy == null ? (
            <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
          ) : (
            <h1 className="mt-2.5 font-bold  text-2xl   md:text-h4 lg:text-h5 sm:text-h4 sm:leading-none ">
              Want to know more?
            </h1>
          )}
          {loading ? (
            <p className="underline-offset-1 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
              <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
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
                      <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
                    ) : (
                      <u>Solutions: Tempo Chat</u>
                    )}
                  </li>
                </Link>
                <Link href="/solutions/smart-inbox">
                  <li>
                    {single?.acf?.article_para_copy == null ? (
                      <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
                    ) : (
                      <u>Solutions: Smart Inbox</u>
                    )}
                  </li>
                </Link>
                <Link href="/solutions/smart-social">
                  <li>
                    {single?.acf?.article_para_copy == null ? (
                      <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
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
                <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
              </h1>
            ) : (
              <h1 className="mt-2.5 mb-5 font-bold  text-2xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none ">
                {single?.acf?.article_para_copy == null ? (
                  <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
                ) : (
                  "Related Articles"
                )}
              </h1>
            )}
            {loading ? (
              <div className="border-2 rounded-xl mb-[25px] sm:w-[42rem]">
                {" "}
                <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
              </div>
            ) : (
              <div className="border-2 rounded-xl mb-[25px] sm:w-[42rem]">
                {filterPosts?.map((ele, key) => (
                  <>
                    {" "}
                    <Link key={key} href={`/article/${ele.slug}`}>
                      <p className="cursor-pointer ml-3 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading hover:bg-backhover">
                        {single?.acf?.article_para_copy == null ? (
                          <SkeletonLoader className="h-[40px] sm:h-[70px] sm:w-[800px]" />
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
                <SkeletonLoader className="h-[70px] sm:h-[30px] sm:w-[580px]"/>
              </p>
            ) : (
              <p className="hidden sm:block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
                {single?.acf?.article_para_copy == null ||
                  " Table of contents  "}
              </p>
            )}

      
          </div>
        </div>
        </div>
  </div>
  )
}

export default page