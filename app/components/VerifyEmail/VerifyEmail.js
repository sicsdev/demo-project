import React from 'react'
import Button from '../Common/Button/Button'
import TextField from '../Common/Input/TextField'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Card from '../Common/Card/Card'
import { useState } from 'react'
import { enterpriseDomainInitialize } from '@/app/API/pages/EnterpriseService'
import { useEffect } from 'react'
import { errorMessage, successMessage } from '../Messages/Messages'
import { useDispatch } from 'react-redux'
import { fetchProfile } from '../store/slices/userSlice'

const CheckEmail = ({ data, user, loader, getData }) => {
    console.log("data", data)
    const dispatch = useDispatch();
    const [domainName, setDomainName] = useState("");
    const domainPattern = /^[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+$/;
    const [isValid, setIsValid] = useState(true);
    const [loaderButton, setLoaderButton] = useState(false);

    const createDomainHandler = async () => {
        try {
            setLoaderButton(true);
            const domains = await enterpriseDomainInitialize({
                domain: domainName,
            });
            getData();
            dispatch(fetchProfile());
            successMessage('Domain Name Added Successfully!');
            setLoaderButton(false);
        } catch (error) {
            errorMessage("Unable to add Domain");
            setLoaderButton(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setDomainName(value)
        setIsValid(domainPattern.test(value));
    }

    useEffect(() => {
        if (user && user?.enterprise?.domain !== '') {
            setDomainName(user?.enterprise?.domain);
        }
    }, [user])

    return (
        <div className="bg-white w-full m-auto border rounded-lg border-[#F0F0F1] mt-5">
            <div className=' p-4'>
                <h1 className='text-sm font-semibold'>Email Domain Verification</h1>
            </div>
            <hr className='text-[#F0F0F1]' />
            <div className=' p-4'>
                <div className=''>
                    <div className='my-2'>
                        <TextField
                            name='domain_name'
                            className='py-3 w-full mt-1'
                            value={domainName}
                            onChange={(e) => handleInputChange(e)}
                            style={{ borderColor: isValid ? 'initial' : 'red' }}
                            title={<div className='flex items-center gap-2'><span>Domain Name</span></div>}
                            placeholder={"Domain name"}
                            type={'text'}
                            id={"company_name"}
                            disabled={user && user?.enterprise?.domain !== '' ? true : false}
                        />
                        {!isValid && <p style={{ color: 'red' }}>Invalid domain format</p>}
                        {user && user?.enterprise?.domain === '' && (
                            <div className='flex items-center justify-between'>
                                <div></div>
                                <Button
                                    type={"button"}
                                    className="inline-block rounded bg-primary mt-3 px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                    onClick={(e) => createDomainHandler()}
                                    disabled={domainName === '' || !isValid ? true : false}
                                >
                                    {loaderButton === true ? 'Loading...' : 'Save'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                {user && user?.enterprise?.domain !== '' && (
                    <>
                        <p className='text-xs'>Step 1. Add the below records to your Domain Service Provider (For example: GoDaddy, Google, AWS, etc...)</p>
                        <p className='text-xs'>Step 2. Click on the Refresh Verification button to validate the records.</p>
                        <p className='text-xs mt-2'>Please note, once you've added the appropriate DNS records, <b>it can take several hours for them to propagate.</b> Once all records are verified Friendbuy is able to send emails from this domain.
                        </p>
                        <div className='bg-[#F3F6F9] p-4 my-6'>
                            <div className='block   x sm:flex justify-start gap-4 items-center'>
                                <span className="bg-[#0F9960] text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">SPF Record status (DEPRECATED): Success</span>
                                <span className="bg-[#0F9960] text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">DKIM Record status (DEPRECATED): Success</span>
                            </div>
                            <h1 className='text-sm font-semibold my-4'>DNS Server Records</h1>
                            {data?.length > 0 && data?.map((item, key) =>
                                <div key={key}>
                                    <div className='flex justify-between gap-4 items-center'>
                                        <p className="text-xs font-semibold">Verification Record</p>
                                        <span className={`${item?.is_active === true ? 'bg-[#0F9960]' : 'bg-border'}  text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>Status: {item?.is_active === true ? 'Active' : 'Disabled'}</span>
                                    </div>

                                    <div className="relative overflow-x-auto mt-4">
                                        <table className="w-full text-sm text-left text-heading">
                                            <thead className="text-xs text-gray-700 uppercase  ">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                        Required Value
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 bg-[#E2E2E2] ml-2 border-l-2 border-white">
                                                        Type
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="w-full">
                                                    <td className="w-[20%] px-6 py-4 font-medium text-xs  break-all">
                                                        {item?.name}
                                                    </td>
                                                    <td className="w-[60%] px-6 py-4 font-medium text-xs  break-all ">
                                                        {item?.value}
                                                    </td>
                                                    <td className="w-[20%] px-6 py-4 font-medium text-xs  break-all">
                                                        {item?.record_type}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            )}

                        </div>
                        <Button
                            type={"button"}
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                        >
                            Verify
                        </Button>
                    </>
                )}

            </div>
        </div>
    )
}

export default CheckEmail