import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Button from '../Common/Button/Button'
import { PencilSquareIcon } from "@heroicons/react/24/outline";
const EditProfileModal = ({ setShowModal }) => {
    return (
        <>
            <div
                className="rightSlideAnimations sm:bg-[#222023A6] md:bg-[#222023A6] lg:bg-[#222023A6]  fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50"
            >
            </div>
            <div
                className={`mt-[63px] sm:mt-0 md:mt-0 lg:mt-0 z-50 overflow-y-scroll sm:w-[50%] w-[100%] p-5 fixed top-16 h-[80%] m-auto max-h-[100%] bg-white rounded-md`}
            >
                <div className="flex hover:cursor-pointer items-end justify-end gap-2">
                    <div className="flex justify-end gap-2">
                        <div className="cursor-pointer" onClick={(e) => setShowModal(false)}>
                            <XMarkIcon className="h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2" />
                        </div>
                    </div>
                </div>
                <div
                    className={`flex flex-row gap-2 items-center py-4 dark:bg-gray-800 `}
                >
                    <div className="flex flex-1 mx-2">
                        <h2 className={`text-black-color text-lg !font-semibold opacity-90 ml-3`}>Account</h2>
                    </div>
                    <div>
                        <Button className={'text-xs bg-primary_hover px-5 py-1 rounded-xl text-white'}>Save Changes</Button>
                    </div>
                </div>
                <div className='sm:w-[550px] w-auto'>
                    <div className='flex sm:gap-3 gap-2 mx-5 my-3 sm:my-1 items-center '>
                        <div className='relative'>
                            <div className="bg-soft-blue p-4 rounded-full text-white">YS</div>
                            <div className='absolute right-0 mt-[-21px]'><PencilSquareIcon className="h-4 w-4 text-gray-500" /></div>
                        </div>
                        <div className='w-[90%] grid gap-2'>
                            <p className="whitespace-normal text-xs ">Name</p>
                            <input type='text' className='pl-3 py-2 border border-gray rounded-sm w-[100%]' placeholder='Testing test' value="Testing test"></input>
                        </div>
                    </div>
                    <div className='m-5 pt-3 grid gap-2'>
                        <p className="whitespace-normal text-sm ">Email</p>
                        <p className="whitespace-normal text-xs text-[#c1c0c0]">Your Login Email</p>
                        <input type='text' className='px-3 py-2 border border-gray rounded-sm w-[100%] bg-[#eeeefb]' placeholder='test@test.com' value="test@test.com"></input>
                    </div>
                    <div className='m-5 pt-3 grid gap-2'>
                        <p className="whitespace-normal text-sm ">Change Password</p>
                        <p className="whitespace-normal text-xs text-[#c1c0c0]">Click On the button to change your password</p>
                        <button className={'text-xs border border-primary_hover w-[150px] text-primary_hover px-3  py-2 rounded-sm '}>Change My Password</button>
                    </div>
                    <div className='m-5 pt-3 grid gap-2'>
                        <p className="whitespace-normal text-sm ">Transfer Ownership</p>
                        <p className="whitespace-normal text-xs text-[#c1c0c0]">You're the license owner and have full control over ChatBot settings and subscription. You can transfer ownership to somebody else if needed.</p>
                        <button className={'text-xs border border-primary_hover text-primary_hover px-3 w-[150px]  py-2 rounded-sm '}>Change Owner</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfileModal