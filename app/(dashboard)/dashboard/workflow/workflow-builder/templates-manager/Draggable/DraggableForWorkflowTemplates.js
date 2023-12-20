import { partialUpdateWorkflowTemplate } from '@/app/API/pages/Workflow';
import Button from '@/app/components/Common/Button/Button';
import { makeCapital } from '@/app/components/helper/capitalName';
import { fetchIntegrations } from '@/app/components/store/slices/integrationSlice';
import { tiles_icons } from '@/app/data/icon_data';
import { ArrowUturnLeftIcon, ClipboardDocumentListIcon, ClipboardIcon, EnvelopeIcon, PlusIcon, PuzzlePieceIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

const DraggableForWorkflowTemplates = ({ templateData }) => {
    const [automations, setAutomations] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (templateData?.automations?.length > 0) { setAutomations(templateData.automations) }
    }, [])


    const onDragEnd = async (result) => {
        if (!result.destination) return;

        // Reorder items.
        const items = Array.from(automations);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Send new order to API and if success, order it in local as well.
        let arrayWithOnlyIds = items.map(automation => automation.automation.id)
        let payload = { automations: arrayWithOnlyIds }
        let reOrderItem = await partialUpdateWorkflowTemplate(templateData.id, payload)
        console.log(reorderedItem)
        setAutomations(items);
    };


    const handleDragStart = () => {
        console.log('start')
    }


    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        ...draggableStyle,
    });


    const getLogo = (name) => {
        const findIcon = tiles_icons?.find((x) => x?.name.toLowerCase() === name?.toLowerCase());
        if (findIcon) { return findIcon.logo; }
        return "";
    };

    const handleDeleteAutomationFromTemplate = async (index) => {
        // Delete automation based in index and extract an array only with IDs to patch.
        let newArray = [...automations];
        if (index > -1) { newArray.splice(index, 1); }
        newArray = newArray.map(automation => automation.automation.id)

        // Patch template using new array.
        let payload = { automations: newArray }
        let patchTemplate = await partialUpdateWorkflowTemplate(templateData.id, payload)
        if (patchTemplate?.data) setAutomations(newArray)
        dispatch(fetchIntegrations())
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={handleDragStart}>
            <Droppable droppableId="droppable" direction={"vertical"}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided?.draggableProps?.style || {}
                        )}
                    >
                        <div className="w-[auto] sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto">

                            {automations?.length === 0 && (
                                <div
                                    className={`mt-4 border-2 border-dashed  bg-[white] ${null === null
                                        ? "border-primary"
                                        : "border-border"
                                        } rounded-lg shadow p-5 cursor-pointer group`}
                                >
                                    <div className="flex justify-between gap-2 items-center">
                                        <div className="flex justify-between gap-4 items-center">
                                            <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                                            <p className="text-sm font-semibold">
                                                Your first step goes here
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <>
                                {automations?.map((ele, key) => (
                                    <Draggable
                                        key={ele.id}
                                        draggableId={ele.id}
                                        index={key}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <>
                                                    <div>
                                                        {/* {key !== 0 && ( */}
                                                        {key !== 0 && (

                                                            <div className="stepper-main-wrapper w-full">
                                                                <div className="stepper-container relative flex items-center justify-center w-full min-h-[24px]">
                                                                    <>
                                                                        <div className="stepper-dots rounded-full absolute z-10 bg-[#d9d9d9] h-[10px] w-[10px] border-2 border-[#d9d9d9]"></div>
                                                                        <button
                                                                            className="stepper-plus-icon rounded-full absolute z-10"
                                                                            aria-label="Add Step"
                                                                            type="button"
                                                                        // onClick={(e) =>
                                                                        //     openModal({
                                                                        //         key: "PLUS",
                                                                        //         open: true,
                                                                        //         addKey: key,
                                                                        //     })
                                                                        // }
                                                                        >
                                                                            <PlusIcon className="h-5 w-5 text-gray-500 font-semibold" />
                                                                        </button>
                                                                        <div className="stpper-lines"></div>
                                                                    </>

                                                                    {/* {mainClass !== ele.id && ( */}
                                                                    <div className="stepper-spacer"></div>
                                                                    {/* )} */}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="border  border-border rounded-lg shadow bg-[#f8f8f8] asdasd">
                                                            <div className="  p-5 group  rounded-lg relative py-6">
                                                                <div className="flex justify-between gap-2 items-center">
                                                                    <div className="flex justify-start gap-4 items-center w-100%]">
                                                                        {ele.automation?.integration?.icon && (
                                                                            <div className="relative w-[25px] h-[25px] gap-2 rounded-lg">
                                                                                <Image
                                                                                    fill={"true"}
                                                                                    className="bg-contain mx-auto object-scale-down w-full rounded-lg"
                                                                                    alt="logo.png"
                                                                                    src={
                                                                                        ele.automation?.integration
                                                                                            ?.icon ||
                                                                                        getLogo(
                                                                                            ele?.automation?.name.split(
                                                                                                " "
                                                                                            )[0]
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        {ele.condition && (
                                                                            <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
                                                                        )}
                                                                        {ele.question && (
                                                                            <ArrowUturnLeftIcon className="h-6 w-6 text-gray-500" />
                                                                        )}
                                                                        {ele?.transformer && (
                                                                            <div className="relative w-[25px] h-[25px] gap-2 rounded-lg">
                                                                                <PuzzlePieceIcon className="h-6 w-6 text-gray-500" />
                                                                            </div>
                                                                        )}
                                                                        {ele?.notification &&
                                                                            ele?.notification?.recipient && (
                                                                                <div className="relative w-[25px] h-[25px] gap-2 rounded-lg">
                                                                                    <EnvelopeIcon className="h-6 w-6 text-gray-500" />
                                                                                </div>
                                                                            )}
                                                                        {ele?.automation && (
                                                                            <p className="text-sm font-semibold capitalize-first-line">
                                                                                {ele?.automation?.name}
                                                                            </p>
                                                                        )}
                                                                        {ele?.condition && (
                                                                            <>
                                                                                <p className="text-sm font-semibold capitalize-first-line">
                                                                                    Rule: {ele?.condition}
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                        {ele?.question && (
                                                                            <>
                                                                                <p className="text-sm font-semibold capitalize-first-line">
                                                                                    {makeCapital(ele?.question)}
                                                                                </p>
                                                                            </>
                                                                        )}

                                                                        {ele?.transformer && (
                                                                            <>
                                                                                <p className="text-sm font-semibold ">
                                                                                    Transformer
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                        {ele?.notification &&
                                                                            ele?.notification?.recipient && (
                                                                                <>
                                                                                    <p className="text-sm font-semibold capitalize-first-line">
                                                                                        {ele.notification.recipient}
                                                                                    </p>
                                                                                </>
                                                                            )}
                                                                    </div>

                                                                    {ele.automation?.have_alternative && (
                                                                        <div
                                                                            // onClick={() => {
                                                                            //     handleShowAlternatives(ele);
                                                                            // }}
                                                                            className="cursor-pointer flex text-xs items-center mr-20 hover:text-primary"
                                                                        >
                                                                            <span className="text-primary mx-2 hover:text-black">
                                                                                Show alternatives
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    <div className="absolute right-5 ">
                                                                        <div className="h-[44px] ">

                                                                            <div
                                                                                className={`rounded-lg group-hover:border border-border  group-hover:shadow] p-[2px]`}
                                                                            >

                                                                                <Button
                                                                                    type={"button"}
                                                                                    onClick={(e) =>
                                                                                        handleDeleteAutomationFromTemplate(key)
                                                                                    }
                                                                                    className="inline-block  cursor-pointer p-2  h-[38px] hover:bg-[#efefef]"
                                                                                >
                                                                                    <TrashIcon className="h-5 w-5 font-semibold cursor-pointer" />
                                                                                </Button>

                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {automations?.length !== 0 && (
                                    <div
                                        className={`mt-4 border-2 border-dashed  bg-[white] rounded-lg shadow p-5 cursor-pointer group`}
                                    // onClick={(e) =>
                                    //     openModal({ key: "STEPS", open: true, addKey: null })
                                    // }
                                    >
                                        <div className="flex justify-between gap-2 items-center">
                                            <div className="flex justify-between gap-4 items-center">
                                                <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                                                <p className="text-sm font-semibold">
                                                    Your next step goes here
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DraggableForWorkflowTemplates