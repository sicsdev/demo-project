
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../Loading/Loading'
import SidebarCards from '../../Workflows/WorkflowBuilder/SidebarCards'

const RightSidebar = ({ addConditionalStepHandler, children, inputRef, shake, setAutomationStepsData, automationStepsData, handleButtonClick, workflowId, stepIndex, setStepIndex, setIndexSelector, getWorkflowData, mobileCss, setMobileCss, singleData, openRulesHandler, setTab, tab, botValue, alignment = 'items-start', handleInputValue, workflowFormData, handleFileChange, saveWorkFlowHandler, publishLoader, setPublishLoader, setShow, onSelectData, setWorkFlowFormData, setSelected, selected, negativeQuestions, addNewNagetiveFaq, isEdit, setIsEdit, setShowAdd, deleteNegativeFaq, showAdd, nLoading }) => {
    const state = useSelector(state => state.integration)

    return (
        <>
            {state.isLoading === true ?
                <Loading />
                : <>
                    <nav
                        id="sidenav-7"
                        className={`${shake} mt-[60px]  z-50 sm:mt-[9px] md:mt-[9px] lg:mt-[9px] transition-all duration-150 ease-in-out overflow-y-scroll w-full sm:w-72 pt-[1rem]  hidden sm:block md:block lg:block fixed right-0 top-0 h-screen  translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:-translate-x-0 dark:bg-zinc-800 p-2  ${mobileCss ? mobileCss : ''}`} style={{ minWidth: '350px' }}

                        data-te-sidenav-init
                        data-te-sidenav-hidden="false"
                        data-te-sidenav-right="true">
                        <div className={`w-full sm:w-72 sm:pr-4 md:pr-4 lg:pr-4`} style={{ minWidth: '350px' }}>
                            <SidebarCards stepIndex={stepIndex} getWorkflowData={getWorkflowData} setStepIndex={setStepIndex} setIndexSelector={setIndexSelector} inputRef={inputRef} state={state} setAutomationStepsData={setAutomationStepsData} automationStepsData={automationStepsData} handleButtonClick={handleButtonClick} workflowId={workflowId} setMobileCss={setMobileCss} singleData={singleData} openRulesHandler={openRulesHandler} addConditionalStepHandler={addConditionalStepHandler} setTab={setTab} tab={tab} botValue={botValue} alignment={alignment} handleInputValue={handleInputValue} workflowFormData={workflowFormData} handleFileChange={handleFileChange} saveWorkFlowHandler={saveWorkFlowHandler} publishLoader={publishLoader} setPublishLoader={setPublishLoader} setShow={setShow} onSelectData={onSelectData} setWorkFlowFormData={setWorkFlowFormData} setSelected={setSelected} selected={selected} negativeQuestions={negativeQuestions} addNewNagetiveFaq={addNewNagetiveFaq} isEdit={isEdit} setIsEdit={setIsEdit} setShowAdd={setShowAdd} deleteNegativeFaq={deleteNegativeFaq} showAdd={showAdd} nLoading={nLoading} />
                        </div>
                    </nav>
                    <div className='rightsidebar_width'>
                        {children}
                    </div>
                </>}
        </>
    )
}

export default RightSidebar