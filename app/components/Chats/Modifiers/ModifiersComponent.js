import React, { useEffect, useState } from 'react'
import TextField from '../../Common/Input/TextField'
import { deleteModifier, getAssociatePrompt, patchModifier, postModifier } from '@/app/API/pages/NagetiveFaq'
import TextArea from '../../Common/Input/TextArea'

const ModifiersComponent = ({ message }) => {

    const [promptModifierButtonText, setPromptModifierButtonText] = useState('Save')
    const [promptModifierValue, setPromptModifierValue] = useState('')
    const [modifierMode, setModifierMode] = useState('')
    const [newPromptId, setNewPromptId] = useState("")
    const [associatedPrompts, setAssociatedPrompts] = useState({})

    let previousText = message?.prompts

    useEffect(() => {
        getOneAssociatedPrompt()
    }, [message])


    const getOneAssociatedPrompt = async () => {
        const res = await getAssociatePrompt(`search=${message.content}`)
        if (res.data.results) {
            setAssociatedPrompts(res.data.results)
        }
    }


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

        setPromptModifierButtonText('Saved!')
        setPromptModifierValue('')
        if (res.data) {
            setNewPromptId(res.data.id)
            getOneAssociatedPrompt()
        }

        setTimeout(() => {
            setPromptModifierButtonText('Save')
            setModifierMode('')
        }, 500);
    }


    const handleTabs = (e) => {
        if (e.target.name == 'appender') {
            setModifierMode('appender')
            if (associatedPrompts.length > 0) {
                setPromptModifierValue(associatedPrompts[0]?.text)
            }
        }
        else if (e.target.name == 'modifier') {
            setModifierMode('modifier')
            setPromptModifierValue(associatedPrompts[0]?.text)
        }
        else {
            setModifierMode(e.target.name)
            setPromptModifierValue('')
        }
    }

    const handleDeleteModifier = async (id) => {
        const res = await deleteModifier(id)
        if(res) {
            setPromptModifierValue('')
            setModifierMode('')
            getOneAssociatedPrompt()
        }
    }


    const handleCreateOrEdit = async () => {
        let payloadForPatch = {
            type: modifierMode,
            search: message.content,
            text: promptModifierValue,
        }

        // We post (to create) or patch (to edit) according if there was an active prompt.
        if (associatedPrompts[0]) {
            let patch = await patchModifier(associatedPrompts[0]?.id, payloadForPatch)
            setModifierMode('')
            setPromptModifierValue('')
        } else {
            handlePostModifier()
        }

    }

    return (
        <div style={{ width: '100%' }} className='mr-2 mb-2'>
            <div className='mx-2 flex justify-end mb-3'>
                <div className='flex gap-2'>
                    {/* <button
                        type="button"
                        name="zero-shot"
                        className={`${modifierMode == 'zero-shot' && 'text-white bg-sky'} text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                        onClick={(e) => handleTabs(e)}
                    >
                        Zero-Shot
                    </button> */}
                    <button
                        type="button"
                        name="appender"
                        className={`${modifierMode == 'appender' && 'text-white bg-sky'} text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                        onClick={(e) => handleTabs(e)}
                    >
                        Append

                    </button>

                    <button
                        type="button"
                        name="modifier"
                        className={`${modifierMode == 'modifier' && 'text-white bg-sky'} text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                        onClick={(e) => handleTabs(e)}
                    >
                        Replace

                    </button>
                </div>
            </div>




            {/* ******* MODIFIER TAB ***********/}

            {modifierMode == 'modifier' &&

                <div className=' px-2 relative'>

                    {/* <div className='absolute top-2 right-0 text-sky cursor-pointer' onClick={() => setModifierMode('')}>
                        <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div> */}

                    <div className="my-2">
                        <label>
                            <small className='mx-1 text-black'>Modify Prompt</small>
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

                    <div className='flex justify-between'>
                        {
                            associatedPrompts.length > 0 ? (
                                <button
                                    type='button'
                                    className={`hover:text-white hover:bg-red text-red border-red flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 my-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                                    onClick={() => handleDeleteModifier(associatedPrompts[0]?.id)}
                                >
                                    Delete
                                </button>
                            ) : (
                                <div></div>
                            )
                        }
                        <button
                            type="button"
                            className={`hover:text-white hover:bg-sky text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 my-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                            onClick={handleCreateOrEdit}
                        >
                            {promptModifierButtonText}

                        </button>
                    </div>
                </div >
            }





            {/* ******* APPENDER TAB ***********/}
            {modifierMode == 'appender' &&

                <div className='px-2 relative'>
                    {/* <div className='absolute top-2 right-0 text-sky cursor-pointer' onClick={() => setModifierMode('')}>
                        <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div> */}

                    <div className="my-2">
                        <label>
                            <small className='mx-1 text-black'> Prompt Appender</small>
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

                    <div className='flex justify-between'>
                        {
                            associatedPrompts.length > 0 ? (
                                <button
                                    type='button'
                                    className={`hover:text-white hover:bg-red text-red border-red flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 my-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                                    onClick={() => handleDeleteModifier(associatedPrompts[0]?.id)}
                                >
                                    Delete
                                </button>

                            ) : <div></div>
                        }
                        <button
                            type="button"
                            className={`hover:text-white hover:bg-sky text-sky border-sky flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 my-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                            onClick={handleCreateOrEdit}
                        >
                            {promptModifierButtonText}

                        </button>
                    </div>
                </div >
            }





            {/* ******* ZERO-SHOT TAB ***********/}
            {modifierMode == 'zero-shot' &&

                <div className='px-2 relative'>

                    {/* <div className='absolute top-2 right-0 text-sky cursor-pointer' onClick={() => setModifierMode('')}>
                        <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div> */}

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