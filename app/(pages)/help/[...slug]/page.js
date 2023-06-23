"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import data from "../../../data/article.json";
import articleData from "../../../data/subarticle.json";
import Button from "@/app/components/Common/Button/Button";
import Link from "next/link";
import article_detail from "../../../data/article_detail.json";
import Container from "@/app/components/Container/Container";

import { getHelpPosts } from "@/app/API/pages/Wpdata";
import Loading from "@/app/components/Loading/Loading";
import Image from "next/image";


const Page = ({ params }) => {
   console.log("adss",params.slug  )


  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getHelpPosts(params).then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-white py-6 sm:py-5 help">
      <Container>
        <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8 px-0 sm:px-4 lg:px-4 relative group">
          <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className="col-span-1 sm:col-span-8 my-2 ml-5 sm:ml-4">
  

              {/* {hobbies} */}

      {/* Test help category */}

                {loading == true ? (
                  <Loading />
                ) : (
                  <div className="bg-white py-4">
                    <div className="my-8 mx-auto max-w-[90%]">
                      <div className="">
                        <h1 className="text-h6 sm:text-h2 md:text-h2 lg:text-h2 sm:leading-8 my-2 sm:mt-6 font-semibold text-heading">
                          {jobs[0]?.title.rendered}
                        </h1>
                        <p className="text-heading font-normal text-para pt-3">
                          {jobs[0]?.acf?.help_title_content}
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-h6 sm:text-h4 md:text-h4 lg:text-h4 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
                          {jobs[0]?.acf?.intercom}
                        </h3>
                        <p className="text-heading font-normal text-para pt-3">
                          {jobs[0]?.acf?.intercom_content}
                        </p>
                        <div className="relative w-[570px] h-[470px]">
                        <Image
                          fill={true}
                          src={`${jobs[0]?.acf?.imgurl}`}
                          className="bg-contain mx-auto"
                          alt="img"
                        />
                      </div>
                      </div>
                      <div className="">
                        <h3 className="text-h6 sm:text-h4 md:text-h4 lg:text-h4 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
                          {jobs[0]?.acf?.watchademo}
                        </h3>
                        <p className="text-heading font-normal text-para pt-3">
                          {jobs[0]?.acf?.watch_a_demo_content}
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-h6 sm:text-h4 md:text-h4 lg:text-h4 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
                          {jobs[0]?.acf?.intercomfeatures}
                        </h3>
                        <p className="text-heading font-normal text-para pt-3">
                          {jobs[0]?.acf?.intercom_features_content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
      {/* Test help category end*/}

            <div className="col-span-1 sm:col-span-4">
              {/* sidebar */}
              {/* <div
                className="border-1 mt-10 relative sm:fixed top-auto sm:top-48"
                style={{ borderLeft: "2px solid #e5e7eb" }}
              >
                {article?.article[0]?.data?.map((faq, index) => (
                  <Link href={`${faq?.slug}`} key={index}>
                    <div className="relative">
                      <p
                        className="flex items-center space-x-2 px-4 py-2"
                        style={{ color: "rgb(115 115 115)" }}
                      >
                        <span>{faq?.name}</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div> */}
              {/* sidebar */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
