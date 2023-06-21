"use client";
import React from "react";
import Container from "@/app/components/Container/Container";
import { getCareersContent } from "@/app/API/pages/Wpdata";
import { useEffect } from "react";
import { useState } from "react";
import Jobsection from "@/app/components/career/Jobsection";
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
        <h3 className="text-h4 font-semibold">
        Discovering New Possibilities Through Disruption: Join the Tempo Team        </h3>
        <p class="text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
        Tempo is a cutting-edge company that is leading the way in the field of generalizable AI. Our team of skilled developers specialize in LLMs, AI, and machine learning, allowing us to provide clients with groundbreaking solutions for their customer experience needs. We have an ambitious vision to use our technology to revolutionize the service industry and create a lasting impact on how businesses interact with their customers. By investing in our innovative team and leveraging our proprietary technology, we are confident that we can make this vision a reality.
        </p>
        <p class=" text-base sm:text-para md:text-para lg:text-para sm:leading-8 my-2 sm:my-6 font-base text-heading">
          Customer service teams from more than 25,000 global organizations rely
          on Intercom to deliver efficient and personal customer experiences at
          scale.
        </p>
        <div className="pb-4 sm:pb-16 cursor-pointer mx-auto max-w-[90%]">
          <div
            className={
              "bg-background block sm:flex sm:flex-wrap md:flex md:flex-row lg:flex lg:flex-row justify-between shadow-2xl rounded-lg py-8 px-8 sm:py-20 md:py-20 lg:py-20  sm:px-12 lg:px-12 md:px-12   items-center relative"
            }
          >
            <div className=" sm:w-[100%] md:w-[50%] lg:w-[50%]">
              {" "}
              <h2 className=" font-bold  text-2xl  md:text-h2 lg:text-h2 sm:text-h2 sm:leading-none   text-white  ">
                Don't see the role you're interested in? Sign up to our Talent
                Community to stay in touch.
              </h2>
            </div>
            <div className="block sm:grid md:grid lg:grid grid-cols-2 gap-4">
              <button
                type={"submit"}
                className={
                  " w-full  p-2  focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                }
              >
                sign up &#8594;
              </button>
            </div>
          </div>
        </div>
        <Jobsection />
      </div>
    </div>
  );
};

export default Career;
