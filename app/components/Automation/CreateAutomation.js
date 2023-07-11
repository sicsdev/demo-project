"use client";
import React from "react";
import { useState } from "react";
import Card from "../Common/Card/Card";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/app/components/Common/Button/Button";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";
import { Input } from "../Common/Input/Input";
import Swal from "sweetalert2";


const CreateAutomation = ({ integrationData, name, createAutomationRecord, backButton, getAutomations, singleAutomationData, mode, updateAutomationRecord, ...rest }) => {

  const [automationFormData, setAutomationFormData] = useState({
    http_type: mode === 'create' ? 'POST' : 'PATCH',
    route: singleAutomationData?.route || "",
    policies: singleAutomationData?.policies || "",
    workflow: singleAutomationData?.workflow || "Example Workflow",
    needs_otp: singleAutomationData?.needs_otp || false,
    payload_data: singleAutomationData?.payload_data || "",
    http_url: integrationData?.http_base,
    name: name,
    description: singleAutomationData?.description || "This is an example automation",
  });

  const [loading, setLoading] = useState(false);

  const DisablingButton = () => {
    var requiredKeys = ["route", "policies", "payload_data"];

    return requiredKeys.some(
      (key) => !automationFormData[key] || automationFormData[key].trim() === ""
    );
  };

  const createAutomationFormHandler = async (e) => {
    try {
      let createOrUpdateRecord;
      let successMessage;
      setLoading(true);
      if (mode === 'update') {
        createOrUpdateRecord = await updateAutomationRecord(automationFormData, singleAutomationData?.id);
        successMessage = `Automation Updated Successfully!`;
      } else {
        createOrUpdateRecord = await createAutomationRecord(automationFormData, integrationData?.id);
        successMessage = `Automation Created Successfully!`;
      }
      if (createOrUpdateRecord?.status === 201 || createOrUpdateRecord?.status === 200) {
        setLoading(false);
        getAutomations();
        Swal.fire("Success", successMessage, "success");
        backButton();
      } else {
        setLoading(false);
        Swal.fire("Error", "Unable to Proceed!", "error");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="w-100 mx-auto" >
      <div className="mb-4">
        <label
          htmlFor="route_url"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Route URL
        </label>
        <Input
          type={"text"}
          placeholder={"Enter text..."}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
          name="route_url"
          value={automationFormData?.route}
          id={"automation_route_url"}
          onChange={(e) => { setAutomationFormData((prev) => ({ ...prev, route: e.target.value })) }}
        />
        <p className="text-sm mt-2">
          Any URL with a querystring will be re-encoded properly.
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="flex text-gray-700 text-sm font-bold mb-2 gap-1"
        >
          Action Policies
          <span className="group w-[2px] relative">
            <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
            <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
              {" "}
              <span className="text-xs font-light">
                To ensure our model accurately calls your API endpoint
                without error, please pass a single example JSON payload
                for the API without headers or any auth tokens we can
                utilize as an example.
              </span>
            </Card>
          </span>
        </label>
        <Input
          type={"text"}
          placeholder={"Enter text..."}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
          name="action_policies"
          value={automationFormData?.policies}
          id={"automation_action_policies"}
          onChange={(e) => { setAutomationFormData((prev) => ({ ...prev, policies: e.target.value })) }}
        />
        <p className="text-sm mt-2">
          Paste, in written english, instructions to the bot governing
          this action.{" "}
        </p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="flex text-gray-700 text-sm font-bold mb-2 gap-1"
        >
          Example Params Payload{" "}
          <span className="group w-[2px] relative">
            <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
            <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
              {" "}
              <span className="text-xs font-light">
                Please enter in concise english the policies governing
                when this action can be granted. These policies will be
                enforced by the bot before the action can be performed.
                For example, for a refund action, please add your refund
                policies. Ensure you include any exceptions to the
                policy at all as this policy will be upheld.
              </span>
            </Card>
          </span>
        </label>
        <Input
          type={"text"}
          placeholder={"Enter text..."}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
          name="param_payloads"
          value={automationFormData?.payload_data}
          id={"automation_param_payloads"}
          onChange={(e) => { setAutomationFormData((prev) => ({ ...prev, payload_data: e.target.value })) }}
        />
        <p className="text-sm mt-2">
          Example JSON data to verify the action formatting.{" "}
        </p>
      </div>
      <div className="mb-4 spec">
        <label
          htmlFor="method"
          className="flex text-gray-700 text-sm font-bold mb-2"
        >
          Requires Customer Confirmation?
          <span className="group w-[2px] relative">
            <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
            <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
              {" "}
              <span className="text-xs font-light">
                To ensure our model accurately calls your API endpoint
                without error, please pass a single example JSON payload
                for the API without headers or any auth tokens we can
                utilize as an example.
              </span>
            </Card>
          </span>
        </label>

        <label className="switch">
          <input
            type="checkbox"
            value={automationFormData?.needs_otp}
            checked={automationFormData?.needs_otp === true ? true : false}
            onChange={(e) => { setAutomationFormData((prev) => ({ ...prev, needs_otp: e.target.checked })) }}
          />
          <span className="slider round h-[27px] w-[55px]"></span>
        </label>
        <p className="text-sm mt-2">
          Require customer to confirm before action is performed.{" "}
        </p>
      </div>
      <div className="flex items-center justify-between">
        {loading ? (
          <LoaderButton />
        ) : (
          <Button
            type={"submit"}
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
            disabled={DisablingButton()}
            onClick={(e) => createAutomationFormHandler(e)}
          >
            {mode === 'create' ? "Save" : "Update"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreateAutomation;
