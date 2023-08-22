'use client'
import { EllipsisHorizontalIcon, InformationCircleIcon, KeyIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Keys = () => {
  return (
    <div>
      <div className="border-b border-primary dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <span
              className=" flex justify-start gap-2 items-center cursor-pointer p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
              aria-current="page"
            >
              <KeyIcon className="h-6 w-6 text-gray-500" /> Api keys
            </span>
          </li>
        </ul>
      </div>
      <div className='my-4'>
        <div className='border border-border_color shadow-sm rounded-md'>
          <div className='p-4 flex items-center justify-between'>
            <p className='font-bold text-lg'>API keys</p>
            <p className='text-sm text-primary cursor-pointer hover:text-black'>Learn more about API authentication</p>
          </div>
          <hr className='bg-border_color text-border_color' />
          <div className='p-4 flex items-center justify-between'>
            <p className='font-base text-sm justify-start gap-2 items-center flex'><InformationCircleIcon className="h-4 w-4 text-heading" />Viewing live API keys. Toggle to view test keys.</p>
            <div>
              <div className='flex  items-center gap-2 col-span-4'>
                <div>
                  <label className="switch" style={{ height: "unset" }}>
                    <input type="checkbox" name="snippet_active" />
                    <span className="slider round h-[27px] w-[55px]"></span>
                  </label>
                </div>
                <p className='text-sm'>View test data</p>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 border border-border_color shadow-sm rounded-md'>
          <div className='p-4 flex items-center justify-between'>
            <div className=''>
              <p className='font-bold text-lg'>Standard keys</p>
              <p className='text-xs'>These keys will allow you to authenticate API requests. Learn more</p>
            </div>
            <button type="button" className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]">+ Create secret key</button>
          </div>
          <hr className='bg-border_color text-border_color' />
          <div className=''>

            <div className="relative overflow-x-auto p-4">
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
                      <div className='m-3 '><p> Publishable key</p></div>
                    </th>
                    <td className=" min-w-[20px] max-w-[200px] break-words text-fade_text align-top">
                      <div className='m-3'> <p className=' text-xs cursor-pointer'>
                        pk_live_51NC19PGMZM61eRRVvISsMDPYlNNQ1ECea5AaVo45iVcKZktpAOV5ZLNFWWl65qVfso2fPV3q9OLsAED2iCOMCqrd00zXHzuE1z</p></div>
                    </td>
                    <td className=" align-top">
                      <div className='m-3'> <p> Aug 20</p></div>
                    </td>
                    <td className=" text-fade_text align-top">
                      <div className='m-3'> <p>May 26</p></div>
                    </td>
                  </tr>
                  <tr className="">
                    <th scope="row" className="font-medium text-heading whitespace-nowrap align-top">
                      <div className='m-3 '><p> Secret key
                      </p></div>
                    </th>
                    <td className=" min-w-[20px] max-w-[200px] break-words text-fade_text align-top">
                      <div className='m-3'> <p className=' text-xs cursor-pointer'>

                        sk_live_...Ikdj</p></div>
                    </td>
                    <td className=" align-top">
                      <div className='m-3'> <p> Aug 20</p></div>
                    </td>
                    <td className=" text-fade_text align-top">
                      <div className='m-3'> <p>May 26</p></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
        <div className='mt-4 border border-border_color shadow-sm rounded-md'>
          <div className='p-4 flex items-center justify-between'>
            <div className=''>
              <p className='font-bold text-lg'>Restricted keys</p>
              <p className='text-xs'>For greater security, you can create restricted API keys that limit access and permissions for different areas of your account data. Learn more</p>
            </div>
            <button type="button" className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]">+ Create restricted key</button>
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
                        </p> <span className=" bg-[#CFF5F6] text-xs font-medium mr-2 px-2.5 py-0.5 rounded text-primary">Connect</span><InformationCircleIcon className="h-4 w-4 text-heading" /></div>
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
                        </p> <span className=" bg-[#CFF5F6] text-xs font-medium mr-2 px-2.5 py-0.5 rounded text-primary">Connect</span><InformationCircleIcon className="h-4 w-4 text-heading" /></div>
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
      </div>
    </div>
  )
}
export default Keys   