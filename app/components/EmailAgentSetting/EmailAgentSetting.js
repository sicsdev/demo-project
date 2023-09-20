import React from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import SelectField from '../Common/Input/SelectField'
import { email_prefix_data } from './data'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import Card from '../Common/Card/Card'
import FileField from '../Common/Input/FileField'
import { getAvailableMobileNumbers } from '@/app/API/components/PhoneNumber'
import Button from '../Common/Button/Button'
import { ChevronLeftIcon, PhoneIcon } from '@heroicons/react/24/outline'

const EmailAgentSetting = ({ basicFormData, setBasicFormData, form = true }) => {
    const [errors, setErrors] = useState(null)
    const [email_Prefix, setEmail_Prefix] = useState(basicFormData?.email_prefix ?? '{email_Prefix}')
    const [company_name, setCompany_name] = useState(basicFormData?.company_name ?? '{company_name}')
    const [formValues, setFormValues] = useState({
        email_prefix: basicFormData?.email_prefix ?? '',
        custom_email: basicFormData?.custom_email ?? '',
        enable_email_forwarding: basicFormData?.enable_email_forwarding ?? '',
        company_name: basicFormData?.company_name ?? '',
        friendly_name: basicFormData?.friendly_name ?? '',
        phone_numbers: basicFormData?.phone_numbers ?? null,
        selectedFile: basicFormData?.selectedFile ?? '',
    })

    const handleInputValues = (e) => {
        const { value } = e.target
        if (value !== " ") {
            // setErrors([])
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

 

 
    return (
        <div className=''>
            <div className=''>
                <div className='my-2'>
                    <SelectField onChange={handleInputValues} value={formValues.email_prefix} error={returnErrorMessage("email_prefix")} name='email_prefix' values={email_prefix_data} title={<div className='flex items-center gap-2'><span>Email Prefix</span>  <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>The first word of your Tempo email. For example Team@name.gettempo.ai</span></Card></div></div>} id={'email_prefix'} className="py-3 w-full" />
                </div>

                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.company_name} name='company_name' className='py-3 w-full mt-1' title={<div className='flex items-center gap-2'><span>Company Name</span>  <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>(Note, you can only configure your email once. It cannot be easily changed later.)</span></Card></div></div>} placeholder={"Company name"} type={'text'} id={"company_name"} error={returnErrorMessage("company_name")} />
                </div>

                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.custom_email} name='custom_email' className='py-3 w-full mt-1' title={
                        <div className='flex items-center gap-2'><span>Custom Email Address</span>  <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>Your custom email which you want to forward mail from. For example, team@company_name.com.</span></Card></div></div>} placeholder={"Custom email address"} type={'text'} id={"custom_email"} error={returnErrorMessage("custom_email")} />
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
                            const reader = new FileReader();
                            reader.onload = () => {
                                const base64String = reader.result
                                setFormValues({ ...formValues, selectedFile: base64String })
                                setBasicFormData({ ...basicFormData, selectedFile: base64String })
                            };
                            reader.readAsDataURL(file);
                        }

                    }} error={errors} />
                </div>
            
            </div>

        </div>
    )
}

export default EmailAgentSetting