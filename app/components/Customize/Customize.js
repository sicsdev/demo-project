"use client";
import React, { useEffect, useState } from "react";
import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter } from "next/navigation";
import "../../(dashboard)/dashboard/customize/widgetStyle.css";
import {
  addBlockedUrl,
  getAllActivePlatforms,
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
import { getActiveIntegrations } from "@/app/API/pages/Integration";
import { EyeIcon } from "@heroicons/react/24/solid";
import { getPermissionHelper } from "../helper/returnPermissions";
import { DebounceSubmitForm } from "../Debouncing/Deboucing";
import StatusIndicator from "../StatusIndicator/Status";
const Customize = ({
  form = false,
  basicFormData,
  setBasicFormData,
  buttonLoading,
  DisablingButton,
  SubmitForm,
  Submission,
  Indicater
}) => {
  const userState = useSelector((state) => state.user.data)
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
      setBlockedUrls([...basicFormData.origins_blocked, ""] ?? [""]);
    }
    getValuesEscalationPlatformSelect();
  }, [basicFormData]);

  const [showManageHideUrls, setShowManageHideUrls] = useState(false);
  const [availableIntegrations, setAvailableIntegrations] = useState([]);

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
    human_handoff_platform: "",
    chat_title: basicFormData?.business_name ?? "Deflection AI Chatbot",
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
    chat_suggestions_secondary_color: "#CED9F195",
    chat_suggestions_primary_color: "#3042CCFF",
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

  const getValuesEscalationPlatformSelect = async () => {
    let results = await getAllActivePlatforms()
    if (results?.result) { setAvailableIntegrations(results.result) }
  }

  const getBotInfo = (id) => {
    getAllBotData([id]).then((res) => {
      let bot_res = res[0].data;
      setBasicFormData((prev) => {
        return {
          ...prev,
          email: bot_res.email,
          agent_name: bot_res.agent_name,
          agent_title: bot_res.email_agent_title,
          email_introduction:
            bot_res.email_greeting?.replace(/\\/g, "").replace(/"/g, "") || "",
          email_signOff:
            bot_res.email_farewell?.replace(/\\/g, "").replace(/"/g, "") || "",
        };
      });
      setBotDetails(res[0].data);
      ;
      setPreferences(res[0].data);
      setBlockedUrls([...res[0].data.origins_blocked, [""]] ?? [""]);
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
    Submission({
      ...basicFormData, primary_color: color.code,
      primary_text_color: color.text_color,
    })
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
    Submission({
      ...basicFormData,
      secondary_color: color.code,
      secondary_text_color: color.text_color,
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
    setBasicFormData((prev) => {
      return { ...prev, [name]: value };
    });
    Submission({
      ...basicFormData,
      [name]: value
    })
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
    Submission({ ...basicFormData, [name]: preferences.active === false ? true : false })
  };
  const handleCheckBoxChange1 = (e) => {
    const { name } = e.target;
    setPreferences({
      ...preferences,
      [name]: preferences.chat_suggestions_show === false ? true : false,
    });
    setBasicFormData((prev) => {
      return {
        ...prev,
        [name]: preferences.chat_suggestions_show === false ? true : false,
      };
    });

    Submission({ ...basicFormData, [name]: preferences.chat_suggestions_show === false ? true : false, })
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
        Submission({ ...basicFormData, logo: result, logo_file_name: file.name })
      }).catch((err) => {
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
            origins_blocked: res?.data?.origins_blocked,
          };
        });

      }
    });
  };



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
            Submission({ ...basicFormData, chat_suggestions: [...prev, makeCapital(trimmedName)], })
            return [...prev, makeCapital(trimmedName)];
          });
        }
      });
    } else {
      setFormValues({ ...formValues, agent_name: value });
      Submission({ ...formValues, agent_name: value })
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

            Submission({ ...basicFormData, chat_suggestions: [...prev, makeCapital(trimmedName)], })
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
    Submission({ ...basicFormData, chat_suggestions: [...updatedChips], })
  };
  const makeCapital = (str) => {
    if (str.includes(" ")) {
      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    } else {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  };

  useEffect(() => {
    const textarea = document.querySelector(".resizable-textarea");
    textarea?.setAttribute("rows", "1"); // Set the 'rows' attribute
    const rows = Math.min(
      Math.ceil(textarea?.scrollHeight / 20), // 20 is the approximate line height
      20 // Limit to a maximum of 6 rows
    );

    textarea?.setAttribute("rows", (rows - 1)?.toString()); // Set the 'rows' attribute with the new value
  }, [preferences.chat_default_message]);
  const Session = (value) => {
    DebounceSubmitForm(value, saveNewBlockedUrlDebounce, setTypingTimeout, typingTimeout)
  }
  const handleInputUrl = (event, index) => {
    let userInput = event.target.value
    let sanitizedInput = userInput.trim(); // Remove leading/trailing spaces
    sanitizedInput = '/' + sanitizedInput.replace(/^\/+/, ''); // Ensure a single leading slash
    let urls = [...blockedUrls]
    urls[index] = sanitizedInput
    setBlockedUrls(urls)
    Session({ value: sanitizedInput, index })
  }
  const [typingTimeout, setTypingTimeout] = useState(null)
  const [debounceLoading, setDebounceLoading] = useState(null)
  const [driveLoading, setDriveLoading] = useState(false)

  const saveNewBlockedUrlDebounce = (bot) => {
    setDebounceLoading(bot.index)
    addBlockedUrl(botDetails.id, { elements: [bot.value] }).then((res) => {
      if (res.data.origins_blocked) {
        setPreferences({
          ...preferences,
          origins_blocked: res.data.origins_blocked,
        });
        setBasicFormData((prev) => {
          return {
            ...prev,
            origins_blocked: res?.data?.origins_blocked,
          };
        });
        setBlockedUrls(prev => {
          return [
            ...prev,
            ""
          ]
        })
        setDebounceLoading(null)
        setDriveLoading(true)
        setTimeout(() => {
          setDriveLoading(false)
        }, 2000);
      }
    });
  };
  const handleRemoveUrl = (e, index) => [
    removeBlockedUrl(botDetails.id, { elements: [e.target.id] }).then((res) => {
      if (res.data.origins_blocked) {
        setPreferences({
          ...preferences,
          origins_blocked: res?.data?.origins_blocked,
        });
        setBlockedUrls(blockedUrls.filter((_, i) => i !== index));
        setBasicFormData((prev) => {
          return {
            ...prev,
            origins_blocked: res?.data?.origins_blocked,
          };
        });
        setDebounceLoading(null)
        setDriveLoading(true)
        setTimeout(() => {
          setDriveLoading(false)
        }, 2000);
      }
    }),
  ];


  const changeText = (text) => {
    if (text && text.length > 20) {
      return text.substring(0, 20) + "..."
    }
    if(!text){
      return "Select a bot"
    }
    return text
  }


  return (
    <>
      {/* Modal to manage hide urls */}
      {showManageHideUrls === true && (
        <SideModal
          setShow={setShowManageHideUrls}
          heading={"Hide widget on Certain URLs"}
        >
          <>

            <div className="w-full sm:w-[70%]">
              <div className="flex items-center justify-between w-full mt-2 gap-2 n px-2 sm:px-0">
                <div className="flex justify-start w-1/2 items-center">
                  <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                    Show Chat Bot
                  </span>
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
                      disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}

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
              {Indicater}
            </div>

            {preferences.active === true && (
              <div className="w-full sm:w-[70%]">
                <div>
                  <h3 className="my-2 font-normal new_input_label text-sm text-heading">
                    Block paths you don't want the widget to appear on.
                  </h3>
                </div>
                {blockedUrls.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center  mt-3 gap-2 "
                  >
                    <div className="w-[120px]">
                      <span
                        className="new_input_label block text-sm text-heading
                    "
                      >
                        URL Containing:
                      </span>
                    </div>
                    <input
                      value={blockedUrls[index]}
                      name=""
                      title={""}
                      onChange={(e) => handleInputUrl(e, index)}
                      placeholder="/path"
                      type={"text"}
                      id={""}
                      paddingleft={"pl-6"}
                      className="w-[200px] block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                    />
                    {blockedUrls.length - 1 !== index ? (
                      <button>
                        <XMarkIcon
                          fill="red"
                          className="m-[10px] w-[20px] h-[20px] mr-2 text-red cursor-pointer rounded-full hover:text-black"
                          onClick={
                            (e) => {
                              setDebounceLoading(index)
                              handleRemoveUrl(e, index)
                            }
                          }
                          title="Delete URL"
                          id={item}
                        />
                      </button>
                    ) :
                      <button></button>
                    }
                    {blockedUrls.length - 1 === index && (
                      <button disabled={blockedUrls[index] === ""}>
                        <PlusSmallIcon
                          fill="green"
                          className="w-[20px] h-[20px] mr-2 text-soft-green cursor-pointer rounded-full hover:text-black"
                          title="Add URL"
                          onClick={() => {
                            setBlockedUrls(prev => {
                              return [
                                ...prev,
                                "",
                              ]
                            })
                          }}
                        />
                      </button>
                    )}
                    {index === debounceLoading && (
                      <StatusIndicator loading={debounceLoading} driveLoad={driveLoading} />
                    )}
                  </div>
                ))}
                {/* <div
                className={`flex  py-2 rounded-b mt-5 justify-between gap-4`}
              >
                <Button
                  type={"button"}
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                  onClick={() => setShowManageHideUrls(false)}
                >
                  Done
                </Button>
              </div> */}
              </div>
            )}
          </>
        </SideModal>
      )}
      {/* End of modal to manage hide urls */}

      <div className="w-full">
        {botDetails.id && (
          <>
            <br></br>
            <div className="block lg:flex justify-around items-stretch gap-2">
              <div className="w-full sm:w-[100%] md:w-[100%] lg:w-[48%] mx-2">
                <div className="flex items-center justify-between w-full mt-2 gap-2 px-2 sm:px-0">
                  <div className="flex justify-start  w-1/2 items-center ">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                      Bot Title
                    </span>
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
                      disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mt-2 gap-2  px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                      Description
                    </span>
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
                      disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}

                    />
                  </div>
                </div>

                <ColorSelector
                  selectedColor={preferences.primary_color}
                  colorCodes={colorCodes}
                  onChange={handlePrimaryColorChange}
                  label="Primary Color"
                  disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}
                ></ColorSelector>
                <ColorSelector
                  selectedColor={preferences.secondary_color}
                  colorCodes={colorCodes}
                  onChange={handleSecondaryColorChange}
                  label="Secondary Color"
                  disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}
                ></ColorSelector>

                <div className="flex items-center justify-between w-full mt-2 gap-2 px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                      Widget Location
                    </span>
                  </div>
                  <div className="flex justify-start w-1/2 items-center">
                    <select
                      value={preferences.widget_location}
                      name="widget_location"
                      onChange={handleInputChange}
                      disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}
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
                          className="text-heading new_input_label"
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
                          changeText(preferences.logo_file_name)
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
                            {
                              changeText( preferences.thumbnail)
                            }
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
                        disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mt-2 gap-2 px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                      Escalation platform
                    </span>
                  </div>
                  <div className="flex justify-start w-1/2 items-center">
                    <select
                      value={preferences.human_handoff_platform}
                      name="human_handoff_platform"
                      onChange={handleInputChange}
                      disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}
                      className="custom-select !mt-0 !h-[37.5px] w-full block px-3 new_input bg-white border rounded-md shadow-sm placeholder-slate-400 0 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 border-input_color"
                    >
                      <option value="">Email</option>
                      {availableIntegrations.map((name) => (
                        <option value={name}>
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </option>
                      ))}|
                    </select>
                  </div>
                </div>


                <div className="flex items-center justify-between w-full mt-2 gap-2 px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                      Escalation Email
                    </span>
                  </div>
                  <div className="flex justify-start w-1/2">
                    <input
                      onChange={handleInputChange}
                      name="customer_service_email"
                      value={preferences.customer_service_email}
                      type="email"
                      className="w-full block px-3 new_input bg-white focus:bg-white  border rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      placeholder="Enter customer service email"
                      disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}

                    />
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mt-2 gap-2  px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                      Default Message
                    </span>
                  </div>
                  <div className="flex justify-start w-1/2">
                    <textarea
                      onChange={handleInputChange}
                      name="chat_default_message"
                      type="text"
                      className="resizable-textarea w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      placeholder="Enter chat default message"
                      rows={"1"}
                      disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}

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

                <div
                  className={`flex  justify-between w-full mt-2 gap-2 px-2 sm:px-0 ${tileAgentName.length > 0 ? "items-start" : "items-center"
                    }`}
                >
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                      Default Prompts
                    </span>
                  </div>
                  <div className="flex flex-col justify-start w-1/2">


                    <input
                      value={formValues.agent_name}
                      onKeyDown={handleKeyDown}
                      required
                      onChange={handleAgentNameValue}
                      type={"text"}
                      placeholder={"Enter prompts separated by commas"}
                      className="w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      id={"chat_suggestions"}
                      name={"chat_suggestions"}
                      disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}

                    />
                    <div className="flex mt-2 flex-wrap items-center justify-start gap-1">
                      {tileAgentName.length > 0 &&
                        tileAgentName.map((element, key) => (
                          <div
                            className="[word-wrap: break-word]   flex h-[40px] cursor-pointer items-center justify-between rounded-[30px] key  px-[10px] py-10px text-[12px] sm:text-[12px] font-semibold normal-case leading-[15px] text-heading shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]  border border-[#C7C6C7]"
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
                  </div>

                </div>
                <div className="flex items-center justify-between w-full mt-2 gap-2 n px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                      Show Suggestions
                    </span>
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
                        disabled={!getPermissionHelper('EDIT BOT SETTINGS', userState?.role)}

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


                <div className="flex items-center justify-between w-full mt-2 gap-2 n px-2 sm:px-0">
                  <div className="flex justify-start w-1/2 items-center">
                    <span className="new_input_label block text-sm text-heading font-medium text-gray-700">
                      Hide on Certain URLs
                    </span>
                  </div>
                  <div className="flex justify-start h-[37.5px] w-1/2 items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <p
                        type={"button"}
                        className="inline-block mt-0 rounded  px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-primary disabled:shadow-none  transition duration-150 ease-in-out ]"
                        onClick={() => setShowManageHideUrls(true)}

                      >
                        Manage URLs
                      </p>
                    </label>
                  </div>
                </div>
              </div>




              <div className="lg:hidden justify-end items-center px-2 mt-5 pt-5">
                <div className='border border-b border-lowgray'></div>
                <div className="gap-3 flex justify-center items-center mt-3">
                  <EyeIcon className='h-4 w-4 text-primary'></EyeIcon>  <h3>Preview</h3>
                </div>
              </div>

              <div
                id="chatbot_preview"
                className="w-full sm:w-[100%] md:w-[100%] lg:w-[42%] mt-6 "
              >
                <div className="containerChatBot_entire justify-center flex p-1">
                  <div className="widget_container active w-[90%]">
                    <div className="header_ChatBotWidget px-5 mx-3">
                      <div className="profile_photo_container">
                        <img
                          width="35px"
                          src={
                            preferences.logo || "https://deflection.ai/bot.png"
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
                            {preferences.description || "Powered by Deflection AI"}
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
                            preferences.logo || "https://deflection.ai/bot.png"
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

                      <div className="tempoWidget-suggestedQuestions-div_logs">
                        {preferences.chat_suggestions.map((el) => (
                          <div className="tempoWidget-suggestedQuestions-option">
                            {el}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div class="chatbotwidget_footer">
                      <div className="reply_container">
                        <p
                          className="text-[#808080b8]"
                        >Write a reply...</p>

                        <div
                          className="send_audio_button"
                          onclick="handleAudioButton()"
                          id="audioButton"
                        >
                          <svg
                            fill={preferences.primary_color}
                            width="25px"
                            viewBox="0 0 24.00 24.00"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="${preferences.primary_color}"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>
                        </div>

                        <div
                          className="send_button"
                          onclick="handleSubmitQuestion()"
                          id="sendButton"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25px"
                            viewBox="0 0 24 24"
                            className=""
                            fill={preferences.primary_color}
                          >
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </>
        )}
      </div>
    </>
  );
};

export default Customize;
