import { getAutomationTemplateById, getAutomationTemplates } from '@/app/API/pages/Workflow'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const AlternativesAutomations = ({ showAlternatives }) => {

    const [alternatives, setaAternatives] = useState([])

    useEffect(() => {
        if (showAlternatives?.automation?.id) {
            getAlternatives()
        }
    }, [showAlternatives])

    const getAlternatives = async () => {
        let data = await getAutomationTemplateById(showAlternatives.id)
    }

    return (
        <div className={`w-full  border-b-2 border-border dark:border-gray-700 flex items-center justify-between mt-2 mb-5`}>

            <div className={`w-full sm:w-72 sm:pr-4 md:pr-4 lg:pr-4`} style={{ minWidth: '350px' }}>
                <ul>
                    <button onClick={() => console.log(showAlternatives)}>asdasdasddassad</button>

                </ul>
            </div>
        </div>
    )
}

export default AlternativesAutomations