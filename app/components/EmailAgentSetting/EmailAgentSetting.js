import React from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import SelectField from '../Common/Input/SelectField'
import { email_prefix_data } from './data'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import Card from '../Common/Card/Card'
import FileField from '../Common/Input/FileField'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const EmailAgentSetting = ({ basicFormData, setBasicFormData, }) => {
    const [errors, setErrors] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [email_Prefix, setEmail_Prefix] = useState(basicFormData?.email_prefix ?? '{email_Prefix}')
    const [company_name, setCompany_name] = useState(basicFormData?.company_name ?? '{company_name}')
    const [formValues, setFormValues] = useState({
        email_prefix: basicFormData?.email_prefix ?? '',
        custom_email: basicFormData?.custom_email ?? '',
        enable_email_forwarding: basicFormData?.enable_email_forwarding ?? '',
        company_name: basicFormData?.company_name ?? '',
        phone_number: basicFormData?.phone_number ?? '',
        area_code: basicFormData?.area_code ?? ''
    })

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

    const returnErrorMessage = (key) => {
        // if (errors.length) {
        //     const findErr = errors.find((x) => x.field === key)
        //     if (findErr) {
        //         return findErr.message
        //     }
        // }
        return null
    }

    const handlePhoneChange = (value) => {
        setFormValues({ ...formValues, ['phone_number']: value })
        setBasicFormData((prev) => {
            return {
                ...prev,
                ['phone_number']: value
            }
        })
    };

    return (
        <div className=''>
            <div className=''>
                <div className='my-2'>
                    <SelectField onChange={handleInputValues} value={formValues.email_prefix} error={returnErrorMessage("email_prefix")} name='email_prefix' values={email_prefix_data} title={<div className='flex items-center gap-2'><span>Email Prefix</span>  <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>The first word of your Tempo email. For example Team@name.gettempo.ai</span></Card></div></div>} id={'email_prefix'} className="py-3 w-full" />
                </div>

                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.company_name} name='company_name' className='py-3 w-full mt-1' title={<div className='flex items-center gap-2'><span>Company Name</span>  <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>(Note, you can only configure your email once. It cannot be easily changed later.)</span></Card></div></div>} placeholder={"Company Name"} type={'text'} id={"company_name"} error={returnErrorMessage("company_name")} />
                </div>

                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.custom_email} name='custom_email' className='py-3 w-full mt-1' title={
                        <div className='flex items-center gap-2'><span>Custom Email Address</span>  <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>Your custom email which you want to forward mail from. For example, team@company_name.com.</span></Card></div></div>} placeholder={"Custom Email Address"} type={'text'} id={"custom_email"} error={returnErrorMessage("custom_email")} />
                </div>

                {formValues.email_prefix && formValues.custom_email && (
                    <p className='text-sm my-2 text-primary'>Please enable mail forwarding to {email_Prefix}@{company_name}.gettempo.ai from your domain. <a className='font-semibold cursor-pointer' href='https://www.usetempo.ai/help/help-details?articleName=enable-mail-forwarding' target='_blank'>Click here</a> for instructions. </p>

                )}
                <div className='my-2'>
                    <FileField title={<div className='flex items-center gap-2'><span>Upload Ticket History (Optional)</span>  <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>Upload your historic email or chat tickets for the bot to learn more quickly from your historic examples.
                    </span></Card></div></div>} type={'file'} placeholder="Upload" id="docs" onChange={(event) => {
                        const file = event.target.files[0];
                        const allowedExtensions = ['json', 'xls', 'xlsx', 'csv', 'mbox', 'pst'];
                        if (file) {
                            const fileExtension = file.name.split('.').pop().toLowerCase();
                            if (allowedExtensions.indexOf(fileExtension) === -1) {
                                setErrors('Error: please upload a valid file type (json, xls, xlsx, csv, mbox, pst)');
                                return;
                            }
                            setErrors(null);
                            setSelectedFile(file);
                        }

                    }} error={errors} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                        <TextField
                            onChange={handleInputValues}
                            value={formValues.area_code}
                            name="area_code"
                            className="py-3 mt-1"
                            title={"Area Code"}
                            placeholder={"Please enter area code"}
                            type={"number"}
                            id={"area_code"}
                            error={returnErrorMessage("area_code")}
                        />
                    </div>
                    <div>

                        <label for="area_code" class="block text-sm text-heading font-medium">Phone Number</label>
                        <PhoneInput
                            placeholder="Enter phone number"
                            defaultCountry="US"
                            onChange={handlePhoneChange}
                            value={formValues.phone_number}
                            className='phone_input_intake block border-[0.2px] py-3 mt-1 px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full'
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default EmailAgentSetting