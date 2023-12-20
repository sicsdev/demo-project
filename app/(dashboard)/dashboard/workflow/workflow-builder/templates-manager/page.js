'use client'

import { getWorkflowTemplateById, retrieveWorkflowTemplate } from '@/app/API/pages/Workflow'
import Button from '@/app/components/Common/Button/Button'
import { makeCapital } from '@/app/components/helper/capitalName'
import { ChevronLeftIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

  // Helpers
  const params = useSearchParams()
  const router = useRouter()

  // Local States
  const [templateData, setTemplateData] = useState({})
  const [showDropdown, setShowDropdown] = useState(false)

  // Use effects

  useEffect(() => {
    let templateId = params.get('templateId')
    if (templateId) { getTemplateInformation(templateId) }
  }, [])




  // Main functions

  const getTemplateInformation = async (id) => {
    let template_data = await retrieveWorkflowTemplate(id)
    console.log('Template data', template_data?.data)
    if (template_data?.data) setTemplateData(template_data.data)
  }


  return (
    <div>

      {templateData && (
        <>
          <div className='block sm:hidden' >
            <p className='font-bold text-sm'>Open Menu</p>
          </div>
          <div className='flex md:flex lg:flex justify-between gap-2 items-center my-4'>
            <div className='flex justify-start sm:justify-between gap-2 items-center'>
              <button className='cursor-pointer' type='button' onClick={() => { router.back() }}>
                <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
              </button>
              {templateData?.icon ? templateData?.icon :
                <>
                  😊
                  {/* <div className="relative min-w-[35px] w-[35px] sm:w-[35px] h-[35px] gap-2 rounded-lg">
                        <Image
                          fill={"true"}
                          className="bg-contain mx-auto w-full rounded-lg"
                          alt="logo.png"
                          src={'/workflow/reactive-subscription.png'}
                        />
                      </div> */}
                </>
              }
              <div className='cursor-pointer w-auto sm:w-[90%] md:w-[90%] lg:w-[90%]' >
                <h3 className='text-heading font-bold text-sm sm:text-sm1'>{templateData.name === 'Default_name' ? "New Workflow 1" : makeCapital(templateData.name)}</h3>
                {/* <p className='text-border font-normal text-sm'>{templateData.description}</p> */}
              </div>
            </div>
            <div className='flex justify-between gap-2 items-center'>
              <div><small className='text-xs text-border font-semibold'>{templateData?.active ? 'Active' : 'Draft'}</small></div>
              <div>
                <Button
                  type={"button"}
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                >
                  Save
                </Button>
              </div>

              <div className='cursor-pointer relative' onClick={() => setShowDropdown(!showDropdown)}><EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />

                {showDropdown && (
                  <div className="absolute left-[-185px] top-[40px] z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[200px] border border-border rounded-lg shadow w-44 ">
                    <ul className="py-2 text-sm text-gray-700 ">
                      <li className='hover:bg-danger hover:text-white text-danger my-2'>
                        <a className="block px-4 py-2 text-xs ">Delete</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <WorkFlowSelector handleShowAlternatives={handleShowAlternatives} isAuthorizedUser={isAuthorizedUser} openModal={openModal} workflowId={params.get('flow')} stepData={automationStepsData} setAutomationStepsData={setAutomationStepsData} indexSelector={indexSelector} setIndexSelector={setIndexSelector} setAddStepIndex={setAddStepIndex} automationStepsField={automationStepsField} setAutomationStepsField={setAutomationStepsField} getWorkflowData={getWorkflowData} templateData1={templateData} /> */}
        </>)}


    </div>
  )

}

export default page