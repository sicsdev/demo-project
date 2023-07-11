import Button from '@/app/components/Common/Button/Button'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { TicketIcon } from '@heroicons/react/24/solid'
import React from 'react'

const UsageLimit = () => {
  return (
    <div>
      <div className="border-b border-primary dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <a href="#" className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group" aria-current="page">
              <TicketIcon className="h-6 w-6 text-gray-500" /> Usage Limit
            </a>
          </li>

        </ul>
      </div>
      <div className='w-[80%] mx-auto my-5'>
        <h3 className="font-bold text-xl md:text-xl lg:text-xl sm:text-xl sm:leading-none my-2 text-heading">Usage Limit</h3>
        <p className='text-sm my-2'>Manage your spending by configuring usage limits. Notification emails triggered by reaching these
          limits will be sent to members of your organization with the Owner role.</p>
        <p className='text-sm'>There may be a delay in enforcing any limits, and you are responsible for any overage incurred. We
          recommend checking your usage tracking dashboard regularly to monitor your spend.</p>
        <h3 className="font-bold text-base md:text-base lg:text-base sm:text-base sm:leading-none mt-2 text-heading">Approved usage limit
        </h3>
        <p className='text-sm my-2'>The maximum usage OpenAlI allows for your organization each month. <a>Request increase</a></p>
        <p className='text-lg'>$120.00 </p>
        <h3 className="font-bold text-base md:text-base lg:text-base sm:text-base sm:leading-none mt-2 text-heading">Current usage
        </h3>
        <p className='text-sm my-2'>Your total usage so far in July (UTC). Note that this may include usage covered by a free trial or other credits,
          so your monthly bill might be less than the value shown here. <a>View usage records</a></p>
        <p className='text-lg'>$1.47</p>
        <h3 className="font-bold text-base md:text-base lg:text-base sm:text-base sm:leading-none mt-2 text-heading">Hard limit
        </h3>
        <p className='text-sm my-2'>The maximum usage OpenAlI allows for your organization each month. <a>Request increase</a></p>
        <p className='text-lg'>$120.00 </p>
        <h3 className="font-bold text-base md:text-base lg:text-base sm:text-base sm:leading-none my-2 text-heading">Soft limit
        </h3>
        <p className='text-sm my-2'>Your total usage so far in July (UTC). Note that this may include usage covered by a free trial or other credits,
          so your monthly bill might be less than the value shown here. <a>View usage records</a></p>
        <p className='text-lg'>$1.47</p>
        <Button
          type={"button"}
          className="inline-block mt-2 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
          // disabled={DisablingButton()}
          // onClick={(e) => SubmitForm()}
        >
          Save
        </Button>
      </div>  
    </div>
  )
}

export default UsageLimit