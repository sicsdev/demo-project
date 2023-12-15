import { deleteNagetiveQuestionData } from '@/app/API/pages/NagetiveFaq';
import { addNagetiveWorkflowBulkCreate, addNagetiveWorkflowData, deleteNagetiveWorkflowData, editNagetiveWorkflowData, getSingleNagetiveWorkflowData } from '@/app/API/pages/NagetiveWorkflow';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react'
import { useState } from 'react';
import TextArea from '../../../Common/Input/TextArea';
import DataTable from 'react-data-table-component';
import Dropdown from '@/app/components/LearningCenter/NegativeSearchTermsTab/Dropdown';

const NegativeSearchTermsTab_Workflows = ({ negativeQuestions, setNagetiveQuestions, nLoading = false, singleData }) => {

    const [itemsSelected, setItemsSelected] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [textAreaValue, setTextAreaValue] = useState('')
    const [editingId, setEditingId] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingRemove, setLoadingRemove] = useState([])
    const [negativesData, setNegativesData] = useState([])

    useEffect(() => {
        getAllNegatives()
    }, [])

    const columns = [
        {
            name: (itemsSelected.length > 0 ?
                <MinusIcon title='Unselect all' className='w-4 h-4 border rounded-sm bg-primary text-white border-white cursor-pointer' onClick={() => setItemsSelected([])} />
                :
                <PlusIcon title='Select all' className='w-4 h-4 border rounded-sm bg-primary text-white border-white cursor-pointer' onClick={() => handleSelectAll([])} />
            ),
            selector: (row) => row,
            cell: (row) => (
                <div className='flex items-center'>
                    <input type='checkbox' checked={itemsSelected.includes(row.id)} onClick={() => handleCheckbox(row.id)}></input>
                </div>
            ),
            sortable: false,
            reorder: true,
            width: "50px",
            header: <button className='bg-primary'>Botón en Encabezado</button>,
        },

        {
            name: "Negative keyword",
            selector: (row) => row,
            cell: (row) => (
                <div className='keyword_container_workflow flex gap-3 w-full relative'>
                    {row.search}
                    <Dropdown getAllNegativesWorkflows={getAllNegatives} type={'workflow'} element={row} handleEdit={() => handleEdit(row)}></Dropdown>
                </div>
            ),
            sortable: true,
            reorder: true,
        },

        {
            name: "Status",
            selector: (row) => row.score === -0.1 ? 'Reduced' : row.score === -1 ? 'Blocked' : 'Deprecated',
            sortable: true,
            reorder: true,
        },
    ];


    const customStyles = {
        rows: { style: { width: "100%" } },
        columns: { style: { width: "100%" } },
        table: {
            style: {
                minHeight: '300px', // Ajusta el valor según tu preferencia
            }
        }
    };

    const handleEdit = (row) => {
        setIsEdit(true)
        setEditingId(row.id)
        setTextAreaValue(row.search)
    }

    const getAllNegatives = async () => {
        const response = await getSingleNagetiveWorkflowData(singleData?.id)
        setNagetiveQuestions(response?.data)
        setNegativesData(response?.data)
    }

    const deleteNegativeKeywords = async (id) => {
        setLoadingRemove(true);

        let newArray = [...negativeQuestions];

        for (const item of itemsSelected) {
            try {
                await deleteNagetiveWorkflowData(item);
                newArray = newArray.filter(e => e.id !== item);
            } catch (error) {
                console.error("Error al eliminar el dato negativo:", error);
            }
        }

        setNagetiveQuestions(newArray);
        setItemsSelected([]);

        setLoadingRemove(false);
    };


    const handleCheckbox = (id) => {
        let finder = itemsSelected.find(e => e == id)
        if (finder) {
            let newArray = itemsSelected.filter(e => e !== id)
            setItemsSelected(newArray)
        } else {
            setItemsSelected([...itemsSelected, id])
        }
    }


    const handleSelectAll = () => {

        let items = []

        negativeQuestions.forEach(e => {
            items.push(e.id)
        })

        setItemsSelected(items)
    }

    const addNewNagetiveFaq = async () => {
        setLoading(true)

        // Filter values and delete falsy elements, like empty lines.
        let values = textAreaValue.split('\n').filter(Boolean);

        if (isEdit === false) {

            let payload = {
                search: values,
                workflow: singleData.id,
                score: 0.1
            }

            await addNagetiveWorkflowBulkCreate(payload)

            getAllNegatives()
            setTextAreaValue('')

        } else {

            await editNagetiveWorkflowData({ search: textAreaValue }, editingId)
            getAllNegatives()
            setTextAreaValue('')

            // setNLoading(false)
        }

        setLoading(false)

    }


    const handleTextAreaInput = (e) => {
        setTextAreaValue(e.target.value)
    }


    const handleCancel = () => {
        setTextAreaValue('')
        setIsEdit(false)
    }

    return (
        <div className='flex md:flex lg:flex justify-between gap-2 items-center my-4' >
            <div className="bg-white  border w-full  rounded-lg border-[#F0F0F1] mx-auto p-4">
                {/* <span className="text-[12px] text-[#555555b5]  block  text-heading font-[600]">Description</span> */}

                <>

                    <div className='my-8'>
                        <small className=''>Add negative search terms</small>
                        <TextArea
                            name="negative_answer"
                            className="py-2 !p-[10px] focus:border-gray mt-3"
                            type={"text"}
                            id={"negative_answer"}

                            placeholder="Enter or paste your negative search terms, one per line."
                            rows={'2'}
                            onChange={handleTextAreaInput}
                            value={textAreaValue}
                        />

                        {textAreaValue &&
                            <div className='mx-1 border-b border-gray flex gap-4 mt-4 px-5'>
                                <button
                                    onClick={(e) => addNewNagetiveFaq()}
                                    type="button"
                                    // disabled={selected.negative_answer === "" || !selected.negative_answer || nLoading}
                                    className="my-4 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold cursor-pointer text-sky">
                                    {loading ? 'Loading...' : isEdit ? "Edit" : "Add"}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    type="button"
                                    // disabled={selected.negative_answer === "" || !selected.negative_answer || nLoading}
                                    className="my-3 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold cursor-pointer text-sky">
                                    Cancel
                                </button>

                            </div>
                        }

                    </div>

                    {itemsSelected.length > 0 &&
                        <div className='w-full bg-primary p-2 text-white px-4'>
                            <small className='font'>{itemsSelected.length} selected </small>
                            <small
                                className='font-semibold mx-5 cursor-pointer'
                                onClick={deleteNegativeKeywords}>
                                {loadingRemove ? "Loading..." : "Remove"}
                            </small>
                        </div>
                    }

                    <div>

                        <DataTable
                            fixedHeader
                            highlightOnHover
                            pointerOnHover
                            defaultSortFieldId="year"
                            onRowClicked={(rowData) => {
                                console.log(rowData);
                            }}
                            // pagination
                            className='dat-class'
                            noDataComponent={<><p className="text-center text-xs p-3">Start adding negative search terms.</p></>}
                            paginationPerPage={7}
                            columns={columns}
                            data={negativeQuestions}
                            customStyles={customStyles}

                        />

                    </div>

                    {/* {negativeQuestions.length > 0 && (
                        <>
                            <h1 className='text-xs font-semibold'>Active Negative Search Terms</h1>
                            <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                                <ul className="text-start py-2 text-sm text-gray-700 ">
                                    {negativeQuestions.map((element, key) =>
                                        <li className='p-2 text-justify text-heading my-2 cursor-pointer flex justify-between items-center gap-4' key={key}>
                                            <p className="text-xs">{element.search}</p>
                                            <div className='flex justify-start gap-4 items-center'>
                                                <div title='Score'>
                                                    {element.score}
                                                </div>
                                                <PencilSquareIcon className="h-5 w-5" onClick={() => {
                                                    setIsEdit(true)
                                                    setShowAdd(true)
                                                    setSelected((prev) => {
                                                        return {
                                                            ...prev,
                                                            negative_answer: element.search,
                                                            negative_id: element.id,
                                                            index: key
                                                        }
                                                    })
                                                }} />
                                                <TrashIcon className="h-5 w-5" onClick={() => { deleteNegativeFaq(element.id) }} />

                                            </div>
                                        </li>
                                    )}

                                </ul>


                            </div>
                        </>
                    )} */}
                </>
            </div>
        </div >
    )
}

export default NegativeSearchTermsTab_Workflows