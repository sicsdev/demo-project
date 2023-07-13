import React, { useEffect, useLayoutEffect, useState } from "react";
import "highlight.js/styles/github.css";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  ClipboardIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import Link from "next/link";

export const EmbedCard = ({
  element,
  copied,
  setCopied,
  key,
}) => {
  const [code, setCode] = useState("");
  const [dropdown, setDropdown] = useState(null);

  useEffect(() => {
    setCode(element.code);
    console.log(element.code);
  }, [copied]);

  function addEmbedFlagToCode() {
    const updatedCode = code.includes("embed: true")
        ? code.replace("  embed: true\n", "")
        : code.replace("});", "  embed: true\n});").trim();


    let updateDiv = updatedCode.includes("embed: true")
        ? updatedCode + "\n\n<div id='chatbot_widget'></div>\n"
        : updatedCode.replace("\n\n<div id='chatbot_widget'></div>\n", "")

        setCode(updateDiv);
}

  const [isEmbedEnabled, setIsEmbedEnabled] = useState(false);

  const toggleEmbed = () => {
    setIsEmbedEnabled((prev) => !prev);
    addEmbedFlagToCode();
  };

  const tooltipText = `By default, the widget will be rendered in chat mode, but you can also use it integrated directly in your HTML.\n\nTo do this, simply enable this option and add a container with the ID 'chatbot_widget' on your page.\n\nExample:\n<div id='chatbot_widget'></div>\n\nThe chat will be rendered inside that container.`;

  return (
    <>
      <div className="mt-5 border rounded-md border-border  bg-white">
        <div className="bg-border rounded-t-md py-2 pl-6 justify-between cursor-pointer  w-full border border-border flex text-xs text-white gap-1 items-center">
          <h3 className="font-xl font-bold text-white my-2">{element.title}</h3>
          <div className="relative flex flex-row-reverse pr-2">
            <button
              type={"button"}
              onClick={() => {
                dropdown === key ? setDropdown(null) : setDropdown(key);
              }}
              className="border-none p-0 m-0 flex gap-1 items-center mx-auto"
            >
            </button>
             <button
              type={"button"}
              onClick={() => {
                dropdown === key ? setDropdown(null) : setDropdown(key);
              }}
              className="border-none p-0 m-0 flex gap-1 items-center mx-auto"
            >
              <EllipsisVerticalIcon className="h-5 w-5 " />
            </button>
            {copied.message && copied.key === element.id ? (
              <>
                <span className="flex items-center pr-3">
                  <CheckIcon className="h-5 w-5 " />
                  Copied!
                </span>{" "}
              </>
            ) : (
              <CopyToClipboard
                text={code}
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
                <button
                  type={"submit"}
                  className="border-none p-0 m-0 flex gap-1 items-center pr-3"
                >
                  <ClipboardIcon className=" h-5 w-5 text-white" /> Copy code
                </button>
              </CopyToClipboard>
            )}
            {dropdown === key && (
              <div className="animate-fadeIn absolute left-[-120px] top-[33px] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className=" text-sm ">
                  <li>
                    <Link
                      href={`/dashboard/customize?id=${element.id}&name=${element.title}`}
                      className="font-semibold hover:bg-border  hover:text-white block px-4 py-2 text-heading "
                    >
                    Edit Agent Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/dashboard/view-logs?id=${element.id}&name=${element.title}`}
                      className="font-semibold hover:text-white hover:bg-border block px-4 py-2 text-heading"
                    >
                      View Logs
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      href={`/dashboard/bot-settings?id=${element.id}&name=${element.title}`}
                      className="font-semibold hover:text-white hover:bg-border block px-4 py-2 text-heading"
                    >
                      Settings{" "}
                    </Link>
                  </li> */}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="px-2 sm:px-5 md:px-5 lg:px-5 ">
          <div className="my-2">
            <CodeMirror
              value={code.trim()}
              height="auto"
              theme={xcodeLight}
              extensions={[html({ selfClosingTags: true })]}
              editable={false}
              basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                dropCursor: false,
              }}
              readOnly={true}
              className="border-none"
              // onChange={onChange}
            />
          </div>
        </div>
        <div
          className="flex items-center justify-end mx-5 my-2"
          title={tooltipText}
        >
          <div className="flex items-center justify-end mx-5 my-2 pointer" onClick={toggleEmbed} style={{ cursor: "pointer" }}>
            <span
              className={`text-sm text-gray mr-1 ${
                isEmbedEnabled ? "text-sky" : ""
              }`}
            >
              Embed
            </span>
            <span className="text-sky">|</span>
            <span
              className={`text-sm text-gray ml-1 ${
                !isEmbedEnabled ? "text-sky" : ""
              }`}
            >
              Chat
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
