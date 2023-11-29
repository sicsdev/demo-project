import { getAllAutomations } from '@/app/API/pages/Integration'
import { getAutomationTemplateById, getAutomationTemplates, updateWorkFlowStatus } from '@/app/API/pages/Workflow'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Tooltip } from 'react-tooltip'

const AlternativesAutomations = ({ showAlternatives, singleData, getWorkflowData }) => {

    const [alternatives, setaAternatives] = useState([])
    const [loadingSwap, setLoadingSwap] = useState(false)

    useEffect(() => {
        if (showAlternatives?.automation?.id) {
            getAlternatives()
        }
    }, [showAlternatives])

    const getAlternatives = async () => {
        let data = await getAutomationTemplateById(showAlternatives.automation.id)
        setaAternatives(data)
    }

    const swapAutomation = async (newId) => {
        // let oldArray = singleData.automations.map(e => (e.automation.id))
        setLoadingSwap(true)
        let oldArray = singleData.automations.map(e => ({
            automation: e.automation.id,
        }))

        let newObject = {
            automation: newId,
            // automation: "3e9b9dd1-7227-4f7e-8b4a-430e502b3db8"
        }

        let newArray = oldArray.map(e => e.automation == showAlternatives.automation.id ? newObject : e)
        await updateWorkFlowStatus({ automations: newArray }, singleData.id);
        await getWorkflowData(singleData.id)
        setLoadingSwap(false)

    }


    return (
        <>

            {/* <div className={`w-full sm:w-72 sm:pr-4 md:pr-4 lg:pr-4`} style={{ minWidth: '350px' }}> */}
            <div>
                <ul>
                    <div className='mb-32'>
                        {alternatives[0]?.automations?.map((ele, key) =>
                            <li className={`my-4 cursor-pointer border border-border rounded-md p-2 bg-[#F8F8F8]`} key={key}>
                                <div className='flex justify-start items-center gap-4'>

                                    {ele?.integration?.icon ?
                                        <div className="relative w-[25px] h-[20px] rounded-lg">
                                            {/* <Image
                                                fill={"true"}
                                                className={`bg-contain object-scale-down mx-auto w-full rounded-lg`}
                                                alt="logo.png"
                                                src={ele?.integration?.icon || getLogo(innerSide?.value.name)}
                                            /> */}
                                        </div> : <Cog8ToothIcon className="h-6 w-6 text-gray-500" />}

                                    <div className='w-[200px]'>
                                        <h3 className='text-xs'>{ele?.name}</h3>
                                        <p className='text-border text-[11px] font-light'>{ele?.description}</p>
                                    </div>
                                    <div onClick={() => swapAutomation(ele.id)} className='flex justify-center'>
                                        <small
                                            data-tooltip-id="swap_information"
                                            data-tooltip-content={`Swap this automation for ${showAlternatives.automation.name}.`}
                                            className='text-black cursor-pointer hover:text-primary bg-gray p-1 px-2 rounded-md flex justify-center'>
                                            {loadingSwap ?
                                                <svg aria-hidden="true" role="status" className="mx-2 w-4 h-4 text-white animate-spin flex justify-center" viewBox="0 0 100 101" fill="black" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                :
                                                'Swap'}

                                            <Tooltip id='swap_information' place="top" type="dark" effect="solid" />
                                        </small>
                                    </div>
                                </div>
                            </li>
                        )}
                    </div>
                </ul>
            </div>
        </>
    )
}

export default AlternativesAutomations