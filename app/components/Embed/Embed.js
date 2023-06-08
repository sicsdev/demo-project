import React, { useEffect, useLayoutEffect, useState } from 'react'
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import CopyToClipboard from 'react-copy-to-clipboard';
import Button from '../Common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getBotWidget } from '@/app/API/pages/Bot';
import { fetchBot, setModalValue } from '../store/slices/botIdSlice';
import Loading from '../Loading/Loading';
import { fetchProfile } from '../store/slices/userSlice';
import { useRouter } from 'next/navigation';

const Embed = ({ form = true }) => {
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
        if (state.botData.data?.bots &&state.botData.data?.widgets) {
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
        setmarkdown(widget.data.code)
    }

    const handleCustomize = (element) => {
       router.push(`/dashboard/customize?id=${element.id}&name=${element.title}`)
    }
    return (
        <>
            {form ?
                <>
                    {markdown && (
                        <div className='p-5'>
                            <div className='p-5 mt-5 border border-border  bg-white'>
                               
                                <div><pre lang='html'>{`${markdown}`}</pre></div>
                                <div className='flex justify-between'>
                                    <CopyToClipboard text={discount} onCopy={() => {
                                        
                                        dispatch(setModalValue(false))
                                        dispatch(fetchProfile())
                                        dispatch(fetchBot())
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
                                        <Button type={"submit"}
                                            className="inline-block mt-2 rounded-full bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                        >
                                            Copy
                                        </Button>
                                    </CopyToClipboard>
                                    <Button type={"button"}
                                        onClick={() => {
                                            dispatch(setModalValue(false))
                                            dispatch(fetchBot())
                                            dispatch(fetchProfile())
                                        }}
                                        className="inline-block mt-2 rounded-full bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                    >
                                        Close
                                    </Button>
                                </div>
                                {copied.message && (
                                    <small className='text-xs text-soft-green font-bold'>{copied.message}</small>
                                )}
                            </div>

                        </div>
                    )}
                </>
                :
                <>
                    {state.botData.isLoading === true ?
                        <Loading /> :
                        <>
                            {detailsData && detailsData.map((element, key) =>
                                <div className='p-5 ' key={key}>
                                    <div className='p-5 mt-5 border border-border bg-white'>
                                        <h3 className='font-xl font-bold text-heading my-2'>{element.title}</h3>
                                        <div><pre lang='html'>{`${element.code}`}</pre></div>
                                        <div className='flex justify-between'>
                                            <CopyToClipboard text={element.code} onCopy={() => setCopied((prev) => {
                                                setCopied((prev) => {
                                                    return {
                                                        ...prev,
                                                        message: "Copied !",
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
                                            })}>
                                                <Button type={"submit"}
                                                    className="inline-block mt-2 rounded-full bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                                >
                                                    Copy
                                                </Button>
                                            </CopyToClipboard>

                                        
                                            <Button onClick={() => handleCustomize(element)}
                                                    className="inline-block mt-2 rounded-full bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                                >
                                                    Customize
                                                </Button>

                                        </div>


                                        {copied?.key != null && copied?.key === key && (
                                            <small className='text-xs text-soft-green font-bold'>{copied.message}</small>
                                        )}
                                    </div>
                                </div>

                            )}

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