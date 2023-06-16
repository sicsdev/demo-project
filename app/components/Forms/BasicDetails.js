import TextField from "../Common/Input/TextField";
import SelectField from "../Common/Input/SelectField";
import { business_company_size_data, business_industry_data, ecommerce_platform_data } from "./data/FormData";
import { createEnterpriseAccount } from "@/app/API/pages/EnterpriseService";
import { useState } from "react";

export default function BasicDetails({ basicFormData, setBasicFormData, setIntakeStep, form = true, setIsEdit }) {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [basicDetailsSteps, setBasicDetailSteps] = useState(1)
    const [formValues, setFormValues] = useState({
        business_address: basicFormData?.business_address ?? '',
        business_industry: basicFormData?.business_industry ?? '',
        business_name: basicFormData?.business_name ?? '',
        ecommerce_platform: basicFormData?.ecommerce_platform ?? '',
        business_company_size: basicFormData?.business_company_size ?? '',
    })

    const handleInputValues = (e) => {
        setErrors([])
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const validateForm = (formNumber) => {
        const formFields = {
            1: {
                business_name: 'Business Name',
                business_address: 'Business Address',
            },
            2: {
                business_company_size: 'Business Company Size',
                business_industry: 'Business Industry',
                // ecommerce_platform: 'Ecommerce Platform',
            },
        };

        const requiredFields = formFields[formNumber];

        const errors = Object.entries(requiredFields)
            .filter(([field, label]) => formValues[field] === '')
            .map(([field, label]) => `${label} is required`);

        setErrors(errors);
        return errors.length === 0;
    };

    const handleForward = () => {
        switch (basicDetailsSteps) {
            case 1:
                if (validateForm(1)) { setBasicDetailSteps(2) }
                break;
            case 2:
                if (validateForm(2)) { onSubmit() }
                break;
            default:
                break;
        }
    }

    const handleBack = () => {
        setErrors([])
        setBasicDetailSteps(basicDetailsSteps - 1)
    }

    const onSubmit = async (data) => {
        let payload = {
            "name": formValues.business_name,
            "country": "US",
            "address": formValues.business_address,
            "industry": formValues.business_industry,
            "company_size": formValues.business_company_size,
            "ecommerce_platform": formValues.ecommerce_platform
        }

        const createEnterprise = await createEnterpriseAccount(payload)

        if (form === true) {
            if (createEnterprise?.status === 201) {
                setBasicFormData(formValues)
                setIntakeStep(1)
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


    return (<>
        <div className='p-3 mx-2 mx-3'>
            <span className="text-sm text-[#808080]">
                Please provide us with some important information about your business.
            </span>
        </div>
        <div className='p-4 mt-2'>

            {/* Step 1 */}
            <div className='mx-5'>
                {basicDetailsSteps === 1 &&
                    <>

                        <TextField onChange={handleInputValues} value={formValues.business_name} name='business_name' className='py-3 mt-1' title={'Business Name'} placeholder={""} type={'text'} id={"business_name"} />
                        <br />
                        <TextField onChange={handleInputValues} value={formValues.business_address} name='business_address' className='py-3 mt-1' title={'Business Address'} placeholder={""} type={'text'} id={"business_address"} />
                    </>
                }



                {/* Step 2 */}
                {basicDetailsSteps === 2 &&
                    <>
                        <SelectField onChange={handleInputValues} value={formValues.business_company_size} name='business_company_size' values={business_company_size_data} title={"Business Company Size"} id={'business_company_size'} className="py-3" />
                        <SelectField onChange={handleInputValues} value={formValues.business_industry} name='business_industry' values={business_industry_data} title={"Business Industry"} id={'business_industry'} className="py-3" />
                        {/* <SelectField onChange={handleInputValues} value={formValues.ecommerce_platform} name='ecommerce_platform' values={ecommerce_platform_data} title={"Ecommerce Platform"} id={'ecommerce_platform'} className="py-3" labelClassName={'col-span-2'} /> */}
                    </>
                }

                {errors && errors.map((error, index) => <p key={index} className='text-red text-start mt-2'>{error}</p>)}

            </div>


            <div className={`flex p-2 rounded-b mt-5 ${basicDetailsSteps > 1 ? 'justify-between' : 'justify-end'}`}>

                {basicDetailsSteps > 1 && (
                    <button
                        onClick={handleBack}
                        className="inline-block float-left rounded bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                        disabled={loading ? true : false}
                    >
                        Back
                    </button>
                )}

                <button
                    onClick={handleForward}
                    className="inline-block float-right rounded bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                    disabled={loading ? true : false}
                >
                    {loading ? 'Loading...' : form === true ? 'Next' : 'Submit'}
                </button>
            </div>



        </div>
    </>);
}