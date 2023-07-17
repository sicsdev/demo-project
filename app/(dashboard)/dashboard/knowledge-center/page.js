"use client";
import React, { useEffect, useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import DataTable from "react-data-table-component";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Button from "@/app/components/Common/Button/Button";
import TextField from "@/app/components/Common/Input/TextField";
import { updateRecommendationRecord } from "@/app/API/pages/LearningCenter";
import { ToastContainer } from 'react-toastify';
import { successMessage, errorMessage } from "@/app/components/Messages/Messages";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";
import { useDispatch, useSelector } from "react-redux";
import { editRecommendation, fetchRecommendation } from "@/app/components/store/slices/recommendation";

const Page = () => {
    const [updateLoader, setUpdateLoader] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const state = useSelector((state) => state.recommendation);


    const updateButtonHandler = async (id) => {
        try {
            const row = state?.data?.results.find(item => item.id === id);
            const inputValue = row.answer;
            if (inputValue === '' || inputValue === undefined) {
                return false;
            }
            let payload = {
                answer: inputValue
            }
            setUpdateLoader(id);
            const updateRecord = await updateRecommendationRecord(payload, id);
            setUpdateLoader(null);
            if (updateRecord?.status === 201 || updateRecord?.status === 200) {
                dispatch(fetchRecommendation());
                successMessage("Recommendation Updated Successfully");
            } else {
                errorMessage("Unable to Update!");
            }
        } catch (error) {
            setUpdateLoader(null);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, [])

    const handleInput = (row) => {
        const updatedData = state?.data?.results?.map((item) =>
            item.id === row.id ? { ...item, ...row } : item
        );
        dispatch(editRecommendation(updatedData));
    };

    const columns = [
        {
            name: "Question",
            selector: (row) => row.question,
            sortable: true,
            reorder: true,
            style: {
                width: '30%',
            },
        },
        {
            name: "Suggested Answer",
            selector: (row) => row.answer,
            sortable: true,
            reorder: true,
            cell: (row) => (
                <div className='my-2 w-[100%]'>
                    <TextField
                        onChange={(e) => handleInput({ ...row, answer: e.target.value })}
                        value={row.answer}
                        name="interrogatory_type"
                        className="py-2 mt-2"
                        type={"text"}
                        id={"interrogatory_type"}
                    />
                </div>
            ),
            style: {
                width: '0%',
            },
        },
        {
            name: "",
            cell: (row) => (
                updateLoader === row.id ? (
                    <LoaderButton />
                ) : (
                    <Button
                        type={"button"}
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                        onClick={(e) => updateButtonHandler(row.id)}
                    >
                        Save Answer
                    </Button>
                )
            ),
            style: {
                width: '20%',
                justifyContent: 'end'
            },
        },
    ];

    return (
        <>
            <div>
                <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="mr-2">
                            <a
                                href="javascript:void(0)"
                                className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                                aria-current="page"
                            >
                                <BookOpenIcon className="h-6 w-6 text-primary" /> Learning center
                            </a>
                        </li>
                    </ul>
                </div>

                {loading === true ? (
                    <div className="">
                        <h1 className="mt-2 text-sm">
                            <SkeletonLoader height={40} width={100} />
                        </h1>
                        <div className="mt-3">
                            <SkeletonLoader count={9} height={30} className={"mt-2"} />
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        <DataTable
                            title="Learning center"
                            fixedHeader
                            highlightOnHover
                            pointerOnHover
                            defaultSortFieldId="question"
                            pagination
                            paginationPerPage={7}
                            columns={columns}
                            data={state?.data?.results}
                        />
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default Page;
