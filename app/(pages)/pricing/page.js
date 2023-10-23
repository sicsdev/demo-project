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
import { useMultiStepFrom } from "@/app/hooks/useMultiStepForm";
import { FirstStep } from "@/app/components/MutliStepForm/FirstStep";
import { SecondStep } from "@/app/components/MutliStepForm/SecondStep";
import { ThirdStep } from "@/app/components/MutliStepForm/ThirdStep";

import "./style.css";
// import {
//   First,
//   SecondStep,
//   ThirdStep,
// } from "@/app/components/MutliStepForm";
// import { First } from "@/app/components/MutliStepForm/FirstStep";

const INITIAL_DATA = {
  companyName: "",
  totalNumbersOfEmployees: "",
  yourFunctionalAreas: [],
};
import Newstandard from "@/app/components/Newstandardpage/Newstandard";
import Motioncards from "@/app/components/Motioncards/page";
import { Modal } from "@/app/components/MutliStepForm/Modal/Modal";

const Pricing = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [isModalOpen, setModalOpen] = useState(false);
  console.log("=>", data);

  function toggleModal() {
    setModalOpen(!isModalOpen);
  }

  function updateFields(fields) {
    const { name, value } = fields;
    setData((prev) => {
      switch (name) {
        case "yourFunctionalAreas":
          const { yourFunctionalAreas } = prev;
          if (yourFunctionalAreas.includes(value)) {
            yourFunctionalAreas.splice(yourFunctionalAreas.indexOf(value), 1);
          } else yourFunctionalAreas.push(value);
          return { ...prev };
        default:
          return { ...prev, ...fields };
      }
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepFrom([
      <FirstStep  key={0} {...data} updateFields={updateFields} />,
      <SecondStep  key={1} {...data} updateFields={updateFields} />,
      <ThirdStep key={2} {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e) {
    e.preventDefault();
    if (!isLastStep) return next();
    // alert("Successful Account Creation");
    toggleModal();
  }

  const stepsTab = [
    { title: "Step 1" },
    { title: "Step 2" },
    { title: "Step 3" },
  ];

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
      <div className="p-4">
        <form onSubmit={onSubmit}>
          <div className="">
            <div className="flex flex-wrap mx-3">
              <div></div>
              {stepsTab.map((ele, index) => (
                <div
                  className={`p-5 px-15 min-h-[56px] text-[#93949a]  font-bold text-base text-center min-w-[250px]  bg-[#f0f0f0] ${
                    currentStepIndex === index && "active"
                  }`}
                >
                  {ele?.title}
                </div>
              ))}
            </div>
            <div></div>
            {/* Step {currentStepIndex + 1}  */}
          </div>
          <Modal isOpen={isModalOpen} onClose={toggleModal} />
          {step}
          <div className="mt-4 flex justify-center  sm:justify-start gap-2">
            {!isFirstStep && (
              <button
                className="bg-[#142543] text-white px-4  min-h-[30px] rounded-3xl  text-base  h-9 w-24 font-bold"
                type="button"
                onClick={back}
              >
                Back
              </button>
            )}
            <button
              className="bg-[#142543] text-white px-4 min-h-[30px] rounded-3xl  text-base  h-9 w-24 font-bold"
              type="submit"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
      <Panelcardnew />

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
        <Newstandard />
        <Motioncards />
        <Testimonial />
      </div>
    </div>
  );
};

export default Pricing;
