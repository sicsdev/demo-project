"use client";
import { ShareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState, useEffect } from "react";
import Card from "../Common/Card/Card";
import CreateAutomation from "../Automation/CreateAutomation";
import autoMationdata from "../../data/automation._data.json";
import {
  getAllAutomations,
  createIntegrationAutomation,
  updateIntegrationAutomation
} from "@/app/API/pages/Integration";
import Loading from "@/app/components/Loading/Loading";

const Integrationedit = (props) => {

  const [isConfigureAutomation, setIsConfigureAutomation] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Billing Integrations");
  const [automationName, setAutomationName] = useState('');
  const [billingAutomationData, setBillingAutomationData] = useState({});
  const [singleAutomationData, setSingleAutomationData] = useState(null);
  const [dataLoader, setDataLoader] = useState(false);
  const [mode, setMode] = useState('create');

  const handleEditButtonhandler = (name, singleData = null, modeType) => {
    setIsConfigureAutomation(true);
    setHeaderTitle(name);
    setAutomationName(name);
    setMode(modeType);
    if (singleData) {
      setSingleAutomationData(singleData);
    } else {
      setSingleAutomationData(null);
    }
  }

  const fetchBillingAutomations = async () => {
    try {
      setDataLoader(true);
      const data = await getAllAutomations();
      setDataLoader(false);
      setBillingAutomationData(data);
    } catch (error) {
      setDataLoader(false);
    }
  };

  const getObjectFromArray = (array, key, value) => {
    return array.find((item) => item[key] === value);
  };

  const getObjectIfExists = (array, key, value) => {
    const foundObject = getObjectFromArray(array, key, value);
    return foundObject || null; // Return null if the object doesn't exist
  };

  const checkAutomationExists = (name) => {
    if (billingAutomationData && billingAutomationData?.results) {
      const valueExists = getObjectIfExists(billingAutomationData?.results, 'name', name);
      return valueExists;
    } else {
      return null;
    }
  };

  useEffect(() => {
    fetchBillingAutomations();
  }, []);

  const backButtonHandler = (e) => {
    if (isConfigureAutomation === true) {
      setIsConfigureAutomation(false);
      setHeaderTitle("Billing Integrations");
    } else {
      props.setEdit(false);
    }
  };

  return (
    <>
      {dataLoader === true ? <Loading /> : <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">

        <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">
              <a
                href="#"
                className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                aria-current="page"
              >
                <ShareIcon className="h-6 w-6 text-primary" />{" "}
                {headerTitle}
              </a>
            </li>
          </ul>
          <button
            onClick={(e) => backButtonHandler(e)}
            className="p-4 text-[0.875rem]  sm:px-10 lg:mt-4 md:mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary  ark:focus:ring-yellow-900 rounded-lg"
          >
            Back
          </button>
        </div>
        {billingAutomationData && isConfigureAutomation === true ?
          <div className="py-6 pr-6">
            <CreateAutomation
              mode={mode}
              integrationData={props.integrationData}
              name={automationName}
              updateAutomationRecord={updateIntegrationAutomation}
              createAutomationRecord={createIntegrationAutomation}
              backButton={backButtonHandler}
              getAutomations={fetchBillingAutomations}
              singleAutomationData={singleAutomationData}
            />
          </div> : (
            autoMationdata?.map((item, key) => (
              <div key={key}>
                <div className="flex justify-between items-center mt-3">
                  <div className="">
                    <h3 className="font-semibold text-md text-heading">{item?.name}</h3>
                    <p className="text-sm my-2">{checkAutomationExists(item?.name) !== null ? item?.configure_text : item?.not_configured_text}</p>
                  </div>
                  {checkAutomationExists(item?.name) !== null ?
                    <p className="cursor-pointer text-sm" onClick={(e) => handleEditButtonhandler(item?.name, checkAutomationExists(item?.name), 'update')}>Edit</p> : <p className="cursor-pointer text-sm" onClick={(e) => handleEditButtonhandler(item?.name, null, 'create')}>Configure</p>}
                </div>
                <hr className="border-border" />
              </div>
            ))
          )}
      </Card>}

    </>
  );
};

export default Integrationedit;
