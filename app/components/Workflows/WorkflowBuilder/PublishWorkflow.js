import React from 'react'
import Button from '../../Common/Button/Button'

const PublishWorkflow = ({ publishLoader, saveWorkFlowHandler, name }) => {

    return (
        <div className=''>
            <p><b>{name}</b> will be pushed into production, allowing your Tempo agents to use it immediately. Please click confirm to continue.  </p>
            <div className='flex justify-between gap-2 items-center mt-5'>
                <div></div>

                <Button
                    type={"button"}
                    onClick={(e) => saveWorkFlowHandler("PUBLISH")}
                    className="inline-block font-bold rounded bg-primary px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                >
                    {publishLoader === true ? 'Loading...' : 'Open Workflow'}
                </Button>
            </div>
        </div>
    )
}

export default PublishWorkflow