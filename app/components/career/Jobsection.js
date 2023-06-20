"use client";
import React from "react";
import Container from "../Container/Container";
import { useState, useEffect } from "react";
import { getAllJobs } from "@/app/API/pages/Wpdata";
import Link from "next/link";
const Jobsection = () => {
  const [showOrganization, setShowOrganization] = useState(null);
  const data = [
    {
      organization: "Customer Support",
      jobName: "Customer Support Specialist 1",
      location: "Chicago, Illinois",
    },
    {
      organization: "Customer Support",
      jobName: "Customer Support Engineer",
      location: "Dublin, Ireland",
    },
    {
      organization: "Finance and Biz Ops",
      jobName: "Billing Operations Specialist",
      location: "Chicago, Illinois",
    },
    {
      organization: "Finance and Biz Ops",
      jobName: "Accounts Payable Specialist        ",
      location: "Dublin, Ireland",
    },
    {
      organization: "Finance and Biz Ops",
      jobName: "Senior Manager, Strategic Planning & Operations  ",
      location: "San Francisco, California      ",
    },
    {
      organization: "Marketing",
      jobName: "Senior Brand Designer, Web      ",
      location: "San Francisco, California      ",
    },
    {
      organization: "Marketing",
      jobName: "Senior Social Content Creator      ",
      location: "Dublin, Ireland      ",
    },
    {
      organization: "People      ",
      jobName: "Senior HR Business Partner",
      location: "Dublin, Ireland      ",
    },
    {
      organization: "Product",
      jobName: "Director of Web      ",
      location: "Dublin, Ireland      ",
    },
    {
      organization: "Engineering      ",
      jobName: "DevRel Engineer      ",
      location: "Dublin, Ireland      ",
    },
    {
      organization: "Engineering      ",
      jobName: "DevRel Engineer      ",
      location: "London, England        ",
    },
    {
      organization: "Engineering      ",
      jobName: "Engineering Manager, Machine Learning Team      ",
      location: "Dublin, Ireland      ",
    },
    {
      organization: "Engineering      ",
      jobName: "Product Engineer      ",
      location: "Dublin, Ireland      ",
    },
    {
      organization: "Product Management    ",
      jobName: "Product Manager",
      location: "Dublin, Ireland  ",
    },
    {
      organization: "Product Management    ",
      jobName: "Product Manager - Web",
      location: "London, England",
    },
    {
      organization: "Sales Business Systems        ",
      jobName: "Senior Salesforce CPQ Engineer        ",
      location: "USA, Remote",
    },
  ];
  const [myjob, setMyJob] = useState([]);
  const [job, setJob] = useState([]);

  useEffect(() => {
    getAllJobs().then((res) => {
      setMyJob(res.data);
      setJob(res.data);
      setShowOrganization(res.data)
    });
  }, []);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length == 0) {
      setMyJob(job);
    }
    const results = job?.filter((item) =>
      item?.title?.rendered?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMyJob(results);
  };

  return (
    <Container>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="text-center">
          {" "}
          <h3 className="text-xl sm:text-h4 font-semibold hidden sm:block">
            {" "}
            Open roles{" "}
          </h3>
        </div>
        <div>
          <div className="flex gap-4 justify-end items-center mr-4">
            Filter:
            <div className="flex rounded-3xl justify-end items-center">
              <div className="relative py-1 px-5 border ">
                <button
                  className=""
                  type="btn"
                  // onClick={() => {
                  //   showOrganization === 1
                  //     ? setShowOrganization(null)
                  //     : setShowOrganization(1);
                  // }}
                >
                  Organization
                </button>
                {showOrganization === 1 && (
                  <div className="z-10 border  bg-white absolute divide-y divide-gray-100 rounded-lg shadow w-44 ">
                    <ul className="py-2 p-3  text-sm text-gray-700 ">
                      {showOrganization?.map((ele, key) => (
                        <div
                          className="flex items-center  rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                          key={key}
                        >
                          <input
                            id="checkbox-item-11"
                            type="checkbox"
                            // value={ele?.title?.rendered}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            onChange={async (e) => {
                              let value = data.filter(
                                (ele) => ele.organization == e.target.value
                              );
                              console.log(value);
                              setJob(value);
                            }}
                          />
                          <label
                            for="checkbox-item-11"
                            className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
{ele?.title?.rendered}                          </label>
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div
              className="relative flex items-center mx-4 shadow rounded p-1"
              style={{ boxShadow: "0 10px 20px rgba(0,0,0,.9))" }}
            >
              <input
                type="text"
                onChange={(e) => handleSearch(e)}
                placeholder="Search "
                className="w-full rounded-l px-4 pl-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <img className="w-8 absolute left-5" src="/search.png" />
            </div>
          </div>
        </div>
        {myjob?.map((ele, key) => (
          <div className="p-4 flex gap-4 flex-col" key={key}>
            <p className="text-h6">{ele?.title?.rendered}</p>
            <Link href={`careers/${ele?.slug}`}>
              <p className="underline mt-3">{ele?.title?.rendered}</p>
            </Link>
            <p className="text-para mt-3">{ele?.acf?.location}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Jobsection;
