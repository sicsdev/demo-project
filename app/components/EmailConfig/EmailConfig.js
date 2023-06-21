import React from 'react'
import { useState } from 'react'
import TextField from '../Common/Input/TextField'
import LoaderButton from '../Common/Button/Loaderbutton'
import Button from '../Common/Button/Button'
import { useDispatch } from 'react-redux'
import { fetchBot, setModalValue } from '../store/slices/botIdSlice'
import { fetchProfile } from '../store/slices/userSlice'
import { email_introduction_data, email_sign_off_data } from './data'
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import SelectField from '../Common/Input/SelectField'
import Card from '../Common/Card/Card'
const EmailConfig = ({ basicFormData, intakeStep, setIntakeStep, setIntakeCompleteStep }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [tileAgentName, setTileAgentName] = useState([])
    const [formValues, setFormValues] = useState({
        email_prefix: basicFormData?.email_prefix ?? '',
        domain_name: basicFormData?.domain_name ?? '',
        email_introduction: basicFormData?.email_introduction ?? '',
        email_signOff: basicFormData?.email_signOff ?? '',
        agent_title: basicFormData?.agent_title ?? '',
        agent_name: basicFormData?.agent_name ?? '',
    })
    const handleInputValues = (e) => {
        const { value } = e.target
        setErrors([])
        setFormValues({ ...formValues, [e.target.name]: value })

    }
    const handleAgentNameValue = (e) => {

        const { value } = e.target
        setFormValues({ ...formValues, agent_name: value })
        if (value.includes(',') === true) {
            let remove_comma = value.replace(/,/g, '');
            if (remove_comma) {
                if (tileAgentName.includes(remove_comma)) {
                    setFormValues(prev => {
                        return {
                            ...prev,
                            agent_name: ''
                        }
                    })
                } else {
                    setTileAgentName([...tileAgentName, remove_comma])
                    setFormValues(prev => {
                        return {
                            ...prev,
                            agent_name: ''
                        }
                    })
                }
            } else {
                setTileAgentName([])
            }
        }
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
    const RemoveFromAgentNameArr = (element) => {
        const updatedChips = tileAgentName.filter((x) => x !== element);
        setTileAgentName(updatedChips);
    }
    const makeCapital = (str) => {
        if (str.includes(" ")) {
            return str
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        } else {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
    return (
        <div className='container'>
            <div className='grid grid-cols-1'>
                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.email_prefix} name='email_prefix' className='py-3 mt-1' title={'Email Prefix'} placeholder={"Email Prefix"} type={'text'} id={"email_prefix"} error={returnErrorMessage("email_prefix")} />
                </div>
                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.domain_name} name='domain_name' className='py-3 mt-1' title={'Domain Name'} placeholder={"Domain Name"} type={'text'} id={"domain_name"} error={returnErrorMessage("domain_name")} />
                </div>
                <div className='my-2'>
                    <SelectField onChange={handleInputValues} value={formValues.email_introduction} error={returnErrorMessage("email_introduction")} name='email_introduction' values={email_introduction_data} title={"Email Introduction"} id={'email_ticketing_system'} className="py-3" /> </div>
                <div className='my-2'>
                    <SelectField onChange={handleInputValues} value={formValues.email_signOff} error={returnErrorMessage("email_signOff")} name='email_introduction' values={email_sign_off_data} title={"Email Sign-Off"} id={'email_ticketing_system'} className="py-3" /> </div>

                <div className='my-2'>
                    <TextField onChange={handleInputValues} value={formValues.agent_title} name='agent_title' className='py-3 mt-1' title={'Agent Title'} placeholder={"Agent Title"} type={'text'} id={"agent_title"} error={returnErrorMessage("agent_title")} />
                </div>
                <div className='my-2'>
                    <div className={`inline`}>
                        <label htmlFor={"agent_name"} className="block text-sm font-medium text-heading"><span className='flex items-center gap-2'>Agent Name(s)
                            <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>Please add the names you'd like your AI agents to sign off with. The algorithm will randomly choose one of the names you enter. Please enter the names EXACTLY as you'd like them separate by commas. Names can include hyphens, periods, or spaces. For example, valid names include Jack, Jack Davidson, Jack D., Jack D, and Jack Davidson-Specter.</span></Card></div>
                        </span></label>
                        <div className='flex flex-wrap justify-start items-center border h-auto w-auto border-border p-1 rounded-md mt-2'>
                            <div className='flex flex-wrap items-center justify-start gap-1'>
                                {tileAgentName.length > 0 && tileAgentName.map((element, key) =>
                                    <div
                                        className="[word-wrap: break-word]   flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] key  px-[10px] py-0 text-[13px] font-normal normal-case leading-loose text-heading shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]  border border-border" key={key}>
                                        {makeCapital(element.trim())}
                                        <XMarkIcon className=" h-4 w-4 cursor-pointer " onClick={(e) => { RemoveFromAgentNameArr(element) }} />
                                    </div>
                                )}
                            </div>
                            <input value={formValues.agent_name} required onChange={handleAgentNameValue} type={"text"} placeholder={"Enter names separate by ,"} className={` block  px-3 py-2 bg-white  rounded-md  text-sm placeholder-slate-400   placeholder-slate-400  focus:outline-none border  disabled:bg-slate-50 disabled:text-slate-500  w-auto  border-none ring-0 focus:border-none focus-visible:border-none`} id={"agent_name"} name={"agent_name"} />
                        </div>
                    </div>






                </div>
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
                        disabled={formValues.domain_name === '' || formValues.email_prefix === ''}
                    >

                        Submit
                    </Button>}
            </div>

        </div>
    )
}

export default EmailConfig