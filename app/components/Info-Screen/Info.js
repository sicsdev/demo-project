import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
const Info = () => {
  const slides = [
    {
      url: "https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];
  useEffect(() => {
    const callback = function (entries) {
      entries.forEach((entry) => {
        console.log(entry);

        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        } else {
          entry.target.classList.remove("animate-fadeIn");
        }
      });
    };
    const observer = new IntersectionObserver(callback);
    const targets = document.querySelectorAll(".js-show-on-scroll");
    targets.forEach(function (target) {
      target.classList.add("opacity-0");
      observer.observe(target);
    });
  }, []);

  return (
    <div className="bg-background py-8 ">
      <div className="justify-between mx-auto max-w-[90%] py-3">
        <h1 className="text-center text-2xl md:text-5xl lg:text-5xl sm:text-5xl my-2 font-bold text-white">
          Save Millions with Tempo AI.
        </h1>
        <h3 className="text-center text-base sm:text-2xl md:text-2xl lg:text-2xl my-2 font-base text-white">
          Tempo AI with ChatGPT meets your CS needs 24/7, at 1/10th the cost.
        </h3>



        <div className="grid grid-col-1 my-3 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-2 gap-8 my-20 xl:gap-40">
          <div className="text-start sm:text-start md:text-start lg:text-start order-1">
            {/* <h3 className="text-lg my-3 font-medium text-heading">TEMPOCHAT</h3> */}
            <h1 className="font-bold  text-2xl   md:text-5xl lg:text-5xl sm:text-5xl   md:my-8 lg:my-8 sm:my-8  text-white js-show-on-scroll">
              ChatGPT becomes the brain of your business.{" "}
            </h1>
            <h3 className="text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-white js-show-on-scroll">
              Tempo connects to your existing ticketing, billing, and order
              management systems. Unlike ChatGPT, Tempo is branded to your
              business, fulfills orders, issues refunds, and handles all
              inquiries 24/7. If Tempo is unsure of an answer, it&apos;ll hand
              the question to a real human. The best part? Your customers will
              never know they&apos;re speaking to an AI.
            </h3>
            <div className="text-voilet font-semibold">
              {/* <Link href={"/"}>Explore Support Desk</Link> */}
            </div>
          </div>
          <div className="relative mx-auto h-[200px] w-[300px] sm:h-full md:h-h-full lg:h-full sm:w-full md:w-full lg:w-full order-2 js-show-on-scroll">
            <img
              src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75"
              fill={true}
              className="bg-contain mx-auto right-0 left-0 w-100 h-100"
            />
          </div>
          <div className="relative mx-auto h-[200px] w-[300px] sm:h-full md:h-h-full lg:h-full sm:w-full md:w-full lg:w-full    order-4 js-show-on-scroll">
            <img
              src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75"
              fill={true}
              className="bg-contain mx-auto w-100 h-100"
            />
          </div>
          {/* <div
          style={{
            backgroundImage: `url(https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75)`,
          }}
          className="h-64 sm:h-full md:h-full lg:h-full md:w-full sm:w-full lg:w-full bg-cover bg-center md:my-8 lg:my-8 sm:my-8  order-4 md:order-3 sm:order-3 lg:order-3"
        ></div> */}
          <div className="text-start sm:text-start md:text-start lg:text-start md:my-8 lg:my-8 sm:my-8  order-3 md:order-4 sm:order-4 lg:order-4">
            {/* <h3 className=" text-lg my-3 font-medium text-heading">
            CONTACT CENTER
          </h3> */}
            <h1 className="font-bold  text-2xl   md:text-5xl lg:text-5xl sm:text-5xl   md:my-8 lg:my-8 sm:my-8  text-white js-show-on-scroll">
              We&apos;ll save you money while you sleep.
            </h1>
            <h3 className="text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-white js-show-on-scroll">
              Tempo AI runs your ops in the background. Tempo is trained to
              issue refunds to angry customers, offer credits to subscribers who
              want to cancel, and push delivery speeds ahead of holidays. Tempo
              combines a super smart AI bot with humans in the background
              overseeing it all. We know customer service is hard, let Tempo
              take it off your plate.
            </h3>
            <div className="text-voilet font-semibold">
              {/* <Link href={"/"}>Explore Support Desk</Link> */}
            </div>
          </div>
          <div className="text-start sm:text-start md:text-start lg:text-start md:my-8 lg:my-8 sm:my-8  order-5">
            {/* <h3 className="text-lg my-3 font-medium text-heading">TEMPOCHAT</h3> */}
            <h1 className="font-bold  text-2xl   md:text-5xl lg:text-5xl sm:text-5xl   md:my-8 lg:my-8 sm:my-8  text-white js-show-on-scroll">
              Instant integration process.{" "}
            </h1>
            <h3 className="text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-white js-show-on-scroll">
              Time is money, so we make things fast and easy. Tempo AI
              integrates into your existing ecommerce platform (custom too),
              billing platform, and ERP systems so you can get up and running in
              minutes, not months. Literally just fill out a form, click a few
              buttons, and never think about customer service again.
            </h3>
            <div className="text-voilet font-semibold">
              {/* <Link href={"/"}>Explore Support Desk</Link> */}
            </div>
          </div>
          <div className="relative mx-auto h-[200px] w-[300px] sm:h-full md:h-h-full lg:h-full sm:w-full md:w-full lg:w-full   order-6 js-show-on-scroll">
            <img
              src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75"
              fill={true}
              className="bg-contain mx-auto w-100 h-100"
            />
          </div>
          {/* <div
          style={{
            backgroundImage: `url(https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75)`,
          }}
          className="h-64 sm:h-full md:h-full lg:h-full md:w-full sm:w-full lg:w-full bg-cover bg-center md:my-8 lg:my-8 sm:my-8  order-6"
        ></div> */}
        </div>
      </div>
    </div>
  );
};

export default Info;
