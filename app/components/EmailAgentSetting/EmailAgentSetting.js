import React from "react";
import { useState } from "react";
import TextField from "../Common/Input/TextField";
import SelectField from "../Common/Input/SelectField";
import { email_prefix_data } from "./data";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Card from "../Common/Card/Card";
import FileField from "../Common/Input/FileField";
import { getAvailableMobileNumbers } from "@/app/API/components/PhoneNumber";
import Button from "../Common/Button/Button";
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { getPermissionHelper } from "../helper/returnPermissions";
import {
  email_sign_off_data,
  email_introduction_data,
} from "../EmailConfig/data";

const EmailAgentSetting = ({
  basicFormData,
  setBasicFormData,
  form = true,
  selectedBot,
}) => {
  const userState = useSelector((state) => state.user.data);

  const [errors, setErrors] = useState(null);
  const [email_Prefix, setEmail_Prefix] = useState(
    basicFormData?.email_prefix ?? "{email_Prefix}"
  );
  const [company_name, setCompany_name] = useState(
    basicFormData?.company_name ?? "{company_name}"
  );
  const [formValues, setFormValues] = useState({
    email_prefix: basicFormData?.email_prefix ?? "",
    custom_email: basicFormData?.custom_email ?? "",
    enable_email_forwarding: basicFormData?.enable_email_forwarding ?? "",
    company_name: basicFormData?.company_name ?? "",
    friendly_name: basicFormData?.friendly_name ?? "",
    phone_numbers: basicFormData?.phone_numbers ?? null,
    selectedFile: basicFormData?.selectedFile ?? "",
    email_greeting: basicFormData?.email_greeting ?? "",
    email_farewell: basicFormData?.email_farewell ?? "",
  });

  const handleInputValues = (e) => {
    const { value } = e.target;

    console.log(e.target.value, e.target.name);
    if (value !== " ") {
      // setErrors([])
      setFormValues({ ...formValues, [e.target.name]: value });
      setBasicFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: value,
        };
      });
      switch (e.target.name) {
        case "company_name":
          value !== ""
            ? setCompany_name(value)
            : setCompany_name("{company_name}");
          setBasicFormData((prev) => {
            return {
              ...prev,
              [e.target.name]: value !== "" ? value : "{company_name}",
            };
          });
          break;
        case "email_prefix":
          setEmail_Prefix(value);
          setBasicFormData((prev) => {
            return {
              ...prev,
              [e.target.name]: value,
            };
          });
          break;

        default:
          break;
      }
    }
  };

  const returnErrorMessage = (key) => {
    // if (errors.length) {
    //     const findErr = errors.find((x) => x.field === key)
    //     if (findErr) {
    //         return findErr.message
    //     }
    // }
    return null;
  };

  return (
    <div
      className="container my-3 sm:my-8 px-5 rounded-lg"
      style={{
        border: "1px solid #d5dbe7",
      }}
    >
      <div className=" sm:my-3">
        <div className="bg-lowgray px-3 py-2 rounded flex items-center justify-between my-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[14px] text-[#555] mb-2 flex gap-1 items-center sm:mt-2 ">
              Email Settings{" "}
            </h2>{" "}
          </div>
        </div>

        <div className="my-2">
          <SelectField
            onChange={handleInputValues}
            value={formValues.email_prefix}
            error={returnErrorMessage("email_prefix")}
            name="email_prefix"
            values={email_prefix_data}
            title={
              <div className="flex items-center gap-2 mb-3">
                <span>Support Email Username</span>{" "}
                {/* <div className="group w-[2px] relative">
                  <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                  <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                    {" "}
                    <span className="text-xs font-light">
                      The first word of your Deflection AI email. For example
                      Team@name.gettempo.ai
                    </span>
                  </Card>
                </div> */}
              </div>
            }
            id={"email_prefix"}
            className="py-3 w-full "
          />
        </div>

        {/* <div className="my-2"> 
          <TextField
            onChange={handleInputValues}
            value={formValues.company_name}
            name="company_name"
            className="py-3 w-full mt-1"
            title={
              <div className="flex items-center gap-2">
                <span>Company Name</span>{" "}
                <div className="group w-[2px] relative">
                  <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                  <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                    {" "}
                    <span className="text-xs font-light">
                      (Note, you can only configure your email once. It cannot
                      be easily changed later.)
                    </span>
                  </Card>
                </div>
              </div>
            }
            placeholder={"Company name"}
            type={"text"}
            id={"company_name"}
            error={returnErrorMessage("company_name")}
            disabled={!getPermissionHelper('EDIT EMAIL SETTINGS', userState?.role)}

          />
        </div> */}

        {/* <div className="my-2">
          <TextField
            onChange={handleInputValues}
            value={formValues.custom_email}
            name="custom_email"
            className="py-3 w-full mt-1"
            title={
              <div className="flex items-center gap-2">
                <span>Custom Email Address</span>{" "}
                <div className="group w-[2px] relative">
                  <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                  <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                    {" "}
                    <span className="text-xs font-light">
                      Your custom email which you want to forward mail from. For
                      example, team@company_name.com.
                    </span>
                  </Card>
                </div>
              </div>
            }
            placeholder={"Custom email address"}
            type={"text"}
            id={"custom_email"}
            error={returnErrorMessage("custom_email")}
            disabled={!getPermissionHelper('EDIT EMAIL SETTINGS', userState?.role)}

          />
        </div> */}

        <div className="my-2">
          <SelectField
            onChange={handleInputValues}
            value={basicFormData.email_greeting}
            error={returnErrorMessage("email_introduction")}
            name="email_greeting"
            values={email_introduction_data}
            title={
              <div className="flex items-center gap-2 w-[150px] mb-3">
                <span>Email Introduction</span>{" "}
                {/* <div className="group w-[2px] relative">
                  <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                  <Card className="animate-fadeIn bg-white hidden absolute  w-[350px] sm:w-[500px] md:w-[500px] lg:w-[500px] z-50 group-hover:block  left-[-125px] sm:left-auto lg:left-auto md:left-auto ">
                    {" "}
                    <span className="text-xs font-light">
                      How you want Deflection AI to address customers in your
                      emails. You can choose between a variety of greetings.
                    </span>
                  </Card>
                </div> */}
              </div>
            }
            id={"email_greeting"}
            className="py-3"
          />{" "}
        </div>

        <div className="my-2">
          <SelectField
            onChange={handleInputValues}
            value={basicFormData.email_farewell}
            error={returnErrorMessage("email_signOff")}
            name="email_farewell"
            values={email_sign_off_data}
            title={
              <div className="flex items-center gap-2 w-[150px]  mb-3">
                <span>Email Sign-Off</span>{" "}
                {/* <div className="group w-[2px] relative">
                  <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                  <Card className="animate-fadeIn bg-white hidden absolute w-[350px] sm:w-[500px] md:w-[500px] lg:w-[500px] z-50 group-hover:block  left-[-108px] sm:left-auto lg:left-auto md:left-auto ">
                    {" "}
                    <span className="text-xs font-light">
                      How you want Deflection AI to end conversations to
                      customers in your emails. You can choose between a variety
                      of sign-offs.
                    </span>
                  </Card>
                </div> */}
              </div>
            }
            id={"email_farewell"}
            className="py-3 "
          />{" "}
        </div>

        {formValues.email_prefix && formValues.custom_email && (
          <p className="text-sm my-2 text-primary">
            Please enable mail forwarding to {email_Prefix}@{company_name}
            .gettempo.ai from your domain.{" "}
            <a
              className="font-semibold cursor-pointer"
              href="https://www.deflection.ai/help/help-details?articleName=enable-mail-forwarding"
              target="_blank"
            >
              Click here
            </a>{" "}
            for instructions.{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailAgentSetting;
