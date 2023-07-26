"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { CloudIcon } from "@heroicons/react/24/outline";
import { getBotConversation } from "@/app/API/pages/Bot";
import Loading from "@/app/components/Loading/Loading";
import moment from "moment";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Link from "next/link";

const Logs = () => {
  const columns = [
    {
      name: "IP address",
      selector: (row) => row.customer_ip,
      sortable: true,
      reorder: true,
    },
    {
      name: "User Agent",
      selector: (row) => row.customer_user_agent,
      sortable: true,
      reorder: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created,
      sortable: true,
      reorder: true,
    },
  ];

  const [conversationData, setConversationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const bot_id = searchParams.get("id");
    const bot_name = searchParams.get("name");
    if (bot_id) {
      getCoversation(bot_id);
    }else{
      router.push("/dashboard")
    }
  }, [ searchParams.get("id")]);

  const getCoversation = async (bot_id) => {
    const response = await getBotConversation(bot_id);
    if (response.status === 200) {
      let newdata = response.data.results;
      if (newdata.length > 0) {
        for (let i = 0; i < newdata.length; i++) {
          newdata[i].url = `/dashboard/chats?id=${newdata[i].id}`;
          newdata[i].created = moment(newdata[i].created).format(
            "MM-DD-YYYY hh:mm:ss A"
          );
        }
      }
      setConversationData(newdata);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="border-b border-primary ">
        <div className="flex items-center justify-between">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
            <li className="mr-2">
            <span
                                className=" flex justify-start gap-2 cursor-pointer items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group"
                                aria-current="page"
                            >
                <CloudIcon className="h-6 w-6 text-gray-500"/> View Logs
              </span>
            </li>
          </ul>
          <p className="text-sm">
            <Link href="/dashboard">back</Link>
          </p>
        </div>
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
        <DataTable
          title={<h3 className="text-sm font-semibold">View Logs</h3>}
          fixedHeader
          highlightOnHover
          pointerOnHover
          defaultSortFieldId="year"
          onRowClicked={(rowData) => {
            router.push(rowData.url);
          }}
          pagination
          noDataComponent={<><p className="text-center text-sm p-3">Questions Tempo needs your help answering will show here when they're ready!</p></>}
          paginationPerPage={7}
          columns={columns}
          data={conversationData}
        />
      )}
    </div>
  );
};

export default Logs;
