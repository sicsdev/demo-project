import Link from 'next/link'
import React from 'react'
import Marquee from 'react-fast-marquee'


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
  ];
  const card2 = [
    {
      id: 1,
      img: "/integrations/1.svg",
      name: "Calendly",
    },
    {
      id: 2,
      img: "/integrations/2.svg",
      name: "Healthie",
    },
    {
      id: 3,
      img: "/integrations/3.svg",
      name: "SendGrid",
    },
    {
      id: 4,
      img: "/twilio-logo-png-transparent.png",
      name: "Twillio",
    },
  
    {
      id: 5,
      img: "/asaa.png",
      name: "Asana",
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
  ];
  const card4 = [
    {
      id: "1",
      img: "/58482ec0cef1014c0b5e4a70.png",
      name: "Shopify",
      subheading: "Billing",
    },
    {
      id: "2",
      img: "/salesforce-logo.png",
      name: "SalesForce",
      subheading: "Sales",
    },
    {
      id: "3",
      img: "/HUBS-3bd277ce.png",
      name: "HubSpot",
      subheading: "Sales",
    },
    {
      id: "4",
      img: "/pay.png",
      name: "Paypal",
      subheading: "Billing",
    },
    {
      id: "5",
      img: "/stripee.png",
      name: "Stripe",
      subheading: "Billing",
    },
    {
      id: "6",
      img: "/integrations/freshdesk.svg",
      name: "FreshDesk",
      subheading: "Helpdesk",
    },
  ];
  const card3 = [
    {
      id: 1,
      img: "/monday_logo_icon_168967_1.png",
      name: "Monday",
    },
    {
      id: 2,
      img: "/Jira.png",
      name: "Jira",
    },
    {
      id: 3,
      img: "/linear-logos-id-IUp6ZRH.png",
      name: "Linear",
    },
    {
      id: 4,
      img: "/pngwing.png",
      name: "CircleCI",
    },
    {
      id: 5,
      img: "/datadog-logo-purple.png",
      name: "DataDog",
    },
  ];

const Integrationstrans = () => {
  return (
<div className="bg-white mx-auto px-4 sm:px-0 sm:p-4 sm:flex gap-2 sm:gap-10 sm:py-8 ">
        <div className="sm:w-[25%] rounded overflow-hidden ">
          <div className="">
            <div className="text-heading text-2xl font-semibold mb-2 sm:mb-4">
              <h5>Connect Your Favorite Platform Effortlessly</h5>
            </div>
            <button className="sm:inline-block flex m-auto mb-3   text-center  px-6 pb-2 pt-2.5 text-md  sm:mr-0 sm:mb-4 rounded-lg font-semibold    leading-normal bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] ">
              <Link href="/checkout">Get started now →</Link>
            </button>
            <button class="text-primary sm:block hidden hover:text-heading my-3 sm:my-0 text-md font-semibold dark:focus:ring-yellow-900 rounded-lg">
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
          <button class="text-primary sm:hidden block hover:text-heading my-6 sm:my-0 text-md font-semibold dark:focus:ring-yellow-900 rounded-lg">
            <Link href="/checkout"> Schedule a demo →</Link>
          </button>
        </div>
        <div className="sm:w-[50%] stripe_cards cursor-pointer marque_section mt-3">
          <Marquee pauseOnHover={true} loop={0} direction="right">
            <div className="flex justify-center overflow-hidden">
              {cards.map((item) => (
                <Link key={item.id} className="inline-block mx-3 mb-2" href="">
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
          </Marquee>
          <Marquee pauseOnHover={true} loop={0} direction="right">
            <div className="flex overflow-hidden">
              {card1.map((item) => (
                <Link key={item.id} className="inline-block mx-3 mb-2" href="">
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
          </Marquee>
          <Marquee pauseOnHover={true} loop={0} direction="right">
            <div className="flex overflow-hidden">
              {card2.map((item) => (
                <Link key={item.id} className="inline-block mx-3 mb-2" href="">
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
          </Marquee>
          <Marquee pauseOnHover={true} loop={0} direction="right">
            <div className="flex overflow-hidden">
              {card4.map((item) => (
                <Link key={item.id} className="inline-block mx-3 mb-2" href="">
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
          </Marquee>
          <Marquee pauseOnHover={true} loop={0} direction="right">
            <div className="flex overflow-hidden">
              {card3.map((item) => (
                <Link key={item.id} className="inline-block mx-3 mb-2" href="">
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
          </Marquee>
        </div>
      </div>  )
}

export default Integrationstrans