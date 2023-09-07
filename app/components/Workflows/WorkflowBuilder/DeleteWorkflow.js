import React from 'react'
import Button from '../../Common/Button/Button'

const DeleteWorkflow = ({ publishLoader, saveWorkFlowHandler, active, deleteWorkFlow }) => {

    return (
        <div className=''>
            <p>Deleting this will be permanent and you will not be able to recover it. {active &&("You can also disable the workflow instead.")}   </p>
            <div className='flex justify-between gap-2 items-center mt-5'>
                {active === true && (
                    <Button
                        type={"button"}
                        onClick={(e) => saveWorkFlowHandler("DISABLE")}
                        className="inline-block font-bold rounded px-8 pb-2 pt-3  uppercase leading-normal  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 
                    text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 text-xs  text-center items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 "
                    >
                        {publishLoader ? "Loading..." : "Disable WorkFlow"}
                    </Button>
                )}
                <Button
                    type={"button"}
                    onClick={(e) => deleteWorkFlow("Delete")}
                    className="inline-block font-bold rounded bg-primary px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                >
                     Delete WorkFlow 

                </Button>
            </div>
        </div>
    )
}

export default DeleteWorkflow