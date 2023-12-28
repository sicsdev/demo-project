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
import { getPermissionHelper } from '@/app/components/helper/returnPermissions'
import { fetchBot } from '@/app/components/store/slices/botIdSlice'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { AdjustmentsHorizontalIcon, CalendarDaysIcon, CheckIcon, ClipboardIcon, QrCodeIcon, InboxIcon, ArrowPathIcon, CheckCircleIcon,EnvelopeIcon } from '@heroicons/react/24/outline'
import StatusIndicator from '@/app/components/StatusIndicator/Status'
const page = () => {

    // Helpers / Selectors
    const dispatch = useDispatch();
    const state = useSelector((state) => state.botId);
    const user = useSelector((state) => state.user.data);

    // Local states
    const [pageLoading, setPageLoading] = useState(true);
    const [pageSubLoading, setPageSubLoading] = useState(true);
    const [isCopy, setIsCopy] = useState(false);
    const [loading, setLoading] = useState(null)
    const [driveLoad, setDriveLoad] = useState(false)
    const [basicFormData, setBasicFormData] = useState({});
    const [botValue, setBotValue] = useState([]);
    const [selectedBot, setSelectedBot] = useState('Select');
    const [selectedBotName, setSelectedBotName] = useState('Select');

    const [tab, setTab] = useState(1);

    useEffect(() => {
        if (state.botData.data === null) {
            dispatch(fetchBot());
        }
        if (state.botData.data?.bots && state.botData.data?.widgets) {
            getAllBots();
        }

    }, [state.botData.data]);

    useEffect(() => {
        if (user?.enterprise?.domain) { setTab(0) }
    }, [user?.enterprise?.domain])

    const getBotInfo = (id) => {
        getAllBotData([id]).then((res) => {
            let bot_res = res[0].data
            let payload = {
                agent_name: bot_res.agent_name,
                agent_title: bot_res.email_agent_title,
                email_greeting: bot_res.email_greeting.replace(/\\/g, '').replace(/"/g, '') || "",
                email_farewell: bot_res.email_farewell.replace(/\\/g, '').replace(/"/g, '') || "",
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
        setSelectedBotName(mergedArray[0].name)

        getBotInfo(mergedArray[0].value);
        setTimeout(() => {
            setPageLoading(false);
            setPageSubLoading(false);
        }, 300);
    };

    const selectBotHandler = (element) => {
        setSelectedBot(element.value)
        setSelectedBotName(element.name)
        setPageLoading(true);
        getBotInfo(element.value);
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

    const SubmitForm = async () => {
        let payload = {}
        payload = {
            agent_name: basicFormData.agent_name,
            email_agent_title: basicFormData.agent_title,
            email_greeting: basicFormData.email_greeting,
            email_farewell: basicFormData.email_farewell,
            email_prefix: basicFormData.email_prefix,
            email: basicFormData.email_prefix || 'support' +
                "@" +
                basicFormData.company_name +
                ".deflection.ai",
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
    const Submission = async (payloadData) => {
        setLoading(true);
        let payload = {}
        payload = {
            agent_name: payloadData.agent_name,
            email_agent_title: payloadData.agent_title,
            email_greeting: payloadData.email_greeting,
            email_farewell: payloadData.email_farewell,
            email_prefix: payloadData.email_prefix,
            email: payloadData.email_prefix || 'support' +
                "@" +
                payloadData.company_name +
                ".deflection.ai",
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
                    setDriveLoad(true)
                    setTimeout(() => {
                        setDriveLoad(false)
                    }, 2000);
                    dispatch(fetchBot());
                    getBotInfo(selectedBot)

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
      <TopBar
        loader={pageLoading}
        title={`Email Settings`}
        icon={<InboxIcon className="h-5 w-5 text-primary" />}
      />
      <div
        className={
          pageLoading
            ? " "
            : "border-b-2 border-border dark:border-gray-700 flex items-center justify-between"
        }
      >
        <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">
          {user && user?.enterprise?.domain !== "" && (
            <li
              className={` ${
                pageLoading
                  ? ""
                  : tab === 0
                  ? "boredractive"
                  : "boredrinactive hover:text-black"
              }`}
              onClick={() => {
                setTab(0);
              }}
            >
              {pageLoading ? (
                <SkeletonLoader
                  className="mr-2"
                  count={1}
                  height={30}
                  width={60}
                />
              ) : (
                <span
                  className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                  aria-current="page"
                >
                  Email Settings
                </span>
              )}
            </li>
          )}

          {getPermissionHelper("DNS SETTINGS TAB", user?.role) && (
            <li
              className={` ${
                pageLoading
                  ? ""
                  : tab === 1
                  ? "boredractive"
                  : "boredrinactive hover:text-black"
              }`}
              onClick={() => {
                setTab(1);
              }}
            >
              {pageLoading ? (
                <SkeletonLoader
                  className="mr-2"
                  count={1}
                  height={30}
                  width={60}
                />
              ) : (
                <span
                  className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                  aria-current="page"
                >
                  DNS Settings
                </span>
              )}
            </li>
          )}
        </ul>
      </div>

      {tab === 0 && (
        <div className="bg-white w-full    rounded-lg border-[#F0F0F1] mt-5 sm:max-w-[820px]">
          <div className="">
            {pageSubLoading ? (
              <div
                className={`py-4 block sm:flex justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1]`}
              >
                <div className="flex items-start sm:items-center  gap-2">
                  <SkeletonLoader count={1} height={35} width={90} />
                </div>
                <div className="w-full grid grid-cols-2 sm:grid-cols-[10%,10%] justify-end">
                  <SkeletonLoader count={1} height={35} width={100} />
                  {/* <SkeletonLoader count={1} height={35} width={100} /> */}
                </div>
              </div>
            ) : (
              <div className="w-full   border-[#F0F0F1] ">
                <div className=" p-4 sm:mx-4 bg-lowgray rounded-lg">
                  <h1 className="text-sm font-semibold flex items-center gap-2">
                    <EnvelopeIcon className="h-5 w-5"></EnvelopeIcon>
                    {user?.enterprise?.domain}{" "}
                  </h1>
                </div>

                <div
                  className={`block sm:flex justify-end  px-6  items-center gap-4 mt-3 sm:mt-[12px]`}
                >
                  <div className="w-full sm:w-1/4 flex items-start sm:items-center  gap-2">
                    <AdjustmentsHorizontalIcon className="text-primary w-5" />
                    <p className="text-base font-medium text-[#151D23]">
                      {botValue?.length > 1 ? "Select Bot" : "Edit Settings"}
                    </p>
                  </div>
                  <div className="w-full sm:w-3/4 flex items-center mt-3 sm:mt-0 justify-between sm:justify-end gap-4">
                    <div
                      className="w-full sm:w-auto flex items-center overflow-x-scroll sm:overflow-x-hidden  schedule justify-end sm:justify-start sm:flex-wrap"
                      style={{ rowGap: "4px" }}
                    >
                      {botValue?.length > 1 &&
                        botValue?.map((element, key) => (
                          <button
                            onClick={() => selectBotHandler(element)}
                            key={key}
                            className={`flex items-center gap-2 justify-center font-semibold ${
                              element.value === selectedBot
                                ? "text-white bg-primary"
                                : "bg-white text-[#151D23]"
                            } text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[auto] text-center`}
                          >
                            {" "}
                            {element?.name}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {pageLoading || state?.isLoading ? (
              <div className="px-6 py-4">
                <div className="mt-3">
                  <SkeletonLoader count={1} height={20} width={90} />
                  <SkeletonLoader count={1} height={35} width={"100%"} />
                </div>
                <div className="mt-3">
                  <SkeletonLoader count={1} height={20} width={90} />
                  <SkeletonLoader count={1} height={35} width={"100%"} />
                </div>
                <div className="mt-3">
                  <SkeletonLoader count={1} height={20} width={90} />
                  <SkeletonLoader count={1} height={35} width={"100%"} />
                </div>
                <div className="mt-3">
                  <SkeletonLoader count={1} height={20} width={90} />
                  <SkeletonLoader count={1} height={35} width={"100%"} />
                </div>
                <div className="mt-3">
                  <SkeletonLoader count={1} height={20} width={90} />
                  <SkeletonLoader count={1} height={35} width={"100%"} />
                </div>
              </div>
            ) : (
              <>
                {user?.enterprise && !user.enterprise.domain && (
                  <div className="flex justify-center text-primary my-5">
                    <small className="text-center text-xs m-auto">
                      It appears your domain has not been configured yet. Please
                      visit the{" "}
                      <a
                        className="cursor-pointer underline"
                        onClick={() => setTab(1)}
                      >
                        DNS Settings
                      </a>{" "}
                      tab to configure your domain.
                    </small>
                  </div>
                )}
                <div className="p-4">
                  {user && user?.enterprise?.domain !== "" && (
                    <>
                      <div
                        className=" mt-4  p-3 sm:py-[1.75rem] sm:px-[22px] rounded-lg my-4"
                        style={{
                          border: "1px solid #d5dbe7",
                        }}
                      >
                        <div className="flex flex-col  xl:flex-row justify-between">
                          <h3 className="text-sm font-semibold flex items-center ">
                            {user?.enterprise?.domain}{" "}
                          </h3>

                          <div className="">
                            {isCopy == true ? (
                              <>
                                <span className="mt-[20px] flex items-center text-sm">
                                  <CheckIcon className="h-4 w-4 " />
                                  <small className="">Copied!</small>
                                </span>{" "}
                              </>
                            ) : (
                              <CopyToClipboard
                                text={`${user?.enterprise?.domain}`}
                                onCopy={() => {
                                  setIsCopy(true);
                                  setTimeout(() => {
                                    setIsCopy(false);
                                  }, 3000);
                                }}
                              >
                                <button
                                  type={"button"}
                                  className="border-none p-0  flex gap-1 items-center text-sm"
                                >
                                  <ClipboardIcon className=" h-4 w-4" />{" "}
                                  <small className="">Copy</small>
                                </button>
                              </CopyToClipboard>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="">
                     <EmailAgentSetting selectedBot={selectedBotName} basicFormData={basicFormData} setBasicFormData={setBasicFormData} Submission={submissonForm} />
                                    {/* )} */}
                                    <EmailConfig selectedBot={selectedBotName} basicFormData={basicFormData} setBasicFormData={setBasicFormData} Submission={submissonForm} />

                                    <StatusIndicator driveLoad={driveLoad} loading={loading} />
                  </div>

                
                  <ToastContainer />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {tab == 1 && <EmailHandle />}
    </div>
  );
};

export default page;
