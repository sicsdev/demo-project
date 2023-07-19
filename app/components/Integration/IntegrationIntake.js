import React, { useState, useEffect } from 'react'
import TextField from '../Common/Input/TextField'
import { makeCapital } from '../helper/capitalName';
import SelectOption from '../Common/Input/SelectOption';
import SampleTableData from "@/app/data/automation._data.json";


const IntegrationIntake = ({ basicFormData, setBasicFormData }) => {
    const [errors, setErrors] = useState([]);
    const [formValues, setFormValues] = useState({
        billing_platform: basicFormData?.billing_platform || "",
        billing_api_documentation: basicFormData?.billing_api_documentation || "",
        billingEnabled: {},
    });

    const handleCheckboxChange = (event, name) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            billingEnabled: {
                ...prevFormValues.billingEnabled,
                [name]: event.target.checked,
            },
        }));
    };
    
    const handleInputValues = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: makeCapital(e.target.value),
        });
        setBasicFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: makeCapital(e.target.value),
            };
        });
    };

    const returnErrorMessage = (key) => {
        if (errors.length) {
            const findErr = errors.find((x) => x.field === key);
            if (findErr) {
                return findErr.message;
            }
        }
        return null;
    };

    const billingOptions = [
        { name: 'Stripe', value: 'Stripe' },
        { name: 'Shopify', value: 'Shopify' },
        { name: 'Braintree', value: 'Braintree' },
        { name: 'PayPal', value: 'PayPal' },
        { name: 'Amazon', value: 'Amazon' },
        { name: 'Other', value: 'Other' }
    ]

    return (
        <div>
            <span className="text-sm my-5 text-[#808080]">
                Please provide us with some important information about your business.
            </span>
            <div className="mt-3">
                <div className="mb-4">
                    <SelectOption
                        onChange={handleInputValues}
                        value={formValues?.billing_platform}
                        name="billing_platform"
                        values={billingOptions}
                        title={"Billing Platform"}
                        id={"billing_platform"}
                        className="py-3"
                        error={returnErrorMessage("billing_platform")}
                    />
                </div>
                {formValues?.billing_platform === 'Other' &&
                    <div className="">
                        <TextField
                            onChange={handleInputValues}
                            value={formValues.billing_api_documentation}
                            name="billing_api_documentation"
                            className="py-3 mt-1"
                            title={"Billing API Documentation"}
                            placeholder={"Enter Billing API Documentation"}
                            type={"url"}
                            id={"billing_api_documentation"}
                            error={returnErrorMessage("billing_api_documentation")}
                        />
                    </div>
                }
                <div className="mt-5">
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead>
                                <tr className='border-b border-border dark:bg-gray-800 dark:border-gray-700'>
                                    <th className="px-6 py-4 pb-6 font-bold text-gray-900 whitespace-nowrap dark:text-white">Actions</th>
                                    <th className="px-6 py-4 pb-6 font-bold text-gray-900 whitespace-nowrap dark:text-white">Enabled</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SampleTableData.map((item, index) => (
                                    <tr key={index} className='border-b border-border dark:bg-gray-800 dark:border-gray-700'>
                                        <td className="px-6 py-4 pb-6 font-bold text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                                        <td className="px-6 py-4 pb-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {/* <input type="checkbox" /> */}
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    name='billingEnabled'
                                                    checked={formValues.billingEnabled[item.name]}
                                                    onChange={(event) => handleCheckboxChange(event, item.name)}
                                                // value={automationFormData?.needs_otp}
                                                // checked={automationFormData?.needs_otp === true ? true : false}
                                                // onChange={(e) => { setAutomationFormData((prev) => ({ ...prev, needs_otp: e.target.checked })) }}
                                                />
                                                <span className="slider round h-[27px] w-[55px]"></span>
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div >
            </div>
        </div>
    )
}

export default IntegrationIntake