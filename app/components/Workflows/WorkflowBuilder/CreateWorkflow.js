import React from 'react'
import { useState } from 'react'
import TextField from '../../Common/Input/TextField'
import Button from '../../Common/Button/Button'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Card from '../../Common/Card/Card'
import { createWorkflow } from '@/app/API/pages/Workflow'
import { toast } from 'react-toastify'
import LoaderButton from '../../Common/Button/Loaderbutton'
import { successMessage } from '../../Messages/Messages'

const CreateWorkflow = ({ form, setForm, getAllWorkflowData, setCreateWorkflowModal }) => {
    const [loading, setLoading] = useState(false)
    console.log(form)
    const [formData, setFormData] = useState({
        name: form.name ?? "",
        description: form.description ?? "",
        policy_name: form.policy_name ?? "",
        policy_description: form.policy_description ?? "",
        policy_exceptions: form.policy_exceptions ?? ""
    })
    const handleInputValues = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const DisablingButton = () => {
        const requiredKeys = [
            "name",
            "description",
            "policy_name",
            "policy_description",
            "policy_exceptions", ,
        ];
        return requiredKeys.some(
            (key) => !formData[key] || formData[key].trim() === ""
        );

    };
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const response = await createWorkflow(formData)
        if (response.status === 201) {
            setLoading(false)
            getAllWorkflowData()
            setCreateWorkflowModal(false)
            successMessage("Workflow create successfully")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={formData.name}
                        name="name"
                        className="py-3 mt-2"
                        title={<span className='block text-gray-700 text-sm font-bold'>Name</span>}
                        placeholder={"Name"}
                        type={"text"}
                        id={"name"}
                    />
                </div>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={formData.description}
                        name="description"
                        className="py-3 mt-2"
                        title={<span className='block text-gray-700 text-sm font-bold'>Description</span>}
                        placeholder={"Description"}
                        type={"text"}
                        id={"description"}
                    />
                </div>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={formData.policy_name}
                        name="policy_name"
                        className="py-3 mt-2"
                        title={<span className='block text-gray-700 text-sm font-bold'>Policy Name</span>}
                        placeholder={"Policy Name"}
                        type={"text"}
                        id={"policy_name"}
                    />
                </div>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={formData.policy_description}
                        name="policy_description"
                        className="py-3 mt-2"
                        title={<span className='block text-gray-700 text-sm font-bold'>Policy Description</span>}
                        placeholder={"Policy Description"}
                        type={"text"}
                        id={"policy_description"}
                    />
                </div>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={formData.policy_exceptions}
                        name="policy_exceptions"
                        className="py-3 mt-2"
                        title={<span className='block text-gray-700 text-sm font-bold'>Policy Exceptions</span>}
                        placeholder={"Policy Exceptions"}
                        type={"text"}
                        id={"policy_exceptions"}
                    />
                </div>
                {loading === true ?
                    <LoaderButton /> :
                    <Button
                        type={"submit"}
                        className="my-2 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                        disabled={DisablingButton()}
                    >
                        Save
                    </Button>
                }
            </form>
        </div>
    )
}

export default CreateWorkflow