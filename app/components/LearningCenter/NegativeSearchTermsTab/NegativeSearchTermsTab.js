import React, { useState } from 'react'
import SkeletonLoader from '../../Skeleton/Skeleton'
import TextField from '../../Common/Input/TextField'
import { MinusIcon, MinusSmallIcon, PencilIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import NegativeItem from './NegativeItem'
import DataTable from 'react-data-table-component'
import TextArea from '../../Common/Input/TextArea'
import './customstyles.css'
import Dropdown from './Dropdown'
import { deleteNagetiveQuestionData, getSingleNagetiveQuestionData } from '@/app/API/pages/NagetiveFaq'
import { useEffect } from 'react'
const NegativeSearchTermsTab = ({ negative, isEdit, showAdd, setSelected, negativeQuestions, addNewNagetiveFaq, selected, nLoading, setIsEdit, deleteNegativeFaq, getNagetiveQuestions, setNagetiveQuestions }) => {

    const [itemsSelected, setItemsSelected] = useState([])
    const [editing, setEditing] = useState(false)
    const [loadingRemove, setLoadingRemove] = useState(false)
    const [negativesData, setNegativesData] = useState([])

    useEffect(() => {
        getAllNegatives();
    }, [negativeQuestions]);

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
            width: "100px",
            header: <button className='bg-primary'>Botón en Encabezado</button>,
        },

        {
            name: "Negative keyword",
            selector: (row) => row,
            cell: (row) => (
                <div className='keyword_container flex gap-3 w-full relative'>
                    {row.search}
                    <Dropdown getAllNegativesFAQ={getAllNegatives} type={'faq'} element={row} handleEdit={() => handleEdit(row)}></Dropdown>
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
        columns: { style: { width: "100%" } }
    };


    const handleEdit = (row) => {
        setIsEdit(true)
        setEditing(true)
        setSelected((prev) => {
            return {
                ...prev,
                negative_answer: row.search,
                negative_id: row.id,
            }
        })
    }

    const deleteNegativeKeywords = async (id) => {
        setLoadingRemove(true)


        // Delete from local state
        let newArray = negativeQuestions.filter(e => !itemsSelected.includes(e.id));

        // Delete from DB using API
        for (const item of itemsSelected) {
            try {
                await deleteNagetiveQuestionData(item);
            } catch (error) {
                console.error("Error deleting negative terms:", error);
            }
        }

        // Clean arrays
        setNagetiveQuestions(newArray)
        setItemsSelected([])

        await getAllNegatives()

        setLoadingRemove(false)

    }


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


    const getAllNegatives = async () => {
        const response = await getSingleNagetiveQuestionData(selected.id)
        console.log(response)
        setNegativesData(response.data)
        // await setNagetiveQuestions(response?.data)
    }

    return (
        <>

            {negative ?
                <div className="mt-6">
                   
                

                    <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                        <div className="mt-1 flex items-center justify-between">
                            <SkeletonLoader height={85} width={700} />
                           
                        </div>
                    </div>

                </div>
                :
                <>
                    {showAdd && (
                        <div className='my-8'>
                            <small className=''>Add negative search terms</small>
                            <TextArea
                                name="negative_answer"
                                className="py-2 !p-[10px] focus:border-gray mt-3"
                                type={"text"}
                                id={"negative_answer"}

                                placeholder="Enter or paste your negative search terms, one per line."
                                rows={'2'}
                                onChange={(e) => setSelected((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }
                                })}
                                value={selected.negative_answer} />

                            {selected.negative_answer &&
                                <div className='mx-1 border-b border-gray flex gap-4 mt-4 px-5'>
                                    <button
                                        onClick={(e) => addNewNagetiveFaq()}
                                        type="button"
                                        disabled={selected.negative_answer === "" || !selected.negative_answer || nLoading}
                                        className="my-4 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold cursor-pointer text-sky">
                                        {nLoading ? 'Loading...' : editing ? "Edit" : "Add"}
                                    </button>
                                    <button
                                        onClick={() => setSelected({ ...selected, negative_answer: '' })}
                                        type="button"
                                        disabled={selected.negative_answer === "" || !selected.negative_answer || nLoading}
                                        className="my-3 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold cursor-pointer text-sky">
                                        Cancel
                                    </button>
                                </div>
                            }

                        </div>
                    )}

                    {itemsSelected.length > 0 &&
                        <div className='w-full bg-primary p-2 text-white px-4'>
                            <small className='font'>{itemsSelected.length} selected </small>
                            <small className='font-semibold mx-5 cursor-pointer'
                                onClick={deleteNegativeKeywords}>
                                {loadingRemove ? "Loading..." : "Remove"}
                            </small>
                        </div>
                    }

                    <DataTable
                        fixedHeader
                        highlightOnHover
                        pointerOnHover
                        defaultSortFieldId="year"
                        onRowClicked={(rowData) => {
                            console.log(rowData);
                        }}
                        // pagination
                        className='data-table-class negative-term-search-table'
                        noDataComponent={<><p className="text-center text-xs p-3"></p></>}
                        paginationPerPage={7}
                        columns={columns}
                        data={negativesData}
                        customStyles={customStyles}

                    />
                </>}
        </>)
}

export default NegativeSearchTermsTab