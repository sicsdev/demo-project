import React, { useEffect, useLayoutEffect, useState } from "react";
import "highlight.js/styles/github.css";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  ClipboardIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
  PencilIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  CodeBracketSquareIcon
} from "@heroicons/react/24/outline";

import { PlusIcon } from '@heroicons/react/24/outline';
import Image from "next/image"

import { AdjustmentsHorizontalIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import Link from "next/link";
import { useRef } from "react";
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import LineChart from "../Dashboard/Chart/LineChart";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { modifyBot } from "@/app/API/pages/Bot";

export const EmbedCard = ({
  element,
  copied,
  setCopied,
  key,
  index,
  skeleton,
  setSkeleton,
  detailsData,
  setDetailsData
}) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, detailsData.length);
  }, [detailsData]);

  const focusInput = (index) => {
    if (inputRefs.current[index]) {
      setTimeout(() => {
        setToggle(null)
      }, 100);
      inputRefs.current[index].focus();
    }
  }
  const [code, setCode] = useState("");
   const [disabledStatus, setDisabledStatus] = useState(detailsData.map(() => false));
   const [toggle, setToggle] = useState(null)
  const [embedCode, setEmbedCode] = useState("")
  const [mode, setMode] = useState('chat')
  const [showCode, setShowCode] = useState(element.usedIn.length === 0 ? element.id : null)
  const [dropdown, setDropdown] = useState(null);

  const [activate, setActivate] = useState(false)
  useEffect(() => {
    setCode(element.code);
    addEmbedFlagToCode()
  }, [copied]);
 
  function addEmbedFlagToCode() {
    // const updatedCode = code.includes("embed: true")
    //   ? code.replace("  embed: true\n", "")
    //   : code.replace("});", "  embed: true\n});").trim();
    // let updateDiv = updatedCode.includes("embed: true")
    //   ? updatedCode + "\n\n<div id='chatbot_widget'></div>\n"
    //   : updatedCode.replace("\n\n<div id='chatbot_widget'></div>\n", "")

    const updatedCode = element.code.replace("});", "  embed: true\n});").trim();
    setEmbedCode(updatedCode);
  }

  const [isEmbedEnabled, setIsEmbedEnabled] = useState(true);

  const toggleEmbed = (type) => {
    if (type === 'embed') {
      setIsEmbedEnabled(true);
    } else {
      setIsEmbedEnabled(false);
    }
  };

  const divRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setDropdown(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const tooltipText = `By default, the widget will be rendered in chat mode, but you can also use it integrated directly in your HTML.\n\nTo do this, simply enable this option and add a container with the ID 'chatbot_widget' on your page.\n\nExample:\n<div id='chatbot_widget'></div>\n\nThe chat will be rendered inside that container.`;

  console.log("element0", element)
  function hasUsage(array) {
    return array.some(item => item.usage > 0);
  }
  console.log("detailsData", detailsData)
  console.log("detailsData", index)
  const handleInput = (e, index) => {
    const { value } = e.target;
    const newData = [...detailsData];

    // Update the specific item in the new array
    newData[index] = {
      ...newData[index],
      title: value
    };

    // Update the state with the new array
    setDetailsData(newData);
  };
  const updateNameOFBot = async (index) => {
    const response = await modifyBot(detailsData[index].id, { chat_title: detailsData[index].title })
    setActivate(false)
  }
  return (
    <div className="p-2 sm:pt-0 sm:px-5" key={index}>
      <div className={`${showCode === null && ("h-[220px]")} mt-4 shadow-md bg-white border-2 border-white hover:border-primary rounded-lg group overflow-hidden ${hasUsage(element.usage) !== true && 'flex flex-col justify-between'}`} >
        <div className='flex justify-between items-center pt-4 px-4'>
          <input ref={(el) => (inputRefs.current[index] = el)} className={` block  px-2 py-2 bg-white focus:bg-white  rounded-md  text-sm  !placeholder-[#C7C6C7]  focus:outline-none border  disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:!border-none  w-full  border-none ring-0 focus-visible:border-none font-semibold text-heading focus:!border-0`} name="title" id="title" value={detailsData[index].title} onChange={(e) => {
            handleInput(e, index)
          }}  disabled={activate === false} onBlur={(e) => { 
            setToggle(null)
            updateNameOFBot(index) }} />
          <div className="relative" onClick={(e) => { 
            setActivate(true)
            setToggle(prev => prev ? null : element.id) }}>
            <EllipsisHorizontalIcon className="h-6 w-6 text-heading hover:bg-[#F6F6F6] hover:rounded-md" />
            {toggle === element.id && (
              <div className="z-10  w-48 bg-white rounded-lg shadow absolute right-0">
                <ul className="p-[5px] space-y-1 text-sm">
                  <li>
                    <div className="flex items-center font-semibold justify-start gap-2 p-2 text-[#6d7480] hover:bg-[#F6F6F6] hover:text-primary rounded-[6px]" onClick={(e) => {
                      setToggle(null)
                      focusInput(index)
                    }}>
                      <PencilIcon className="h-4 w-4 " />
                      <p className="text-[13px]">Rename</p>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center font-semibold justify-start gap-2 p-2 text-[#6d7480]  hover:bg-[#F6F6F6] hover:text-primary rounded-[6px]" onClick={(e) => { setShowCode(prev => prev ? null : element.id) }}>
                      {showCode === element.id ?
                        <ChartBarIcon className="h-4 w-4 " />
                        :
                        <CodeBracketSquareIcon className="h-4 w-4 " />
                      }

                      <p className="text-[13px]">{showCode === element.id ? "Show Usage" : "Show html"} </p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {showCode === null && (
          <>
            {element?.usedIn.length > 0 && (
              <>
                {hasUsage(element.usage) === true ?
                  <LineChart chartData={element.usage} />
                  :
                  <Tippy className="chart-animation" content="This bot has no usage this week" interactive={true} interactiveBorder={20} animation={'fade slide-down'} placement={"bottom"}>
                    <div className='w-full h-[100px] relative'>
                      {/* You will need to adjust the src path to your image */}
                      <Image
                        fill={"true"}
                        className={` bg-contain mx-auto`}
                        alt="logo.png"
                        src={"/blank.png"}
                      />
                      <div className="absolute bottom-0 left-0 w-full">
                        {/* Wave SVG or similar decorative element */}
                        <div className='wave-pattern' aria-hidden='true'>
                          {/* Inline SVG or an img tag for the wave pattern */}
                        </div>
                      </div>
                    </div>
                  </Tippy>
                }
              </>
            )}
          </>)}

        {showCode === element.id && (
          <div className="px-2 sm:px-5 md:px-5 lg:px-5 ">
            <div className="my-2 text-[10px]">
              <div className='my-3'>
                <small>
                  {skeleton ?
                    <SkeletonLoader count={1} height={10} width="80%" />
                    :
                    "Add this code to the head section of your website's HTML:"
                  }
                </small>
              </div>
              {skeleton ?
                <SkeletonLoader count={4} height={10} width="100%" />
                :
                <CodeMirror
                  value={isEmbedEnabled ? embedCode.trim() : code.trim()}
                  height="auto"
                  theme={xcodeLight}
                  extensions={[html({ selfClosingTags: true })]}
                  editable={false}
                  basicSetup={{
                    lineNumbers: false,
                    foldGutter: false,
                    dropCursor: false,
                    highlightActiveLine: false
                  }}
                  readOnly={true}
                  className="border-none home_widgets_box"
                // onChange={onChange}
                />
              }
              <div className='flex justify-between items-center'>
                <Link href={`/dashboard/chat-settings?name=${element.title}&id=${element.id}`}>
                  {skeleton ?
                    <SkeletonLoader count={1} height={30} width={45} />
                    :
                    <span className="flex items-center hover:text-white text-sky text-sm p-1 px-2 rounded-xl hover:bg-sky  bg-skyblue">
                      <small>Edit </small>
                    </span>
                  }
                </Link>

                <div className='text-sm  rounded-xl inline-block p-1 px-2  hover:text-white text-sky'>
                  {copied.message && copied.key === element.id ? (
                    <>
                      <span className="flex items-center text-sm p-1 px-2 rounded-xl hover:bg-sky  bg-skyblue">
                        <CheckIcon className="h-4 w-4 " />
                        <small className=''>Copied!</small>
                      </span>{" "}
                    </>
                  ) : (
                    <CopyToClipboard
                      text={isEmbedEnabled ? embedCode : code}
                      onCopy={() => {
                        setCopied((prev) => {
                          return {
                            ...prev,
                            message: "copied !",
                            key: element.id,
                          };
                        });
                        setTimeout(() => {
                          setCopied((prev) => {
                            return {
                              ...prev,
                              message: null,
                              key: null,
                            };
                          });
                        }, 3000);
                      }}
                    >
                      {skeleton ?
                        <SkeletonLoader count={1} height={30} width={85} />
                        :
                        <span className="flex items-center text-sm p-1 px-2 rounded-xl hover:bg-sky sm:mr-[-11px]  bg-skyblue">
                          <ClipboardIcon className=" h-4 w-4" />
                          <small className=''>Copy code</small>
                        </span>
                      }
                    </CopyToClipboard>
                  )}
                </div>
              </div>



              {isEmbedEnabled &&
                <div className='mt-5 relative'>
                  <hr className='opacity-10 my-2'></hr>
                  <div className='my-3'>
                    <small>Add this code to the HTML where you want display the Deflection AI chat:</small>
                  </div>
                  <CodeMirror
                    value={`<div id="chatbot_widget"></div>`}
                    height="auto"
                    theme={xcodeLight}
                    extensions={[html({ selfClosingTags: false })]}
                    editable={false}
                    basicSetup={{
                      lineNumbers: false,
                      foldGutter: false,
                      dropCursor: false,
                      highlightActiveLine: false
                    }}
                    readOnly={true}
                    className="border-none bg-sky home_widgets_box"
                  // onChange={onChange}
                  />
                  <div className='flex justify-end items-center'>


                    <div className='text-sm rounded-xl inline-block p-1 px-2 hover:text-white text-sky sm:mr-[-11px] '>
                      {copied.message && copied.key === `${element.id}embed` ? (
                        <>
                          <span className="flex items-center text-sm p-1 px-2 rounded-xl hover:bg-sky  bg-skyblue">
                            <CheckIcon className="h-4 w-4 " />
                            <small className=''>Copied!</small>
                          </span>{" "}
                        </>
                      ) : (
                        <CopyToClipboard
                          text={`<div id="chatbot_widget"></div>`}
                          onCopy={() => {
                            setCopied((prev) => {
                              return {
                                ...prev,
                                message: "copied !",
                                key: `${element.id}embed`,
                              };
                            });
                            setTimeout(() => {
                              setCopied((prev) => {
                                return {
                                  ...prev,
                                  message: null,
                                  key: null,
                                };
                              });
                            }, 3000);
                          }}
                        >
                          <span className="flex items-center text-sm p-1 px-2 rounded-xl hover:bg-sky  bg-skyblue">
                            <ClipboardIcon className=" h-4 w-4" />
                            <small>Copy code</small>
                          </span>
                        </CopyToClipboard>
                      )}
                    </div>
                  </div>
                </div>
              }


            </div>
          </div>
        )}
      </div>
    </div>);
};
