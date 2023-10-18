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
import { useEffect } from 'react';
import TextField from '../Common/Input/TextField';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchBot } from '../store/slices/botIdSlice';


const ChatBots = ({ setSkeleton, skeleton }) => {
    const state = useSelector(state => state.user)
    const dispatch = useDispatch()
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
            "chat_title": basicFormData?.bot_name,
            "payment_platform": "Order",
            "ticketing_platform": "Other",
            "cancellation_tolerance": 0,
            "refund_tolerance": 0,
            "ecommerce_platform": 'Other',
        }
        const bot = await createBot(payload);
        if (bot?.status === 201) {
            const enterprise = await createEnterpriseAccount({ slug_domain: state?.enterprise?.domain })
            if (enterprise?.status === 201 || enterprise?.status === 200) {
                debugger
                setBasicFormData((prev) => {
                    return {
                        ...prev,
                        configure: "success"
                    }
                })
                dispatch(fetchBot())
                router.push(`/dashboard/chat-settings?id=${bot.data.id}`)
                setShowModal(false)
                setLoading(false)
            } else {
                setLoading(false)
            }
        } else {
            setLoading(false)

        }
    }

    const DisablingButton = () => {
        const bot_name = ["bot_name"].some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        if (bot_name) {
            return true
        }
        return false
    }

    const [skeltonLoading, setSkeltonLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setSkeltonLoading(false);
        }, 2500);
    }, []);
    const handleInputValues = (event) => {
        const { value, name } = event.target
        setBasicFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
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
                                {skeltonLoading ?
                                    <SkeletonLoader count={1} height={30} width={140} />
                                    :
                                    <>
                                        <AdjustmentsHorizontalIcon className="text-primary w-5" />
                                        <p className="text-base font-medium text-[#151D23]">
                                            {totalRecords?.length > 1 ? 'Install Widgets' : 'Install Widget'}
                                        </p>
                                    </>

                                }

                            </div>
                            <div className="flex items-center gap-4 ">
                                {skeltonLoading ?
                                    <SkeletonLoader count={1} height={30} width={100} />
                                    :
                                    <button
                                        onClick={(e) => { setShowModal(true) }}
                                        className="flex items-center gap-2 justify-center font-semibold bg-white text-xs px-5 pb-2 pt-2 border-[#F0F0F1] leading-normal text-[#151D23] disabled:shadow-none hover:bg-primary hover:text-[#ffffff] transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg  "

                                    >
                                        Create New Agent
                                    </button>
                                }
                            </div>
                        </div>
                    )
                }

                <Embed form={false} skeleton={skeleton} setSkeleton={setSkeleton} setTotalRecords={setTotalRecords} />

                {showModal === true ?
                    <SideModal setShow={setShowModal} heading={'Create New Agent'} >
                        <div className="my-2">
                            <TextField
                                onChange={handleInputValues}
                                value={basicFormData?.bot_name}
                                name="bot_name"
                                className="py-3 mt-1"
                                title={
                                    <div className="flex items-center gap-2 w-[150px]">
                                        <span>Bot Name</span>{" "}
                                    </div>
                                }
                                placeholder={"Bot Name"}
                                type={"text"}
                                id={"bot_name"}
                                error={''}
                            />
                        </div>

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