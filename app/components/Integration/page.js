"use client";
import { ShareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState, useEffect } from "react";
import Card from "../Common/Card/Card";
import CreateAutomation from "../Automation/CreateAutomation";
import Modal from "../Common/Modal/Modal";

import {
  getAllAutomations,
  createIntegrationAutomation,
  updateIntegrationAutomation
} from "@/app/API/pages/Integration";
import Loading from "@/app/components/Loading/Loading";
import CustomAutomation from "./Automations/CustomAutomation";
import { BillingAutomation } from "./Automations/BillingAutomation";
import { makeCapital } from "../helper/capitalName";
import { useRouter, usePathname } from 'next/navigation';

const ManageAutomations = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [headerTitle, setHeaderTitle] = useState(`${props?.type} Integrations`);
  const [automationName, setAutomationName] = useState('');
  const [billingAutomationData, setBillingAutomationData] = useState([]);
  const [singleAutomationData, setSingleAutomationData] = useState(null);
  const [dataLoader, setDataLoader] = useState(false);
  const [mode, setMode] = useState('create');
  const [automationModal, setAutomationModal] = useState(false);

  const createUpdateButtonAutomation = (name, singleData = null, modeType, secondTitle = '') => {
    setAutomationModal(true);
    setAutomationName(name);
    setMode(modeType);
    if (singleData) {
      setSingleAutomationData(singleData);
      router.push(`${pathname}?integration_id=${singleData?.integration?.id}&automation_id=${singleData?.id}`);
    } else {
      setSingleAutomationData(null); 
    }
  }


  const fetchBillingAutomations = async () => {
    try {
      setDataLoader(true);
      const data = await getAllAutomations(props?.type);
      setDataLoader(false);
      let filterData = await filterAutomationRecords(data);
      setBillingAutomationData(filterData);
    } catch (error) {
      setDataLoader(false);
    }
  };

  useEffect(() => {
    if (props?.type !== undefined && props?.type !== "") {
      fetchBillingAutomations();
    }
  }, []);
 
  useEffect(() => {
    if (props?.automationID && props.automationID !== null) {
      let getAutomationRecord = props?.filterDataByID(billingAutomationData, props.automationID);
      if (getAutomationRecord && getAutomationRecord !== undefined) {
        createUpdateButtonAutomation(getAutomationRecord?.name, getAutomationRecord, 'update');
      }
    }
  }, [billingAutomationData, props?.automationID]);

  const filterAutomationRecords = (records) => {
    const filterData = records?.results.filter((x) => x?.integration?.type === props.type);
    return filterData;
  };

  const backButtonHandler = (e) => {
    props.setEdit(false);
    props?.setShow(false);
    router.push(`${pathname}`);
  };

  const automationView = () => {
    switch (props?.type) {
      case "BILLING":
        return <BillingAutomation automationData={billingAutomationData} automationUpdateButton={createUpdateButtonAutomation} />;

      case "CUSTOM":
        return <CustomAutomation automationData={billingAutomationData} automationUpdateButton={createUpdateButtonAutomation} />
      default:
        return null;
    }
  };

  const customCloseModelHandler = () => {
    router.push(`${pathname}`);
  };

  return (
    <>
      {dataLoader === true ? <Loading /> :
        <>
          <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
            <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                  <a
                    href="#"
                    className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                    aria-current="page"
                  >
                    <ShareIcon className="h-6 w-6 text-primary" />{" "}
                    {makeCapital(headerTitle)}
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
            {billingAutomationData &&
              <>
                {automationView()}
              </>
            }
          </Card>
          {automationModal ?
            <Modal title={'Manage Automation'} show={automationModal} setShow={setAutomationModal} showCancel={true} customHideButton={true} closeFunction={customCloseModelHandler} >
              <CreateAutomation
                mode={mode}
                type={props?.type}
                integrationData={props.integrationData}
                name={automationName}
                updateAutomationRecord={updateIntegrationAutomation}
                createAutomationRecord={createIntegrationAutomation}
                setAutomationModal={setAutomationModal}
                getAutomations={fetchBillingAutomations}
                singleAutomationData={singleAutomationData}
              />
            </Modal>
            : ""}
        </>
      }
    </>
  );
};

export default ManageAutomations;
