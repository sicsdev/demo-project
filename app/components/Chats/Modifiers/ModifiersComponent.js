import React, { useState } from 'react'
import TextField from '../../Common/Input/TextField'
import { patchModifier, postModifier } from '@/app/API/pages/NagetiveFaq'
import TextArea from '../../Common/Input/TextArea'

const ModifiersComponent = ({ message }) => {
    console.log("🚀 ~ file: ModifiersComponent.js:7 ~ ModifiersComponent ~ message:", message)

    const [promptModifierButtonText, setPromptModifierButtonText] = useState('Save')
    const [promptModifierValue, setPromptModifierValue] = useState('')
    const [modifierMode, setModifierMode] = useState('appender')
    const [newPromptId, setNewPromptId] = useState("")
    console.log("🚀 ~ file: ModifiersComponent.js:13 ~ ModifiersComponent ~ newPromptId:", newPromptId)

    let previousText = message?.prompts
    console.log("🚀 ~ file: ModifiersComponent.js:13 ~ ModifiersComponent ~ previousText:", previousText)

    // console.log(message.prompts)
    const handlePostModifier = async () => {

        setPromptModifierButtonText('Saving..')

        // Modifier types: zero-shot, modifier, appender
        let payload = {
            type: modifierMode,
            search: message.content,
            text: promptModifierValue,
        }

        const res = await postModifier(payload)
        console.log("🚀 ~ file: ModifiersComponent.js:30 ~ handlePostModifier ~ res:", res)

        setPromptModifierButtonText('Saved!')
        setPromptModifierValue('')
        if(res.data){
            setNewPromptId(res.data.id)
        }

        setTimeout(() => {
            setPromptModifierButtonText('Save')
            setModifierMode('')
        }, 500);
    }


    const handleTabs = (e) => {
        if (modifierMode == e.target.name) {
            setModifierMode('')
        } else {
            setModifierMode(e.target.name)
        }
    }


    const handleCreateOrEdit = async () => {
        let payloadForPatch = {
            type: modifierMode,
            search: message.content,
            text: promptModifierValue,
        }
        console.log("🚀 ~ file: ModifiersComponent.js:54 ~ handleCreateOrEdit ~ payloadForPatch:", payloadForPatch)

        // We post (to create) or patch (to edit) according if there was an active prompt.
        if (previousText) {
            let patch = await patchModifier(newPromptId,payloadForPatch)
            console.log(patch, 'patch')
        } else {
            handlePostModifier()
        }

    }

    return (
        <div style={{ width: '100%' }} className='mr-2 mb-2'>


            <div className='mx-2 flex justify-between mb-3 mt-2'>
                <div className='flex gap-2'>
                    <button
                        type="button"
                        name="zero-shot"
                        className={`${modifierMode == 'zero-shot' && 'text-white bg-sky'} text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                        onClick={(e) => handleTabs(e)}
                    >
                        Zero-Shot

                    </button>
                    <button
                        type="button"
                        name="appender"
                        className={`${modifierMode == 'appender' && 'text-white bg-sky'} text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none mr-4`}
                        onClick={(e) => handleTabs(e)}
                    >
                        Append

                    </button>
                </div>

                <button
                    type="button"
                    name="modifier"
                    className={`${modifierMode == 'modifier' && 'text-white bg-sky'} text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                    onClick={(e) => handleTabs(e)}
                >
                    Replace

                </button>
            </div>




            {/* ******* MODIFIER TAB ***********/}

            {modifierMode == 'modifier' &&

                <div className='rounded border border-gray shadow-md my-4 px-2 py-2 relative mr-5'>

                    <div className='absolute top-2 right-0 text-sky cursor-pointer' onClick={() => setModifierMode('')}>
                        <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>

                    <div className="my-2">
                        <label>
                            <small className='mx-1'>Modify Prompt</small>
                        </label>
                        <TextArea
                            value={promptModifierValue}
                            name="modifier"
                            className="w-full mt-1 px-0"
                            placeholder={"Enter modifications to adjust or refine the prompt"}
                            type={"text"}
                            id={"modifier"}
                            onChange={(e) => { setPromptModifierValue(e.target.value) }}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type="button"
                            className={`hover:text-white hover:bg-sky text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                            onClick={handleCreateOrEdit}
                        >
                            {promptModifierButtonText}

                        </button>
                    </div>
                </div >
            }





            {/* ******* APPENDER TAB ***********/}
            {modifierMode == 'appender' &&

                <div className='rounded border border-gray shadow-md my-4 px-2 py-2 relative mr-5'>

                    <div className='absolute top-2 right-0 text-sky cursor-pointer' onClick={() => setModifierMode('')}>
                        <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>

                    <div className="my-2">
                        <label>
                            <small className='mx-1'> Prompt Appender</small>
                        </label>
                        <TextArea
                            value={promptModifierValue}
                            name="appender"
                            className="w-full mt-1 px-0"
                            placeholder={"Enter additional details or context to enhance the original prompt"}
                            type={"text"}
                            id={"appender"}
                            onChange={(e) => { setPromptModifierValue(e.target.value) }}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type="button"
                            className={`hover:text-white hover:bg-sky text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 my-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                            onClick={handlePostModifier}
                        >
                            {promptModifierButtonText}

                        </button>
                    </div>
                </div >
            }





            {/* ******* ZERO-SHOT TAB ***********/}
            {modifierMode == 'zero-shot' &&

                <div className='rounded border border-gray shadow-md my-4 px-2 py-2 relative mr-5'>

                    <div className='absolute top-2 right-0 text-sky cursor-pointer' onClick={() => setModifierMode('')}>
                        <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>

                    <div className="my-2">
                        <label>
                            <small className='mx-1'>Zero-Shot Prompt Instructions</small>
                        </label>
                        <TextArea
                            value={promptModifierValue}
                            name="zero-shot"
                            className="w-full mt-1 px-0"
                            placeholder={"Describe your zero-shot instructions here"}
                            type={"text"}
                            id={"zero-shot"}
                            onChange={(e) => { setPromptModifierValue(e.target.value); console.log(e.target.value) }}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type="button"
                            className={`hover:text-white hover:bg-sky text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 my-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                            onClick={handlePostModifier}
                        >
                            {promptModifierButtonText}

                        </button>
                    </div>
                </div >
            }


        </div>
    )
}

export default ModifiersComponent