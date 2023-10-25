import { useState } from "react";
import { Input } from "../Common/Input/MultiStepFormInput";
import Select from "../Common/Select/MultiStepFormSelect";
import { FormWrapper } from "./FormWrapper";
import { business_company_size_data } from "../Forms/data/FormData";
import TextField from "../Common/Input/TextField";
import SelectField from "../Common/Input/SelectField";




export function FirstStep({
  data,
  setData,
  handleInputValues
}) {
  console.log("data", data)
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
 
  const handleAreaClick = (area) => {
    setData((prev) => {
      const isAreaSelected = prev.yourFunctionalAreas?.includes(area);
      const updatedAreas = isAreaSelected
        ? prev.yourFunctionalAreas.filter(selected => selected !== area) // Remove the area
        : [...(prev.yourFunctionalAreas || []), area]; // Add the area

      return {
        ...prev,
        yourFunctionalAreas: updatedAreas
      }
    });
  };

  return (
    <>
      <FormWrapper title="Tell us about your organistion">
        <div className="mb-4 mt-3 sm:mt-0">Enter the following information</div>
        <div className="block sm:flex  justify-between  items-stretch gap-4">
          <div className="w-full mb-3 sm:mb-0">
            <TextField
              type="text"
              id="companyName"
              name="companyName"
              value={data.companyName ?? ''}
              onChange={handleInputValues}
              className="py-3 mt-1"
              title={
                <div className="flex items-center gap-2 w-[150px]">
                  <span>Company Name</span>{" "}
                </div>
              }
              placeholder={"Company Name"}
              error={''}
            />
          </div>
          <div className="w-full mb-3 sm:mb-0">
            <SelectField
              id="industry"
              name="industry"
              value={data.industry ?? ''}
              onChange={handleInputValues}
              values={[
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
              title={
                <div className="flex items-center gap-2 w-[150px]  mb-3">
                  <span> Industry</span>{" "}
                </div>
              }
              className="py-3"
            />{" "}
          </div>

          <div className="w-full mb-3 sm:mb-0">

            <SelectField
              id="totalNumbersOfEmployees"
              name="totalNumbersOfEmployees"
              value={data.totalNumbersOfEmployees ?? ''}
              onChange={handleInputValues}
              values={business_company_size_data}
              title={
                <div className="flex items-center gap-2 w-[300px]  mb-3">
                  <span> Total numbers of employees</span>{" "}
                </div>
              }
              className="py-3"
            />{" "}
          </div>
        </div>
        <div className="block sm:flex  justify-between  items-stretch gap-4 my-4">
          <div className="w-full mb-3 sm:mb-0">
            <TextField
              id="AgentNumber"
              name="AgentNumber"
              type="number"
              value={data.AgentNumber ?? ''}
              onChange={handleInputValues}
              className="py-3 mt-1"
              title={
                <div className="flex items-center gap-2 w-[150px]">
                  <span>Number of Agents</span>{" "}
                </div>
              }
              placeholder={"Number of Agents"}
              error={''}
            />
          </div>
          <div className="w-full mb-3 sm:mb-0">

            <TextField
              id="dailyTicketVolume"
              name="dailyTicketVolume"
              type="number"
              value={data.dailyTicketVolume ?? ''}
              onChange={handleInputValues}
              className="py-3 mt-1"
              title={
                <div className="flex items-center gap-2 w-[150px]">
                  <span>Daily Ticket Volume</span>{" "}
                </div>
              }
              placeholder={"Daily Ticket Volume"}
              error={''}
            />
          </div>
          <div className="w-full mb-3 sm:mb-0">
            <TextField
              id={'avgAgentHourlyWage'}
              name={'avgAgentHourlyWage'}
              type="number"
              value={data?.avgAgentHourlyWage ?? ''}
              onChange={handleInputValues}
              className="py-3 mt-1"
              title={
                <div className="flex items-center gap-2 w-[150px]">
                  <span>Avg. Agent Hourly Wage</span>{" "}
                </div>
              }
              placeholder={"Avg. Agent Hourly Wage"}
              error={''}
            />
          </div>
        </div>
        <div className=" mt-10">
          <span className="block font-bold mb-7">Your functional area(s)</span>
          <div className="flex flex-wrap gap-3">
            {functionalAreas.map((ele, index) => (
              <div
                key={index}
                onClick={() =>
                  handleAreaClick(ele)
                }
                className={`grid  place-items-center shadow-md  rounded-[4px]  py-[7px] px-[15px] min-h-[50px]  ${data?.yourFunctionalAreas && data?.yourFunctionalAreas.includes(ele) ? 'bg-[#142543] text-white' : "text-heading"} cursor-pointer hover:bg-[#142543] hover:text-white`}
              >
                <p className="new_input_label1 block text-sm ">    {ele}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="mt-10 mb-5 grid  grid-cols-1 sm:grid-cols-2 ">
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
        </div> */}
      </FormWrapper>

    </>
  );
}
