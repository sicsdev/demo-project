import React, { useState, useRef, useEffect } from 'react'
import Button from '../Common/Button/Button'
import { EllipsisHorizontalIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import Card from '../Common/Card/Card'
import moment from 'moment'
import Link from 'next/link'
import { getPermissionHelper } from '../helper/returnPermissions'
import { useSelector } from 'react-redux'

const StandardKey = ({ data, deleteKeyRecord, setCreateModal }) => {
    const [showToggle, setShowToggle] = useState(null)
    const dropdown = useRef(null);
    const user = useSelector((state) => state.user.data);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                setShowToggle(null);
            }
        };
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (

        <div className='mt-4 border border-border_color shadow-sm rounded-md'>
            <div className='p-4 flex items-center justify-between'>
                <div className=''>
                    <p className='font-bold text-lg'>Api keys</p>
                    <p className='text-xs'>These keys will allow you to authenticate API requests. Learn more</p>
                </div>
                {getPermissionHelper('CREATE SECRET KEY', user?.role) &&
                    <Button type="button" onClick={() => { setCreateModal(prev => !prev) }} className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]">
                        + Create secret key
                    </Button>}
            </div>
            <hr className='bg-border_color text-border_color ' />
            <div className=' table_overflow'>

                <div className="relative p-4">
                    <table className="w-full text-sm text-left ">
                        <thead className="text-xs  uppercase">
                            <tr className=" border-b border-border_color ">
                                <th scope="col" className='align-top'>
                                    <div className='m-3'><p>  NAME</p></div>
                                </th>
                                <th scope="col" className='align-top'>
                                    <div className='m-3'><p>  TOKEN</p></div>

                                </th>
                                <th scope="col" className='align-top'>
                                    <div className='m-3'><p>  CREATED</p></div>


                                </th>
                                <th scope="col" className='align-top'>
                                    <div className='m-3'><p>  ACTION</p></div>


                                </th>
                            </tr>
                        </thead>
                        {data.length > 0 && (
                            <tbody ref={dropdown}>
                                {data.map((ele, key) =>
                                    <tr key={key} className={(data.length - 1 !== key && data.length !== 0) && (`border-b border-border_color`)}>
                                        <th scope="row" className="font-medium text-heading whitespace-nowrap align-top">
                                            <div className='m-3 '><p> {ele.name}</p></div>
                                        </th>
                                        <td className=" min-w-[20px] max-w-[200px] break-words text-fade_text align-top">
                                            <div className='m-3'> <p className=' text-xs cursor-pointer'>
                                                {ele.key}</p></div>
                                        </td>
                                        <td className=" text-fade_text align-top">
                                            <div className='m-3 flex justify-start items-center gap-4'> <div className='group relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden left-[-183px] sm:left-0 md:left-0 lg:left-0 top-[-62px] sm:top-0 md:top-0 lg:top-0 absolute w-[220px]  z-50 group-hover:block'> <span className='text-[11px] font-light'>Used 28 times in the last 28 days</span></Card></div><p>{moment(ele.created).format('YYYY-MM-DD')}</p></div>
                                        </td>
                                        <td className=" text-fade_text align-top" >
                                            <div className='m-3' onClick={() => { setShowToggle(ele.id) }}>
                                                <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                                                {showToggle === ele.id && (
                                                    <div id="dropdown" className="z-10 absolute my-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                        <ul className="p-2  text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                            <li className='hover:bg-red hover:text-white rounded-md cursor-pointer ' onClick={() => { deleteKeyRecord(ele.id) }}>
                                                                <p className="block px-4 py-2   hover:text-white" >Delete</p>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        )}


                    </table>
                    {data.length === 0 && (
                        <p className='text-center my-4 text-sm'>No data found</p>
                    )}
                </div>

            </div>
        </div >
    )
}

export default StandardKey