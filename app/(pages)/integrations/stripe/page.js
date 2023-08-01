import Motioncards from "@/app/components/Motioncards/page";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
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
const card1 = [
    {
      id: "1",
      img: "/teams.png",
      name: "Microsoft",
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
const page = () => {
  return (
    <div className="bg-white pb-6">
      <div className="back_btn flex items-center gap-1 py-4 cursor-pointer">
        <span className="text-[#757575] cursor-pointer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M6.99951 9L3.99994 6L6.99951 3"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
        <p className="text-[#757575]">Back to all integrations</p>
      </div>

      <div className="flex justify-center items-center">
        <div className="h-[58px] w-[58px] ">
          <img className="w-[30px]" src="/integrations/stripe.svg" />
        </div>
        <div className="h-[58px] w-[58px]">
          <svg width="25" height="28" viewBox="0 0 25 28" fill="none">
            <path
              d="M0.291504 3.07409C0.291504 1.76761 1.35062 0.708496 2.6571 0.708496H12.1358C13.4422 0.708496 14.5014 1.76761 14.5014 3.07409V5.61564C14.5014 6.26888 13.9718 6.79843 13.3186 6.79843H1.4743C0.82106 6.79843 0.291504 6.26888 0.291504 5.61564V3.07409Z"
              fill="#3D3D3D"
            ></path>
            <path
              d="M0.291504 11.028C0.291504 10.3748 0.82106 9.84521 1.4743 9.84521H22.2857C23.5921 9.84521 24.6513 10.9043 24.6513 12.2108V17.7973C24.6513 18.4506 24.1217 18.9801 23.4685 18.9801H2.6571C1.35062 18.9801 0.291504 17.921 0.291504 16.6145V11.028Z"
              fill="#3D3D3D"
            ></path>
            <path
              d="M10.4417 23.2062C10.4417 22.553 10.9712 22.0234 11.6244 22.0234H23.4687C24.1219 22.0234 24.6515 22.553 24.6515 23.2062V24.9261C24.6515 26.2326 23.5924 27.2917 22.2859 27.2917H12.8072C11.5008 27.2917 10.4417 26.2326 10.4417 24.9261V23.2062Z"
              fill="#3D3D3D"
            ></path>
          </svg>
        </div>
      </div>

      <h1 className="text-center text-2xl tracking-wide sm:text-h2 font-bold pt-2 pb-8 text-heading">
        Build internal tools with Stripe
      </h1>
      <p className=" text-xl text-center m-auto md:text-xl sm:max-w-[600px] pb-6 text-heading">
        Retool makes it easy to build admin panels, dashboards, and utilities on
        top of your Stripe data.
      </p>

      <div className="flex flex-wrap items-center">
        <div className="w-full sm:w-[40%] p-4">
          <p className="text-black sm:mb-5">Stripe is an API for payments.</p>
          <p className="text-black sm:mb-5">
            <span className="font-semibold">
              Connecting Retool to Stripe takes just a few minutes, and lets you
              quickly build user interfaces on top of your payments data.
            </span>{" "}
            For example, you could build a tool to dispute chargebacks: you can
            pull the chargebacks in from Stripe, write a template for disputing
            them, and then pull in data from your app (via Postgres, perhaps) to
            attach as evidence.
          </p>
          <p className="text-black sm:mb-5">
            Read the{" "}
            <span className="text-primary font-semibold">
              Retool + Stripe integration docs{" "}
            </span>
            for more information.
          </p>
          <div className="flex flex-col sm:flex-row sm:gap-6 items-center mt-4">
            <button className="sm:w-[270px] w-[70%] sm:px-2 py-3 sm:py-3 text-white text-md font-semibold bg-primary hover:bg-white hover:text-primary dark:focus:ring-yellow-900 rounded-lg">
              <a href="https://docs.usetempo.ai">
                {" "}
                Start building with Stripe →{" "}
              </a>
            </button>
            <button className="text-primary hover:text-heading my-3 sm:my-0 text-md font-semibold dark:focus:ring-yellow-900 rounded-lg">
              <a href="/checkout"> Start Now →</a>
            </button>
          </div>
        </div>
        <div className="w-full sm:w-[60%] p-4">
          <div className="stripe_img w-full pb-[93%] relative overflow-hidden">
            <img className="absolute max-w-[162%]" src="/stripe.png" />
          </div>
        </div>
      </div>
      {/* card section */}
      <div className="mx-auto p-4 grid sm:grid-cols-4 gap-2 sm:gap-10">
        <div className="max-w-sm rounded overflow-hidden ">
          <div className="">
            <div className="text-heading text-2xl font-semibold mb-2 sm:mb-7">
              <h5>What you can build with Retool</h5>
            </div>
            <button class="text-primary hover:text-heading my-3 sm:my-0 text-md font-semibold dark:focus:ring-yellow-900 rounded-lg">
              <a href="/checkout"> View all templates →</a>
            </button>
          </div>
        </div>
        <div className="max-w-sm stripe_cards cursor-pointer">
          <img
            className="w-full h-48 object-cover"
            src="/integrations/stripe1.png"
            alt="Card"
          />
          <div className="py-4">
            <div className="font-bold text-xl mb-2">Stripe Refund Tool</div>
            <p className="text-gray-700 font-semibold text-base text-[#757575]">
              A tool to pull in problematic orders from your database, issue
              refunds via Stripe, and send confirmation emails via SendGrid -
              all in one UI.
            </p>
            <p className="stripe_card_title text-gray-700 font-bold mt-2 text-base text-[#757575]">
              Support Tool
            </p>
            <button class="stripe_card_btn py-2 px-8 sm:w-[100%] w-[100%] sm:px-8 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-md">
              Learn more →
            </button>
          </div>
        </div>
        <div className="max-w-sm stripe_cards cursor-pointer">
          <img
            className="w-full h-48 object-cover"
            src="/integrations/stripe2.png"
            alt="Card"
          />
          <div className="py-4">
            <div className="font-bold text-xl mb-2">Customer Success Panel</div>
            <p className="text-[#757575] font-semibold text-base text-gray-400">
              LeadGenius uses Retool to make their customer data accessible
              across the organization. This template is the tool they use to
              view, search, analyze, and update customer records and projects.
            </p>
            <p className="stripe_card_title text-gray-700 font-bold mt-2 text-base text-[#757575]">
              Support Tool - Admin Panel
            </p>
            <button class="stripe_card_btn py-2 px-8 sm:w-[100%] w-[100%] sm:px-8 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-md">
              Learn more →
            </button>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden"></div>
      </div>
      {/* get started section */}
      <div className="mx-auto px-4 sm:px-0 sm:p-4 sm:flex gap-2 sm:gap-10 sm:py-8">
        <div className="sm:w-[25%] rounded overflow-hidden ">
          <div className="">
            <div className="text-heading text-2xl font-semibold mb-2 sm:mb-4">
              <h5>
                In Retool, you can join{" "}
                <span className="text-primary">Stripe</span> with anything
              </h5>
            </div>
            <button className="sm:w-[270px] w-[70%] sm:px-2 py-3 sm:py-3 text-white text-md font-semibold bg-primary hover:bg-white hover:text-primary dark:focus:ring-yellow-900 rounded-lg mb-2 sm:mb-4">
              <a href="https://docs.usetempo.ai">Get started now →</a>
            </button>
            <button class="text-primary hover:text-heading my-3 sm:my-0 text-md font-semibold dark:focus:ring-yellow-900 rounded-lg">
              <a href="/checkout"> Schedule a demo →</a>
            </button>
          </div>
        </div>
        <div className="sm:w-[25%] stripe_cards cursor-pointer">
          <p className="text-base text-[#757575]">
            Retool connects to most databases and nearly anything with a REST or
            GraphQL API. Read in data from mongoDB, join it via SQL, record user
            approvals, and POST the result to Stripe to create invoices.
          </p>
          <p className="text-base text-[#757575] mt-3">
            Retool empowers you to work with all of your data sources inside of
            a single app.
          </p>
        </div>
        <div className="sm:w-[50%] stripe_cards cursor-pointer marque_section mt-3">
          <div className="flex justify-center overflow-hidden">
            {cards.map((item) => (
              <Link
                key={item.id}
                className="inline-block mx-3 mb-2"
                href=""
              >
                <div className="shadow-md rounded-full w-[100%] ">
                  <div className="flex items-center gap-2 py-3 px-7 pr-10">
                    <img src={item.img} className="h-4 w-4" />
                    <div>
                      <p className="text-sm">{item.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex overflow-hidden">
            {card1.map((item) => (
              <Link
                key={item.id}
                className="inline-block mx-3 mb-2"
                href=""
              >
                <div className="shadow-md rounded-full w-[100%] ">
                  <div className="flex items-center gap-2 py-3 px-7 pr-10">
                    <img src={item.img} className="h-4 w-4" />
                    <div>
                      <p className="text-sm">{item.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex overflow-hidden">
            {cards.map((item) => (
              <Link
                key={item.id}
                className="inline-block mx-3 mb-2"
                href=""
              >
                <div className="shadow-md rounded-full w-[100%] ">
                  <div className="flex items-center gap-2 py-3 px-7 pr-10">
                    <img src={item.img} className="h-4 w-4" />
                    <div>
                      <p className="text-sm">{item.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex overflow-hidden">
            {card1.map((item) => (
              <Link
                key={item.id}
                className="inline-block mx-3 mb-2"
                href=""
              >
                <div className="shadow-md rounded-full w-[100%] ">
                  <div className="flex items-center gap-2 py-3 px-7 pr-10">
                    <img src={item.img} className="h-4 w-4" />
                    <div>
                      <p className="text-sm">{item.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex overflow-hidden">
            {cards.map((item) => (
              <Link
                key={item.id}
                className="inline-block mx-3 mb-2"
                href=""
              >
                <div className="shadow-md rounded-full w-[100%] ">
                  <div className="flex items-center gap-2 py-3 px-7 pr-10">
                    <img src={item.img} className="h-4 w-4" />
                    <div>
                      <p className="text-sm">{item.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
};

export default page;
