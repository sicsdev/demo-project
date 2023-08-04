"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import SkeletonLoader from "../Skeleton/Skeleton";
const cards = [
  {
    id: "1",
    img: "/integrations/github.svg",
    name: "Github",
    subheading: "Productivity",
  },
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
const Brands = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-white motion_marque_section text-center py-3 m-auto">
      <div class="block  m-auto sm:py-8 md:py-8 max-w-[90%] lg:py-8 sm:px-4 lg:px-4">
        <div className="w-[100%] sm:w-[100%]">
          <h2 className="mb-5 text-black text-2xl sm:text-3xl font-bold sm:mb-7">
            {loading ? (
              <SkeletonLoader height={50} width={350} />
            ) : (
              "Fast, dynamic web experiences powered by Netlify"
            )}
          </h2>
        </div>
        {/* marque */}
        <div className="w-[100%] sm:w-[100%] marque_section">
          <div class=" overflow-hidden wrapper_marque">
            {loading ? (
              <SkeletonLoader height={50} width={1700} />
            ) : (
              <Marquee loop={0} direction="left">
                {cards.map((item) => (
                  <Link
                    key={item.id}
                    className=" inline-block m-3"
                    href=""
                  >
                    <div className="w-[150px] p-3">
                        <img src={item.img} className="h-10  w-10" />
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

export default Brands;
