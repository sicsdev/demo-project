import { EllipsisHorizontalIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Button from '../Common/Button/Button'
import Card from '../Common/Card/Card'

const RestrictedKey = () => {
    return (

        <div className='mt-4 border border-border_color shadow-sm rounded-md'>
            <div className='p-4 flex items-center justify-between'>
                <div className=''>
                    <p className='font-bold text-lg'>Restricted keys</p>
                    <p className='text-xs'>For greater security, you can create restricted API keys that limit access and permissions for different areas of your account data. Learn more</p>
                </div>
                <Button type="button" className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]">+ Create restricted key</Button>
            </div>
            <hr className='bg-border_color text-border_color' />
            <div className=''>

                <div className="relative overflow-x-auto p-4">
                    <table className="w-full text-sm text-left ">
                        <thead className="text-xs  ">
                            <tr className=" border-b border-border_color ">
                                <th scope="col" className='align-top'>
                                    <div className='m-3'><p>  NAME</p></div>
                                </th>
                                <th scope="col" className='align-top'>
                                    <div className='m-3'><p>  TOKEN</p></div>

                                </th>
                                <th scope="col" className='align-top'>
                                    <div className='m-3'><p>  LAST USED</p></div>

                                </th>
                                <th scope="col" className='align-top'>
                                    <div className='m-3'><p>  CREATED</p></div>


                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className=" border-b border-border_color ">
                                <th scope="row" className="font-medium text-heading whitespace-nowrap align-top">
                                    <div className='m-3'>
                                        <div className='flex justify-start gap-3 items-center'> <p>CLI key for LAPTOP-JK7MH68O
                                        </p> <span className=" bg-[#CFF5F6] text-xs font-medium mr-2 px-2.5 py-0.5 rounded text-primary">Connect</span> <div className='m-3 flex justify-start items-center gap-4'> <div className='group relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden left-[-183px] sm:left-0 md:left-0 lg:left-0 top-[-62px] sm:top-0 md:top-0 lg:top-0    absolute w-[220px]  z-50 group-hover:block'> <span className='text-[11px] font-light'>Used 28 times in the last 28 days</span></Card></div></div>  </div>
                                        <p className='text-[10px] text-danger font-bold'>Expires in 37 days</p>

                                    </div>
                                </th>
                                <td className=" min-w-[20px] max-w-[200px] break-words text-fade_text align-top">
                                    <div className='m-3'> <p className=' text-xs cursor-pointer'>
                                        rk_live_...egNS
                                    </p></div>
                                </td>
                                <td className=" align-top">
                                    <div className='m-3'> <p> Aug 20</p></div>
                                </td>
                                <td className=" text-fade_text align-top">
                                    <div className='m-3'> <p>May 26</p></div>
                                </td>
                                <td className=" text-fade_text align-top">
                                    <div className='m-3'>
                                        <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="">
                                <th scope="row" className="font-medium text-heading whitespace-nowrap align-top">
                                    <div className='m-3'>
                                        <div className='flex justify-start gap-3 items-center'> <p>CLI key for LAPTOP-JK7MH68O
                                        </p> <span className=" bg-[#CFF5F6] text-xs font-medium mr-2 px-2.5 py-0.5 rounded text-primary">Connect</span> <div className='m-3 flex justify-start items-center gap-4'> <div className='group relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden left-[-183px] sm:left-0 md:left-0 lg:left-0 top-[-62px] sm:top-0 md:top-0 lg:top-0    absolute w-[220px]  z-50 group-hover:block'> <span className='text-[11px] font-light'>Used 28 times in the last 28 days</span></Card></div></div></div>
                                        <p className='text-[10px] text-danger font-bold'>Expires in 40 days</p>
                                    </div>
                                </th>
                                <td className=" min-w-[20px] max-w-[200px] break-words text-fade_text align-top">
                                    <div className='m-3'> <p className=' text-xs cursor-pointer'>

                                        rk_live_...egNS
                                    </p></div>
                                </td>
                                <td className=" align-top">
                                    <div className='m-3'> <p> Aug 20</p></div>
                                </td>
                                <td className=" text-fade_text align-top">
                                    <div className='m-3'> <p>May 26</p></div>
                                </td>
                                <td className=" text-fade_text align-top">
                                    <div className='m-3'>
                                        <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default RestrictedKey