"use client";
import { ShareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";
import Card from "../Common/Card/Card";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
const Integrationedit = (props) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [issuerefund, setIssuerefund] = useState(false);
  const [cancelsub, setCancelsub] = useState(false);
  const [pausesub, setPausesub] = useState(false);
  const [reactivesub, setReactivesub] = useState(false);
  const [issuecoupon, setIssuecoupon] = useState(false);
  const [payment, setPayment] = useState(false);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const handlerIssueRefundfalse = () => {
    setIssuerefund(false);
    setCancelsub(false);
    setPausesub(false);
    setIssuecoupon(false);
    setPayment(false);
    setReactivesub(false);
  };
  const handlerIssueRefund = () => {
    setIssuerefund(true);
  };
  const handlerCancelSubs = () => {
    setCancelsub(true);
  };
  const handlerPauseSubs = () => {
    setPausesub(true);
  };
  const handlerReactive = () => {
    setReactivesub(true);
  };
  const handlerIssueCoupon = () => {
    setIssuecoupon(true);
  };
  const handlerPaymentMethod = () => {
    setPayment(true);
  };
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      {issuerefund ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                    ? "Cancel Subscription"
                    : pausesub
                    ? "Pause Subscription"
                    : reactivesub
                    ? "Reactivate Subscription"
                    : issuecoupon
                    ? "Issue Coupon / Promo / Credit "
                    : payment
                    ? "Add Payment Method"
                    : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8 text-[0.875rem]  sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-primary  ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>

          <div className="py-6 pr-6">
            <form class="w-100 mx-auto">
              <div class="mb-4">
                <label
                  for="method"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Method (required)
                </label>
                <select
                  id="method"
                  name="method"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled selected>
                    Choose value...
                  </option>
                  <option value="post">Post</option>
                  <option value="patch">Patch</option>
                  <option value="put">Put</option>
                  <option value="get">Get</option>
                  <option value="delete">Delete</option>
                </select>
                <p className="text-sm mt-2">
                  The HTTP method we'll use to perform the request.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="name"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  URL (required)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Any URL with a querystring will be re-encoded properly.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="auth"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Auth Type
                </label>
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled>
                    Choose value..
                  </option>
                  <option value="no_auth">No Auth</option>
                  <option value="basic_auth">Basic Auth</option>
                  <option value="api_auth">API Key</option>
                  <option value="Oauth">OAuth</option>
                  <option value="Oauth2">OAuth2</option>

                  {/* Other country options... */}
                </select>
                <p className="text-sm mt-2">
                  The Auth structure we'll use to perform the request.
                </p>

                {selectedCountry === "no_auth" && ""}

                {selectedCountry === "basic_auth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="User name"
                      />
                    </div>
                    <div class="mb-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Enter password"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "api_auth" && (
                  <div class="mb-4 mt-4 ml-6">
                    <label
                      for="apikey"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      API Key
                    </label>
                    <input
                      type="text"
                      id="apikey"
                      name="apikey"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                      placeholder="API Key"
                    />
                  </div>
                )}
                {selectedCountry === "Oauth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey"
                        name="clientkey"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret"
                        name="clientsecret"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "Oauth2" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey2"
                        name="clientkey2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret2"
                        name="clientsecret2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientredirecturl"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Redirect URL
                      </label>
                      <input
                        type="text"
                        id="clientredirecturl"
                        name="clientredirecturl"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Redirect URL"
                      />
                    </div>
                  </>
                )}
              </div>

              <div class="mb-4">
                <label
                  for="name"
                  class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
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

                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Paste, in written english, instructions to the bot governing
                  this action.{" "}
                </p>
              </div>
              <div class="mb-4">
                <label
                  for="name"
                  class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
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
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Example JSON data to verify the action formatting.{" "}
                </p>
              </div>
              <div class="mb-4 spec">
                <label
                  for="method"
                  class="flex text-gray-700 text-sm font-bold mb-2"
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
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
                <p className="text-sm mt-2">
                  Require customer to confirm before action is performed.{" "}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg">
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      ) : cancelsub ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                    ? "Cancel Subscription"
                    : pausesub
                    ? "Pause Subscription"
                    : reactivesub
                    ? "Reactivate Subscription"
                    : issuecoupon
                    ? "Issue Coupon / Promo / Credit "
                    : payment
                    ? "Add Payment Method"
                    : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8   text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-primary  ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <form class="w-100 mx-auto">
              <div class="mb-4">
                <label
                  for="method"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Method (required)
                </label>
                <select
                  id="method"
                  name="method"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled selected>
                    Choose value...
                  </option>
                  <option value="post">Post</option>
                  <option value="patch">Patch</option>
                  <option value="put">Put</option>
                  <option value="get">Get</option>
                  <option value="delete">Delete</option>
                </select>
                <p className="text-sm mt-2">
                  The HTTP method we'll use to perform the request.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="name"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  URL (required)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Any URL with a querystring will be re-encoded properly.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="auth"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Auth Type
                </label>
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled>
                    Choose value..
                  </option>
                  <option value="no_auth">No Auth</option>
                  <option value="basic_auth">Basic Auth</option>
                  <option value="api_auth">API Key</option>
                  <option value="Oauth">OAuth</option>
                  <option value="Oauth2">OAuth2</option>

                  {/* Other country options... */}
                </select>
                <p className="text-sm mt-2">
                  The Auth structure we'll use to perform the request.
                </p>

                {selectedCountry === "no_auth" && ""}

                {selectedCountry === "basic_auth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="User name"
                      />
                    </div>
                    <div class="mb-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Enter password"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "api_auth" && (
                  <div class="mb-4 mt-4 ml-6">
                    <label
                      for="apikey"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      API Key
                    </label>
                    <input
                      type="text"
                      id="apikey"
                      name="apikey"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                      placeholder="API Key"
                    />
                  </div>
                )}
                {selectedCountry === "Oauth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey"
                        name="clientkey"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret"
                        name="clientsecret"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "Oauth2" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey2"
                        name="clientkey2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret2"
                        name="clientsecret2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientredirecturl"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Redirect URL
                      </label>
                      <input
                        type="text"
                        id="clientredirecturl"
                        name="clientredirecturl"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Redirect URL"
                      />
                    </div>
                  </>
                )}
              </div>
              <div class="mb-4">
                <label
                  for="name"
                  class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
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

                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Paste, in written english, instructions to the bot governing
                  this action.{" "}
                </p>
              </div>
              <div class="mb-4">
                <label
                  for="name"
                  class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
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
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Example JSON data to verify the action formatting.{" "}
                </p>
              </div>
              <div class="mb-4 spec">
                <label
                  for="method"
                  class="flex text-gray-700 text-sm font-bold mb-2"
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
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
                <p className="text-sm mt-2">
                  Require customer to confirm before action is performed.{" "}
                </p>
              </div>
              <div className="flex items-center justify-between">
                {/* <button
              type="button"
                onClick={() => handlerIssueRefundfalse()}
                className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
              >
                Back
              </button> */}
                <button
                  // type="submit"
                  className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      ) : pausesub ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                    ? "Cancel Subscription"
                    : pausesub
                    ? "Pause Subscription"
                    : reactivesub
                    ? "Reactivate Subscription"
                    : issuecoupon
                    ? "Issue Coupon / Promo / Credit "
                    : payment
                    ? "Add Payment Method"
                    : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8   text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-primary ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <form class="w-100 mx-auto">
              <div class="mb-4">
                <label
                  for="method"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Method (required)
                </label>
                <select
                  id="method"
                  name="method"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled selected>
                    Choose value...
                  </option>
                  <option value="post">Post</option>
                  <option value="patch">Patch</option>
                  <option value="put">Put</option>
                  <option value="get">Get</option>
                  <option value="delete">Delete</option>
                </select>
                <p className="text-sm mt-2">
                  The HTTP method we'll use to perform the request.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="name"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  URL (required)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Any URL with a querystring will be re-encoded properly.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="auth"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Auth Type
                </label>
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled>
                    Choose value..
                  </option>
                  <option value="no_auth">No Auth</option>
                  <option value="basic_auth">Basic Auth</option>
                  <option value="api_auth">API Key</option>
                  <option value="Oauth">OAuth</option>
                  <option value="Oauth2">OAuth2</option>

                  {/* Other country options... */}
                </select>
                <p className="text-sm mt-2">
                  The Auth structure we'll use to perform the request.
                </p>
                <div class="mb-4">
                  <label
                    for="name"
                    class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                  >
                    Action Policies
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          To ensure our model accurately calls your API endpoint
                          without error, please pass a single example JSON
                          payload for the API without headers or any auth tokens
                          we can utilize as an example.
                        </span>
                      </Card>
                    </span>
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                    placeholder="Enter text..."
                  />
                  <p className="text-sm mt-2">
                    Paste, in written english, instructions to the bot governing
                    this action.{" "}
                  </p>
                </div>
                <div class="mb-4">
                  <label
                    for="name"
                    class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                  >
                    Example Params Payload{" "}
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          Please enter in concise english the policies governing
                          when this action can be granted. These policies will
                          be enforced by the bot before the action can be
                          performed. For example, for a refund action, please
                          add your refund policies. Ensure you include any
                          exceptions to the policy at all as this policy will be
                          upheld.
                        </span>
                      </Card>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                    placeholder="Enter text..."
                  />
                  <p className="text-sm mt-2">
                    Example JSON data to verify the action formatting.{" "}
                  </p>
                </div>
                <div class="mb-4 spec">
                  <label
                    for="method"
                    class="flex text-gray-700 text-sm font-bold mb-2"
                  >
                    Requires Customer Confirmation?
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          To ensure our model accurately calls your API endpoint
                          without error, please pass a single example JSON
                          payload for the API without headers or any auth tokens
                          we can utilize as an example.
                        </span>
                      </Card>
                    </span>
                  </label>

                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                  <p className="text-sm mt-2">
                    Require customer to confirm before action is performed.{" "}
                  </p>
                </div>
                {selectedCountry === "no_auth" && ""}

                {selectedCountry === "basic_auth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="User name"
                      />
                    </div>
                    <div class="mb-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Enter password"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "api_auth" && (
                  <div class="mb-4 mt-4 ml-6">
                    <label
                      for="apikey"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      API Key
                    </label>
                    <input
                      type="text"
                      id="apikey"
                      name="apikey"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                      placeholder="API Key"
                    />
                  </div>
                )}
                {selectedCountry === "Oauth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey"
                        name="clientkey"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret"
                        name="clientsecret"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "Oauth2" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey2"
                        name="clientkey2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret2"
                        name="clientsecret2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientredirecturl"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Redirect URL
                      </label>
                      <input
                        type="text"
                        id="clientredirecturl"
                        name="clientredirecturl"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Redirect URL"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between">
                {/* <button
              type="button"
                onClick={() => handlerIssueRefundfalse()}
                className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
              >
                Back
              </button> */}
                <button
                  // type="submit"
                  className="py-2 px-8  sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      ) : reactivesub ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                    ? "Cancel Subscription"
                    : pausesub
                    ? "Pause Subscription"
                    : reactivesub
                    ? "Reactivate Subscription"
                    : issuecoupon
                    ? "Issue Coupon / Promo / Credit "
                    : payment
                    ? "Add Payment Method"
                    : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8   text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-primary  ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <form class="w-100 mx-auto">
              <div class="mb-4">
                <label
                  for="method"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Method (required)
                </label>
                <select
                  id="method"
                  name="method"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled selected>
                    Choose value...
                  </option>
                  <option value="post">Post</option>
                  <option value="patch">Patch</option>
                  <option value="put">Put</option>
                  <option value="get">Get</option>
                  <option value="delete">Delete</option>
                </select>
                <p className="text-sm mt-2">
                  The HTTP method we'll use to perform the request.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="name"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  URL (required)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Any URL with a querystring will be re-encoded properly.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="auth"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Auth Type
                </label>
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled>
                    Choose value..
                  </option>
                  <option value="no_auth">No Auth</option>
                  <option value="basic_auth">Basic Auth</option>
                  <option value="api_auth">API Key</option>
                  <option value="Oauth">OAuth</option>
                  <option value="Oauth2">OAuth2</option>

                  {/* Other country options... */}
                </select>
                <p className="text-sm mt-2">
                  The Auth structure we'll use to perform the request.
                </p>
                <div class="mb-4">
                  <label
                    for="name"
                    class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                  >
                    Action Policies
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          To ensure our model accurately calls your API endpoint
                          without error, please pass a single example JSON
                          payload for the API without headers or any auth tokens
                          we can utilize as an example.
                        </span>
                      </Card>
                    </span>
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                    placeholder="Enter text..."
                  />
                  <p className="text-sm mt-2">
                    Paste, in written english, instructions to the bot governing
                    this action.{" "}
                  </p>
                </div>
                <div class="mb-4">
                  <label
                    for="name"
                    class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                  >
                    Example Params Payload{" "}
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          Please enter in concise english the policies governing
                          when this action can be granted. These policies will
                          be enforced by the bot before the action can be
                          performed. For example, for a refund action, please
                          add your refund policies. Ensure you include any
                          exceptions to the policy at all as this policy will be
                          upheld.
                        </span>
                      </Card>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                    placeholder="Enter text..."
                  />
                  <p className="text-sm mt-2">
                    Example JSON data to verify the action formatting.{" "}
                  </p>
                </div>
                <div class="mb-4 spec">
                  <label
                    for="method"
                    class="flex text-gray-700 text-sm font-bold mb-2"
                  >
                    Requires Customer Confirmation?
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          To ensure our model accurately calls your API endpoint
                          without error, please pass a single example JSON
                          payload for the API without headers or any auth tokens
                          we can utilize as an example.
                        </span>
                      </Card>
                    </span>
                  </label>

                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                  <p className="text-sm mt-2">
                    Require customer to confirm before action is performed.{" "}
                  </p>
                </div>
                {selectedCountry === "no_auth" && ""}

                {selectedCountry === "basic_auth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="User name"
                      />
                    </div>
                    <div class="mb-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Enter password"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "api_auth" && (
                  <div class="mb-4 mt-4 ml-6">
                    <label
                      for="apikey"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      API Key
                    </label>
                    <input
                      type="text"
                      id="apikey"
                      name="apikey"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                      placeholder="API Key"
                    />
                  </div>
                )}
                {selectedCountry === "Oauth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey"
                        name="clientkey"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret"
                        name="clientsecret"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "Oauth2" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey2"
                        name="clientkey2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret2"
                        name="clientsecret2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientredirecturl"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Redirect URL
                      </label>
                      <input
                        type="text"
                        id="clientredirecturl"
                        name="clientredirecturl"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Redirect URL"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between">
                {/* <button
              type="button"
                onClick={() => handlerIssueRefundfalse()}
                className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
              >
                Back
              </button> */}
                <button
                  // type="submit"
                  className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      ) : issuecoupon ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                    ? "Cancel Subscription"
                    : pausesub
                    ? "Pause Subscription"
                    : reactivesub
                    ? "Reactivate Subscription"
                    : issuecoupon
                    ? "Issue Coupon / Promo / Credit "
                    : payment
                    ? "Add Payment Method"
                    : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8   text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-primary ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <form class="w-100 mx-auto">
              <div class="mb-4">
                <label
                  for="method"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Method (required)
                </label>
                <select
                  id="method"
                  name="method"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled selected>
                    Choose value...
                  </option>
                  <option value="post">Post</option>
                  <option value="patch">Patch</option>
                  <option value="put">Put</option>
                  <option value="get">Get</option>
                  <option value="delete">Delete</option>
                </select>
                <p className="text-sm mt-2">
                  The HTTP method we'll use to perform the request.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="name"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  URL (required)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Any URL with a querystring will be re-encoded properly.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="auth"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Auth Type
                </label>
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled>
                    Choose value..
                  </option>
                  <option value="no_auth">No Auth</option>
                  <option value="basic_auth">Basic Auth</option>
                  <option value="api_auth">API Key</option>
                  <option value="Oauth">OAuth</option>
                  <option value="Oauth2">OAuth2</option>

                  {/* Other country options... */}
                </select>
                <p className="text-sm mt-2">
                  The Auth structure we'll use to perform the request.
                </p>
                <div class="mb-4">
                  <label
                    for="name"
                    class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                  >
                    Action Policies
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          To ensure our model accurately calls your API endpoint
                          without error, please pass a single example JSON
                          payload for the API without headers or any auth tokens
                          we can utilize as an example.
                        </span>
                      </Card>
                    </span>
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                    placeholder="Enter text..."
                  />
                  <p className="text-sm mt-2">
                    Paste, in written english, instructions to the bot governing
                    this action.{" "}
                  </p>
                </div>
                <div class="mb-4">
                  <label
                    for="name"
                    class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                  >
                    Example Params Payload{" "}
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          Please enter in concise english the policies governing
                          when this action can be granted. These policies will
                          be enforced by the bot before the action can be
                          performed. For example, for a refund action, please
                          add your refund policies. Ensure you include any
                          exceptions to the policy at all as this policy will be
                          upheld.
                        </span>
                      </Card>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                    placeholder="Enter text..."
                  />
                  <p className="text-sm mt-2">
                    Example JSON data to verify the action formatting.{" "}
                  </p>
                </div>
                <div class="mb-4 spec">
                  <label
                    for="method"
                    class="flex text-gray-700 text-sm font-bold mb-2"
                  >
                    Requires Customer Confirmation?
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          To ensure our model accurately calls your API endpoint
                          without error, please pass a single example JSON
                          payload for the API without headers or any auth tokens
                          we can utilize as an example.
                        </span>
                      </Card>
                    </span>
                  </label>

                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                  <p className="text-sm mt-2">
                    Require customer to confirm before action is performed.{" "}
                  </p>
                </div>
                {selectedCountry === "no_auth" && ""}

                {selectedCountry === "basic_auth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="User name"
                      />
                    </div>
                    <div class="mb-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Enter password"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "api_auth" && (
                  <div class="mb-4 mt-4 ml-6">
                    <label
                      for="apikey"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      API Key
                    </label>
                    <input
                      type="text"
                      id="apikey"
                      name="apikey"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                      placeholder="API Key"
                    />
                  </div>
                )}
                {selectedCountry === "Oauth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey"
                        name="clientkey"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret"
                        name="clientsecret"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "Oauth2" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey2"
                        name="clientkey2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret2"
                        name="clientsecret2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientredirecturl"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Redirect URL
                      </label>
                      <input
                        type="text"
                        id="clientredirecturl"
                        name="clientredirecturl"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Redirect URL"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between">
                {/* <button
              type="button"
                onClick={() => handlerIssueRefundfalse()}
                className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
              >
                Back
              </button> */}
                <button
                  // type="submit"
                  className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      ) : payment ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                    ? "Cancel Subscription"
                    : pausesub
                    ? "Pause Subscription"
                    : reactivesub
                    ? "Reactivate Subscription"
                    : issuecoupon
                    ? "Issue Coupon / Promo / Credit "
                    : payment
                    ? "Add Payment Method"
                    : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8  text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-primary ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <form class="w-100 mx-auto">
              <div class="mb-4">
                <label
                  for="method"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Method (required)
                </label>
                <select
                  id="method"
                  name="method"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled selected>
                    Choose value...
                  </option>
                  <option value="post">Post</option>
                  <option value="patch">Patch</option>
                  <option value="put">Put</option>
                  <option value="get">Get</option>
                  <option value="delete">Delete</option>
                </select>
                <p className="text-sm mt-2">
                  The HTTP method we'll use to perform the request.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="name"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  URL (required)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                  placeholder="Enter text..."
                />
                <p className="text-sm mt-2">
                  Any URL with a querystring will be re-encoded properly.
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="auth"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Auth Type
                </label>
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="" disabled>
                    Choose value..
                  </option>
                  <option value="no_auth">No Auth</option>
                  <option value="basic_auth">Basic Auth</option>
                  <option value="api_auth">API Key</option>
                  <option value="Oauth">OAuth</option>
                  <option value="Oauth2">OAuth2</option>

                  {/* Other country options... */}
                </select>
                <p className="text-sm mt-2">
                  The Auth structure we'll use to perform the request.
                </p>
                <div class="mb-4">
                  <label
                    for="name"
                    class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                  >
                    Action Policies
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          To ensure our model accurately calls your API endpoint
                          without error, please pass a single example JSON
                          payload for the API without headers or any auth tokens
                          we can utilize as an example.
                        </span>
                      </Card>
                    </span>
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                    placeholder="Enter text..."
                  />
                  <p className="text-sm mt-2">
                    Paste, in written english, instructions to the bot governing
                    this action.{" "}
                  </p>
                </div>
                <div class="mb-4">
                  <label
                    for="name"
                    class="flex text-gray-700 text-sm font-bold mb-2 gap-1"
                  >
                    Example Params Payload{" "}
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          Please enter in concise english the policies governing
                          when this action can be granted. These policies will
                          be enforced by the bot before the action can be
                          performed. For example, for a refund action, please
                          add your refund policies. Ensure you include any
                          exceptions to the policy at all as this policy will be
                          upheld.
                        </span>
                      </Card>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                    placeholder="Enter text..."
                  />
                  <p className="text-sm mt-2">
                    Example JSON data to verify the action formatting.{" "}
                  </p>
                </div>
                <div class="mb-4 spec">
                  <label
                    for="method"
                    class="flex text-gray-700 text-sm font-bold mb-2"
                  >
                    Requires Customer Confirmation?
                    <span className="group w-[2px] relative">
                      <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                      <Card className="animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block">
                        {" "}
                        <span className="text-xs font-light">
                          To ensure our model accurately calls your API endpoint
                          without error, please pass a single example JSON
                          payload for the API without headers or any auth tokens
                          we can utilize as an example.
                        </span>
                      </Card>
                    </span>
                  </label>

                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                  <p className="text-sm mt-2">
                    Require customer to confirm before action is performed.{" "}
                  </p>
                </div>
                {selectedCountry === "no_auth" && ""}

                {selectedCountry === "basic_auth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="User name"
                      />
                    </div>
                    <div class="mb-4 ml-6">
                      <label
                        for="name"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Enter password"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "api_auth" && (
                  <div class="mb-4 mt-4 ml-6">
                    <label
                      for="apikey"
                      class="block text-gray-700 text-sm font-bold mb-2"
                    >
                      API Key
                    </label>
                    <input
                      type="text"
                      id="apikey"
                      name="apikey"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                      placeholder="API Key"
                    />
                  </div>
                )}
                {selectedCountry === "Oauth" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey"
                        name="clientkey"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret"
                        name="clientsecret"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                  </>
                )}
                {selectedCountry === "Oauth2" && (
                  <>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientkey2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Key
                      </label>
                      <input
                        type="text"
                        id="clientkey2"
                        name="clientkey2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Key"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientsecret2"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientsecret2"
                        name="clientsecret2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Secret"
                      />
                    </div>
                    <div class="mb-4 mt-4 ml-6">
                      <label
                        for="clientredirecturl"
                        class="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Client Redirect URL
                      </label>
                      <input
                        type="text"
                        id="clientredirecturl"
                        name="clientredirecturl"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                        placeholder="Client Redirect URL"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between">
                {/* <button
              type="button"
                onClick={() => handlerIssueRefundfalse()}
                className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
              >
                Back
              </button> */}
                <button
                  // type="submit"
                  className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
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
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                    ? "Cancel Subscription"
                    : pausesub
                    ? "Pause Subscription"
                    : reactivesub
                    ? "Reactivate Subscription"
                    : issuecoupon
                    ? "Issue Coupon / Promo / Credit "
                    : payment
                    ? "Add Payment Method"
                    : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => props.setEdit(false)}
              className="py-2 px-8  text-[0.875rem]  sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-primary  ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Issue Refund
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerIssueRefund}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Cancel Subscription{" "}
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerCancelSubs}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Pause Subscription
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerPauseSubs}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Reactivate Subscription
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerReactive}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Issue Coupon / Promo / Credit{" "}
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerIssueCoupon}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Add Payment Method
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p
              className="cursor-pointer text-sm"
              onClick={handlerPaymentMethod}
            >
              Edit
            </p>
          </div>
          <hr className="border-border" />
        </Card>
      )}
    </>
  );
};

export default Integrationedit;
