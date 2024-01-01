import { MinusSmallIcon, PhoneIcon, PlusSmallIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useRef } from 'react'
import SelectOption from '../Common/Input/SelectOption'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBot } from '../store/slices/botIdSlice';
import TextField from '../Common/Input/TextField';
import { buyAvailableMobileNumbers, getMyPhoneNumbers, updatePhoneNumberData } from '@/app/API/components/PhoneNumber';
import Multiselect from 'multiselect-react-dropdown';
import Button from '../Common/Button/Button';
import { errorMessage, successMessage } from '../Messages/Messages';
import Loading from '../Loading/Loading';
import { ToastContainer } from 'react-toastify';
import Modal from '../Common/Modal/Modal';
import TextArea from '../Common/Input/TextArea';
import { AdjustmentsHorizontalIcon, ChatBubbleOvalLeftIcon, HandRaisedIcon, HomeModernIcon, PhoneArrowDownLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SkeletonLoader from '../Skeleton/Skeleton';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Phone from '../Phone/Phone';
import { DebounceSubmitForm } from '../Debouncing/Deboucing';
import StatusIndicator from '../StatusIndicator/Status';
const PhoneHandle = () => {
    const dispatch = useDispatch();

    const state = useSelector((state) => state.botId);
    const user = useSelector((state) => state.user.data);
    // console.log("state", user)
    const [showBtns, setShowBtns] = useState(false)
    const [botValue, setBotValue] = useState([]);
    const [basicFormData, setBasicFormData] = useState([])
    const [showPhoneView, setShowPageView] = useState(true)
    const [phoneNumbers, setPhoneNumbers] = useState(null);
    const [pageLoading, setPageLoading] = useState(true)
    const [audioModal, setAudioModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [greetingLoading, setGreetingLoading] = useState(false)
    const [greetingAudioLoading, setGreetingAudioLoading] = useState(false)
    const [greetingPhoneLoading, setGreetingPhoneLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [showIndexModal, setShowIndexModal] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [phoneLoading, setPhoneLoading] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [formData, setFormData] = useState({})
    const [basicField, setBasicField] = useState({
        phone: '',
        greeting: "",
        checked: false,
        audio: null,
        audioName: '',
        isActive: false
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
                    sales: ele?.name,
                    audio: ele.audio ? ele.audio : null,
                    audioName: ele?.audio
                }
            })
            setBasicField(prev => {
                return {
                    ...prev,
                    phone: response.results[0].data,
                    audio: response.results[0].audio,
                    id: response.results[0].id,
                    greeting: response.results[0].greeting,
                    audioName: response.results[0].audio,
                    checked: response.results[0].active,
                    isActive: response.results[0].active,

                }
            })
            setBasicFormData(data)
            setTimeout(() => {
                setPageLoading(false)
            }, 4000);

            setShowPageView(true)
        } else {
            setPageLoading(false)
            setShowPageView(false)
            // console.log("response", response)
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

            SubmitForm('toggle', false)
        } else {
            setBasicField(prev => {
                return {
                    ...prev,
                    checked: true
                }
            })
            SubmitForm('toggle', true)
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
        Submission({ ...basicField, [name]: value, type: "text" })
    }
    const handleInputValues = (key, field, newValue) => {
        const updatedData = [...basicFormData];
        updatedData[key] = { ...updatedData[key], [field]: newValue };
        setBasicFormData(updatedData);
        Submission({ fields: updatedData, checked: basicField?.checked ?? false, type: "phone", id: basicField?.id })
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



    const SubmitForm = async (type, checked = false) => {
        let payload = {}
        let id = null
        switch (type) {
            case "phone":
                setFormLoading(true)
                payload =

                {
                    active: basicField.checked ?? false,
                    bots: basicFormData.map((formDataItem) => {
                        if (formDataItem.audio !== null && formDataItem?.audio?.trim() !== '' &&
                            formDataItem?.audio?.includes('https') === false) {
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

            case "toggle":
                payload = {
                    active: checked
                }
                id = basicField?.id
                break;
            default:
                break;
        }

        const response = await updatePhoneNumberData(payload, id)
        if (response.status === 200) {
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

    const [typingTimeout, setTypingTimeout] = useState(null)
    const [driveLoad, setDriveLoad] = useState(false)
    const [driveLoad1, setDriveLoad1] = useState(false)
    const [driveLoad2, setDriveLoad2] = useState(false)
    const SubmitTextForm = async (field) => {
        let payload = {}
        let id = null

        if (field.type === "text") {
            setGreetingLoading(true)
            payload = {
                greeting: field.greeting,
                audio: "",
                audioName: ""
            }
        } else if (field.type === "phone") {
            setGreetingPhoneLoading(true)
            payload =

            {
                active: basicField.checked ?? false,
                bots: field.fields.map((formDataItem) => {
                    if (formDataItem.audio !== null && formDataItem?.audio?.trim() !== '' &&
                        formDataItem?.audio?.includes('https') === false) {
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
        } else {
            setGreetingAudioLoading(true)
            payload = {
                audio: field.audio,
                greeting: ""
            }
        }

        id = field?.id
        const response = await updatePhoneNumberData(payload, id)
        if (response.status === 200) {
            setGreetingLoading(false)
            setGreetingAudioLoading(false)
            setGreetingPhoneLoading(false)
            setFormLoading(false)
            if (field.type === "text") {
                setDriveLoad(true)
                setTimeout(() => {
                    setDriveLoad(false)
                }, 2000);
            } else if (field.type === "phone") {
                setDriveLoad1(true)
                setTimeout(() => {
                    setDriveLoad1(false)
                }, 2000);
            } else {
                setDriveLoad2(true)
                setTimeout(() => {
                    setDriveLoad2(false)
                }, 2000);
            }
        } else {
            errorMessage(getErrorMessage(response.response.data))
            setGreetingLoading(false)
            setGreetingAudioLoading(false)
            setGreetingPhoneLoading(false)
            setFormLoading(false)
        }
    }
    const Submission = (field) => {
        DebounceSubmitForm(field, SubmitTextForm, setTypingTimeout, typingTimeout)
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
        Submission({
            fields: [...basicFormData, {
                id: "",
                voice: "",
                options: 1,
                bots: botValue[0].value,
                sales: '',
                audio: null,
                audioName: null
            }], checked: basicField?.checked ?? false, type: "phone", id: basicField?.id
        })
    }
    const removeNewValue = (key) => {
        const updatedData = basicFormData.filter((element, index) => index !== key);
        setBasicFormData(updatedData);
        Submission({ fields: updatedData, checked: basicField?.checked ?? false, type: "phone", id: basicField?.id })

    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && (file.name.split('.')[1] === 'wav' || file.name.split('.')[1] === 'mp3')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setBasicField((prev) => {
                    return {
                        ...prev,
                        audio: reader.result,
                        audioName: file.name
                    }
                })
                Submission({
                    ...basicField,
                    audio: reader.result,
                    audioName: file.name,
                    type: "audio"
                })
            };
            setAudioModal(false)
        }
    };

    const inputRef = useRef(null);

    // Function to handle button click and focus on the input
    const handleButtonClick = () => {
        // Check if the inputRef is defined and not null
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };


    const DisablingButton = () => {
        const requiredKeys = [
            "phone_number"
        ];
        return requiredKeys.some(
            (key) => !formData[key] || formData[key].trim() === ""
        );

    }
    const SubmitFormAddPhone = async () => {
        setPhoneLoading(true)
        const response = await buyAvailableMobileNumbers({ name: user?.enterprise?.name, data: formData?.phone_number, greeting: `Hello, thank you for calling ${user?.enterprise?.name}` })
        if (response) {
            setPhoneLoading(false)
            EnterprisePhoneNumber()
        } else {
            EnterprisePhoneNumber()
            setPageLoading(false)
        }
    }
    const gettheValues = (value) => {
        let data = [
            { "name": "1", "value": 1 },
            { "name": "2", "value": 2 },
            { "name": "3", "value": 3 },
            { "name": "4", "value": 4 },
            { "name": "5", "value": 5 },
            { "name": "6", "value": 6 },
            { "name": "7", "value": 7 },
            { "name": "8", "value": 8 },
            { "name": "9", "value": 9 }
        ].filter((x) => x.value.toString() !== value.toString())
        return data
    }
    const gettheValuesBot = (value) => {
        let data = botValue.filter((x) => x.name !== value)
        return data
    }
    // console.log("basicFormData", basicFormData)
    return (
        <>
            <div className="bg-white w-full m-auto border rounded-lg border-[#F0F0F1] mt-5">
                {showPhoneView ?
                    <div className='w-full xs:w-full sm:w-full md:w-full lg:w-[80%]'>
                        <div className='block w-full xs:w-full sm:w-full md:w-full lg:w-[60%]  sm:block md:block lg:block xl:flex gap-8 rounded-t-lg border border-t-0 border-r-0 border-l-0 px-6 py-5 border-[#F0F0F1] items-center'>
                            {
                                pageLoading ?
                                    <div>
                                        <SkeletonLoader count={1} height={20} width={"20%"} />
                                        <SkeletonLoader count={1} height={10} width={"60%"} />
                                    </div> :
                                    <div>
                                        <h3 className='text-sm font-semibold text-heading  flex  gap-4 mt-2'>
                                            <PhoneArrowDownLeftIcon className='w-4 h-4'></PhoneArrowDownLeftIcon>
                                            <b> Phone Number</b>
                                        </h3>
                                        <p className='text-xs text-border font-normal mt-2'>Configure a custom IVR that callers can speak to</p>
                                    </div>
                            }

                            <div className='sm:text-end'>
                                {
                                    pageLoading ?
                                        <>
                                            <div className='flex items-center justify-start sm:justify-end gap-4'>
                                                <SkeletonLoader count={1} height={20} width={100} />
                                                <SkeletonLoader count={1} height={20} width={100} />
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className='flex items-center justify-start  gap-4 mt-2'>
                                                <label className="switch">
                                                    <input type="checkbox" name="billingEnabled" onChange={() => handleChange()} checked={basicField?.checked === true} />
                                                    <span className="slider round h-[21px] w-[40px]"></span>
                                                </label>
                                                <p className='text-sm  text-heading font-normal bg-lowgray rounded-md px-3 py-1'>{basicField?.phone.replace(/^(\+?1)?(\d{3})(\d{3})(\d{4})$/, "+1 ($2) $3-$4")}</p>
                                            </div>
                                        </>
                                }

                            </div>
                        </div>

                        <div>
                        {basicField?.checked === true && (
                            <div className='px-6 py-5 w-full xs:w-full sm:w-full md:w-full lg:w-[63%]   justify-between items-center border-b border-[#F0F0F1]'>
                                <div className=''>
                                    {pageLoading ?
                                        <SkeletonLoader count={1} height={20} width={"20%"} /> :
                                        <h3 className='text-sm font-semibold text-heading flex items-center gap-4'>
                                            <HandRaisedIcon className='w-4 h-4' ></HandRaisedIcon>
                                            <b>Greeting message</b>
                                        </h3>}
                                    {pageLoading ?
                                        <div className='my-3'>
                                            <SkeletonLoader count={1} height={60} width={"50%"} />
                                        </div>
                                        :
                                        <>

                                            <>
                                                {basicField?.audioName ? (
                                                    <>

                                                        <div className='w-full flex border border-gray rounded-xl p-1 mt-2 shadow-sm mt-3'>
                                                            <AudioPlayer
                                                                customVolumeControls={[]}
                                                                customAdditionalControls={[]}
                                                                src={basicField.audio}
                                                                showSkipControls={false}
                                                                showJumpControls={false}
                                                            />
                                                        </div>
                                                        <>
                                                            <div className="mt-2 inline-flex rounded-md w-full sm:w-auto" role="group">
                                                                <button onClick={() => {
                                                                    setModal(false)
                                                                    setAudioModal(true)
                                                                    document.getElementById("dropzone-file").click()
                                                                }} type="button"
                                                                    className={`px-4 w-[50%] sm:w-auto py-2 text-[10px] sm:text-xs md:text-xs lg:text-xs font-medium  border border-border rounded-l-md hover:bg-primary hover:text-white ${audioModal ? "bg-primary text-white" : "bg-white text-heading "}`}>
                                                                    Replace Audio
                                                                </button>
                                                                <button type="button" onClick={() => {
                                                                    if (!basicField?.audio) {
                                                                        handleButtonClick()
                                                                    }
                                                                    setBasicField((prev) => {
                                                                        return { ...prev, audio: "", audioName: "" }
                                                                    })
                                                                    setModal(true)
                                                                    setAudioModal(false)
                                                                    setIndex(null)
                                                                }
                                                                } className={`px-4 py-2 text-[10px] w-[50%] m-auto sm:w-auto sm:text-xs md:text-xs font-medium  border border-border rounded-l-none rounded-md hover:bg-primary hover:text-white ${modal ? "bg-primary text-white" : "bg-white text-heading "}`}>
                                                                    Switch to Text to Speech
                                                                </button>
                                                            </div>
                                                            <StatusIndicator loading={greetingAudioLoading} driveLoad={driveLoad2} />

                                                        </>
                                                    </>
                                                ) : <>
                                                    <div className='w-full rounded-xl p-1 mt-3'>
                                                        <p className='text-xs my-2 font-semibold'>Convert text to speech</p>
                                                        <div className='w-full '>
                                                            <textarea onClick={(e) => {
                                                                setAudioModal(false)
                                                                setModal(true)
                                                            }} className={'border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]'} name='greeting' placeholder={"Example: Hi! Thanks for calling. For sales, press 1 or say sales Set a greeting message For support, press 2 or say support"} id={"greeting_text"} value={basicField.greeting} onChange={handleInput} title={""} ref={inputRef} />
                                                        </div>
                                                        <>
                                                            <div className="mt-2 inline-flex rounded-md w-full sm:w-auto" role="group">
                                                                <button onClick={() => {
                                                                    setModal(false)
                                                                    setAudioModal(true)
                                                                    document.getElementById("dropzone-file").click()
                                                                }} type="button"
                                                                    className={`px-4 w-[50%] sm:w-auto py-2 text-[10px] sm:text-xs md:text-xs lg:text-xs font-medium  border border-border rounded-md hover:bg-primary hover:text-white ${audioModal ? "bg-primary text-white" : "bg-white text-heading "}`}>
                                                                    Switch to Audio
                                                                </button>

                                                            </div>
                                                            <StatusIndicator loading={greetingAudioLoading} driveLoad={driveLoad2} />

                                                        </>
                                                        <StatusIndicator loading={greetingLoading} driveLoad={driveLoad} />
                                                    </div>

                                                </>}
                                            </>



                                            <div className='hidden w-full rounded-xl p-1 mt-3'>
                                                <div className='block mt-1'>
                                                    <div className='w-full '>
                                                        <label className={`my-2 new_input_label block text-sm text-heading font-medium`}>
                                                            <div className='flex items-center gap-2'><span>Upload file</span>  </div>
                                                        </label>

                                                        <div className="flex items-center justify-center w-full">
                                                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border   border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                                    </svg>
                                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">MP3 or WAV</p>


                                                                </div>

                                                                <input id="dropzone-file" type="file" accept="audio/*" onChange={handleFileSelect} className="hidden" />


                                                            </label>
                                                        </div>

                                                    </div>

                                                    <StatusIndicator loading={greetingAudioLoading} driveLoad={driveLoad2} />
                                                </div>
                                            </div>


                                        </>}
                                </div>
                            </div>

                        )}

                        {basicFormData.length > 0 && basicField?.checked === true && (
                            <>
                                <div className=''>
                                    <div className='border-t px-6 py-4 border-[#F0F0F1] grid justify-between grid-cols-1 sm:grid-cols-2 items-center'>
                                        {pageLoading ?
                                            <div>
                                                <SkeletonLoader count={1} height={20} width={"20%"} />
                                                <SkeletonLoader count={1} height={10} width={"80%"} />
                                            </div> :
                                            <div className=''>
                                                <h3 className='text-sm font-semibold text-heading flex items-center gap-4 '>
                                                    <AdjustmentsHorizontalIcon className='w-4 h-4'></AdjustmentsHorizontalIcon>
                                                    <b>Menu Options</b>
                                                </h3>
                                                <p className='text-xs font-normal text-borderm mt-2'>Options are triggered by keypad and voice commands, and route to whichever bot you want to respond to the customer.</p>
                                            </div>
                                        }
                                        <div>

                                        </div>
                                    </div>
                                    <div className='w-full rounded-xl p-1 mt-3'>
                                        {pageLoading ?
                                            <div className='grid  px-6 py-4 grid-cols-1 sm:grid-cols-5 gap-2'>
                                                <div>
                                                    <SkeletonLoader count={1} height={15} width={"20%"} />
                                                    <SkeletonLoader count={1} height={30} width={"100%"} />
                                                </div>
                                                <div>
                                                    <SkeletonLoader count={1} height={15} width={"20%"} />
                                                    <SkeletonLoader count={1} height={30} width={"100%"} />
                                                </div>
                                                <div>
                                                    <SkeletonLoader count={1} height={15} width={"20%"} />
                                                    <SkeletonLoader count={1} height={30} width={"100%"} />
                                                </div>
                                                <div>
                                                    <SkeletonLoader count={1} height={15} width={"20%"} />
                                                    <SkeletonLoader count={1} height={30} width={"100%"} />
                                                </div>
                                                <div>
                                                    <SkeletonLoader count={1} height={15} width={"20%"} />
                                                    <SkeletonLoader count={1} height={30} width={"45%"} />
                                                </div>
                                            </div> :
                                            <div className='px-6 py-4'>
                                                {basicFormData.map((element, key) =>
                                                    <div key={key} className='block w-full xs:w-full sm:w-full md:w-full lg:w-[65%] sm:flex justify-between items-center gap-3'>
                                                        <div className='w-full xs:w-full sm:w-full md:w-full lg:w-[20%]'>
                                                            <h3 className='font-bold my-2 text-sm text-heading'>Key</h3>
                                                            <SelectOption
                                                                onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                                value={element?.options ?? ''}
                                                                name="options"
                                                                values={gettheValues(key === 0 ? "" : basicFormData[key - 1].options)}
                                                                id={"options"}
                                                                className="py-2]"
                                                                error={""}
                                                                optionDisabled={[]}
                                                            />

                                                        </div>
                                                        <div className='w-full xs:w-full sm:w-full md:w-full lg:w-[50%]'>
                                                            <SelectOption
                                                                onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                                value={element?.bots ?? ''}
                                                                name="bots"
                                                                values={gettheValuesBot(key === 0 ? "" : basicFormData[key - 1].bots)}
                                                                id={"bots"}
                                                                className="py-2 "
                                                                title={
                                                                    <h3 className='font-bold my-2 text-sm text-heading'>Select Bot</h3>}
                                                                error={""}
                                                                optionDisabled={[]}
                                                            />
                                                        </div>
                                                        <div className='w-full xs:w-full sm:w-full md:w-full lg:w-[50%]'>
                                                            <SelectOption
                                                                onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                                value={element?.voice ?? ''}
                                                                name="voice"
                                                                values={[{ name: 'Rachel', value: "rachel" }, { name: "Adam", value: "adam" }]}
                                                                id={"voice"}
                                                                className="py-2"
                                                                title={
                                                                    <h3 className='font-bold my-2 text-sm text-heading'>Voice</h3>}
                                                                error={""}
                                                                optionDisabled={[]}
                                                            /></div>
                                                        <div className='w-full xs:w-full sm:w-full md:w-full lg:w-[50%]'>
                                                            <TextField
                                                                value={element?.sales ?? ''}
                                                                name="sales"
                                                                className="!py-2"
                                                                title={<h3 className='font-bold mt-2 text-sm text-heading'>Field Name</h3>}
                                                                onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                                placeholder={"Press key for {field name}"}
                                                                type={"text"}
                                                                id={"sales"}
                                                            />
                                                        </div>
                                                        <div className='w-full xs:w-full sm:w-full md:w-full lg:w-[20%]' >
                                                            <label className={`opacity-0 new_input_label block text-sm text-heading `}>
                                                                <h3 className='font-bold my-2 text-sm text-heading'>Greeting</h3>
                                                            </label>
                                                            {key > 0 && (
                                                                <>
                                                                    <button
                                                                        className='font-bold mt-0'
                                                                        type='button'
                                                                        onClick={() => { removeNewValue(key) }}
                                                                    >
                                                                        <XMarkIcon className="h-[23px] w-[23px] text-primary font-bold" />
                                                                    </button>
                                                                </>
                                                            )}
                                                            {botValue.length > basicFormData.length && (
                                                                <>
                                                                    <button
                                                                        className='font-bold mt-0'
                                                                        type='button'
                                                                        onClick={() => { addNewValue() }}
                                                                    >
                                                                        <PlusSmallIcon className="h-[26px] w-[26px] text-primary  font-bold" />
                                                                    </button>
                                                                </>
                                                            )}

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                        <StatusIndicator loading={greetingPhoneLoading} driveLoad={driveLoad1} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div> 
                    </div>
                    :
                    <div className='p-5'>
                        <Phone basicFormData={formData} setBasicFormData={setFormData} />
                        <Button
                            type={"button"}
                            className=" my-4 focus:outline-none focus:ring-4  font-bold rounded-md text-base py-2.5  w-full sm:w-[100px] md:w-[100px] lg:w-[100px] inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white"
                            disabled={DisablingButton()}
                            onClick={(e) => SubmitFormAddPhone() || setPhoneLoading === true}
                        // disabled
                        >
                            {phoneLoading === true ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                                <span>Loading...</span> </> : "Submit"}
                        </Button>
                    </div>
                  
                }
            </div>

            <ToastContainer />

            {
                showIndexModal &&
                <Modal title={'Greeting '} show={showIndexModal} setShow={setShowIndexModal} showCancel={true} className={"w-[100%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
                    <div className='block sm:flex md:flex lg:flex gap-2 justify-between items-center mt-1'>


                        <div className='mt-2 sm:m-0 md:m-0 lg:m-0'>
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                <button onClick={() => {
                                    setAudioModal(true)
                                    setShowIndexModal(false)
                                }} type="button" className="px-4 py-2 text-[10px] sm:text-xs md:text-xs lg:text-xs font-medium text-heading bg-white border border-border rounded-l-md hover:bg-primary hover:text-white ">
                                    Upload mp3
                                </button>
                                {/* <button type="button" onClick={() => {
                                    setModal(true)
                                    setShowIndexModal(false)
                                }
                                } className="px-4 py-2 text-[10px] sm:text-xs md:text-xs font-medium text-heading bg-white border border-border border-l-0 rounded-r-md hover:bg-primary hover:text-white ">
                                    Type text, convert text to speech
                                </button> */}
                            </div>

                        </div>
                        {/* <li className='  hover:bg-primary hover:text-white text-heading !cursor-pointer' >
                                    <button type='button' className="block p-4  !cursor-pointer">Record audio</button>
                                </li> */}

                    </div>
                </Modal>
            }



        </>
    )
}

export default PhoneHandle