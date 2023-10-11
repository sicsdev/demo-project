import { InformationCircleIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react'
import Modal from '../Common/Modal/Modal'
import { useEffect } from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'

const ApiCallInfo = ({ calls }) => {

    const [showCalls, setShowCalls] = useState(false)
    useEffect(() => {
        console.log(calls, 'calls')


    }, [])

    return (
        <>
            <div className='position-relative'>

                <div className='flex justify-end gap-2 my-2 cursor-pointer ' onClick={() => setShowCalls(!showCalls)}>
                    <small className='bg-gray p-1 rounded-md flex hover:bg-[#8d8d8d] hover:text-white'>
                        <InformationCircleIcon className='w-4 h-4'></InformationCircleIcon>
                        {showCalls ? 'Hide ' : 'Show '} API calls
                    </small>

                </div>

                {showCalls &&
                    <div className="mt-4 p-3 bg-[#f5f5f5] border-[#ededed] border rounded-md relative shadow shadow-md">
                        <XMarkIcon className="w-5 h-5 absolute top-2 right-2 cursor-pointer" onClick={() => setShowCalls(false)} />

                        <ul className="list-none space-y-2 text-gray-700" style={{ fontSize: '12px' }}>
                            <li>
                                <span className='text-sky'><small style={{ fontSize: '10px' }}>{calls[0].request_url}</small></span>
                            </li>
                            <li>
                                <strong className="text-gray-900">Method:{' '}</strong>
                                <span className='text-green'>{calls[0].request_method}</span>
                            </li>
                            <br />
                            <li className="bg-gray-100 rounded mt-2 bg-grey">
                                <span>- Request Data:</span><br />
                                <code className='text-[#937293]'>{JSON.stringify(calls[0].request_data, null, 2)}</code>
                            </li>
                        </ul>
                    </div>
                }

            </div>
        </>
    )
}

export default ApiCallInfo