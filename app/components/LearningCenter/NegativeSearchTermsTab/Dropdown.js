import React from 'react';
import { EllipsisHorizontalIcon, EllipsisVerticalIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { patchWorkflowNegative, rateWorkflowNegative } from '@/app/API/pages/Workflow';
import { patchFaqNegative, rateFaqNegative } from '@/app/API/pages/Knowledge';

const Dropdown = ({ handleEdit, element, type, getAllNegativesWorkflows, getAllNegativesFAQ }) => {

    const divRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false)
    const [rating, setRating] = useState('')

    useEffect(() => {
        document.body.addEventListener('click', handleClickOutside);
        setRating(element.score)
        return () => { document.body.removeEventListener('click', handleClickOutside); };
    }, []);

    function handleClickOutside(event) {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    }

    const toggleDropdown = () => {
        setShowDropdown(!isDropdownOpen);
    };


    
    const handleRateNegative = (newScore) => {
        let score = newScore

        if (newScore === rating) { score = 0.1 }
        if (type == 'faq') handleRateNegative_FAQ(score)
        if (type == 'workflow') handleRateNegative_WORKFLOW(score)
    }



    const handleRateNegative_WORKFLOW = async (score) => {
        let payload = {
            score: score,
            search: element.search,
        }

        await patchWorkflowNegative(payload, element.id)
        getAllNegativesWorkflows()
        setRating(score)
    }



    const handleRateNegative_FAQ = async (score) => {

        let payload = {
            score: score,
            search: element.search,
        }

        await patchFaqNegative(payload, element.id)
        getAllNegativesFAQ()
        setRating(score)
    }

    return (
        <div className='cursor-pointer relative' ref={divRef} >
            <PencilIcon className="h-4 w-4 font-bold text-heading cursor-pointer pencil-icon" onClick={() => setShowDropdown(!showDropdown)}></PencilIcon>
            {/* <EllipsisHorizontalIcon className="h-6 w-6 font-bold text-heading cursor-pointer" /> */}
            {showDropdown &&
                <div className={`absolute z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[130px] border border-border rounded-lg shadow w-auto`}>
                    <ul className="py-2 text-xs text-gray-700">
                        <li className={`hover:bg-primary  hover:text-white text-heading my-1`}>
                            <button type='button' className="block px-4 py-2" onClick={() => handleRateNegative(-0.1)}>{rating == -0.1 ? "Remove reduce" : "Reduce"}</button>
                        </li>
                        <li className={`hover:bg-red  hover:text-white text-heading my-1`}>
                            <button type='button' className="block px-4 py-2" onClick={() => handleRateNegative(-1)}>{rating == -1 ? "Unlock" : "Block"}</button>
                        </li>
                        <li className={`hover:bg-gray hover:text-white text-heading my-1`}>
                            <button type='button' onClick={() => handleEdit()} className="block px-4 py-2">Edit</button>
                        </li>
                    </ul>
                </div>
            }
        </div>
    );
}

export default Dropdown;
