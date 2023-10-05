import { BookOpenIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import Button from '../Common/Button/Button';
import { errorMessage, successMessage } from '../Messages/Messages';
import { addIntegrationTemplate, updateIntegrationData, removeIntegrationData } from '@/app/API/pages/Integration';
import LoaderButton from '../Common/Button/Loaderbutton';
import { useDispatch } from 'react-redux';
import { fetchIntegrations } from '../store/slices/integrationSlice';
import Link from 'next/link';

const CustomIntegration = ({ setIntegrationform, help, formData, setFormData, integrationFormData, fetchData, checked }) => {
    console.log(formData)

    const [customFields, setCustomFields] = useState(formData ?? {});
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
    const [inputFocus, setInputFocus] = useState({});


    const convertToTitleCase = (str) => {
        const words = str.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        const result = capitalizedWords.join(' ');
        return result;
    }

    const updateDataParam = (value, prev, name) => {
        if (value?.length < prev[name]?.length) {
            return prev[name].substring(0, value.length)
        } else {
            return value.length > 0 ? prev[name] + value?.charAt(value.length - 1) : value;
        }
    }

    const handleInputFocus = (e, key) => {
        const { name, value } = e.target;
        if (!inputFocus[key]) {
            // Set the initial value to empty if it's the first focus
            setInputFocus((prevInputFocus) => ({
                ...prevInputFocus,
                [key]: true,
            }));

            setCustomFields((prev) => ({
                ...prev,
                [name]: '',
            }));
            setPayloadData((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    [name]: '',
                }
            }));

        }

    };

    const handleIntegrationInputChange = (e) => {
        const { name, value } = e.target;
        setCustomFields((prev) => ({
            ...prev,
            [name]: value,
        }));

        setPayloadData((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                [name]: value,
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
            setPayloadData((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    [name]: '',
                }
            }));
        }
    };

    const configureIntegrationHandler = async (e) => {
        setLoading(true);
        // console.log("payloadData", payloadData);
        // return false;
        
        try {
            let configureIntegration;
            let message;
            if (integrationFormData?.checked === true) {
                configureIntegration = await updateIntegrationData(payloadData, integrationFormData?.integration_data?.id);
                message = `Integration Updated Successfully!`;
            } else {
                configureIntegration = await addIntegrationTemplate(payloadData, integrationFormData.id);
                message = `Integration Added Successfully!`;
            }
            setLoading(false);
            if (configureIntegration?.status === 201 || configureIntegration?.status === 200) {
                dispatch(fetchIntegrations())
                setIntegrationform(false);
                successMessage(message);
            } else {
                errorMessage(configureIntegration.response.data.error);
            }
        } catch (error) {
            setLoading(false);
            errorMessage("Unable to Proceed!");
        }
    };


    const deleteEntry = async () => {
        try {
            const response = await removeIntegrationData(integrationFormData?.integration_data?.id)
            if (response.status === 204) {
                dispatch(fetchIntegrations())
                setIntegrationform(false);

                successMessage('Integration Deleted Successfully!');
            }
        } catch (error) {
            setLoading(false);
            errorMessage("Unable to Proceed!");
        }
    }

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
            <div className="flex items-center justify-between
             pb-4 pt-2 border-b border-border dark:bg-gray-800
            ">
                <div class="mb-2 sm:mb-0">
                    <p class="text-black-color text-sm font-semibold">
                        Configure {integrationFormData?.name}
                    </p>
                </div>
                <div className='flex items-center gap-4'>
                    <div>
                        {integrationFormData?.checked === true && (

                            <p
                                className="text-red cursor-pointer m-0 p-0 text-xs"
                                // disabled={DisablingButton()}
                                onClick={(e) => deleteEntry(e)}
                            >
                                Delete resource
                            </p>
                        )}
                        {loading ? (
                            <LoaderButton type={"button"}
                            className="py-2 px-4 w-[155px] justify-center sm:px-10  md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full inline-block rounded bg-primary pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] !focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]" />
                        ) : (
                            <Button
                                type={"button"}
                                className="py-2 w-auto   justify-center px-4 sm:px-10  md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full inline-block rounded bg-primary pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a]  !focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                // disabled={DisablingButton()}
                                onClick={(e) => configureIntegrationHandler(e)}
                            >
                                {integrationFormData?.checked === true ? `Connect ${integrationFormData?.name}` : `Connect ${integrationFormData?.name}`}
                            </Button>
                        )}
                        {/* <button class="py-2 px-4  w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-white bg-primary hover:bg-white dark:focus:ring-yellow-900 rounded-lg hover:text-primary" style={{ border: "1px solid #ebebeb" }}>
                        {integrationFormData?.checked === true ? 'Update' : 'Create'} resource</button> */}
                    </div>
                    <div class="cursor-pointer"
                        onClick={() => setIntegrationform(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>

            </div>

            <div className="sm:pt-8 pt-2">
                <div class="grid grid-cols-1 md:grid-cols-[80%,20%] items-start">
                    <div className="">
                        <div className="sm:mr-8">
                            {checked ?
                                <form>
                                    {Object.keys(formData).map((key) => (
                                        <div className='my-2' key={key}>
                                            <TextField
                                                onChange={(e) => handleIntegrationInputChange(e)}
                                                value={payloadData?.data[key] || ''}
                                                name={key}
                                                autoComplete={'off'}
                                                labelClass={"font-bold mb-2"}
                                                className="py-3 mt-2"
                                                title={convertToTitleCase(key)}
                                                placeholder={convertToTitleCase(key)}
                                                type={"text"}
                                                id={key}
                                                // disabled={formData[key]}
                                                handleInputFocus={(e) => handleInputFocus(e, key)}
                                                onKeyDown={handleDeleteKeyPress}
                                            // disabled
                                            />
                                        </div>
                                    ))}
                                </form>
                                :
                                <form>
                                    {Object.keys(formData).map((key) => (
                                        formData[key] ? null : (
                                            <div className='my-2' key={key}>
                                                <TextField
                                                    onChange={(e) => handleIntegrationInputChange(e)}
                                                    value={payloadData?.data[key] || ''}
                                                    name={key}
                                                    autoComplete={'off'}
                                                    labelClass={"font-bold mb-2"}
                                                    className="py-3 mt-2"
                                                    title={convertToTitleCase(key)}
                                                    placeholder={convertToTitleCase(key)}
                                                    type={"text"}
                                                    id={key}
                                                    disabled={formData[key]}
                                                    handleInputFocus={(e) => handleInputFocus(e, key)}
                                                    onKeyDown={handleDeleteKeyPress}
                                                // disabled
                                                />
                                            </div>
                                        )))}
                                </form>}

                        </div>
                    </div>
                    <div className="my-2 mt-[35px]">
                        <div className="bg-[#F9F9F9] p-5 rounded-md mt-5 sm:mt-0">
                            <p className="font-semibold text-sm mb-2">Need help?</p>
                            <Link href={`${help?.link}`} className="font-normal text-xs flex items-start gap-2 hover:text-primary">
                                <BookOpenIcon className="mt-[1px] h-4 w-4 text-gray-500" />
                                <span className="">{help?.ele} Guide</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CustomIntegration    