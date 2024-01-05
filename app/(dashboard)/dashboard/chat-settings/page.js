"use client";
import { getAllBotData, modifyBot } from "@/app/API/pages/Bot";
import Button from "@/app/components/Common/Button/Button";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";
import TopBar from "@/app/components/Common/Card/TopBar";
import SelectOption from "@/app/components/Common/Input/SelectOption";
import Customize from "@/app/components/Customize/Customize";
import { DebounceSubmitForm } from "@/app/components/Debouncing/Deboucing";
import {
  errorMessage,
  successMessage,
} from "@/app/components/Messages/Messages";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import StatusIndicator from "@/app/components/StatusIndicator/Status";
import EmailHandle from "@/app/components/VerifyEmail/EmailHaandle";
import { fetchBot } from "@/app/components/store/slices/botIdSlice";
import {
  AdjustmentsHorizontalIcon,
  BoltIcon,
  ChatBubbleLeftIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
const page = () => {
  const userState = useSelector((state) => state.user.data);
  const [pageLoading, setPageLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [pageSubLoading, setSubLoading] = useState(true);
  const [loading, setLoading] = useState(null);
  const [basicFormData, setBasicFormData] = useState({});
  const [botValue, setBotValue] = useState([]);
  const state = useSelector((state) => state.botId);
  const [selectedBot, setSelectedBot] = useState("Select");
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();
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
      let bot_res = res[0].data;
      let payload = {
        agent_name: bot_res.agent_name,
        agent_title: bot_res.email_agent_title,
        email_introduction:
          bot_res.email_greeting.replace(/\\/g, "").replace(/"/g, "") || "",
        email_signOff:
          bot_res.email_farewell.replace(/\\/g, "").replace(/"/g, "") || "",
        customer_service_email: bot_res?.customer_service_email,
        agent_email_value: bot_res?.email ? true : false,
      };
      let data = res[0].data;
      setBasicFormData((prev) => {
        return {
          ...prev,
          ...data,
          ...payload,
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
        name: title,
      };
    });

    mergedArray.sort((a, b) => a.name.localeCompare(b.name));
    setBotValue(mergedArray);
    if (search) {
      selectBotHandler(search);
    } else {
      setSelectedBot(mergedArray[0].value);
      getBotInfo(mergedArray[0].value);
    }
  };

  const selectBotHandler = (id) => {
    setSelectedBot(id);
    router.push(`/dashboard/chat-settings?id=${id}`);
    setPageLoading(true);
    getBotInfo(id);
  };

  const DisablingButton = () => {
    const checkFormData = (keys) => {
      return keys.some(
        (key) => !basicFormData[key] || basicFormData[key].trim() === ""
      );
    };

    const tab0Keys = [
      "chat_title",
      "customer_service_email",
      "chat_default_message",
    ];
    return checkFormData(tab0Keys) || !basicFormData["chat_suggestions"];
  };

  const SubmitForm = () => {
    setLoading(true);
    let payload = {};
    payload = {
      ...basicFormData,
      logo: basicFormData.logo_file_name ? basicFormData.logo : "",
    };
    delete payload.payment_platform;
    delete payload.ticketing_platform;
    delete payload.cancellation_tolerance;

    !payload.logo && delete payload.logo;
    // !payload.description && delete payload.description;
    if (payload["category"] === "") {
      payload["category"] = "standard";
    }
    !payload.email && delete payload.email;

    modifyBot(selectedBot, payload)
      .then((res) => {
        if (res?.status === 200 || res?.status === 201) {
          setLoading(false);
          dispatch(fetchBot());
          getBotInfo(selectedBot);
          successMessage("Changes successfully saved!");
          router.push(`/dashboard`);
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
  };

  const [typingTimeout, setTypingTimeout] = useState(null);
  const [driveLoad, setDriveLoad] = useState(false);

  const Submission = async (formattedValue) => {
    setLoading(true);
    let payload = {};
    payload = {
      ...formattedValue,
      logo: formattedValue.logo_file_name ? formattedValue.logo : "",
    };
    delete payload.payment_platform;
    delete payload.ticketing_platform;
    delete payload.cancellation_tolerance;

    !payload.logo && delete payload.logo;
    // !payload.description && delete payload.description;
    if (payload["category"] === "") {
      payload["category"] = "standard";
    }
    !payload.email && delete payload.email;

    modifyBot(selectedBot, payload)
      .then((res) => {
        if (res?.status === 200 || res?.status === 201) {
          setLoading(false);
          setDriveLoad(true);
          setTimeout(() => {
            setDriveLoad(false);
          }, 2000);
          // successMessage("Changes successfully saved!");
          // router.push(`/dashboard`);
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
  };

  const SubmissionForm = (formattedValue) => {
    DebounceSubmitForm(
      formattedValue,
      Submission,
      setTypingTimeout,
      typingTimeout
    );
  };

  return (
    <div style={{ whiteSpace: "normal" }}>
      <TopBar
        loader={pageSubLoading}
        title={`Chat`}
        icon={<ChatBubbleLeftIcon className="h-5 w-5 text-primary" />}
      />
      {tab === 0 && (
        <div className="bg-white w-full m-auto border rounded-lg border-[#F0F0F1] mt-5">
          <>
            {tab === 0 && (
              <>
                {pageSubLoading ? (
                  <div
                    className={`py-4 block sm:flex justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1]`}
                  >
                    <div className="flex items-start sm:items-center  gap-2">
                      <SkeletonLoader count={1} height={35} width={90} />
                    </div>
                    <div className="w-full grid grid-cols-2 sm:grid-cols-[10%,10%] justify-end">
                      <SkeletonLoader count={1} height={35} width={100} />
                      <SkeletonLoader count={1} height={35} width={100} />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full py-4 block sm:flex justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1]`}
                  >
                    <div className="w-full sm:w-1/4 flex items-start sm:items-center  gap-2">
                      <AdjustmentsHorizontalIcon className="text-primary w-5" />
                      <p className="text-base font-medium text-[#151D23]">
                        {botValue?.length > 1 ? "Select Bot" : "Edit Settings"}
                      </p>
                    </div>
                    <div className="w-full sm:w-3/4 flex items-center mt-3 sm:mt-0 justify-between sm:justify-end gap-4">
                      <div
                        className="w-full sm:w-auto flex items-center justify-between sm:justify-start flex-wrap"
                        style={{ rowGap: "4px" }}
                      >
                        {botValue?.length > 1 &&
                          botValue?.map((element, key) => (
                            <button
                              onClick={(e) => selectBotHandler(element.value)}
                              key={key}
                              className={`flex items-center gap-2 justify-center font-semibold ${
                                element.value === selectedBot
                                  ? "text-white bg-primary"
                                  : "bg-white text-[#151D23]"
                              } text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[120px] text-center`}
                            >
                              {" "}
                              {element?.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {pageLoading ? (
              <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-[55%,45%] mx-auto gap-6 w-full sm:w-[92%] items-center pb-4 px-2 sm:px-0">
                <div className="grid grid-cols-[47%,53%] gap-2 mx-auto w-full items-center">
                  {[...Array(12)].map((ele) => (
                    <>
                      <div>
                        {" "}
                        <SkeletonLoader count={1} height={18} width={"60%"} />
                      </div>
                      <div>
                        {" "}
                        <SkeletonLoader count={1} height={33} width={"90%"} />
                      </div>
                    </>
                  ))}
                </div>

                <div className="bg-[rgb(250, 249, 249)] shadow-md sm:w-[90%]">
                  <div className="grid grid-cols-[10%,90%] items-center m-2 gap-4">
                    <div>
                      <SkeletonLoader
                        circle={true}
                        count={1}
                        height={50}
                        width={50}
                      />
                    </div>
                    <div>
                      <div>
                        {" "}
                        <SkeletonLoader count={1} height={18} width={"30%"} />
                      </div>
                      <div>
                        {" "}
                        <SkeletonLoader count={1} height={22} width={"35%"} />
                      </div>
                    </div>
                  </div>
                  <hr className="text-gray" />
                  <div className="p-4 flex flex-col">
                    <div className="grid grid-cols-[10%,90%] items-center m-2 gap-4 ">
                      <div>
                        <SkeletonLoader
                          circle={true}
                          count={1}
                          height={50}
                          width={50}
                        />
                      </div>
                      <div className=" rounded-xl border border-gray p-2 w-[70%]">
                        <SkeletonLoader count={1} height={10} width={"100%"} />
                        <SkeletonLoader count={1} height={10} width={"100%"} />
                        <SkeletonLoader count={1} height={10} width={"100%"} />
                        <SkeletonLoader count={1} height={10} width={"30%"} />
                      </div>
                    </div>
                    <div className=" self-end rounded-xl border border-gray p-2 w-[70%] mt-2">
                      <SkeletonLoader count={1} height={10} width={"100%"} />
                      <SkeletonLoader count={1} height={10} width={"100%"} />
                      <SkeletonLoader count={1} height={10} width={"100%"} />
                      <SkeletonLoader count={1} height={10} width={"30%"} />
                    </div>
                    <div className="grid grid-cols-[10%,90%] items-center m-2 gap-4 ">
                      <div>
                        <SkeletonLoader
                          circle={true}
                          count={1}
                          height={50}
                          width={50}
                        />
                      </div>
                      <div className=" rounded-xl border border-gray p-2 w-[70%]">
                        <SkeletonLoader count={1} height={10} width={"100%"} />
                        <SkeletonLoader count={1} height={10} width={"100%"} />
                        <SkeletonLoader count={1} height={10} width={"100%"} />
                        <SkeletonLoader count={1} height={10} width={"30%"} />
                      </div>
                    </div>
                  </div>
                  <hr className="text-gray" />
                  <div className="w-[95%] mx-auto py-2">
                    <SkeletonLoader count={1} height={30} width={"100%"} />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {tab == 0 && (
                  <>
                    <Customize
                      form={false}
                      basicFormData={basicFormData}
                      setBasicFormData={setBasicFormData}
                      buttonLoading={loading}
                      DisablingButton={DisablingButton}
                      SubmitForm={SubmitForm}
                      Submission={SubmissionForm}
                      Indicater={
                        <StatusIndicator
                          loading={loading}
                          driveLoad={driveLoad}
                        />
                      }
                    />
                    <div className="p-8">
                      <StatusIndicator
                        loading={loading}
                        driveLoad={driveLoad}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default page;
