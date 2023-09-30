'use client'
import React, { useState } from 'react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import Embed from '@/app/components/Embed/Embed';
import Button from '@/app/components/Common/Button/Button';
import CustomerServiceSetupForm from '@/app/components/Forms/CustomerServiceSetupForm';
import { createBot, createBotKnowledge, modifyBot } from '@/app/API/pages/Bot';
import LoaderButton from '@/app/components/Common/Button/Loaderbutton';
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import EmailConfig from '@/app/components/EmailConfig/EmailConfig';
import EmailAgentSetting from '@/app/components/EmailAgentSetting/EmailAgentSetting';
import { createEnterpriseAccount } from '@/app/API/pages/EnterpriseService';
import { useRouter } from 'next/navigation';
import SideModal from '@/app/components/SideModal/SideModal';

const ChatBots = ({ setSkeleton, skeleton }) => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [basicFormData, setBasicFormData] = useState({})
    const [totalRecords, setTotalRecords] = useState([]);
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
        <>
            <div className='bg-[#F8F8F8] w-full lg:w-[768px] m-auto border rounded-lg border-[#F0F0F1] mt-5 cursor-pointer'>
                {
                    skeleton === true ? (
                        <div className={`py-4 px-6 flex justify-between items-center gap-4 border-b border-[#F0F0F1]`}>
                            <div className='flex items-center justify-center gap-2'>
                                <SkeletonLoader count={1} height={40} width={100} />
                            </div>
                            <div className='flex items-center gap-4'>
                                <SkeletonLoader count={1} height={40} width={100} />
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`py-4 flex  justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1]`}
                        >
                            <div className="flex items-start sm:items-center  gap-2">
                                <AdjustmentsHorizontalIcon className="text-primary w-5" />
                                <p className="text-base font-medium text-[#151D23]">
                                    {totalRecords?.length > 1 ? 'Install Widgets' : 'Install Widget'}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 ">
                                <button
                                    onClick={(e) => { setShowModal(true) }}
                                    className="flex items-center gap-2 justify-center font-semibold bg-white text-xs px-5 pb-2 pt-2 border-[#F0F0F1] leading-normal text-[#151D23] disabled:shadow-none hover:bg-primary hover:text-[#ffffff] transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg  "
                                
                                >
                                    Create New Agent
                                </button>
                            </div>
                        </div>
                    )
                }

                <Embed form={false} skeleton={skeleton} setSkeleton={setSkeleton} setTotalRecords={setTotalRecords} />

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
            </div>
        </>
    );
}

export default ChatBots