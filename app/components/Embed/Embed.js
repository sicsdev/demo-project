import React, { useEffect, useLayoutEffect, useState } from "react";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { checkBotInstallation, getBotWidget } from "@/app/API/pages/Bot";
import { fetchBot } from "../store/slices/botIdSlice";
import Loading from "../Loading/Loading";
import { useRouter } from "next/navigation";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

import { xcodeLight } from "@uiw/codemirror-theme-xcode";

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import Link from "next/link";
import SkeletonLoader from "../Skeleton/Skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import { EmbedCard } from "./EmbedCard";
const Embed = ({ form = true, setTotalRecords }) => {
  const router = useRouter();
  const state = useSelector((state) => state.botId);
  const dispatch = useDispatch();
  const [copied, setCopied] = useState({ key: null, message: null });
  const [markdown, setmarkdown] = useState("");
  const [detailsData, setDetailsData] = useState(null);

  useLayoutEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    if (state.id && form) {
      getBotWidgetData();
    }
    if (!form && state.botData.data === null) {
      dispatch(fetchBot());
    }
  }, []);
  useEffect(() => {
    if (state.botData.data?.bots && state.botData.data?.widgets) {
      const getTitle = state.botData.data.bots.map(
        (element) => element.chat_title
      );
      const widgetCode = state.botData.data.widgets;
      const mergedArray = widgetCode.map((item, index) => {
        const title = getTitle[index];
        return {
          id: item.id,
          code: item.code,
          title: title,
        };
      });
      setDetailsData(mergedArray);
      // setTotalRecords(mergedArray)
    }
  }, [state.botData.data]);
  const getBotWidgetData = async () => {
    const widget = await getBotWidget(state.id);
    if (widget.data.code) {
      setmarkdown(widget.data.code);
      const detail = await checkBotInstallation(state.id);
    }
  };

  return (
    <>
      {form ? (
        <>
          {markdown && (
            <div className="p-2 sm:p-5 md:p-5 lg:p-5 ">
              <h3 className="font-bold text-heading text-center">
                Copy and Install Bot HTML Code
              </h3>
              <div className="mt-5 border rounded-md border-border  bg-white">
                <div className="bg-border rounded-t-md py-2 px-6 justify-end cursor-pointer  w-full border border-border flex text-xs text-white gap-1 items-center">
                  {copied.message ? (
                    <>
                      <span className="flex items-center">
                        {" "}
                        <CheckIcon className="h-5 w-5 " /> Copied!
                      </span>{" "}
                    </>
                  ) : (
                    <CopyToClipboard
                      text={markdown.trim()}
                      onCopy={() => {
                        setCopied((prev) => {
                          return {
                            ...prev,
                            message: "copied !",
                            key: "0",
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
                        className="border-none p-0 m-0 flex gap-1 items-center"
                      >
                        <ClipboardIcon className=" h-5 w-5 text-white" /> Copy
                        code
                      </button>
                    </CopyToClipboard>
                  )}
                </div>
                <div className="px-2 sm:px-5 md:px-5 lg:px-5 ">
                  <div>
                    <CodeMirror
                      value={markdown.trim()}
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
                      className="border-none home_widgets_box"
                      // onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {state.botData.isLoading === true ? (
            null
          ) : (               
            <>
              <div className="grid grid-cols-1 sm:pb-3 md:grid-cols-2 lg:grid-cols-2">
                {detailsData &&
                  detailsData.map((element, key) => (
                    <div className="p-2 sm:pt-0 sm:px-5" key={key}>
                      <EmbedCard
                        key={key}
                        element={element}
                        copied={copied}
                        setCopied={setCopied}
                      ></EmbedCard>
                    </div>
                  ))}
              </div>

              {state.botData.error && (
                <span className="sm text-danger fixed left-[50%] top-[50%] font-semibold text-center">
                  {state.botData.error}   
                </span>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Embed;
