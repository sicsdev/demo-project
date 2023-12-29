import { updateKnowledgeRecord, getDomainSubPages, addSubPagesKnowledge } from '@/app/API/pages/Knowledge'
import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { GlobeAmericasIcon, XCircleIcon } from '@heroicons/react/24/solid'
import React, { useRef, useState, useEffect } from 'react'
import TextField from '../Common/Input/TextField'
import Button from '../Common/Button/Button'
import SkeletonLoader from '../Skeleton/Skeleton'
import { errorMessage, successMessage } from '../Messages/Messages'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const UrlManagement = ({ setCreateOptions, basicFormData, setBasicFormData, handleSubmit, loading, setLoading, hideComponent }) => {
    const [subDomainPages, setSubDomainPages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSubPagesList, setSelectedSubPagesList] = useState([]);
    const [stepperCount, setStepperCount] = useState(0);

    const handleInputChange = (e) => {
        const { value, name } = e.target
        // setUrl(value)
        setBasicFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const validateUrl = (url) => {
        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
        return urlPattern.test(url);
    };

    const DisablingButton = () => {

        const requiredKeys = [
            "url"
        ];

        const formValues = requiredKeys.some(
            (key) => !basicFormData[key] || basicFormData[key].trim() === ""
        );

        const isUrlValid = basicFormData["url"] ? !validateUrl(basicFormData["url"]) : true;
        return formValues || isUrlValid;
    };


    useEffect(() => {
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                hideComponent();
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('keydown', handleEscapeKeyPress);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, []);

    function addHttpsToUrl(url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'https://' + url;
        }
        return url;
    }

    const getSubPagesHandler = async (e) => {
        try {
            setStepperCount(1);
            setIsLoading(true);
            let url = addHttpsToUrl(basicFormData.url);
            let payload = {
                url: url
            };
            const response = await getDomainSubPages(payload);
            if (response.status === 201 || response.status === 200) {
                const newData = [
                    { 0: basicFormData.url, 1: "General" },
                    ...response?.data // Add the existing data after the new object
                ];
                setSubDomainPages(newData);
                const extractedValues = newData.map(item => {
                    return item[0];
                });
                if (newData.length <= 5) {
                    setSelectedSubPagesList(extractedValues);
                } else {
                    setSelectedSubPagesList([extractedValues[0]]);
                }
                setIsLoading(false);
            } else {
                errorMessage('Please enter valid website url!')
                setIsLoading(false);
                setStepperCount(0);
            }
        } catch (error) {
            errorMessage('Please enter valid website url!')
            setIsLoading(false);
            setStepperCount(0);
        }
    };

    const handleSubPagesChange = (event, checkboxValue) => {
        if (event.target.checked) {
            if (selectedSubPagesList.length < 5) {
                setSelectedSubPagesList([...selectedSubPagesList, checkboxValue]);
            } else {
                event.target.checked = false; // Uncheck the checkbox if the limit is reached
            }
        } else {
            setSelectedSubPagesList(selectedSubPagesList.filter(item => item !== checkboxValue));
        }
    };

    const addPagesToKnowledgeHandler = async (e) => {
        try {
            setLoading(true);
            let payload = {
                urls: selectedSubPagesList
            }
            const response = await addSubPagesKnowledge(payload);
            if (response.status === 201 || response.status === 200) {
                successMessage('Website pages added successfully!');
                setCreateOptions(null);
                setBasicFormData({});
            } else {
                errorMessage("Unable to Proceed!");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            errorMessage("Unable to Proceed!");
        }
    };

    const disbaledOptionHandler = (url) => {

        if (!selectedSubPagesList.includes(url) && selectedSubPagesList.length >= 5) {
            return true;
        }
        return false;
    }

    function capitalizeEveryWord(str) {
        return str
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }
    function formatTitle(text) {
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

        // Function to convert URLs to lowercase
        const lowerCaseUrls = (match) => match.toLowerCase();

        // Lowercase words that should not be capitalized in titles
        let lowerCaseWords = ['of', 'or', 'and', 'an', 'a', 'with'];

        // Splitting the text into lines and processing each line
        return text.split('\n').map(line => {
            // Checking if the line is a URL
            if (line.match(urlRegex)) {
                return line.toLowerCase();
            } else {
                // Formatting as title
                return line
                    .toLowerCase()
                    .split(' ')
                    .map((word, index) => {
                        if (index === 0 || !lowerCaseWords.includes(word)) {
                            return word.charAt(0).toUpperCase() + word.slice(1);
                        }
                        return word;
                    })
                    .join(' ');
            }
        }).join('\n');
    }

    return (
        <>
            <div onClick={() => {
                hideComponent()
                setSubDomainPages([])
                setBasicFormData((prev) => {
                    return {
                        ...prev,
                        url: '',
                    }
                })
            }} className='rightSlideAnimations sm:bg-[#222023A6] md:bg-[#222023A6] lg:bg-[#222023A6]  fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'>    </div >
            <div className={`mt-[63px] sm:mt-0 md:mt-0 lg:mt-0  z-50 overflow-y-scroll w-full sm:w-auto fixed top-0 right-0 h-[90vh] md:h-full m-auto max-h-[100%] bg-white`}>
                <div className={`w-full sm:w-[700px] relative flex flex-col px-4 sm:px-8 h-full`}>

                    {/* START:: Top Section */}

                    <div className='flex flex-row gap-2 items-center py-4 border-b border-border dark:bg-gray-800 justify-between'>
                        <div className='flex items-center gap-1'>
                            <GlobeAmericasIcon className={`${DisablingButton() === true ? "text-heading" : "text-primary"}  h-5 w-5`} />
                            <h1 className='text-heading text-sm font-semibold mt-[2px]'>Website</h1>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <div className='cursor-pointer' onClick={(e) => setCreateOptions(null)}>
                                <XMarkIcon className='h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2' />
                            </div>
                        </div>
                    </div>

                    {/*  START:: Get Sub-domain Section */}
                    {stepperCount === 0 &&

                        <div className='flex flex-col flex-1 p-0 my-2'>
                            <div className='flex flex-col gap-8 border-gray-lightest px-8 -mx-8'>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='font-bold text-xs text-black'>Enter the URL of your external support content</h1>
                                    <p className="text font-normal text-xs">
                                        We will fetch all of the pages from the website URL you provide. Please provide a <strong>top-level domain</strong>. We will read from all the sub domain pages.
                                    </p>
                                    <TextField
                                        onChange={handleInputChange}
                                        value={basicFormData.url}
                                        className="py-3 mt-1 w-full"
                                        placeholder='https://support.mywebsite.com/'
                                        id='url'
                                        name='url'
                                        title={""}
                                        type={"text"}
                                        error={''}
                                        tooltipInfo={"The name of the product"}
                                    />
                                    <div className='flex flex-col gap-2 pt-2'>
                                        <div className="text-xs mt-0 ">
                                            <div className="mb-2 flex justify-start gap-2 items-center">
                                                <svg className='w-6 h-6' viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                                                        fill="#000000"
                                                    />
                                                </svg>
                                                <span>  Provide your <strong>external help center homepage link</strong> for best results</span>
                                            </div>
                                            <div className="mb-2 flex justify-start gap-2 items-center">
                                                <svg className='w-6 h-6' viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                                                        fill="#000000"
                                                    />
                                                </svg>
                                                <span>  <strong>Top-level domains will give the best results</strong> (e.g. https://myhelpcenter.com rather than https://myhelpcenter.com/home)</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                type="button"
                                                className="inline-block rounded bg-primary px-6 py-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                                disabled={DisablingButton() || loading === true}
                                                onClick={(e) => getSubPagesHandler(e)}>
                                                {loading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                    <span>Loading...</span> </> : "Sync external content"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {/*  START:: Select Sub-Domain Pages */}
                    {stepperCount === 1 &&
                        <div className="pt-5 px-0 sm:px-0 sm:pt-8 sm:pb-4 py-0 sm:py-8 h-[100vh]">
                            <div className=''>
                                <div className="flex gap-4 items-center justify-start">
                                    <div className='flex items-center gap-2'>
                                        {
                                            isLoading === true ?
                                                <svg
                                                    aria-hidden="true"
                                                    role="status"
                                                    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="#1C64F2"
                                                    />
                                                </svg>
                                                :
                                                <GlobeAmericasIcon className='text-primary h-5 w-5' />
                                        }

                                        <h1 className='text-heading text-sm font-semibold mt-[1px]'>Website</h1>
                                    </div>
                                    {/* <input
                                    className="rounded-2xl py-[2px] px-[10px]"
                                    style={{ border: "1px solid #000" }}
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    value={basicFormData.url}
                                    disabled={true}
                                /> */}
                                    <span className="rounded-2xl py-[2px] px-[10px] text-[12px] cursor-pointer"
                                        style={{ border: "1px solid #000" }}
                                    >{basicFormData.url}</span>
                                </div>
                                <p className="text font-normal text-xs py-2">
                                    {
                                        isLoading === true ? <>Crawl your website to generate sub-pages list.</> :
                                            <>Deflection found <b>{subDomainPages.length} pages</b> on your website into the following categories. You can select which pages to train your bot on. <span className='font-bold text-primary'>NOTE:</span> You can only train on up to <span className='font-bold'>5 pages</span> at a time.</>
                                    }
                                </p>

                                <div className="flex flex-wrap">
                                    {isLoading === true ?
                                        <div className="w-[100%] sm:w-1/2">
                                            <div className="bg-[#f5f5f5] relative rounded-xl p-6 mt-4">
                                                <SkeletonLoader height={15} width={100} />
                                                <SkeletonLoader className={`mt-2`} height={15} width={200} />
                                                <div className="absolute right-[10px] top-[10px]">
                                                    <SkeletonLoader className={`mt-2`} height={20} width={50} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        subDomainPages.length > 0 && subDomainPages.map((page, key) =>
                                            <div className="w-[100%] sm:w-1/2" key={key}>
                                                <div className={`bg-[#f5f5f5] h-[150px] relative rounded-xl p-5 mt-4 mx-2 cursor-pointer ${disbaledOptionHandler(page[0]) === true ? 'opacity-50' : ''}`}>
                                                    <div className="flex justify-end mb-2">
                                                        <label className="switch">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedSubPagesList.includes(page[0])}
                                                                onChange={e => handleSubPagesChange(e, page[0])}
                                                            />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                    <h4 className="text-sm font-semibold w-[calc(100%-38px)] break-words">{formatTitle(page[1])}</h4>
                                                    <p className='text-xs font-normal pt-2 break-words'>{page[0]}</p>
                                                    {/* {
                                                        disbaledOptionHandler(page[0]) === true ?
                                                            <Tippy className="chart-animation" content="You can only train on up to 5 pages at a time." interactive={true} interactiveBorder={20} animation={'fade slide-down'} placement={"bottom"}>
                                                                <div className="absolute right-[12px] top-[12px]">
                                                                    <label className="switch">
                                                                        <input
                                                                        disabled
                                                                            type="checkbox"
                                                                        // checked={selectedSubPagesList.includes(page[0])}
                                                                        // onChange={e => handleSubPagesChange(e, page[0])}
                                                                        />
                                                                        <span className="slider round"></span>
                                                                    </label>
                                                                </div>
                                                            </Tippy> :
                                                            <div className="absolute right-[12px] top-[12px]">
                                                                <label className="switch">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedSubPagesList.includes(page[0])}
                                                                        onChange={e => handleSubPagesChange(e, page[0])}
                                                                    />
                                                                    <span className="slider round"></span>
                                                                </label>
                                                            </div>
                                                    } */}

                                                </div>
                                            </div>
                                        )}
                                </div>

                            </div>

                            <div className='flex items-center justify-end gap-2 my-4 pb-2'>
                                <Button
                                    type={"button"}
                                    className="inline-block focus:outline-none focus:ring-4 text-xs px-6 py-2 font-bold rounded bg-#fff text-[#707B89] leading-normal disabled:shadow-none  transition duration-150 ease-in-out border border-solid border-[#8a939e] disabled:bg-input_color disabled:text-white"
                                    onClick={(e) => setStepperCount(0)}
                                >
                                    Go Back
                                </Button>
                                <Button
                                    type={"button"}
                                    className="inline-block rounded bg-primary px-6 py-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                    onClick={(e) => addPagesToKnowledgeHandler(e)}
                                    disabled={selectedSubPagesList.length < 1}
                                >
                                    {loading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                        <span>Loading...</span> </> : "Train Deflection"}
                                </Button>
                            </div>



                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default UrlManagement




export const ButtonComponent = ({ data, deleteRecord, deleteRecordNew }) => {
    const [showDelete, setShowDelete] = useState(null)

    const divRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setShowDelete(null);
            }
        };
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <>
            <div className='cursor-pointer relative' ref={divRef} onClick={(e) => {
                setShowDelete(prev => { if (prev === data.id) { return null } else { return data.id } })
            }}>
                <EllipsisHorizontalIcon className="h-5 w-5 font-bold text-heading cursor-pointer" />
                {showDelete === data.id && (
                    <div className={`absolute right-[0px] top-[20px] z-10 w-auto bg-[#F8F8F8] divide-y divide-gray-100shadow`}>
                        <button type='button' className="text-heading font-xs font-semibold  border border-border rounded-lg  hover:bg-black hover:text-white flex items-center justify-center gap-2 px-2 py-2 " onClick={() => {
                            deleteRecord(data.id)
                            deleteRecordNew(data.id)
                        }}>
                            <XCircleIcon className='w-4 h-4' />
                            <span className='font-xs' style={{ fontSize: '12px' }}>Delete</span> </button>

                    </div>
                )}
            </div >
        </>
    )

}