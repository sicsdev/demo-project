
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../Loading/Loading'
import SidebarCards from '../../Workflows/WorkflowBuilder/SidebarCards'

const RightSidebar = ({ children, inputRef, shake, setAutomationStepsData, automationStepsData, handleButtonClick, workflowId, stepIndex, setStepIndex, setIndexSelector, getWorkflowData, mobileCss, setMobileCss,singleData, setRuleModal }) => {
    const state = useSelector(state => state.integration)
    return (
        <>
            {state.isLoading === true ?
                <Loading />
                : <>
                    <nav
                        id="sidenav-7"
                        className={`${shake} transition-all duration-150 ease-in-out overflow-y-scroll w-full sm:w-72 pt-[5rem]  hidden sm:block md:block lg:block fixed right-0 top-0 h-screen  translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:-translate-x-0 dark:bg-zinc-800 p-2 z-10 ${mobileCss ? mobileCss : ''}`}
                        data-te-sidenav-init
                        data-te-sidenav-hidden="false"
                        data-te-sidenav-right="true">
                        <div className={`w-full sm:w-72 pr-4`}>
                            <SidebarCards stepIndex={stepIndex} getWorkflowData={getWorkflowData} setStepIndex={setStepIndex} setIndexSelector={setIndexSelector} inputRef={inputRef} state={state} setAutomationStepsData={setAutomationStepsData} automationStepsData={automationStepsData} handleButtonClick={handleButtonClick} workflowId={workflowId} setMobileCss={setMobileCss} singleData={singleData} setRuleModal={setRuleModal} />
                        </div>
                    </nav>
                    <div className='w-[auto] sm:w-[75%] md:w-[75%] lg:w-[75%]'>
                        {children}
                    </div>
                </>}
        </>
    )
}

export default RightSidebar