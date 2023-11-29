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
import EmailHandle from '@/app/components/VerifyEmail/EmailHaandle'
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
    const [tab, setTab] = useState(0);
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
                email_prefix: bot_res.email.split('@')[0],
                email: bot_res.email || 'support@' + bot_res.enterprise.domain || 'support@' + bot_res.enterprise?.slug_domain 
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
        setTimeout(() => {
            setPageLoading(false);
            setPageSubLoading(false);
        }, 300);
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
            email: basicFormData.email_prefix || 'support' +
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
            domain: basicFormData.company_name + '.tickets-docker.withtempo.com',
        });
        if (user && user?.enterprise?.domain === '') {
            const domains = await enterpriseDomainInitialize({
                domain: basicFormData.company_name + '.tickets-docker.withtempo.com',
            });
        }


        if (response_companyname.status === 200) {
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
            email: basicFormData.email_prefix || 'support' +
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
            <div className={pageLoading ? " " : "border-b-2 border-border dark:border-gray-700 flex items-center justify-between"}>
                <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">

                    <li className={` ${pageLoading ? "" : tab === 0 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(0) }}>
                        {pageLoading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                            :
                            <span
                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                aria-current="page"
                            >
                                Email Settings
                            </span>
                        }
                    </li>
                    <li className={` ${pageLoading ? "" : tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(1) }}>
                        {pageLoading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                            :
                            <span
                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                aria-current="page"
                            >
                                DNS Settings
                            </span>
                        }
                    </li>



                </ul>
            </div>

            {tab === 0 && (
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
                                        {botValue?.length > 1 ? 'Select Bot' : 'Edit Settings'}
                                    </p>
                                </div>
                                <div className="w-full sm:w-3/4 flex items-center mt-3 sm:mt-0 justify-between sm:justify-end gap-4">
                                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start flex-wrap" style={{ rowGap: "4px" }} >
                                        {botValue?.length > 1 && botValue?.map((element, key) => (
                                            <button
                                                onClick={(e) => selectBotHandler(element.value)}
                                                key={key}
                                                className={`flex items-center gap-2 justify-center font-semibold ${element.value === selectedBot ? 'text-white bg-primary' : 'bg-white text-[#151D23]'} text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[120px] text-center`}
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
                                {user && user?.enterprise?.domain === '' ?
                                    <Button
                                        type={"button"}
                                        className="inline-block rounded bg-primary mt-2 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                        disabled={DisablingButton() || loading}
                                        onClick={(e) => SubmitForm()}
                                    >
                                        {loading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                            <span>Loading...</span> </> : "Save"}
                                    </Button>
                                    :
                                    <Button
                                        type={"button"}
                                        className="inline-block rounded bg-primary mt-2 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                        disabled={DisablingButton1() || loading}
                                        onClick={(e) => SubmitForm()}
                                    >
                                        {loading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                            <span>Loading...</span> </> : "Save"}
                                    </Button>
                                }
                            </div>
                            <ToastContainer />
                        </>
                    }
                </div>
            )}
            {tab == 1 && <EmailHandle />}
        </div>
    )
}

export default page