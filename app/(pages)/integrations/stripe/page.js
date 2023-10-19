"use client"

import React, { useState } from "react";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { useEffect } from "react";

const page = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {/* <div className="bg-white sm:p-[120px] p-12 text-center">
        <div className="grid grid-cols-1  sm:grid-cols-[20%_60%_20%] ">
          <div className="mt-4">
            <div class="stick-right">
              <div className="check-in-action hidetablet relative cursor-pointer">
                <Link href="/new/integrations">
                  <ArrowLongLeftIcon className="h-6 w-6 text-gray-500 absolute" />

                  <h3 className="check-text text-xl sm:mr-[80px]">
                    Back to all
                  </h3>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="flex  justify-center gap-[1rem] items-center flex-col sm:flex-row sm:gap-[80px]  sm:justify-between my-[21px] sm:my-0">
              <div className=" flex flex-col justify-evenly">
                <p className="text-[#ff5721] font-bold">Billing</p>
                <h2 className="!font-bold text-h3 text-center sm:text-left">
                  Stripe
                </h2>
              </div>
              <div className="">
                <img src="/stripee.png" className="w-[120px] h-[120px]"></img>
              </div>
            </div>
            <div className="text-left sm:mt-7">
              <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
                Install Instant Booker
              </p>
              <p className="text-heading text-xl">
                Add our Chrome extension so you can book meetings in one click
                from Gmail, Outlook, Salesforce, FrontSpin and more.
              </p>
            </div>
            <div>
              <img
                src="https://assets-global.website-files.com/61c9fe00acd90d5e82f7014d/61c9fe00acd90d0392f70340_tonik-images-transparent-install-extension.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            </div>
            <div className="text-left sm:mt-7">
              <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
                Book meetings from anywhere
              </p>
              <p className="text-heading text-xl">
                Access your personal scheduling app from anywhere to book
                meetings on your own calendar or a teammate’s.
              </p>
            </div>
            <div className="sm:mt-5">
              <img
                src="https://assets-global.website-files.com/61c9fe00acd90d5e82f7014d/61c9fe00acd90d16e3f70364_tonik-images-transparent-suggested-times.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
            </div>
          </div>
          <div className="p-12">
            <div class="stick-right rounded-[20px] bg-white  shadow-2xl w-full sm:w-[286px] sm:p-[56px]">
              <p className="text-[20px] text-[#363866] sm:mb-3 font-semibold">
                See how it works with Tempo Chat
              </p>
              <div className="block text-center  ">
                <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8 sm:mt-0">
                  <div className="block sm:flex justify-center w-[100%] items-center gap-8">
                    <button
                      className={
                        "mb-4 sm:mb-0 uppercase py-[18px] px-2  font-bold w-[177px] focus:ring-yellow-300 text-white bg-[#FF5721] hover:bg-black dark:focus:ring-yellow-900 rounded-2xl"
                      }
                    >
                      Get A demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="bg-white sm:p-[120px] sm:p-12 p-2 text-center">
        <div className="grid grid-cols-1  sm:grid-cols-[20%_60%_20%] ">
          <div className="mt-4">
            <div class="stick-right">
              <div className="check-in-action hidetablet relative cursor-pointer">
              {loading ? (
                <SkeletonLoader count={1} height={40} width="70%" />
              ) : (
                <Link href="/integrations">
                  <ArrowLongLeftIcon className="h-6 w-6 text-gray-500 absolute" />
                  <h3 className="check-text text-xl sm:mr-[80px]">
                    Back to all
                  </h3>
                </Link>
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
                  <SkeletonLoader count={1} height={20} width="80%" />
                ) : (
                  "www.ada.cx"
                )}
                </p>
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="80%" />
                ) : (
                <p className="text-[#363866] !font-semibold sm:mb-1 text-[15px]">
                  <span className="text-[#ff5721]">
                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </span>{" "}
                  &nbsp; Watch the demo
                </p>
                )}
                {loading ? (
                  <SkeletonLoader count={1} height={20} width="80%" />
                ) : (
                <p className="text-[#363866] !font-semibold sm:mb-1 text-[15px]">
                  <span className="text-[#ff5721]">
                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </span>{" "}
                  &nbsp;Read the brochure
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
                "Stripe Integration with Tempo"
                )}
                </p>

                <h2 className="!font-bold text-h3 text-left">
                {loading ? (
                  <SkeletonLoader count={1} height={60} width={140} />
                ) : (
                  "Stripe"
                )}</h2>
              </div>

              <div className="">
              {loading ? (
                <SkeletonLoader count={1} height={60} width={140} />
              ) : (
                <img src="/stripee.png" className="w-[120px] h-[120px]"></img>
              )}
              </div>
            </div>

            <div className="text-left sm:mt-7 p-[24px] sm:p-0">
              <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              "Automate Your Billing and Payment Processes with Precision"
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
              <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Why Integrate Stripe with Tempo?"
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
              "Automated Payment Workflows"
              )}
              </p>
              <p className="text-heading text-xl">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              "Combine Stripe's robust payment processing with Tempo's Workflow Builder to automate your entire payment cycle."
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
              "Enhanced Security"
              )}
              </p>
              <p className="text-heading text-xl">
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              "Both Tempo and Stripe adhere to stringent data security protocols, ensuring that your financial transactions are secure."
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[30px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
                "How It Works"
              )}
              </p>
              <p className="text-[#363866] !font-semibold  sm:mt-[20px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                "1. Connect Stripe to Tempo's Workflow Builder"
              )}
              </p>
              <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Easily link your Stripe account to Tempo's Workflow Builder."
              )}
              </p>
              <p className="text-[#363866] !font-semibold   text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                "2.Select and Add Stripe Endpoints"
              )}
              </p>
              <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Choose from a variety of Stripe endpoints to create custom billing and payment workflows."
              )}
              </p>
              <p className="text-[#363866] !font-semibold  text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
                "3.Leverage the Learning Center"
              )}
              </p>
              <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Utilize recommendations from Tempo's Learning Center to optimize your payment workflows."
  )}
              </p>
              <div>
              {loading ? (
                <SkeletonLoader count={2} height={150} width="100%" />
              ) : (
              <img
                src="/integration_page/Stripe_tab2.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
              )}
            </div>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[35px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="60%" />
              ) : (
                "Features"
              )}
              </p>
              {loading ? (
                <SkeletonLoader count={2} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Create and Manage Charges:</b> Automate the process of creating new charges and retrieving charge details.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Subscription Handling:</b> Create, update, and cancel subscriptions seamlessly.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b> Customer Management:</b> Create and update customer records without manual intervention.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Refund Operations:</b> Automate the creation and retrieval of refunds.
              </p>
              )}
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              <p className="text-heading text-xl sm:mb-3">
                <b>Dispute Resolution:</b> Handle and update dispute details automatically.
              </p>
              )}
              <div>
              {loading ? (
                <SkeletonLoader count={1} height={200} width="100%" />
              ) : (
              <img
                src="/integration_page/Stripe_tab-1.png"
                className="w-[full] sm:[465px] sm:h-[465px]"
              />
              )}
            </div>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
                "Get Started"
              )}
              </p>
              <p className="text-heading text-xl sm:mb-3">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="100%" />
              ) : (
              "Ready to optimize your payment and billing processes? Integrate Stripe with Tempo today."
              )}
              </p>
              <p className="text-[#363866] !font-semibold sm:mb-3 sm:mt-[50px] text-xl">
              {loading ? (
                <SkeletonLoader count={1} height={20} width="50%" />
              ) : (
                "Integrate Now"
              )}
              </p>
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
    </>
  );
};

export default page;
