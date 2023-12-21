import { getWorkflowTemplates, listWorkflowTemplates } from '@/app/API/pages/Workflow'
import WorkflowCard from '@/app/components/Workflows/WorkflowBuilder/WorkflowCard'
import React, { useEffect, useState } from 'react'
import GlobalTemplateCard from './GlobalTemplateCard'

const GlobalTemplates = () => {

    const [allGlobalTemplates, setAllGlobalTemplates] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllGlobalTemplates()
    }, [])

    const getAllGlobalTemplates = async () => {
        let allGlobal = await listWorkflowTemplates()
        if (allGlobal?.data) {
            setAllGlobalTemplates(allGlobal.data)
            console.log(allGlobal.data)
        }
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mx-auto items-center my-2' >
            {allGlobalTemplates?.map((item, key) =>
                <GlobalTemplateCard key={key} item={item} loading={loading}></GlobalTemplateCard>
            )}
        </div>
    )
}

export default GlobalTemplates


// {data?.map((item, key) =>

//     <>
//         <WorkflowCard data={data} loading={loading} item={item} key={key} manageData={manageData} isAuthorizedUser={isAuthorizedUser} setShowActive={setShowActive} setTab={setTab}></WorkflowCard>
//     </>
// )}