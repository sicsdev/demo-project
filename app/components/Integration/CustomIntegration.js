import { BookOpenIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import Button from '../Common/Button/Button';
import { errorMessage, successMessage } from '../Messages/Messages';
import { addIntegrationTemplate, updateIntegrationData, addIntegrationData } from '@/app/API/pages/Integration';
import LoaderButton from '../Common/Button/Loaderbutton';
import { useDispatch } from 'react-redux';
import { fetchIntegrations } from '../store/slices/integrationSlice';

const CustomIntegration = ({ setIntegrationform, formData, setFormData, integrationFormData, fetchData }) => {
    const [customFields, setCustomFields] = useState(formData);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const [payloadData, setPayloadData] = useState({
        name: integrationFormData?.name,
        type: integrationFormData?.type,
        id: integrationFormData?.integration_data?.id || null,
        http_base: integrationFormData?.http_base,
        http_auth_scheme: integrationFormData?.http_auth_scheme,
        data: integrationFormData?.data,
        provider: integrationFormData?.name,
        checked: integrationFormData?.checked || false
    });

    useEffect(() => {
        const maskedFormData = Object.keys(formData).reduce((acc, key) => {
            acc[key] = maskLastFour(formData[key]);
            return acc;
        }, {});
        setCustomFields(maskedFormData);
    }, [formData]);

    const convertToTitleCase = (str) => {
        const words = str.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        const result = capitalizedWords.join(' ');
        return result;
    }

    const updateDataParam = (value, prev, name) => {
        console.log("value", value.length)
        if (value?.length < prev[name]?.length) {
            return prev[name].substring(0, value.length)
        } else {
            return value.length > 0 ? prev[name] + value?.charAt(value.length - 1) : value;
        }
    }
    const handleInputFocus = (e) => {
        const { name, value } = e.target;

        setCustomFields((prev) => ({
            ...prev,
            [name]: '',
        }));
    };
    const handleIntegrationInputChange = (e) => {
        const { name, value } = e.target;
        setCustomFields((prev) => ({
            ...prev,
            [name]: maskLastFour(value),
        }));

        setPayloadData((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                [name]: updateDataParam(value, prev?.data, name),
            }
        }));

    };

    const handleDeleteKeyPress = (event) => {
        const { name, value } = event?.target;
        if (event.key === 'Delete' || event?.key === 'Backspace') {
            setCustomFields((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };
    // console.log("payloadData", payloadData)
    const configureIntegrationHandler = async (e) => {
        setLoading(true);
        try {
            let configureIntegration;
            let message;
            if (integrationFormData?.checked === true) {
                configureIntegration = await updateIntegrationData(payloadData, integrationFormData?.integration_data?.id);
                message = `Integration Update Successfully!`;
            } else {
                configureIntegration = await addIntegrationData(payloadData);
                message = `Integration Added Successfully!`;
            }

            setLoading(false);
            if (configureIntegration?.status === 201 || configureIntegration?.status === 200) {
                // fetchData();
                dispatch(fetchIntegrations())
                setIntegrationform(false);

                successMessage('Integration Template Updated Successfully!');
            } else {
                errorMessage("Unable to Proceed!");
            }
        } catch (error) {
            setLoading(false);
            errorMessage("Unable to Proceed!");
        }
    };

    const maskLastFour = (input) => {
        if (!input || input.length === 0) {
            return '';
        } else {
            const visiblePart = input.slice(0, 4);
            const hiddenPart = '*'.repeat(Math.max(0, input.length - 4));
            return visiblePart + hiddenPart;
        }
    };


    const DisablingButton = () => {
        if (Object.keys(customFields).length === 0) {
            return true;
        }
        return Object.values(customFields).some(field => field.trim() === '');
    };


    return (
        <>
            <div className="block sm:flex items-center justify-between">
                <div class="flex items-center gap-2 mt-8">
                    <span
                        className="text-[#b3b3b3] cursor-pointer"
                        onClick={() => setIntegrationform(false)}
                    >
                        <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M6.99951 9L3.99994 6L6.99951 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                    <p class="text-black-color text-xl font-semibold">
                        Configure {integrationFormData?.name}
                    </p>
                </div>
                <div class="text-center my-3 flex justify-between items-center gap-3 sm:w-[27%]">
                    <button class="py-2 px-8  w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary bg-white hover:bg-primary dark:focus:ring-yellow-900 rounded-lg hover:text-[white]" style={{ border: "1px solid #ebebeb" }}>
                        Test connection</button>
                    <button class="py-2 px-8  w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-white bg-primary hover:bg-white dark:focus:ring-yellow-900 rounded-lg hover:text-primary" style={{ border: "1px solid #ebebeb" }}>
                        Create resource</button>
                </div>
            </div>

            <div className="pt-8">
                <div class="grid grid-cols-1 md:grid-cols-5">
                    <div class="col-span-1 md:col-span-4 bg-red-300">
                        <div className="sm:mr-8">
                            <form>
                                {Object.keys(formData).map((key) => (
                                    <div className='my-2' key={key}>
                                        <TextField
                                            onChange={(e) => handleIntegrationInputChange(e)}
                                            value={customFields[key] || ''}
                                            name={key}
                                            labelClass={"text-gray-700 font-bold mb-2"}
                                            className="py-3 mt-2"
                                            title={convertToTitleCase(key)}
                                            placeholder={convertToTitleCase(key)}
                                            type={"text"}
                                            id={key}
                                            handleInputFocus={handleInputFocus}
                                            onKeyDown={handleDeleteKeyPress}
                                        // disabled
                                        />
                                    </div>
                                ))}
                                {loading ? (
                                    <LoaderButton />
                                ) : (
                                    <Button
                                        type={"button"}
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                                        disabled={DisablingButton()}
                                        onClick={(e) => configureIntegrationHandler(e)}
                                    >

                                        {integrationFormData?.checked === true ? 'Update' : 'Save'}
                                    </Button>
                                )}
                            </form>
                        </div>
                    </div>
                    <div class="col-span-4 md:col-span-1 bg-blue-300">
                        <div className="bg-[#F9F9F9] p-5 rounded-md mt-5 sm:mt-0">
                            <p className="font-semibold text-sm mb-2">Need help?</p>
                            <a href="#" className="font-normal text-sm flex items-center gap-2 hover:text-primary">
                                <BookOpenIcon className="h-4 w-4 text-gray-500" />
                                <span className="">Rest API guide</span>
                            </a>
                            <a href="#" className="font-normal text-sm flex items-center gap-2 hover:text-primary">
                                <BookOpenIcon className="h-4 w-4 text-gray-500" />
                                <span>Troubleshoot connections</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CustomIntegration