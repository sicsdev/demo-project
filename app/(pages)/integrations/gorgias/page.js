"use client"
import React, { useEffect, useState } from "react";

import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";

const page = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="bg-white sm:p-[120px] sm:p-12 p-2 text-center">
      <div className="grid grid-cols-1  sm:grid-cols-[20%_60%_20%] ">
      <div className="mt-4">
      <div class="stick-right">
        <div className="check-in-action hidetablet relative cursor-pointer">
        {loading ? (
          <SkeletonLoader count={1} height={40} width="70%" />
        ) : (
          <div>
          <Link href="/integrations">
            <ArrowLongLeftIcon className="h-6 w-6 text-gray-500 absolute" />
            <h3 className="check-text text-xl sm:mr-[80px]">Back to all</h3>
          </Link>
          </div>
        )}
        </div>
        <div className="text-start mt-[9rem]  hidden  sm:block">
          <p className="text-[#363866]  sm:mb-1 text-l">
          {loading ? (
            <SkeletonLoader count={1} height={20} width="50%" />
          ) : (
            "Website:"
          )}</p>
          <p className="text-[#ff5721] !font-semibold sm:mb-3 text-l">
          {loading ? (
            <SkeletonLoader count={2} height={20} width="80%" />
          ) : (
            " www.ada.cx"
          )}
          </p>
          {loading ? (
            <SkeletonLoader count={1} height={20} width="80%" />
          ) : (
          <p className="text-[#363866] !font-semibold sm:mb-1 text-[15px]">
            <span className="text-[#ff5721]">
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </span>{" "}
            &nbsp; 
              Watch the demo
          </p>
          )}

          {loading ? (
            <SkeletonLoader count={1} height={20} width="80%" />
          ) : (
          <p className="text-[#363866] !font-semibold sm:mb-1 text-[15px]">
            <span className="text-[#ff5721]">
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </span>{" "}
            &nbsp;
              Read the brochure
          </p>
          )}
        </div>
      </div>
    </div>

        <div>
          <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]  sm:justify-between my-[21px] sm:my-0">
            <div className=" flex flex-col justify-evenly">
              <p className="text-[#ff5721] font-bold">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="70%" />
              ) : (
                "Gorgias API Integration"
              )}
              </p>

              <h2 className="!font-bold text-h3 text-left">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                "Gorgias"
              )}</h2>
            </div>

            <div className="">
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
              <img src="/geo.png" className="w-[120px] h-[120px]"></img>
            )}
            </div>
          </div>

          <div className="text-left sm:mt-7 p-[24px] sm:p-0">
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "Streamline Customer Support and Business Operations with RESTful API"
            )}
            </p>
            {/* <p className="text-heading text-xl">

              Add our Chrome extension so you can book meetings in one click

              from Gmail, Outlook, Salesforce, FrontSpin and more.

            </p> */}
            {/* <div>

            <img

              src="https://assets-global.website-files.com/61c9fe00acd90d5e82f7014d/61c9fe00acd90d0392f70340_tonik-images-transparent-install-extension.png"

              className="w-[full] sm:[465px] sm:h-[465px]"

            />

          </div> */}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
              Why Choose Gorgias API?{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
              Unified Customer Management:{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl">
              Retrieve, create, update, and delete customer profiles
              effortlessly.{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              Automated Rule Setting:{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl">
              Manage rules to automate your customer support and business
              processes.
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              Ticketing Simplified:{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl">
              Handle all your customer tickets in one place for optimal support.{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="50%" />
          ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              How It Works
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold  sm:mt-[20px] text-xl">
              1.Secure Authentication
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl sm:mb-3">
              Connect your Gorgias account securely with your application.{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold   text-xl">
              2. Resource Management
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl sm:mb-3">
              Utilize Gorgias' RESTful API to manage customers, rules, tickets,
              teams, and users.{" "}
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-[#363866] !font-semibold  text-xl">
              3.Data Utilization
            </p>
          )}
          {loading ? (
            <SkeletonLoader count={1} height={20} width="100%" />
          ) : (
            <p className="text-heading text-xl sm:mb-3">
              Leverage Tempo's analytics to gain valuable insights from your
              Shopify data, enabling continuous business improvement.{" "}
            </p>
          )}
            <div>
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
              <img
                src="/integration_page/Gorgias_tab-1.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            )}
            </div>
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[35px] text-xl">
              Key Features
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Customer Profiles:</b>Comprehensive management of customer
              data.
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b> Ticket Handling: </b>Efficiently manage all customer tickets.
            </p>)}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              <b>Rule Automation:</b>Create and manage rules to automate various
              tasks.
            </p>
            )}
            <div>
            {loading ? (
              <SkeletonLoader count={1} height={60} width={140} />
            ) : (
              <img
                src="/integration_page/Gorgias_tab2.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            )}
            </div>
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
              Get Started
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-heading text-xl sm:mb-3">
              Ready to optimize your customer support and business operations?
              Integrate Gorgias API today.{" "}
            </p>
            )}
            {loading ? (
              <SkeletonLoader count={1} height={20} width="100%" />
            ) : (
            <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
              Integrate Now
            </p>
            )}
          </div>

          {/* <div className="sm:mt-5">

            <img

              src="https://assets-global.website-files.com/61c9fe00acd90d5e82f7014d/61c9fe00acd90d16e3f70364_tonik-images-transparent-suggested-times.png"

              className="w-[full] sm:[465px] sm:h-[465px]"

            />

          </div>     */}
        </div>

        <div className="p-12">
        <div class="stick-right ">
          <div className="rounded-[20px] bg-white  shadow-2xl w-full sm:w-[286px] sm:p-[56px]">
            <p className="text-[20px] text-[#363866] sm:mb-3 font-semibold">
            {loading ? (
              <SkeletonLoader count={2} height={20} width="100%" />
            ) : (
              "See how it works with Tempo Chat"
            )}
            </p>
            <div className="block text-center  ">
              <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8 sm:mt-0">
                <div className="block sm:flex justify-center w-[100%] items-center gap-8">
                {loading ? (
                  <SkeletonLoader count={2} height={80} width={100} />
                ) : (
                  <button
                    className={
                      "mb-4 sm:mb-0 uppercase py-[18px] px-2  font-bold w-[177px] focus:ring-yellow-300 text-white bg-[#FF5721] hover:bg-black dark:focus:ring-yellow-900 rounded-2xl"
                    }
                  >
                    Get A demo
                  </button>
                )}
                </div>
              </div>
            </div>
          </div>
     
          <div className="grid  sm:ml-[7rem] gap-[20px] mt-[28px]">
            <a href="https://www.linkedin.com/company/temposcoail">
              {" "}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <img
                className="h-[42px] !w-[39px] max-w-none cursor-pointer"
                src="/linkedin_faded.svg"
                alt=""
              />
              )}
            </a>
            <a href="https://twitter.com/usetempo">
              {" "}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <img
                className="h-[42px] !w-[39px] max-w-none cursor-pointer"
                src="/twitter_faded.svg"
                alt=""
              />
              )}
            </a>
            <a href="https://www.facebook.com/usetempo">
              {" "}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <img
                className="h-[42px] !w-[39px] cursor-pointer"
                src="/facebook_faded.svg"
                alt=""
              />
              )}
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default page;
