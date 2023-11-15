import React from 'react'
import Button from '../../Common/Button/Button'

const PublishWorkflow = ({ publishLoader, saveWorkFlowHandler, name }) => {

    return (
        <div className=''>
            <p className='text-sm'><b>{name}</b> will be pushed into production, allowing your Deflection AI agents to use it immediately. Please click confirm to continue.  </p>
            <div className='flex justify-between gap-2 items-center mt-5'>
                <div></div>

                <Button
                    type={"button"}
                    onClick={(e) => saveWorkFlowHandler("PUBLISH")}
                    className="inline-block font-semibold rounded bg-primary px-6 pb-2 pt-2 text-xs   leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                >
                    {publishLoader === true ? 'Loading...' : 'Publish Workflow'}
                </Button>
            </div>
        </div>
    )
}

export default PublishWorkflow