'use client'
import React from 'react'
import Intake from '../Form/Intake'
import Sidebar from '../Dashboard/AuthLayout/Sidebar'
import { useSelector } from 'react-redux'

const Dashboard = ({ children }) => {
    let state = useSelector((state) => state.botId.showModal)
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