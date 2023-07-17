import React from 'react';
import { useState } from 'react';
import Button from "@/app/components/Common/Button/Button";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";
import SelectField from '../Common/Input/SelectField';
import {
    addIntegrationData,
    updateIntegrationData
} from "@/app/API/pages/Integration";
import TextAreaField from '../Common/Input/TextAreaField';
import TextField from '../Common/Input/TextField';
import { useRouter, usePathname } from 'next/navigation';
import { successMessage, errorMessage } from "@/app/components/Messages/Messages";

export const ConfigureIntegration = ({ fetchIntegrations, setShow, integrationRecord, mode, type, ...rest }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

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
        name: integrationRecord?.name || '',
        description: integrationRecord?.data?.description || ""
    });

    const DisablingButton = () => {
        var requiredKeys = ["baseUrl", "provider", "description", "authType"];
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
            let message;

            if (mode === 'update') {
                configureIntegration = await updateIntegrationData(payload, integrationRecord?.id);
                message = `Integration Update Successfully!`;
            } else {
                configureIntegration = await addIntegrationData(payload);
                message = `Integration Added Successfully!`;
            }
            if (configureIntegration?.status === 201 || configureIntegration?.status === 200) {
                setLoading(false);
                setShow(false);
                fetchIntegrations();
                successMessage(message);
                router.push(`${pathname}`);
            } else {
                setLoading(false);
                errorMessage("Unable to Proceed!");
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => handleIntegrationSubmitForm(e)}>

            <div className="mb-4">
                <TextField
                    onChange={(e) => handleIntegrationInputChange(e)}
                    value={integrationFormData.name}
                    name="name"
                    labelClass={"text-gray-700 font-bold mb-2"}
                    className="py-3 mt-2"
                    title={"Integration Name"}
                    placeholder={"Enter Name"}
                    type={"text"}
                    id={"integration_name"}
                />
            </div>

            <div className="mb-4">
                <TextAreaField
                    title="Description"
                    placeholder="Enter your description"
                    id="integration_description"
                    name="description"
                    value={integrationFormData.description}
                    onChange={handleIntegrationInputChange}
                    labelClass={"block text-gray-700 text-sm font-bold mb-2"}
                />
            </div>

            <div className="mb-4">
                <TextField
                    onChange={(e) => handleIntegrationInputChange(e)}
                    value={integrationFormData.baseUrl}
                    name="baseUrl"
                    required
                    labelClass={"text-gray-700 font-bold mb-2"}
                    className="py-3 mt-2"
                    title={"Base URL"}
                    placeholder={"Enter text..."}
                    type={"url"}
                    id={"integration_base_url"}
                />
                <p className="text-sm mt-2">
                    Any URL with a querystring will be re-encoded properly.
                </p>
            </div>

            <div className="mb-4">
                <SelectField
                    onChange={(e) => handleIntegrationInputChange(e)}
                    value={integrationFormData.provider}
                    name="provider"
                    values={['stripe', 'shopify', 'custom']}
                    title={'Provider'}
                    id={"provider"}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                    labelClass={"block text-gray-700 text-sm font-bold mb-2"}
                />
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
                        <div className="mb-4 mt-4">
                            <TextField
                                onChange={(e) => handleIntegrationInputChange(e)}
                                value={integrationFormData.username}
                                name="username"
                                labelClass={"text-gray-700 font-bold mb-2"}
                                className="py-3 mt-2"
                                title={"User Name"}
                                placeholder={"Enter text..."}
                                type={"text"}
                                id={"integration_auth_username"}
                            />
                        </div>
                        <div className="mb-4 mt-4">
                            <TextField
                                onChange={(e) => handleIntegrationInputChange(e)}
                                value={integrationFormData.password}
                                name="password"
                                labelClass={"text-gray-700 font-bold mb-2"}
                                className="py-3 mt-2"
                                title={"Password"}
                                placeholder={"Enter text..."}
                                type={"password"}
                                id={"integration_auth_password"}
                            />
                        </div>
                    </>
                )}
                {integrationFormData?.authType === "api_key" && (
                    <div className="mb-4 mt-4">
                        <TextField
                            onChange={(e) => handleIntegrationInputChange(e)}
                            value={integrationFormData.apiKey}
                            name="apiKey"
                            labelClass={"text-gray-700 font-bold mb-2"}
                            className="py-3 mt-2"
                            title={"API Key"}
                            placeholder={"API Key"}
                            type={"text"}
                            id={"integration_auth_api_key"}
                        />
                    </div>
                )}
                {integrationFormData?.authType === "oauth1" && (
                    <>
                        <div className="mb-4 mt-4">
                            <TextField
                                onChange={(e) => handleIntegrationInputChange(e)}
                                value={integrationFormData.clientkey}
                                name="clientkey"
                                labelClass={"text-gray-700 font-bold mb-2"}
                                className="py-3 mt-2"
                                title={"Client Key"}
                                placeholder={"Client Key"}
                                type={"text"}
                                id={"integration_oauth_client_key"}
                            />
                        </div>
                        <div className="mb-4 mt-4">
                            <TextField
                                onChange={(e) => handleIntegrationInputChange(e)}
                                value={integrationFormData.clientsecret}
                                name="clientsecret"
                                labelClass={"text-gray-700 font-bold mb-2"}
                                className="py-3 mt-2"
                                title={"Client Secret"}
                                placeholder={"Client Secret"}
                                type={"password"}
                                id={"integration_oauth_client_secret"}
                            />
                        </div>
                    </>
                )}
                {integrationFormData?.authType === "oauth2" && (
                    <>
                        <div className="mb-4 mt-4">
                            <TextField
                                onChange={(e) => handleIntegrationInputChange(e)}
                                value={integrationFormData.clientkey2}
                                name="clientkey2"
                                labelClass={"text-gray-700 font-bold mb-2"}
                                className="py-3 mt-2"
                                title={"Client Key"}
                                placeholder={"Client Key"}
                                type={"text"}
                                id={"integration_oauth_client_key_2"}
                            />
                        </div>
                        <div className="mb-4 mt-4">
                            <TextField
                                onChange={(e) => handleIntegrationInputChange(e)}
                                value={integrationFormData.clientsecret2}
                                name="clientsecret2"
                                labelClass={"text-gray-700 font-bold mb-2"}
                                className="py-3 mt-2"
                                title={"Client Secret"}
                                placeholder={"Client Secret"}
                                type={"password"}
                                id={"integration_oauth_client_secret_2"}
                            />
                        </div>
                        <div className="mb-4 mt-4">
                            <TextField
                                onChange={(e) => handleIntegrationInputChange(e)}
                                value={integrationFormData.clientredirecturl}
                                name="clientredirecturl"
                                labelClass={"text-gray-700 font-bold mb-2"}
                                className="py-3 mt-2"
                                title={"Client Redirect URL"}
                                placeholder={"Client Redirect URL"}
                                type={"url"}
                                id={"integration_oauth_client_redirecturl"}
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