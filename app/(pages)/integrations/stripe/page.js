import Integrationsmotion from "@/app/components/Motioncards/Integrationsmotion";
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
        <p className="text-[#757575]">
          <Link href="integrations">Back to all integrations</Link>
        </p>
      </div>
      <div className="mb-6">
        <div className="flex justify-center items-center">
          <div className="mr-5  stripe-int-icon">
            <img className="w-[50px]" src="/integrations/stripe.svg" />
          </div>
          <div className=" stripe-int-icon-1">
            <img className="w-[80px] h-[35px] " src="/logo-b.png" />
          </div>
        </div>
      </div>

      <h1 className="text-center text-2xl tracking-wide sm:text-h2 font-bold pt-2 pb-3 sm:pb-8 text-heading">
        Stripe Connects with Tempo{" "}
      </h1>
      <p className=" text-xl text-left px-4 sm:text-center m-auto md:text-xl sm:max-w-[600px] pb-6 text-heading">
        Our solution leverages your Stripe data to build AI-driven smart
        workflows, revolutionizing your customer payment experience.
      </p>

      <div className="flex flex-wrap items-center">
        <div className="w-full sm:w-[40%] p-4">
          <p className="text-black sm:mb-5">Stripe is an API for payments.</p>
          <p className="text-black sm:mb-5">
            {/* <span className="font-semibold">
              Connecting Retool to Stripe takes just a few minutes, and lets you
              quickly build user interfaces on top of your payments data.
            </span>{" "} */}
            Connecting Tempo to Stripe is straightforward, allowing the creation
            of user interfaces to manage your payment data. This could enable
            systems to handle subscriptions, process refunds, or resolve
            chargebacks.
          </p>
          <p className="text-black sm:mb-5">
            Read the Refer to the&nbsp;
            <span className="text-primary font-semibold">
              Tempo + Stripe integration&nbsp;
            </span>
            guide for further insights.
          </p>
          <div className="flex flex-col sm:flex-row sm:gap-6 items-center mt-4">
            <button className="inline-block   px-6 pb-2 pt-2.5 text-md rounded-lg font-semibold    leading-normal bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] ">
              <a href="/checkout"> Stripe → </a>
            </button>
            <button className="text-primary hover:text-heading my-3 sm:my-0  font-semibold dark:focus:ring-yellow-900 rounded-lg">
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
      <div className="mx-auto p-4 grid sm:grid-cols-4 gap-2 sm:gap-10 sm:mb-7 ">
        <div className="max-w-sm rounded overflow-hidden ">
          <div className="">
            <div className="text-heading text-2xl font-semibold mb-2 sm:mb-7">
              <h5>Stripe Workflow Use Cases</h5>
            </div>
          </div>
        </div>
        <div className="max-w-sm stripe_cards cursor-pointer relative">
          <img
            className="w-full h-48 object-cover"
            src="/integrations/stripe1.png"
            alt="Card"
          />
          <div className="py-4">
            <div className="font-bold text-xl mb-2">
              Subscription Cancellation and Refund Workflow
            </div>
            <p className="text-gray-700 font-semibold text-base text-[#757575]">
              Retrieves active subscriptions from Stripe, cancel subscriptions,
              and process refunds, all without going into your CRM.
            </p>
            <p className="stripe_card_title text-gray-700 font-bold mt-2 text-base text-[#757575]">
              Support Tool
            </p>
            <button class="stripe_card_btn absolute bottom-0 py-2 px-8 sm:w-[100%] w-[100%] sm:px-8 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-md">
              Learn more →
            </button>
          </div>
        </div>
        <div className="max-w-sm stripe_cards cursor-pointer relative">
          <img
            className="w-full h-48 object-cover"
            src="/integrations/stripe2.png"
            alt="Card"
          />
          <div className="py-4">
            <div className="font-bold text-xl mb-2">
              Salesforce and Stripe Work Together
            </div>
            <p className="text-[#757575] font-semibold text-base text-gray-400">
              Based on a user prompt, add a customer to Salesforce and
              simultaneously initiate a charge in Stripe. No need to switch
              between tabs.
            </p>
            <p className="stripe_card_title text-gray-700 font-bold mt-2 text-base text-[#757575]">
              Support Tool - Admin Panel
            </p>
            <button class="stripe_card_btn absolute bottom-0 py-2 px-8 sm:w-[100%] w-[100%] sm:px-8 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-md">
              Learn more →
            </button>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden"></div>
      </div>
      {/* get started section */}
      <div className="mx-auto px-4 sm:px-0 sm:p-4 sm:flex gap-2 sm:gap-10 sm:py-8 ">
        <div className="sm:w-[25%] rounded overflow-hidden ">
          <div className="">
            <div className="text-heading text-2xl font-semibold mb-2 sm:mb-4">
              <h5>Connect Your Favorite Platform Effortlessly</h5>
            </div>
            <button className="inline-block   px-6 pb-2 pt-2.5 text-md mr-3 sm:mr-0 sm:mb-4 rounded-lg font-semibold    leading-normal bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] ">
              <Link href="/checkout">Get started now →</Link>
            </button>
            <button class="text-primary hover:text-heading my-3 sm:my-0 text-md font-semibold dark:focus:ring-yellow-900 rounded-lg">
              <Link href="/checkout"> Schedule a demo →</Link>
            </button>
          </div>
        </div>
        <div className="sm:w-[25%] stripe_cards cursor-pointer">
          <p className="text-base text-[#757575]">
            Tempo is integrating with more APIs every day. Say goodbye to
            implementing your own endpoints, and embrace low-code automation
            with our prompt-initiated workflow builder.
          </p>
          <p className="text-base text-[#757575] mt-3">
            Want to see how Tempo’s Workflow Builder can work for you? Let’s
            chat.
          </p>
        </div>
        <div className="sm:w-[50%] stripe_cards cursor-pointer marque_section mt-3">
<Integrationsmotion />
        </div>
      </div>
    </div>
  );
};

export default page;
