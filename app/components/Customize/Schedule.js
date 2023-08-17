import { ClipboardDocumentIcon, PlusCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react'
import './schedule.css'
import { useSearchParams } from 'next/navigation'
import Button from '../Common/Button/Button'


const Schedule = ({ basicFormData, setBasicFormData }) => {

    const searchParams = useSearchParams()
    const [custom, setCustom] = useState(true)
    const [errors, setErrors] = useState([])
    const [schedule, setSchedules] = useState(basicFormData)

    const handleHourInputStart = (event) => {
        const { value, id, name } = event.target;
        const updatedSchedule = { ...schedule };
        updatedSchedule[name][id].start = value;
        setSchedules(updatedSchedule);
        setBasicFormData((prev => {
            return {
                ...prev,
                updatedSchedule
            }
        }))
    };

    const handleHourInputEnd = (event) => {
        const { value, id, name } = event.target;
        const updatedSchedule = { ...schedule };
        updatedSchedule[name][id].end = value;
        setSchedules(updatedSchedule);
        setBasicFormData((prev => {
            return {
                ...prev,
                updatedSchedule
            }
        }))
    };

    const handleDeleteHour = (day, index) => {
        const dayArray = [...schedule[day]];
        dayArray.splice(index, 1);
        setSchedules(prevState => ({
            ...prevState,
            [day]: dayArray,
        }));
        setBasicFormData((prev => {
            return {
                ...prev,
                [day]: dayArray,
            }
        }))
    }

    const handleAddHour = (day) => {
        const dayArray = [...schedule[day]];
        dayArray.push({ start: "", end: "" });
        setSchedules(prevState => ({
            ...prevState,
            [day]: dayArray,
        }));
        setBasicFormData((prev => {
            return {
                ...prev,
                [day]: dayArray,
            }
        }))
    }


    const handleCheckbox = (day) => {
        if (schedule[day].length === 0) {
            const dayArray = [...schedule[day]];
            dayArray.push({ start: "00:00", end: "23:59" });
            setSchedules(prevState => ({
                ...prevState,
                [day]: dayArray,
            }));
            setBasicFormData((prev => {
                return {
                    ...prev,
                    [day]: dayArray,
                }
            }))
        } else {
            setSchedules(prevState => ({
                ...prevState,
                [day]: [],
            }));
            setBasicFormData((prev => {
                return {
                    ...prev,
                    [day]: [],
                }
            }))
        }
    }




    return (
        <div className='my-5' >

            {/* <div className='gap-3 flex'>
                <div onClick={() => setCustom(false)} className={`border rounded p-2 inline-block border-gray hover:border-sky cursor-pointer ${!custom && 'border-sky'}`} style={{ borderWidth: '3px' }}>
                    Use an existing schedule
                </div>

                <div onClick={() => setCustom(true)} className={`border rounded p-2 inline-block border-gray hover:border-sky cursor-pointer ${custom && 'border-sky'}`} style={{ borderWidth: '3px' }}>
                    Set custom hours
                </div>
            </div> */}

            {/* EXISTING SCHEDULE OPTION */}
            {!custom &&
                <div className='mt-5 pt-5'>
                    <div>
                        <div className='my-4'>Which schedule do you want to use?</div>
                    </div>

                    <div className='border lg:w-1/2 border-gray p-3'>
                        <small>Current</small>
                        <select className={`custom-select mt-1 block px-3 lg:w-1/2 new_input bg-white border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color" `}>
                            <option>
                                Summer schedule
                            </option>
                            <option>
                                Another one
                            </option>
                            <option>
                                Blabla..
                            </option>
                        </select>
                    </div>

                    <div className='my-3 mx-3 mt-5 pt-5'>
                        <small>Eastern Time - US & Canada</small>
                    </div>

                    <div className='border border-2 rounded border-gray p-3 lg:w-1/2'>
                        <small><b>WEEKLY HOURS</b></small>
                        <div class="grid grid-cols-2 gap-2 py-3">
                            <div className="flex justify-start items-center bg-gray-200 p-2">SUN</div>
                            <div className="flex justify-start items-center bg-gray-100 p-2">Unavailable</div>
                            <div className="flex justify-start items-center bg-gray-200 p-2">MON</div>
                            <div className="flex justify-start items-center bg-gray-100 p-2">9-00am - 5:00pm</div>
                            <div className="flex justify-start items-center bg-gray-200 p-2">TUE</div>
                            <div className="flex justify-start items-center bg-gray-100 p-2">9-00am - 5:00pm</div>
                            <div className="flex justify-start items-center bg-gray-200 p-2">WED</div>
                            <div className="flex justify-start items-center bg-gray-100 p-2">9-00am - 5:00pm</div>
                            <div className="flex justify-start items-center bg-gray-200 p-2">THU</div>
                            <div className="flex justify-start items-center bg-gray-100 p-2">9-00am - 5:00pm</div>
                            <div className="flex justify-start items-center bg-gray-200 p-2">FRI</div>
                            <div className="flex justify-start items-center bg-gray-100 p-2">9-00am - 5:00pm</div>
                            <div className="flex justify-start items-center bg-gray-200 p-2">SAT</div>
                            <div className="flex justify-start items-center bg-gray-100 p-2">9-00am - 5:00pm</div>
                        </div>
                    </div>
                </div>
            }



            {/* CUSTOM SCHEDULE OPTION */}
            {
                custom &&
                <div className='mt-0 sm:mt-5 mx-0 sm:mx-0'>
                    {/* <small>TIME ZONE</small>
                    <div>
                        <select className={`p-1 border-gray text-sky block lg:w-1/4  bg-white rounded-md text-sm p-3 `}>
                            <option>
                                Eastern Time - US & Canada
                            </option>
                            <option>
                                Eastern Time - US & Canada
                            </option>
                            <option>
                                Eastern Time - US & Canada
                            </option>
                        </select>
                    </div> */}


                    <div className='mt-5 border border-3 border-gray rounded p-3 lg:w-1/2 '>
                        <h3 class="text-sm font-semibold my-3">Set your weekly hours</h3>
                        <div>
                            {Object.keys(schedule).map((day) => (
                                <>
                                    <div key={day} className="flex m-2 my-2 items-center justify-around gap-3">

                                        <div className='    w-[50px] flex items-center gap-3 col-span-1'>
                                            <input type="checkbox" className={`w-3 h-3`} checked={schedule[day].length > 0} onClick={() => handleCheckbox(day)} />
                                            <small className='text-xs'>{day.substr(0, 3).toUpperCase()}</small>
                                        </div>

                                        <div className="lg:flex flex items-center gap-3">

                                            <div className='col-span-1'>
                                                {schedule[day].length > 0 ? schedule[day].map((time, index) => (
                                                    <div key={index} className={`grid grid-cols-3 gap-3 ${index !== 0 ? 'pt-2' : ''}`}>
                                                        <div className='relative'>
                                                            <input
                                                                id={index}
                                                                onChange={handleHourInputStart}
                                                                value={schedule[day][index].start}
                                                                type="time"
                                                                name={day}
                                                                className="new_input block border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full relative py-1 hover:border-sky cursor-pointer"
                                                            />
                                                        </div>
                                                        <div className='relative'>
                                                            <input
                                                                id={index}
                                                                onChange={handleHourInputEnd}
                                                                value={schedule[day][index].end}
                                                                type="time"
                                                                name={day}
                                                                className="new_input block border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full relative py-1 hover:border-sky cursor-pointer"
                                                            />
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <TrashIcon className="w-4 cursor-pointer hover:text-red" onClick={() => handleDeleteHour(day, index)} />
                                                        </div>
                                                    </div>
                                                ))
                                                    :
                                                    <div key={'index'} className="grid grid-cols-3 gap-3 cursor-pointer">
                                                        <input
                                                            id={'index'}
                                                            type="time"
                                                            className=" border-gray border-2 rounded-md px-2 py-1 hover:border-sky cursor-pointer"
                                                            disabled
                                                        />
                                                        <input
                                                            id={'idnex'}
                                                            disabled
                                                            type="time"
                                                            className=" border-gray border-2 rounded-md px-2 py-1 hover:border-sky cursor-pointer"
                                                        />
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <PlusIcon className="w-4 cursor-pointer hover:text-sky" onClick={() => handleAddHour(day)} />
                                            {/* <ClipboardDocumentIcon className="w-4" /> */}
                                        </div>

                                    </div>
                                    <hr className="opacity-10" />
                                </>
                            ))}
                        </div>

                        {errors?.map(e =>
                            <div className='text-center my-2'>
                                <small className='text-red'>{e}</small>
                            </div>
                        )}



                    </div>

                </div>
            }




        </div >
    )
}

export default Schedule