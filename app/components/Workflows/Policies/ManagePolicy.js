import React from 'react'
import { useState } from 'react'
import TextField from '../../Common/Input/TextField'
import Button from '../../Common/Button/Button'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import Card from '../../Common/Card/Card'

const ManagePolicy = ({ mode }) => {
    const [loading, setLoading] = useState(false)
    const [policyFormData, setPolicyFormData] = useState({
        policy_name: "",
        policy_text: "",
        policy_exceptions: ""
    })
    const handleInputValues = (e) => {
        setPolicyFormData({
            ...policyFormData,
            [e.target.name]: e.target.value,
        });
    }
    const DisablingButton = () => {
        const requiredKeys = [
            "policy_name",
            "policy_text",
            "policy_exceptions", ,
        ];
        return requiredKeys.some(
            (key) => !policyFormData[key] || policyFormData[key].trim() === ""
        );

    };
    return (
        <div>
            <form>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={policyFormData.policy_name}
                        name="policy_name"
                        className="py-3 mt-2"
                        title={"Policy Name"}
                        placeholder={"Policy Name"}
                        type={"text"}
                        id={"policy_name"}
                    />
                </div>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={policyFormData.policy_text}
                        name="policy_text"
                        className="py-3 mt-2"
                        title={<div className='flex items-center gap-2'><span>Policy Text</span>  <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>The actual text of your policy. For example, if this is a refund policy, you’d just paste the official policy text here.</span></Card></div></div>}
                        placeholder={"Policy Text"}
                        type={"text"}
                        id={"policy_text"}
                    />
                </div>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={policyFormData.policy_exceptions}
                        name="policy_exceptions"
                        className="py-3 mt-2"
                        title={<div className='flex items-center gap-2'><span>Policy Exceptions</span>  <div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>Any exception to your official policy. Without these the bot will follow your policy very strictly. For example, an exception to a refund policy would be to refund customers who threaten disputes or lawsuits.</span></Card></div></div>}
                        placeholder={"Policy Exceptions"}
                        type={"text"}
                        id={"policy_exceptions"}
                    />
                </div>
                <Button
                    type={"submit"}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                    disabled={DisablingButton()}
                >
                    {mode === 'update' ? 'Update' : 'Save'}
                </Button>
            </form>
        </div>
    )
}

export default ManagePolicy