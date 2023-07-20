"use client";
import React, { useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import Card from "@/app/components/Common/Card/Card";
import ManageAutomations from "@/app/components/Integration/page";
import { ConfigureIntegration } from "@/app/components/Integration/Integration";
import { getAllIntegration } from "@/app/API/pages/Integration";
import { useEffect } from "react";
import Loading from "@/app/components/Loading/Loading";
import integrationData from "@/app/data/integration_data.json";
import { tiles_data } from "@/app/data/integration_tiles.json";
import Modal from "@/app/components/Common/Modal/Modal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Integrationform from "@/app/components/Integrationform/page";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Button from "@/app/components/Common/Button/Button";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [edit, setEdit] = useState(false);

  const [integrationdata, setIntegrationdata] = useState([]);
  const [dataLoader, setDataLoader] = useState(false);
  const [suggestModal, setSuggestModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [singleIntegrationData, setSingleIntegrationData] = useState(null);
  const [integrationType, setIntegrationType] = useState("");
  const [integrationModal, setIntegrationModal] = useState(false);
  const [automationID, setAutomationID] = useState(null);

  const [integrationform, setIntegrationform] = useState(false);

  const addAutomationHandler = (type) => {
    setEdit(true);
    setIntegrationType(type);
    let intData = fetchIntegrationByType(type);
    setSingleIntegrationData(intData);
    setAutomationID(null);
  };

  const fetchIntegrationByType = (type) => {
    let result = integrationdata?.results?.find((x) => x.type === type);
    return result;
  };

  const handleIntegrationButton = (integrationRecord, modeType, type, key) => {
    setMode(modeType);
    setIntegrationType(type);
    setIntegrationModal(true);
    if (integrationRecord && integrationRecord !== null) {
      setSingleIntegrationData(integrationRecord);
      router.push(`${pathname}?integration_id=${integrationRecord?.id}`);
    } else {
      setSingleIntegrationData(null);
    }
  };

  const totalActiveIntegrations = (array, type) => {
    const matchingRecords = array?.filter((x) => x.type === type);
    return matchingRecords;
  };

  const filterDataByID = (array, id) => {
    const recordData = array?.find((x) => x.id == id);
    return recordData;
  };

  const fetchIntegrations = async () => {
    try {
      setDataLoader(true);
      const data = await getAllIntegration();
      setDataLoader(false);
      setIntegrationdata(data);
      setId(data);
    } catch (error) {
      setDataLoader(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchUrlModelHandler = () => {
    const integrationID = searchParams?.get("integration_id");
    const automationID = searchParams?.get("automation_id");
    if (integrationID && automationID) {
      let isExistIntegration = filterDataByID(
        integrationdata?.results,
        integrationID
      );
      if (isExistIntegration && isExistIntegration !== undefined) {
        setEdit(true);
        setIntegrationType(isExistIntegration?.type);
        setAutomationID(automationID);
      }
    } else if (integrationID) {
      let isExistIntegration = filterDataByID(
        integrationdata?.results,
        integrationID
      );
      if (isExistIntegration && isExistIntegration !== undefined) {
        setIntegrationType(isExistIntegration?.type);
        setMode("update");
        setSingleIntegrationData(isExistIntegration);
        setIntegrationModal(true);
      }
    } else {
    }
  };

  useEffect(() => {
    fetchUrlModelHandler();
  }, [searchParams, integrationdata]);

  const customCloseModelHandler = () => {
    router.push(`${pathname}`);
  };
  const performIntegrationTask = (element) => {
    switch (element.key) {
      case "POPULAR":

        break;
      case "BILLING":

        break;
      case "COMMUNICATION":

        break;
      case "PRODUCTIVITY":

        break;
      case "SUGGEST":
        setSuggestModal(prev => !prev)
        break;

      default:
        break;
    }
  }
  return (
    <>
      {dataLoader === true ? (
        <Loading />
      ) : !edit ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="javascript:void(0)"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" /> Integrations
                </a>
              </li>
            </ul>
          </div>
          <>
            <div className="flex items-center justify-between">
              <p class="text-black-color text-xl font-semibold my-4">
                Search for integration
              </p>
            </div>
            <div className="relative sm:max-w-[100%]  m-auto">
              <input
                type={"search_integration"}
                placeholder={"Search for integration"}
                className={
                  "border border-input_color w-full block  px-2 py-2 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10"
                }
                id={"search_integration"}
              />
              <img
                className="w-5 top-[10px] left-[14px] absolute"
                src="/search.png"
              />
            </div>
          </>
          {tiles_data.map((element, key) =>
            <div className="mt-6" key={key} onClick={() => { performIntegrationTask(element) }}>
              <h3 className="text-sm font-semibold mt-3">{element.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2 mx-auto items-center my-2">
                {element.tiles?.map((item, key) => (
                  <div
                    className="border border-border p-3 rounded-md cursor-pointer hover:bg-[#ECF6FE] hover:border-primary_hover"
                    key={key}
                    onClick={() => setIntegrationform(true)}
                  >
                    <div className="flex justify-start gap-1 items-center">
                      <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                        <Image
                          fill={"true"}
                          className="bg-contain mx-auto w-full rounded-lg"
                          alt="logo.png"
                          src={item.logo}
                        />
                      </div>
                      <h3 className="w-[80%] font-semibold text-[13px]  text-heading">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div >
          )}
        </>
      ) : (
        <>
          {edit ? (
            <ManageAutomations
              filterDataByID={filterDataByID}
              automationID={automationID}
              setEdit={setEdit}
              setShow={setIntegrationModal}
              integrationData={singleIntegrationData}
              type={integrationType}
            />
          ) : (
            ""
          )}
        </>
      )}
      {
        integrationModal ? (
          <Modal
            title={"Manage Integration"}
            className={"w-[80%]"}
            show={integrationModal}
            setShow={setIntegrationModal}
            showCancel={true}
            customHideButton={true}
            closeFunction={customCloseModelHandler}
          >
            <ConfigureIntegration
              fetchIntegrations={fetchIntegrations}
              setShow={setIntegrationModal}
              mode={mode}
              integrationRecord={singleIntegrationData}
              type={integrationType}
            />
          </Modal>
        ) : (
          ""
        )
      }
      {
        suggestModal ? (
          <Modal
            title={<h3 className="text-base font-semibold">Suggest a resource</h3>}
            className={"w-[30%]"}
            show={suggestModal}
            setShow={setSuggestModal}
            showCancel={true}
            customHideButton={false}
            hr={false}
          >
            <h3 className="text-xs my-2 text-heading font-normal">What resource would you like to connect to?</h3>
            <textarea id="message" rows="4" className=" block border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full " placeholder="Write your thoughts here..."></textarea>
            <div
              className={`flex  p-2 rounded-b mt-5 justify-end gap-4`}
            >                    <Button
              className="inline-block float-left rounded bg-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-heading border border-border disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
              onClick={() => { setSuggestModal(prev => !prev) }}

            >
                Back
              </Button>
              <Button
                type={"button"}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                onClick={() => { setSuggestModal(prev => !prev) }}
              >
                Submit
              </Button>
            </div>
          </Modal>
        ) : (
          ""
        )
      }
      <ToastContainer />
    </>
  );
};

export default Page;