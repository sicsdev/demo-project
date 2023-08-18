import React from 'react'
import TextField from '../../Common/Input/TextField'
import FileField from '../../Common/Input/FileField'
import Image from 'next/image'
import Button from '../../Common/Button/Button'
import SelectOption from '../../Common/Input/SelectOption'

const UpdateWorkflowBasic = ({ handleInputValue, workflowFormData, handleFileChange, publishLoader, saveWorkFlowHandler, setShow, botValue }) => {
    const DisablingButton = () => {
        const requiredKeys = ["description", "name"];
        return requiredKeys.some(
            (key) => !workflowFormData[key] || workflowFormData[key].trim() === ""
        );
    };

    return (
        <div>
            <div className='mt-2'>
                <TextField
                    name='name'
                    onChange={handleInputValue}
                    value={workflowFormData.name}
                    className="py-3 w-full mt-1"
                    title={<div className='flex items-center gap-2'><span>Name</span>  </div>}
                    placeholder={"Something short and descriptive"}
                    type={'text'}
                    id={"name"}
                />
            </div>
            <div className='mt-2 '>
                <label className={`my-2 new_input_label block text-sm text-heading font-medium`}>
                    <div className='flex items-center gap-2'><span>Description</span>  </div>
                </label>
                <textarea rows="5" cols="30" className='border border-border shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]'
                    name='description' placeholder={"What is this workflow for?"} id={"description"} value={workflowFormData.description} onChange={handleInputValue}></textarea>

            </div>
            <div className='my-2'>
                <TextField
                    onChange={handleInputValue}
                    value={workflowFormData.policy_name}
                    name="policy_name"
                    className="py-3 w-full mt-1"
                    title={<span className='flex items-center gap-2'>Policy Name</span>}
                    placeholder={"Policy Name"}
                    type={"text"}
                    id={"policy_name"}
                />
            </div>
            <div className='my-2'>
                <TextField
                    onChange={handleInputValue}
                    value={workflowFormData.policy_description}
                    name="policy_description"
                    className="py-3 w-full mt-1"
                    title={<span className='flex items-center gap-2'>Policy Description</span>}
                    placeholder={"Policy Description"}
                    type={"text"}
                    id={"policy_description"}
                />
            </div>
            <div className='my-2'>
                <TextField
                    onChange={handleInputValue}
                    value={workflowFormData.policy_exceptions}
                    name="policy_exceptions"
                    className="py-3 w-full mt-1"
                    title={<span className='flex items-center gap-2'>Policy Exceptions</span>}
                    placeholder={"Policy Exceptions"}
                    type={"text"}
                    id={"policy_exceptions"}
                />
            </div>
            <div className="my-2">
                <SelectOption
                    onChange={handleInputValue}
                    value={workflowFormData.bots ?? ''}
                    labelClass={`new_input_label`}
                    name="bots"
                    values={botValue}
                    title={<span className='flex items-center gap-2'>Bot Selector</span>}
                    id={"bots"}
                    className="py-3 w-full mt-1"
                    error={""}
                />
            </div>
            <div
                className={`flex  p-2 rounded-b mt-5 justify-end gap-4`}
            >
                <Button
                    className="inline-block float-left rounded bg-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-heading border border-border "
                    onClick={() => { setShow(false) }}
                >
                    Back
                </Button>
                <Button
                    type={"button"}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                    onClick={() => { saveWorkFlowHandler("EDIT") }}
                    disabled={DisablingButton()}
                >
                    {publishLoader === true ? 'Loading...' : 'Save'}
                </Button>
            </div >
        </div>
    )
}

export default UpdateWorkflowBasic