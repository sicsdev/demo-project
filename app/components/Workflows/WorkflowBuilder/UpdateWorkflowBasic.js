import React, { useState } from 'react'
import TextField from '../../Common/Input/TextField'
import FileField from '../../Common/Input/FileField'
import Image from 'next/image'
import Button from '../../Common/Button/Button'
import SelectOption from '../../Common/Input/SelectOption'
import TextArea from '../../Common/Input/TextArea'
import Multiselect from 'multiselect-react-dropdown'

const UpdateWorkflowBasic = ({ handleInputValue, workflowFormData, handleFileChange, publishLoader, saveWorkFlowHandler, setShow, botValue, onSelectData, setWorkFlowFormData }) => {
    const [description, setDescription] = useState(workflowFormData?.description.join('\n') ?? '')
    const DisablingButton = () => {
        const requiredKeys = ["name"];
        return requiredKeys.some(
            (key) => !workflowFormData[key] || workflowFormData[key].trim() === ""
        );
    };
    const handleInputValue1 = (e) => {
        setDescription(e.target.value)
        setWorkFlowFormData((prev) => {
            return {
                ...prev,
                description: e.target.value.split('\n')
            }
        })
    }
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
                <TextArea name='description' placeholder={"What is this workflow for?"} id={"description"} value={description} onChange={handleInputValue1} title={"Description"} />
            </div>

            <div className="my-2">
                <label className={`my-2 new_input_label block text-sm text-heading font-medium`}>
                    <div className='flex items-center gap-2'><span>Bot Selector</span>  </div>
                </label>
                <Multiselect
                    className='searchWrapper-live'
                    options={botValue}
                    selectedValues={workflowFormData?.bots ?? []}
                    onSelect={(selectedList, selectedItem) => {
                        onSelectData(selectedList, selectedItem);
                    }}
                    onRemove={(selectedList, selectedItem) => {
                        onSelectData(selectedList, selectedItem);
                    }}
                    placeholder={botValue.length === workflowFormData?.bots.length ? '' : "Select Bots"}
                    displayValue="name"
                    closeOnSelect={true}
                />
            </div>
            <div
                className={`flex  p-2 rounded-b mt-5 justify-end gap-4`}
            >
                {/* <Button
                    className="inline-block float-left rounded bg-white px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-heading border border-border "
                    onClick={() => { setShow(false) }}
                >
                    Back
                </Button> */}
                <Button
                    type={"button"}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
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