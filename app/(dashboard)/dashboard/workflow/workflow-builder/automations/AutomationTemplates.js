import { getAutomationTemplateById, getAutomationTemplates } from '@/app/API/pages/Workflow';
import { ArrowRightCircleIcon, ArrowRightIcon, XCircleIcon, ChatBubbleOvalLeftEllipsisIcon, CheckCircleIcon, ClockIcon, LinkIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import AutomationCard from './AutomationCard';

const AutomationTemplates = () => {

  const [allAutomations, setAllAutomations] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let automations = await getAutomationTemplates()
    if (automations?.results.length > 0) {
      setAllAutomations(automations.results)
    }


    // let as2 = await getAutomationTemplateById("b3d7bc72-9d03-4a12-a6cb-38db527deff3")
    // console.log('2', as2)
  }


  return (
    <div className='p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 mx-auto items-center my-2' >

        {allAutomations?.map(item =>
          <AutomationCard item={item}></AutomationCard>
        )}

      </div>
    </div>
  )
}

export default AutomationTemplates