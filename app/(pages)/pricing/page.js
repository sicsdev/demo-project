"use client";
import Card from "@/app/components/Common/Card/Card";
import Container from "@/app/components/Container/Container";
import React, { useEffect, useRef, useState } from "react";
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
import { Homeform } from "@/app/components/LayoutNew/Homeform";
import Homeinte from "@/app/components/LayoutNew/Homeinte";
import Reach from "@/app/components/LayoutNew/Reach";
import Middlebar from "@/app/components/Info-Screen/Middlebar";
import HomeComponent from "@/app/components/Home/HomeComponent";
import Pricingbanner from "@/app/components/Security/Pricingbanner";

const Pricing = () => {
  const [data, setData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const handleClickScroll = () => {
    console.log("clicked")
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
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
  const hasSpecialCharacter = (str) => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return regex.test(str);
  }
  const handleInputValues = (event) => {
    const { value, name, type } = event.target;

    if (type === 'number') {
      if (hasSpecialCharacter(value)) {
        setData((prev) => {
          return {
            ...prev,
            [name]: ''
          }
        });
      }
      const processedValue = value.replace(/[^0-9]/g, '');
      setData((prev) => {
        return {
          ...prev,
          [name]: processedValue
        }
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          [name]: value
        }
      });
    }
  }

  const reachData = [
    {
      reach: "99.999%        ",
      name: "Clear-Cut Expenses",
      para: "With our straightforward pay-as-you-go approach, you're always in the know about what you're paying for. $1 per resolved ticket -- that's it.",
      link_title: "Leverage your data",
    },
    {
      reach: "99.999%        ",
      name: "Free Credits",
      para: "Jumpstart your journey with Deflection AI by receiving $200 in free credits upon sign up, allowing you to experience our premier service with no upfront investment.",
      link_title: "Leverage your data",
    },
    {
      reach: "55++",

      name: "No Hidden Charges",
      para: "Enjoy a comprehensive support package that includes 24/7 assistance and rapid response times, all with no additional fees.",
      link_title: "Leverage your data",
    },
  ];

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
      values = (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7) - (parseInt(data?.dailyTicketVolume) * 30.4)
    } else if (type === 'SECOND') {
      values = 12 * (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7) - (parseInt(data?.dailyTicketVolume) * 30.4)
    } else if (type === 'MONTH1') {
      values = (20 * (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7) - (parseInt(data?.dailyTicketVolume) * 30.4) / 100)
    } else if (type === 'MONTH2') {
      values = (50 * (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7) - (parseInt(data?.dailyTicketVolume) * 30.4)) / 100
    } else if (type === 'MONTH3') {
      values = (80 * (parseInt(data?.AgentNumber) * parseInt(data?.avgAgentHourlyWage) * 173.7) - (parseInt(data?.dailyTicketVolume) * 30.4)) / 100
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

      return isRequiredFieldsEmpty;
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
          content="Flexible Pricing Plans for Deflection AI.ai's Customer Support Solutions"
        />

        <meta
          name="description"
          content="Discover Deflection AI.ai's flexible pricing plans for advanced customer support solutions. Choose the package that fits your business needs and budget. Get started today"
        />
      </Helmet>
      {/* <Pricingbanner handleClickScroll={handleClickScroll} /> */}

      {/* <Panelcard  /> */}

      <Panelcardnew  />
      <Homeinte />
    
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

      <Reach handleClickScroll={handleClickScroll} data={reachData} heading={"Transparent Pricing"}/>
      <div className="bg-white">
        <Container>
          <FaqAccordian
            title={"Frequently Asked Questions"}
            items={questions}
          />
        </Container>

        <Middlebar />
        <Homeform reff={ref} />
        <HomeComponent />      </div>
    </div>
  );
};

export default Pricing;
