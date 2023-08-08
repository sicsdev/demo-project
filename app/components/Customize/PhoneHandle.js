import { MinusSmallIcon, PhoneIcon, PlusSmallIcon, TrashIcon } from '@heroicons/react/24/solid'
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
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [basicField, setBasicField] = useState({
        phone: '',
        greeting: "",
        checked: false
    })
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
        if (response?.results?.length > 0) {
            setPhoneNumbers(response);
            let data = response.results[0]?.bots.map((ele, key) => {
                return {
                    voice: ele.voice,
                    options: ele.option,
                    bots: ele?.bot?.id ?? '',
                    sales: ele?.name
                }
            })
            setBasicField(prev => {
                return {
                    ...prev,
                    phone: response.results[0].data,
                    id: response.results[0].id,
                    greeting: response.results[0].greeting,
                    checked: response.results[0].active
                }
            })
            setBasicFormData(data)
            setPageLoading(false)
        } else {
            setPageLoading(false)
        }
    }


    const handleChange = () => {
        if (basicField?.checked === true) {
            setBasicField(prev => {
                return {
                    ...prev,
                    checked: false
                }
            })
        } else {
            setBasicField(prev => {
                return {
                    ...prev,
                    checked: true
                }
            })
        }
    }
    const handleInput = (e) => {
        const { value, name } = e.target
        setBasicField((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleInputValues = (key, field, newValue) => {
        const updatedData = [...basicFormData];
        updatedData[key] = { ...updatedData[key], [field]: newValue };
        setBasicFormData(updatedData);
    };
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
                payload =

                {
                    active: basicField.checked ?? false,
                    bots: basicFormData.map((formDataItem) => ({
                        bot: formDataItem.bots,
                        option: basicField.checked ? formDataItem.options : 0,
                        voice: formDataItem.voice,
                        name: formDataItem.sales
                    }))
                }


                id = basicField?.id
                break;
            case "greeting":
                setGreetingLoading(true)
                payload = {
                    greeting: basicField.greeting
                }
                id = basicField?.id
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
    const addNewValue = () => {
        setBasicFormData([...basicFormData, {
            id: "",
            voice: "",
            options: null,
            bots: "",
            sales: ''
        }])
    }
    const removeNewValue = (key) => {
        const updatedData = basicFormData.filter((element, index) => index !== key);
        setBasicFormData(updatedData);

    }

    return (
        <div className='container my-8'>
            {pageLoading ? <Loading /> :
                <div className='border border-border rounded-lg ' >
                    <div>
                        <div className='flex rounded-t-lg border border-t-0 border-r-0 border-l-0 p-5 border-border justify-between items-center'>
                            <div className='flex justify-between items-center gap-4'>
                                {/* <div><PhoneIcon className="h-8 w-8" /></div> */}
                                <div>
                                    <h3 className='text-normal font-semibold text-heading'>Phone Menu</h3>
                                    <p className='text-sm text-border font-normal'>Configure a custom phone menu callers can navigate</p>
                                </div>

                            </div>
                            <div>
                                <p className='text-sm text-heading font-normal'>{basicField?.phone.replace(/^(\+?1)?(\d{3})(\d{3})(\d{4})$/, "+1 ($2) $3-$4")}</p>
                            </div>
                        </div>
                        <div className='p-5'>
                            <h3 className='text-normal font-semibold text-heading'>Greeting message</h3>
                            <div className='block sm:flex md:flex lg:flex gap-2 justify-between items-center mt-1'>
                                <div className='w-full sm:w-[80%] md:w-[80%] lg:w-[80%]'>

                                    <TextField
                                        value={basicField?.greeting}
                                        name="greeting"
                                        className="py-3 mt-2"
                                        title={""}
                                        onChange={handleInput}
                                        placeholder={"Example: Hi! Thanks for calling. For sales, press 1 or say sales Set a greeting message For support, press 2 or say support"}
                                        type={"text"}
                                        id={"greeting_text"}
                                    />
                                </div>
                                <Button
                                    type={"button"}
                                    className="mt-2 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                                    disabled={basicField?.greeting === '' || greetingLoading === true}
                                    onClick={() => SubmitForm("greeting")}
                                >
                                    {greetingLoading ? "Loading..." : "Set a greeting message"}
                                </Button>
                            </div>
                            <hr className='mt-6 text-border' />
                        </div>
                        <div className='px-5'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h3 className='text-normal font-semibold text-heading'>Enable Phone Menu</h3>
                                    <p className='text-sm font-normal text-border'>Enable if you want different bots to respond depending on customer query.</p>
                                </div>
                                <div>
                                    <label className="switch">
                                        <input type="checkbox" name="billingEnabled" onChange={() => handleChange()} checked={basicField?.checked === true} />
                                        <span className="slider round h-[27px] w-[55px]"></span>
                                    </label>
                                </div>
                            </div>
                            <hr className='mt-6 text-border' />
                        </div>
                        <div className='p-5'>
                            <div className='flex justify-between items-center'>
                                <div className=''>
                                    <h3 className='text-normal font-semibold text-heading'>Menu Options</h3>
                                    <p className='text-sm font-normal text-border'>Options are triggered by keypad and voice commands, and route to whichever bot you want to respond to the customer.</p>
                                </div>
                                <div>

                                </div>
                            </div>
                            <div>
                                {basicFormData.map((element, key) =>
                                    <div key={key} className='block sm:flex md:flex lg:flex justify-between items-center gap-1'>
                                        <div className='w-full sm:w-[20%] md:w-[20%] lg:w-[20%]'>
                                            <h3 className='font-bold my-2 text-sm text-heading'>Key</h3>
                                            <SelectOption
                                                onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                value={element?.options ?? ''}
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
                                                optionDisabled={basicFormData.map((ele) => ele.options)}
                                            />

                                        </div>
                                        <div className='w-full sm:w-[20%] md:w-[20%] lg:w-[20%]'>
                                            <SelectOption
                                                onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                value={element?.bots ?? ''}
                                                name="bots"
                                                values={botValue}
                                                id={"bots"}
                                                className="py-3 "
                                                title={
                                                    <h3 className='font-bold my-2 text-sm text-heading'>Select Bot</h3>}
                                                error={""}
                                                optionDisabled={basicFormData.map((ele) => ele.bots)}
                                            />
                                        </div>
                                        <div className='w-full sm:w-[20%] md:w-[20%] lg:w-[20%]'>
                                            <SelectOption
                                                onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                value={element?.voice ?? ''}
                                                name="voice"
                                                values={[{ name: 'Rachel', value: "rachel" }, { name: "Adam", value: "adam" }]}
                                                id={"voice"}
                                                className="py-3 "
                                                title={
                                                    <h3 className='font-bold my-2 text-sm text-heading'>Voice</h3>}
                                                error={""}
                                                optionDisabled={basicFormData.map((ele) => ele.voice)}
                                            /></div>
                                        <div className='w-full sm:w-[20%] md:w-[20%] lg:w-[20%]'>
                                            <TextField
                                                value={element?.sales ?? ''}
                                                name="sales"
                                                className="py-3 mt-2"
                                                title={<h3 className='font-bold my-2 text-sm text-heading'>Field Name</h3>}
                                                onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                placeholder={"Press key for {field name}"}
                                                type={"text"}
                                                id={"sales"}
                                            />
                                        </div>
                                        <div className='mt-10 w-[24px]'>
                                            {key > 0 && (
                                                <button
                                                    className='font-bold'
                                                    type='button'
                                                    onClick={() => { removeNewValue(key) }}
                                                >
                                                    <MinusSmallIcon className="h-6 w-6 text-primary font-bold" />
                                                </button>
                                            )}
                                            {botValue.length > basicFormData.length && (
                                                <button
                                                    className='font-bold'
                                                    type='button'
                                                    onClick={() => { addNewValue() }}
                                                >
                                                    <PlusSmallIcon className="h-6 w-6  text-primary  font-bold" />
                                                </button>
                                            )}
                                            <button
                                                className='font-bold'
                                                type='button'
                                            // onClick={() => { addNewValue() }}
                                            >
                                                {/* <PlusSmallIcon className="h-6 w-6 text-heading font-bold" /> */}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className='flex my-2 justify-end'>
                                    <Button
                                        type={"button"}
                                        className=" inline-block rounded bg-primary px-6 pb-2.5 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                                        // disabled={basicFormData?.bots.length === 0 || basicFormData?.voice === '' || formLoading === true}
                                        onClick={(e) => SubmitForm("phone")}
                                        disabled={basicFormData.some(
                                            (element) =>
                                                element?.options === null ||
                                                element?.bots?.trim() === '' ||
                                                element?.bots?.trim() === '' ||
                                                element?.sales?.trim() === '' ||
                                                element?.voice?.trim() === ''
                                        )}
                                    >
                                        {formLoading === true ? "Loading" : "Submit"}
                                    </Button>
                                </div>
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