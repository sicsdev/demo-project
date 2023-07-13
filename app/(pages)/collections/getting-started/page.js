"use client";
import React, { useEffect, useState } from "react";
import { getArticleCategory } from "@/app/API/pages/Wpdata";
import Link from "next/link";

const page = () => {
  const [single, setSingle] = useState([]);
// const [rev, setRev]= useState([])
  useEffect(() => {
    getArticleCategory().then((res) => {
      setSingle(res.data.reverse());
    });
  }, []);

  console.log("single", single);

  return (
    <div className="bg-[white]  px-[20px] sm:px-0  sm:pl-[10%] pb-[83px]">
      <div>
        <h2 className="font-bold  px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
          Getting started
        </h2>
        <div className="border-2 rounded-lg mt-[60px] w-[68rem]">
          {single.slice(3,single.length)?.map((ele,key)=>
          <Link href={`${"/article/"}${ele.slug}`}>
            <p key={key} className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">
             {ele.title.rendered}
            </p>
          </Link>
           )} 
        </div>
      </div>
    </div>
  );
};

export default page;
