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
import { XMarkIcon } from '@heroicons/react/24/outline';
import SkeletonLoader from '../Skeleton/Skeleton';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
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
            if (type === "phone") {
                // successMessage("Phonenumber Submited ! ")
            } else {
                // successMessage("Greeting submitted !")
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
    return (
        <div className='container my-8'>
            <div className='border border-border rounded-lg ' >
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2  gap-4 rounded-t-lg border border-t-0 border-r-0 border-l-0 p-5 border-border justify-between items-center'>
                        <div className=''>
                            {pageLoading ?
                                <div>
                                    <SkeletonLoader count={1} height={20} width={"20%"} />
                                    <SkeletonLoader count={1} height={10} width={"60%"} />
                                </div> :
                                <div>
                                    <h3 className='text-sm font-semibold text-heading'>Phone Number</h3>
                                    <p className='text-xs text-border font-normal'>Configure a custom IVR that callers can speak to</p>
                                </div>}

                        </div>
                        <div className='sm:text-end'>
                            {pageLoading ?
                                <SkeletonLoader count={1} height={20} width={"20%"} /> :
                                <p className='text-sm  text-heading font-normal'>{basicField?.phone.replace(/^(\+?1)?(\d{3})(\d{3})(\d{4})$/, "+1 ($2) $3-$4")}</p>}
                        </div>
                    </div>
                    <div className='p-5 grid grid-cols-1 sm:grid-cols-3  justify-between items-center'>
                        {pageLoading ?
                            <SkeletonLoader count={1} height={20} width={"20%"} /> :
                            <h3 className='text-sm font-semibold text-heading'>Greeting message</h3>}
                        {basicField?.audioName && (
                            <div className='px-6 my-2'>
                                <AudioPlayer
                                    header={<p className='text-xs text-ellipsis'>{basicField?.audioName}</p>}
                                    customVolumeControls={[]}
                                    customAdditionalControls={[]}
                                    src={basicField.audio}
                                    showSkipControls={false}
                                    showJumpControls={false} />
                            </div>
                        )}
                        <div className={`${!basicField?.audioName && ("col-span-2")} mt-2 sm:m-0 md:m-0 lg:m-0 sm:text-end`}>
                            {!pageLoading ?
                                <div className="inline-flex rounded-md shadow-sm w-full sm:w-auto" role="group">
                                    <button onClick={() => {
                                        setAudioModal(true)
                                        setModal(false)
                                        setIndex(null
                                        )
                                    }} type="button" className="px-4 w-[50%] sm:w-auto py-2 text-[10px] sm:text-xs md:text-xs lg:text-xs font-medium text-heading bg-white border border-border rounded-l-md hover:bg-primary hover:text-white ">
                                        Upload MP3 or WAV
                                    </button>
                                    <button type="button" onClick={() => {
                                        setModal(true)
                                        setAudioModal(false)
                                        setIndex(null)
                                    }
                                    } className="px-4 py-2 text-[10px] w-[50%] sm:w-auto sm:text-xs md:text-xs font-medium text-heading bg-white border border-border border-l-0 rounded-r-md hover:bg-primary hover:text-white ">
                                        Text to speech
                                    </button>
                                </div> :
                                <SkeletonLoader count={1} height={40} width={"40%"} />}
                        </div>

                    </div>
                    <hr className='mt-1 mb-6 text-border' />

                    <div className='px-5'>
                        <div className={`grid grid-cols-[90%,10%] justify-between items-center ${basicField?.checked === false && ("mb-6")}`}>
                            {pageLoading ?
                                <div>
                                    <SkeletonLoader count={1} height={20} width={"20%"} />
                                    <SkeletonLoader count={1} height={10} width={"70%"} />
                                </div> :
                                <div>
                                    <h3 className='text-sm font-semibold text-heading'>Enable Phone Number</h3>
                                    <p className='text-xs font-normal text-border'>Enable if you want different bots to respond depending on customer query.</p>
                                </div>
                            }
                            {pageLoading ?
                                <div className='text-end'>
                                    <SkeletonLoader count={1} height={20} width={"8%"} />
                                </div> :
                                <div className='text-end'>
                                    <label className="switch">
                                        <input type="checkbox" name="billingEnabled" onChange={() => handleChange()} checked={basicField?.checked === true} />
                                        <span className="slider round h-[21px] w-[40px]"></span>
                                    </label>
                                </div>
                            }
                        </div>

                    </div>


                    {basicField?.checked === true && (
                        <>
                            <hr className='mt-6 text-border' />
                            <div className='p-5'>
                                <div className='grid justify-between grid-cols-1 sm:grid-cols-2 items-center'>
                                    {pageLoading ?
                                        <div>
                                            <SkeletonLoader count={1} height={20} width={"20%"} />
                                            <SkeletonLoader count={1} height={10} width={"80%"} />
                                        </div> :
                                        <div className=''>
                                            <h3 className='text-sm font-semibold text-heading'>Menu Options</h3>
                                            <p className='text-xs font-normal text-border'>Options are triggered by keypad and voice commands, and route to whichever bot you want to respond to the customer.</p>
                                        </div>
                                    }
                                    <div>

                                    </div>
                                </div>
                                <div>
                                    {pageLoading ?
                                        <div className='grid grid-cols-1 sm:grid-cols-5 gap-2'>
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
                                        <>
                                            {basicFormData.map((element, key) =>
                                                <div key={key} className='block sm:flex md:flex lg:flex justify-between items-center gap-3'>
                                                    <div className='w-full sm:w-[100px] md:w-[100px] lg:w-[100px]'>
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
                                                            className="py-2]"
                                                            error={""}
                                                            optionDisabled={[]}
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
                                                            optionDisabled={[]}
                                                        />
                                                    </div>
                                                    <div className='w-full sm:w-[20%] md:w-[20%] lg:w-[20%]'>
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
                                                    <div className='w-full sm:w-[20%] md:w-[20%] lg:w-[20%]'>
                                                        <TextField
                                                            value={element?.sales ?? ''}
                                                            name="sales"
                                                            className="!py-2"
                                                            title={<h3 className='font-bold my-2 text-sm text-heading'>Field Name</h3>}
                                                            onChange={(e) => handleInputValues(key, e.target.name, e.target.value)}
                                                            placeholder={"Press key for {field name}"}
                                                            type={"text"}
                                                            id={"sales"}
                                                        />
                                                    </div>
                                                    <div className='w-full sm:w-[20%] md:w-[20%] lg:w-[20%] relative' >
                                                        <label className={`new_input_label block text-sm text-heading `}>
                                                            <h3 className='font-bold my-2 text-sm text-heading'>Greeting</h3>
                                                        </label>
                                                        <div className='block sm:flex items-center justify-start gap-4'>
                                                            <Button
                                                                type={"button"}
                                                                className="w-full sm:w-[100px] md:w-[100px] lg:w-[100px] inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                                                onClick={() => {
                                                                    setIndex(key)
                                                                    setAudioModal(true)
                                                                }}
                                                            >
                                                                {element.audioName ? "Update" : "Add"}
                                                            </Button>
                                                            <div class="flex items-center justify-center rounded-md w-full sm:w-auto" role="group">
                                                                {key > 0 && (
                                                                    <>
                                                                        <button type="button"
                                                                            className="sm:hidden px-4 w-[50%] sm:w-auto py-2 mt-[20px] text-[10px] sm:text-xs md:text-xs lg:text-xs font-medium text-heading bg-white border border-border rounded-md hover:bg-primary hover:text-white "
                                                                            onClick={() => { removeNewValue(key) }}
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                        <button
                                                                            className='hidden sm:block font-bold mt-3 sm:mt-0'
                                                                            type='button'
                                                                            onClick={() => { removeNewValue(key) }}
                                                                        >
                                                                            <XMarkIcon className="h-[23px] w-[23px] text-primary font-bold" />
                                                                        </button>
                                                                    </>
                                                                )}
                                                                {botValue.length > basicFormData.length && (
                                                                    <>
                                                                        <button type="button"
                                                                            className="sm:hidden px-4 w-[50%] sm:w-auto py-2 mt-[20px] text-[10px] sm:text-xs md:text-xs lg:text-xs font-medium text-heading bg-white border border-border rounded-md hover:bg-primary hover:text-white "
                                                                            onClick={() => { addNewValue() }}
                                                                        >
                                                                            Add
                                                                        </button>
                                                                        <button
                                                                            className='hidden sm:block font-bold mt-3 sm:mt-0'
                                                                            type='button'
                                                                            onClick={() => { addNewValue() }}
                                                                        >
                                                                            <PlusSmallIcon className="h-[26px] w-[26px] text-primary  font-bold" />
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )}
                                        </>}
                                    {pageLoading ?
                                        <div className='grid grid-cols-[90%,10%]'>
                                            <div></div>
                                            <SkeletonLoader count={1} height={30} width={"100%"} />
                                        </div> :
                                        <div className='flex my-2 justify-end'>
                                            <Button
                                                type={"button"}
                                                className=" inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
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
                                    }

                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ToastContainer />

            {
                showIndexModal &&
                <Modal title={'Greeting '} show={showIndexModal} setShow={setShowIndexModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
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

            {audioModal === true && (
                <>
                    <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50' onClick={() => {
                        setAudioModal(false)
                    }
                    }></div>
                    <div className={` z-50 overflow-y-scroll w-full sm:w-[700px] p-5 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white`}>
                        <div className='flex flex-row gap-2 items-center py-4 border-b border-border dark:bg-gray-800'>
                            <div className='flex flex-1'>
                                <h1 className='text-heading text-sm font-semibold'>Greeting message</h1>
                            </div>
                            <div className='flex justify-end gap-2'>
                                <div className='cursor-pointer' onClick={(e) => {
                                    setAudioModal(false)
                                }}>
                                    <XMarkIcon className='h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2' />
                                </div>
                            </div>
                        </div>
                        {audioModal && (
                            <div className='p-5'>
                                <div className='block mt-1'>
                                    <div className='w-full '>
                                        <label className={`my-2 new_input_label block text-sm text-heading font-medium`}>
                                            <div className='flex items-center gap-2'><span>Upload file</span>  </div>
                                        </label>
                                        {index !== null ?
                                            <div className="flex items-center justify-center w-full">
                                                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border   border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">MP3 or WAV</p>
                                                        {basicFormData[index].audioName && (
                                                            <>

                                                                <p className="text-xs text-gray-500 dark:text-gray-400">You Uploaded</p>
                                                                <p className='text-xs text-border font-normal'>{basicFormData[index].audioName}</p>
                                                            </>
                                                        )}
                                                        {basicFormData[index].audioName && (
                                                            <div className='px-6 my-2'>
                                                                <AudioPlayer style={{
                                                                    width: '300px'
                                                                }}
                                                                    customVolumeControls={[]}
                                                                    customAdditionalControls={[]}
                                                                    src={basicFormData[index].audio}
                                                                    showSkipControls={false}
                                                                    showJumpControls={false} />
                                                            </div>
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
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">MP3 or WAV</p>
                                                        {basicField?.audioName && (
                                                            <>

                                                                <p className="text-xs text-gray-500 dark:text-gray-400">You Uploaded</p>
                                                                <p className='text-xs text-border font-normal'>{basicField?.audioName}</p>
                                                            </>
                                                        )}
                                                        {basicField?.audioName && (
                                                            <div className='px-6 my-2'>
                                                                <AudioPlayer style={{
                                                                    width: '300px'
                                                                }}
                                                                    customVolumeControls={[]}
                                                                    customAdditionalControls={[]}
                                                                    src={basicField.audio}
                                                                    showSkipControls={false}
                                                                    showJumpControls={false} />
                                                            </div>
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
                                            {greetingLoading ? "Loading..." : "Set as greeting message"}
                                        </Button>)}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
            {modal === true && (
                <>
                    <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50' onClick={() => {

                        setModal(false)
                    }
                    }></div>
                    <div className={` z-50 overflow-y-scroll w-full sm:w-[700px] p-5 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white`}>
                        <div className='flex flex-row gap-2 items-center py-4 border-b border-border dark:bg-gray-800'>
                            <div className='flex flex-1'>
                                <h1 className='text-heading text-sm font-semibold'>Greeting message</h1>
                            </div>
                            <div className='flex justify-end gap-2'>
                                <div className='cursor-pointer' onClick={(e) => {

                                    setModal(false)
                                }}>
                                    <XMarkIcon className='h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2' />
                                </div>
                            </div>
                        </div>
                        {modal === true && (
                            <div className='p-5'>
                                <div className='block mt-1'>
                                    <div className='w-full '>
                                        <TextArea name='greeting' placeholder={"Example: Hi! Thanks for calling. For sales, press 1 or say sales Set a greeting message For support, press 2 or say support"} id={"greeting_text"} value={basicField.greeting} onChange={handleInput} title={"Type text to convert to speech"} />
                                    </div>
                                    <Button
                                        type={"button"}
                                        className="mt-2 inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                        disabled={basicField?.greeting === '' || greetingLoading === true}
                                        onClick={() => SubmitForm('greetings')}
                                    >
                                        {greetingLoading ? "Loading..." : "Set as greeting message"}
                                    </Button>
                                </div>
                                <hr className='mt-6 text-border' />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div >
    )
}

export default PhoneHandle