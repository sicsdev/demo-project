import React from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import SelectField from '../Common/Input/SelectField'
import { email_prefix_data } from './data'
const EmailAgentSetting = ({ basicFormData, setBasicFormData, }) => {
    const [errors, setErrors] = useState([])
    const [email_Prefix, setEmail_Prefix] = useState(basicFormData?.email_prefix ?? '{email_Prefix}')
    const [company_name, setCompany_name] = useState(basicFormData?.company_name ?? '{company_name}')
    const [formValues, setFormValues] = useState({
        email_prefix: basicFormData?.email_prefix ?? '',
        custom_email: basicFormData?.custom_email ?? '',
        enable_email_forwarding: basicFormData?.enable_email_forwarding ?? '',
        company_name: basicFormData?.company_name ?? '',
    })
    console.log('basicFormData', basicFormData)
    const handleInputValues = (e) => {
        const { value } = e.target
        setErrors([])
        setFormValues({ ...formValues, [e.target.name]: value })
        setBasicFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: value
            }
        })
        switch (e.target.name) {
            case 'company_name':
                value !== '' ? setCompany_name(value) : setCompany_name('{company_name}')
                setBasicFormData((prev) => {
                    return {
                        ...prev,
                        [e.target.name]: value !== '' ? value : '{company_name}'
                    }
                })
                break;
            case 'email_prefix':
                setEmail_Prefix(value)
                setBasicFormData((prev) => {
                    return {
                        ...prev,
                        [e.target.name]: value
                    }
                })
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
        setBasicFormData((prev) => {
            return {
                ...prev,
                enable_email_forwarding: value
            }
        })

    }

    return (
        <div className=''>
            <div className=''>
                <div className='my-2'>
                    <SelectField onChange={handleInputValues} value={formValues.email_prefix} error={returnErrorMessage("email_prefix")} name='email_prefix' values={email_prefix_data} title={"Email Prefix"} id={'email_prefix'} className="py-3 w-full" />
                </div>

                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.company_name} name='company_name' className='py-3 w-full mt-1' title={<h1>Company Name <span className='text-xs'>(Note, you can only configure your email once. It cannot be easily changed later.)</span></h1>} placeholder={"Company Name"} type={'text'} id={"company_name"} error={returnErrorMessage("company_name")} />
                </div>
                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.custom_email} name='custom_email' className='py-3 w-full mt-1' title={
                        <div>Custom Email Address <span className='text-border'>{email_Prefix}@{company_name}.gettempo.ai</span></div>} placeholder={"Custom Email Address"} type={'text'} id={"custom_email"} error={returnErrorMessage("custom_email")} />
                </div>

                {formValues.email_prefix && formValues.custom_email && (
                    <div className='my-2'>
                        <label htmlFor={'check_email_forwarding'} className="block text-sm font-medium text-heading">Enable Mail Forwarding</label>
                        <div className='flex gap-2 mt-1'>
                            <div className="flex items-center w-full pl-4 border border-border rounded-md cursor-pointer" onClick={(e) => handleCheckbox("Yes")}>
                                <input id="enable_email_forwarding" type="radio" value="Yes" name="enable_email_forwarding" className="w-4 h-4 text-sky bg-white border-border" checked={formValues.enable_email_forwarding === 'Yes'} />
                                <label htmlFor="enable_email_forwarding" className=" cursor-pointer w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                            </div>
                            <div className="flex items-center pl-4 border w-full border-border rounded-md cursor-pointer" onClick={(e) => handleCheckbox("No")} >
                                <input id="enable_email_forwarding1" type="radio" value="No" name="enable_email_forwarding" className="w-4 h-4 text-sky bg-white border-border  " checked={formValues.enable_email_forwarding === 'No'} />
                                <label htmlFor="enable_email_forwarding1" className=" cursor-pointer w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                            </div>
                        </div>
                        {formValues.enable_email_forwarding === 'Yes'
                            && (
                                <p className='text-sm my-2'>Please enable mail forwarding to {email_Prefix}@{company_name}.gettempo.ai from your domain. <a className='cursor-pointer' href='https://www.usetempo.ai/help/help-details?articleName=enable-mail-forwarding' target='_blank'>Click here</a> htmlFor instructions. </p>
                            )}
                    </div>
                )}
            </div>

        </div>
    )
}

export default EmailAgentSetting