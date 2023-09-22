'use client'
import { getAllBotData, modifyBot } from '@/app/API/pages/Bot'
import Button from '@/app/components/Common/Button/Button'
import LoaderButton from '@/app/components/Common/Button/Loaderbutton'
import TopBar from '@/app/components/Common/Card/TopBar'
import SelectOption from '@/app/components/Common/Input/SelectOption'
import TextField from '@/app/components/Common/Input/TextField'
import Customize from '@/app/components/Customize/Customize'
import EmailConfig from '@/app/components/EmailConfig/EmailConfig'
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'
import SkeletonLoader from '@/app/components/Skeleton/Skeleton'
import { fetchBot } from '@/app/components/store/slices/botIdSlice'
import { CheckIcon, ClipboardIcon, QrCodeIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
const page = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [isCopy, setIsCopy] = useState(false);
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
        setPageLoading(false);
    };

    const handleInputValues = (e) => {
        setPageLoading(true);
        const { value } = e.target;
        setSelectedBot(value)
        getBotInfo(value);
    };

    const DisablingButton = () => {
        const checkFormData = (keys) => {
            return keys.some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        };

        const tab0Keys = [
            'agent_title',
            'email_introduction',
            'email_signOff',
            'email'
        ];
        return checkFormData(tab0Keys) || (!basicFormData['chat_suggestions'] || basicFormData['chat_suggestions'].length === 0);
    }

    const SubmitForm = () => {
        setLoading(true);
        let payload = {}
        payload = {
            agent_name: basicFormData.agent_name,
            email_agent_title: basicFormData.agent_title,
            email_greeting: basicFormData.email_introduction,
            email_farewell: basicFormData.email_signOff,
            email: basicFormData.email
        }
        setBasicFormData((prev) => {
            return {
                ...prev,
                agent_email_value: true
            }
        })

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
            <TopBar title={`Email Settings`} icon={<WrenchScrewdriverIcon className="h-5 w-5 text-primary" />} />
            <div className="bg-white w-full  m-auto border rounded-lg border-[#F0F0F1] mt-5 p-4">
                {
                    (
                        pageLoading == true || state?.isLoading == true) ? (
                        <>
                            <SkeletonLoader width={"80%"} />
                            <div>
                                {[...Array(6)].map((_, index) => (
                                    <>
                                        <div className="mt-3">
                                            <SkeletonLoader count={1} height={10} width={150} />
                                            <SkeletonLoader count={1} height={30} width="100%" />
                                        </div>
                                        <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>
                                    </>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="block sm:flex justify-center gap-5">
                                <div className="mb-4 w-full">
                                    <SelectOption
                                        onChange={handleInputValues}
                                        value={selectedBot}
                                        name="bot"
                                        values={botValue}
                                        title={<h3 className="text-sm my-4 font-semibold">Select Bot</h3>}
                                        id={"bots"}
                                        className="py-3"
                                        error={""}
                                        showOption={false}
                                    />
                                </div>
                            </div>
                            <>
                                <div className="my-2 flex items-center justify-between gap-1">



                                    <TextField
                                        value={basicFormData?.email}
                                        name="email"
                                        className="py-3 mt-1"
                                        labelClassName={`${basicFormData?.agent_email_value === true ? 'w-[95%]' : 'w-full'}`}
                                        title={
                                            <div className="flex items-center gap-2 w-[150px]">
                                                <span>Agent Email</span>{" "}
                                            </div>
                                        }
                                        placeholder={"Email"}
                                        onChange={(e) => {
                                            setBasicFormData((prev) => {
                                                return { ...prev, email: e.target.value };
                                            })
                                        }}
                                        type={"text"}
                                        id={"agent_title"}
                                        disabled={basicFormData?.agent_email_value === true}
                                        error={""}
                                    />
                                    {basicFormData?.agent_email_value === true && (
                                        <div className=''>
                                            {isCopy == true ? (
                                                <>
                                                    <span className="mt-[20px] flex items-center text-sm">
                                                        <CheckIcon className="h-4 w-4 " />
                                                        <small className=''>Copied!</small>
                                                    </span>{" "}
                                                </>
                                            ) : (
                                                <CopyToClipboard
                                                    text={`${basicFormData.email}`}
                                                    onCopy={() => {
                                                        setIsCopy(true);
                                                        setTimeout(() => {
                                                            setIsCopy(false);
                                                        }, 3000);
                                                    }}
                                                >
                                                    <button
                                                        type={"button"}
                                                        className="border-none p-0 mt-[20px] flex gap-1 items-center text-sm"
                                                    >
                                                        <ClipboardIcon className=" h-4 w-4" /> <small className=''>Copy</small>
                                                    </button>
                                                </CopyToClipboard>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                            <EmailConfig basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
                            <div className='flex justify-end items-center'>
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
                            <ToastContainer />
                        </>
                    )}
            </div>
        </div>
    )
}

export default page