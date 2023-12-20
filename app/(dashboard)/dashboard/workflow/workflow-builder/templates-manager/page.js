'use client'

import { getWorkflowTemplateById, retrieveWorkflowTemplate } from '@/app/API/pages/Workflow'
import Button from '@/app/components/Common/Button/Button'
import { makeCapital } from '@/app/components/helper/capitalName'
import { ChevronLeftIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import WorkflowTemplatesSidebar from './Sidebar/WorkflowTemplatesSidebar'
import DraggableForWorkflowTemplates from './Draggable/DraggableForWorkflowTemplates'
import { useSelector } from 'react-redux'

const page = () => {


  // Test template url:
  // http://localhost:3000/dashboard/workflow/workflow-builder/templates-manager?templateId=e182a862-7e41-4c34-8584-d85bd47de1e5


  // Helpers
  const params = useSearchParams()
  const router = useRouter()
  const integrationsState = useSelector(state => state.integration)

  // Local States
  const [templateData, setTemplateData] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  // Use effects

  useEffect(() => {
    let templateId = params.get('templateId')
    if (templateId) { getTemplateInformation() }
  }, [integrationsState])



  // Main functions

  const getTemplateInformation = async () => {
    let templateId = params.get('templateId')
    let template_data = await retrieveWorkflowTemplate(templateId)
    if (template_data?.data) setTemplateData(template_data.data)
  }

  // const refreshWorkflowTemplate = () => {
  //   getTemplateInformation()
  // }


  return (
    <>
      {templateData && (

        <div className='flex justify-center md:justify-start w-full'>

          <div className='flex flex-col w-3/4'>
            <div>
              <div className='block sm:hidden' >
                <p className='font-bold text-sm'>Open Menu</p>
              </div>
              <div className='flex md:flex lg:flex justify-between gap-2 items-center my-4'>

                <div className='flex justify-start sm:justify-between gap-2 items-center'>
                  <button className='cursor-pointer' type='button' onClick={() => { router.back() }}>
                    <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                  </button>
                  {templateData?.icon ? templateData?.icon : <>😊</>}
                  <div className='cursor-pointer w-auto sm:w-[90%] md:w-[90%] lg:w-[90%]' >
                    <h3 className='text-heading font-bold text-sm sm:text-sm1'>{templateData.name === 'Default_name' ? "New Workflow 1" : makeCapital(templateData.name)}</h3>
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
            </div>


            {/* MAIN CONTENT (DRAGGABLE AND AUTOMATIONS FOR THE TEMPLATE) */}
            <div className='w-full'>
              <DraggableForWorkflowTemplates templateData={templateData} getTemplateInformation={getTemplateInformation}></DraggableForWorkflowTemplates>
            </div>

          </div>


          {/* SIDEBAR  */}
          <div>
            <WorkflowTemplatesSidebar></WorkflowTemplatesSidebar>
          </div>

        </div>
      )}
    </>
  )


}

export default page