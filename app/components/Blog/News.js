import React, { useEffect, useState } from "react";
import { getArticleCategory, getCareerCategory, getBlogsPage } from "@/app/API/pages/Wpdata";
import Link from "next/link";

const News = () => {
const [career, setCareer] = useState([])
  const [article, setArticle] = useState([]);
const [blog, setBlog] = useState([])
  const findArticle=()=>{
    getArticleCategory().then(
      (res) => {
        setArticle(res.data[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  const findblog=()=>{
    getBlogsPage().then(
      (res) => {
        setBlog(res.data[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  const findCareer=()=>{
    getCareerCategory().then(
      (res) => {
        setCareer(res.data[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  useEffect(() => {
    findArticle();
    findCareer();
    findblog();
  }, []);


console.log("blog", career)
// careers/careers-detail?careerName=account-manager
// {`${scrollSlug}#${removeSpacesAndHyphens(single?.acf?.heading1)}`}
  return (
    <div className=" bg-white  ">
      
      <div className="my-8 mx-auto max-w-[100%]">
        <h1 className="text-center text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
          Latest News
        </h1>
        <hr class="h-px  bg-gray-200 sm:border-b-0 lg:border-b-0 md:border-b-0 border-b-0 dark:bg-gray-700 " />

        <div className="grid grid-cols-2 sm:grid-cols-4 text-center ">
       
            <div
              className={`border-r relative w-full mx-auto mt-6 hover:text-[black]  p-4 mr-3`}
            
            >
              {/* <p className="text-[12px] mb-3">{element.name}</p> */}
              <p className="text-black font-bold">{article?.title?.rendered}</p>
            </div>
            <Link href={`careers/careers-detail?careerName=${career.slug}`}>
            <div
              className={`border-r relative w-full mx-auto mt-6 hover:text-[black]  p-4 mr-3`}
            
            >
              {/* <p className="text-[12px] mb-3">{element.name}</p> */}
              <p className="text-black font-bold">{career?.title?.rendered}</p>
            </div>
            </Link>
            <div
              className={`border-r relative w-full mx-auto mt-6 hover:text-[black]  p-4 mr-3`}
            
            >
              {/* <p className="text-[12px] mb-3">{element.name}</p> */}
              <p className="text-black font-bold">{blog?.title?.rendered}</p>
            </div>
            <div
              className={`border-r relative w-full mx-auto mt-6 hover:text-[black]  p-4 mr-3`}
            
            >
              {/* <p className="text-[12px] mb-3">{element.name}</p> */}
              <p className="text-black font-bold">{article?.title?.rendered}</p>
            </div>
       
        </div>
      </div>
      <hr class="h-px my-8 bg-gray-200 border-b-0 dark:bg-gray-700 left-0" />
    </div>
  );
};

export default News;
