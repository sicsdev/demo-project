'use client'
import { getAllBotData, modifyBot } from '@/app/API/pages/Bot'
import Button from '@/app/components/Common/Button/Button'
import LoaderButton from '@/app/components/Common/Button/Loaderbutton'
import TopBar from '@/app/components/Common/Card/TopBar'
import SelectOption from '@/app/components/Common/Input/SelectOption'
import Customize from '@/app/components/Customize/Customize'
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'
import SkeletonLoader from '@/app/components/Skeleton/Skeleton'
import { fetchBot } from '@/app/components/store/slices/botIdSlice'
import { AdjustmentsHorizontalIcon, BoltIcon, ChatBubbleLeftIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
const page = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [pageSubLoading, setSubLoading] = useState(true);
    const [loading, setLoading] = useState(null)
    const [basicFormData, setBasicFormData] = useState({});
    const [botValue, setBotValue] = useState([]);
    const state = useSelector((state) => state.botId);
    const [selectedBot, setSelectedBot] = useState('Select');
    const dispatch = useDispatch();

    useEffect(() => {
        if (state.botData.data === null) {
            dispatch(fetchBot());
        }
        if (state.botData.data?.bots && state.botData.data?.widgets) {
            getAllBots();
        }
    }, [state.botData.data]);

    const getBotInfo = (id) => {
        getAllBotData([id]).then((res) => {
            let bot_res = res[0].data
            let payload = {
                agent_name: bot_res.agent_name,
                agent_title: bot_res.email_agent_title,
                email_introduction: bot_res.email_greeting.replace(/\\/g, '').replace(/"/g, '') || "",
                email_signOff: bot_res.email_farewell.replace(/\\/g, '').replace(/"/g, '') || "",
                customer_service_email: bot_res?.customer_service_email,
                agent_email_value: bot_res?.email ? true : false
            }
            let data = res[0].data;
            setBasicFormData((prev) => {
                return {
                    ...prev,
                    ...data,
                    ...payload
                };
            });
            setTimeout(() => {
                setPageLoading(false);
                setSubLoading(false);
            }, 2000);
        });
    };

    const getAllBots = () => {
        const getTitle = state.botData.data.bots.map(
            (element) => element.chat_title
        );
        const widgetCode = state.botData.data.widgets;
        const mergedArray = widgetCode.map((item, index) => {
            const title = getTitle[index];
            return {
                value: item.id,
                name: title
            };
        });
        setBotValue(mergedArray);
        setSelectedBot(mergedArray[0].value)
        getBotInfo(mergedArray[0].value);
    };

    const selectBotHandler = (id) => {
        setSelectedBot(id)
        // setSubLoading(true);
        setPageLoading(true);
        getBotInfo(id);
    };

    const DisablingButton = () => {
        const checkFormData = (keys) => {
            return keys.some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        };

        const tab0Keys = [
            'chat_title',
            'description',
            'customer_service_email',
            'chat_default_message',
            'customer_service_phone'
        ];
        return checkFormData(tab0Keys) || (!basicFormData['chat_suggestions'] || basicFormData['chat_suggestions'].length === 0);
    }

    const SubmitForm = () => {
        setLoading(true);
        let payload = {}
        payload = {
            ...basicFormData,
            logo: basicFormData.logo_file_name ? basicFormData.logo : "",
        };
        delete payload.payment_platform
        delete payload.ticketing_platform

        !payload.logo && delete payload.logo;
        !payload.email && delete payload.email;

        modifyBot(selectedBot, payload)
            .then((res) => {
                if (res?.status === 200 || res?.status === 201) {
                    setLoading(false);
                    dispatch(fetchBot());
                    getBotInfo(selectedBot)
                    successMessage("Changes successfully saved!")
                } else {
                    setLoading(false);
                    errorMessage("Unable to update!");
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                errorMessage("Unable to update!");
            });
    }

    return (
        <div style={{ whiteSpace: "normal" }}>
            <TopBar title={`Chat Settings`} icon={<ChatBubbleLeftIcon className="h-5 w-5 text-primary" />} />
            <div className="bg-white w-full m-auto border rounded-lg border-[#F0F0F1] mt-5">
                <>
                    {pageSubLoading ?
                        <div className={`py-4 block sm:flex justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1]`}>
                            <div className="flex items-start sm:items-center  gap-2">
                                <SkeletonLoader count={1} height={35} width={90} />
                            </div>
                            <div className="w-full grid grid-cols-2 sm:grid-cols-[10%,10%] justify-end" >
                                <SkeletonLoader count={1} height={35} width={100} />
                                <SkeletonLoader count={1} height={35} width={100} />
                            </div>
                        </div>
                        :
                        <div className={`w-full py-4 block sm:flex justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1]`}>
                            <div className="w-full sm:w-1/4 flex items-start sm:items-center  gap-2">
                                <AdjustmentsHorizontalIcon className="text-primary w-5" />
                                <p className="text-base font-medium text-[#151D23]">
                                    Select Bot
                                </p>
                            </div>
                            <div className="w-full sm:w-3/4 flex items-center mt-3 sm:mt-0 justify-between sm:justify-end gap-4">
                                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start flex-wrap" style={{ rowGap: "4px" }} >
                                    {botValue?.map((element, key) => (
                                        <button
                                            onClick={(e) => selectBotHandler(element.value)}
                                            key={key}
                                            className={`flex items-center gap-2 justify-center font-semibold ${element.value === selectedBot ? 'text-white bg-primary' : 'bg-white text-[#151D23]'} text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg  hover:opacity-60 mr-1 w-[120px] text-center`}
                                        > {element?.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    {pageLoading || state?.isLoading ?
                        <div className='mt-[50px] grid grid-cols-1 sm:grid-cols-[55%,45%] mx-auto gap-6 w-full sm:w-[92%] items-center pb-4'>
                            <div className='grid grid-cols-[47%,53%] gap-2 mx-auto w-full items-center'>
                                {[...Array(12)].map((ele) =>
                                    <>
                                        <div>  <SkeletonLoader count={1} height={18} width={"60%"} /></div>
                                        <div>  <SkeletonLoader count={1} height={33} width={"90%"} /></div>
                                    </>
                                )}
                            </div>

                            <div className='bg-[rgb(250, 249, 249)] shadow-md sm:w-[90%]'>
                                <div className='grid grid-cols-[10%,90%] items-center m-2 gap-4'>
                                    <div><SkeletonLoader circle={true} count={1} height={50} width={50} /></div>
                                    <div>
                                        <div>  <SkeletonLoader count={1} height={18} width={"30%"} /></div>
                                        <div> <SkeletonLoader count={1} height={22} width={"35%"} /></div>
                                    </div>
                                </div>
                                <hr className='text-gray' />
                                <div className='p-4 flex flex-col'>
                                    <div className='grid grid-cols-[10%,90%] items-center m-2 gap-4 '>
                                        <div>
                                            <SkeletonLoader circle={true} count={1} height={50} width={50} /></div>
                                        <div className=' rounded-xl border border-gray p-2 w-[70%]'>
                                            <SkeletonLoader count={1} height={10} width={"100%"} />
                                            <SkeletonLoader count={1} height={10} width={"100%"} />
                                            <SkeletonLoader count={1} height={10} width={"100%"} />
                                            <SkeletonLoader count={1} height={10} width={"30%"} />
                                        </div>

                                    </div>
                                    <div className=' self-end rounded-xl border border-gray p-2 w-[70%] mt-2'>
                                        <SkeletonLoader count={1} height={10} width={"100%"} />
                                        <SkeletonLoader count={1} height={10} width={"100%"} />
                                        <SkeletonLoader count={1} height={10} width={"100%"} />
                                        <SkeletonLoader count={1} height={10} width={"30%"} />
                                    </div>
                                    <div className='grid grid-cols-[10%,90%] items-center m-2 gap-4 '>
                                        <div>
                                            <SkeletonLoader circle={true} count={1} height={50} width={50} /></div>
                                        <div className=' rounded-xl border border-gray p-2 w-[70%]'>
                                            <SkeletonLoader count={1} height={10} width={"100%"} />
                                            <SkeletonLoader count={1} height={10} width={"100%"} />
                                            <SkeletonLoader count={1} height={10} width={"100%"} />
                                            <SkeletonLoader count={1} height={10} width={"30%"} />
                                        </div>

                                    </div>
                                </div>
                                <hr className='text-gray' />
                                <div className='w-[95%] mx-auto py-2'>
                                    <SkeletonLoader count={1} height={30} width={"100%"} />
                                </div>
                            </div>

                        </div>
                        :
                        <>
                            <Customize form={false} basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
                            <div className='flex justify-end items-center px-6 py-4'>
                                {
                                    loading ? (
                                        <LoaderButton />
                                    ) : (
                                        <>
                                            <Button
                                                type={"button"}
                                                className="inline-block rounded bg-primary mt-2 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                                disabled={DisablingButton()}
                                                onClick={(e) => SubmitForm()}
                                            >
                                                Save
                                            </Button>
                                        </>
                                    )}
                            </div>
                        </>

                    }

                    <ToastContainer />
                </>
            </div>
        </div>
    )
}

export default page