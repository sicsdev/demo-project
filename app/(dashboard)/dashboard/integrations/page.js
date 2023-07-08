"use client";
import React, { useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import Card from "@/app/components/Common/Card/Card";
import Integrationedit from "@/app/components/Integration/page";
import Integrationemail from "@/app/components/Integrationemail/page";
import Button from "@/app/components/Common/Button/Button";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";
import Swal from "sweetalert2";
import {
  addIntegrationData,
  getAllIntegration
} from "@/app/API/pages/Integration";
import { useEffect } from "react";

const Page = () => {
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(false);
  const [conf, setConf] = useState(false);
  const [loading, setLoading] = useState(false);

  const [integrationFormData, setIntegrationFormData] = useState({
    baseUrl: "",
    provider: "",
    authType: "",
    username: "",
    password: "",
    apiKey: "",
    clientkey: "",
    clientsecret: "",
    clientkey2: "",
    clientsecret2: "",
    clientredirecturl: "",
  });

  const DisablingButton = () => {
    var requiredKeys = ["baseUrl", "provider", "authType"];
    switch (integrationFormData?.authType) {
      case "none":
        break;
      case "auth":
        requiredKeys = ["baseUrl", "provider", "authType", "username", "password"];
        break;
      case "api_key":
        requiredKeys = ["baseUrl", "provider", "authType", "apiKey"];
        break;
      case "oauth1":
        requiredKeys = ["baseUrl", "provider", "authType", "clientkey", "clientsecret"];
        break;
      case "oauth2":
        requiredKeys = ["baseUrl", "provider", "authType", "clientkey2", "clientsecret2", "clientredirecturl"];
        break;
      default:
        break;
    }

    return requiredKeys.some(
      (key) => !integrationFormData[key] || integrationFormData[key].trim() === ""
    );
  };

  const handleIntegrationInputChange = (e) => {
    const { name, value } = e.target;

    setIntegrationFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleIntegrationSubmitForm = async (e) => {
    e.preventDefault();
    let data = {};
    setLoading(true);
    switch (integrationFormData?.authType) {
      case "none":
        data = {}
        break;
      case "auth":
        data = {
          username: integrationFormData?.username,
          password: integrationFormData?.password
        }
        break;
      case "api_key":
        data = {
          apikey: integrationFormData?.apiKey,
        }
        break;
      case "oauth1":
        data = {
          client_key: integrationFormData?.clientkey,
          client_secret: integrationFormData?.clientsecret,
        }
        break;
      case "oauth2":
        data = {
          client_key: integrationFormData?.clientkey2,
          client_secret: integrationFormData?.clientsecret2,
          client_redirect_url: integrationFormData?.clientredirecturl,
        }
        break;
      default:
        break;
    }

    let payload = {
      type: "BILLING",
      provider: integrationFormData?.provider,
      http_auth_scheme: integrationFormData?.authType,
      http_base: integrationFormData?.baseUrl,
      data: data
    }
    const addIntegration = await addIntegrationData(payload);
    if (addIntegration?.status === 201) {
      setLoading(false);
      setConf(false);
      fetchIntegrations();
      Swal.fire("Success", "Integration Added Successfully!", "success");
    } else {
      setLoading(false);
      Swal.fire("Error", "Unable to add integration!", "error");
    }
  };

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
      const data = await getAllIntegration();
      setIntegrationdata(data);
      setId(data);
    } catch (error) { }
  };


  // get integration
  const [integrationdata, setIntegrationdata] = useState([]);
  useEffect(() => {
    fetchIntegrations();
  }, []);

  return (
    <>
      {!edit && !email ? (
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
              <p className="cursor-pointer text-sm" onClick={handlerEdit}>
                {integrationdata?.count == 0 ? "Configure" : "Edit"}
              </p>
            </div>
            {conf == true ? (
              <div className="py-6 pr-6">
                <form onSubmit={(e) => handleIntegrationSubmitForm(e)}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Base URL
                    </label>
                    <input
                      type="text"
                      name="baseUrl"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                      placeholder="Enter text..."
                      value={integrationFormData.baseUrl}
                      onChange={(e) => handleIntegrationInputChange(e)}
                      required
                    />
                    <p className="text-sm mt-2">
                      Any URL with a querystring will be re-encoded properly.
                    </p>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="auth"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Provider
                    </label>
                    <select
                      name="provider"
                      value={integrationFormData.provider}
                      onChange={handleIntegrationInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                      required
                    >
                      <option value="" disabled>
                        Choose value..
                      </option>
                      <option value="stripe">Stripe</option>
                      <option value="shopify">Shopify</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="auth"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Auth Type
                    </label>
                    <select
                      name="authType"
                      value={integrationFormData.authType}
                      onChange={handleIntegrationInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                      required
                    >
                      <option value="" disabled>
                        Choose value..
                      </option>
                      <option value="none">No Auth</option>
                      <option value="auth">Basic Auth</option>
                      <option value="api_key">API Key</option>
                      <option value="oauth1">OAuth</option>
                      <option value="oauth2">OAuth2</option>
                      Other country options...
                    </select>
                    <p className="text-sm mt-2">
                      The Auth structure we'll use to perform the request.
                    </p>

                    {integrationFormData?.authType === "none" && ""}

                    {integrationFormData?.authType === "auth" && (
                      <>
                        <div className="mb-4 mt-4 ml-6">
                          <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            User Name
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={integrationFormData.username}
                            onChange={handleIntegrationInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                            placeholder="User name"
                            required
                          />
                        </div>
                        <div className="mb-4 ml-6">
                          <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={integrationFormData.password}
                            onChange={handleIntegrationInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                            placeholder="Enter password"
                            required
                          />
                        </div>
                      </>
                    )}
                    {integrationFormData?.authType === "api_key" && (
                      <div className="mb-4 mt-4 ml-6">
                        <label
                          htmlFor="apikey"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          API Key
                        </label>
                        <input
                          type="text"
                          name="apiKey"
                          value={integrationFormData.apiKey}
                          onChange={handleIntegrationInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                          placeholder="API Key"
                          required
                        />
                      </div>
                    )}
                    {integrationFormData?.authType === "oauth1" && (
                      <>
                        <div className="mb-4 mt-4 ml-6">
                          <label
                            htmlFor="clientkey"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Client Key
                          </label>
                          <input
                            type="text"
                            name="clientkey"
                            value={integrationFormData.clientkey}
                            onChange={handleIntegrationInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                            placeholder="Client Key"
                            required
                          />
                        </div>
                        <div className="mb-4 mt-4 ml-6">
                          <label
                            htmlFor="clientsecret"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Client Secret
                          </label>
                          <input
                            type="password"
                            name="clientsecret"
                            value={integrationFormData.clientsecret}
                            onChange={handleIntegrationInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                            placeholder="Client Secret"
                            required
                          />
                        </div>
                      </>
                    )}
                    {integrationFormData?.authType === "oauth2" && (
                      <>
                        <div className="mb-4 mt-4 ml-6">
                          <label
                            htmlFor="clientkey2"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Client Key
                          </label>
                          <input
                            type="text"
                            name="clientkey2"
                            value={integrationFormData.clientkey2}
                            onChange={handleIntegrationInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                            placeholder="Client Key"
                            required
                          />
                        </div>
                        <div className="mb-4 mt-4 ml-6">
                          <label
                            htmlFor="clientsecret2"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Client Secret
                          </label>
                          <input
                            type="password"
                            name="clientsecret2"
                            value={integrationFormData.clientsecret2}
                            onChange={handleIntegrationInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                            placeholder="Client Secret"
                            required
                          />
                        </div>
                        <div className="mb-4 mt-4 ml-6">
                          <label
                            htmlFor="clientredirecturl"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Client Redirect URL
                          </label>
                          <input
                            type="text"
                            name="clientredirecturl"
                            value={integrationFormData.clientredirecturl}
                            onChange={handleIntegrationInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                            placeholder="Client Redirect URL"
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    {loading ? (
                      <LoaderButton />
                    ) : (
                      <Button
                        type={"submit"}
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                        disabled={DisablingButton()}
                      >
                        Save
                      </Button>
                    )}
                  </div>
                </form>
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
          {edit ? <Integrationedit setEdit={setEdit} /> : ""}
          {email ? <Integrationemail /> : ""}
        </>
      )}
    </>
  );
};

export default Page;
