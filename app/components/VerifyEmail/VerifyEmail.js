import React from 'react'
import Button from '../Common/Button/Button'
import TextField from '../Common/Input/TextField'
import Card from '../Common/Card/Card'
import { useState } from 'react'
import { enterpriseDomainInitialize } from '@/app/API/pages/EnterpriseService'
import { useEffect } from 'react'
import { errorMessage, successMessage } from '../Messages/Messages'
import { useDispatch } from 'react-redux'
import { fetchProfile } from '../store/slices/userSlice'
import SkeletonLoader from '../Skeleton/Skeleton'
import SelectOption from '../Common/Input/SelectOption'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { CheckBadgeIcon, EyeIcon } from '@heroicons/react/24/outline'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'react-tooltip'

const CheckEmail = ({ data, user, loader, getData, verifyDomainHnadler, verifyLoader, verifyDomainData }) => {
    const dispatch = useDispatch();
    const [basicFormData, setBasicFormData] = useState({ domainName: "", subDomain: "" });
    const domainPattern = /^[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+$/;
    const [isValid, setIsValid] = useState(true);
    const [loaderButton, setLoaderButton] = useState(false);
    const [showFullText, setShowFullText] = useState('')

    const createDomainHandler = async () => {
        try {
            setLoaderButton(true);
            const userDomainName = basicFormData.subDomain + `.` + basicFormData.domainName;
            const domains = await enterpriseDomainInitialize({
                domain: userDomainName,
            });

            if (domains?.status === 200 || domains?.status === 201) {
                getData();
                dispatch(fetchProfile());
                successMessage('Domain Name Added Successfully!');
            }
            setLoaderButton(false);
        } catch (error) {
            errorMessage("Unable to add Domain");
            setLoaderButton(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBasicFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        if (name === "domainName") {
            setIsValid(domainPattern.test(value));
        }
    }

    useEffect(() => {
        if (user && user?.enterprise?.domain !== '') {
            setBasicFormData(prev => {
                return {
                    ...prev,
                    domainName: user?.enterprise?.domain
                }
            })
            // setDomainName(user?.enterprise?.domain);
        }
    }, [user])

    const isVerifyRecord = (item) => {
        if (verifyDomainData?.registers?.length > 0) {
            const findRecord = verifyDomainData?.registers?.find((x) => x.name == item.name && x.value == item.value);
            if (findRecord !== undefined) {
                if (findRecord?.active === true) {
                    return true;
                }
            }
        }
        return false;
    };

    const handleShowFullText = (key) => {
        showFullText == key ? setShowFullText('') : setShowFullText(key)
    }

    return (
        <div className="bg-white w-full m-auto border rounded-lg border-[#F0F0F1] mt-5">

            <>
            </>
            {loader === true ? (
                <>
                    <div className=' p-4'>
                        <h1 className='text-sm font-semibold'> <SkeletonLoader height={20} width={150} /></h1>
                    </div>
                    <hr className='text-[#F0F0F1]' />
                    <div className=' p-4'>
                        <div className=''>
                            <div className='my-2'>
                                <SkeletonLoader height={12} width={100} />
                                <SkeletonLoader height={40} width={"100%"} />
                                <SkeletonLoader height={10} width={"50%"} />
                                <SkeletonLoader height={10} width={"40%"} />
                                <div className='mt-2'>
                                    <SkeletonLoader height={10} width={"100%"} />
                                    <SkeletonLoader height={10} width={"10%"} />
                                </div>
                                <div className='bg-[#F3F6F9] p-4 my-6 hidden sm:block'>

                                    <h1 className='text-sm font-semibold my-4'>   <SkeletonLoader height={19} width={150} /></h1>
                                    <div className='flex justify-between gap-4 items-center'>
                                        <p className="text-xs font-semibold">   <SkeletonLoader height={14} width={100} /></p>
                                        <span className={` text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>   <SkeletonLoader height={16} width={100} /></span>
                                    </div>
                                    <div >
                                        <div className="relative overflow-x-auto mt-4">
                                            <table className="w-full text-sm text-left text-heading">
                                                <thead className="text-xs text-gray-700 uppercase  ">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ">
                                                            <SkeletonLoader height={19} width={50} />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                            <SkeletonLoader height={19} width={100} />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                            <SkeletonLoader height={19} width={50} />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                            <SkeletonLoader height={19} width={80} />
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="w-full">
                                                        <td className="w-[30%] px-6 py-4 font-medium text-xs  break-all">
                                                            <SkeletonLoader height={10} width={"100%"} />
                                                        </td>
                                                        <td className="w-[50%] px-6 py-4 font-medium text-xs  break-all ">
                                                            <div className='flex items-center justify-start gap-1'>
                                                                <SkeletonLoader height={10} count={1} width={100} />
                                                            </div>
                                                        </td>
                                                        <td className="w-[10%] px-6 py-4 font-medium text-xs  break-all">
                                                            <SkeletonLoader height={10} width={"100%"} />
                                                        </td>
                                                        <td className="w-[10%] px-6 py-4 font-medium text-xs  break-all">
                                                            <SkeletonLoader height={10} width={"100%"} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    <div >
                                        <div className="relative overflow-x-auto mt-4">
                                            <table className="w-full text-sm text-left text-heading">
                                                <thead className="text-xs text-gray-700 uppercase  ">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ">
                                                            <SkeletonLoader height={19} width={50} />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                            <SkeletonLoader height={19} width={100} />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                            <SkeletonLoader height={19} width={50} />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                            <SkeletonLoader height={19} width={80} />
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="w-full">
                                                        <td className="w-[30%] px-6 py-4 font-medium text-xs  break-all">
                                                            <SkeletonLoader height={10} width={"100%"} />
                                                        </td>
                                                        <td className="w-[50%] px-6 py-4 font-medium text-xs  break-all ">
                                                            <div className=''>
                                                                <SkeletonLoader height={10} count={3} width={"100%  "} />
                                                            </div>
                                                        </td>
                                                        <td className="w-[10%] px-6 py-4 font-medium text-xs  break-all">
                                                            <SkeletonLoader height={10} width={"100%"} />
                                                        </td>
                                                        <td className="w-[10%] px-6 py-4 font-medium text-xs  break-all">
                                                            <SkeletonLoader height={10} width={"100%"} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    <div >
                                        <div className="relative overflow-x-auto mt-4">
                                            <table className="w-full text-sm text-left text-heading">
                                                <thead className="text-xs text-gray-700 uppercase  ">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ">
                                                            <SkeletonLoader height={19} width={50} />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                            <SkeletonLoader height={19} width={100} />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                            <SkeletonLoader height={19} width={50} />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                            <SkeletonLoader height={19} width={80} />
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="w-full">
                                                        <td className="w-[30%] px-6 py-4 font-medium text-xs  break-all">
                                                            <SkeletonLoader height={10} width={"100%"} />
                                                        </td>
                                                        <td className="w-[50%] px-6 py-4 font-medium text-xs  break-all ">
                                                            <div className='flex items-center justify-start gap-1'>
                                                                <SkeletonLoader height={10} count={1} width={100} />
                                                            </div>
                                                        </td>
                                                        <td className="w-[10%] px-6 py-4 font-medium text-xs  break-all">
                                                            <SkeletonLoader height={10} width={"100%"} />
                                                        </td>
                                                        <td className="w-[10%] px-6 py-4 font-medium text-xs  break-all">
                                                            <SkeletonLoader height={10} width={"100%"} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </div>
                                <div className='bg-[#F3F6F9] p-4 my-6  sm:hidden'>
                                    <h1 className='text-sm font-semibold my-4'>
                                        <SkeletonLoader height={19} width={150} /></h1>
                                    <div className='flex justify-between gap-4 items-center'>
                                        <p className="text-xs font-semibold">
                                            <SkeletonLoader height={14} width={100} /></p>
                                        <span className={` text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>
                                            <SkeletonLoader height={16} width={100} /></span>
                                    </div>
                                    <div className='p-6 my-2 border border-border rounded-md bg-white' >

                                        <div className='my-2'>
                                            <h1 className='text-sm font-semibold'>
                                                <SkeletonLoader height={22} width={50} /></h1>
                                            <p className='text-xs'>
                                                <SkeletonLoader height={19} width={70} /></p>
                                        </div>

                                        <div className='my-2'>
                                            <h1 className='text-sm font-semibold'>
                                                <SkeletonLoader height={22} width={150} /></h1>
                                            <p className='text-xs'>
                                                <SkeletonLoader height={19} width={100} /></p>
                                        </div>
                                        <div className='my-2'>  <h1 className='text-sm font-semibold'>
                                            <SkeletonLoader height={22} width={50} /></h1>
                                            <p className='text-xs'>
                                                <SkeletonLoader height={19} width={70} /></p>
                                        </div>
                                        <div className='my-2'>
                                            <h1 className='text-sm font-semibold'>
                                                <SkeletonLoader height={22} width={50} /></h1>
                                            <p className='text-xs'>
                                                <SkeletonLoader height={19} width={70} /></p>

                                        </div>
                                    </div>
                                    <div className='p-6 my-2 border border-border rounded-md bg-white' >

                                        <div className='my-2'>
                                            <h1 className='text-sm font-semibold'>
                                                <SkeletonLoader height={22} width={50} /></h1>
                                            <p className='text-xs'>
                                                <SkeletonLoader height={19} width={70} /></p>
                                        </div>

                                        <div className='my-2'>
                                            <h1 className='text-sm font-semibold'>
                                                <SkeletonLoader height={22} width={150} /></h1>
                                            <p className='text-xs'>
                                                <SkeletonLoader height={19} width={100} /></p>
                                        </div>
                                        <div className='my-2'>  <h1 className='text-sm font-semibold'>
                                            <SkeletonLoader height={22} width={50} /></h1>
                                            <p className='text-xs'>
                                                <SkeletonLoader height={19} width={70} /></p>
                                        </div>
                                        <div className='my-2'>
                                            <h1 className='text-sm font-semibold'>
                                                <SkeletonLoader height={22} width={50} /></h1>
                                            <p className='text-xs'>
                                                <SkeletonLoader height={19} width={70} /></p>

                                        </div>
                                    </div>
                                </div>
                                <SkeletonLoader height={28} width={150} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className=' p-4 bg-lowgray'>
                        <h1 className='text-sm font-semibold flex items-center gap-2'>
                            <EnvelopeIcon className='h-5 w-5'></EnvelopeIcon>
                            Email Domain Verification
                        </h1>
                    </div>

                    <hr className='text-[#F0F0F1]' />
                    <div className=' p-4'>
                        <div className=''>
                            <div className='my-2'>
                                {user && user?.enterprise?.domain === '' &&
                                    <SelectOption
                                        onChange={(e) => handleInputChange(e)}
                                        value={basicFormData.subDomain || ""}
                                        name="subDomain"
                                        values={[
                                            { name: "Help", value: "help" },
                                            { name: "Support", value: "support" },
                                            { name: "Tickets", value: "tickets" },
                                        ]}
                                        title={<div className='flex items-center gap-2'><span>Select Subdomain</span></div>}
                                        id={"subDomain"}
                                        className="py-3"
                                        error={""}
                                        labelClass={'new_input_label mb-3'}
                                    />
                                }
                                <div className='pt-2'>
                                    <TextField
                                        name='domainName'
                                        className='py-3 w-full mt-'
                                        value={basicFormData.domainName || ""}
                                        onChange={(e) => handleInputChange(e)}
                                        style={{ borderColor: isValid ? 'initial' : 'red' }}
                                        title={<div className='flex items-center gap-2'><span>Domain Name</span></div>}
                                        placeholder={"Domain name"}
                                        type={'text'}
                                        id={"domainName"}
                                        disabled={user && user?.enterprise?.domain !== '' ? true : false}
                                    />

                                    {!isValid && <p className='text-xs' style={{ color: 'red' }}>Invalid domain format</p>}
                                </div>
                                {user && user?.enterprise?.domain === '' && (
                                    <div className='flex items-center justify-between'>
                                        <div></div>
                                        <Button
                                            type={"button"}
                                            className="inline-block rounded bg-primary mt-3 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                            onClick={(e) => createDomainHandler()}
                                            disabled={basicFormData?.domainName === '' || basicFormData?.subDomain === '' || !isValid ? true : false}
                                        >
                                            {loaderButton === true ? 'Loading...' : 'Save'}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {user && user?.enterprise?.domain !== '' && (
                            <>
                                <div className='mx-2 mt-4 bg-[#f8f8f9] p-3 rounded-md my-4'>
                                    <h2 className='text-md font-semibold mb-2 flex gap-1 items-center mb-4 text-primary'>
                                        <CheckBadgeIcon className='h-5 w-5 text-primary font-bold'></CheckBadgeIcon>
                                        Verification Process
                                    </h2>

                                    <div className='mb-4'>
                                        <h3 className='text-sm font-semibold mb-1'><b>Step 1:</b> Configure DNS Records</h3>
                                        <p className='text-xs'>
                                            Please input the following details into your Domain Hosting Service (e.g. GoDaddy, Google Cloud, AWS, etc.).
                                        </p>
                                    </div>

                                    <div className='mb-4'>
                                        <h3 className='text-sm font-semibold mb-1'><b>Step 2:</b> Confirm Records</h3>
                                        <p className='text-xs'>
                                            Hit the 'Update Verification' button to confirm the entered DNS records.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className='text-sm font-semibold mb-1'>Propagation Delay</h3>
                                        <p className='text-xs'>
                                            Be aware that after setting the correct DNS records, there may be a propagation delay lasting several hours. Once the records are fully authenticated, Deflection AI will have the capability to dispatch emails using this domain.
                                        </p>
                                    </div>
                                </div>

                                <div className='bg-[#F3F6F9] p-4 my-6 hidden sm:block rounded-md'>

                                    <h1 className='text-sm font-semibold my-4'>DNS Server Records</h1>
                                    <div className='flex justify-between gap-4 items-center'>
                                        <p className="text-xs font-semibold">Verification Record</p>
                                        <span className={`${verifyDomainData?.success === true ? 'bg-[#0F9960]' : 'bg-border'}  text-white text-xs font-medium mr-2 px-2.5 py-1.5 rounded`}><b>Status:</b> {verifyDomainData?.success === true ? 'Verified' : 'Unverified'}</span>
                                    </div>

                                    {data?.length > 0 && (
                                        <div className="relative overflow-x-auto mt-4">
                                            <table className="w-full text-sm text-left text-heading">
                                                <thead className="bg-gray text-xs font-semibold text-black">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 border-l-2 border-r-2 border-white">
                                                            Required Value
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 border-l-2 border-r-2 border-white">
                                                            Type
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 border-l-2 border-r-2 border-white">
                                                            Priority
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {data.map((item, key) => (
                                                        <tr key={key} className="w-full hover:bg-lowgray">
                                                            <td className="w-[30%] px-6 py-4 font-medium text-xs break-all">
                                                                {item?.name}
                                                            </td>
                                                            <td className="w-[50%] px-6 py-4 font-medium text-xs break-all">
                                                                <div className='flex items-center justify-start gap-1'>

                                                                    {item?.value.length > 50 ? (
                                                                        <div className='flex items-center justify-start gap-1'>
                                                                            {isVerifyRecord(item) === true ? (
                                                                                <CheckCircleIcon className='min-w-[20px] h-[20px] w-[20px] text-soft-green' />
                                                                            ) : (
                                                                                <XCircleIcon className='min-w-[20px] h-[20px] w-[20px] text-red' />
                                                                            )}

                                                                            <span
                                                                                title={item.value}
                                                                                className={`cursor-pointer text-blue-500`}
                                                                                onClick={() => handleShowFullText(key)}
                                                                            >
                                                                                {showFullText == key ? item?.value :
                                                                                    <div className='flex gap-1 items-center'>
                                                                                        {item?.value.slice(0, 50)}...
                                                                                        <EyeIcon className='w-4 h-4 text-primary'></EyeIcon>
                                                                                    </div>
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='flex items-center justify-start gap-1'>
                                                                            {isVerifyRecord(item) === true ? (
                                                                                <CheckCircleIcon className='min-w-[20px] h-[20px] w-[20px] text-soft-green' />
                                                                            ) : (
                                                                                <XCircleIcon className='min-w-[20px] h-[20px] w-[20px] text-red' />
                                                                            )}
                                                                            {item?.value}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="w-[10%] px-6 py-4 font-medium text-xs break-all">
                                                                {item?.record_type}
                                                            </td>
                                                            <td className="w-[10%] px-6 py-4 font-medium text-xs break-all">
                                                                {item?.priority}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}


                                </div>
                                <div className='bg-[#F3F6F9] p-4 my-6  sm:hidden'>
                                    <h1 className='text-sm font-semibold my-4'>DNS Server Records</h1>
                                    <div className='flex justify-between gap-4 items-center'>
                                        <p className="text-xs font-semibold">Verification Record</p>
                                        <span className={`${verifyDomainData?.success === true ? 'bg-[#0F9960]' : 'bg-border'}  text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>Status: {verifyDomainData?.success === true ? 'Verified' : 'Unverified'}</span>
                                    </div>
                                    {data?.length > 0 && data?.map((item, key) =>
                                        <div className='px-6 py-2 my-2 border border-border rounded-md bg-white' key={key}>
                                            {item.name && (
                                                <div className='my-4'>
                                                    <h1 className='text-sm font-semibold'>Name</h1>
                                                    <p className='text-xs'>  {item?.name}</p>
                                                </div>
                                            )}
                                            <div className='my-4'>
                                                <h1 className='text-sm font-semibold '>REQUIRED VALUE</h1>
                                                <div className='flex items-center justify-start gap-1'>
                                                    {
                                                        isVerifyRecord(item) === true ? <CheckCircleIcon className='min-w-[20px] h-[20px] w-[20px] text-soft-green' />
                                                            :
                                                            <XCircleIcon className='min-w-[20px] h-[20px] w-[20px] text-red' />
                                                    }
                                                    <p className='text-xs break-words w-full pr-[10px]'>   {item?.value}</p>
                                                </div>
                                            </div>
                                            <div className='my-4'>
                                                <h1 className='text-sm font-semibold'>TYPE</h1>
                                                <p className='text-xs'> {item?.record_type}</p></div>
                                            <div className='my-4'>
                                                <h1 className='text-sm font-semibold'>PRIORITY</h1>
                                                <p className='text-xs'>{item?.priority}</p>

                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='flex justify-center mt-4'>
                                    <Button
                                        type={"button"}
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                        onClick={(e) => verifyDomainHnadler()}
                                    >
                                        {verifyLoader === true ? 'Verifying...' : 'Update Verification'}
                                    </Button>
                                </div>
                            </>
                        )}

                    </div>
                </>
            )}
        </div>
    )
}

export default CheckEmail