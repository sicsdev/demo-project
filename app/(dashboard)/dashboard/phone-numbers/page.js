"use client";
import SelectOption from "@/app/components/Common/Input/SelectOption";
import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const handleAccordionButtonClickSecond = () => {
    setIsOpen1(!isOpen1); // Toggles the state between true and false
  };

  const handleAccordionButtonClick = () => {
    setIsOpen(!isOpen); // Toggles the state between true and false
  };
  return (
    <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
      <div className="p-4  max-w-[90%] sm:max-w-[100%] sm:w-[100%]  ">
        <div>
          {/* <p className="font-normal text-sm text-[#9CA3AF]">
            ← Back to phone numbers
          </p> */}
          <h3 className="font-bold text-heading text-xl mt-6">
            Primary (917) 746-7800
          </h3>
          <p className="text-heading font-normal text-normal">
            Manage settings for this inbox
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="mt-5">
            <h3 className="font-semibold text-md text-heading">
              Icon and name
            </h3>
            <p className="text-sm my-1 text-[#9CA3AF]">
              Everyone in your workspace can see this
            </p>
          </div>
          <div className="flex gap-5">
            <button className="bg-[#f3f3f5] rounded-lg p-1 px-3">
              <img className="w-6" src="/thunder.png" />
            </button>
            <input
              required=""
              placeholder="Business Name"
              className="py-3 mt-1 undefined block border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full null"
              id="Primary"
              type="text"
              value="New Business"
              name="business_name"
            />
          </div>
        </div>
        <hr className="border-border"></hr>
        <div className="flex justify-between items-center my-8">
          <div className="">
            <h3 className="font-semibold text-md text-heading">
              Caller ID name
            </h3>
            <p className="text-sm my-1 text-[#9CA3AF]">
              Customize what your recipients see when you call
            </p>
          </div>
          <div className="gap-5">
            <div className="selectdiv">
              <select className="mt-1 block w-full px-5  bg-white border  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                <option value={""} disabled>
                  Select
                </option>
                <option value="dummy">No Caller ID name</option>
                <option value="dummy">No Caller ID name 2</option>
              </select>
            </div>
          </div>
        </div>
        <hr className="border-border"></hr>
        <div className="flex justify-between items-center my-8">
          <div className="">
            <h3 className="font-semibold text-md text-heading">
              Auto record calls
            </h3>
            <p className="text-sm my-1 text-[#9CA3AF]">
              Automatically record all calls to this number. Make sure you stay
              complaint with recording rules in your region.
            </p>
          </div>
          <div className="">
            <label className="switch">
              <input type="checkbox" name="billingEnabled" />
              <span className="slider round h-[27px] w-[55px]"></span>
            </label>
          </div>
        </div>
        <hr className="border-border"></hr>
        <div className="flex justify-between items-center my-8">
          <div className="">
            <h3 className="font-semibold text-md text-heading">
              International calling and messaging
            </h3>
            <p className="text-sm my-1 text-[#9CA3AF]">
              Allow international calling and messaging on this phone number.
              Extra charges will apply per message sent and call minute. check
              rates
            </p>
          </div>
          <div className="">
            <label className="switch">
              <input type="checkbox" name="billingEnabled" />
              <span className="slider round h-[27px] w-[55px]"></span>
            </label>
          </div>
        </div>
        <hr className="border-border"></hr>
{/* 
        <div className="flex justify-between items-center mt-5">
          <div className="">
            <h3 className="font-bold text-heading text-xl mt-6">Users</h3>
            <p className="text-heading font-normal text-normal pt-1 sm:w-[80%]">
              Users can see and use this inbox from the side menu, receive all
              notifications by default, and view all calls and messages.
            </p>
          </div>
          <div className="button_">
            <button
              type="button"
              className="border-2 border-gray-600 focus:outline-none font-semibold rounded-md text-sm py-2.5  inline-block  bg-white px-6 pb-2 pt-2  leading-normal text-black "
            >
              Add users
            </button>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 w-full m-auto sm:pt-8 sm:pb-4">
          <div className="flex gap-2 items-center">
            <p className="text-[#9CA3AF] font-normal text-normal pt-1">Name</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-[#9CA3AF] font-normal text-normal pt-1">
              Access
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full m-auto">
          <div className="flex gap-2 items-center">
            <img class="w-8 h-8 rounded-full" src="/bot.png" alt="user photo" />
            <p className="text-black font-normal text-normal pt-1">
              Frank Leonard
            </p>
          </div>
          <div className="">
            <p className="text-[#9CA3AF] font-normal text-normal pt-1">Owner</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-5">
          <div className="">
            <h3 className="font-bold text-heading text-xl mt-6">Call flow</h3>
            <p className="text-heading font-normal text-normal pt-1">
              Manage and configure the incoming call flow
            </p>
          </div>
          <div className="button_">
            <button
              type="button"
              className="border-2 border-gray-600 focus:outline-none font-semibold rounded-md text-sm py-2.5  inline-block  bg-white px-6 pb-2 pt-2  leading-normal text-black "
            >
              Forward all calls
            </button>
          </div>
        </div>

        {/* accordion */}
        <div className="nav-accordian mt-4" style={{ height: "auto" }}>
          <Accordion allowZeroExpanded >
            <AccordionItem>
              <AccordionItemHeading className="mobile_arroww" onClick={()=>handleAccordionButtonClick()}>
                <AccordionItemButton   >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4" >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          class="h-10 w-10 text-gray-500"
                        >
                          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                        </svg>
                      </div>
                      <div className="">
                        <h3 className="font-semibold text-md text-heading">
                          Business hours
                        </h3>
                        <p className="text-sm my-1 text-[#9CA3AF]">
                          Control how this phone number works at different times
                          of day
                        </p>
                      </div>
                    </div>
                    <div className="disable_btn bg-[#f3f3f5] rounded-lg px-3 py-2 text-sm mr-6">
                      <span className="">          {isOpen ? 'Enable' : 'Disable'}
</span>
                    </div>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>

              <AccordionItemPanel>dummy</AccordionItemPanel>
            </AccordionItem>
          </Accordion>

          <Accordion allowZeroExpanded >
            <AccordionItem>
              <AccordionItemHeading className="mobile_arroww"  onClick={()=>handleAccordionButtonClickSecond()}>
                <AccordionItemButton>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          class="h-10 w-10 text-gray-500"
                        >
                          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                        </svg>
                      </div>
                      <div className="">
                        <h3 className="font-semibold text-md text-heading">
                          Phone menu
                        </h3>
                        <p className="text-sm my-1 text-[#9CA3AF]">
                          Configure a custom phone menu callers can navigate
                        </p>
                      </div>
                    </div>
                    <div className="disable_btn bg-[#f3f3f5] rounded-lg px-3 py-2 text-sm mr-6">
                      <span className="">   <span className="">          {isOpen1 ? 'Enable' : 'Disable'}
</span></span>
                    </div>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>

              <AccordionItemPanel>
                <div className="flex justify-between items-center">
                  <div className="sm:w-[60%]">
                    <h3 className="font-semibold text-md text-heading">
                      International calling and messaging
                    </h3>
                    <p className="text-sm my-1 text-[#9CA3AF]">
                      Allow international calling and messaging on this phone
                      number. Extra charges will apply per message sent and call
                      minute. check rates
                    </p>
                  </div>
                  <div className="">
                    <label className="switch">
                      <input type="checkbox" name="billingEnabled" />
                      <span className="slider round h-[27px] w-[55px]"></span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <div className="">
                    <h3 className="font-semibold text-md text-heading">
                      Greeting message
                    </h3>
                    <p className="text-sm my-1 text-[#9CA3AF]">
                      Manage and configure the incoming call flow
                    </p>
                  </div>
                  <div className="button_">
                    <button
                      type="button"
                      className="border-2 border-gray-600 focus:outline-none font-semibold rounded-md text-sm py-2.5  inline-block  bg-white px-6 pb-2 pt-2  leading-normal text-black "
                    >
                      Set a greeting message
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <div className="">
                    <h3 className="font-semibold text-md text-heading">
                      Menu Options
                    </h3>
                    <p className="text-sm my-1 text-[#9CA3AF]">
                      Options are triggered by keypad manage and configure the
                      incoming call flow. Extra charges will apply per message
                      sent and call minute.
                    </p>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>

        {/* accordion */}
      </div>
    </div>
  );
};

export default page;
