'use client'
import { getAllBotData, modifyBot } from '@/app/API/pages/Bot'
import Button from '@/app/components/Common/Button/Button'
import LoaderButton from '@/app/components/Common/Button/Loaderbutton'
import TopBar from '@/app/components/Common/Card/TopBar'
import Schedule from '@/app/components/Customize/Schedule'
import EmailConfig from '@/app/components/EmailConfig/EmailConfig'
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'
import SkeletonLoader from '@/app/components/Skeleton/Skeleton'
import { fetchBot } from '@/app/components/store/slices/botIdSlice'
import { AdjustmentsHorizontalIcon, CalendarDaysIcon, CheckIcon, ClipboardIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
const page = () => {
    const [driveLoad, setDriveLoad] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [pageSubLoading, setSubLoading] = useState(true);
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

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
            const sortedData = Object.entries(schedule)
                .sort(([a], [b]) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b))
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {});

            schedule ? delete schedule.updatedSchedule : scheduleData
            setScheduleData(sortedData)
            setTimeout(() => {
                setPageLoading(false);
                setSubLoading(false);
            }, 300);
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
        mergedArray.sort((a, b) => a.name.localeCompare(b.name));
        setBotValue(mergedArray);
        setSelectedBot(mergedArray[0].value)
        getBotInfo(mergedArray[0].value);
    };

    const selectBotHandler = (id) => {
        setSelectedBot(id)
        setPageLoading(true)
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
    const [typingTimeout, setTypingTimeout] = useState(null)
    const submissonForm = (formattedValue) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        const newTypingTimeout = setTimeout(() => {
            Submission(formattedValue)
        }, 2000);
        setTypingTimeout(newTypingTimeout); // Assuming setTypingTimeout is the setter for typingTimeout state
    }
    const Submission = (schedule) => {
        setLoading(true);
        let payload = {}
        payload = { schedule }

        modifyBot(selectedBot, payload)
            .then((res) => {
                if (res?.status === 200 || res?.status === 201) {
                    setLoading(false);
                    dispatch(fetchBot());
                    getBotInfo(selectedBot)
                    setDriveLoad(true)
                    setTimeout(() => {
                        setDriveLoad(false)
                    }, 2000);
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
            <TopBar loader={pageSubLoading} title={`Scheduling Settings`} icon={<CalendarDaysIcon className="h-5 w-5 text-primary" />} />
            <div className="bg-white w-full   border rounded-lg border-[#F0F0F1] mt-5 sm:w-[750px]">

                {pageSubLoading ?
                    <div className={`py-4 block sm:flex justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1]`}>
                        <div className="flex items-start sm:items-center  gap-2">
                            <SkeletonLoader count={1} height={35} width={90} />
                        </div>
                        <div className="w-full grid grid-cols-2 sm:grid-cols-[10%,10%] justify-end" >
                            <SkeletonLoader count={1} height={35} width={100} />
                            {/* <SkeletonLoader count={1} height={35} width={100} /> */}
                        </div>
                    </div>
                    :
                    <div className={`w-full py-4 block sm:flex justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1]`}>
                        <div className="w-full sm:w-1/4 flex items-start sm:items-center  gap-2">
                            <AdjustmentsHorizontalIcon className="text-primary w-5" />
                            <p className="text-base font-medium text-[#151D23]">
                                {botValue?.length > 1 ? 'Select Bot' : 'Edit Settings'}
                            </p>
                        </div>
                        <div className="w-full sm:w-3/4 flex items-center mt-3 sm:mt-0 justify-between sm:justify-end gap-4">
                            <div className="w-full sm:w-auto flex items-center overflow-x-scroll schedule sm:overflow-x-hidden justify-between sm:justify-start sm:flex-wrap" style={{ rowGap: "4px" }} >
                                {botValue?.length > 1 && botValue?.map((element, key) => (
                                    <button
                                        onClick={(e) => selectBotHandler(element.value)}
                                        key={key}
                                        className={`flex items-center gap-2 justify-center font-semibold ${element.value === selectedBot ? 'text-white bg-primary' : 'bg-white text-[#151D23]'} text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[auto] text-center`}
                                    > {element.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                }

                {
                    (
                        pageLoading == true || state?.isLoading == true) ? (
                        <div>
                            <div className='p-3 lg:w-1/2 '>
                                <div>

                                    <SkeletonLoader count={1} height={20} width={"30%"} />
                                    {[...Array(7)].map((_, index) => (
                                        <>
                                            <div className="flex m-2 my-3 items-center justify-around gap-3">
                                                <div className='w-[50px] flex items-center gap-3 col-span-1'>
                                                    <SkeletonLoader width={30} />
                                                </div>
                                                <div className="flex justify-center items-center gap-3">
                                                    <SkeletonLoader height={35} width={80} />
                                                    <SkeletonLoader height={35} width={80} />
                                                    <SkeletonLoader height={20} width={20} />
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

                    ) : (
                        <>

                            <Schedule basicFormData={scheduleData} setBasicFormData={setScheduleData} Submission={submissonForm} driveLoad={driveLoad} setDriveLoad={setDriveLoad} loading={loading} setLoading={setLoading} />
                            {/* <div className='flex justify-end items-center px-6 py-4'>
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
                            </div> */}
                            <ToastContainer />
                        </>
                    )}
            </div>
        </div>
    )
}

export default page