import { useState } from "react";
import { Input } from "../Common/Input/MultiStepFormInput";
import Select from "../Common/Select/MultiStepFormSelect";
import { FormWrapper } from "./FormWrapper";
import { useRef } from "react";

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, faq } = props;
  const { header, id, text, inputFields } = faq;

  return (
    <div className="rc-accordion-card">
      <div className="rc-accordion-header">
        <div
          className={`rc-accordion-toggle p-3 ${active === id ? 'accordion_active' : ''}`}
          onClick={() => handleToggle(id)}
        >
          <h5 className="rc-accordion-title text-xl font-bold">{header}</h5>
          <i className="fa fa-chevron-down rc-accordion-icon"></i>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`rc-collapse ${active === id ? "show" : ""}`}
        style={
          active === id
            ? { height: contentEl?.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="rc-accordion-body">
          {/* <p className="mb-0">{text}</p> */}
          {inputFields.map((inputField) => (
            <div className="my-2">
              {inputField.map((ele) => (
                <div className="block  sm:flex border-b justify-between my-2 p-4">
                  <span className="text-base mb-3 sm:mb-0 font-normal inline-block">
                    {ele.text}
                  </span>{" "}
                  <input
                    name={ele.text.replace(" ", "").toLowerCase()}
                    className="border border-[#d4d4d4] font-medium px-3 min-h-[35px] bg-[#0000000d]"
                    placeholder={ele.text.replace(/\s+/g, "").toLowerCase()}
                    value={""}
                  // onChange={}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export function FirstStep({
  companyName,
  industry,
  totalNumbersOfEmployees,
  location,
  yourFunctionalAreas,
  updateFields,
  setData,
}) {
  const functionalAreas = [
    "Information Technology",
    "Operations",
    "HR",
    "Call/Cotact Center",
    "Finance/Procurement",
    "Executive Leadership/Management",
    "Other",
  ];

  const analysis = ["Unified Communications ", "Contact Center", "Both"];
  const compare8X8 = [
    "Existing on-premise system",
    "New on-premise",
    "New Clound solution",
  ];

  const faqs = [
    {
      id: 1,
      header: "Unified communication profile",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
      inputFields: [
        [{ text: "Number of users" }, { text: "Number of locations" }],
        [
          {
            text: "PSTN charges (including connectivity, voice and data continuity)",
          },
          { text: "International calling" },
          { text: "Audio and video conferencing" },
          { text: "Team messaging" },
          { text: "Audio and video conferencing" },
          { text: "Team messaging" },
          { text: "Service, maintenance, and support" },
          { text: "Desk phones" },
          {
            text: "Facilities costs on PBX (including space, power, cooling, etc.)",
          },
          { text: "Internet Fax services" },
        ],
      ],
    },
  ];

  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <>
      <FormWrapper title="Tell us about your organistion">
        <div className="mb-4 mt-3 sm:mt-0">Enter the following information</div>
        <div className="block sm:flex  justify-between  items-stretch gap-4">
          <div className="w-full mb-3 sm:mb-0">
            <label className="block text-[#595b89]">Company Name</label>
            <Input
              autoFocus
              required
              type="text"
              value={companyName}
              onChange={(e) => updateFields({ companyName: e.target.value })}
            />
          </div>
          <div className="w-full mb-3 sm:mb-0">
            <label className="block text-[#595b89]">Industry</label>
            <Select
              value={industry}
              data={[
                "Select one",
                "Banking/Finance",
                "Construction",
                "Eduction",
                "Energy & Utilities",
                "Government",
                "Healthcare",
                "Insurance",
                "Legal",
                "Manufacturing",
                "Media & Entertainment",
                "Real Estate and Rental Leasing",
              ]}
              onChange={(value) => updateFields({ industry: value })}
            />
          </div>

          <div className="w-full mb-3 sm:mb-0">
            <label className="block text-[#595b89]">
              Total numbers of employees
            </label>
            {/* <input
              required
              type="number"
              value={totalNumbersOfEmployees}
              onChange={(e) =>
                updateFields({ totalNumbersOfEmployees: e.target.value })
              }
            /> */}

            {/* <Input
              value={totalNumbersOfEmployees}
              onChange={(e) =>
                updateFields({ totalNumbersOfEmployees: e.target.value })
              }
              required={true}
            /> */}
            <Select
              value={industry}
              data={[
                {
                  key: "Employees",
                  value: "",
                },

                {
                  key: "21 - 200 employees",
                  value: "21-200",
                },
                {
                  key: "201 - 10,000 employees",
                  value: "201-10000",
                },
                {
                  key: "10,001 +employees",
                  value: "10001",
                },
              ]}
              onChange={(value) => updateFields({ industry: value })}
            />
          </div>
          {/* <div className="w-full mb-3 sm:mb-0">
            <label className="block text-[#595b89]">Location</label>
            <Select
              value={location}
              data={[
                "United States",
                "Australia",
                "Asia",
                "Canada",
                "Central/South America",
                "Europe",
                "United Kingdom",
              ]}
              onChange={(value) => updateFields({ location: value })}
            />
          </div> */}
        </div>
        <div className=" mt-10">
          <span className="block font-bold mb-7">Your functional area(s)</span>
          <div className="flex flex-wrap gap-3">
            {functionalAreas.map((ele, index) => (
              <div
                key={index}
                onClick={() => {
                  updateFields({
                    yourFunctionalAreas: yourFunctionalAreas.filter(
                      (area) => area.toLowerCase() !== ele.toLocaleLowerCase()
                    ),
                  });
                  // updateFields({
                  //   name: "yourFunctionalAreas",
                  //   value: ele.replace(/\s/g, ""),
                  // });
                }}
                className=" grid place-items-center shadow-md  rounded-[4px]  py-[7px] px-[15px] min-h-[50px] text-[#755b85] cursor-pointer hover:bg-[#142543] hover:text-white "
              >
                {ele}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 mb-5 grid  grid-cols-1 sm:grid-cols-2 ">
          <div className="mb-3 sm:mb-0">
            <span className="font-bold ">
              Solution(s) to be included in the analysis
            </span>
            &nbsp; (select one)
            <div className="flex gap-3 mt-5">
              {analysis.map((ele) => (
                <div className="grid place-items-center shadow-md border-[1px] border-[#CCCCCC] rounded-[4px]  py-[7px] px-[15px] min-h-[50px] cursor-pointer text-[#755b85] hover:bg-[#142543] hover:text-white">
                  {ele}
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <span className="font-bold">Compare 8x8 to</span>
            &nbsp;(select one)
            <div className="flex gap-3 mt-5">
              {compare8X8.map((ele) => (
                <div className="grid place-items-center shadow-md  border-[1px] border-[#CCCCCC] rounded-[4px]  py-[7px] px-[15px] min-h-[50px] cursor-pointer text-[#755b85] hover:bg-[#142543] hover:text-white">
                  {ele}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FormWrapper>
      <FormWrapper title="Customize assumptions">
      <div className="mb-4">
        Tell us about current phone, video and team messaging costs.
      </div>

      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 mt-2">
            <div className="shadow-lg bg-[#fff] rounded-md text-sm  font-semibold text-[#475f7b] ">
              <div className="card-body">
                {faqs.map((faq, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      active={active}
                      handleToggle={handleToggle}
                      faq={faq}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
    </>
  );
}
