"use client";
import React from "react";
import Container from "@/app/components/Container/Container";
import { getCareersContent } from "@/app/API/pages/Wpdata";
import { useEffect } from "react";
import { useState } from "react";
const Career = () => {
  const [career, setCareer] = useState([]);
  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    getCareersContent().then(
      (res) => {
        setCareer(res.data.posts);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  
  return (
    <div className=" bg-white py-4 ">
      <div className="my-8 mx-auto max-w-[90%]">
        <h1 className="text-center text-h6 sm:text-h2 md:text-h2 lg:text-h2 sm:leading-8 my-2 sm:my-6 font-semibold text-heading" >
          {career[0]?.title}
        </h1>
        <div  dangerouslySetInnerHTML={{ __html: career[0]?.content }}></div>
      </div>
    </div>
  );
};

export default Career;
