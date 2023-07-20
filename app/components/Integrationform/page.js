"use client"
import React from "react";
import { ConfigureIntegration } from "../Integration/Integration";

const Integrationform = ({setIntegrationform}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <p class="text-black-color text-2xl font-bold mt-8">
          Configure REST API
        </p>
        <p
          class="text-black-color text-sm font-normal mt-8 mb-4 cursor-pointer"
          onClick={() => setIntegrationform(false)}
        >
          back
        </p>
      </div>
      <div className="pt-8">
        <div class="grid grid-cols-1 md:grid-cols-5">
          <div class="col-span-1 md:col-span-4 bg-red-300">
            <div className="mr-8">
              <ConfigureIntegration
                fetchIntegrations="dummy"
                setShow="dummy"
                mode="dummy"
                integrationRecord="dummy"
                type="dummy"
              />
            </div>
          </div>
          <div class="col-span-4 md:col-span-1 bg-blue-300">
            <div className="bg-[#F9F9F9] p-5 rounded-md">
              <p className="font-semibold text-md mb-2">Need help?</p>
              <p className="font-normal text-md">
                <img src="" />
                Rest API guide
              </p>
              <p className="font-normal text-md">
                <img src="" />
                Troubleshoot connections
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Integrationform;
