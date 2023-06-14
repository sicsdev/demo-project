"use client";
import React from "react";
import Container from "../Container/Container";
import { useState } from "react";

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
  const organizationCounts = {};

  
  // Iterate over the data array
  data.forEach((item) => {
    const organization = item.organization.trim();

    // Increment the count for the organization
    organizationCounts[organization] =
      (organizationCounts[organization] || 0) + 1;
  });

  const duplicateOrganizations = Object.entries(organizationCounts)
    .filter(([_, count]) => count > 1)
    .map(([organization, count]) => ({ organization, count }));

  return (
    <Container>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          {" "}
          <h3 className="text-h4 font-semibold"> Open roles </h3>
        </div>
        <div>
          <div className="flex gap-4 justify-end items-center mr-4">
            Filter:
            <div className="flex rounded-3xl justify-end items-center">
              <div className="relative py-1 px-5   border rounded-l-3xl">
                <button
                  className=""
                  type="btn"
                  onClick={() => {
                    showOrganization === 0
                      ? setShowOrganization(null)
                      : setShowOrganization(0);
                  }}
                >
                  Location
                </button>
                {showOrganization === 0 && (
                  <div className="z-10 border  bg-white absolute divide-y divide-gray-100 rounded-lg shadow w-44 ">
                    <ul
                      className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownSearchButton"
                    >
                      {data.map((ele,key) => (
                        <li key={key}>
                          <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              id="checkbox-item-11"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              for="checkbox-item-11"
                              className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {ele.location}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative py-1 px-5 border border-l-0 rounded-r-3xl">
                <button
                  className=""
                  type="btn"
                  onClick={() => {
                    showOrganization === 1
                      ? setShowOrganization(null)
                      : setShowOrganization(1);
                  }}
                >
                  Organization
                </button>
                {showOrganization === 1 && (
                  <div className="z-10 border  bg-white absolute divide-y divide-gray-100 rounded-lg shadow w-44 ">
                    <ul className="py-2 p-3  text-sm text-gray-700 ">
                      {duplicateOrganizations.map((ele,key) => (
                        <div className="flex items-center  rounded hover:bg-gray-100 dark:hover:bg-gray-600" key={key}>
                          <input
                            id="checkbox-item-11"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            checked
                          />
                          <label
                            for="checkbox-item-11"
                            className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            {ele.organization} ({ele.count})
                          </label>
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
                placeholder="Search "
                className="w-full rounded-l px-4 pl-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <img className="w-8 absolute left-5" src="/search.png" />
            </div>
          </div>
        </div>
        {data.map((ele) => (
          <div className="p-4 flex gap-4 flex-col">
            <p className="text-h6">{ele.organization}</p>
            <p className="underline mt-3">{ele.jobName}</p>
            <p className="text-para mt-3">{ele.location}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Jobsection;
