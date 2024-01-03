"use client";
import TextField from "@/app/components/Common/Input/TextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";

const TrialForm = ({ formData, setFormData, pop, setPop, namepop, setNamePop }) => {
  const formatPhoneNumber = (value) => {
    // Remove all characters except digits
    let numbersOnly = value.replace(/[^\d]/g, "");

    // Add back the +1 country code
    numbersOnly =
      "1" + numbersOnly.substring(numbersOnly.startsWith("1") ? 1 : 0);

    // Apply formatting to match the pattern +1 (XXX) XXX-XXXX
    if (numbersOnly.length > 1) {
      // Add parentheses and space after the area code (3 digits)
      if (numbersOnly.length < 5) {
        return `+1 (${numbersOnly.slice(1)}`;
      }
      // Add a space and hyphen after the next block of 3 digits
      if (numbersOnly.length < 8) {
        return `+1 (${numbersOnly.slice(1, 4)}) ${numbersOnly.slice(4)}`;
      }
      // Full format
      return `+1 (${numbersOnly.slice(1, 4)}) ${numbersOnly.slice(
        4,
        7
      )}-${numbersOnly.slice(7, 11)}`;
    }

    return "+1 ";
  };

  const blacklist = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "yopmail.com",
    "outlook.com",
    "me.com",
    "comcast.net",
    "msn.com",
    "live.com",
    "att.net",
    "ymail.com",
    "sbcglobal.net",
    "mac.com",
    "verizon.net",
    "bellsouth.net",
    "cox.net",
    "rocketmail.com",
    "protonmail.com",
    "charter.net",
    "mail.com",
    "optonline.net",
    "aim.com",
    "earthlink.net",
  ];

  const handleBlackList = () => {
    if (blacklist.includes(formData?.email.split("@")[1])) {
      setPop(true);
    }
    else {
      setPop(false);
    }
  };


  const handleInputValues = (e) => {
  
    let { value, name } = e.target;
    if (name === "email") {
setPop(false);
    }
    if (name === "phone") {
      value = formatPhoneNumber(value);
    }
    
    if (
      name === "first_name" ||
      name === "last_name" ||
      name === "company_name"
    ) {
      value = value.replace(/[0-9]/g, "");
    }
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const RemoveUrls = (element) => {
    const updatedChips = formData?.urls.filter((x) => x !== element);
    setFormData((prev_state) => {
      return {
        ...prev_state,
        urls: [...updatedChips],
      };
    });
  };

  const handleUrlValue = (e) => {
    const { value } = e.target;
    if (value.includes(" ") || value.includes(".com")) {
      const url_values = value.split(" ");
      setFormData((prev) => {
        return {
          ...prev,
          faq_url: "",
        };
      });
      url_values.forEach((name) => {
        const trimmedUrl = name.trim();
        if (trimmedUrl && !formData?.urls.includes(trimmedUrl)) {
          setFormData((prev_state) => {
            return {
              ...prev_state,
              urls: [...prev_state.urls, trimmedUrl],
            };
          });
        }
      });
    } else {
      setFormData({ ...formData, faq_url: value });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      const url_values = value.split(" ");

      setFormData((prev) => ({
        ...prev,
        faq_url: "",
        urls: [
          ...new Set([...prev.urls, ...url_values.map((name) => name.trim())]),
        ],
      }));
    }
  };

  const handleDownload = () => {
    // const pdfPath = "Deflection AI.docx.pdf";
    // const link = document.createElement("a");
    // link.href = pdfPath;
    // link.target = "_blank";
    // link.download = "downloaded_file.pdf";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };
  return (
    <div className="w-full sm:w-[40%] md:w-[40%] lg:w-[40%] mx-auto my-5">
      <div className="grid gap-2 sm:mt-[12px] sm:gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {pop == true ? <>    <div id="tooltip-bottom" role="tooltip" className="absolute z-10 ml-[5rem]  inline-block  text-[13px]  text-red shadow-sm  tooltip ">
            Please enter a valid work email
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div></> : ""}
          <TextField
            type="email"
            id="email"
            name="email"
            value={formData?.email ?? ""}
            onBlur={handleBlackList}
            onChange={handleInputValues}
            className="py-3 mt-1 outline-none"
            title={
              <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                <span>Email</span>{" "}
              </div>
            }
            placeholder={"Email"}
            error={""}
            data-tooltip-target="tooltip-bottom"
            data-tooltip-placement="bottom"
          />




        </div>

        <div className='my-2 sm:my-0 relative'>
          <TextField
            type="text"
            id="phone"
            name="phone"
            value={formData?.phone ?? "+1"}
            onChange={handleInputValues}
            className="py-3 mt-1 outline-none"
            title={
              <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                <span>Phone</span>{" "}
              </div>
            }
            placeholder={"Phone"}
            error={""}
          />
        </div>

        {/* <div className='my-2 sm:my-0'>

          <div className='flex items-center inline'>
            <label className={`opacity-90 block text-sm text-heading text-lg`}>
              Cell Phone
            </label>
          </div>
          <div className="relative flex items-center mt-1">
            <small className="z-50 m-auto text-[#b5b5b5] absolute inset-y-0 left-0 flex items-center pointer-events-none mx-2" style={{ fontSize: '15px' }}>
              +1
            </small>
            <input
              style={{ paddingLeft: '27px' }}
              onChange={handleInputValues}
              value={formData?.phone ?? "+1"}
              className="w-1/2 new_input_phone block border-[0.2px] bg-white  rounded-md shadow-sm placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 border-input_color border-danger invalid:border-danger invalid:text-danger"
              placeholder=''
              id='phone'
              name='phone'
              title={"Phone"}
              type="Number"
            >
            </input>
          </div>
        </div> */}

      </div>
      <div className="my-2 sm:my-0 grid gap-2 sm:gap-[15px] sm:mt-[12px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <div>
        {namepop == true ? <>    <div id="tooltip-bottom" role="tooltip" className="absolute z-10 ml-[5rem]  inline-block  text-[13px]  text-red shadow-sm  tooltip ">
            Please enter valid information
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div></> : ""}
          <TextField
            type="text"
            id="first_name"
            name="first_name"
            value={formData?.first_name ?? ""}
            onChange={handleInputValues}
            // onBlur={handleFirstName}
            className="py-3 mt-1 outline-none"
            title={
              <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                <span>First Name</span>{" "}
              </div>
            }
            placeholder={"First Name"}
            error={""}
          />
        </div>
        <div className='my-2 sm:my-0'>
          <TextField
            type="text"
            id="last_name"
            name="last_name"
            value={formData?.last_name ?? ""}
            onChange={handleInputValues}
            className="py-3 mt-1 outline-none"
            title={
              <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                <span>Last Name</span>{" "}
              </div>
            }
            placeholder={"Last Name"}
            error={""}
          />
        </div>

      </div>
      <div className="grid gap-2 sm:gap-[15px] grid-cols-1 sm:mt-[12px] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mb-2">

        <div className=''>
          <TextField
            type="text"
            id="company_name"
            name="company_name"
            value={formData?.company_name ?? ""}
            onChange={handleInputValues}
            className="py-3 mt-1 outline-none"
            title={
              <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                <span>Company Name</span>{" "}
              </div>
            }
            placeholder={"Company Name"}
            error={""}
          />
        </div>

        <div className='my-2 sm:my-0'>
          <TextField
            type="text"
            id="url"
            name="url"
            value={formData?.url ?? ""}
            onChange={handleInputValues}
            className="py-3 mt-1 outline-none"
            title={
              <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
                <span>Website Url</span>{" "}
              </div>
            }
            placeholder={"Website Url"}
            error={""}
          />
        </div>
      </div>

      {/* <div className=" col-span-2 inline my-2 sm:my-0 ">
        <div className="flex items-center mb-1 sm:mt-[12px] my-2 sm:my-0">
          <label
            className={`new_input_label block text-sm text-heading font-medium`}
          >
              <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
              <span>Help Center Url</span>{" "}
            </div>
          </label>
        </div>

        <div
          className={`flex flex-wrap justify-start items-center border h-auto w-auto border-[#C7C6C7]  rounded-md mt-1 ${
            formData?.urls && formData?.urls.length > 0 && "px-1"
          }`}
        >
          <div
            style={{ rowGap: "5px" }}
            className={` ${
              formData?.urls && formData?.urls.length > 0 ? "py-1" : ""
            } flex flex-wrap items-center justify-start gap-1`}
          >
            {formData?.urls &&
              formData?.urls.length > 0 &&
              formData?.urls.map((element, key) => (
                <div
                  className="[word-wrap: break-word]   flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] key  px-[10px] py-0 text-[13px] font-normal normal-case leading-loose text-heading shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]  border border-border"
                  key={key}
                >
                  {element.trim()}
                  <XMarkIcon
                    className=" h-4 w-4 cursor-pointer "
                    onClick={(e) => {
                      RemoveUrls(element);
                    }}
                  />
                </div>
              ))}
          </div>
          <input
            onKeyDown={handleKeyDown}
            value={formData?.faq_url ?? ""}
            required
            onChange={handleUrlValue}
            type={"text"}
            placeholder={
              formData?.urls && formData?.urls.length > 0
                ? "Add another url"
                : "Add your Help Center or FAQ URL"
            }
            className={` block  px-2 py-2 !font-[500] bg-white focus:bg-white  rounded-md  text-sm    !placeholder-[#C7C6C7]  focus:outline-none border  disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:!border-none  w-full sm:w-[220px]  border-none ring-0 focus-visible:border-none`}
            id={"faq_url"}
            name={"faq_url"}
          />
        </div>

      </div> */}

      <div className='my-2 sm:my-0'>
        <TextField
          type="text"
          id="faq_url"
          name="faq_url"
          value={formData?.faq_url ?? ""}
          onChange={handleInputValues}
          className="py-3 mt-1 outline-none"
          title={
            <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
              <span>Your FAQ Url</span>{" "}
            </div>
          }
          placeholder={"Add your Help Center or FAQ URL"}
          error={""}
        />
      </div>
      {/* 
      <div className=" col-span-2 sm:mt-[12px] my-4 sm:my-0">
        <TextField
          type="password"
          id="password"
          name="password"
          value={formData?.password ?? ""}
          onChange={handleInputValues}
          className="py-3 mt-1 outline-none"
          title={
            <div className="flex items-center gap-2 w-[150px] text-sm md:text-[14px] sm:text-[14px]">
              <span>Password</span>{" "}
            </div>
          }
          placeholder={"Password"}
          error={""}
        />
      </div> */}

      <div className="flex items-center my-6">
        <input
          id="link-checkbox"
          type="checkbox"
          className="p-1 custom-checkbox w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          style={{ width: '21px', height: '21px' }}
          onChange={(e) =>
            setFormData((prev) => {
              return {
                ...prev,
                checked: !prev?.checked ? true : false,
              };
            })
          }
        />
        <label
          htmlFor="link-checkbox"
          className="ml-2 text-lg sm:text-[14px] font-medium text-border "
        >
          I agree with the{" "}
          <a
            href="/terms-of-service"
            className="text-primary dark:text-blue-500 hover:underline"
            onClick={(e) => handleDownload()}
          >
            Terms of Service{" "}
          </a>
          and{" "}
          <a
            href="/privacy-policy"
            className="text-primary dark:text-blue-500 hover:underline"
            onClick={(e) => handleDownload()}
          >
            Privacy Policy
          </a>
          .
        </label>
      </div>
    </div>
  );
};

export default TrialForm;
