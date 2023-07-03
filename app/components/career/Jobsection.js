"use client";
import React from "react";
import Container from "../Container/Container";
import { useState, useEffect } from "react";
import { getAllJobs } from "@/app/API/pages/Wpdata";
import Link from "next/link";
import Image from "next/image";

const Jobsection = () => {
  const [showOrganization, setShowOrganization] = useState(null);
 
  const [myjob, setMyJob] = useState([]);
  const [job, setJob] = useState([]);
  const [selectedValue, setSelectedValues] = useState([]);
  const [showfiltercheckboxes, setShowfiltercheckboxes] = useState(false);

  useEffect(() => {
    getAllJobs().then((res) => {
      setMyJob(res.data);
      setJob(res.data);
      setShowOrganization(res.data);
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

  const handleCheckboxChange = (value) => {
    const updatedValues = [...selectedValue];
    const index = updatedValues.indexOf(value);
    if (index === -1) {
      updatedValues.push(value);
    } else {
      updatedValues.splice(index, 1);
    }
    setSelectedValues(updatedValues);
  };
  const filteredData = job?.filter((ele) => {
    return selectedValue.includes(ele?.title?.rendered);
  });
  const handlerShowFilterCheckboxes = () => {
    setShowfiltercheckboxes((showfiltercheckboxes) => !showfiltercheckboxes);
  };

  useEffect(() => {
    setSelectedValues(myjob.map((ele) => ele?.title?.rendered));
  }, [myjob]);

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
                  className="flex justify-center items-center gap-3"
                  type="btn"
                  onClick={handlerShowFilterCheckboxes}
                >
                  Organization
                  <div className="relative w-[30px] h-[30px]">
                        <Image
                          fill={true}
                          src="/down-arrow.png"
                          className="bg-contain rounded-full mx-auto"
                          alt="img"
                        />
                  </div>
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
                            {ele?.title?.rendered}{" "}
                          </label>
                        </div>
                      ))}
                    </ul>
                  </div>
                )}

                {/* filter_checkboxes */}
                {showfiltercheckboxes ? (
                  <div
                    className="sm:min-w-[262px] filter_checkboxes absolute shadow-lg z-30 p-4 rounded-lg flex flex-col justify-start text-left
                 bg-white ml-auto mr-auto top-10 left-auto right-auto
                "
                  >
                    {myjob?.map((ele, key) => (
                      <div key={key} className="p-2 flex gap-3 w-full">
                        <input
                          type="checkbox"
                          value={ele.id}
                          checked={selectedValue.includes(ele?.title?.rendered)}
                          onChange={() =>
                            handleCheckboxChange(ele?.title?.rendered)
                          }
                        />
                        <span>{ele?.title?.rendered}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  " "
                )}
                {/* filter_checkboxes end */}
              </div>
            </div>
            <div
              className="relative flex items-center mx-4 shadow rounded p-1"
              style={{ boxShadow: "0 10px 20px rgba(0,0,0,.9))" }}
            >
              <input
                type="text"
                onChange={(e) => handleSearch(e)}
                placeholder="Search"
                className="w-full rounded-l px-4 pl-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <img className="w-8 absolute left-5" src="/search.png" />
            </div>
          </div>
        </div>
        {filteredData?.map((ele, key) => (
          <div className="p-4 flex gap-4 flex-col" key={key}>
            <p className="text-h6">{ele?.title?.rendered}</p>
            <Link href={`careers/careers-detail?careerName=${ele?.slug}`}>
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
