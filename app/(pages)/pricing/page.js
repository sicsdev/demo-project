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

import "./style.css";

const INITIAL_DATA = {
  companyName: "",
  industry: "",
  totalNumbersOfEmployees: "",
  // location: "United States",
  yourFunctionalAreas: [],
  AgentNumber: 0,
  dailyTicketVolume: 0,
  avgAgentHourlyWage: 0,

};
import Newstandard from "@/app/components/Newstandardpage/Newstandard";
import Motioncards from "@/app/components/Motioncards/page";
import Modal from "@/app/components/Common/Modal/Modal";
import TextField from "@/app/components/Common/Input/TextField";
import { createContactInFreshsales } from "@/app/API/components/Demo";

const Pricing = () => {
  const [data, setData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  function toggleModal() {
    setModalOpen(!isModalOpen);
  }

  function updateFields(event) {
    const { value, name } = event.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }
  const handleInputValues = (event) => {
    const { value, name } = event.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: checked
    }));
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepFrom([
      <FirstStep
        key={0}
        data={data}
        updateFields={updateFields}
        setData={setData}
        handleInputValues={handleInputValues}
      />,
      // <SecondStep key={1} {...data} updateFields={updateFields} />,
      <SecondStep key={1}
        formData={data}
        updateFields={updateFields}
        setFormData={setData} />,
    ]);

  const formulaValues = (type) => {
    let values = null
    if (type === 'FIRST') {
      values = (parseInt(data?.dailyTicketVolume) * 30.4) - (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7)
    } else if (type === 'SECOND') {
      values = 12 * (parseInt(data?.dailyTicketVolume) * 30.4) - (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7)
    } else if (type === 'MONTH1') {
      values = .2 * (parseInt(data?.dailyTicketVolume) * 30.4) - (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7)
    } else if (type === 'MONTH2') {
      values = .5 * (parseInt(data?.dailyTicketVolume) * 30.4) - (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7)
    } else if (type === 'MONTH3') {
      values = 8 * (parseInt(data?.dailyTicketVolume) * 30.4) - (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7)
    }
    return values
  }
  function onSubmit(e) {
    e.preventDefault();
    // alert("Successful Account Creation");
    toggleModal();
  }
  const submitModal = async () => {
    const payload = {
      firstname: data?.firstName,
      lastname: data?.lastName,
      email: data?.companyEmail,

    }
    if (data?.phoneNumber) {
      payload['phone'] = data?.phoneNumber
    }
    const response = createContactInFreshsales(payload)
    if (response) {
      setData(prev => {
        return {
          ...prev,
          AgentNumberAvg: formulaValues('FIRST'),
          dailyTicketVolumeAvg: formulaValues('SECOND'),
          chartValues: [formulaValues('MONTH1').toFixed(2), formulaValues('MONTH2').toFixed(2), formulaValues('MONTH3').toFixed(2)],
        }
      })
      toggleModal()
      return next();
    }

  }
  const stepsTab = [
    { title: "Step 1" },
    { title: "Step 2" },
    { title: "Step 3" },
  ];
  const DisablingButton = () => {
    if (currentStepIndex === 0) {
      const requiredKeys = [
        "AgentNumber",
        "avgAgentHourlyWage",
        "companyName",
        "dailyTicketVolume",
        "industry",
      ];
      const isRequiredFieldsEmpty = requiredKeys.some(
        (key) => !data[key] || data[key].trim() === ""
      );
      const isFunctionalAreasValid = Array.isArray(data.yourFunctionalAreas) && data.yourFunctionalAreas.length > 0;

      return isRequiredFieldsEmpty || !isFunctionalAreasValid;
    }
  }

  const DisablingButtonModal = () => {

    const requiredKeys = [
      "firstName",
      "lastName",
      "companyEmail",
    ];
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
  
    const isRequiredFieldsEmpty = requiredKeys.some(
      (key) => !data[key] || data[key].trim() === ""
    );
  
    const isCompanyEmailValid = validateEmail(data.companyEmail);
  
    // Assuming you want to check that isSubscribed is true
    const isSubscribed = data?.isSubscribed;
  
    const isFormInvalid = isRequiredFieldsEmpty || !isCompanyEmailValid || !isSubscribed;
  
    return isFormInvalid;
  }
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
      <div className="p-4 sm:p-8  sm:px-40 ">
        {/* <form onSubmit={onSubmit}> */}
        {/* <Modal isOpen={isModalOpen} onClose={toggleModal} data={data} handleInputValues={handleInputValues} handleCheckboxChange={handleCheckboxChange} submitModal={submitModal}/> */}

        {step}
        <div className="mt-4 flex justify-center  sm:justify-start gap-2">
          {isFirstStep && (
            <button
              className="flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2 px-4 w-auto focus:ring-yellow-300 border border-primary bg-primary  text-white disabled:border-input_color  hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white"
              type="button"
              onClick={onSubmit}
              disabled={DisablingButton()}
            >
              View Savings
            </button>
          )}
        </div>
        {/* </form> */}
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
      {isModalOpen && (
        <Modal

          title={''}
          className={"sm:w-[50%] w-[100%]"}
          show={isModalOpen}
          setShow={setModalOpen}
          showCancel={true}
          customHideButton={false}
          showTopCancleButton={false}
          hr={false}
        >
          <div className="p-5">
            <div className="text-center font-bold text-2xl sm:mt-8">
              See your results and get your report
            </div>
            <div className="text-[#868794]  text-sm my-4 leading-5">
              Please send me details of 8x8 products and services that may be of interest to me, newsletters and details of events which are held or attended by 8x8. Before clicking submit, PLEASE CLICK HERE for full information about how your data will be processed.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:mr-3">
              <div className="w-full">


                <TextField
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={data.firstName ?? ''}
                  onChange={handleInputValues}
                  className="py-3 mt-1"
                  title={
                    <div className="flex items-center gap-2 w-[150px]">
                      <span>First Name</span>{" "}
                    </div>
                  }
                  placeholder={"First Name"}
                  error={''}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={data.lastName ?? ''}
                  onChange={handleInputValues}
                  className="py-3 mt-1"
                  title={
                    <div className="flex items-center gap-2 w-[150px]">
                      <span>Last Name</span>{" "}
                    </div>
                  }
                  placeholder={"First Name"}
                  error={''}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  value={data.companyEmail ?? ''}
                  onChange={handleInputValues}
                  className="py-3 mt-1"
                  title={
                    <div className="flex items-center gap-2 w-[150px]">
                      <span>Company Email</span>{" "}
                    </div>
                  }
                  placeholder={"Company Email"}
                  error={''}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  value={data.phoneNumber ?? ''}
                  onChange={handleInputValues}
                  className="py-3 mt-1"
                  title={
                    <div className="flex items-center gap-2 w-[150px]">
                      <span>Phone number (Optional)</span>{" "}
                    </div>
                  }
                  placeholder={"Phone number (Optional)"}
                  error={''}
                />
              </div>
            </div>
            <div className="flex mt-5">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="isSubscribed"
                  checked={data.isSubscribed || false}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ml-2 text-sm">
                <p
                  id="helper-checkbox-text"
                  className="text-xs font-normal tracking-tight leading-4 text-left text-gray-500 dark:text-gray-300"
                >
                  Please send me details of 8x8 products and services that may
                  be of interest to me, newsletters and details of events which
                  are held or attended by 8x8. Before clicking submit,{" "}
                  <a>PLEASE CLICK HERE</a> for full information about how your
                  data will be processed.
                </p>
              </div>
            </div>
            <div className="mt-4 mx-auto flex justify-center gap-4 items-center">
              <button
                className="flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2 px-4 w-auto focus:ring-yellow-300 border border-primary bg-white  text-primary hover:text-white hover:bg-primary hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white"
                type="button"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2 px-4 w-auto focus:ring-yellow-300 border border-primary bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:border-input_color disabled:bg-input_color disabled:shadow-none disabled:text-white"
                type="button"
                onClick={submitModal}
                disabled={DisablingButtonModal()}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Pricing;
