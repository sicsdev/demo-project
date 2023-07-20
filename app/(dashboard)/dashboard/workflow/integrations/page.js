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
import Modal from "@/app/components/Common/Modal/Modal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Integrationform from "@/app/components/Integrationform/page";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [edit, setEdit] = useState(false);

  const [integrationdata, setIntegrationdata] = useState([]);
  const [dataLoader, setDataLoader] = useState(false);
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
          {!integrationform ? (
<>
          <div className="flex items-center justify-between">
            <p class="text-black-color text-2xl font-bold mt-8 mb-4">
              Search for integration
            </p>
          </div>
          <div className="relative sm:max-w-[100%] mt-6 m-auto">
            <input
              type={"search_integration"}
              placeholder={"Search for integration"}
              className={
                "border border-input_color w-full block  px-3 py-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10"
              }
              id={"search_integration"}
            />
            <img
              className="w-5 top-[13px] left-[14px] absolute"
              src="/search.png"
            />
          </div>
          </>
          ):""}

          {!integrationform ? (
            <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 shadow-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 lg:px-4">
                {integrationData?.map((item, key) => (
                  <div key={key}>
                    <div
                      className="bg-white flex flex-col justify-between cursor-pointer shadow-lg hover:translate-y-[-4px] transition-transform duration-300 integration_cards"
                      style={{
                        border: "1px solid rgb(237, 237, 237)",
                        borderRadius: "8px",
                      }}
                      key={key}
                      onClick={() => setIntegrationform(true)}
                    >
                      <div className="flex justify-start gap-2 items-center p-4 sm:p-6 ">
                        <div className="w-[20%]">
                          <div className="relative pt-2 w-[22px] h-[22px] rounded-lg m-auto">
                            <Image
                              fill={"true"}
                              className="bg-contain mx-auto w-full rounded-lg"
                              alt="logo.png"
                              src={item.logo}
                            />
                          </div>
                        </div>
                        <h3 className="w-[80%] font-semibold text-md text-heading">
                          {item.name}
                          <p className="text-sm text-[#9CA3AF] font-normal mt-1">
                            {
                              totalActiveIntegrations(
                                integrationdata?.results,
                                item.type
                              )?.length
                            }{" "}
                            active{" "}
                            {totalActiveIntegrations(
                              integrationdata?.results,
                              item.type
                            )?.length > 1
                              ? "integrations"
                              : "integration"}
                          </p>
                        </h3>
                      </div>
                    </div>
                    {/* <div className="flex justify-between items-center mt-3">
                  <div className="">
                    <h3 className="font-semibold text-md text-heading">
                      {item.name}
                    </h3>
                    <p className="text-sm my-2">
                      {
                        totalActiveIntegrations(
                          integrationdata?.results,
                          item.type
                        )?.length
                      }{" "}
                      active{" "}
                      {totalActiveIntegrations(
                        integrationdata?.results,
                        item.type
                      )?.length > 1
                        ? "integrations"
                        : "integration"}
                    </p>
                  </div>
                  <div className="grid">
                    {item?.is_configure === true && (
                      totalActiveIntegrations(integrationdata?.results, item.type) == 0 ?
                        <p className="cursor-pointer text-sm" onClick={(e) => handleIntegrationButton(null, 'create', item?.type, key)}>Configure</p> : (
                          <>
                            <p className="cursor-pointer text-sm" onClick={(e) => handleIntegrationButton(totalActiveIntegrations(integrationdata?.results, item.type)?.slice(0, 1)[0], 'update', item?.type, key)}>Edit</p>
                            <p className="cursor-pointer text-sm mt-2" onClick={(e) => addAutomationHandler(item?.type)}>Add Automation</p>
                          </>
                        ))}
                  </div>
                </div>
                <hr className="border-border" /> */}
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Integrationform setIntegrationform={setIntegrationform} />
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
      {integrationModal ? (
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
      )}
      <ToastContainer />
    </>
  );
};

export default Page;
