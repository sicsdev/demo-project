import TextField from "../Common/Input/TextField";
import SelectField from "../Common/Input/SelectField";
import {
  business_company_size_data,
  business_industry_data,
  state_data,
} from "./data/FormData";
import { useState } from "react";
import validator from "validator";
import { useEffect } from "react";
import { getUserProfile } from "@/app/API/components/Sidebar";
import { createContactInFreshsales, updateContactInHubspot } from "@/app/API/components/Demo";
import Cookies from "js-cookie";

export default function BasicDetails({ basicFormData, setBasicFormData }) {
  const [formValues, setFormValues] = useState({
    business_street: basicFormData?.business_street ?? "",
    business_city: basicFormData?.business_city ?? "",
    business_state: basicFormData?.business_state ?? "",
    business_zipcode: basicFormData?.business_zipcode ?? "",
    business_industry: basicFormData?.business_industry ?? "",
    business_name: basicFormData?.business_name ?? "",
    ecommerce_platform: basicFormData?.ecommerce_platform ?? "",
    business_company_size: basicFormData?.business_company_size ?? "",
    business_unit_no: basicFormData?.business_unit_no ?? "",
    customer_service_phone: basicFormData?.customer_service_phone ?? "",
    customer_service_email: basicFormData?.customer_service_email ?? "",
  });
  const [hubID, setHubid] = useState(null);

  useEffect(() => {

    let token = Cookies.get("Token")
    if (token) getUserProfile().then((res) => { setUserProfile(res) })

    // Next code block is for watch for changes in the formValues object, to update the Freshsales contact
    if (
      formValues.business_company_size !== '' ||
      formValues.business_industry !== '' ||
      formValues.business_state !== ''
    ) { handleBlur(); }
  }, [formValues.business_company_size, formValues.business_industry, formValues.business_state]);

  const [userProfile, setUserProfile] = useState({});
  const [errors, setErrors] = useState([]);

  const makeCapital = (str) => {
    if (str.includes(" ")) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  };

  const handleInputValues = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: makeCapital(e.target.value),
    });
    setBasicFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: makeCapital(e.target.value),
      };
    });
  };


  const provideStateNames = () => {
    return state_data.map((state) => state.name);
  };


  const returnErrorMessage = (key) => {
    if (errors.length) {
      const findErr = errors.find((x) => x.field === key);
      if (findErr) {
        return findErr.message;
      }
    }
    return null;
  };


  const handleBlur = async (e) => {
    if (validator.isEmail(userProfile.email ?? '')) {
      let payload = { email: userProfile.email }
      if (formValues.business_name) payload.company = formValues.business_name
      if (formValues.business_street) payload.address = formValues.business_street
      if (formValues.business_city) payload.city = formValues.business_city
      if (formValues.business_state) payload.state = formValues.business_state
      if (formValues.business_zipcode) payload.zip = formValues.business_zipcode
      if (formValues.business_company_size) payload.company_size = formValues.business_company_size
      if (formValues.business_industry) payload.industry = formValues.business_industry
      await updateContactInHubspot(payload, localStorage.getItem("hubId"))
    }
  }

  return (
    <div>
      <span className="text-sm my-5 text-[#808080]">
        Please provide us with some important information about your business.
      </span>

      {/* Step 1 */}
      <div className="mt-3">
        <>
          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">Business Name</lable>
            <TextField
              onChange={handleInputValues}
              value={formValues.business_name}
              name="business_name"
              className="py-3 mt-1"
              title={""}
              placeholder={"Business Name"}
              type={"text"}
              id={"business_name"}
              error={returnErrorMessage("business_name")}
              onBlur={handleBlur}
              labelClassName={"w-full sm:w-1/2"}
            />
          </div>

          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">Existing Customer Service Email</lable>
            <TextField
              onChange={handleInputValues}
              value={formValues.customer_service_email}
              name="customer_service_email"
              className="py-2 mt-1"
              title={""}
              placeholder={"Existing Customer Service Email"}
              type={"text"}
              labelClassName={"w-full sm:w-1/2"}
              id={"customer_service_email"}
              error={returnErrorMessage("customer_service_email")}
              onBlur={handleBlur}
            />
          </div>

          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">Existing Customer Service Phone</lable>
            <TextField
              onChange={handleInputValues}
              value={formValues.customer_service_phone}
              name="customer_service_phone"
              className="py-3 mt-1"
              title={""}
              labelClassName={"w-full sm:w-1/2"}
              placeholder={"Please enter Existing Customer Service Phone"}
              type={"number"}
              id={"customer_service_phone"}
              error={returnErrorMessage("customer_service_phone")}
              onBlur={handleBlur}
            />
          </div>

          <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] my-8"></div>
          <h3 className=" mb-4 !font-semibold">Business Address</h3>

          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">Street Address</lable>
            <TextField
              onChange={handleInputValues}
              value={formValues.business_street}
              name="business_street"
              className="py-3 mt-1"
              title={""}
              placeholder={"Please enter Street Address"}
              type={"text"}
              id={"business_street"}
              error={returnErrorMessage("business_street")}
              onBlur={handleBlur}
              labelClassName={"w-full sm:w-1/2"}
            />
          </div>

          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">City</lable>
            <TextField
              onChange={handleInputValues}
              value={formValues.business_city}
              name="business_city"
              className="py-3 mt-1"
              title={""}
              placeholder={"Please enter city"}
              type={"text"}
              id={"business_city"}
              error={returnErrorMessage("business_city")}
              onBlur={handleBlur}
              labelClassName={"w-full sm:w-1/2"}
            />
          </div>

          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">State</lable>
            <SelectField
              onChange={handleInputValues}
              value={formValues.business_state}
              name="business_state"
              selectdiv="selectdiv mt-3"
              values={provideStateNames()}
              title={""}
              id={"business_state"}
              className="py-2"
              error={returnErrorMessage("business_state")}
              labelClassName={"w-full sm:w-1/2"}
            />
          </div>

          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">Zipcode</lable>

            <TextField
              onChange={handleInputValues}
              value={formValues.business_zipcode}
              name="business_zipcode"
              className="py-3 mt-1"
              title={""}
              placeholder={"Zipcode"}
              maxLength="5"
              type={"text"}
              id={"business_zipcode"}
              error={returnErrorMessage("business_zipcode")}
              onBlur={handleBlur}
              labelClassName={"w-full sm:w-1/2"}
            />
          </div>

          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">Unit No.</lable>
            <TextField
              labelClassName={"w-full sm:w-1/2"}
              onChange={handleInputValues}
              value={formValues.business_unit_no}
              name="business_unit_no"
              className="py-3 mt-1"
              title={""}
              placeholder={"Unit No. (optional)"}
              type={"text"}
              id={"business_unit_no"}
              error={returnErrorMessage("business_unit_no")}
              onBlur={handleBlur}
            />    
          </div>

          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">Business Company Size</lable>
            <SelectField
              labelClassName={"w-full sm:w-1/2"}
              onChange={handleInputValues}
              selectdiv="selectdiv mt-3"
              value={formValues.business_company_size}
              name="business_company_size"
              values={business_company_size_data}
              title={""}
              id={"business_company_size"}    
              className="py-3"
              error={returnErrorMessage("business_company_size")}
            />
          </div>

          <div className="block sm:flex items-center justify-start gap-4 w-full my-2">
            <lable className="w-full sm:w-1/3 !font-semibold text-sm text-[#151d23]">Business Industry</lable>
            <SelectField
              labelClassName={"w-full sm:w-1/2"}
              onChange={handleInputValues}
              value={formValues.business_industry}
              name="business_industry"
              values={business_industry_data}
              selectdiv="selectdiv mt-3"
              title={""}
              id={"business_industry"}
              className="py-3"
              error={returnErrorMessage("business_industry")}
            />
          </div>

        </>
      </div>
    </div >
  );
}
