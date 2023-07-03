'use client'
import React, { useEffect, useState } from 'react'
import BasicDetails from '../Forms/BasicDetails';
import Embed from '../Embed/Embed';
import CustomerServiceSetupForm from '../Forms/CustomerServiceSetupForm';
import { useDispatch, useSelector } from 'react-redux';
import { UserCircleIcon, CogIcon, InboxArrowDownIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import Customize from '../Customize/Customize';
import EmailConfig from '../EmailConfig/EmailConfig';
import EmailAgentSetting from '../EmailAgentSetting/EmailAgentSetting';
import Button from '../Common/Button/Button';
import LoaderButton from '../Common/Button/Loaderbutton';
import { createEnterpriseAccount, enterpriseDomainInitialize, enterpriseDomainVerify } from '@/app/API/pages/EnterpriseService';
import { state_data } from '../Forms/data/FormData';
import { createBot, createBotKnowledge, modifyBot } from '@/app/API/pages/Bot';
import { fetchBot, setBotId, setModalValue } from '../store/slices/botIdSlice';

const Intake = () => {
    const [basicFormData, setBasicFormData] = useState({})
    let state = useSelector((state) => state.botId.showModal)
    const [errors, setErrors] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [intakeStep, setIntakeStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [intakeCompleteStep, setIntakeCompleteStep] = useState(0);
    const dispatch = useDispatch()
    useEffect(() => {
        setShowModal(state);
    }, [state])
    const GetStepForm = () => {
        switch (intakeStep) {
            case 0:
                return { title: <>Business Information</>, form: <BasicDetails basicFormData={basicFormData} setBasicFormData={setBasicFormData} />, btn: "Next" }
            case 1:
                return { title: <>Help Center URL</>, form: <CustomerServiceSetupForm basicFormData={basicFormData} setBasicFormData={setBasicFormData} />, btn: "Next" }
            case 2:
                return { title: "Customize Bot", form: <Customize setBasicFormData={setBasicFormData} basicFormData={basicFormData} form={true} />, btn: "Next" }
            case 3:
                return { title: <div className=''><span className=''>Configure Email</span><p className='p-0 m-0'><span className='text-border'>{basicFormData?.email_prefix ?? '{email_Prefix}'}@{basicFormData?.company_name ?? '{company_name}'}.gettempo.ai</span></p></div>, form: <EmailAgentSetting form={true} basicFormData={basicFormData} setBasicFormData={setBasicFormData} />, btn: "Next" }
            case 4:
                return { title: "Email Agent Settings", form: <EmailConfig basicFormData={basicFormData} setBasicFormData={setBasicFormData} />, btn: "Finish" }
            default:
                return { title: "Form not found !", form: <h1>Something wrong !</h1> }
        }
    }
    const getAbbrevationOfState = (abber) => {
        const findAbber = state_data.find((state) => state.name === abber)
        if (findAbber) {
            return findAbber.abbreviation
        }
        return ""
    }
    const DisablingButton = () => {
        if (intakeStep === 0) {
            const requiredKeys = [
                'business_street',
                'business_city',
                'business_zipcode',
                'business_state',
                'business_industry',
                'business_name',
                'business_company_size'
            ];
            return requiredKeys.some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        }
        if (intakeStep === 1) {
            const requiredKeys = ['urls'];
            return requiredKeys.every(key => !basicFormData[key] || basicFormData[key].length === 0);
        }
        if (intakeStep === 3) {
            const requiredKeys = [
                "email_prefix",
                "custom_email",
                "company_name"
            ]
            return requiredKeys.some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        }
        if (intakeStep === 4) {
            const requiredKeys = [
                'agent_title',
                'email_introduction',
                'email_signOff']
            const str_values = requiredKeys.some(key => !basicFormData[key] || basicFormData[key].trim() === '');
            const arr_values = ['agent_name'].every(key => !basicFormData[key] || basicFormData[key].length === 0);
            if (str_values || arr_values) {
                return true
            }
        }
        return false

    }

    const SubmitBusinessDetails = async () => {
        setLoading(true)
        let payload = {
            "name": basicFormData.business_name,
            "country": "US",
            "address": basicFormData.business_street + ", " + basicFormData.business_city + ", " + getAbbrevationOfState(basicFormData.business_state) + ", USA" + ', ' + basicFormData.business_zipcode,
            "industry": basicFormData.business_industry,
            "company_size": basicFormData.business_company_size,
            "ecommerce_platform": basicFormData.ecommerce_platform
        }
        const createEnterprise = await createEnterpriseAccount(payload)
        if (createEnterprise?.status === 201) {
            setIntakeStep(1)
            setIntakeCompleteStep(1)
            setErrors([])
            setLoading(false)
        } else {
            setErrors([createEnterprise.message])
            setLoading(false)
        }
    };


    const CreateBotForm = async () => {
        setLoading(true)
        if (intakeCompleteStep === intakeStep) {
            let payload = {
                "category": "standard",
                "description": "",
                "automation_tolerance": 0,
                "logo": "",
                "chat_title": basicFormData.business_name ?? 'Tempo Agent',
                "payment_platform": "Order",
                "ticketing_platform": "Other",
                "cancellation_tolerance": 0,
                "refund_tolerance": 0,
                "ecommerce_platform": 'Other',
            }
            const bot = await createBot(payload);
            if (bot?.status === 201) {
                const bot_faq = await createBotKnowledge(bot.data.id, { urls: basicFormData.urls });
                if (bot_faq?.status === 201) {
                    dispatch(setBotId(bot.data.id));
                    setBasicFormData((prev) => {
                        return {
                            ...prev,
                            bot: "success"
                        }
                    })
                    setIntakeStep(2);
                    setIntakeCompleteStep(2)
                } else {
                    setErrors(bot_faq.message);
                }
            } else {
                setErrors(bot.message);
            }
            setLoading(false);
        } else {
            setIntakeStep(2)
        }


    }

    const savePreferences = () => {
        setLoading(true)
        let payload = {
            id: basicFormData.id,
            enterprise: basicFormData.enterprise,
            category: basicFormData.category,
            description: basicFormData.description,
            refund_tolerance: basicFormData.refund_tolerance,
            automation_tolerance: basicFormData.automation_tolerance,
            primary_color: basicFormData.primary_color,
            secondary_color: basicFormData.secondary_color,
            logo: basicFormData.logo_file_name ? basicFormData.logo : '',
            thumbnail: basicFormData.thumbnail,
            chat_title: basicFormData?.business_name ?? "Tempo AI Chatbot",
            chat_message_business_hours: basicFormData?.chat_message_business_hours,
            chat_message_after_hours: basicFormData?.chat_message_after_hours,
            widget_location: basicFormData?.widget_location,
            widget_offset_horizontal: basicFormData?.widget_offset_horizontal,
            widget_offset_vertical: basicFormData?.widget_offset_vertical,
            language: basicFormData?.language,
            cancellation_tolerance: basicFormData?.cancellation_tolerance,
            payment_platform: basicFormData?.payment_platform,
            ticketing_platform: basicFormData?.ticketing_platform,
            logo_file_name: basicFormData?.logo_file_name,
            active: basicFormData?.active
        }
        !payload.logo && delete payload.logo
        modifyBot(payload.id, payload).then((res) => {

            setLoading(false)
            setIntakeStep(3)
            setIntakeCompleteStep(3)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }
    const SubmitConfigureEmail = async () => {
        setLoading(true)
        const response = await createEnterpriseAccount({ slug_domain: basicFormData.company_name })
        if (response.status === 201) {
            const domains = await enterpriseDomainInitialize({ slug_domain: basicFormData.company_name })
            const verify = await modifyBot(basicFormData.id, { email: basicFormData.email_prefix + "@" + basicFormData.company_name + '.gettempo.ai' })
            if (domains.status === 200 && verify.status === 200) {
                setBasicFormData((prev) => {
                    return {
                        ...prev,
                        configure: "success"
                    }
                })
                setIntakeStep(5)
                setIntakeCompleteStep(5)
                setLoading(false)
            } else {
                setErrors(domains.response.data.slug_domain)
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }

    const EmailConfigSubmit = async () => {
        setLoading(true)
        let payload = {
            email: basicFormData.email_prefix + "@" + basicFormData.company_name + '.gettempo.ai',
            email_agent_name: basicFormData.agent_name,
            email_agent_title: basicFormData.agent_title,
            email_greeting: basicFormData.email_introduction,
            email_farewell: basicFormData.email_signOff,
        }
        const response = await modifyBot(basicFormData.id, payload)
        if (response.status === 200) {
            setLoading(false)
            dispatch(setModalValue(false))
            dispatch(fetchBot())
        } else {
            setLoading(false)
        }
    }
    const SubmitForm = () => {
        setErrors([])
        switch (intakeStep) {
            case 0:
                SubmitBusinessDetails()
                break;
            case 1:
                if (basicFormData?.bot === 'success') {
                    setIntakeStep(2)
                    setIntakeCompleteStep(2)
                } else {
                    CreateBotForm()
                }
                break;
            case 2:

                savePreferences()

                break;
            case 3:
                if (basicFormData?.configure === 'success') {
                    setIntakeStep(5)
                    setIntakeCompleteStep(5)
                } else {
                    SubmitConfigureEmail()
                }

                break;
            case 4:
                EmailConfigSubmit()
                break;

            default:
                break;
        }
    }

    const headings = [
        { step: 0, text: "Business Information", logo: <UserCircleIcon className="w-10 h-10 mr-2" /> },
        { step: 1, text: "Help Center URL", logo: <CogIcon className="w-10 h-10 mr-2" /> },
        { step: 2, text: "Customize Bot", logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" /> },
        { step: 3, text: "Configure Email", logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" /> },
        { step: 4, text: "Email Agent Settings", logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" /> },
    ]

    const sendActiveValue = (element) => {
        if (intakeStep === element.step) {
            return 'text-heading'
        }
        if (intakeCompleteStep > element.step) {
            return 'text-primary'
        }
        return 'text-border'
    }
    const changeStep = (element) => {
        if (intakeCompleteStep > element.step || (intakeCompleteStep !== 0 && element.step  === intakeCompleteStep)) {
            setIntakeStep(element.step)
        }
    }
    const sendActiveValueLabel = (element) => {
        if (intakeStep === element.step) {
            return 'text-white bg-heading'
        }
        if (intakeCompleteStep > element.step) {
            return 'text-white bg-primary'
        }
        return 'text-white bg-border '
    }

    const sendTextAndNumber = (element, key) => {
        if (intakeStep == element.step) {
            return key + 1
        }
        if (intakeCompleteStep > element.step) {
            return <CheckCircleIcon className="bg-white text-primary rounded-full w-full h-auto " />
        }
        return key + 1
    }
    const handleBack = () => { setIntakeStep(intakeStep - 1) }
    return (
        <>
            {showModal && (
                <div className={"  py-12 z-[100] bg-white w-full "} >
                    <h3 className='justify-center sm:justify-start md:justify-start lg:justify-start flex px-4 font-semibold text-heading items-center gap-4'>{GetStepForm().title}{" "}
                        {basicFormData?.business_name && basicFormData?.business_name !== '' && <span className="text-[10px] font-semibold inline-block py-1 px-2 rounded-md text-primary bg-badge_blue last:mr-0 mr-1">
                            Processing
                        </span>}
                    </h3>
                    <hr className='my-5 mb-0 border-border' />
                    <div className='flex items-start  bg-[#f6f8fa] h-auto w-full justify-between  md:justify-start lg:justify-start sm:justify-start gap-16'>
                        <div className='flex px-0  items-start  bg-white w-full sm:h-auto md:h-auto lg:h-auto sm:w-auto md:w-auto lg:w-auto pt-[25px]'>
                            <div className='w-[50px] sm:w-[250px] md:w-[250px] lg:w-[250px] h-full bg-white  pl-6'>
                                <ol className="">


                                    {headings.map((element, key) =>
                                        <li key={key} className={`cursor-pointer flex gap-2 items-center ${sendActiveValue(element)}`} onClick={(e) => { changeStep(element) }}>
                                            <span className={`${key === 0 && ("rounded-t-3xl")} ${headings.length - 1 === key && ("rounded-b-3xl")} bg-[#ebeef1] h-[40px] flex items-center justify-center w-6 -left-4`}>
                                                <h1 className={`flex w-[20px] h-[20px]  text-[10px]  font-normal items-center justify-center shadow-md rounded-full ${sendActiveValueLabel(element)}`}>{sendTextAndNumber(element, key)} </h1>
                                            </span>
                                            <h3 className=" items-center font-bold h-[30px] m-0 text-xs leading-tight hidden sm:flex md:flex lg:flex">{element.text}</h3>
                                        </li>
                                    )}


                                </ol>
                            </div>
                            <div className='w-full bg-white sm:w-[800px] md:w-[800px] lg:w-[800px]  justify-center pb-[40px]  px-6 sm:pr-6 md:pr-6 lg:pr-6 '>
                                {GetStepForm().form}
                                <div className={`flex  p-2 rounded-b mt-5 ${intakeStep > 0 ? 'justify-between' : 'justify-end'}`}>
                                    {intakeStep > 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className="inline-block float-left rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                                            disabled={loading ? true : false}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    {loading ? <LoaderButton /> :
                                        <>
                                            <Button type={"button"}
                                                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                                                disabled={DisablingButton()}
                                                onClick={(e) => SubmitForm()}
                                            >
                                                {GetStepForm().btn}

                                            </Button>

                                        </>}
                                </div>
                                {errors.length > 0 && errors.map((ele, key) => <p className='text-danger text-xs' key={key}>{ele}</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}

export default Intake