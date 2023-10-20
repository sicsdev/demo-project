import { Input } from "../Common/Input/Input";
import Select from "../Common/Select/Select";
import { FormWrapper } from "./FormWrapper";

export function FirstStep({
  companyName,
  totalNumbersOfEmployees,
  age,
  updateFields,
}) {
  const functionalAreas = [
    "Information Technology",
    "Operations",
    "HR",
    "Call/Cotact Center",
    "Finance/Procurement",
    "Executive Leadership/Management",
  ];
  return (
    <>
      <FormWrapper title="Tell us about your organistion">
        <div className="flex  justify-between  items-stretch gap-4">
          <div className=" w-full border">
            <label className="block">Company Name</label>
            <Input
              className="w-full border-gray rounded-none"
              value={totalNumbersOfEmployees}
              onChange={(e) => updateFields({ companyName: e.target.value })}
              required={true}
            />
            {/* <input
              autoFocus
              required
              type="text"
              className="w-100"
              value={companyName}
              onChange={(e) => updateFields({ companyName: e.target.value })}
            /> */}
          </div>
          <div className="w-full border">
            <label className="block">Industry</label>
            <Select className="" data={[1, 2, 3, 4]} />
          </div>

          <div className="w-full border">
            <label className="block">Total numbers of employees</label>
            {/* <input
              required
              type="number"
              value={totalNumbersOfEmployees}
              onChange={(e) =>
                updateFields({ totalNumbersOfEmployees: e.target.value })
              }
            /> */}

            <Input
              className="w-full border-gray rounded-none"
              value={totalNumbersOfEmployees}
              onChange={(e) =>
                updateFields({ totalNumbersOfEmployees: e.target.value })
              }
              required={true}
            />
          </div>
          <div className="w-full border">
            <label className="block">Location</label>
            <Select className="" data={[1, 2, 3, 4]} />
          </div>
        </div>
        <div>
          <span className="block">Your functional area(s)</span>
          <div className="flex gap-2">
          {functionalAreas.map((ele) => (
            <div className="inline">{ele}</div>
          ))}
          </div>
        </div>
      </FormWrapper>
    </>
  );
}
