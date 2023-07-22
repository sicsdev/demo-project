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
        phone_number: basicFormData?.phone ?? '',
        friendly_name: basicFormData?.friendly_name ?? '',
        area_code: basicFormData?.area_code ?? '',
        phone_numbers: basicFormData?.phone_numbers ?? [],
        selectedFile: basicFormData?.selectedFile ?? '',
    })

    console.log("basicFormData", basicFormData)

    const handleInputValues = (e) => {
        const { value } = e.target
        if (value !== " ") {
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
                case 'area_code':
                    getPhoneNumbers(value)
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

    const handlePhoneChange = (value) => {
        setFormValues({ ...formValues, ['phone_number']: value })
        setBasicFormData((prev) => {
            return {
                ...prev,
                ['phone_number']: value
            }
        })
    };


    const getPhoneNumbers = async (value) => {
        const timeoutId = setTimeout(async () => {
            const response = await getAvailableMobileNumbers(value)
            console.log(response)
            if (response?.length > 0) {
                setBasicFormData((prev) => {
                    return {
                        ...prev,
                        ['phone_numbers']: response
                    }
                })
                setFormValues({
                    ...formValues,
                    'phone_numbers': response,
                    area_code: value
                }
                )
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }
    const addPhone = (element) => {
        setBasicFormData((prev) => {
            return {
                ...prev,
                'phone': element.phone_number,
                'friendly_name': element.friendly_name,
            }
        })
        setFormValues({
            ...formValues,
            ['phone_number']: element.phone_number,
            ['friendly_name']: element.friendly_name
        })
    }
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
                {form === true && (
                    <>
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
                            // onBlur={() => { getPhoneNumbers() }}
                            />
                        </div>
                        {formValues?.phone_numbers?.length > 0 && formValues.phone_number === '' && (

                            <div className="relative overflow-x-auto my-2">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-heading uppercase bg-gray ">
                                        <tr>
                                            <th scope="col" className="px-3 py-2">
                                                Number
                                            </th>
                                            <th scope="col" className="px-3 py-2">
                                                Region
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formValues?.phone_numbers.slice(0, 10).map((element, key) =>
                                            <tr className={`${basicFormData?.phone === element.phone_number ? 'bg-heading text-white' : "bg-white text-heading"}  border-b border-border  hover:bg-heading hover:text-white cursor-pointer`} key={key} onClick={(e) => {
                                                addPhone(element)
                                            }} >
                                                <th scope="row" className="px-3 py-2 font-normal  whitespace-nowrap text-[12px]">
                                                    {element.friendly_name}
                                                </th>
                                                {/* <td className="px-3 py-2 font-normal whitespace-nowrap text-[12px]">
                                                    {element.mms ? "Yes" : "No"}
                                                </td>
                                                <td className="px-3 py-2 font-normal whitespace-nowrap text-[12px]">
                                                    {element.sms ? "Yes" : "No"}
                                                </td>
                                                <td className="px-3 py-2 font-normal  whitespace-nowrap text-[12px]">
                                                    {element.voice ? "Yes" : "No"}
                                                </td> */}
                                                <td className="px-3 py-2 font-normal whitespace-nowrap text-[12px]">
                                                    {element.region}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>



                        )}
                        {formValues.phone_number && formValues.friendly_name && (
                            <div className='my-2 cursor-pointer'  >
                                {/* <p className='text-primary' onClick={() => {
                                    addPhone({ friendly_name: '', phone_number: '' })
                                }}>back</p> */}
                                <div className='rounded-lg p-4 shadow-md flex justify-start gap-4 items-center border border-border '>
                                    <PhoneIcon className="h-6 w-6 text-heading" />
                                    <span className='text-heading'>{formValues.friendly_name}</span>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    )
}

export default EmailAgentSetting