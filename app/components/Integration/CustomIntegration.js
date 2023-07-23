import { BookOpenIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import Button from '../Common/Button/Button'

const CustomIntegration = ({ name, setIntegrationform, formData, data, setFormData, mode = 'add' }) => {
    const [customFields, setCustomFields] = useState(formData)
    const convertToTitleCase = (str) => {
        const words = str.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        const result = capitalizedWords.join(' ');
        return result;
    }
    console.log(formData)
    const handleIntegrationInputChange = (e) => {
        const { name, value } = e.target;
        setCustomFields((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const maskLastFour = (input) => {
        const visiblePart = input.slice(-4);
        const hiddenPart = input.slice(0, -4).replace(/./g, '*');
        return hiddenPart + visiblePart;
    };

    const DisablingButton = () => {
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
                        <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M6.99951 9L3.99994 6L6.99951 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                    <p class="text-black-color text-xl font-semibold">
                        Configure {name}
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
                                            // value={maskLastFour(customFields[key])}
                                            value={maskLastFour("cfe3e1d6-29b1-11ee-be56-0242ac120002")}
                                            name={key}
                                            labelClass={"text-gray-700 font-bold mb-2"}
                                            className="py-3 mt-2"
                                            title={convertToTitleCase(key)}
                                            placeholder={convertToTitleCase(key)}
                                            type={"text"}
                                            id={key}
                                            // disabled
                                        />
                                    </div>
                                ))}
                                <Button
                                    type={"button"}
                                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                                    disabled={DisablingButton()}
                                >

                                    Submit
                                </Button>
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