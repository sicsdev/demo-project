import { PhoneIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import SelectOption from '../Common/Input/SelectOption'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBot } from '../store/slices/botIdSlice';
import TextField from '../Common/Input/TextField';
import { getMyPhoneNumbers, updatePhoneNumberData } from '@/app/API/components/PhoneNumber';
import Multiselect from 'multiselect-react-dropdown';
import Button from '../Common/Button/Button';
import { errorMessage, successMessage } from '../Messages/Messages';
import Loading from '../Loading/Loading';
import { ToastContainer } from 'react-toastify';

const PhoneHandle = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.botId);
    const [botValue, setBotValue] = useState([]);
    const [basicFormData, setBasicFormData] = useState([])
    const [phoneNumbers, setPhoneNumbers] = useState(null);
    const [pageLoading, setPageLoading] = useState(true)
    const [greetingLoading, setGreetingLoading] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [greeting, setGreeting] = useState('')
    const getAllBots = () => {
        const getTitle = state.botData.data.bots.map(
            (element) => element.chat_title
        );
        const widgetCode = state.botData.data.widgets;
        const mergedArray = widgetCode.map((item, index) => {
            const title = getTitle[index];
            return {
                value: item.id,
                name: title,
            };
        });
        setBotValue(mergedArray);
    }
    useEffect(() => {
        if (state.botData.data === null) {
            dispatch(fetchBot());
        }
        if (state.botData.data?.bots && state.botData.data?.widgets) {
            getAllBots();
        }
        if (phoneNumbers === null) {
            EnterprisePhoneNumber()
        }
    }, [state.botData.data]);

    const EnterprisePhoneNumber = async () => {
        setPageLoading(true)
        const response = await getMyPhoneNumbers()
        if (response.results.length > 0) {
            setPhoneNumbers(response);
            setBasicFormData({
                id: response.results[0].id,
                voice: "",
                options: null,
                bots: response.results[0].bots.map((ele) => {
                    return { name: ele.bot.chat_title, value: ele.bot.id }
                }),
                checked: response.results[0].active,
                greeting: response.results[0].greeting,
                phone: response.results[0].data
            })
            setPageLoading(false)
        } else {
            setPageLoading(false)
        }
    }



    const handleChange = () => {
        if (basicFormData?.checked === true) {
            setBasicFormData(prev => {
                return {
                    ...prev,
                    checked: false
                }
            })
        } else {
            setBasicFormData(prev => {
                return {
                    ...prev,
                    checked: true
                }
            })
        }
    }
    const onSelectData = (selectedList, selectedItem) => {
        setBasicFormData(prev => {
            return {
                ...prev,
                bots: selectedList
            }
        })
    }
    const handleInputValues = (event) => {
        const { name, value } = event.target
        debugger
        setBasicFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    function getErrorMessage(data) {
        for (const bot of data.bots) {
            for (const option in bot) {
                if (Array.isArray(bot[option])) {
                    const errorMessage = bot[option][0].replace(/"/g, '');
                    return errorMessage;
                }
            }
        }
        return "";
    }
    const SubmitForm = async (type) => {
        let payload = {}
        let id = null

        switch (type) {
            case "phone":
                setFormLoading(true)
                payload = {
                    active: basicFormData.checked,
                    bots: basicFormData.bots.map((ele) => {
                        return {
                            'bot': ele.value, "option": basicFormData.checked === true ? basicFormData.options : 0, "voice": basicFormData?.voice
                        }
                    })
                }
                id = basicFormData?.id
                break;
            case "greeting":
                setGreetingLoading(true)
                payload = {
                    greeting: basicFormData.greeting
                }
                id = basicFormData?.id
                break;

            default:
                break;
        }


        const response = await updatePhoneNumberData(payload, id)
        if (response.status === 200) {
            if (type === "phone") {
                successMessage("Phonenumber Submited ! ")
            } else {
                successMessage("Greeting submitted !")
            }
            setGreetingLoading(false)
            setFormLoading(false)
        } else {
            errorMessage(getErrorMessage(response.response.data))
            setGreetingLoading(false)
            setFormLoading(false)
        }
    }
    function formatPhoneNumber(phoneNumber) {
        const cleanedNumber = phoneNumber.replace(/\D/g, '');
        if (cleanedNumber.length === 10) {
            const formattedNumber = `+1 (${cleanedNumber.slice(0, 3)}) ${cleanedNumber.slice(3, 6)}-${cleanedNumber.slice(6)}`;
            return formattedNumber;
        }

        return phoneNumber;
    }

    return (
        <div className='container my-8'>
            {pageLoading ? <Loading /> :
                <div className='border border-border rounded-lg ' >
                    <div>
                        <div className='flex rounded-t-lg border border-t-0 border-r-0 border-l-0 p-5 border-border justify-between items-center'>
                            <div className='flex justify-between items-center gap-4'>
                                <div><PhoneIcon className="h-8 w-8" /></div>
                                <div>
                                    <h3 className='text-normal font-semibold text-heading'>Phone Menu</h3>
                                    <p className='text-sm text-border font-normal'>Configure a custom phone menu callers can navigate</p>
                                </div>

                            </div>
                            <div>
                                <p className='text-sm text-heading font-normal'>{basicFormData?.phone.replace(/^(\+?1)?(\d{3})(\d{3})(\d{4})$/, "+1 ($2) $3-$4")}</p>
                            </div>
                        </div>
                        <div className='p-5'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h3 className='text-normal font-semibold text-heading'>Enable Phone Menu</h3>
                                    <p className='text-sm font-normal text-border'>Enable to set up a phone menu for this number</p>
                                </div>
                                <div>
                                    <label className="switch">
                                        <input type="checkbox" name="billingEnabled" onChange={() => handleChange()} checked={basicFormData?.checked === true} />
                                        <span className="slider round h-[27px] w-[55px]"></span>
                                    </label>
                                </div>
                            </div>
                            <hr className='mt-6 text-border' />
                        </div>
                        <div className='px-5'>
                            <h3 className='text-normal font-semibold text-heading'>Greeting message</h3>
                            <div className='block sm:flex md:flex lg:flex gap-2 justify-between items-center mt-1'>
                                <div className='w-full sm:w-[80%] md:w-[80%] lg:w-[80%]'>

                                    <TextField
                                        value={basicFormData?.greeting}
                                        name="greeting"
                                        className="py-3 mt-2"
                                        title={""}
                                        onChange={handleInputValues}
                                        placeholder={"Example: Hi! Thanks for calling. For sales, press 1 or say sales Set a greeting message For support, press 2 or say support"}
                                        type={"text"}
                                        id={"greeting_text"}
                                    />
                                </div>
                                <Button
                                    type={"button"}
                                    className="mt-2 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                                    disabled={basicFormData?.greeting === '' || greetingLoading === true}
                                    onClick={() => SubmitForm("greeting")}
                                >
                                    {greetingLoading ? "Loading..." : "Set a greeting message"}
                                </Button>
                            </div>
                            <hr className='mt-6 text-border' />
                        </div>
                        <div className='p-5'>
                            <div className='flex justify-between items-center'>
                                <div className=''>
                                    <h3 className='text-normal font-semibold text-heading'>Menu Options</h3>
                                    <p className='text-sm font-normal text-border'>Options are triggered by keypad and voice commands, and can route to other team members in your workspace, or even to external phone numbers.</p>
                                </div>
                                <div>

                                </div>
                            </div>


                            <div className='block sm:flex md:flex lg:flex justify-between items-end gap-2'>
                            <div className='w-full'>
                                    <h3 className='font-bold my-2 text-sm text-heading'>Key</h3>
                                    <SelectOption
                                        onChange={handleInputValues}
                                        value={basicFormData?.options ?? ''}
                                        name="options"
                                        values={[
                                            { "name": "0", "value": 0 },
                                            { "name": "1", "value": 1 },
                                            { "name": "2", "value": 2 },
                                            { "name": "3", "value": 3 },
                                            { "name": "4", "value": 4 },
                                            { "name": "5", "value": 5 },
                                            { "name": "6", "value": 6 },
                                            { "name": "7", "value": 7 },
                                            { "name": "8", "value": 8 },
                                            { "name": "9", "value": 9 }
                                        ]}
                                        id={"options"}
                                        className="py-3"
                                        error={""}
                                    />

                                </div>
                                <div className='w-full'>

                                    <h3 className='font-bold my-2 text-sm text-heading'>Bots</h3>
                                    <Multiselect
                                        options={botValue}
                                        selectedValues={basicFormData?.bots ?? []}
                                        onSelect={onSelectData}
                                        placeholder={"Select Bots"}
                                        onRemove={onSelectData}
                                        id={"bots"}
                                        displayValue="name"
                                        closeOnSelect={true}
                                    /></div>
                                  <div className='w-full '>
                                    <SelectOption
                                        onChange={handleInputValues}
                                        value={basicFormData?.voice ?? ''}
                                        name="voice"
                                        values={[{ name: 'Rachel', value: "rachel" }, { name: "Jack", value: "jack" }]}
                                        id={"voice"}
                                        className="py-3 "
                                        title={
                                            <h3 className='font-bold my-2 text-sm text-heading'>Voice</h3>}
                                        error={""}
                                    /></div>
                                <div className='mt-2 sm:m-0 md:m-0 lg:m-0'>  
                                    <Button
                                    type={"button"}
                                    className="inline-block rounded bg-primary px-6 pb-2.5 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                                    disabled={basicFormData?.bots.length === 0 || basicFormData?.voice === '' || formLoading === true}
                                    onClick={(e) => SubmitForm("phone")}
                                >
                                    {formLoading === true ? "Loading" : "Submit"}
                                </Button></div>
                            </div>

                        </div>

                    </div>
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default PhoneHandle