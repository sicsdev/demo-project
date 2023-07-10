"use client";
import React, { useEffect, useState } from "react";
import { getArticlePage, getAllArticles } from "@/app/API/pages/Wpdata";
import Link from "next/link";
import Button from "@/app/components/Common/Button/Button";

const page = () => {
  const[article, setArticle]= useState([]);

  const [single, setSingle] = useState("");
  const scrollSlug =
    "/article/pricing-overview";
  useEffect(() => {
    let params = "pricing-overview";

    getArticlePage(params).then((res) => {
      setSingle(res.data[0]);
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

  const filterPosts = article.filter((x)=>x.ID != single.id);
console.log("filterposts",filterPosts )
  console.log("single", single);

  const removeSpacesAndHyphens = (slug) => {
    if (slug) {
      return slug?.replace(/\s+/g, "_");
    }
  };


  return (
    <div className="bg-white  px-[20px] sm:px-0  sm:pl-[10%]">
      <div className="block sm:flex md:flex lg:flex justify-evenly items-center gap-10">
        <div className="sm:w-[70%]">
      <h1 className="font-bold text-center px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
        {single?.acf?.article_name}
      </h1>
      <p className=" text-heading px-4 pt-8">{single?.acf?.aritcle_para_t}</p>
      <p     id={removeSpacesAndHyphens(single?.acf?.first_head)} className="font-bold px-4 pt-8 text-heading text-2xl md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none">
        {single?.acf?.first_head}
      </p>
      <p
        className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
        dangerouslySetInnerHTML={{ __html: single?.acf?.article_para }}
      ></p>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4 sm:mt-0">
        <table className="mt-3 sm:mt-0 text-sm text-left text-gray-500 dark:text-gray-400 sm:w-[60%] mx-6 sm:mx-auto m-auto shadow-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-[#09162A] text-white rounded-tl-lg text-center sm:pr-16"
              >
                {single?.acf?.table_head1}
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-[#09162A] text-white rounded-tr-lg text-center"
              >
                {single?.acf?.table_head2}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:pr-16"
              >
                {single?.acf?.row1l}
              </th>

              <td className="px-6 py-4">{single?.acf?.row1r}</td>
            </tr>
            <tr
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:pr-16"
              >
                {single?.acf?.row2l}
              </th>

              <td className="px-6 py-4">{single?.acf?.row2r}</td>
            </tr>
            <tr
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:pr-16"
              >
                {single?.acf?.row3l}
              </th>

              <td className="px-6 py-4">
                {single?.acf?.row3r}
                <p
                  className="text-[blue] font-bold"
                  dangerouslySetInnerHTML={{
                    __html: `
                `,
                  }}
                ></p>
                <Button
                  type={"submit"}
                  className={
                    "mr-2 py-[6px] mt-2 px-2 focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-voilet-900"
                  }
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `
       <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
       <span className="underline cursor-pointer text-white"> Schedule Demo
       </span>
       </a>
      `,
                    }}
                  />
                </Button>
              </td>
            </tr>
            <tr
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:pr-16"
              >
                {single?.acf?.row4l}
              </th>

              <td className="px-6 py-4">{single?.acf?.row4r}</td>
            </tr>
            <tr
              className="bg-white dark:bg-gray-800  hover:bg-gray-50 dark:hover:bg-gray-600"
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:pr-16"
              >
                {single?.acf?.row5l}
              </th>

              <td className="px-6 py-4">{single?.acf?.row5r}</td>
            </tr>
            <tr
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {single?.acf?.row6l}
              </th>

              <td className="px-6 py-4">{single?.acf?.row6lr}</td>
            </tr>
          </tbody>
        </table>

        <p
          className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
          dangerouslySetInnerHTML={{ __html: single?.acf?.article_para_copy }}
        ></p>
        <table className="ml-auto mr-auto mt-5 sm:mt-0 text-sm text-left text-gray-500 dark:text-gray-400 sm:w-[40%] mx-6 sm:mx-auto m-auto shadow-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-[#09162A] text-white rounded-tl-lg text-center"
              >
                {single?.acf?.table2_head_1}{" "}
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-[#09162A] text-white rounded-tr-lg text-center"
              >
                {single?.acf?.table2_head_2}{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {single?.acf?.table2_row1l}
              </th>

              <td className="px-6 py-4">{single?.acf?.table2_row1r}</td>
            </tr>
            <tr
              className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {single?.acf?.table2_row2l}
              </th>

              <td className="px-6 py-4">{single?.acf?.table2_row2r}</td>
            </tr>
            <tr
              className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
              style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {single?.acf?.table2_row3l}
              </th>

              <td className="px-6 py-4">{single?.acf?.table2_row3r}</td>
            </tr>
          </tbody>
        </table>
        <p
          className="text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
          dangerouslySetInnerHTML={{ __html: single?.acf?.article_para_copy2 }}
        ></p>
        <div className="mt-4 sm:mt-4 mx-6 sm:w-[20%] text-center sm:m-auto">
          <button
            className={
              "py-2  focus:ring-yellow-300 text-center text-white w-full mt-2 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold bg-primary hover:bg-primary dark:focus:ring-yellow-900 rounded-lg "
            }
          >
            <Link href="/free-trial">Enterprise Demo  &#8594; </Link>

          </button>
        </div>
        <p   id={removeSpacesAndHyphens(single?.acf?.sedond_head)} className="font-bold px-4 pt-8 text-heading text-2xl md:text-h4 lg:text-h4 sm:text-h4 sm:leading-none">
          {single?.acf?.sedond_head}
        </p>
        <p
          className=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading"
          dangerouslySetInnerHTML={{ __html: single?.acf?.article_para_copy3 }}
        ></p>
        <div className="mb-4 sm:mb-4 sm:w-[20%] sm:m-auto py-4 mx-6">
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
        </div>
      </div>
      <h1
            className="mt-2.5 font-bold  text-2xl   md:text-h4 lg:text-h5 sm:text-h4 sm:leading-none "
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
          <div className="border-2 rounded-xl mb-[25px] sm:w-[42rem]">
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
        
        <div   style={{
              borderLeft: "solid 1px",
              height: "300px",
              overflowY: "scroll",
            }} className="top-0 fixed mt-[130px]">
        <p className="hidden sm:block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
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
              </div>
              </div>
            </div>
      </div>
      </div>
    </div>
  );
};

export default page;
