"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import SkeletonLoader from "../Skeleton/Skeleton";
const cards = [

  {
    id: "2",
    img: "/twilio-logo-png-transparent.png",
    name: "Twilio",
    subheading: "Tools",
  },
  {
    id: "3",
    img: "/integrations/square.svg",
    name: "Square",
    subheading: "Billing",
  },
  {
    id: "4",
    img: "/brain.png",
    name: "Braintree",
    subheading: "Billing",
  },
  {
    id: "5",
    img: "/slack-logo-icon.png",
    name: "Slack",
    subheading: "Communication",
  },
  {
    id: "6",
    img: "/pay.png",
    name: "Paypal",
    subheading: "Billing",
  },
  {
    id: "7",
    img: "/stripee.png",
    name: "Stripe",
    subheading: "Billing",
  },
  {
    id: "7",
    img: "/integrations/freshdesk.svg",
    name: "FreshDesk",
    subheading: "Helpdesk",
  },
];
const card1 = [
  {
    id: "1",
    img: "/teams.png",
    name: "Microsoft Teams",
    subheading: "Communication",
  },

  {
    id: "3",
    img: "/zenenew.png",
    name: "ZenDesk",
    subheading: "Helpdesk",
  },
  {
    id: "4",
    img: "/geo.png",
    name: "Gorgias",
    subheading: "Helpdesk",
  },


  {
    id: "7",
    img: "/salesforce-logo.png",
    name: "SalesForce",
    subheading: "Sales",
  },
  

];
const card2 = [

  {
    id: "2",
    img: "/monday_logo_icon_168967_1.png",
    name: "Monday",
    subheading: "Productivity",
  },
  {
    id: "4",
    img: "/geo.png",
    name: "Gorgias",
    subheading: "Helpdesk",
  },


  {
    id: "7",
    img: "/salesforce-logo.png",
    name: "SalesForce",
    subheading: "Sales",
  }
];
const Motioncards = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-white motion_marque_section  py-3 m-auto">
      <div class="block sm:flex m-auto sm:py-8 md:py-8 max-w-[90%] lg:py-8 sm:px-4 lg:px-4 mt-10">
        <div className="w-[100%] sm:w-[30%]">
          <h2 className="mb-5 text-black text-2xl sm:text-3xl font-bold sm:mb-7">
            {loading ? (
              <SkeletonLoader height={50} width={350} />
            ) : (
              " All of your tools in one place"
            )}
          </h2>
          <p className="text-black sm:mb-5">
            {loading ? (
              <SkeletonLoader count={4} height={30} width={"90%"} />
            ) : (
              "Integrate your most important API's and databases to empower Deflection AI to control your CS experience."
            )}
          </p>
          {loading ? (
            <SkeletonLoader height={40} width={200} />
          ) : (
            <button className="text-primary hover:text-heading my-3 sm:my-0 text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg">
              <Link href="/checkout"> Start Now →</Link>
            </button>
          )}
        </div>
        {/* marque */}
        <div className="w-[100%] sm:w-[70%] marque_section">
          <div class="flex overflow-hidden wrapper_marque">
          {loading ? (
            <SkeletonLoader height={50} width={1700} />
          ) : (
            <Marquee pauseOnHover={true} loop={0} direction="right">
              {cards.map((item) => (
                <Link
                  key={item.id}
                  className="marque_card inline-block m-3"
                  href=""
                >
                  <div className="shadow-md rounded-lg w-[280px] p-3">
                    <div className="flex items-center gap-3">
                      <img src={item.img} className="h-10  w-10" />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs">{item.subheading}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Marquee>
          )}
            <div></div>
          </div>
          <div class="flex overflow-hidden wrapper_marque">
          {loading ? (
          <SkeletonLoader height={50} width={1700} />
          ) : (
            <Marquee pauseOnHover={true} loop={0} direction="left">
              {card1.map((item) => (
                <Link
                  key={item.id}
                  className="marque_card inline-block m-3"
                  href=""
                >
                  <div className="shadow-md rounded-lg w-[280px] p-3">
                    <div className="flex items-center gap-3">
                      <img src={item.img} className="h-10  w-10" />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs">{item.subheading}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Marquee>
          )}
            <div></div>
          </div>
          <div class="flex overflow-hidden wrapper_marque">
          {loading ? (
          <SkeletonLoader height={50} width={1700} />
          ) : (
            <Marquee pauseOnHover={true} loop={0} direction="right">
              {card2.map((item) => (
                <Link
                  key={item.id}
                  className="marque_card inline-block m-3"
                  href=""
                >
                  <div className="shadow-md rounded-lg w-[280px] p-3">
                    <div className="flex items-center gap-3">
                      <img src={item.img} className="h-10  w-10" />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs">{item.subheading}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Marquee>
            )}
            <div></div>
          </div>
        </div>
        {/* marque */}
      </div>
    </div>
  );
};

export default Motioncards;
