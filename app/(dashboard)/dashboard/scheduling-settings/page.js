'use client'
import { getAllBotData, modifyBot } from '@/app/API/pages/Bot'
import Button from '@/app/components/Common/Button/Button'
import LoaderButton from '@/app/components/Common/Button/Loaderbutton'
import TopBar from '@/app/components/Common/Card/TopBar'
import SelectOption from '@/app/components/Common/Input/SelectOption'
import TextField from '@/app/components/Common/Input/TextField'
import Customize from '@/app/components/Customize/Customize'
import Schedule from '@/app/components/Customize/Schedule'
import EmailConfig from '@/app/components/EmailConfig/EmailConfig'
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'
import SkeletonLoader from '@/app/components/Skeleton/Skeleton'
import { fetchBot } from '@/app/components/store/slices/botIdSlice'
import { CalendarDaysIcon, CheckIcon, ClipboardIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
const page = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [isCopy, setIsCopy] = useState(false);
    const [loading, setLoading] = useState(null)
    const [botValue, setBotValue] = useState([]);
    const state = useSelector((state) => state.botId);
    const [selectedBot, setSelectedBot] = useState('Select');
    const dispatch = useDispatch();
    const [scheduleData, setScheduleData] = useState({
        Monday: [{ start: "00:00", end: "23:59" }],
        Tuesday: [{ start: "00:00", end: "23:59" }],
        Wednesday: [{ start: "00:00", end: "23:59" }],
        Thursday: [{ start: "00:00", end: "23:59" }],
        Friday: [{ start: "00:00", end: "23:59" }],
        Saturday: [{ start: "00:00", end: "23:59" }],
        Sunday: [{ start: "00:00", end: "23:59" }]
    })

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

            let schedule = res[0].data?.schedule
            schedule ? delete schedule.updatedSchedule : scheduleData
            setScheduleData(schedule)
            setPageLoading(false);
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
        setPageLoading(true);
        getBotInfo(id);
    };

    const SubmitForm = () => {
        setLoading(true);
        let payload = {}
        payload = { schedule: scheduleData }

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
            <TopBar title={`Scheduling Settings`} icon={<CalendarDaysIcon className="h-5 w-5 text-primary" />} />
            <div className="bg-white w-full  m-auto border rounded-lg border-[#F0F0F1] mt-5 p-4">
                {
                    (
                        pageLoading == true || state?.isLoading == true) ? (
                        <>
                            <SkeletonLoader width={"80%"} />
                            <div>
                                <div className='mt-5 border border-3 border-gray rounded p-3 lg:w-1/2 '>
                                    <SkeletonLoader width={100} />
                                    <div>
                                        {[...Array(7)].map((_, index) => (
                                            <>
                                                <div className="flex m-2 my-2 items-center justify-around gap-3">
                                                    <div className='w-[50px] flex items-center gap-3 col-span-1'>
                                                        <SkeletonLoader width={100} />
                                                    </div>
                                                    <div className="lg:flex flex items-center gap-3">
                                                        <div className='col-span-1 w-[210px] sm:w-[270px]'>
                                                            <SkeletonLoader width={100} />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <SkeletonLoader width={20} />
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="text-sm my-2 font-semibold">Select Bot</h3>
                            <div className="mb-4 w-full flex items-center justify-between sm:justify-start flex-wrap" >
                                {botValue?.map((element, key) => (
                                    <button
                                        onClick={(e) => selectBotHandler(element.value)}
                                        key={key}
                                        className={`flex items-center gap-2 justify-center font-semibold ${element.value === selectedBot ? 'text-white bg-primary' : 'bg-white text-[#151D23]'}  text-xs px-[2px] sm:px-5 pb-2 pt-2 border-[#F0F0F1] leading-normal  disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg  hover:opacity-60 mr-2 my-1 w-[45%] sm:w-auto`}
                                    > {element?.name}
                                    </button>
                                ))}
                                {/* <SelectOption
                                        onChange={handleInputValues}
                                        value={selectedBot}
                                        name="bot"
                                        values={botValue}
                                        title={<h3 className="text-sm my-4 font-semibold">Select Bot</h3>}
                                        id={"bots"}
                                        className="py-3"
                                        error={""}
                                        showOption={false}
                                    /> */}
                            </div>
                            <Schedule basicFormData={scheduleData} setBasicFormData={setScheduleData} />
                            <div className='flex justify-end items-center'>
                                {
                                    loading ? (
                                        <LoaderButton />
                                    ) : (
                                        <>
                                            <Button
                                                type={"button"}
                                                className="inline-block rounded bg-primary mt-2 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                                onClick={(e) => SubmitForm()}
                                            >
                                                Save
                                            </Button>
                                        </>
                                    )}
                            </div>
                            <ToastContainer />
                        </>
                    )}
            </div>
        </div>
    )
}

export default page