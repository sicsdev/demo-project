'use client'
import Customize from '@/app/components/Customize/Customize'
import Schedule from '@/app/components/Customize/Schedule'
import EmailConfig from '@/app/components/EmailConfig/EmailConfig'
import { CalendarDaysIcon, EnvelopeIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'

const Page = () => {
  const [tab, setTab] = useState(0)
  const [basicFormData, setBasicFormData] = useState({})
  return (
    <>
      <div className="border-b border-primary ">
        <div className="flex items-center justify-between">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
            <li className="mr-2" onClick={() => { setTab(0) }}>
              <span
                className={`flex justify-start gap-2 cursor-pointer items-center p-4  ${tab === 0 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                aria-current="page"
              >
                <QrCodeIcon className="h-6 w-6 text-gray-500" /> Customize Bot
              </span>
            </li>
            <li className="mr-2" onClick={() => { setTab(1) }}>
              <span
                className={`flex justify-start gap-2 cursor-pointer items-center p-4  ${tab === 1 && (" border-b-2  text-primary border-primary")}  font-bold rounded-t-lg active  group`}
                aria-current="page"
              >
                <EnvelopeIcon className="h-6 w-6 text-gray-500" /> Email Settings
              </span>
            </li>
            <li className="mr-2" onClick={() => { setTab(2) }}>
              <span
                className={`flex justify-start gap-2 cursor-pointer items-center p-4  ${tab === 2 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                aria-current="page"
              >
                <CalendarDaysIcon className="h-6 w-6 text-gray-500" /> Scheduling
              </span>
            </li>
          </ul>
          <p className="text-sm">
            <Link href="/dashboard">back</Link>
          </p>
        </div>
      </div>
      {tab === 0 && (
        <Customize form={false} />
      )}
      {tab === 1 && (

        <>
          <>
            <div className="mt-4 mb-4">
              <div className="flex items-center justify-between">
                <a
                  className="flex justify-start gap-2 items-center text-primary font-bold border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="customize"
                >
                  <EnvelopeIcon className="h-7 w-7 text-gray-500" /> Email Settings
                </a>

              </div>
            </div>
            <hr className="opacity-10"></hr>
            <div></div>
          </>
          <EmailConfig basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
        </>

      )}
      {tab === 2 && (

        <>
          <>
            <div className="mt-4 mb-4">
              <div className="flex items-center justify-between">
                <a
                  className="flex justify-start gap-2 items-center text-primary font-bold border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="customize"
                >
                  <CalendarDaysIcon className="h-7 w-7 text-gray-500" /> Schedule 
                </a>

              </div>
            </div>
            <hr className="opacity-10"></hr>
            <div></div>
          </>
          <Schedule preferences={basicFormData} />
        </>

      )}

    </>
  )
}

export default Page