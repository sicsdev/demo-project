'use client'
import React, { useState } from 'react'
import { AdjustmentsHorizontalIcon, ChevronUpIcon, ShoppingCartIcon, UsersIcon } from '@heroicons/react/24/outline';
import Embed from '@/app/components/Embed/Embed';
import Button from '@/app/components/Common/Button/Button';
import Modal from '@/app/components/Common/Modal/Modal';
import CustomerServiceSetupForm from '@/app/components/Forms/CustomerServiceSetupForm';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'
import { createBot, createBotKnowledge, modifyBot } from '@/app/API/pages/Bot';
import { useDispatch } from 'react-redux';
import { fetchBot } from '@/app/components/store/slices/botIdSlice';
import LoaderButton from '@/app/components/Common/Button/Loaderbutton';
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import EmailConfig from '@/app/components/EmailConfig/EmailConfig';
import EmailAgentSetting from '@/app/components/EmailAgentSetting/EmailAgentSetting';
import { createEnterpriseAccount, enterpriseDomainInitialize } from '@/app/API/pages/EnterpriseService';
import { useRouter } from 'next/navigation';
import QuickStart from '@/app/components/Dashboard/QuickStart';
import TopBar from '@/app/components/Common/Card/TopBar';
import SideModal from '@/app/components/SideModal/SideModal';

const Page = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [basicFormData, setBasicFormData] = useState({})
    const [skeleton, setSkeleton] = useState(true)

    const SubmitForm = async () => {
        setLoading(true)
        let payload = {
            "category": "standard",
            "description": "",
            "automation_tolerance": 0,
            "logo": "",
            "chat_title": 'Tempo Agent',
            "payment_platform": "Order",
            "ticketing_platform": "Other",
            "cancellation_tolerance": 0,
            "refund_tolerance": 0,
            "ecommerce_platform": 'Other',
        }
        const bot = await createBot(payload);
        if (bot?.status === 201) {
            const bot_faq = await createBotKnowledge(bot.data.id, { urls: basicFormData.urls });
            const enterprise = await createEnterpriseAccount({ slug_domain: basicFormData.company_name })
            if (bot_faq?.status === 201 && enterprise?.status === 201) {
                let email_payload = {
                    email: basicFormData.email_prefix + "@" + basicFormData.company_name + '.gettempo.ai',
                    agent_name: basicFormData.agent_name,
                    email_agent_title: basicFormData.agent_title,
                    email_greeting: basicFormData.email_introduction,
                    email_farewell: basicFormData.email_signOff,
                }
                const verify = await modifyBot(bot.data.id, email_payload)
                if (verify.status === 200) {
                    setBasicFormData((prev) => {
                        return {
                            ...prev,
                            configure: "success"
                        }
                    })
                    router.push(`/customize?id=${bot.data.id}&name=`)
                    setShowModal(false)
                    setLoading(false)
                } else {
                    setErrors(domains.response.data.slug_domain)
                    setLoading(false)
                }
            } else {

                setLoading(false)
            }
        }
    }

    const DisablingButton = () => {
        const bot_data = ['urls'].every(key => !basicFormData[key] || basicFormData[key].length === 0);
        const email_config = ["email_prefix", "custom_email", "company_name"].some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        const email_agent = [
            'agent_title',
            'email_introduction',
            'email_signOff'].some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        const arr_values = ['agent_name'].every(key => !basicFormData[key] || basicFormData[key].length === 0);
        if (email_agent || arr_values || email_config || bot_data) {
            return true
        }
        return false
    }

    return (
        <div style={{ whiteSpace: "normal" }}>
            <TopBar title={`Agents`} icon={<AdjustmentsHorizontalIcon className="h-5 w-5 text-primary" />} />
            <>
                <div className=' sm:px-5 md:px-5 lg:px-5 block sm:flex md:flex lg:flex justify-end items-center mt-4'>
                    {skeleton ? <SkeletonLoader /> :
                        <div>
                            <Button type={"button"} onClick={(e) => { setShowModal(true) }}
                                className="flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white"
                            >
                                Create New Agent
                            </Button>
                        </div>
                    }
                </div>
                <Embed form={false} skeleton={skeleton} setSkeleton={setSkeleton} />
                {showModal === true ?
                    <SideModal setShow={setShowModal} heading={'Create New Widget'} >
                        <CustomerServiceSetupForm form={false} setBasicFormData={setBasicFormData} basicFormData={basicFormData} />
                        <EmailConfig form={false} setBasicFormData={setBasicFormData} basicFormData={basicFormData} />
                        <EmailAgentSetting form={false} setBasicFormData={setBasicFormData} basicFormData={basicFormData} />

                        {errors.length > 0 && errors.map((ele, key) => <p className='text-danger text-xs' key={key}>{ele}</p>)}
                        <div className={`flex  p-2 rounded-b mt-5  justify-end`}>
                            {loading ? <LoaderButton /> :
                                <>
                                    <Button type={"button"}
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                        disabled={DisablingButton()}
                                        onClick={(e) => SubmitForm()}
                                    >
                                        Submit

                                    </Button>

                                </>}
                        </div>
                    </SideModal> : ""
                }
            </>

        </div>
    );
}

export default Page