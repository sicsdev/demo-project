"use client";
import React, { useEffect, useState } from "react";
import {
  QrCodeIcon,
  EyeIcon,
  CpuChipIcon,
  XMarkIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  PlusCircleIcon,
  PlusSmallIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams, useRouter } from "next/navigation";
import "../../(dashboard)/dashboard/customize/widgetStyle.css";
import Button from "@/app/components/Common/Button/Button";
import {
  addAllowedUrl,
  addBlockedUrl,
  getAllBotData,
  modifyBot,
  removeBlockedUrl,
} from "@/app/API/pages/Bot";
import LoaderButton from "../Common/Button/Loaderbutton";
import { useDispatch, useSelector } from "react-redux";
import { fetchBot, setBotId } from "../store/slices/botIdSlice";
import ColorSelector from "./ColorSelector";
import Modal from "../Common/Modal/Modal";
import EmailConfig from "../EmailConfig/EmailConfig";
import Schedule from "./Schedule";
import TextField from "../Common/Input/TextField";
const Customize = ({ form = false, basicFormData, setBasicFormData }) => {
  const dispatch = useDispatch();
  const [botDetails, setBotDetails] = useState({});
  const [basicEmailFormData, setBasicEmailFormData] = useState({})
  const [loading, setLoading] = useState(false);
  const [bot_id, setBot_id] = useState("");
  const id = useSelector((state) => state.botId.id);
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log("basicFormData", basicFormData)
  useEffect(() => {
    if (form === true && id) {
      getBotInfo(id);
      setBot_id(id);
    }

  }, []);
  useEffect(() => {
    if (form === false && basicFormData) {
      setBotDetails(basicFormData);
      setPreferences(basicFormData);
      setBlockedUrls(basicFormData.origins_blocked ?? []);
    }


  }, [basicFormData]);

  const [showManageHideUrls, setShowManageHideUrls] = useState(false);

  const [preferences, setPreferences] = useState({
    id: "",
    enterprise: {},
    category: "",
    description: "",
    refund_tolerance: 0,
    automation_tolerance: 0,
    primary_text_color: "#ffffff",
    secondary_text_color: "#000000",
    primary_color: "#0057ff",
    secondary_color: "#f5f5f5",
    logo: "",
    thumbnail: "",
    chat_title: basicFormData?.business_name ?? "Tempo AI Chatbot",
    chat_message_business_hours: "How can we help?",
    chat_message_after_hours: "We'll be back tomorrow at 9 am EST",
    widget_location: "bottom_right",
    widget_offset_horizontal: 0,
    widget_offset_vertical: 0,
    language: "en",
    cancellation_tolerance: "0",
    payment_platform: "Other",
    ticketing_platform: "Other",
    logo_file_name: "",
    active: true,
    origins_blocked: [],
  });

  const colorCodes = [
    { code: "#D0021B", text_color: "#000000" },
    { code: "#F5A623", text_color: "#000000" },
    { code: "#F8E71C", text_color: "#000000" },
    { code: "#8B572A", text_color: "#000000" },
    { code: "#7ED321", text_color: "#000000" },
    { code: "#417505", text_color: "#FFFFFF" },
    { code: "#BD10E0", text_color: "#000000" },
    { code: "#9013FE", text_color: "#000000" },
    { code: "#4A90E2", text_color: "#000000" },
    { code: "#50E3C2", text_color: "#000000" },
    { code: "#B8E986", text_color: "#000000" },
    { code: "#000000", text_color: "#FFFFFF" },
    { code: "#4A4A4A", text_color: "#FFFFFF" },
    { code: "#9B9B9B", text_color: "#000000" },
    { code: "#FFFFFF", text_color: "#000000" },
  ];

  // Primary functions
  const getBotInfo = (id) => {
    getAllBotData([id]).then((res) => {
      console.log('getallbotdata', res);
      let bot_res = res[0].data
      setBasicFormData(prev => {
        return {
          ...prev,
          email: bot_res.email,
          agent_name: bot_res.email_agent_name,
          agent_title: bot_res.email_agent_title,
          email_introduction: bot_res.email_greeting.replace(/\\/g, '').replace(/"/g, '') || "",
          email_signOff: bot_res.email_farewell.replace(/\\/g, '').replace(/"/g, '') || "",

        }
      })
      setBotDetails(res[0].data);
      setPreferences(res[0].data);
      setBlockedUrls(res[0].data.origins_blocked ?? []);
      let data = res[0].data;
      setBasicFormData((prev) => {
        return {
          ...prev,
          ...data,
        };
      });
    });
  };

  const handlePrimaryColorChange = (color) => {
    setPreferences({
      ...preferences,
      primary_color: color.code,
      primary_text_color: color.text_color,
    });
    setBasicFormData((prev) => {
      return {
        ...prev,
        primary_color: color.code,
        primary_text_color: color.text_color,
      };
    });

  };

  const handleSecondaryColorChange = (color) => {
    setPreferences({
      ...preferences,
      secondary_color: color.code,
      secondary_text_color: color.text_color,
    });
    setBasicFormData((prev) => {
      return {
        ...prev,
        secondary_color: color,
        secondary_text_color: color.text_color,
      };
    });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
    setBasicFormData((prev) => {
      return { ...prev, [name]: value };
    });

  };
  const handleCheckBoxChange = (e) => {
    const { name } = e.target;
    setPreferences({
      ...preferences,
      [name]: preferences.active === false ? true : false,
    });
    setBasicFormData((prev) => {
      return { ...prev, [name]: preferences.active === false ? true : false };
    });

  };

  // Logo & thumbnail upload + base64 conversion

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileChange = (event) => {
    const name = event.target.name;
    const file = event.target.files[0];

    getBase64(file)
      .then((result) => {
        setPreferences({
          ...preferences,
          logo: result,
          logo_file_name: file.name,
        });
        setBasicFormData((prev) => {
          return { ...prev, logo: result, logo_file_name: file.name };
        });

      })

      .catch((err) => {
        console.log(err);
      });
  };


  // **** Manage hide urls modal handlers ***
  const [blockedUrls, setBlockedUrls] = useState([]);
  const [newBlockedUrl, setNewBlockedUrl] = useState("");
  const saveNewBlockedUrl = () => {
    addBlockedUrl(botDetails.id, { elements: [newBlockedUrl] }).then((res) => {
      if (res.data.origins_blocked) {
        setPreferences({
          ...preferences,
          origins_blocked: res.data.origins_blocked,
        });
        setBlockedUrls(res.data.origins_blocked);
        setNewBlockedUrl("");
        debugger
        setBasicFormData((prev) => {
          return {
            ...prev,
            origins_blocked: res?.data?.origins_blocked
          }
        })
      }
    });
  };

  const handleRemoveUrl = (e) => [
    removeBlockedUrl(botDetails.id, { elements: [e.target.id] }).then((res) => {
      if (res.data.origins_blocked) {
        setPreferences({
          ...preferences,
          origins_blocked: res?.data?.origins_blocked,
        });
        setBlockedUrls(res.data.origins_blocked);
        setBasicFormData((prev) => {
          return {
            ...prev,
            origins_blocked: res?.data?.origins_blocked
          }
        })
      }
    }),
  ];

  return (
    <>
      {/* Modal to manage hide urls */}
      {showManageHideUrls && (
        <Modal
          title="Hide widget on Certain URLs"
          show={showManageHideUrls}
          setShow={setShowManageHideUrls}
          className={"w-[90%]  sm:w-[90%] md:w-[60%] lg:w-[60%]"}
          showCancel={true}
        >
          <div>
            <small>Block paths you don't want the widget to appear on.</small>
          </div>
          <br></br>
          <div>
            {blockedUrls.map((item, index) => (
              <div
                key={index}
                className="flex items-center w-full mt-3 gap-2 xl:w-1/2"
              >
                <div className="flex justify-start w-1/2 items-center rounded border-gray px-2">
                  <span className="text-gray-700">URL Containing:</span>
                </div>
                <input
                  placeholder="/path"
                  value={item}
                  className="flex justify-start w-1/2 items-center border rounded focus:bg-white border-gray px-2 mx-2"
                  disabled
                />
                <XMarkIcon
                  fill="red"
                  className="w-6 h-6 mr-2 text-red cursor-pointer rounded-full hover:text-black"
                  onClick={(e) => handleRemoveUrl(e)}
                  title="Delete URL"
                  id={item}
                />
              </div>
            ))}
            <div className="flex items-center w-full mt-3 gap-2 xl:w-1/2">
              <div className="flex justify-start w-1/2 items-center rounded border-gray px-2">
                <span className="text-gray-700">URL Containing:</span>
              </div>
              <input
                placeholder="/path"
                value={newBlockedUrl}
                className="flex justify-start w-1/2 items-center border rounded focus:bg-white border-gray px-2 mx-2"
                onChange={(e) => setNewBlockedUrl(e.target.value)}
              />
              <PlusSmallIcon
                fill="green"
                className="w-6 h-6 text-soft-green mr-2 rounded-full cursor-pointer"
                title="Add URL"
                onClick={saveNewBlockedUrl}
              />
            </div>

            {/* <div className="mt-2 mx-2">
                        <span className="text-sky text-underline cursor-pointer">
                            + Add URL
                        </span>
                    </div> */}

            <div className="float-right">
              <button
                className="mt-4 rounded py-1 border border-gray px-3 bg-primary text-white"
                onClick={() => setShowManageHideUrls(false)}
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
      {/* End of modal to manage hide urls */}

      <div className="w-full">


        {botDetails.id && (
          <>
            <br></br>
            <div className="block sm:flex md:flex lg:flex justify-center items-start gap-4">
              <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[48%]">
                <div className="">
                  <a
                    className="flex justify-start gap-2 items-center py-1 text-sm font-semibold text-heading border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                    aria-current="preview"
                  >
                    <QrCodeIcon className="h-6 w-6 text-gray-500" /> Customize
                    Chat Interface
                  </a>
                  {form === false && (
                    <>
                      <small className="text-[#7e7e7e] mb-3">
                        Customize the colors, position, and user interface of your Tempo
                        chat widget.
                      </small>  
                    </>
                  )}
                  <hr className="opacity-10"></hr>
                </div>
                <div className="flex items-center w-full mt-2 gap-2">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="text-gray-700">Bot Title</span>
                  </div>
                  <div className="flex justify-start w-1/2">
                    <input
                      onChange={handleInputChange}
                      maxLength={20}
                      name="chat_title"
                      value={preferences.chat_title}
                      type="text"
                      className="w-full block px-3 new_input bg-white focus:bg-white border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      placeholder="Enter chat title"
                    />
                  </div>
                </div>
                {/* <div className="mb-4">
                  <TextField
                    onChange={handleInputChange}
                    value={preferences.chat_title}
                    name="chat_title"
                    className="py-3 mt-1 w-full"
                    title={"Bot Title"}
                    placeholder={"Enter chat title"}
                    type={"text"}
                    id={"chat_title"}
                  />
                </div> */}

                <div className="flex items-center w-full mt-2 gap-2">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="text-gray-700">Description</span>
                  </div>
                  <div className="flex justify-start w-1/2">
                    <input
                      onChange={handleInputChange}
                      maxLength={20}
                      name="description"
                      value={preferences.description}
                      type="text"
                      className="w-full block px-3 new_input bg-white focus:bg-white border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      placeholder="Enter description"
                    />
                  </div>
                </div>

                <ColorSelector
                  selectedColor={preferences.primary_color}
                  colorCodes={colorCodes}
                  onChange={handlePrimaryColorChange}
                  label="Primary Color"
                ></ColorSelector>
                <ColorSelector
                  selectedColor={preferences.secondary_color}
                  colorCodes={colorCodes}
                  onChange={handleSecondaryColorChange}
                  label="Secondary Color"
                ></ColorSelector>

                <div className="flex items-center w-full mt-2 gap-2">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="text-gray-700">Widget Location</span>
                  </div>
                  <div className="flex justify-start w-1/2 items-center">
                    <select
                      value={preferences.widget_location}
                      name="widget_location"
                      onChange={handleInputChange}
                      className="custom-select !h-[37.5px] w-full block px-3 new_input bg-white border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                    >
                      <option value="bottom_right">Bottom Right</option>
                      <option value="bottom_left">Bottom Left</option>
                      <option value="top_left">Top Left</option>
                      <option value="top_right">Top Right</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center w-full mt-2 gap-2">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="text-gray-700">
                      {preferences.logo && !preferences.logo_file_name ? (
                        <a
                          className="text-heading"
                          target="_blank"
                          href={preferences.logo}
                        >
                          Logo
                        </a>
                      ) : (
                        "Logo"
                      )}
                    </span>
                  </div>
                  <div className="relative inline-flex justify-start w-1/2 items-center">
                    <label className="cursor-pointer bg-white rounded w-full">
                      <span className="border-gray h-[37.5px]  border py-2 p-2 rounded-md shadow-sm flex items-center break-all hover:bg-gray w-full">
                        {preferences.logo_file_name ? (
                          preferences.logo_file_name
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-4 h-4 mr-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            {"..." +
                              preferences.thumbnail?.slice(
                                preferences.thumbnail.length - 10,
                                preferences.thumbnail.length
                              ) || "Select file"}
                          </>
                        )}
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                        className="hidden w-full mt-1 px-3 new_input bg-white focus:bg-white border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                        placeholder="Select logo"
                        name="logo"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center w-full mt-2 gap-2">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="text-gray-700">Hide Chat Bot</span>
                  </div>
                  <div className="flex justify-start h-[37.5px] w-1/2 items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        id="active"
                        name="active"
                        onChange={handleCheckBoxChange}
                        className="sr-only peer"
                        checked={preferences.active === true}
                      />
                      <div
                        className={`w-11 h-6 ${preferences.active === false
                          ? "bg-border"
                          : "bg-primary"
                          } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center w-full mt-2 gap-2">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="text-gray-700">Hide on Certain URLs</span>
                  </div>
                  <div
                    className="flex h-[37.5px] justify-start w-1/2 items-center"
                    onClick={() => setShowManageHideUrls(true)}
                  >
                    <span className="text-sky text-underline cursor-pointer">
                      Manage URL's
                    </span>
                  </div>
                </div>
              </div>


              <div
                id="chatbot_preview"
                className="w-full sm:w-[48%] md:w-[48%] lg:w-[48%] mt-6 sm:mt-0"
              >
                <div className="mb-8">
                  <a
                    className="flex justify-start gap-2 items-center p-4 text-heading text-sm font-semibold border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                    aria-current="preview"
                  >
                    <EyeIcon className="h-6 w-6 text-gray-500" /> Preview
                  </a>
                  <hr className="opacity-10"></hr>
                </div>

                <div className="containerChatBot_entire justify-center flex">
                  <div className="widget_container active w-[90%]">
                    <div className="header_ChatBotWidget">
                      <div className="profile_photo_container">
                        <img
                          width="45px"
                          src={
                            preferences.logo || "https://usetempo.ai/bot.png"
                          }
                        />
                      </div>
                      <div>
                        <div>
                          <b>{preferences.chat_title}</b>
                        </div>
                        <div className="subtitle_div">
                          <span className="subtitle_ChatBotWidget">
                            <span className="ai_icon">AI</span>{" "}
                            {preferences.description || "Powered by Tempo"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr className="custom_hr" />
                    <div className="chat_content">
                      <div className="first_answer">
                        <img
                          className="profile-photo_ChatBot"
                          src={
                            preferences.logo || "https://usetempo.ai/bot.png"
                          }
                          alt="Profile Photo"
                          width="35px"
                        />
                        <div
                          className="answer_text"
                          style={{
                            backgroundColor: preferences.secondary_color,
                            color: preferences.secondary_text_color,
                          }}
                        >
                          How can I help you today?
                        </div>
                      </div>
                      <div
                        className="question"
                        style={{
                          backgroundColor: preferences.primary_color,
                          color: preferences.primary_text_color,
                        }}
                      >
                        What is the price of the product?
                      </div>
                    </div>

                    <hr className="custom_hr" />
                    <div className="reply_container">
                      <textarea
                        className="input_question"
                        disabled
                        type="text"
                        maxLength="1000"
                        placeholder="Write a reply..."
                      ></textarea>
                      <div className="send_button" id="sendButton">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25px"
                          viewBox="0 0 24 24"
                          fill={preferences.primary_color}
                          className=""
                        >
                          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <>
              <div>
                {form === true && (
                  <EmailConfig basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
                )}
              </div>




              {/* DATES/HOURS RANGES THAT WIDGET WILL ACTIVE */}
              {/* <div style={{ marginTop: '100px' }}>
                <span className="text-heading font-bold mb-4 flex">
                  <CalendarDaysIcon
                    fill="white"
                    className="w-6 h-6 text-sky mr-2 rounded-full"
                    title="Add URL"
                  />
                  Schedule</span>
                <hr className="opacity-10 mt-4"></hr>
                <Schedule preferences={preferences} setPreferences={setPreferences}></Schedule>

              </div> */}



            </>
          </>
        )}
      </div >
    </>
  );
};

export default Customize;
