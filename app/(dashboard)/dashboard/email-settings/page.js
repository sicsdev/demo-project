'use client'
import { getAllBotData, modifyBot } from '@/app/API/pages/Bot'
import { createEnterpriseAccount, enterpriseDomainInitialize } from '@/app/API/pages/EnterpriseService'
import Button from '@/app/components/Common/Button/Button'
import LoaderButton from '@/app/components/Common/Button/Loaderbutton'
import TopBar from '@/app/components/Common/Card/TopBar'
import SelectOption from '@/app/components/Common/Input/SelectOption'
import TextField from '@/app/components/Common/Input/TextField'
import Customize from '@/app/components/Customize/Customize'
import EmailAgentSetting from '@/app/components/EmailAgentSetting/EmailAgentSetting'
import EmailConfig from '@/app/components/EmailConfig/EmailConfig'
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'
import SkeletonLoader from '@/app/components/Skeleton/Skeleton'
import { fetchBot } from '@/app/components/store/slices/botIdSlice'
import { AdjustmentsHorizontalIcon, CheckIcon, ClipboardIcon, InboxArrowDownIcon, InboxIcon, QrCodeIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
const page = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [pageSubLoading, setPageSubLoading] = useState(true);
    const [isCopy, setIsCopy] = useState(false);
    const [loading, setLoading] = useState(null)
    const [basicFormData, setBasicFormData] = useState({});
    const [botValue, setBotValue] = useState([]);
    const state = useSelector((state) => state.botId);
    const user = useSelector((state) => state.user.data);
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
                agent_email_value: bot_res?.email ? true : false,

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
                setPageSubLoading(false);
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
        setTimeout(() => {
            setPageLoading(false);
            setPageSubLoading(false);
        }, 2000);
    };

    const selectBotHandler = (id) => {
        setSelectedBot(id)
        setPageLoading(true);
        getBotInfo(id);
    };

    const DisablingButton = () => {
        const checkFormData = (keys) => {
            return keys.some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        };

        const tab0Keys = [
            'agent_title',
            'email_introduction',
            'email_signOff',
            'email',
            "email_prefix",
            "custom_email",
            "company_name"
        ];
        return checkFormData(tab0Keys) || (!basicFormData['agent_name'] || basicFormData['agent_name'].length === 0);
    }


    const DisablingButton1 = () => {
        const checkFormData = (keys) => {
            return keys.some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        };
        const tab0Keys = [
            'agent_title',
            'email_introduction',
            'email_signOff',
        ];
        return checkFormData(tab0Keys) || (!basicFormData['agent_name'] || basicFormData['agent_name'].length === 0);
    }


    const SubmitForm = async () => {
        setLoading(true);
        let payload = {}
        payload = {
            agent_name: basicFormData.agent_name,
            email_agent_title: basicFormData.agent_title,
            email_greeting: basicFormData.email_introduction,
            email_farewell: basicFormData.email_signOff,
            email: basicFormData.email_prefix +
                "@" +
                basicFormData.company_name +
                ".gettempo.ai",
        }
        setBasicFormData((prev) => {
            return {
                ...prev,
                agent_email_value: true
            }
        })

        !payload.logo && delete payload.logo;
        !payload.email && delete payload.email;
        const response_companyname = await createEnterpriseAccount({
            slug_domain: basicFormData.company_name,
        });
        const domains = await enterpriseDomainInitialize({
            slug_domain: basicFormData.company_name,
        });
        if (response_companyname.status === 200 && domains.status === 200) {
            modifyBot(selectedBot, payload)
                .then(async (res) => {
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
        } else {
            console.log(err);
            setLoading(false);
            errorMessage("Unable to update!");
        }
    }
    const SubmitForm1 = async () => {
        setLoading(true);
        let payload = {}
        payload = {
            agent_name: basicFormData.agent_name,
            email_agent_title: basicFormData.agent_title,
            email_greeting: basicFormData.email_introduction,
            email_farewell: basicFormData.email_signOff,
            email: basicFormData.email_prefix +
                "@" +
                basicFormData.company_name +
                ".gettempo.ai",
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
            .then(async (res) => {
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
            <TopBar title={`Email Settings`} icon={<InboxIcon className="h-5 w-5 text-primary" />} />
            <div className="bg-white w-full  m-auto border rounded-lg border-[#F0F0F1] mt-5 sm:max-w-[750px]">
                {
                    pageSubLoading ?
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
                        <div className={`w-full py-4 block sm:flex justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1] `}>
                            <div className="w-full sm:w-1/4 flex items-start sm:items-center  gap-2">
                                <AdjustmentsHorizontalIcon className="text-primary w-5" />
                                <p className="text-base font-medium text-[#151D23]">
                                    {botValue?.length > 1 ? 'Edit Settings' : 'Select Bot'}
                                </p>
                            </div>
                            <div className="w-full sm:w-3/4 flex items-center mt-3 sm:mt-0 justify-between sm:justify-end gap-4">
                                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start flex-wrap" style={{ rowGap: "4px" }} >
                                    {botValue?.length > 1 && botValue?.map((element, key) => (
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
                    <div className='px-6 py-4'>
                        <div className='mt-3'>
                            <SkeletonLoader count={1} height={20} width={90} />
                            <SkeletonLoader count={1} height={35} width={'100%'} />
                        </div>
                        <div className='mt-3'>
                            <SkeletonLoader count={1} height={20} width={90} />
                            <SkeletonLoader count={1} height={35} width={'100%'} />
                        </div>
                        <div className='mt-3'>
                            <SkeletonLoader count={1} height={20} width={90} />
                            <SkeletonLoader count={1} height={35} width={'100%'} />
                        </div>
                        <div className='mt-3'>
                            <SkeletonLoader count={1} height={20} width={90} />
                            <SkeletonLoader count={1} height={35} width={'100%'} />
                        </div>
                        <div className='mt-3'>
                            <SkeletonLoader count={1} height={20} width={90} />
                            <SkeletonLoader count={1} height={35} width={'100%'} />
                        </div>
                    </div> :
                    <>

                        <>
                            <div className="flex items-center justify-between gap-1 px-6 mt-4">
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
                                    placeholder={"Set Agent Email"}
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
                        <div className='px-6'>
                            {user && user?.enterprise?.domain === '' && (
                                <EmailAgentSetting basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
                            )}
                            <EmailConfig basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
                        </div>
                        <div className='flex justify-end items-center px-6 py-4'>
                            {user && user?.enterprise?.slug_domain === '' ?
                                <Button
                                    type={"button"}
                                    className="inline-block rounded bg-primary mt-2 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                    disabled={DisablingButton() || loading}
                                    onClick={(e) => SubmitForm()}
                                >
                                    {loading ? "Loading..." : "Save"}
                                </Button>
                                :
                                <Button
                                    type={"button"}
                                    className="inline-block rounded bg-primary mt-2 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                    disabled={DisablingButton1() || loading}
                                    onClick={(e) => SubmitForm()}
                                >
                                    {loading ? "Loading..." : "Save"}
                                </Button>
                            }
                        </div>
                        <ToastContainer />
                    </>
                }
            </div>
        </div>
    )
}

export default page