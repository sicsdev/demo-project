'use client'
import React, { useEffect, useState } from 'react'
import BasicDetails from '../Forms/BasicDetails';
import Embed from '../Embed/Embed';
import CustomerServiceSetupForm from '../Forms/CustomerServiceSetupForm';
import { useSelector } from 'react-redux';
import { UserCircleIcon, CogIcon, InboxArrowDownIcon } from '@heroicons/react/24/solid'

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
                return <Embed />
            default:
                return <h1>Something wrong !</h1>
        }
    }

    const SendTitle = () => {
        switch (intakeStep) {
            case 0:
                return <><UserCircleIcon className="w-10 h-10 mr-2" />Business Information</>
            case 1:
                return <><CogIcon className="w-10 h-10 mr-2" />Customer Service set up</>
            case 2:
                return 'Download Script'
            default:
                return <h1>Something wrong !</h1>
        }
    }
    const headings = [
        { step: 0, text: "Business Information", logo: <UserCircleIcon className="w-10 h-10 mr-2" /> },
        { step: 1, text: "Customer Service set up", logo: <CogIcon className="w-10 h-10 mr-2" /> },
        { step: 2, text: "Download Script", logo: <InboxArrowDownIcon className="w-10 h-10 mr-2" /> }
    ]
    return (
        <>
            {showModal && (
                <div className={" fixed top-0 py-12 z-[100] bg-white w-full h-[100vh]"} >
                    <h3 className='justify-center sm:justify-start md:justify-start lg:justify-start flex  font-semibold text-heading items-center gap-4'>{SendTitle()}{" "}  <span className="text-[10px] font-semibold inline-block py-1 px-2  rounded-full text-white bg-neon last:mr-0 mr-1">
                        Processing
                    </span> </h3>
                    <hr className='my-5 mb-0 border-border' />
                    <div className='flex items-start  bg-[#f6f8fa] h-full w-full overflow-y-auto justify-start gap-16'>
                        <div className='flex items-start  bg-white w-full h-full sm:h-auto md:h-auto lg:h-auto sm:w-auto md:w-auto lg:w-auto pt-[25px] px-[25px]'>
                            <div className='w-[250px] hidden sm:block md:block lg:block'>
                                <ol className="fixed text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                    {headings.map((element, key) =>
                                        <li key={key} className={`mb-10 ml-6 flex items-center ${intakeStep === element.step ? 'text-heading' : 'text-border'} ${intakeCompleteStep > element.step && 'text-[#0E9F6E]'}`}>
                                            <span className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-full -left-4 ring-4 ring-white ">
                                                <h1 className={`flex w-[30px] h-[30px] items-center justify-center shadow-md p-2 rounded-full ${intakeStep === element.step ? 'text-heading bg-white' : 'text-border bg-white'} ${intakeCompleteStep > element.step && 'text-white bg-[#0E9F6E]'}`}>{key+1}</h1>
                                            </span>
                                            <h3 className="font-semibold text-sm leading-tight">{element.text}</h3>
                                        </li>
                                    )}
                                </ol>
                            </div>
                            <div className='w-full  sm:w-[500px] md:w-[500px] lg:w-[500px]  pb-[40px]   flex items-start'>
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