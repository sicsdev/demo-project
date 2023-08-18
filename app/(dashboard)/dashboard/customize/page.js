'use client'
import { getAllBotData, modifyBot } from '@/app/API/pages/Bot'
import Button from '@/app/components/Common/Button/Button'
import LoaderButton from '@/app/components/Common/Button/Loaderbutton'
import Customize from '@/app/components/Customize/Customize'
import Schedule from '@/app/components/Customize/Schedule'
import EmailConfig from '@/app/components/EmailConfig/EmailConfig'
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'
import { fetchBot } from '@/app/components/store/slices/botIdSlice'
import { CalendarDaysIcon, EnvelopeIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const Page = () => {
  const dispatch = useDispatch()
  const [tab, setTab] = useState(0)
  const [basicFormData, setBasicFormData] = useState({})
  const [scheduleData, setScheduleData] = useState({
    Monday: [{ start: "00:00", end: "23:59" }],
    Tuesday: [{ start: "00:00", end: "23:59" }],
    Wednesday: [{ start: "00:00", end: "23:59" }],
    Thursday: [{ start: "00:00", end: "23:59" }],
    Friday: [{ start: "00:00", end: "23:59" }],
    Saturday: [{ start: "00:00", end: "23:59" }],
    Sunday: [{ start: "00:00", end: "23:59" }]
  })
  const [botId, setBot_id] = useState(null)
  const [loading, setLoading] = useState(null)
  const searchParams = useSearchParams();
  const router = useRouter();

  const savePreferences = () => {
    setLoading(true);
    let payload = {}
    if (tab === 0) {
      payload = {
        ...basicFormData,
        logo: basicFormData.logo_file_name ? basicFormData.logo : "",
      };
      delete payload.payment_platform
      delete payload.ticketing_platform
    } else if (tab === 1) {
      payload = {
        email_agent_name: basicFormData.agent_name,
        email_agent_title: basicFormData.agent_title,
        email_greeting: basicFormData.email_introduction,
        email_farewell: basicFormData.email_signOff,
      }
    } else if (tab === 2) {
      payload = { schedule: scheduleData }
    }
    !payload.logo && delete payload.logo;
    !payload.email && delete payload.email;
    modifyBot(botId, payload)
      .then((res) => {
        if (res?.status === 200 || res?.status === 201) {
          setLoading(false);
          dispatch(fetchBot());
          successMessage("Changes successfully saved!")
        } else {
          setLoading(false);
          errorMessage("Unable to update!");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        errorMessage("Unable to update!");
      });
  };


  const getBotInfo = (id) => {
    getAllBotData([id]).then((res) => {
      let bot_res = res[0].data
      // console.log("bot_res", bot_res)
      let payload = {
        // email: bot_res.email,
        agent_name: bot_res.email_agent_name,
        agent_title: bot_res.email_agent_title,
        email_introduction: bot_res.email_greeting.replace(/\\/g, '').replace(/"/g, '') || "",
        email_signOff: bot_res.email_farewell.replace(/\\/g, '').replace(/"/g, '') || "",
        customer_service_email: bot_res?.customer_service_email
      }
      let data = res[0].data;
      setBasicFormData((prev) => {
        return {
          ...prev,
          ...data,
          ...payload
        };
      });
      let schedule = res[0].data?.schedule
      schedule ? delete schedule.updatedSchedule : scheduleData
      setScheduleData(schedule)
    });
  };
  const DisablingButton = () => {
    switch (tab) {
      case 1:
        const requiredKeys = [
          'agent_title',
          'email_introduction',
          'email_signOff']
        const str_values = requiredKeys.some(key => !basicFormData[key] || basicFormData[key].trim() === '');
        const arr_values = ['agent_name'].every(key => !basicFormData[key] || basicFormData[key].length === 0);
        if (str_values || arr_values) {
          return true
        }
        break;

      default:
        break;
    }


    return false

  }


  useEffect(() => {
    const bot_id = searchParams.get("id");
    setBot_id(bot_id);
    if (bot_id) {
      getBotInfo(bot_id);
    } else {
      router.push("/dashboard")
    }
  }, [])

  const SubmitForm = () => {
    switch (tab) {
      case 0:
        savePreferences()
        break;
      case 1:
        savePreferences()
        break;
      case 2:
        savePreferences()
        break;
      default:
        break;
    }
  }
  return (
    <>
      <div className="border-b border-primary ">
        <div className="flex items-center justify-between gap-4 sm:gap-0">
          <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
            <li className="mr-2" onClick={() => { setTab(0) }}>
              <span
                className={`flex justify-start text-xs sm:text-sm gap-2 cursor-pointer items-center p-2 sm:p-4  ${tab === 0 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                aria-current="page"
              >
                <QrCodeIcon className="h-6 w-6 text-gray-500" /> Customize Bot
              </span>
            </li>
            <li className="mr-2" onClick={() => { setTab(1) }}>
              <span
                className={`flex justify-start gap-2 text-xs sm:text-sm cursor-pointer items-center p-2 sm:p-4   ${tab === 1 && (" border-b-2  text-primary border-primary")}  font-bold rounded-t-lg active  group`}
                aria-current="page"
              >
                <EnvelopeIcon className="h-6 w-6 text-gray-500" /> Email Settings
              </span>
            </li>
            <li className="mr-2" onClick={() => { setTab(2) }}>
              <span
                className={`flex justify-start gap-2 text-xs sm:text-sm cursor-pointer items-center p-2 sm:p-4   ${tab === 2 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
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
        <Customize form={false} basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
      )}
      {tab === 1 && (

        <>
          <>
          </>
          <EmailConfig basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
        </>

      )}
      {tab === 2 && (

        <>
          <Schedule basicFormData={scheduleData} setBasicFormData={setScheduleData} />
        </>

      )}
      {loading ? (
        <LoaderButton />
      ) : (
        <>
          <Button
            type={"button"}
            className="inline-block rounded bg-primary mt-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
            disabled={DisablingButton()}
            onClick={(e) => SubmitForm()}
          >
            Save
          </Button>
        </>
      )}
      <ToastContainer />
    </>
  )
}

export default Page