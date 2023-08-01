"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import SkeletonLoader from "../Skeleton/Skeleton";
const card2 = [
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
const cards = [
  {
    id: "1",
    img: "/teams.png",
    name: "Microsoft Teams",
    subheading: "Communication",
  },
  {
    id: "2",
    img: "/integrations/front.svg",
    name: "Front",
    subheading: "Helpdesk",
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
    id: "5",
    img: "/integrations/intercom.svg",
    name: "Intercom",
    subheading: "Helpdesk",
  },
  {
    id: "6",
    img: "/58482ec0cef1014c0b5e4a70.png",
    name: "Shopify",
    subheading: "Billing",
  },
  {
    id: "7",
    img: "/salesforce-logo.png",
    name: "SalesForce",
    subheading: "Sales",
  },
  {
    id: "8",
    img: "/HUBS-3bd277ce.png",
    name: "HubSpot",
    subheading: "Sales",
  },
];
const card1 = [
  {
    id: "1",
    img: "/asaa.png",
    name: "Asana",
    subheading: "Productivity",
  },
  {
    id: "2",
    img: "/monday_logo_icon_168967_1.png",
    name: "Monday",
    subheading: "Productivity",
  },
  {
    id: "3",
    img: "/Jira.png",
    name: "Jira",
    subheading: "Productivity",
  },
  {
    id: "4",
    img: "/linear-logos-id-IUp6ZRH.png",
    name: "Linear",
    subheading: "Productivity",
  },
  {
    id: "5",
    img: "/pngwing.png",
    name: "CircleCI",
    subheading: "Tools",
  },
  {
    id: "6",
    img: "/datadog-logo-purple.png",
    name: "DataDog",
    subheading: "Tools",
  },
  {
    id: "7",
    img: "/SendGrid-Logomark.png",
    name: "SendGrid",
    subheading: "Tools",
  },
  {
    id: "8",
    img: "/menu_logo.png",
    name: "NMI",
    subheading: "Billing",
  },
];
const Integrationsmotion = () => {
 
  return (
    <>

          <div class="flex overflow-hidden wrapper_marque">
   
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
     
            <div></div>
          </div>
          <div class="flex overflow-hidden wrapper_marque">
   
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
            <div></div>
          </div>
          <div class="flex overflow-hidden wrapper_marque">

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
 
            <div></div>
          </div>
          </>
  );
};

export default Integrationsmotion;
