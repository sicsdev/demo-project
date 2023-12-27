'use client'
import React, { useState } from 'react'
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
import { getPermissionHelper } from '../helper/returnPermissions';
import LineChart from './Chart/LineChart';
import Image from "next/image"

import { AdjustmentsHorizontalIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

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
            <div className='bg-[#F8F8F8] w-full lg:w-[950px] m-auto border rounded-lg border-[#F0F0F1] mt-5 cursor-pointer'>
                {
                    skeleton ? (
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
                            className={`py-4 flex  justify-center  px-6  items-center gap-4 border-b border-[#F0F0F1]`}
                        >
                            {skeleton ?
                                <SkeletonLoader count={1} height={30} width={140} />
                                :
                                <>
                                    <AdjustmentsHorizontalIcon className="text-primary w-5" />
                                    <p className="text-base font-medium text-[#151D23]">
                                        {totalRecords?.length > 1 ? 'Manage Bots' : 'Manage Bot'}
                                    </p>
                                </>

                            }

                        </div>
                    )
                }
              
                <Embed form={false} skeleton={skeleton} getPermissionHelper={getPermissionHelper} state1={state} setShowModal={setShowModal} setSkeleton={setSkeleton} setTotalRecords={setTotalRecords} />

                {showModal === true ?
                    <SideModal setShow={setShowModal} heading={'Add New Bot'} >
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