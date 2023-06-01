import React, { useEffect, useLayoutEffect, useState } from 'react'
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import CopyToClipboard from 'react-copy-to-clipboard';
import { marked } from "marked";
import Button from '../Common/Button/Button';
import { useSelector } from 'react-redux';
import { getBotWidget } from '@/app/API/pages/Bot';
const Embed = () => {
    const state = useSelector((state) => state.botId)
    const [copied, setCopied] = useState(false);
    const [markdown, setmarkdown] = useState('');
    const discount = `<div className="trustpilot-widget" data-locale="en-US" data-template-id="53aa8912dec7e10d38f59f36"
    data-businessunit-id="63ce673f7ec124282d18a6b4" data-style-height="140px" data-style-width=
    "100%" data-theme="1ight" data-stars="1,2,3,4,5" data-review-languages="en"><a href="https:
    //www.trustpilot.com/review/nextmed.com"target="_blank" rel="noopener">Trustpilot</a></div>`

    useLayoutEffect(() => {

        hljs.highlightAll();
    }, [])


    useEffect(() => {
        if (state.id) {
            getBotWidgetData()
        }
    }, [])
    
    const getBotWidgetData = async () => {
        const widget = await getBotWidget(state.id)

        setmarkdown(widget.data.code)
    }
    return (
        <>
            {markdown && (
                <div className='p-5'>

                    <div className='p-5 mt-5 border border-border'>
                        <h3 className='font-xl font-bold text-heading my-2'>Add this code to the HTML of your website where you’re displaying your TrustBox.</h3>
                        <div><pre lang='html'>{`${markdown}`}</pre></div>
                        <CopyToClipboard text={discount} onCopy={() => setCopied(true)}>
                            <Button type={"submit"}
                                className="inline-block mt-2 rounded-full bg-voilet px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                            >
                                Copy
                            </Button>
                        </CopyToClipboard>
                    </div>

                </div>
            )}
        </>
    )
}

export default Embed