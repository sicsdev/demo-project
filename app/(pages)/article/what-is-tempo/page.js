"use client";
import React, { useEffect, useState } from "react";
import { getArticlePage, getAllArticles } from "@/app/API/pages/Wpdata";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Button from "@/app/components/Common/Button/Button";
import Link from "next/link";


const page = () => {
  const[article, setArticle]= useState([]);

  const [single, setSingle] = useState("");
  const scrollSlug =
  "/article/what-is-tempo";
  useEffect(() => {
    let params = "what-is-tempo";
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
       
      },
      (err) => {
        console.log(err);
      }
    );
  }

  const filterPosts = article.filter((x)=>x.ID != 277);
console.log("filterposts",filterPosts )
  console.log("single", single.id);
  console.log("article", article)
  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "_");
    }
  };

  return (
    <div className="bg-white px-[20px] sm:px-0  sm:pl-[10%] ">
     <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
        <div className="sm:w-[70%]">
    <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
      {single?.acf?.article_name || (
        <SkeletonLoader height={40} width={580} />
      )}
    </h1>
    <p
      className="  text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
    >{single?.acf?.aritcle_para_t}</p>
     <div
              className="py-2 sm:px-8 mb-9 sm:mb-0  mt-5 sm:mt-2  focus:ring-yellow-300 text-white sm:w-[23%]  w-full mx-auto text-center  sm:m-0 md:m-0 lg:m-0 text-lg font-semibold bg-primary hover:bg-primary dark:focus:ring-yellow-900 rounded-lg"
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `
       <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
       <span className="underline cursor-pointer text-white"> Schedule Demo
       </span>
       </a>
      `,
                    }}
                  />
                </div>
                <p    id={removeSpacesAndHyphens(single?.acf?.first_head)} className="font-bold px-4 pt-8 text-heading text-2xl md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none">
        {single?.acf?.first_head}
      </p>
    <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2  sm:my-6 font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para }}
    ></p>
        <p  id={removeSpacesAndHyphens(single?.acf?.sedond_head)} className="font-bold px-4 pt-8 text-heading text-2xl md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none">
          {single?.acf?.sedond_head}
        </p>
    <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para_copy }}
    ></p>
     <p  id={removeSpacesAndHyphens(single?.acf?.third_head)} className="font-bold px-4 pt-8 text-heading text-2xl md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none">
          {single?.acf?.third_head}
        </p>
    <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para_copy2 }}
    ></p>
    <p
      className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8  font-base text-heading"
      dangerouslySetInnerHTML={{ __html: single?.acf?.article_para_copy3 }}
    ></p>
      <div  style={{ marginBottom: "0px" }} className="mb-4 sm:mb-4 sm:w-[20%] sm:m-auto py-4 mx-6">
          <button
     

            className={
              "py-2 px-8 focus:ring-yellow-300 text-white w-full  mt-2 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold bg-primary hover:bg-primary dark:focus:ring-yellow-900 rounded-lg"
            }
          >
            <Link
              href="/checkout
"
            >
              Get Started &#8594;{" "}
            </Link>
          </button>
          </div>
          <h1
            className="mt-2.5 font-bold  text-2xl   md:text-h4 lg:text-h5 sm:text-h6 sm:leading-none "
          >
            Want to know more?
          </h1>
          <p className="underline-offset-1 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
            <ul className="
            list-disc cursor-pointer" >
              <li>
                <u>Intercom's AI bot - Fin</u>
              </li>
              <li>
                <u>Intercom's Inbox for customer support</u>
              </li>
              <li>
                <u>Intercom for live chat</u>
              </li>
              <li>
                <u>Intercom for self-service support</u>
              </li>
              <li>
                <u>Intercom for targeted messages and campaigns</u>
              </li>
              <li>
                <u>Intercom for customer engagement</u>
              </li>
              <li>
                <u>Intercom for customer intelligence & analytics</u>
              </li>
            </ul>
          </p>
          <div className="mt-[60px]">
          <h1
            className="mt-2.5 mb-5 font-bold  text-2xl   md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none "
          >
            Related Articles
          </h1>
          <div className="border-2 rounded-xl mb-[25px] w-[42rem]">
          {filterPosts?.map((ele,key)=>
<>   <Link key={key} href={`/article/${ele.slug}`}>
            <p className="cursor-pointer ml-3 text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading hover:bg-backhover">
           
            {ele?.title}
            </p>   
            </Link>     
          </>   )} 
        </div>
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
            <p className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
              Table of contents
            </p>
            <div className=" ml-4  font-medium SideOptions">
              <div
                className="group "
                onClick={(e) => {
                  
                }}
              >
                   <Link href={
                  `${scrollSlug}#${removeSpacesAndHyphens(single?.acf?.first_head)}`
                  }>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                    {single?.acf?.first_head}
                  </p>
                </Link>
                <Link href={
                  `${scrollSlug}#${removeSpacesAndHyphens(single?.acf?.sedond_head)}`
                  }>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                  {single?.acf?.sedond_head}
                  </p>
                </Link>
                <Link href={`${scrollSlug}#${removeSpacesAndHyphens(single?.acf?.third_head)}`}>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[279px]">
                  {single?.acf?.third_head}
                  </p>
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