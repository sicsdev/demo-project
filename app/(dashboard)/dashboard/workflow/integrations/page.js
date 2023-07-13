"use client";
import React, { useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import Card from "@/app/components/Common/Card/Card";
import ManageAutomations from "@/app/components/Integration/page";
import { ConfigureIntegration } from "@/app/components/Integration/Integration";
import {
  getAllIntegration
} from "@/app/API/pages/Integration";
import { useEffect } from "react";
import Loading from "@/app/components/Loading/Loading";
import integrationData from "@/app/data/integration_data.json";

const Page = () => {
  const [edit, setEdit] = useState(false);
  const [integrationdata, setIntegrationdata] = useState([]);
  const [dataLoader, setDataLoader] = useState(false);
  const [mode, setMode] = useState('create');
  const [singleIntegrationData, setSingleIntegrationData] = useState(null);
  const [configureIntegrationItem, setConfigureIntegrationItem] = useState(null);
  const [integrationType, setIntegrationType] = useState("");

  const addAutomationHandler = (type) => {
    setEdit(true);
    setIntegrationType(type);
  };

  const handleIntegrationButton = (integrationRecord, modeType, type, key) => {
    setMode(modeType);
    setIntegrationType(type);
    setConfigureIntegrationItem(key);
    if (integrationRecord && integrationRecord !== null) {
      setSingleIntegrationData(integrationRecord);
    } else {
      setSingleIntegrationData(null);
    }
  };

  const totalActiveIntegrations = (array, type) => {
    const matchingRecords = array?.filter(x => x.type === type);
    return matchingRecords;
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

  return (
    <>

      {dataLoader === true ? <Loading /> : !edit ? (
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

          <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
            {integrationData?.map((item, key) => (
              <div key={key}>
                <div className="flex justify-between items-center mt-3">
                  <div className="">
                    <h3 className="font-semibold text-md text-heading">{item.name}</h3>
                    <p className="text-sm my-2">
                      {totalActiveIntegrations(integrationdata?.results, item.type)?.length} active {totalActiveIntegrations(integrationdata?.results, item.type)?.length > 1 ? 'integrations' : 'integration'}
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
                {configureIntegrationItem === key ? (
                  <div className="py-6 pr-6">
                    <ConfigureIntegration setConf={setConfigureIntegrationItem} fetchIntegrations={fetchIntegrations} mode={mode} integrationRecord={singleIntegrationData} type={integrationType} />
                  </div>
                ) : (
                  ""
                )}
                <hr className="border-border" />
              </div>
            ))}
          </Card>
        </>
      ) : (
        <>
          {edit ? <ManageAutomations setEdit={setEdit} setConf={setConfigureIntegrationItem} integrationData={integrationdata?.results?.slice(0, 1)[0]} type={integrationType} /> : ""}
        </>
      )
      }

    </>
  );
};

export default Page;
