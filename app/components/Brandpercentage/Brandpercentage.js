import React, { useState, useEffect, useRef } from "react";
import Card from "../Common/Card/Card";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
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
          <div
            className="data-wrapper text-center  relative sm:z-0 z-[9999]"
            onMouseLeave={() =>
              setTimeout(() => {
                setHide({ first: false });
              }, 5000)
            }
          >
            <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">
              <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                {({ isVisible }) => (
                  <div style={{ height: "50px" }}>
                    {isVisible ? (
                      <>
                        <CountUp startOnMount end={50} duration={3.5} />%
                      </>
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
            </p>
            <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">
              Lower CS Costs Guaranteed
              <span
                className="cursor-pointer"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setHide({ first: true });
                }}
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
                    "animate-fadeIn w-[320px]	sm:w-[400px]  absolute top-[92px] sm:top-[120px] bg-white ml-auto mr-auto left-0 right-0"
                  }
                >
                  <p
                    className="text-heading"
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setHide({ first: false });
                      }, 5000)
                    }
                  >
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
          <div
            className="data-wrapper text-center relative  sm:z-0 z-[999]"
            onMouseLeave={() =>
              setTimeout(() => {
                setHide({ second: false });
              }, 5000)
            }
          >
            <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">
              <VisibilitySensor partialVisibility offset={{ bottom: 0 }}>
                {({ isVisible }) => (
                  <div style={{ height: "54px" }}>
                    {isVisible ? (
                      <>
                        <CountUp startOnMount end={24} duration={3.5} />
                        /<CountUp startOnMount end={7} duration={3.5} />
                      </>
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
            </p>
            <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">
              Round-the-clock support
              <span
                className="cursor-pointer"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setHide({ second: true });
                }}
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
                    "animate-fadeIn  w-[320px]	   sm:w-[400px]  absolute top-[92px] sm:top-[120px] bg-white ml-auto mr-auto left-0 right-0"
                  }
                >
                  <p
                    className="text-heading"
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setHide({ second: false });
                      }, 5000)
                    }
                  >
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
          <div
            className="data-wrapper text-center relative sm:z-0 z-[99]"
            onMouseLeave={() =>
              setTimeout(() => {
                setHide({ third: false });
              }, 5000)
            }
          >
            <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">
              <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                {({ isVisible }) => (
                  <div style={{ height: "54px" }}>
                    {isVisible ? (
                      <CountUp startOnMount end={5} duration={3.5} />
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>{" "}
            </p>
            <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">
              Minute average SLAs
              <span
                className="cursor-pointer"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setHide({ third: true });
                }}
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
                    "animate-fadeIn  w-[320px]	   sm:w-[400px]  absolute top-[92px] sm:top-[120px] bg-white ml-auto mr-auto left-0 right-0"
                  }
                >
                  <p
                    className="text-heading"
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setHide({ third: false });
                      }, 5000)
                    }
                  >
                    5 minute SLAs reconciled on a monthly basis, of all blended
                    chat and email support tickets for individual clients.
                  </p>
                </Card>
              ) : (
                ""
              )}
            </p>
          </div>
          <div
            className="data-wrapper text-center relative sm:z-0 z-[9]"
            onMouseLeave={() =>
              setTimeout(() => {
                setHide({ third: false });
              }, 5000)
            }
          >
            <p className="text-white font-bold text-4xl md:text-6xl js-show-on-scroll">
              <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                {({ isVisible }) => (
                  <div style={{ height: "54px" }}>
                    {isVisible ? (
                      <CountUp startOnMount end={15} duration={3.5} />
                    ) : null}
                  </div>
                )}
              </VisibilitySensor>
            </p>
            <p className="font-normal text-lg my-4 text-white opacity-80 js-show-on-scroll">
              Minute onboarding
              <span
                className="cursor-pointer"
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setHide({ fourth: true });
                }}
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
                    "animate-fadeIn  w-[320px]	   sm:w-[400px]  absolute top-[92px] sm:top-[120px] bg-white ml-auto mr-auto left-0 right-0"
                  }
                >
                  <p
                    className="text-heading"
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setHide({ fourth: false });
                      }, 5000)
                    }
                  >
                    15 minute onboarding for typical users of Deflection AI. Enterprise
                    clients may have a longer onboarding timeline.
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
