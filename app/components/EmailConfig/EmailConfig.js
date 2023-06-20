import React from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import LoaderButton from '../Common/Button/Loaderbutton'
import Button from '../Common/Button/Button'
import { ClipboardDocumentCheckIcon } from "@heroicons/react/20/solid";
import { useDispatch } from 'react-redux'
import { fetchBot, setModalValue } from '../store/slices/botIdSlice'
import { fetchProfile } from '../store/slices/userSlice'
const EmailConfig = ({ basicFormData, intakeStep, setIntakeStep, setIntakeCompleteStep }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [basicDetailsSteps, setBasicDetailSteps] = useState(1)
    const [formValues, setFormValues] = useState({
        email_prefix: basicFormData?.email_prefix ?? '',
        domain_name: basicFormData?.domain_name ?? '',
    })
    const handleInputValues = (e) => {
        setErrors([])
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const validateForm = (formNumber) => {
        const formFields = {
            1: {
                email_prefix: 'Email Prefix',
                domain_name: 'Domain Name',
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
    const handleBack = () => {
        setIntakeStep(intakeStep - 1)
    }

    return (
        <div className='container'>
            <div className='my-2'>
                <TextField onChange={handleInputValues} value={formValues.email_prefix} name='email_prefix' className='py-3 mt-1' title={'Email Prefix'} placeholder={"Email Prefix"} type={'text'} id={"email_prefix"} error={returnErrorMessage("email_prefix")} />
            </div>
            <div className='my-2'>
                <TextField onChange={handleInputValues} value={formValues.domain_name} name='domain_name' className='py-3 mt-1' title={'Domain Name'} placeholder={"Domain Name"} type={'text'} id={"domain_name"} error={returnErrorMessage("domain_name")} />
            </div>
            <div className="relative mt-8 overflow-x-auto sm:rounded-lg">

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-heading">
                        <thead className="text-white uppercase bg-border">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <h1 className='flex items-center gap-1'>Record Name:</h1>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <h1 className='flex items-center gap-1'>Value:</h1>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b border-border">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                TXT
                                </th>
                            </tr>
                            <tr className="bg-white border-b border-border">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap dark:text-white">
                                CNAME
                                </th>
                            </tr>
                            <tr className="bg-white border-b border-border">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap dark:text-white">
                                MX
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>

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
                        dispatch(setModalValue(false))
                        dispatch(fetchBot())
                        dispatch(fetchProfile())
                    }}
                    disabled={formValues.domain_name === '' ||formValues.email_prefix === ''}
                    >

                        Submit
                    </Button>}
            </div>

        </div>
    )
}

export default EmailConfig