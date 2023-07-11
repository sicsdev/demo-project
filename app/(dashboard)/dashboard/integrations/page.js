"use client";
import React, { useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import Card from "@/app/components/Common/Card/Card";
import Integrationedit from "@/app/components/Integration/page";
import Integrationemail from "@/app/components/Integrationemail/page";
import { ConfigureIntegration } from "@/app/components/Integration/Integration";
import {
  getAllIntegration
} from "@/app/API/pages/Integration";
import { useEffect } from "react";
import Loading from "@/app/components/Loading/Loading";

const Page = () => {
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(false);
  const [conf, setConf] = useState(false);
  const [integrationdata, setIntegrationdata] = useState([]);
  const [dataLoader, setDataLoader] = useState(false);

  const handlerEdit = () => {
    if (integrationdata.count == 0) {
      setConf(true);
    } else {
      setEdit(true);
    }
  };


  const handlerIntegrationEmail = () => {
    setEmail(true);
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

      {dataLoader === true ? <Loading /> : !edit && !email ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" /> Integrations
                </a>
              </li>
            </ul>
          </div>

          <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">Billing</h3>
                <p className="text-sm my-2">
                  {integrationdata?.count} active integrations
                </p>
              </div>
              <p className="cursor-pointer text-sm" onClick={(e) => handlerEdit(e)}>
                {integrationdata?.count == 0 ? "Configure" : "Edit"}
              </p>
            </div>
            {conf == true ? (
              <div className="py-6 pr-6">
                <ConfigureIntegration fetchIntegrations={fetchIntegrations} setConf={setConf} />
              </div>
            ) : (
              ""
            )}
            <hr className="border-border" />
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">Shipping</h3>
                <p className="text-sm my-2">0 active integrations</p>
              </div>
              <p
                className="cursor-pointer text-sm"
                onClick={handlerIntegrationEmail}
              ></p>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">
                  Social Media
                </h3>
                <p className="text-sm my-2">0 active integrations</p>
              </div>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">Custom</h3>
                <p className="text-sm my-2">0 active integrations</p>
              </div>
            </div>
            <hr className="border-border" />
          </Card>
        </>
      ) : (
        <>
          {edit ? <Integrationedit setEdit={setEdit} integrationData={integrationdata?.results?.slice(0, 1)[0]} /> : ""}
          {email ? <Integrationemail /> : ""}
        </>
      )}

    </>
  );
};

export default Page;
