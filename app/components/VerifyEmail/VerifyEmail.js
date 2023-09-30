import React from 'react'
import Button from '../Common/Button/Button'

const CheckEmail = () => {
    return (
        <div className="bg-white w-full m-auto border rounded-lg border-[#F0F0F1] mt-5">
            <div className=' p-4'>
                <h1 className='text-sm font-semibold'>Email Domain Verification</h1>
            </div>
            <hr className='text-[#F0F0F1]' />
            <div className=' p-4'>
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
                    <div className='flex justify-between gap-4 items-center'>
                        <p className="text-xs font-semibold">Verification Record</p>
                        <span className="bg-[#0F9960] text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">Status: Success</span>
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
                                <tr className="">
                                    <td className="px-6 py-4 font-medium text-xs  whitespace-nowrap ">
                                        8c235c67-62fe-4b29-ab76-9be32003f5fe.joinnextmed.com
                                    </td>
                                    <td className="px-6 py-4 font-medium text-xs  whitespace-nowrap ">
                                        8c235c67-62fe-4b29-ab76-9be32003f5fe.joinnextmed.com
                                    </td>
                                    <td className="px-6 py-4 font-medium text-xs  whitespace-nowrap ">
                                        TXT
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-between gap-4 items-center'>
                        <p className="text-xs font-semibold">Verification Record</p>
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
                                <tr className="">
                                    <td className="px-6 py-4 font-medium text-xs  whitespace-nowrap ">
                                        8c235c67-62fe-4b29-ab76-9be32003f5fe.joinnextmed.com
                                    </td>
                                    <td className="px-6 py-4 font-medium text-xs  whitespace-nowrap ">
                                        8c235c67-62fe-4b29-ab76-9be32003f5fe.joinnextmed.com
                                    </td>
                                    <td className="px-6 py-4 font-medium text-xs  whitespace-nowrap ">
                                        TXT
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-between gap-4 items-center'>
                        <p className="text-xs font-semibold">Verification Record</p>
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
                                <tr className="">
                                    <td className="px-6 py-4 font-medium text-xs  whitespace-nowrap ">
                                        8c235c67-62fe-4b29-ab76-9be32003f5fe.joinnextmed.com
                                    </td>
                                    <td className="px-6 py-4 font-medium text-xs  whitespace-nowrap ">
                                        8c235c67-62fe-4b29-ab76-9be32003f5fe.joinnextmed.com
                                    </td>
                                    <td className="px-6 py-4 font-medium text-xs  whitespace-nowrap ">
                                        TXT
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                <Button
                        type={"button"}
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"

                    >
                        Submit
                    </Button>
            </div>
        </div>
    )
}

export default CheckEmail