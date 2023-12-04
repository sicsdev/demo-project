import { patchFaqNegative, rateFaqNegative } from '@/app/API/pages/Knowledge'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react'
import { Tooltip } from 'react-tooltip'

const NegativeItem = ({ element, key, setIsEdit, setSelected, deleteNegativeFaq }) => {

    const [rating, setRating] = useState(element.score)


    const handleRateNegative = async (score) => {
        let payloadScore = score

        if (score === rating) payloadScore = 0.1

        let payload = {
            score: payloadScore,
            search: element.search
        }

        console.log(payloadScore)

        await patchFaqNegative(payload, element.id)
        setRating(payloadScore)
    }


    return (
        <>

            <tr key={key} className="bg-white " >

                <td className="px-6 py-2 whitespace-no-wrap text-sm leading-5 text-xs text-gray-900  border border-gray">
                    {element.search}
                </td>

                <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 border-b border-gray gap-3">
                    <div className='flex justify-center'>

                        <button
                            type="button"
                            className={`${rating === -0.1 && rating !== -1
                                ? "bg-gradiant-red-button text-white"
                                : "text-red border-red"
                                } text-red flex items-center border border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                            onClick={() => handleRateNegative(-0.1)}
                            data-tooltip-id={"tooltip"}
                            data-tooltip-content={`Click to ${rating === -0.1 ? "increase score" : "reduce score"
                                }`}
                        >
                            {rating === -0.1 ? "Reduced" : "Reduce"}
                        </button>
                    </div>
                </td>

                <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 border-b border-gray gap-3">
                    <div className='flex justify-center'>

                        <button
                            type="button"
                            className={`${rating === -1 && rating !== -0.1
                                ? "text-white bg-[#CA0B00] "
                                : "text-[#CA0B00] border-[#CA0B00]"
                                } flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                            onClick={() => handleRateNegative(-1)}
                            data-tooltip-id={"tooltip"}
                            data-tooltip-content={`Click to ${rating === -1 ? "unlock FAQ" : "block FAQ"
                                }`}
                        >
                            {rating === -1 ? "Blocked" : "Block"}
                        </button>
                    </div>
                </td>

                <td className="py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 border border-gray ">
                    <div className='flex justify-center'>
                        <PencilSquareIcon
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => {
                                setIsEdit(true);
                                setSelected((prev) => ({
                                    ...prev,
                                    negative_answer: element.search,
                                    negative_id: element.id,
                                    index: key,
                                }));
                            }}
                        />
                    </div>
                </td>
                <td className=" py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 border border-gray">
                    <div className='flex justify-center'>

                        <TrashIcon
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => deleteNegativeFaq(element.id)}
                        />
                    </div>
                </td>
            </tr>



            {/* <button
        type="button"
        className={`${isHandoff ? "bg-black text-white" : "border-black text-black"} flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
        // onClick={() => handleForceHandOff()}
        data-tooltip-id={'tooltip'}
        data-tooltip-content={isHandoff ? "Click to remove Human Escal" : `Click to force Human Escal`}
        >
        {isHandoff ? "Human Escaled" : "Human Escal"}
        </button> */}

        </>
    )
}

export default NegativeItem