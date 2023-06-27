'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DataTable from 'react-data-table-component';
import { CloudIcon } from '@heroicons/react/24/outline';
import { getBotConversation } from '@/app/API/pages/Bot';

const Logs = () => {
    const columns = [
        {
            name: 'IP address',
            selector: (row) => row.customer_ip,
            sortable: true,
            reorder: true,
        },
        {
            name: 'User Agent',
            selector: (row) => row.customer_user_agent,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Created At',
            selector: (row) => row.created,
            sortable: true,
            reorder: true,
        },
    ];

    const [conversationData, setConversationData] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const bot_id = searchParams.get('id');
        const bot_name = searchParams.get('name');
        if (bot_id) {
            getCoversation(bot_id);
        }
    }, []);

    const getCoversation = async (bot_id) => {
        const response = await getBotConversation(bot_id);
        if (response.status === 200) {
            let newdata = response.data.results;
            if (newdata.length > 0) {
                for (let i = 0; i < newdata.length; i++) {
                    newdata[i].url = `/dashboard/chats?id=${newdata[i].id}`;
                }
            }
            setConversationData(newdata);
        }
    };

    return (
        <div>
            <div className="border-b border-primary dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a
                            href="#"
                            className="flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                            aria-current="page"
                        >
                            <CloudIcon className="h-6 w-6 text-gray-500" /> View Logs
                        </a>
                    </li>
                </ul>
            </div>
            <DataTable
                title="View Logs"
                fixedHeader
                highlightOnHover
                pointerOnHover
                defaultSortFieldId="year"
                onRowClicked={rowData => {
                   router.push(rowData.url)
                }}
                pagination
                paginationPerPage={7}
                columns={columns}
                data={conversationData}
            />
        </div>
    );
};

export default Logs;
