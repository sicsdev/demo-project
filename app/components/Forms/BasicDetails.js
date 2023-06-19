import TextField from "../Common/Input/TextField";
import SelectField from "../Common/Input/SelectField";
import { business_company_size_data, business_industry_data, ecommerce_platform_data, state_data } from "./data/FormData";
import { createEnterpriseAccount } from "@/app/API/pages/EnterpriseService";
import { useState } from "react";

export default function BasicDetails({ basicFormData, setBasicFormData, setIntakeStep, form = true, setIsEdit, setIntakeCompleteStep, intakeCompleteStep }) {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [basicDetailsSteps, setBasicDetailSteps] = useState(1)
    const [formValues, setFormValues] = useState({
        business_street: basicFormData?.business_street ?? '',
        business_city: basicFormData?.business_city ?? '',
        business_state: basicFormData?.business_state ?? '',
        business_zipcode: basicFormData?.business_zipcode ?? '',
        business_industry: basicFormData?.business_industry ?? '',
        business_name: basicFormData?.business_name ?? '',
        ecommerce_platform: basicFormData?.ecommerce_platform ?? '',
        business_company_size: basicFormData?.business_company_size ?? '',
        business_unit_no: basicFormData?.business_unit_no ?? '',
    })

    const handleInputValues = (e) => {
        setErrors([])
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const validateForm = (formNumber) => {
        const formFields = {
            1: {
                business_name: 'Business Name',
                business_street: 'Street',
                business_city: 'City',
                business_zipcode: 'Zipcode',
                business_state: 'State',
                business_company_size: 'Business Company Size',
                business_industry: 'Business Industry',
            },
        };

        const requiredFields = formFields[formNumber];

        const errors = Object.entries(requiredFields)
            .filter(([field, label]) => formValues[field] === '')
            .map(([field, label]) => { return { field, message: `${label} is required` } });

        setErrors(errors);
        return errors.length === 0;
    };

    const provideStateNames = () => {
        return state_data.map((state) => state.name)
    }
    const handleForward = () => {
        switch (basicDetailsSteps) {
            case 1:
                if (validateForm(1)) { onSubmit() }
                break;
            default:
                break;
        }
    }

    const handleBack = () => {
        setErrors([])
        setBasicDetailSteps(basicDetailsSteps - 1)
    }
    const getAbbrevationOfState = (abber) => {
        const findAbber = state_data.find((state) => state.name === abber)
        if (findAbber) {
            return findAbber.abbreviation
        }
        return ""
    }
    const onSubmit = async (data) => {
        setLoading(true)
        let payload = {
            "name": formValues.business_name,
            "country": "US",
            "address": formValues.business_street + ", " + formValues.business_city + ", " + getAbbrevationOfState(formValues.business_state) + ", USA",
            "industry": formValues.business_industry,
            "company_size": formValues.business_company_size,
            "ecommerce_platform": formValues.ecommerce_platform
        }
        const createEnterprise = await createEnterpriseAccount(payload)

        if (form === true) {
            if (createEnterprise?.status === 201) {
                setBasicFormData(formValues)
                setIntakeStep(1)
                setIntakeCompleteStep(1)
                setErrors([])
                setLoading(false)
            } else {
                setErrors([createEnterprise.message])
                setLoading(false)
            }

        } else {
            if (createEnterprise?.status === 201) {
                setBasicFormData(formValues)
                setIsEdit(true)
                setLoading(false)
            }
        }
    };

    const returnErrorMessage = (key) => {
        if (errors.length) {
            const findErr = errors.find((x) => x.field === key)
            if (findErr) {
                return findErr.message
            }
        }
        return null
    }
    return (
        <div >
            <span className="text-sm my-5 text-[#808080]">
                Please provide us with some important information about your business.
            </span>

            {/* Step 1 */}
            <div className=''>
                {basicDetailsSteps === 1 &&
                    <>

                        <TextField onChange={handleInputValues} value={formValues.business_name} name='business_name' className='py-3 mt-1' title={'Business Name'} placeholder={"Business Name"} type={'text'} id={"business_name"} error={returnErrorMessage("business_name")} />
                        <br />
                        <h3 className="text-heading mb-4 font-semibold">Business Address</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <TextField onChange={handleInputValues} value={formValues.business_street} name='business_street' className='py-3 mt-1' title={'Street'} placeholder={"Please enter street"} type={'text'} id={"business_street"} error={returnErrorMessage("business_street")} />
                            <TextField onChange={handleInputValues} value={formValues.business_city} name='business_city' className='py-3 mt-1' title={'City'} placeholder={"Please enter city"} type={'text'} id={"business_city"} error={returnErrorMessage("business_city")} />
                            <SelectField onChange={handleInputValues} value={formValues.business_state} name='business_state' values={provideStateNames()} title={"State"} id={'business_state'} className="py-3" error={returnErrorMessage("business_state")} />
                            <div className="">
                                <TextField onChange={handleInputValues} value={formValues.business_zipcode} name='business_zipcode' className='py-3 mt-1' title={'Zipcode'} placeholder={"Zipcode"} type={'text'} id={"business_zipcode"} error={returnErrorMessage("business_zipcode")} />
                            </div>
                            <div className="md:col-span-2">
                                <TextField onChange={handleInputValues} value={formValues.business_unit_no} name='business_unit_no' className='py-3 mt-1' title={'Unit No.'} placeholder={"Unit No. (optional)"} type={'text'} id={"business_unit_no"} error={returnErrorMessage("business_unit_no")} />
                            </div>
                            <SelectField onChange={handleInputValues} value={formValues.business_company_size} name='business_company_size' values={business_company_size_data} title={"Business Company Size"} id={'business_company_size'} className="py-3" error={returnErrorMessage("business_company_size")} />
                            <SelectField onChange={handleInputValues} value={formValues.business_industry} name='business_industry' values={business_industry_data} title={"Business Industry"} id={'business_industry'} className="py-3" error={returnErrorMessage("business_industry")} />
                        </div>
                    </>
                }




            </div>


            <div className={`flex p-2 rounded-b mt-5 ${basicDetailsSteps > 1 ? 'justify-between' : 'justify-end'}`}>

                {basicDetailsSteps > 1 && (
                    <button
                        onClick={handleBack}
                        className="inline-block float-left rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                        disabled={loading ? true : false}
                    >
                        Back
                    </button>
                )}

                <button
                    onClick={handleForward}
                    className="inline-block float-right rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                    disabled={loading ? true : false}
                >
                    {loading ? 'Loading...' : form === true ? 'Next' : 'Submit'}
                </button>
            </div>



        </div>
    );
}