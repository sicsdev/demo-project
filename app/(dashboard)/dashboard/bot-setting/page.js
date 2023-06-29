
'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/app/components/Common/Button/Button';
import { getAllBotData, modifyBot } from '@/app/API/pages/Bot';
import { useDispatch, useSelector } from 'react-redux';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
import EmailConfig from '@/app/components/EmailConfig/EmailConfig';
import LoaderButton from '@/app/components/Common/Button/Loaderbutton';
import BotSettingReadOnly from '@/app/components/Forms/ReadOnly/BotSetting';
import Card from '@/app/components/Common/Card/Card';
import Swal from 'sweetalert2';

const BotSetting = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [basicFormData, setBasicFormData] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const searchParams = useSearchParams();
    const router = useRouter()
    const [botId, setBotId] = useState(null)
    useEffect(() => {
        const bot_id = searchParams.get("id")
        const bot_name = searchParams.get("name")
        if (bot_id) { getBotInfo(bot_id) }

    }, []);

    const getBotInfo = (id) => {
        setBotId(id)
        getAllBotData([id]).then((response) => {
            let res = response[0].data
            setBasicFormData(prev => {
                return {
                    ...prev,
                    email: res.email,
                    agent_name: res.email_agent_name,
                    agent_title: res.email_agent_title,
                    email_introduction: res.email_greeting[0] || "",
                    email_signOff: res.email_farewell[0] || "",

                }
            })
        })
    }
    const SubmitValues = async () => {
        setLoading(true)
        let payload = {
            email: basicFormData.email_prefix + "@" + basicFormData.company_name + '.gettempo.ai',
            email_agent_name: basicFormData.agent_name,
            email_agent_title: basicFormData.agent_title,
            email_greeting: [basicFormData.email_introduction],
            email_farewell: [basicFormData.email_signOff],
        }
        const response = await modifyBot(botId, payload)
        if (response.status === 200) {
            setLoading(false)
            setIsEdit(false)
            Swal.fire(
                'Success',
                'Updated Form',
                'success'
            )
        } else {
            setLoading(false)
        }
    }
    const DisablingButton = () => {
        const requiredKeys = [
            'agent_title',
            'email_introduction',
            'email_signOff']
        const str_values = requiredKeys.some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        const arr_values = ['agent_name'].every(key => !basicFormData[key] || basicFormData[key].length === 0);
        if (str_values || arr_values) {
            return true
        }

        return false

    }
    return (
        <div>
            {isEdit == false ?
                <>
                    <p className='float-right my-5 cursor-pointer' onClick={() => { setIsEdit(true) }}>Edit</p>
                </> :
                <>
                    <p className='float-right my-5 cursor-pointer' onClick={() => { setIsEdit(false) }}>Back</p>
                </>
            }
            <div className="border-b border-primary dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a
                            href="#"
                            className="flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                            aria-current="page"
                        >
                            <WrenchScrewdriverIcon className="h-6 w-6 text-gray-500" /> Bot Setting
                        </a>
                    </li>
                </ul>
            </div>
            <div className='mt-3'>
                {isEdit === false ?
                    <BotSettingReadOnly state={basicFormData} /> :
                    <Card>
                        <EmailConfig basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
                        <div className={`flex p-2 rounded-b mt-5 justify-between`}>
                            <>
                                {loading ? <LoaderButton /> :
                                    <Button type={"button"}
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                        onClick={(e) => { SubmitValues() }}
                                        disabled={DisablingButton()}
                                    >
                                        Submit

                                    </Button>
                                }

                            </>
                        </div>
                    </Card>}

            </div>
        </div>
    )
}

export default BotSetting