"use client";
import React from "react";
import { useState } from "react";

const Integrationedit = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
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
          </select>
          <p className="text-sm mt-2">
            The HTTP method we'll use to perform the request.
          </p>
        </div>

        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
            Url (required)
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
          <label for="auth" class="block text-gray-700 text-sm font-bold mb-2">
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
              Select your country
            </option>
            <option value="no_auth">No Auth</option>
            <option value="basic_auth">Basic Auth</option>
            <option value="api_auth">API Key Auth</option>
            <option value="Oauth">OAuth</option>
            <option value="Oauth2">OAuth2</option>

            {/* Other country options... */}
          </select>
          <p className="text-sm mt-2">
            The HTTP method we'll use to perform the request.
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

        <button
          type="submit"
          className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Integrationedit;
