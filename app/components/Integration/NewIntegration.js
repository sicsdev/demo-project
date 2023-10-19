"use client";
import React, { useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import SelectOption from "../Common/Input/SelectOption";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import newintegration from "../../data/newintegration.json";
import Link from "next/link";
import SkeletonLoader from "../Skeleton/Skeleton";
const NewIntegration = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const threeCards = [
    {
      name: "Convert more leads into revenue with Reachdesk",
      logo: "https://assets-global.website-files.com/61c9fe00acd90d5e82f7014d/6464b5466e113b5f1b76c5ee_Reachdesk_R_75x75.png",
    },
    {
      name: "Convert software buyers on G2 into qualified prospect meetings.",
      logo: "https://assets-global.website-files.com/61c9fe00acd90d5e82f7014d/6328d6525c15c081ad5acfc9_g2-integration.png",
    },
    {
      name: "Reduce form fields and make it easier to convert",
      logo: "https://assets-global.website-files.com/61c9fe00acd90d5e82f7014d/62c2cf3c96ec97df58ec6f0e_Logo%20-%20Clearbit.png",
    },
  ];
  const data = [
    "ALL",
    "Popular",
    "Productivity",
    "Sales",
    "Communications",
    "Billing",
  ];
  const [searchTerm, setSearchTerm] = useState("");

  const [show, setSHow] = useState(false);
  const [integrationData, setIntegrationData] = useState(newintegration);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
    const filteredData = newintegration.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setIntegrationData(filteredData);
  };

  const handleSelect = (element) => {
    if (element == "ALL") {
      return newintegration;
    }
    setIntegrationData(newintegration.filter((ele) => ele.name == element));
  };
  const [showCat, setShowCat] = useState(data[0])
  return (
    <div className="bg-white  ">
      <div className="filter-res text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-[0px] gap-6">
          {threeCards.map((ele) => (
            <div className="rounded-[20px]  sm:mx-0  hover:shadow-2xl	  cursor-pointer sm:h-[310px] h-[235px] sm:w-[full] w-[85%] mt-[10px] mb-[10px] mx-auto" style={{ boxShadow: "0px 0px 7px 0px rgba(179,177,179,1)" }}>
              <div className="text-center  justify-center my-auto sm:m-auto h-full flex flex-col p-5 ">
                <div className="relative w-[55px] h-auto   sm:h-[30px] text-center m-auto">
                  {loading ? (
                    <SkeletonLoader count={1} height={40} width="100%" />
                  ) : (
                    <img
                      src={ele.logo}
                      className=" mx-auto  sm:w-[55px]  sm:h-[55px]"
                      fill={true}
                    />
                  )}
                </div>
                <p className="mt-3  sm:mt-12 text-[#FF5721]">
                  {loading ? (
                    <SkeletonLoader count={1} height={30} width="40%" />
                  ) : (
                    " FEATURED"
                  )} </p>
                {loading ? (
                  <SkeletonLoader count={3} height={30} width="100%" />
                ) : (
                  <p className=" mt-2 sm:mt-8  font-bold text-xl w-[302px]  m-auto mb-[10px]">
                    {" "}
                    {ele.name}{" "}
                  </p>
                )}
                <div className="relative flex">
                  {loading ? (
                    <SkeletonLoader count={1} height={30} width="100%" />
                  ) : (
                    <img
                      src="https://assets-global.website-files.com/61c9fe00acd90d7271f7014e/62251410eddd384fb5578407_red%20arrow.svg"
                      class="firs-arr h-6 w-6 text-[#FF5721] m-auto font-bold mt-6"
                    />
                  )}
                  {loading ? (
                    <SkeletonLoader count={1} height={30} width="100%" />
                  ) : (
                    <img
                      src="https://assets-global.website-files.com/61c9fe00acd90d7271f7014e/62251410eddd384fb5578407_red%20arrow.svg"
                      class="second-arr first-letter:h-6 w-6 text-[#FF5721] m-auto font-bold sm:mt-6 mt-0"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-cards text-center sm:mt-[84px] pb-5 px-4 mt-[30px]">
        <div className="flex justify-between items-start sm:flex-row flex-col">
          <div className="w-full">
            <div
              onClick={() => setSHow(!show)}
              className="mb-4  !w-[100%] max-w-[420px] cursor-pointer bg-white border-1 justify-between items-center  flex py-[6px] px-[24px] rounded-[20px] shadow-xl"
            >
              <div>
                <span className="text-[#9c9db4]">
                  {loading ? (
                    <SkeletonLoader count={1} height={20} width="100%" />
                  ) : (
                    "choose category"
                  )}
                </span>
                <p className="text-heading text-left">{showCat} </p>
              </div>
              <ChevronDownIcon class="h-6 w-6 text-[#ff611e]" />
            </div>
            {show ? (
              <div className="bg-white p-5 rounded-[20px] shadow-md !w-[100%] max-w-[420px]">
                {data.map((ele) => (
                  <div
                    className="rounded  w-[225px] text-start pb-3 cursor-pointer"
                    onClick={() => {
                      setSHow(false);
                      setShowCat(ele);
                      handleSelect(ele);
                    }}
                  >
                    <p>{ele}</p>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="text-right h-[60px]  flex justify-end  w-[100%] sm:w-[220px]">
            <div className="relative w-[100%] sm:w-[220px] ">
              <div
                className="absolute w-[100%] sm:w-[220px] inset-y-1
               bottom-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                onChange={handleSearch}
                id="search"
                value={searchTerm}
                className="flex h-[60px]  bg-white border-1 rounded-[20px] justify-between items-center py-[8px] px[24px] w-full p-2 focus:outline-none focus:border-sky focus:ring-2 pl-10 text-sm text-gray-900 border border-border "
                placeholder="Search"
              />
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="filter-cards text-center sm:mt-[84px] pb-5 px-4 w-[90%] mx-[auto]">
        <div className="grid  grid-cols-1 sm:grid-cols-4 gap-[20px] sm:gap-[40px] ">
          {integrationData.map((ele) => (
            <Link href={`${ele.link}`}>

              <div className="integration_card_ani rounded-[20px] hover:shadow-2xl	  cursor-pointer sm:h-[200px] h-[165px] w-[full] mt-[10px] mb-[10px]" style={{ boxShadow: "0px 0px 7px 0px rgba(179,177,179,1)" }}>
                <div className="flex justify-between relative sm:h-[130px] h-[110px]">
                  <div className="sm:pt-0 pt-4 pl-5">
                    {loading ? (
                      <SkeletonLoader count={1} height={80} width={120} />
                    ) : (
                      <div>
                        <img
                          className="w-[56px] h-[56px] object-contain"
                          src={ele?.logo}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="uppercase text-[#696a85] text-right bg-[#f8f9fa] max-w-[117px] py-[4px] px-[8px] text-[10px] left-auto right-[0%] absolute top-[40px] bottom-auto">
                    {loading ? (
                      <SkeletonLoader count={1} height={20} width={120} />
                    ) : (<div>
                      {ele.name}{" "}
                      </div>)}
                    </p>
                  </div>
                </div>
                <p className="text-start font-semibold pl-7 text-[22px]">
                  {" "}
                  {loading ? (
                    <SkeletonLoader count={1} height={20} width={120} />
                  ) : (<div>
                  {ele.title}
                  </div>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewIntegration;