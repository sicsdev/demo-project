'use client'
import React, { useEffect, useState } from 'react'
import BasicDetails from '../Forms/BasicDetails';
import Embed from '../Embed/Embed';
import CustomerServiceSetupForm from '../Forms/CustomerServiceSetupForm';
import { useSelector } from 'react-redux';
import { UserCircleIcon, CogIcon, InboxArrowDownIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import Customize from '../Customize/Customize';
import EmailConfig from '../EmailConfig/EmailConfig';

const Intake = () => {
    const [basicFormData, setBasicFormData] = useState({})
    let state = useSelector((state) => state.botId.showModal)
    const [formCustomerData, setCustomerFormData] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [intakeStep, setIntakeStep] = useState(0);
    const [intakeCompleteStep, setIntakeCompleteStep] = useState(0);

    useEffect(() => {
        setShowModal(state);
    }, [state])

    const GetStepForm = () => {
        switch (intakeStep) {
            case 0:
                return <BasicDetails basicFormData={basicFormData} setIntakeCompleteStep={setIntakeCompleteStep} intakeCompleteStep={intakeCompleteStep} setBasicFormData={setBasicFormData} intakeStep={intakeStep} setIntakeStep={setIntakeStep} />
            case 1:
                return <CustomerServiceSetupForm formCustomerData={formCustomerData} setIntakeCompleteStep={setIntakeCompleteStep} intakeCompleteStep={intakeCompleteStep} setCustomerFormData={setCustomerFormData} intakeStep={intakeStep} setIntakeStep={setIntakeStep} />
            case 2:
                return <Customize form={true} intakeStep={intakeStep} setIntakeStep={setIntakeStep} setIntakeCompleteStep={setIntakeCompleteStep} />
            case 3:
                return <Embed form={true} intakeStep={intakeStep} setIntakeStep={setIntakeStep} setIntakeCompleteStep={setIntakeCompleteStep} />
            case 4:
                return <EmailConfig form={true} intakeStep={intakeStep} setIntakeStep={setIntakeStep} setIntakeCompleteStep={setIntakeCompleteStep} />
            default:
                return <h1>Something wrong !</h1>
        }
    }

    const SendTitle = () => {
        switch (intakeStep) {
            case 0:
                return <>Business Information</>
            case 1:
                return <>Customer Service set up</>
            case 2:
                return 'Customize Bot'
            case 3:
                return 'Install Bot'
            case 4:
                return 'Configure Email'
            default:
                return <h1>Something wrong !</h1>
        }
    }
    const headings = [
        { step: 0, text: "Business Information", logo: <UserCircleIcon className="w-10 h-10 mr-2" /> },
        { step: 1, text: "Customer Service set up", logo: <CogIcon className="w-10 h-10 mr-2" /> },
        { step: 2, text: "Customize Bot", logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" /> },
        { step: 3, text: "Install  Bot", logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" /> },
        { step: 4, text: "Configure Email", logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" /> }
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
            return <CheckCircleIcon className="bg-white text-primary rounded-full w-full h-full " />
        }
        return key + 1
    }
    return (
        <>
            {showModal && (
                <div className={" fixed top-0 py-12 z-[100] bg-white w-full h-[100vh]"} >
                    <h3 className='justify-center sm:justify-start md:justify-start lg:justify-start flex px-4 font-semibold text-heading items-center gap-4'>{SendTitle()}{" "}  <span className="text-[10px] font-semibold inline-block py-1 px-2 rounded-md text-primary bg-badge_blue last:mr-0 mr-1">
                        Processing
                    </span> </h3>
                    <hr className='my-5 mb-0 border-border' />
                    <div className='flex items-start  bg-[#f6f8fa] h-full w-full overflow-y-auto justify-start gap-16'>
                        <div className='flex items-start  bg-white w-full h-full sm:h-auto md:h-auto lg:h-auto sm:w-auto md:w-auto lg:w-auto pt-[25px] px-[25px]'>
                            <div className='w-[250px] hidden sm:block md:block lg:block'>
                                <ol className="fixed">
                                    {headings.map((element, key) =>
                                        <li key={key} className={`flex gap-2 items-center ${sendActiveValue(element)}`}>
                                            <span className={`${key === 0 && ("rounded-t-3xl")} ${headings.length - 1 === key && ("rounded-b-3xl")} bg-[#ebeef1] h-[40px] flex items-center justify-center w-6 -left-4`}>
                                                <h1 className={`flex w-[20px] h-[20px]  text-xs font-bold items-center justify-center shadow-md rounded-full ${sendActiveValueLabel(element)}`}>{sendTextAndNumber(element, key)} </h1>
                                            </span>
                                            <h3 className="flex items-center font-bold h-[30px] m-0 text-xs leading-tight">{element.text}</h3>
                                        </li>
                                    )}
                                </ol>
                            </div>
                            <div className='w-full  sm:w-[800px] md:w-[800px] lg:w-[800px]  pb-[40px]   flex items-start'>
                                {GetStepForm()}
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