import { PhoneIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import SelectOption from '../Common/Input/SelectOption'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBot } from '../store/slices/botIdSlice';
import TextField from '../Common/Input/TextField';
import { getEnterprisePhones } from '@/app/API/components/PhoneNumber';

const PhoneHandle = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.botId);
    const [botValue, setBotValue] = useState([]);
    const [basicFormData, setBasicFormData] = useState({})
    const getAllBots = () => {
        const getTitle = state.botData.data.bots.map(
            (element) => element.chat_title
        );
        const widgetCode = state.botData.data.widgets;
        const mergedArray = widgetCode.map((item, index) => {
            const title = getTitle[index];
            return {
                value: item.id,
                name: title,
            };
        });
        setBotValue(mergedArray);
    }
    useEffect(() => {
        if (state.botData.data === null) {
            dispatch(fetchBot());
        }
        if (state.botData.data?.bots && state.botData.data?.widgets) {
            getAllBots();
        }
        EnterprisePhoneNumber()
    }, [state.botData.data]);

    const EnterprisePhoneNumber = async () => {
        const response = await getEnterprisePhones()
        console.log('response', response)
    }
    const handleChange = () => {
        if (basicFormData?.checked === true) {
            setBasicFormData((prev) => {
                return {
                    ...prev,
                    checked: false
                }
            })
        } else {
            setBasicFormData((prev) => {
                return {
                    ...prev,
                    checked: true
                }
            })
        }
    }

    return (
        <div className='container my-8'>
            <div className='border border-border rounded-lg ' >
                <div>
                    <div className='flex rounded-t-lg border border-t-0 border-r-0 border-l-0 p-5 border-border justify-between items-center'>
                        <div className='flex justify-between items-center gap-4'>
                            <div><PhoneIcon className="h-8 w-8" /></div>
                            <div>
                                <h3 className='text-normal font-semibold text-heading'>Phone Menu</h3>
                                <p className='text-sm text-border font-normal'>Configure a custom phone menu callers can navigate</p>
                            </div>
                        </div>
                        <div><span className="bg-border text-white text-sm font-medium mr-2 px-3 py-2 rounded ">Disable</span>
                        </div>
                    </div>
                    <div className='p-5'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h3 className='text-normal font-semibold text-heading'>Enable Phone Menu</h3>
                                <p className='text-sm font-normal text-border'>Enable to set up a phone menu for this number</p>
                            </div>
                            <div>
                                <div className="">
                                    <label className="switch">
                                        <input type="checkbox" name="billingEnabled" onChange={handleChange} checked={basicFormData?.checked} />
                                        <span className="slider round h-[27px] w-[55px]"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <hr className='mt-6 text-border' />
                    </div>
                    <div className='p-5'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h3 className='text-normal font-semibold text-heading'>Greeting message</h3>
                                <p className='text-sm font-normal text-border'>Example: Hi! Thanks for calling. For sales, press 1 or say sales Set a greeting message For support, press 2 or say support</p>
                            </div>
                            <div className="button_">
                                <button
                                    type="button"
                                    className="border-2 border-gray-600 focus:outline-none font-semibold rounded-md text-sm py-2.5  inline-block  bg-white px-6 pb-2 pt-2  leading-normal text-black "
                                >
                                    Set a greeting message
                                </button>
                            </div>
                        </div>
                        <hr className='mt-6 text-border' />
                    </div>
                    <div className='p-5'>
                        <div className='flex justify-between items-center'>
                            <div className=''>
                                <h3 className='text-normal font-semibold text-heading'>Menu Options</h3>
                                <p className='text-sm font-normal text-border'>Options are triggered by keypad and voice commands, and can route to other team members in your workspace, or even to external phone numbers.</p>
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            key
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Voice
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Destination
                                        </th>
                                        <th scope="col" className="px-6 py-3">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="w-full">
                                                <SelectOption
                                                    // onChange={handleInputValues}
                                                    // value={selectedBot}
                                                    name="bot"
                                                    values={botValue}
                                                    title={''}
                                                    id={"bots"}
                                                    className="py-3"
                                                    error={""}
                                                />
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <TextField
                                                // onChange={handleInputValues}
                                                // value={formValues.billing_api_documentation}
                                                name="billing_api_documentation"
                                                className="py-3 mt-1"
                                                title={""}
                                                placeholder={"Command"}
                                                type={"url"}
                                                id={"billing_api_documentation"}
                                            // error={returnErrorMessage("billing_api_documentation")}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <SelectOption
                                                // onChange={handleInputValues}
                                                // value={selectedBot}
                                                name="bot"
                                                values={botValue}
                                                title={''}
                                                id={"bots"}
                                                className="py-3"
                                                error={""}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <TrashIcon className="h-6 w-6 " />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <hr className='mt-6 text-border' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PhoneHandle