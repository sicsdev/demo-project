"use client";
import React, { useEffect, useState } from "react";
import {
  XMarkIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams, useRouter } from "next/navigation";
import "../../(dashboard)/dashboard/customize/widgetStyle.css";
import {
  addBlockedUrl,
  getAllBotData,
  removeBlockedUrl,
} from "@/app/API/pages/Bot";
import { useDispatch, useSelector } from "react-redux";
import ColorSelector from "./ColorSelector";
import Modal from "../Common/Modal/Modal";
import Button from "../Common/Button/Button";
import TextField from "../Common/Input/TextField";
import LoaderButton from "../Common/Button/Loaderbutton";
import SideModal from "../SideModal/SideModal";
const Customize = ({ form = false, basicFormData, setBasicFormData, buttonLoading, DisablingButton, SubmitForm }) => {
  const [botDetails, setBotDetails] = useState({});
  const [bot_id, setBot_id] = useState("");
  const id = useSelector((state) => state.botId.id);

  useEffect(() => {
    if (form === true && id) {
      getBotInfo(id);
      setBot_id(id);
    }

  }, [id]);
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
    customer_service_email: "",
    chat_default_message: "How can I help you today?",
    chat_suggestions: [],
    chat_suggestions_show: false,
    chat_suggestions_secondary_color: '#CED9F195',
    chat_suggestions_primary_color: '#3042CCFF'
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
          agent_name: bot_res.agent_name,
          agent_title: bot_res.email_agent_title,
          email_introduction: bot_res.email_greeting.replace(/\\/g, '').replace(/"/g, '') || "",
          email_signOff: bot_res.email_farewell.replace(/\\/g, '').replace(/"/g, '') || "",

        }
      })
      setBotDetails(res[0].data);
      debugger
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
        secondary_color: color.code,
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
  const handleCheckBoxChange1 = (e) => {
    const { name } = e.target;
    setPreferences({
      ...preferences,
      [name]: preferences.chat_suggestions_show === false ? true : false,
    });
    setBasicFormData((prev) => {
      return { ...prev, [name]: preferences.chat_suggestions_show === false ? true : false };
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

  const [tileAgentName, setTileAgentName] = useState([]);
  const [formValues, setFormValues] = useState({
    agent_name: "",
  });
  useEffect(() => {
    if (basicFormData) {
      setTileAgentName(basicFormData?.chat_suggestions ?? []);
    }
  }, [basicFormData]);


  const handleAgentNameValue = (e) => {
    const { value } = e.target;
    if (value.includes(",")) {
      const agentNames = value.split(",");
      setFormValues((prev) => {
        return {
          ...prev,
          agent_name: "",
        };
      });
      agentNames.forEach((name) => {
        const trimmedName = name.trim();
        if (trimmedName && !tileAgentName.includes(trimmedName)) {
          setTileAgentName((prev) => {
            setBasicFormData((prev_state) => {
              return {
                ...prev_state,
                chat_suggestions: [...prev, makeCapital(trimmedName)],
              };
            });
            return [...prev, makeCapital(trimmedName)];
          });
        }
      });
    } else {
      setFormValues({ ...formValues, agent_name: value });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      const agentNames = value.split(",");
      setFormValues((prev) => {
        return {
          ...prev,
          agent_name: "",
        };
      });
      agentNames.forEach((name) => {
        const trimmedName = name.trim();
        if (trimmedName && !tileAgentName.includes(trimmedName)) {
          setTileAgentName((prev) => {
            setBasicFormData((prev_state) => {
              return {
                ...prev_state,
                chat_suggestions: [...prev, makeCapital(trimmedName)],
              };
            });
            return [...prev, makeCapital(trimmedName)];
          });
        }
      });
    }
  };

  const returnErrorMessage = (key) => {
    if (errors.length) {
      const findErr = errors.find((x) => x.field === key);
      if (findErr) {
        return findErr.message;
      }
    }
    return null;
  };
  const RemoveFromAgentNameArr = (element) => {
    const updatedChips = tileAgentName.filter((x) => x !== element);
    setTileAgentName(updatedChips);

    setBasicFormData((prev_state) => {
      return {
        ...prev_state,
        chat_suggestions: [...updatedChips],
      };
    });
  };
  const makeCapital = (str) => {
    console.log(str)
    if (str.includes(" ")) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    } else {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  };

  useEffect(() => {
    const textarea = document.querySelector('.resizable-textarea');
    textarea?.setAttribute('rows', '1'); // Set the 'rows' attribute
    const rows = Math.min(
      Math.ceil(textarea?.scrollHeight / 20), // 20 is the approximate line height
      6 // Limit to a maximum of 6 rows
    );

    textarea?.setAttribute('rows', (rows - 1)?.toString()); // Set the 'rows' attribute with the new value
  }, [preferences.chat_default_message]);

  return (
    <>
      {/* Modal to manage hide urls */}
      {showManageHideUrls === true &&
        <SideModal setShow={setShowManageHideUrls} heading={'Hide widget on Certain URLs'} >
          <>
            <div>
              <h3 className="my-2 font-normal new_input_label text-sm text-heading">Block paths you don't want the widget to appear on.</h3>
            </div>
            <div>
              {blockedUrls.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center w-full mt-3 gap-2 xl:w-1/2"
                >
                  <div className="flex justify-start w-1/2 items-center rounded border-gray">
                    <span className="new_input_label block text-sm text-heading
                    ">URL Containing:</span>
                  </div>
                  <TextField
                    value={item}
                    name=""
                    className="py-3 !pl-[23px]"
                    title={""}
                    placeholder="/path"
                    type={""}
                    id={""}
                    paddingleft={"pl-6"}
                    disabled={true}
                  />
                  <XMarkIcon
                    fill="red"
                    className="w-[20px] h-[20px] mr-2 text-red cursor-pointer rounded-full hover:text-black"
                    onClick={(e) => handleRemoveUrl(e)}
                    title="Delete URL"
                    id={item}
                  />
                </div>
              ))}
              <div className="flex items-center w-full mt-3 gap-2 xl:w-1/2">
                <div className="flex justify-start w-1/2 items-center rounded border-gray">
                  <span className="new_input_label block text-sm text-heading">URL Containing:</span>
                </div>
                <TextField
                  onChange={(e) => setNewBlockedUrl(e.target.value)}
                  value={newBlockedUrl}
                  name="blockUrls"
                  className="py-3 !pl-[23px]"
                  // className="py-3 mt-1"
                  title={""}
                  placeholder="/path"
                  type={""}
                  id={"blockUrls"}
                  paddingleft={"pl-6"}
                />
                <PlusSmallIcon
                  fill="green"
                  className="w-[20px] h-[20px] text-soft-green mr-2 rounded-full cursor-pointer"
                  title="Add URL"
                  onClick={saveNewBlockedUrl}
                />
              </div>

              <div className={`flex  py-2 rounded-b mt-5 justify-between gap-4`}>

                <Button
                  type={"button"}
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                  onClick={() => setShowManageHideUrls(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          </>
        </SideModal>
      }
      {/* End of modal to manage hide urls */}

      <div className="w-full">


        {botDetails.id && (
          <>
            <br></br>
            <div className="block sm:flex md:flex lg:flex justify-center items-stretch gap-4">
              <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[48%]">


                <div className="flex items-center justify-between w-full mt-2 gap-2 px-2 sm:px-0">
                  <div className="flex justify-start  w-1/2 items-center ">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Bot Title</span>
                  </div>
                  <div className="flex justify-start w-1/2">
                    <input
                      onChange={handleInputChange}
                      maxLength={20}
                      name="chat_title"
                      value={preferences.chat_title}
                      type="text"
                      className="w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      placeholder="Enter chat title"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mt-2 gap-2  px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Description</span>
                  </div>
                  <div className="flex justify-start w-1/2">
                    <input
                      onChange={handleInputChange}
                      maxLength={20}
                      name="description"
                      value={preferences.description}
                      type="text"
                      className="w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
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

                <div className="flex items-center justify-between w-full mt-2 gap-2 px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Widget Location</span>
                  </div>
                  <div className="flex justify-start w-1/2 items-center">
                    <select
                      value={preferences.widget_location}
                      name="widget_location"
                      onChange={handleInputChange}
                      className="custom-select !mt-0 !h-[37.5px] w-full block px-3 new_input bg-white border rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                    >
                      <option value="bottom_right">Bottom Right</option>
                      <option value="bottom_left">Bottom Left</option>
                      {/* <option value="top_left">Top Left</option>
                      <option value="top_right">Top Right</option> */}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full mt-2 gap-2 px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="text-gray-700 new_input_label block text-sm text-heading font-medium">
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
                      <span className="border-gray h-[37.5px]  text-[12px] border py-2 p-2 rounded-md shadow-sm flex items-center break-all hover:bg-gray w-full new_input ">
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
                        className="hidden w-full mt-1 px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                        placeholder="Select logo"
                        name="logo"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full mt-2 gap-2 px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Escalation Email</span>
                  </div>
                  <div className="flex justify-start w-1/2">
                    <input
                      onChange={handleInputChange}
                      name="customer_service_email"
                      value={preferences.customer_service_email}
                      type="email"
                      className="w-full block px-3 new_input bg-white focus:bg-white  border rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      placeholder="Enter customer service email"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between w-full mt-2 gap-2  px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Default Message</span>
                  </div>
                  <div className="flex justify-start w-1/2">
                    <textarea
                      onChange={handleInputChange}
                      name="chat_default_message"
                      type="text"
                      className="resizable-textarea w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      placeholder="Enter chat default message"
                      rows={'1'}
                    >
                      {preferences.chat_default_message}
                    </textarea>
                    {/* <input
                      onChange={handleInputChange}
                      name="chat_default_message"
                      value={preferences.chat_default_message}
                      type="text"
                      className="w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      placeholder="Enter chat default message"
                    /> */}
                  </div>
                </div>

                <div className={`flex  justify-between w-full mt-2 gap-2 px-2 sm:px-0 ${tileAgentName.length > 0 ? 'items-start' : 'items-center'}`}>
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Default Prompts</span>
                  </div>
                  <div className="flex justify-start w-1/2">
                    <div className={`flex flex-wrap justify-start items-center border  border-[#C7C6C7]  w-full rounded-md ${tileAgentName.length > 0 && ("p-2")}`}>
                      <div className="flex flex-wrap items-center justify-start gap-1">
                        {tileAgentName.length > 0 &&
                          tileAgentName.map((element, key) => (
                            <div
                              className="[word-wrap: break-word]   flex h-[40px] cursor-pointer items-center justify-between rounded-[30px] key  px-[10px] py-10px text-[16px] sm:text-[12px] font-semibold normal-case leading-[15px] text-heading shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]  border border-[#C7C6C7]"
                              key={key}
                            >
                              {element}
                              <XMarkIcon
                                className=" h-4 w-4 cursor-pointer "
                                onClick={(e) => {
                                  RemoveFromAgentNameArr(element);
                                }}
                              />
                            </div>
                          ))}
                      </div>
                      <input
                        value={formValues.agent_name}
                        onKeyDown={handleKeyDown}
                        required
                        onChange={handleAgentNameValue}
                        type={"text"}
                        placeholder={"Enter prompts separated by commas"}
                        className={` block  px-2 py-2 !font-[500] bg-white focus:bg-white  rounded-md  text-sm  !placeholder-[#C7C6C7]  focus:outline-none border  disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:!border-none  w-full  border-none ring-0 focus-visible:border-none`}
                        id={"chat_suggestions"}
                        name={"chat_suggestions"}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full mt-2 gap-2 n px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Show Chat Bot</span>
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
                <div className="flex items-center justify-between w-full mt-2 gap-2 n px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Show Suggestions</span>
                  </div>    
                  <div className="flex justify-start h-[37.5px] w-1/2 items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        id="chat_suggestions_show"
                        name="chat_suggestions_show"
                        onChange={handleCheckBoxChange1}      
                        className="sr-only peer"
                        checked={preferences.chat_suggestions_show === true}
                      />
                      <div
                        className={`w-11 h-6 ${preferences.chat_suggestions_show === false
                          ? "bg-border"
                          : "bg-primary"
                          } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </div>
                </div>

                <div className="sm:hidden flex items-center justify-between w-full mt-2 gap-2  px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Hide on Certain URLs</span>
                  </div>
                  <Button
                    type={"button"}
                    className="inline-block mt-0 rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                    onClick={() => setShowManageHideUrls(true)}
                  >
                    Manage URLs
                  </Button>

                </div>
                <div className='flex sm:hidden justify-end items-center px-2 py-4'>
                  {
                    buttonLoading ? (
                      <LoaderButton className={`mt-2 px-6 pb-2 pt-2 text-xs font-medium`} />
                    ) : (
                      <>
                        <Button type={"button"}
                          className="inline-block rounded bg-primary mt-2 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                          disabled={DisablingButton()} onClick={(e) => SubmitForm()}
                        >
                          Save
                        </Button>
                      </>
                    )}
                </div>
              </div>


              <div
                id="chatbot_preview"
                className="w-full sm:w-[42%] md:w-[42%] lg:w-[42%] mt-6 sm:mt-0"
              >

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
                          {preferences.chat_default_message}
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
                      {preferences.chat_suggestions &&
                        <div className="tempoWidget-suggestedQuestions-div">
                          {preferences.chat_suggestions.map(el => (
                            <div className="tempoWidget-suggestedQuestions-option">
                              {el}
                            </div>
                          ))}
                        </div>
                      }

                    </div>

                    <div class="chatbotwidget_footer">
                      <div className="reply_container">
                        <textarea id="inputtext_chatwidget" className="input_question" type="text" maxlength="180" placeholder="Write a reply..." />


                        <div className="send_audio_button" onclick="handleAudioButton()" id="audioButton">
                          <svg fill={preferences.primary_color} width="25px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="${preferences.primary_color}"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>

                        <div className="send_button" onclick="handleSubmitQuestion()" id="sendButton">
                          <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24" className=""
                            fill={preferences.primary_color}>
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
                          </svg>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex md:flex lg:flex justify-center items-center gap-4">
              <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[48%]">
                <div className="items-center w-full mt-2 gap-2 flex">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">Hide on Certain URLs</span>
                  </div>
                  <Button type={"button"}
                    className="inline-block mt-0 rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                    onClick={() => setShowManageHideUrls(true)}
                  >
                    Manage URLs
                  </Button>

                </div>
              </div>
              <div className="w-full sm:w-[42%] md:w-[42%] lg:w-[42%] mt-6 sm:mt-0">
                <div className='flex justify-end items-center px-6 py-4'>
                  {
                    buttonLoading ? (
                      <LoaderButton className={`mt-2 px-6 pb-2 pt-2 text-xs font-medium`} />
                    ) : (
                      <>
                        <Button type={"button"}
                          className="inline-block rounded bg-primary mt-2 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                          disabled={DisablingButton()} onClick={(e) => SubmitForm()}
                        >
                          Save
                        </Button>
                      </>
                    )}
                </div>
              </div>
            </div>

          </>
        )
        }
      </div >
    </>
  );
};

export default Customize;
