import React from 'react'
import { useState } from 'react'
import TextField from '../../Common/Input/TextField'
import Button from '../../Common/Button/Button'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import Card from '../../Common/Card/Card'

const ManageCustomerInter = ({ mode }) => {
    const [loading, setLoading] = useState(false)
    const [customerInterFormData, setCustomerInterFormData] = useState({
        customer_text: "",
        interrogatory_type: "",
    })
    const handleInputValues = (e) => {
        setCustomerInterFormData({
            ...customerInterFormData,
            [e.target.name]: e.target.value,
        });
    }
    const DisablingButton = () => {
        const requiredKeys = [
            "customer_text",
            "interrogatory_type"
        ];
        return requiredKeys.some(
            (key) => !customerInterFormData[key] || customerInterFormData[key].trim() === ""
        );

    };
    return (
        <div>
            <form>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={customerInterFormData.customer_text}
                        name="customer_text"
                        className="py-3 mt-2"
                        title={"Customer Name"}
                        placeholder={"Customer Text"}
                        type={"text"}
                        id={"customer_text"}
                    />
                </div>
                <div className='my-2'>
                    <TextField
                        onChange={handleInputValues}
                        value={customerInterFormData.interrogatory_type}
                        name="interrogatory_type"
                        className="py-3 mt-2"
                        title={"Interrogatory Type"}
                        placeholder={"Interrogatory Type"}
                        type={"text"}
                        id={"interrogatory_type"}
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

export default ManageCustomerInter