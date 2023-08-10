'use client'
import React, { useEffect } from 'react'
import Intake from '../Form/Intake'
import Sidebar from '../Dashboard/AuthLayout/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../store/slices/userSlice'
import { fetchRecommendation } from '../store/slices/recommendation'
import { fetchIntegrations } from '../store/slices/integrationSlice'
import { fetchWorkflows } from '../store/slices/workflowSlice'
import { fetchIntegrationsTemplates } from '../store/slices/integrationTemplatesSlice'

const Dashboard = ({ children }) => {
    const dispatch = useDispatch()
    let state = useSelector((state) => state.botId.showModal)
    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchRecommendation());
        dispatch(fetchIntegrations());
        dispatch(fetchWorkflows());
        dispatch(fetchIntegrationsTemplates())

    }, []);
    return (
        <>
            {state ?
                <Intake />
                :
                <Sidebar>
                    {children}
                </Sidebar>
            }
        </>
    )
}

export default Dashboard