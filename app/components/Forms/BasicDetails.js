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
import { createContactInFreshsales, updateContactInFreshsales } from "@/app/API/components/Demo";

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
  });

  useEffect(() => {
    getUserProfile().then((res) => { console.log(res); setUserProfile(res) })

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

      if (formValues.business_name) payload.custom_field = { ...payload.custom_field, cf_company_name: formValues.business_name }
      if (formValues.business_street) payload.address = formValues.business_street
      if (formValues.business_city) payload.city = formValues.business_city
      if (formValues.business_state) payload.state = formValues.business_state
      if (formValues.business_zipcode) payload.zipcode = formValues.business_zipcode
      if (formValues.business_company_size) payload.custom_field = { ...payload.custom_field, cf_employees_size: formValues.business_company_size }
      if (formValues.business_industry) payload.custom_field = { ...payload.custom_field, cf_industry: formValues.business_industry }

      await createContactInFreshsales(payload)

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
          <TextField
            onChange={handleInputValues}
            value={formValues.business_name}
            name="business_name"
            className="py-3 mt-1"
            title={"Business Name"}
            placeholder={"Business Name"}
            type={"text"}
            id={"business_name"}
            error={returnErrorMessage("business_name")}
            onBlur={handleBlur}
          />
          <br />
          <h3 className="text-heading mb-4 font-semibold">Business Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <TextField
              onChange={handleInputValues}
              value={formValues.business_street}
              name="business_street"
              className="py-3 mt-1"
              title={"Street Address"}
              placeholder={"Please enter Street Address"}
              type={"text"}
              id={"business_street"}
              error={returnErrorMessage("business_street")}
              onBlur={handleBlur}
            />
            <TextField
              onChange={handleInputValues}
              value={formValues.business_city}
              name="business_city"
              className="py-3 mt-1"
              title={"City"}
              placeholder={"Please enter city"}
              type={"text"}
              id={"business_city"}
              error={returnErrorMessage("business_city")}
              onBlur={handleBlur}
            />
            <SelectField
              onChange={handleInputValues}
              value={formValues.business_state}
              name="business_state"
              values={provideStateNames()}
              title={"State"}
              id={"business_state"}
              className="py-3"
              error={returnErrorMessage("business_state")}
            />
            <div className="">
              <TextField
                onChange={handleInputValues}
                value={formValues.business_zipcode}
                name="business_zipcode"
                className="py-3 mt-1"
                title={"Zipcode"}
                placeholder={"Zipcode"}
                type={"text"}
                id={"business_zipcode"}
                error={returnErrorMessage("business_zipcode")}
                onBlur={handleBlur}
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                onChange={handleInputValues}
                value={formValues.business_unit_no}
                name="business_unit_no"
                className="py-3 mt-1"
                title={"Unit No."}
                placeholder={"Unit No. (optional)"}
                type={"text"}
                id={"business_unit_no"}
                error={returnErrorMessage("business_unit_no")}
                onBlur={handleBlur}
              />
            </div>
            <SelectField
              onChange={handleInputValues}
              value={formValues.business_company_size}
              name="business_company_size"
              values={business_company_size_data}
              title={"Business Company Size"}
              id={"business_company_size"}
              className="py-3"
              error={returnErrorMessage("business_company_size")}
            />
            <SelectField
              onChange={handleInputValues}
              value={formValues.business_industry}
              name="business_industry"
              values={business_industry_data}
              title={"Business Industry"}
              id={"business_industry"}
              className="py-3"
              error={returnErrorMessage("business_industry")}
            />
          </div>
        </>
      </div>
    </div>
  );
}
