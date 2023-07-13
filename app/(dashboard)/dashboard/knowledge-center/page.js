"use client";
import React, { useEffect, useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import DataTable from "react-data-table-component";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Button from "@/app/components/Common/Button/Button";
import TextField from "@/app/components/Common/Input/TextField";

const Page = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([
        {
            id: 1,
            question: 'What is your favorite color?',
            answer: 'My favorite color is blue.',
        },
        {
            id: 2,
            question: 'What is the capital of France?',
            answer: 'The capital of France is Paris.',
        },
        {
            id: 3,
            question: 'What is the largest planet in our solar system?',
            answer: 'The largest planet in our solar system is Jupiter.',
        },
        {
            id: 4,
            question: 'Who painted the Mona Lisa?',
            answer: 'The Mona Lisa was painted by Leonardo da Vinci.',
        },
        {
            id: 5,
            question: 'What is the symbol for the chemical element oxygen?',
            answer: 'The symbol for the chemical element oxygen is O.',
        },
        // Add more objects as needed
    ])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])

    const handleButtonClick = (id) => {

    };

    const handleSave = (row) => {
        // Save the edited data
        const updatedData = data.map((item) =>
            item.id === row.id ? { ...item, ...row } : item
        );
        setData(updatedData);
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
                        onChange={(e) => handleSave({ ...row, answer: e.target.value })}
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
                // <button onClick={() => handleButtonClick(row.id)}>Action</button>
                <Button
                    type={"button"}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                    onClick={(e) => handleButtonClick(e)}
                >
                    Save Answer
                </Button>
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
                                <BookOpenIcon className="h-6 w-6 text-primary" /> Knowledge Center
                            </a>
                        </li>
                    </ul>
                </div>

                {loading === true ? (
                    // <Loading />
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
                            title="Knowledge Center"
                            fixedHeader
                            highlightOnHover
                            pointerOnHover
                            defaultSortFieldId="question"
                            pagination
                            paginationPerPage={7}
                            columns={columns}
                            data={data}
                        />
                    </div>
                )}

            </div>
        </>
    );
};

export default Page;
