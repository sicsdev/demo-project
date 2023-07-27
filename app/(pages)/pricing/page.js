"use client";
import Card from "@/app/components/Common/Card/Card";
import Container from "@/app/components/Container/Container";
import React, { useEffect, useState } from "react";
import FaqAccordian from "@/app/components/FaqAccordian/Faq";
import { price_data, questions } from "./data";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/Common/Button/Button";
import DTC from "@/app/components/DTC/DTC";
import Testimonial from "@/app/components/Testimonial/Testimonial";
import Resource from "@/app/components/Resource/Resource";
import Iconanimation from "@/app/components/Iconanimation/Iconanimation";
import Trial from "@/app/components/Trial/Trial";
import Image from "next/image";
import Link from "next/link";
import { Helmet } from "react-helmet";
import Panelcard from "@/app/components/PanelCard/PanelCard";
import Panelcardnew from "@/app/components/PanelCardNew/PanelCardNew";

const Pricing = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailQuery = searchParams.get("email");
  const handleGetFreeTrial = (select) => {
    router.push(`/checkout?plan=${select}`);
  };
  const [hide, setHide] = useState({
    first: false,
  });
  useEffect(() => {
    const callback = function (entries) {
      entries.forEach((entry) => {
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
    <div className="bg-white">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="title"
          content="Flexible Pricing Plans for Tempo.ai's Customer Support Solutions"
        />

        <meta
          name="description"
          content="Discover Tempo.ai's flexible pricing plans for advanced customer support solutions. Choose the package that fits your business needs and budget. Get started today"
        />
      </Helmet>

      {/* <Panelcard  /> */}

      <Panelcardnew/>

      <DTC />
      {/* <Iconanimation /> */}
      {/* <Trial /> */}
      {/* <Resource /> */}

      {/* Pricing section */}
      <div className="bg-white pt-4">
        <div className="pb-4 sm:pb-16 mx-auto max-w-[90%] py-10">
          <h6 class="font-bold text-xl black py-1 text-primary">Pricing</h6>
          <h1 class="text-left text-2xl tracking-wide text-heading sm:text-3xl md:text-4xl lg:text-4xl my-2 font-bold ">
            Know what you'll pay
          </h1>

          <div class="flex flex-wrap mt-8 shadow-sm">
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="font-bold text-heading  text:xs sm:text-2xl  border-l-2 border-[#2563EB] px-4">
                  Pay-as-you-go
                </p>
                <h6 class="font-bold cursor-pointer text-xs black py-1 text-primary mt-1 px-4">
                  <Link href="/article/pricing-overview">
                    {" "}
                    Pricing details {">"}
                  </Link>
                </h6>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="text-sm font-normal text-heading px-4">
                  Create a Tempo account instantly and automate your customer
                  service. Pay only for the tickets we answer. We can work with
                  companies of all sizes, from start-ups to large enterprises.
                  You can also contact us to design a custom package for your
                  business.
                </p>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="border-l-2 border-[#2563EB] h-[100%]">
                <div className="py-6">
                  <p class="text-md font-bold text-heading px-4">$1</p>
                  <p class="text-sm font-normal text-heading px-4">
                    per chat response
                  </p>

                  <p class="text-md font-bold text-heading px-4 mt-4">$1</p>
                  <p class="text-sm font-normal text-heading px-4">
                    per email response
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-6 shadow-sm">
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="font-bold text:xs sm:text-2xl text-heading border-l-2 border-[#2563EB] px-4">
                  Free signup bonus
                </p>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="text-sm font-normal text-heading px-4">
                  All new Tempo customers receive $200 in free Tempo credits to
                  get up and running instantly. The best part? No contracts or
                  commitment necessary.
                </p>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="border-l-2 border-[#2563EB] h-[100%]">
                <div className="py-6">
                  <p class="text-md font-bold text-heading px-4">$200</p>
                  <p class="text-sm font-normal text-heading px-4">credits</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-8 shadow-sm">
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="font-bold text:xs sm:text-2xl text-heading border-l-2 border-[#2563EB] px-4">
                  No added fees
                </p>
                <h6 class="font-bold cursor-pointer text-xs black py-1 text-primary mt-1 px-4">
                  {/* Learn more {">"} */}
                </h6>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="py-6">
                <p class="text-sm font-normal text-heading px-4">
                  24/7 service, &lt;1 minute response times, and multilingual
                  support are all currently included with the Tempo base
                  package. Get up and running with enterprise-grade service with
                  Tempo now.{" "}
                </p>
              </div>
            </div>
            <div
              class="w-[100%] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
              style={{ border: "1px solid rgb(220 222 225 / 55%)" }}
            >
              <div className="border-l-2 border-[#2563EB] h-[100%]">
                <div className="py-6">
                  <p class="text-md font-bold text-heading px-4">$0</p>
                  <p class="text-sm font-normal text-heading px-4">
                    24/7 support
                  </p>
                  <p class="text-sm font-normal text-heading px-4">
                    &lt;1 min SLA's
                  </p>
                  <p class="text-sm font-normal text-heading px-4">
                    100+ languages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div className="bg-white">
        <Container>
          <FaqAccordian
            title={"Frequently Asked Questions"}
            items={questions}
          />
        </Container>
        <Testimonial />
      </div>
    </div>
  );
};

export default Pricing;
