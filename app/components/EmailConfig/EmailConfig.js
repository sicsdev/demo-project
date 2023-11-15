import React from "react";
import { useState } from "react";
import TextField from "../Common/Input/TextField";
import { useDispatch } from "react-redux";
import { email_introduction_data, email_sign_off_data } from "./data";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import SelectField from "../Common/Input/SelectField";
import Card from "../Common/Card/Card";
import { useEffect } from "react";
const EmailConfig = ({ basicFormData, setBasicFormData, error = null }) => {
  const [errors, setErrors] = useState([]);
  const [tileAgentName, setTileAgentName] = useState([]);
  const [formValues, setFormValues] = useState({
    email_introduction: basicFormData?.email_introduction ?? "",
    email_signOff: basicFormData?.email_signOff ?? "",
    agent_title: "",
    agent_name: basicFormData?.agent_name ?? "",
  });
  useEffect(() => {
    if (basicFormData) {
      setFormValues({
        email_introduction: basicFormData?.email_introduction || "",
        email_signOff: basicFormData?.email_signOff || "",
        agent_title: basicFormData?.agent_title || "",
        agent_name: "",
      });
      setTileAgentName(basicFormData?.agent_name ?? []);
    }
  }, [basicFormData]);
  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setErrors([]);
    if (name === 'agent_title' || name === 'email_signOff') {
      if (tileAgentName.length === 0) {
        setErrors([{ field: "tileAgentName", message: "Please enter one or more agent names first." }])
      } else {
        setFormValues({ ...formValues, [e.target.name]: makeCapital(value) });
        setBasicFormData((prev) => {
          return {
            ...prev,
            [e.target.name]: makeCapital(value),
          };
        });
      }

    } else {
      setFormValues({ ...formValues, [e.target.name]: makeCapital(value) });
      setBasicFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: makeCapital(value),
        };
      });
    }
  };
  const handleAgentNameValue = (e) => {
    setErrors([]);
    const { value } = e.target;
    if (value.includes(",")) {
      const agentNames = value.split(",");
      setFormValues((prev) => {
        return {
          ...prev,
          agent_name: "",
        };
      });
      agentNames.forEach((name) => {
        const trimmedName = name.trim();
        if (trimmedName && !tileAgentName.includes(trimmedName)) {
          setTileAgentName((prev) => {
            setBasicFormData((prev_state) => {
              return {
                ...prev_state,
                agent_name: [...prev, trimmedName],
              };
            });
            return [...prev, makeCapital(trimmedName)];
          });
        }
      });
    } else {
      setFormValues({ ...formValues, agent_name: value });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setErrors([]);
      const { value } = e.target;
      const agentNames = value.split(",");
      setFormValues((prev) => {
        return {
          ...prev,
          agent_name: "",
        };
      });
      agentNames.forEach((name) => {
        const trimmedName = name.trim();
        if (trimmedName && !tileAgentName.includes(trimmedName)) {
          setTileAgentName((prev) => {
            setBasicFormData((prev_state) => {
              return {
                ...prev_state,
                agent_name: [...prev, trimmedName],
              };
            });
            return [...prev, makeCapital(trimmedName)];
          });
        }
      });
    }
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
  const RemoveFromAgentNameArr = (element) => {
    const updatedChips = tileAgentName.filter((x) => x !== element);
    setTileAgentName(updatedChips);
    setBasicFormData((prev_state) => {
      return {
        ...prev_state,
        agent_name: [...updatedChips],
        agent_title: updatedChips.length > 0 ? basicFormData.agent_title : '',
        email_signOff: updatedChips.length > 0 ? basicFormData.email_signOff : ''
      };
    });
  };
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
  return (
    <div className="container">
      <div className="grid grid-cols-1">
        <div className="my-2">
          <SelectField
            onChange={handleInputValues}
            value={formValues.email_introduction}
            error={returnErrorMessage("email_introduction")}
            name="email_introduction"
            values={email_introduction_data}
            title={
              <div className="flex items-center gap-2 w-[150px] mb-3">
                <span>Email Introduction</span>{" "}
                <div className="group w-[2px] relative">
                  <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                  <Card className="animate-fadeIn bg-white hidden absolute  w-[350px] sm:w-[500px] md:w-[500px] lg:w-[500px] z-50 group-hover:block  left-[-157px] sm:left-auto lg:left-auto md:left-auto ">
                    {" "}
                    <span className="text-xs font-light">
                      How you want Deflection AI to address customers in your emails.
                      You can choose between a variety of greetings.
                    </span>
                  </Card>
                </div>
              </div>
            }
            id={"email_introduction"}
            className="py-3"
          />{" "}
        </div>
        <div className="my-2">
          <SelectField
            onChange={handleInputValues}
            value={formValues.email_signOff}
            error={returnErrorMessage("email_signOff")}
            name="email_introduction"
            values={email_sign_off_data}
            title={
              <div className="flex items-center gap-2 w-[150px]  mb-3">
                <span>Email Sign-Off</span>{" "}
                <div className="group w-[2px] relative">
                  <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                  <Card className="animate-fadeIn bg-white hidden absolute w-[350px] sm:w-[500px] md:w-[500px] lg:w-[500px] z-50 group-hover:block  left-[-157px] sm:left-auto lg:left-auto md:left-auto ">
                    {" "}
                    <span className="text-xs font-light">
                      How you want Deflection AI to end conversations to customers in
                      your emails. You can choose between a variety of
                      sign-offs.
                    </span>
                  </Card>
                </div>
              </div>
            }
            id={"email_signOff"}
            className="py-3"
          />{" "}
        </div>
        <div className="my-2">
          <TextField
            onChange={handleInputValues}
            value={formValues.agent_title}
            name="agent_title"
            className="py-3 mt-1"
            title={
              <div className="flex items-center gap-2 w-[150px]">
                <span>Agent Job Title</span>{" "}
                <div className="group w-[2px] relative">
                  <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                  <Card className="animate-fadeIn bg-white hidden absolute  w-[350px] sm:w-[500px] md:w-[500px] lg:w-[500px] z-50 group-hover:block  left-[-157px] sm:left-auto lg:left-auto md:left-auto ">
                    {" "}
                    <span className="text-xs font-light">
                      An example job description is "Customer Service
                      Representative"
                    </span>
                  </Card>
                </div>
              </div>
            }
            placeholder={"Agent job title"}
            type={"text"}
            id={"agent_title"}
            error={returnErrorMessage("agent_title")}
          />
        </div>
        <div className="my-2">
          <div className={`inline`}>
            <label
              className="new_input_label block text-sm text-heading font-medium"
            >
              <span className="flex items-center gap-2 w-[150px]">
                Agent Name(s)
                <div className="group w-[2px] relative">
                  <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                  <Card className="animate-fadeIn bg-white hidden absolute w-[350px] sm:w-[500px] md:w-[500px] lg:w-[500px] z-50 group-hover:block  left-[-157px] sm:left-auto lg:left-auto md:left-auto ">
                    {" "}
                    <span className="text-xs font-light">
                      Please add the names you'd like your AI agents to sign off
                      with. The algorithm will randomly choose one of the names
                      you enter. Please enter the names EXACTLY as you'd like
                      them separate by commas. Names can include hyphens,
                      periods, or spaces. For example, valid names include Jack,
                      Jack Davidson, Jack D., Jack D, and Jack Davidson-Specter.
                    </span>
                  </Card>
                </div>
              </span>
            </label>
            <div className={`flex flex-wrap justify-start items-center border h-auto w-auto ${returnErrorMessage("tileAgentName") ? "border-red" : "border-[#C7C6C7]"}   rounded-md mt-2 ${tileAgentName.length > 0 && ('px-1')}`}>
              <div style={{rowGap: "5px"}} className={` ${tileAgentName?.length > 0 ? 'py-1' : ''} flex flex-wrap items-center justify-start gap-1`}>
                {tileAgentName.length > 0 &&
                  tileAgentName.map((element, key) => (
                    <div
                      className="[word-wrap: break-word]   flex  cursor-pointer items-center justify-between rounded-[30px] key  px-[10px] py-[5px] text-[12px] font-semibold normal-case leading-[0px] text-heading shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]  border border-[#C7C6C7]"
                      key={key}
                    >
                      {makeCapital(element.trim())}
                      <XMarkIcon
                        className=" h-4 w-4 cursor-pointer "
                        onClick={(e) => {
                          RemoveFromAgentNameArr(element);
                        }}
                      />
                    </div>
                  ))}
              </div>
              <input
                value={formValues.agent_name}
                onKeyDown={handleKeyDown}
                required
                onChange={handleAgentNameValue}
                type={"text"}
                placeholder={"Enter names separate by commas"}
                className={`block  px-2 py-2 !font-[500] bg-white focus:bg-white  rounded-md  text-sm    !placeholder-[#C7C6C7]  focus:outline-none border  disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:!border-none w-full sm:w-[210px] border-none ring-0 focus-visible:border-none`}
                id={"agent_name"}
                name={"agent_name"}
              />
            </div>
            {returnErrorMessage("tileAgentName") && (<small className="text-danger text-xs">{returnErrorMessage("tileAgentName")}</small>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfig;
