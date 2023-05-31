'use client'
import Button from '@/app/components/Common/Button/Button'
import { Input } from '@/app/components/Common/Input/Input'
import Modal from '@/app/components/Common/Modal/Modal'
import React, { useState } from 'react'
import { XMarkIcon , UserGroupIcon,ClockIcon,Cog6ToothIcon  } from '@heroicons/react/24/outline';

const Page = () => {
    const [teamModal, setTeamModal] = useState(false)
    return (
        <div>
            <div className='flex justify-between items-center mb-2'>
                <div>
                    <h3 className='font-bold text-heading text-xl'>Manage Team</h3>
                    <p className='text-heading font-normal text-normal'>Invite and manage team members on this integration.</p>
                </div>
                <div>
                    <Button type={"button"} onClick={(e) => { setTeamModal(true) }}
                        className="inline-block font-bold rounded bg-voilet px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
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

            <div
                className="mb-3 hidden w-full items-center rounded-lg bg-sky mt-5 px-6 py-5 text-base text-white data-[te-alert-show]:inline-flex"
                role="alert"
                data-te-alert-init
                data-te-alert-show>
                New! Collaborators can log in to view performance data, user feedback, and access embed tools, but can't make
                changes.
                <button
                    type="button"
                    className="ml-auto box-content rounded-none border-none p-1 text-warning-900 opacity-50 hover:text-warning-900 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-alert-dismiss
                    aria-label="Close">
                    <span
                        className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                       <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </span>
                </button>
            </div>

            <div className='mt-5'>

                <div className="relative overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className=" border-b border-border dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-full dark:bg-gray-600">
                                        <span className="font-bold text-white dark:text-gray-300">JL</span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    yash@usetempo.com
                                </td>
                                <td className="px-6 py-4">
                                <ClockIcon className="h-6 w-6 text-gray-500" />
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className="inline-block whitespace-nowrap rounded-full bg-sky px-4 py-1 text-center align-baseline text-sm font-bold leading-none text-heading">
                                        Admin
                                    </span>
                                </td>
                                <td className="px-6 py-4 w-[20px] cursor-pointer">
                                    <div className='p-2 border border-border'>
                                    <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
                                    </div>
                                    <div  className="z-40 hidden absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-heading font-semibold dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li>
                                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove Team Member</a>
                                            </li>
                                           
                                        </ul>
                                    </div>

                                </td>
                            </tr>
                            <tr className=" border-b border-border dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-full dark:bg-gray-600">
                                        <span className="font-bold text-white dark:text-gray-300">JL</span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    yash@usetempo.com
                                </td>
                                <td className="px-6 py-4">
                                <ClockIcon className="h-6 w-6 text-gray-500" />

                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className="inline-block whitespace-nowrap rounded-full bg-sky px-4 py-1 text-center align-baseline text-sm font-bold leading-none text-heading">
                                        Admin
                                    </span>
                                </td>
                                <td className="px-6 py-4 w-[20px]">
                                    <div className='p-2 border border-border'>
                                    <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
                                    </div>

                                </td>
                            </tr>
                            <tr className=" border-b border-border dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-full dark:bg-gray-600">
                                        <span className="font-bold text-white dark:text-gray-300">JL</span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    yash@usetempo.com
                                </td>
                                <td className="px-6 py-4">
                                <ClockIcon className="h-6 w-6 text-gray-500" />

                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className="inline-block whitespace-nowrap rounded-full bg-sky px-4 py-1 text-center align-baseline text-sm font-bold leading-none text-heading">
                                        Admin
                                    </span>
                                </td>
                                <td className="px-6 py-4 w-[20px]">
                                    <div className='p-2 border border-border'>
                                    <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
                                    </div>

                                </td>
                            </tr>
                            <tr className=" border-b border-border dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-full dark:bg-gray-600">
                                        <span className="font-bold text-white dark:text-gray-300">JL</span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    yash@usetempo.com
                                </td>
                                <td className="px-6 py-4">
                                <ClockIcon className="h-6 w-6 text-gray-500" />
                                

                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className="inline-block whitespace-nowrap rounded-full bg-sky px-4 py-1 text-center align-baseline text-sm font-bold leading-none text-heading">
                                        Admin
                                    </span>
                                </td>
                                <td className="px-6 py-4 w-[20px]">
                                    <div className='p-2 border border-border'>
                                    <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>


            <Modal title={'Invite Team Member'} show={teamModal} setShow={setTeamModal} className={'text-center w-[80%] bg-modal rounded-lg'} showCancel={true} >
                <div className='p-5'>
                    <div className='inline'>
                        <label className='text-start block my-2 text-md font-semibold text-heading dark:text-white '>Team Member Email<sup>(required)</sup></label>
                        <Input type={"email"} placeholder={"Enter your email"} className={"border border-input_color w-full"} id={"email"} onChange={(value) => { console.log(value) }} />
                    </div>
                    <p className='text-start block my-4 text-md font-semibold text-heading dark:text-white '>Team Member Role <sup>(required)</sup></p>
                    <div className='flex flex-row gap-4'>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault02"
                                checked />
                            <label
                                className="mt-px text-heading font-bold inline-block pl-[0.15rem] hover:cursor-pointer"
                                for="Admin">
                                Admin
                            </label>
                        </div>
                        <div>
                            <p className='text-border text-normal '> Admins will be able to log in and help manage this integration.</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-4 mt-2'>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault02"
                                checked />
                            <label
                                className="mt-px text-heading font-bold inline-block pl-[0.15rem] hover:cursor-pointer"
                                for="Admin">
                                Collaborators
                            </label>
                        </div>
                        <div>
                            <p className='text-border text-normal '>  Collaborators can log in to view performance data, user feedback, and access embed tools, but can't make changes.</p>
                        </div>
                    </div>
                    <hr className='text-border my-8' />
                    <div className='pb-10'>
                        <Button type={"button"} onClick={(e) => { setTeamModal(true) }}
                            className="inline-block float-right mb-2 font-bold rounded bg-voilet px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                        >
                            Send Invite
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Page