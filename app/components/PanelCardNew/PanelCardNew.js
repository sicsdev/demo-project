"use client";
import React, { useEffect } from "react";
import Button from "../Common/Button/Button";
import Card from "../Common/Card/Card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import price_data from "./price_data";
import { useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CheckIcon } from "@heroicons/react/24/outline";
import SkeletonLoader from "../Skeleton/Skeleton";
const Panelcardnew = () => {
  const router = useRouter();

  const handleGetFreeTrial = (e) => {
    router.push(`/checkout?plan=${e.target.id}`);
  };
  const [hide, setHide] = useState({
    first: false,
  });
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-white px-[16px] sm:py-[64px] py-[34px]">
      <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:mb-8 relative text-heading md:leading-[3rem]">
        {loading ? <SkeletonLoader count={1} height={35} width={"60%"} /> :
          "AI Customer Service Solutions"
        }
      </h2>
      <div className="w-full   md:w-[80%] lg:w-[60%]  grid grid-cols-1 align sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-4 gap-4    mx-auto js-show-on-scroll">
        {price_data.map((ele, key) => (
          <div className="bg-[#F7F8FA] p-3">
            <div key={key}>
              <div className="flex items-center mr-4">
                <div className="relative w-[22px] h-[22px]">
                  {loading ? <SkeletonLoader count={1} height={20} width={20} /> :
                    <Image
                      fill={true}
                      src={ele.icons_svg}
                      className="bg-contain mx-auto"
                      alt="img"
                    />
                  }
                </div>{" "}
                <p className="ml-2 text-xl font-[600] text-gray-900 dark:text-gray-300">
                  {loading ? <SkeletonLoader count={1} height={20} width={160} /> :
                    <>
                      {ele.title}
                    </>
                  }
                </p>
              </div>
              {ele.title == "Starter" ? (
                <>
                  {loading ? <SkeletonLoader className="mt-4" count={1} height={20} width={"90%"} /> :
                    <p
                      className="text-[#6C727A] font-normal text-sm mt-6"
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        setHide({ first: false });
                      }}
                    >
                      $200 free, then just{" "}
                      <span className="font-bold text-[#6C727A]"> $1 </span>per
                      ticket resolution{" "}
                      <span
                        className="cursor-pointer"
                        onMouseOver={(e) => {
                          e.stopPropagation();
                          setHide({ first: true });
                        }}
                      >
                        *
                      </span>
                      {hide.first == true ? (
                        <Card
                          className={
                            "animate-fadeIn w-[320px]	sm:w-[400px]  absolute bg-white ml-auto mr-auto left-0 right-0"
                          }
                        >
                          <p
                            className="text-[#6C727A]"
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setHide({ first: false });
                              }, 5000)
                            }
                          >
                            Resolution is any conversation that does not result in
                            a human hand off or a customer marks as a bad answer
                            and has at least 3 total interactions.
                          </p>
                        </Card>
                      ) : (
                        ""
                      )}{" "}
                    </p>
                  }
                </>
              ) : (
                <>
                  {loading ? <SkeletonLoader className="mt-4" count={1} height={20} width={"90%"} /> :
                    <p className="text-[#6C727A] font-normal text-sm mt-6">
                      Custom pricing. Schedule demo for proposal.
                    </p>
                  }
                </>
              )}
              <div className=" mt-12 mb-12">
                {ele.title == "Starter" ? (
                  <>
                    {loading ? <SkeletonLoader count={1} height={40} width={"98%"} /> :
                      <button
                        className="my-6 w-full flex items-center justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 focus:ring-yellow-300 bg-[#F5455C]  text-white hover:shadow-[0_8px_9px_-4px_#F5455C] disabled:bg-input_color disabled:shadow-none disabled:text-white"
                        disabled={false}
                        id={key}
                        onClick={handleGetFreeTrial}
                      >
                        Get Started{" "}
                      </button>
                    }
                  </>
                ) : (
                  <>
                    {loading ? <SkeletonLoader count={1} height={40} width={"98%"} /> :
                      <button
                        data-cal-link="deflectionai/sales-call"
                        data-cal-config='{"layout":"month_view"}'
                        className="my-6 flex items-center justify-center text-sm gap-1 focus:ring-4 focus:outline-none font-bold rounded-sm py-2.5 px-4 w-full focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white"
                      >
                        Schedule Demo
                      </button>
                    }
                  </>
                )}
              </div>
              <h3 className="font-bold text-heading my-6">
                {loading ? <SkeletonLoader count={1} height={30} width={120} /> :
                  "Includes:"
                }
              </h3>
              <ul>
                {ele.feature_list.map((element, key) => (
                  <li
                    key={key}
                    className="text-sm text-[#6C727A] flex gap-3 items-center my-2"
                  >
                    {loading ? <SkeletonLoader count={1} height={20} width={20} /> :
                      <>
                        <CheckIcon class="h-[15px] w-[18px] text-[#53c08f]" />
                      </>}
                    {loading ? <SkeletonLoader count={1} height={30} width={120} /> :
                      <>
                        {element.title}
                      </>
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panelcardnew;
