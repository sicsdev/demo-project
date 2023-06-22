import React from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import LoaderButton from '../Common/Button/Loaderbutton'
import Button from '../Common/Button/Button'
import SelectField from '../Common/Input/SelectField'
import { email_prefix_data } from './data'
const EmailAgentSetting = ({ basicFormData, setBasicFormData, intakeStep, setIntakeStep, setIntakeCompleteStep }) => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [email_Prefix, setEmail_Prefix] = useState('{email_Prefix}')
    const [company_name, setCompany_name] = useState('{company_name}')
    const [formValues, setFormValues] = useState({
        email_prefix: basicFormData?.email_prefix ?? '',
        custom_email: basicFormData?.custom_email ?? '',
        enable_email_forwarding: basicFormData?.enable_email_forwarding ?? '',
    })
    const handleInputValues = (e) => {
        const { value } = e.target
        setErrors([])
        setFormValues({ ...formValues, [e.target.name]: value })
        switch (e.target.name) {
            case 'custom_email':
                value !== '' ? setCompany_name(value) : setCompany_name('{company_name}')
                break;
            case 'email_prefix':
                setEmail_Prefix(value)
                break;

            default:
                break;
        }

    }
    const validateForm = (formNumber) => {
        const formFields = {
            1: {
                email_prefix: 'Email Prefix',
                custom_email: 'Domain Name',
            },
        };

        const requiredFields = formFields[formNumber];

        const errors = Object.entries(requiredFields)
            .filter(([field, label]) => formValues[field] === '')
            .map(([field, label]) => { return { field, message: `${label} is required` } });

        setErrors(errors);
        return errors.length === 0;
    };
    const handleBack = () => {
        setIntakeStep(intakeStep - 1)
    }

    const returnErrorMessage = (key) => {
        if (errors.length) {
            const findErr = errors.find((x) => x.field === key)
            if (findErr) {
                return findErr.message
            }
        }
        return null
    }

    const handleCheckbox = (value) => {
        setErrors([])
        setFormValues({ ...formValues, enable_email_forwarding: value });
        console.log(value)
    }

    return (
        <div className='container'>
            <div className='grid grid-cols-1'>
                <div className='my-2'>
                    <SelectField onChange={handleInputValues} value={formValues.email_prefix} error={returnErrorMessage("email_prefix")} name='email_prefix' values={email_prefix_data} title={"Email Prefix"} id={'email_prefix'} className="py-3" />
                </div>
                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.custom_email} name='custom_email' className='py-3 mt-1' title={
                        <div>Custom Email Address <span className='text-border'>{email_Prefix}@{company_name}.gettempo.ai</span></div>} placeholder={"Custom Email Address"} type={'text'} id={"custom_email"} error={returnErrorMessage("custom_email")} />
                </div>
                {formValues.email_prefix && formValues.custom_email && (
                    <div className='my-2'>
                        <label htmlFor={'check_email_forwarding'} className="block text-sm font-medium text-heading">Enable Mail Forwarding (i)</label>
                        <div className='flex gap-2 mt-1'>
                            <div className="flex items-center w-full pl-4 border border-border rounded cursor-pointer" onClick={(e) => handleCheckbox("Yes")}>
                                <input id="enable_email_forwarding" type="checkbox" value="Yes" name="enable_email_forwarding" className="w-4 h-4 text-sky bg-white border-border rounded focus:ring-sky  cursor-pointer focus:ring-2 " checked={formValues.enable_email_forwarding === 'Yes'} />
                                <label for="enable_email_forwarding" className=" cursor-pointer w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                            </div>
                            <div className="flex items-center pl-4 border w-full border-border rounded cursor-pointer" onClick={(e) => handleCheckbox("No")} >
                                <input id="enable_email_forwarding1" type="checkbox" value="No" name="enable_email_forwarding" className="w-4 h-4 text-sky bg-white border-border rounded focus:ring-sky  focus:ring-2 " checked={formValues.enable_email_forwarding === 'No'} />
                                <label for="enable_email_forwarding1" className=" cursor-pointer w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                            </div>
                        </div>
                        {formValues.enable_email_forwarding === 'Yes'
                            && (
                                <p className='text-sm my-2'>Please enable mail forwarding to {email_Prefix}@{company_name}.gettempo.ai from your domain. Click here for instructions. </p>
                            )}
                    </div>
                )}
            </div>
            <div className={`flex p-2 rounded-b mt-5 justify-between`}>

                <button
                    onClick={handleBack}
                    className="inline-block float-left rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                // disabled={loading ? true : false}
                >
                    Back
                </button>
                {loading ? <LoaderButton /> :
                    <Button type={"button"} className="align-center inline-block font-bold rounded bg-primary   px-8 pb-2 pt-3 text-xs uppercase text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]" onClick={() => {
                        setIntakeStep(intakeStep + 1)
                        setIntakeCompleteStep(5)
                        setBasicFormData({ ...basicFormData, formValues })
                    }}
                        disabled={formValues.custom_email === '' || formValues.email_prefix === ''}
                    >

                        Next
                    </Button>}
            </div>

        </div>
    )
}

export default EmailAgentSetting