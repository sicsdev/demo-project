import React from "react";
import TextField from "../Common/Input/TextField";
import SelectOption from "../Common/Input/SelectOption";
import TextAreaField from "../Common/Input/TextAreaField";

const Page = () => {
  return (
    <>
      <div className="w-full sm:w-[60%] my-6 gap-4 mx-auto js-show-on-scroll">
        <div className="my-3 saleform p-5 bg-white rounded-lg">
          <TextField
            //   onChange={handleInputValues}
            //   value={formValues.business_street}
            name="first_name"
            className="py-3 mt-1"
            title={"First Name"}
            placeholder={"Jane"}
            type={"text"}
            id={"first_name"}
            labelClassName={"flex items-center mt-2"}
            labelClass={"sm:w-[160px]"}
            //   error={returnErrorMessage("business_street")}
            //   onBlur={handleBlur}
          />
          <TextField
            //   onChange={handleInputValues}
            //   value={formValues.business_street}
            name="last_name"
            className="py-3 mt-1"
            title={"Last Name"}
            placeholder={"Diaze"}
            type={"text"}
            id={"last_name"}
            labelClassName={"flex items-center mt-2"}
            labelClass={"sm:w-[160px]"}
            //   error={returnErrorMessage("business_street")}
            //   onBlur={handleBlur}
          />
          <TextField
            //   onChange={handleInputValues}
            //   value={formValues.business_street}
            name="email"
            className="py-3 mt-1"
            title={"Work email"}
            placeholder={"jane@example.com"}
            type={"text"}
            id={"email"}
            labelClassName={"flex items-center mt-2"}
            labelClass={"sm:w-[160px]"}
            //   error={returnErrorMessage("business_street")}
            //   onBlur={handleBlur}
          />
          <TextField
            //   onChange={handleInputValues}
            //   value={formValues.business_street}
            name="phone"
            className="py-3 mt-1"
            title={"Work phone"}
            placeholder={"+5 (555) 555-5555"}
            type={"text"}
            id={"phone"}
            labelClassName={"flex items-center mt-2"}
            labelClass={"sm:w-[160px]"}
            //   error={returnErrorMessage("business_street")}
            //   onBlur={handleBlur}
          />
          <TextField
            //   onChange={handleInputValues}
            //   value={formValues.business_street}
            name="company_name"
            className="py-3 mt-1"
            title={"Company website"}
            placeholder={"example.com"}
            type={"text"}
            id={"company_name"}
            labelClassName={"flex items-center mt-2"}
            labelClass={"sm:w-[160px]"}
            //   error={returnErrorMessage("business_street")}
            //   onBlur={handleBlur}
          />
          <SelectOption
            //   onChange={handleInputValues}
            value={"1-99"}
            name="company_size"
            values={[{ name: "1-99", value: "1-99" }]}
            title={"Company size"}
            id={"company_size"}
            className={"text-xs"}
            selectdiv={"w-[100%]"}
            labelClassName={"flex items-center mt-2"}
            labelClass={"sm:w-[160px] text-xs"}
            //   error={returnErrorMessage("company_size")}
          />
          <SelectOption
            //   onChange={handleInputValues}
            value={"company"}
            name="company"
            values={[{ name: "India", value: "India" }]}
            title={"Company"}
            id={"company"}
            className={"text-xs"}
            selectdiv={"w-[100%]"}
            labelClassName={"flex items-center mt-2"}
            labelClass={"sm:w-[160px] text-xs"}
            //   error={returnErrorMessage("company_size")}
          />
          <SelectOption
            //   onChange={handleInputValues}
            value={"payments_volume"}
            name="Payments volume"
            values={[{ name: "Less the 50,000", value: "Less the 50,000" }]}
            title={"Payments volume"}
            id={"payments_volume"}
            className={"text-xs"}
            selectdiv={"w-[100%]"}
            labelClassName={"flex items-start mt-2"}
            labelClass={"sm:w-[160px] text-xs"}
            sublabel={
              "How much money does your business process online each month?"
            }
            //   error={returnErrorMessage("company_size")}
          />
          <div className="flex items-start mt-2">
            <label for="" className="new_input_label sm:w-[130px] text-xs">
              Products
              <p style={{ fontSize: "10px" }}>
                Which product(s) are you looking for? (Optional)
              </p>
            </label>

            <div className="right-side">
              <div className="checkbox-item flex items-center gap-2">
                <input type="checkbox" id="checkbox1" />
                <label htmlFor="checkbox1" className="text-xs mt-1">
                  Online or in-person payments
                </label>
              </div>
              <div className="checkbox-item flex items-center gap-2">
                <input type="checkbox" id="checkbox2" />
                <label htmlFor="checkbox2" className="text-xs mt-1">
                  Multi-party payments and payouts
                </label>
              </div>
              <div className="checkbox-item flex items-center gap-2">
                <input type="checkbox" id="checkbox3" />
                <label htmlFor="checkbox3" className="text-xs mt-1">
                  Subscriptions, invoicing, or tax
                </label>
              </div>
              <div className="checkbox-item flex items-center gap-2">
                <input type="checkbox" id="checkbox4" />
                <label htmlFor="checkbox4" className="text-xs mt-1">
                  Identity verification or financial account connections
                </label>
              </div>
              <div className="checkbox-item flex items-center gap-2">
                <input type="checkbox" id="checkbox5" />
                <label htmlFor="checkbox5" className="text-xs mt-1">
                  Banking-as-a-service or card issuing
                </label>
              </div>
              <div className="checkbox-item flex items-center gap-2">
                <input type="checkbox" id="checkbox6" />
                <label htmlFor="checkbox6" className="text-xs mt-1">
                  Something else
                </label>
              </div>
            </div>
          </div>
          <TextAreaField
            title="Anything else?"
            placeholder="Tell us more about your project, needs, and timeline"
            id="anything_else?"
            name="anything_else"
            value={"Tell us more about your project, needs, and timeline"}
            labelClassName={"flex items-start mt-2"}
            sublabel={"Optional"}
            labelClass={
              "block text-gray-700 text-sm font-bold sm:w-[160px] text-xs"
            }
          />
          <div className="text-center mt-5">
          <button
            type="button"
            className="inline-block   px-6 pb-2 pt-2.5 text-xs rounded-lg font-medium uppercase leading-normal bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
          >
            Submit
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
