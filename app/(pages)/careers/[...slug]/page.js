"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCareersJobs } from "@/app/API/pages/Wpdata";
import Loading from "@/app/components/Loading/Loading";
const Page = ({ params }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCareersJobs(params).then((res) => {
      setJobs(res.data);
      setLoading(true);
    });
  }, []);
  return (
    <div>
      {loading == true ? (
        <Loading />
      ) : (
        <div className=" bg-white py-4 ">
          <div className="my-8 mx-auto max-w-[90%]">
            <h1 className="text-h6 sm:text-h2 md:text-h2 lg:text-h2 sm:leading-8 my-2 sm:mt-6 font-semibold text-heading">
              {jobs[0]?.title.rendered}
            </h1>
            <p className="text-[12px]">{jobs[0]?.acf?.location}</p>

            <p className="text-heading font-normal text-para  pt-3">
              {jobs[0]?.acf?.career_f1}
            </p>
            <p className="text-heading font-normal text-para  pt-3">
              {jobs[0]?.acf?.career_f2}
            </p>
            <p className="text-heading font-normal text-para  pt-3">
              {jobs[0]?.acf?.career_f3}
            </p>
            <h3 className="text-h6 sm:text-h4 md:text-h4 lg:text-h4 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
              {jobs[0]?.acf?.job_description}
            </h3>
            <div className="grid grid-cols-2 gap-4 ">
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.jobs_f1}
              </p>
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.jobs_f2}
              </p>
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.jobs_f3}
              </p>
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.jobs_f4}
              </p>
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.jobs_f5}
              </p>
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.jobs_f6}
              </p>
            </div>
            <h3 className="text-h6 sm:text-h4 md:text-h4 lg:text-h4 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
              {jobs[0]?.acf?.job_requirements}
            </h3>
            <div className="grid grid-cols-2 gap-4 ">
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.job_requirements_f1}
              </p>
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.job_requirements_f2}
              </p>
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.job_requirements_f3}
              </p>
              <p className="text-heading font-normal text-para  pt-3">
                &#10003; {jobs[0]?.acf?.job_requirements_f4}
              </p>
            </div>
            <h3 className="text-h6 sm:text-h4 md:text-h4 lg:text-h4 sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
              {jobs[0]?.acf?.equal_opportunity}
            </h3>
            <p className="text-heading font-normal text-para  pt-3">
            {jobs[0]?.acf?.equal_opportunity_1}

            
            </p>
            <p className="text-heading font-normal text-para  pt-3">
            {jobs[0]?.acf?.equal_opportunity_2}

            
            </p>
            <p className="text-heading font-bold  sm:mt-8">
      To apply, please send an email to  <span className="text-[blue]"> <Link href="mailto:careers@usetempo.ai"> careers@usetempo.ai </Link></span> with the name of the position to which you’re applying in the title. Applications without a resume and cover letter will not be considered.
   
      </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
