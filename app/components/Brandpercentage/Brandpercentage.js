import React, { useState, useEffect, useRef } from "react";
import Card from "../Common/Card/Card";
import List from "../Layout/components/List";
import { FallingLines } from "react-loader-spinner";
const Brandpercentage = () => {
  const [hide, setHide] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  return (
    <div
      className="bg-background py-4 sm:py-8"
      onClick={() =>
        setHide({ first: false, second: false, third: false, fourth: false })
      }
    >
      <div className="max-w-[1400px] w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 relative group">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8  sm:px-4 px-4 lg:px-4 mt-10">
          <div className="data-wrapper text-center  relative z-[9999]">
            <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">
              50%
            </p>
            <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">
              Lower CS Costs Guaranteed
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setHide({ first: true });
                }}
              >
                *
              </span>
              {hide.first == true ? (
                <Card
                  className={
                    "animate-fadeIn w-[320px]	   sm:w-[400px]  absolute top-[92px] sm:top-[120px] bg-white"
                  }
                >
                  <p className="text-heading" onMouseLeave={()=>setHide({first:false})}  >
                    Enterprise contracts only. Guarantee of 50% in CS costs over
                    first 12 months on contract taken as a whole. Costs are
                    inclusive of labor, exclusive of SaaS fees and other
                    expenses,
                  </p>
                </Card>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="data-wrapper text-center relative z-[999]">
            <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">
              24/7
            </p>
            <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">
              Round-the-clock support
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setHide({ second: true });
                }}
              >
                *
              </span>
              {hide.second == true ? (
                <Card
                  className={
                    "animate-fadeIn  w-[320px]	   sm:w-[400px]  absolute top-[92px] sm:top-[120px] bg-white"
                  }
                >
                  <p className="text-heading"  onMouseLeave={()=>setHide({second:false})}>
                    Chat and email support updates at least once per hour, every
                    hour of the week, aside from scheduled maintenance and
                    updates. Maintenance and updates will be announced at least
                    12 hours in advance.
                  </p>
                </Card>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="data-wrapper text-center relative z-[99]">
            <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">
              0
            </p>
            <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">
              5 Minute SLAs
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setHide({ third: true });
                }}
              >
                *
              </span>
              {hide.third == true ? (
                <Card
                  className={
                    "animate-fadeIn  w-[320px]	   sm:w-[400px]  absolute top-[92px] sm:top-[120px] bg-white"
                  }
                >
                  <p className="text-heading"   onMouseLeave={()=>setHide({third:false})} >
                    5 minute SLAs reconciled on a monthly basis, of all blended
                    chat and email support tickets for individual clients.
                  </p>
                </Card>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="data-wrapper text-center relative z-[9]">
            <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">
              1,000+
            </p>
            <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">
              GPT-powered agents available
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setHide({ fourth: true });
                }}
              >
                *
              </span>
              {hide.fourth == true ? (
                <Card
                  className={
                    "animate-fadeIn  w-[320px]	   sm:w-[400px]  absolute top-[92px] sm:top-[120px] bg-white"
                  }
                >
                  <p className="text-heading" onMouseLeave={()=>setHide({fourth:false})} >
                    Onboarding timeline of 1,000+ agents depends on the
                    complexity of service and protocols.
                  </p>
                </Card>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brandpercentage;
