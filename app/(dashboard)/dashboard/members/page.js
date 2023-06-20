'use client'
import Button from '@/app/components/Common/Button/Button'
import { Input } from '@/app/components/Common/Input/Input'
import Modal from '@/app/components/Common/Modal/Modal'
import React, { useEffect, useState } from 'react'
import { XMarkIcon, UserGroupIcon, ClockIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMembers } from '@/app/components/store/slices/memberSlice'
import Loading from '@/app/components/Loading/Loading'
import Invite from '@/app/components/Invite/Invite'

const Page = () => {
    const [teamModal, setTeamModal] = useState(false)
    const state = useSelector(state => state.members)
    const dispatch = useDispatch()
    const getMembersData = () => {
        dispatch(fetchMembers())
    }
    useEffect(() => {
        getMembersData()
    }, [])
    return (
        <div>
            <div className='block sm:flex md:flex lg:flex justify-between items-center mb-2'>
                <div>
                    <h3 className='font-bold text-heading text-xl'>Manage Team</h3>
                    <p className='text-heading font-normal text-normal'>Invite and manage team members on this integration.</p>
                </div>
                <div>
                    <Button type={"button"} onClick={(e) => { setTeamModal(true) }}
                        className="inline-block font-bold rounded bg-primary px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                    >
                        Invite Team Member
                    </Button>
                </div>
            </div>

            <div className="border-b border-border dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a href="#" className=" flex justify-start gap-2 items-center p-4 text-heading font-bold border-b-2 border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                            <UserGroupIcon className="h-6 w-6 text-gray-500" /> Team Members
                        </a>
                    </li>

                </ul>
            </div>
            {state?.isLoading === true? 
            <Loading /> 
            :
                <div className='mt-5'>

                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <tbody>
                                {state?.data && state?.data.map((element, key) =>
                                    <tr className=" border-b border-border dark:bg-gray-800 dark:border-gray-700" key={key}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-full dark:bg-gray-600">
                                                <span className="font-bold text-white dark:text-gray-300">{element.enterprise.name.substring(0, 2)}</span>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {element.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {element.enterprise.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {element.phone_prefix}{" "}{element.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className="inline-block whitespace-nowrap rounded-full bg-sky px-4 py-1 text-center align-baseline text-sm font-bold leading-none text-heading">
                                                Admin
                                            </span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>}


            <Modal title={'Invite Team Member'} show={teamModal} setShow={setTeamModal} className={'text-center w-[80%] rounded-lg'} showCancel={true} >
               <Invite setTeamModal={setTeamModal}/>
            </Modal>
        </div>
    )
}

export default Page