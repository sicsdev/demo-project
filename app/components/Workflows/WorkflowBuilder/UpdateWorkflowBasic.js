import React, { useEffect, useState } from 'react'
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
    
    useEffect(() => {
        const textarea = document.querySelector('.resizable-textarea');
        textarea?.setAttribute('rows', '3'); // Set the 'rows' attribute
        const rows = Math.min(
          Math.ceil(textarea?.scrollHeight / 20), // 20 is the approximate line height
          8// Limit to a maximum of 6 rows
        );
    
        textarea?.setAttribute('rows', (rows - 1)?.toString()); // Set the 'rows' attribute with the new value
      }, [description]);
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
                {/* <TextArea name='description' className={'resizable-textarea'} placeholder={"What is this workflow for?"} id={"description"} onChange={handleInputValue1} title={"Description"} rows={'1'}>{description}</TextArea> */}
                <textarea
                      onChange={handleInputValue1}
                      name="description"
                      type="text"
                      id='description'
                      className="resizable-textarea w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                      placeholder="What is this workflow for?"
                      rows={'3'}
                    >
                      {description}
                    </textarea>
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
                className={`flex   rounded-b mt-3 justify-end gap-4`}
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