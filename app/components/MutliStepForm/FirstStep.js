import { Input } from "../Common/Input/MultiStepFormInput";
import Select from "../Common/Select/MultiStepFormSelect";
import { FormWrapper } from "./FormWrapper";

export function FirstStep({
  companyName,
  totalNumbersOfEmployees,
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
  return (
    <>
      <FormWrapper title="Tell us about your organistion">
        <div className="mb-4 mt-3 sm:mt-0">Enter the following information</div>
        <div className="block sm:flex  justify-between  items-stretch gap-4">
          <div className="w-full mb-3 sm:mb-0">
            <label className="block text-[#595b89]">Company Name</label>
            {/* <input
              className="w-full border-gray rounded-none px-[10px] bg-stone-400"
              value={companyName}
              onChange={(e) => updateFields({ companyName: e.target.value })}
              required={true}
            /> */}
            <Input
              autoFocus
              required
              type="text"
              className=""
              value={companyName}
              onChange={(e) => updateFields({ companyName: e.target.value })}
            />
          </div>
          <div className="w-full mb-3 sm:mb-0">
            <label className="block text-[#595b89]">Industry</label>
            <Select className="" data={[1, 2, 3, 4]} />
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

            <Input
              className=""
              value={totalNumbersOfEmployees}
              onChange={(e) =>
                updateFields({ totalNumbersOfEmployees: e.target.value })
              }
              required={true}
            />
          </div>
          <div className="w-full mb-3 sm:mb-0">
            <label className="block text-[#595b89]">Location</label>
            <Select className="" placeholder="ddds" data={[1, 2, 3, 4]} />
          </div>
        </div>
        <div className=" mt-10">
          <span className="block font-bold mb-7">Your functional area(s)</span>
          <div className="flex flex-wrap gap-3">
            {functionalAreas.map((ele, index) => (
              <div
                key={index}
                onClick={() => updateFields({
                    name: "yourFunctionalAreas",
                    value: ele.replace(/\s/g, ""),
                  })
                }
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
                <div
                  // style={{ boxShadow: "0px 3px 6px #00000029;" }}
                  className="grid place-items-center shadow-md border-[1px] border-[#CCCCCC] rounded-[4px]  py-[7px] px-[15px] min-h-[50px] cursor-pointer text-[#755b85] hover:bg-[#142543] hover:text-white"
                >
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
                <div
                  // style={{ boxShadow: "0px 3px 6px #00000029" }}
                  className="grid place-items-center shadow-md  border-[1px] border-[#CCCCCC] rounded-[4px]  py-[7px] px-[15px] min-h-[50px] cursor-pointer text-[#755b85] hover:bg-[#142543] hover:text-white"
                >
                  {ele}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FormWrapper>
    </>
  );
}
