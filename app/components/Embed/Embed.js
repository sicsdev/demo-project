import React, { useEffect, useLayoutEffect, useState } from 'react'
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import CopyToClipboard from 'react-copy-to-clipboard';
import Button from '../Common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { checkBotInstallation, getBotWidget } from '@/app/API/pages/Bot';
import { fetchBot, setModalValue } from '../store/slices/botIdSlice';
import Loading from '../Loading/Loading';
import { fetchProfile } from '../store/slices/userSlice';
import { useRouter } from 'next/navigation';
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

import { xcodeLight, xcodeLightInit, xcodeDark, xcodeDarkInit } from '@uiw/codemirror-theme-xcode';



import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
const Embed = ({ form = true, intakeStep, setIntakeStep, setIntakeCompleteStep }) => {
    const router = useRouter()
    const state = useSelector((state) => state.botId)
    const dispatch = useDispatch()
    const [copied, setCopied] = useState({ key: null, message: null });
    const [markdown, setmarkdown] = useState('');
    const [detailsData, setDetailsData] = useState(null)
    const discount = `<div className="trustpilot-widget" data-locale="en-US" data-template-id="53aa8912dec7e10d38f59f36"
    data-businessunit-id="63ce673f7ec124282d18a6b4" data-style-height="140px" data-style-width=
    "100%" data-theme="1ight" data-stars="1,2,3,4,5" data-review-languages="en"><a href="https:
    //www.trustpilot.com/review/nextmed.com"target="_blank" rel="noopener">Trustpilot</a></div>`

    useLayoutEffect(() => {
        hljs.highlightAll();
    }, [])


    useEffect(() => {
        if (state.id && form) {
        getBotWidgetData()
        }
        if (!form && state.botData.data === null) {
            dispatch(fetchBot())
        }

    }, [])
    useEffect(() => {
        if (state.botData.data?.bots && state.botData.data?.widgets) {
            const getTitle = state.botData.data.bots.map(element => element.chat_title)
            const widgetCode = state.botData.data.widgets
            const mergedArray = widgetCode.map((item, index) => {
                const title = getTitle[index];
                return {
                    id: item.id,
                    code: item.code,
                    title: title
                };
            });
            setDetailsData(mergedArray)
        }
    }, [state.botData.data])
    const getBotWidgetData = async () => {
        const widget = await getBotWidget(state.id)
        if (widget.data.code) {
            setmarkdown(widget.data.code)
            const detail = await checkBotInstallation(state)
        }
    }

    const handleBack = () => {
        setIntakeStep(intakeStep - 1)
    }

    return (
        <>
            {form ?
                <>
                    {markdown && (
                        <div className=' sm:p-5 md:p-5 lg:p-5 '>

                            <div className='mt-5 border rounded-md border-border  bg-white'>
                                <div className='bg-border rounded-t-md p-2 justify-end cursor-pointer  w-full border border-border flex text-xs text-white gap-1 items-center'>
                                    {copied.message ? <>
                                        <span className='flex items-center'> <CheckIcon className="h-5 w-5 " /> Copied!</span> </> :
                                        <CopyToClipboard text={markdown.trim()} onCopy={() => {
                                            setCopied((prev) => {
                                                return {
                                                    ...prev,
                                                    message: "copied !",
                                                    key: "0"
                                                }
                                            })
                                            setTimeout(() => {
                                                setCopied((prev) => {
                                                    return {
                                                        ...prev,
                                                        message: null,
                                                        key: null
                                                    }
                                                })
                                            }, 3000)
                                        }}>
                                            <button type={"submit"}
                                                className="border-none p-0 m-0 flex gap-1 items-center"
                                            >
                                                <ClipboardIcon className=" h-5 w-5 text-white" /> Copy code
                                            </button>
                                        </CopyToClipboard>
                                    }
                                </div>
                                <div className='px-2 sm:px-5 md:px-5 lg:px-5 '>
                                    <div>
                                        <CodeMirror
                                            value={markdown.trim()}
                                            height="auto"
                                            theme={xcodeLight}
                                            extensions={[html({ selfClosingTags: true })]}
                                            editable={false}
                                            basicSetup={{ lineNumbers: false, foldGutter: false, dropCursor: false }}
                                            readOnly={true}
                                            className='border-none'
                                        // onChange={onChange}

                                        />
                                    </div>

                                </div>
                            </div>
                            <div className='flex justify-between my-8'>
                                <Button
                                    onClick={handleBack}
                                    className="inline-block mt-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                >
                                    Back
                                </Button>
                                <Button type={"button"}
                                    onClick={() => {
                                        setIntakeCompleteStep(4)
                                        setIntakeStep(4)
                                    }}
                                    className="inline-block mt-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </>
                :
                <>

                    {state.botData.isLoading === true ?
                        <Loading /> :
                        <>
                            <div className='grid grid-cols-1 sm:grid-cols-2   md:grid-cols-2 lg:grid-cols-2'>
                                {detailsData && detailsData.map((element, key) =>
                                    <div className=' sm:p-5 md:p-5 lg:p-5 ' key={key}>

                                        <div className='mt-5 border rounded-md border-border  bg-white'>
                                            <div className='bg-border rounded-t-md p-2 justify-between cursor-pointer  w-full border border-border flex text-xs text-white gap-1 items-center'>
                                                <Link href={`/dashboard/customize?id=${element.id}&name=${element.title}`}
                                                >
                                                    <PencilSquareIcon className='h-5 w-5' />
                                                </Link>
                                                {copied.message && copied.key === key ? <>
                                                    <span className='flex items-center'> <CheckIcon className="h-5 w-5 " /> Copied!</span> </> :
                                                    <CopyToClipboard text={element.code} onCopy={() => {
                                                        setCopied((prev) => {
                                                            return {
                                                                ...prev,
                                                                message: "copied !",
                                                                key: key
                                                            }
                                                        })
                                                        setTimeout(() => {
                                                            setCopied((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    message: null,
                                                                    key: null
                                                                }
                                                            })
                                                        }, 3000)
                                                    }}>
                                                        <button type={"submit"}
                                                            className="border-none p-0 m-0 flex gap-1 items-center"
                                                        >
                                                            <ClipboardIcon className=" h-5 w-5 text-white" /> Copy code
                                                        </button>
                                                    </CopyToClipboard>
                                                }
                                            </div>
                                            <div className='px-2 sm:px-5 md:px-5 lg:px-5 '>
                                                <h3 className='font-xl font-bold text-heading my-2'>{element.title}</h3>
                                                <div>
                                                    <CodeMirror
                                                        value={element.code.trim()}
                                                        height="auto"
                                                        theme={xcodeLight}
                                                        extensions={[html({ selfClosingTags: true })]}
                                                        editable={false}
                                                        basicSetup={{ lineNumbers: false, foldGutter: false, dropCursor: false }}
                                                        readOnly={true}
                                                        className='border-none'
                                                    // onChange={onChange}

                                                    /></div>
                                            </div>

                                        </div>
                                    </div>

                                )}
                            </div>

                            {state.botData.error && (
                                <span className='sm text-danger fixed left-[50%] top-[50%] font-semibold text-center'>{state.botData.error}</span>
                            )}
                        </>
                    }
                </>
            }
        </>
    )
}

export default Embed