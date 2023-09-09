import { MinusSmallIcon, PhoneIcon, PlusSmallIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useRef } from 'react'
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
import Modal from '../Common/Modal/Modal';
import TextArea from '../Common/Input/TextArea';

const PhoneHandle = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.botId);
    console.log("state", state)
    const [botValue, setBotValue] = useState([]);
    const [basicFormData, setBasicFormData] = useState([])
    const [phoneNumbers, setPhoneNumbers] = useState(null);
    const [pageLoading, setPageLoading] = useState(true)
    const [audioModal, setAudioModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [greetingLoading, setGreetingLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [showIndexModal, setShowIndexModal] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [basicField, setBasicField] = useState({
        phone: '',
        greeting: "",
        checked: false,
        audio: null,
        audioName: '',
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
        debugger
        if (response?.results?.length > 0) {
            setPhoneNumbers(response);
            let data = response.results[0]?.bots.map((ele, key) => {
                return {
                    voice: ele.voice,
                    options: ele.option,
                    bots: ele?.bot?.id ?? '',
                    sales: ele?.name,
                    audio: null,
                    audioName: ele?.audio
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
        debugger
        let id = null
        switch (type) {
            case "phone":
                setFormLoading(true)
                payload =

                {
                    active: basicField.checked ?? false,
                    bots: basicFormData.map((formDataItem) => {
                        if (formDataItem.audio !== null) {
                            return {
                                bot: formDataItem.bots,
                                option: basicField.checked ? formDataItem.options : 0,
                                voice: formDataItem.voice,
                                name: formDataItem.sales,
                                audio: formDataItem.audio,
                            };
                        }
                        return {
                            bot: formDataItem.bots,
                            option: basicField.checked ? formDataItem.options : 0,
                            voice: formDataItem.voice,
                            name: formDataItem.sales,
                        };
                    })
                }


                id = basicField?.id
                break;
            case "greetings":
                setGreetingLoading(true)
                payload = {
                    greeting: basicField.greeting
                }
                id = basicField?.id
                break;
            case "audio":
                setGreetingLoading(true)
                payload = {
                    audio: basicField.audio
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
            setModal(false)
            setAudioModal(false)
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
            sales: '',
            audio: null,
            audioName: null
        }])
    }
    const removeNewValue = (key) => {
        const updatedData = basicFormData.filter((element, index) => index !== key);
        setBasicFormData(updatedData);

    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && (file.name.split('.')[1] === 'wav' || file.name.split('.')[1] === 'mp3')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (index !== null) {
                    const updatedData = [...basicFormData];
                    updatedData[index] = {
                        ...updatedData[index],
                        'audio': reader.result,
                        'audioName': file.name
                    };
                    setBasicFormData(updatedData);
                    setAudioModal(false)
                } else {
                    setBasicField((prev) => {
                        return {
                            ...prev,
                            audio: reader.result,
                            audioName: file.name
                        }
                    })
                }
            };
        } else {
            if (index !== null) {
                handleInputValues(index, 'audioName', null)
                handleInputValues(index, 'audio', null)
            } else {
                setBasicField((prev) => {
                    return {
                        ...prev,
                        audioName: null,
                        audio: null
                    }
                })
            }




            errorMessage('Please select a valid WAV or MP3 audio file.');
        }
    };
    console.log(index)
    console.log(basicFormData)
    return (
        <div className='container my-8'>
            {pageLoading ? <Loading /> :
                <div className='border border-border rounded-lg ' >
                    <div>
                        <div className='flex rounded-t-lg border border-t-0 border-r-0 border-l-0 p-5 border-border justify-between items-center'>
                            <div className='w-1/2 sm:w-auto flex justify-between items-center gap-4'>
                                {/* <div><PhoneIcon className="h-8 w-8" /></div> */}
                                <div>
                                    <h3 className='text-sm font-semibold text-heading'>Phone Menu</h3>
                                    <p className='text-xs text-border font-normal'>Configure a custom phone menu callers can navigate</p>

                                </div>

                            </div>
                            <div>
                                <p className='text-sm text-heading font-normal'>{basicField?.phone.replace(/^(\+?1)?(\d{3})(\d{3})(\d{4})$/, "+1 ($2) $3-$4")}</p>
                            </div>
                        </div>
                        <div className='p-5'>
                            <h3 className='text-sm font-semibold text-heading'>Greeting message</h3>
                            <div className='block sm:flex md:flex lg:flex gap-2 justify-between items-center mt-1'>
                                <div className={` border border-border rounded-lg shadow w-full cursor-pointer`}>
                                    <ul className="text-sm">
                                        <li onClick={() => {
                                            setAudioModal(true)
                                            setIndex(null
                                            )
                                        }} className='border rounded-lg rounded-b-none border-border border-l-0 border-r-0 border-t-0 hover:bg-primary hover:text-white text-heading  !cursor-pointer' >
                                            <button type='button' className="block p-4  !cursor-pointer">Upload mp3</button>
                                        </li>
                                        {/* <li className='  hover:bg-primary hover:text-white text-heading !cursor-pointer' >
                                            <button type='button' className="block p-4  !cursor-pointer">Record audio</button>
                                        </li> */}
                                        <li onClick={() => {
                                            setModal(true)
                                            setIndex(null)
                                        }
                                        } className='rounded-lg rounded-t-none  border border-border border-l-0 border-r-0 border-b-0 hover:bg-primary hover:text-white text-heading !cursor-pointer' >
                                            <button type='button' className="block p-4  !cursor-pointer" >Type text, convert text to speech</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <hr className='mt-6 text-border' />
                        </div>

                        <div className='px-5'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h3 className='text-sm font-semibold text-heading'>Enable Phone Menu</h3>
                                    <p className='text-xs font-normal text-border'>Enable if you want different bots to respond depending on customer query.</p>
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
                                    <h3 className='text-sm font-semibold text-heading'>Menu Options</h3>
                                    <p className='text-xs font-normal text-border'>Options are triggered by keypad and voice commands, and route to whichever bot you want to respond to the customer.</p>
                                </div>
                                <div>

                                </div>
                            </div>
                            <div>
                                {basicFormData.map((element, key) =>
                                    <div key={key} className='block sm:flex md:flex lg:flex justify-between items-center gap-3'>
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
                                                className="py-2"
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
                                                className="py-2 "
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
                                                className="py-2 "
                                                title={
                                                    <h3 className='font-bold my-2 text-sm text-heading'>Voice</h3>}
                                                error={""}
                                                optionDisabled={basicFormData.map((ele) => ele.voice)}
                                            /></div>
                                        <div className='w-full sm:w-[20%] md:w-[20%] lg:w-[20%]'>
                                            <TextField
                                                value={element?.sales ?? ''}
                                                name="sales"
                                                className="!py-2 leading-none"
                                                title={<h3 className='font-bold my-2 text-sm text-heading'>Field Name</h3>}
                                                onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                placeholder={"Press key for {field name}"}
                                                type={"text"}
                                                id={"sales"}
                                            />
                                        </div>
                                        <div className='w-full sm:w-[20%] md:w-[20%] lg:w-[20%] relative' >
                                            <label className={`new_input_label block text-sm text-heading `}>
                                                <h3 className='font-bold my-2 text-sm text-heading'>Greetings</h3>
                                            </label>
                                            <Button
                                                type={"button"}
                                                className="w-full sm:w-auto md:w-auto lg:w-auto inline-block rounded bg-primary px-6 pb-2.5 pt-2.5 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                                onClick={() => {
                                                    setIndex(key)
                                                    setShowIndexModal(true)
                                                }

                                                }
                                            >
                                                {element.audioName ? "Update" : "Add"}
                                            </Button>


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
                                        className=" inline-block rounded bg-primary px-6 pb-2.5 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
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

            {
                modal &&
                <Modal title={'Greeting message'} show={modal} setShow={setModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
                    <div className='p-5'>
                        <div className='block mt-1'>
                            <div className='w-full '>

                                <TextArea name='greeting' placeholder={"Example: Hi! Thanks for calling. For sales, press 1 or say sales Set a greeting message For support, press 2 or say support"} id={"greeting_text"} value={basicField.greeting} onChange={handleInput} title={"Type text, convert text to speech"} />
                            </div>
                            <Button
                                type={"button"}
                                className="mt-2 inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                disabled={basicField?.greeting === '' || greetingLoading === true}
                                onClick={() => SubmitForm('greetings')}
                            >
                                {greetingLoading ? "Loading..." : "Set a greeting message"}
                            </Button>
                        </div>
                        <hr className='mt-6 text-border' />
                    </div>
                </Modal>
            }
            {
                audioModal &&
                <Modal title={'Greeting message'} show={audioModal} setShow={setAudioModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
                    <div className='p-5'>
                        <div className='block mt-1'>
                            <div className='w-full '>
                                <label className={`my-2 new_input_label block text-sm text-heading font-medium`}>
                                    <div className='flex items-center gap-2'><span>Upload mp3</span>  </div>
                                </label>
                                {index !== null ?
                                    <div className="flex items-center justify-center w-full">
                                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border   border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">wav , MP3</p>
                                                {basicFormData[index].audioName && (
                                                    <>

                                                        <p className="text-xs text-gray-500 dark:text-gray-400">You Uploaded</p>
                                                        <p className='text-xs text-border font-normal'>{basicFormData[index].audioName}</p>
                                                    </>
                                                )}

                                            </div>
                                            <input id="dropzone-file" type="file" accept="audio/*" onChange={handleFileSelect} className="hidden" />


                                        </label>
                                    </div>
                                    : <div className="flex items-center justify-center w-full">
                                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border   border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">wav , MP3</p>
                                                {basicField?.audioName && (
                                                    <>

                                                        <p className="text-xs text-gray-500 dark:text-gray-400">You Uploaded</p>
                                                        <p className='text-xs text-border font-normal'>{basicField?.audioName}</p>
                                                    </>
                                                )}

                                            </div>
                                            <input id="dropzone-file" type="file" accept="audio/*" onChange={handleFileSelect} className="hidden" />


                                        </label>
                                    </div>}

                            </div>
                            {index === null && (
                                <Button
                                    type={"button"}
                                    className="mt-2 inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                    disabled={basicField?.audio === null || greetingLoading === true}
                                    onClick={() => SubmitForm('audio')}
                                >
                                    {greetingLoading ? "Loading..." : "Set a greeting message"}
                                </Button>)}
                        </div>
                        <hr className='mt-6 text-border' />
                    </div>
                </Modal>
            }
            {
                showIndexModal &&
                <Modal title={'Greeting '} show={showIndexModal} setShow={setShowIndexModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
                    <div className='block sm:flex md:flex lg:flex gap-2 justify-between items-center mt-1'>
                        <div className={` border border-border rounded-lg shadow w-full cursor-pointer`}>
                            <ul className="text-sm">
                                <li onClick={() => {
                                    setShowIndexModal(false)
                                    setAudioModal(true)
                                }} className='border rounded-lg rounded-b-none border-border border-l-0 border-r-0 border-t-0 hover:bg-primary hover:text-white text-heading  !cursor-pointer' >
                                    <button type='button' className="block p-4  !cursor-pointer">Upload mp3</button>
                                </li>
                                {/* <li className='  hover:bg-primary hover:text-white text-heading !cursor-pointer' >
                                    <button type='button' className="block p-4  !cursor-pointer">Record audio</button>
                                </li> */}

                            </ul>
                        </div>
                    </div>
                </Modal>
            }
        </div >
    )
}

export default PhoneHandle