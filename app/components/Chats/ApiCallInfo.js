import { InformationCircleIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal/Modal';
import ReactCodeMirror from '@uiw/react-codemirror';

const ApiCallInfo = ({ calls }) => {
    const [showCalls, setShowCalls] = useState(false);
    const [activeCallIndex, setActiveCallIndex] = useState(null);

    useEffect(() => {
        console.log(calls, 'calls');
    }, []);


    const handleCloseDropdowns = () => {
        setShowCalls(!showCalls)
        setActiveCallIndex(null)
    }

    return (
        <>
            <div className='position-relative' style={{ minWidth: '150px' }}>
                <div className='flex justify-end gap-2 my-2 cursor-pointer ' onClick={handleCloseDropdowns}>
                    <small className='bg-gray p-1 rounded-md flex hover:bg-[#8d8d8d] hover:text-white flex items-center'>
                        <InformationCircleIcon className='w-4 h-4'></InformationCircleIcon>
                        {showCalls ? 'Hide ' : 'Show '} API calls {`(${calls.length})`}
                    </small>
                </div>

                {showCalls &&
                    <div className="mt-4 p-3 bg-[#f5f5f5] border-[#ededed] border rounded-md relative shadow shadow-md">
                        {/* <XMarkIcon className="w-5 h-5 absolute top-2 right-2 cursor-pointer" onClick={() => setShowCalls(false)} /> */}

                        {calls.map((call, key) => (
                            <div key={key} style={{ minWidth: '150px' }} className='mb-2'>
                                <div className="cursor-pointer mb-2 flex" onClick={() => setActiveCallIndex(key === activeCallIndex ? null : key)}>
                                    <span style={{ minWidth: '100px' }} className={`text-white text-xs p-1 px-2 border border-gray rounded-md mb-1 ${call.status == 400 || call.status == 404 ? "bg-red" : "bg-success"}`}>
                                        {call.request_method}
                                    </span>
                                    <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </div>
                                {activeCallIndex === key &&
                                    <>
                                        <ul className="list-none space-y-2 text-gray-700" style={{ fontSize: '12px' }}>
                                            <li>
                                                <span className='text-sky'><small style={{ fontSize: '10px' }}>{call.request_url}</small></span>
                                            </li>
                                            <li className="bg-gray-100 rounded mt-2 bg-grey">
                                                <strong className="text-gray-900">Status:{' '}</strong><br />
                                                <code className='text-[#937293]'>{JSON.stringify(call.request_data, null, 2)}</code>
                                            </li>
                                            <li className="bg-gray-100 rounded mt-2 bg-grey">
                                                <strong className="text-gray-900">Status:{' '}</strong>
                                                <span className='text-green'>{call.response_status}</span>
                                                <br></br>
                                                <strong className="text-gray-900">Response:{' '}</strong><br />
                                                <code
                                                    style={{
                                                        color: "#937293",
                                                        whiteSpace: "pre-wrap",
                                                        fontFamily: "'Courier New', Courier, monospace"
                                                    }}
                                                >
                                                    {JSON.stringify(JSON.parse(call.response_text), null, 2)}
                                                </code>
                                            </li>
                                        </ul>
                                    </>
                                }
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default ApiCallInfo;