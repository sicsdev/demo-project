import React from 'react';
import { useState } from 'react';
import Button from "@/app/components/Common/Button/Button";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";
import Swal from "sweetalert2";
import { Input } from '../Common/Input/Input';
import {
    addIntegrationData,
    updateIntegrationData
} from "@/app/API/pages/Integration";

export const ConfigureIntegration = ({ fetchIntegrations, setConf, integrationRecord, mode, type, ...rest }) => {
    const [loading, setLoading] = useState(false);
    const [integrationFormData, setIntegrationFormData] = useState({
        type: type,
        baseUrl: integrationRecord?.http_base || "",
        provider: integrationRecord?.provider || "",
        authType: integrationRecord?.http_auth_scheme || "",
        username: integrationRecord?.data?.username || "",
        password: integrationRecord?.data?.password || "" || "",
        apiKey: integrationRecord?.data?.apikey || "",
        clientkey: integrationRecord?.data?.client_key || "",
        clientsecret: integrationRecord?.data?.client_secret || "",
        clientkey2: integrationRecord?.data?.client_secret || "",
        clientsecret2: integrationRecord?.data?.client_secret || "",
        clientredirecturl: integrationRecord?.data?.client_redirect_url || "",
        name: integrationRecord?.name || ''
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
        if (name === 'provider' && value === 'stripe') {
            setIntegrationFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
                authType: 'api_key'
            }));
        } else if (name === 'provider' && value === 'shopify') {
            setIntegrationFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
                authType: 'oauth1'
            }));
        } else if (name === 'provider' && value === 'custom') {
            setIntegrationFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
                authType: ''
            }));
        } else {
            setIntegrationFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleIntegrationSubmitForm = async (e) => {
        e.preventDefault();
        try {
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
                type: integrationFormData?.type,
                name: integrationFormData.name,
                provider: integrationFormData?.provider,
                http_auth_scheme: integrationFormData?.authType,
                http_base: integrationFormData?.baseUrl,
                data: data
            }
            let configureIntegration;
            let successMessage;

            if (mode === 'update') {
                configureIntegration = await updateIntegrationData(payload, integrationRecord?.id);
                successMessage = `Integration Update Successfully!`;
            } else {
                configureIntegration = await addIntegrationData(payload);
                successMessage = `Integration Added Successfully!`;
            }
            if (configureIntegration?.status === 201 || configureIntegration?.status === 200) {
                setLoading(false);
                setConf(null);
                fetchIntegrations();
                Swal.fire("Success", successMessage, "success");
            } else {
                setLoading(false);
                Swal.fire("Error", "Unable to Proceed!", "error");
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => handleIntegrationSubmitForm(e)}>

            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Integration Name
                </label>
                <Input
                    type={"text"}
                    placeholder={"Enter Name"}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                    name="name"
                    value={integrationFormData.name}
                    id={"integration_name"}
                    onChange={(e) => handleIntegrationInputChange(e)}
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Base URL
                </label>
                <Input
                    type={"url"}
                    placeholder={"Enter text..."}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                    name="baseUrl"
                    value={integrationFormData.baseUrl}
                    id={"integration_base_url"}
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
                            <Input
                                type={"text"}
                                placeholder={"Enter text..."}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                                name="username"
                                value={integrationFormData.username}
                                id={"integration_auth_username"}
                                onChange={(e) => handleIntegrationInputChange(e)}
                            />
                        </div>
                        <div className="mb-4 ml-6">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Password
                            </label>
                            <Input
                                type={"password"}
                                placeholder={"Enter text..."}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                                name="password"
                                value={integrationFormData.password}
                                id={"integration_auth_password"}
                                onChange={(e) => handleIntegrationInputChange(e)}
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
                        <Input
                            type={"text"}
                            placeholder={"API Key"}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                            name="apiKey"
                            value={integrationFormData.apiKey}
                            id={"integration_autt_api_key"}
                            onChange={(e) => handleIntegrationInputChange(e)}
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
                            <Input
                                type={"text"}
                                placeholder={"Client Key"}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                                name="clientkey"
                                value={integrationFormData.clientkey}
                                id={"integration_oauth_client_key"}
                                onChange={(e) => handleIntegrationInputChange(e)}
                            />
                        </div>
                        <div className="mb-4 mt-4 ml-6">
                            <label
                                htmlFor="clientsecret"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Client Secret
                            </label>
                            <Input
                                type={"password"}
                                placeholder={"Client Secret"}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                                name="clientsecret"
                                value={integrationFormData.clientsecret}
                                id={"integration_oauth_client_secret"}
                                onChange={(e) => handleIntegrationInputChange(e)}
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
                            <Input
                                type={"text"}
                                placeholder={"Client Key"}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                                name="clientkey2"
                                value={integrationFormData.clientkey2}
                                id={"integration_oauth_client_key_2"}
                                onChange={(e) => handleIntegrationInputChange(e)}
                            />
                        </div>
                        <div className="mb-4 mt-4 ml-6">
                            <label
                                htmlFor="clientsecret2"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Client Secret
                            </label>
                            <Input
                                type={"password"}
                                placeholder={"Client Secret"}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                                name="clientsecret2"
                                value={integrationFormData.clientsecret2}
                                id={"integration_oauth_client_secret_2"}
                                onChange={(e) => handleIntegrationInputChange(e)}
                            />
                        </div>
                        <div className="mb-4 mt-4 ml-6">
                            <label
                                htmlFor="clientredirecturl"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Client Redirect URL
                            </label>
                            <Input
                                type={"text"}
                                placeholder={"Client Redirect URL"}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                                name="clientredirecturl"
                                value={integrationFormData.clientredirecturl}
                                id={"integration_oauth_client_redirecturl"}
                                onChange={(e) => handleIntegrationInputChange(e)}
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
                        {mode === 'update' ? 'Update' : 'Save'}
                    </Button>
                )}
            </div>
        </form>
    )
}
