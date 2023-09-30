import React, { useEffect, useLayoutEffect, useState } from "react";
import "highlight.js/styles/github.css";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  ClipboardIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import Link from "next/link";
import { useRef } from "react";

export const EmbedCard = ({
  element,
  copied,
  setCopied,
  key,
}) => {
  const [code, setCode] = useState("");
  const [embedCode, setEmbedCode] = useState("")
  const [mode, setMode] = useState('chat')

  const [dropdown, setDropdown] = useState(null);

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

  const [isEmbedEnabled, setIsEmbedEnabled] = useState(false);

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

  return (
    <>
      <div className="mt-5 border rounded-md border-border  bg-white h-[260px] relative">
        <div className="bg-border rounded-t-md py-1 pl-6 justify-between cursor-pointer  w-full border border-border flex text-xs text-white gap-1 items-center">
          <h3 className="text-xs font-bold text-white my-2">{element.title}</h3>
          <div className=" relative items-start flex flex-row-reverse pr-2">
            <div className="flex items-center justify-end my-2 pointer" style={{ cursor: "pointer" }}>
              <span
                className={`text-xs px-4 mr-1 flex items-center gap-2 justify-center font-semibold pb-1 pt-1 border-[#F0F0F1]  border-[1px] rounded-lg ${isEmbedEnabled ? "text-black" : "text-[#333333] opacity-30"
                  }`}
                onClick={(e) => toggleEmbed('embed')}
              >
                Embed
              </span>
              <span className="text-white"></span>
              <span
                className={`text-xs px-4 mr-1 flex items-center gap-2 justify-center font-semibold py-1 border-[#F0F0F1]  border-[1px] rounded-lg ${!isEmbedEnabled ? "text-black" : "text-[#333333] opacity-30"
                  }`}
                onClick={(e) => toggleEmbed('chat')}
              >
                Widget
              </span>
            </div>
          </div>
        </div>
        <div className="px-2 sm:px-5 md:px-5 lg:px-5 ">
          <div className="my-2 text-[10px]">
            <div className='my-3'>

              <small>Add this code to the head section of your website's HTML:</small>
            </div>



            {isEmbedEnabled ?
              <div >
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
                  className="border-none bg-sky"
                // onChange={onChange}
                />
                <div className='flex justify-between items-center  absolute bottom-0 right-0 w-full p-[15px]'>
                  <Link href={`/dashboard/chat-settings?name=${element.title}&id=${element.id}`}>
                    <span className="flex items-center hover:text-white text-sky text-sm p-1 px-2 rounded-xl hover:bg-sky  bg-skyblue">
                      <small>Edit </small>
                    </span>
                  </Link>

                  <div className='text-sm rounded-xl inline-block p-1 px-2 hover:text-white text-sky'>
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
              :
              <div>
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
                  className="border-none"
                // onChange={onChange}
                />
                <div className='flex justify-between items-center  absolute bottom-0 right-0 w-full p-[15px]'>
                  <Link href={`/dashboard/chat-settings?name=${element.title}&id=${element.id}`}>
                    <span className="flex items-center hover:text-white text-sky text-sm p-1 px-2 rounded-xl hover:bg-sky  bg-skyblue">
                      <small>Edit </small>
                    </span>
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

                        <span className="flex items-center text-sm p-1 px-2 rounded-xl hover:bg-sky  bg-skyblue">
                          <ClipboardIcon className=" h-4 w-4" />
                          <small className=''>Copy code</small>
                        </span>

                      </CopyToClipboard>
                    )}
                  </div>
                </div>

              </div>
            }


          </div>
        </div>
        <div
          className="flex items-center justify-end mx-5 my-2"
          title={tooltipText}
        >
        </div>
      </div >
    </>
  );
};
