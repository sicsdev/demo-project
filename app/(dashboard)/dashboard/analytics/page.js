"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { getBotConversation } from "@/app/API/pages/Bot";
import moment from "moment";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Link from "next/link";
import SelectOption from "@/app/components/Common/Input/SelectOption";
import { useDispatch, useSelector } from "react-redux";
import { fetchBot } from "@/app/components/store/slices/botIdSlice";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const [botValue, setBotValue] = useState([]);
  const state = useSelector((state) => state.botId);
  const [conversationData, setConversationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBot, setSelectedBot] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: null,
    is_workflow: false,
  });

  const getAllBots = () => {
    const getTitle = state.botData.data.bots.map(
      (element) => element.chat_title
    );
    const widgetCode = state.botData.data.widgets;
    const mergedArray = widgetCode.map((item, index) => {
      const title = getTitle[index];
      return {
        value: item.id,
        name: title,
      };
    });
    setBotValue(mergedArray);

  };

  useEffect(() => {
    if (state.botData.data === null) {
      dispatch(fetchBot());
    }
    if (state.botData.data?.bots && state.botData.data?.widgets) {
      getAllBots();
    }
  }, [state.botData.data]);


  const getCoversation = async (bot_id, queryParam) => {
    setLoading(true)
    const response = await getBotConversation(bot_id, queryParam);
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

  const handleInputValues = (e) => {
    setLoading(true)
    const { value } = e.target;
    setSelectedFilters({
      type: null,
      is_workflow: false,
    })
    setSelectedBot(value)
    getCoversation(value, '');
  };

  const filterDataHandler = (e) => {
    const { value, name } = e?.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    const queryParam = buildQueryParam({
      ...selectedFilters,
      [name]: value, // Update the selected value for the current dropdown
    });
    if (selectedBot) {
      getCoversation(selectedBot, queryParam);
    }
  };

  const buildQueryParam = (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    return queryParams ? `?${queryParams}` : '';
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
                <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-500" />{" "}
                Chat Logs
              </span>
            </li>
          </ul>
          <p className="text-sm">
            <Link href="/dashboard">back</Link>
          </p>
        </div>
      </div>
      <div className="block sm:flex justify-center gap-5">
        <div className="mb-4 w-full">
          <SelectOption
            onChange={handleInputValues}
            value={selectedBot}
            name="bot"
            values={botValue}
            title={<h3 className="text-sm my-4 font-semibold">Chat Logs</h3>}
            id={"bots"}
            className="py-3"
            error={""}
          />
        </div>
        <div className="mb-4 w-full">
          <SelectOption
            onChange={(e) => filterDataHandler(e)}
            value={selectedFilters.type || ''}
            name="type"
            values={[{ name: 'Chat', value: 'chat' }, { name: 'Email', value: 'email' }]}
            title={<h3 className="text-sm my-4 font-semibold">Filter</h3>}
            id={"type"}
            className="py-3"
            error={""}
          />
        </div>
        <div className="mb-4 w-full">
          <SelectOption
            onChange={(e) => filterDataHandler(e)}
            value={selectedFilters.is_workflow || ''}
            name="is_workflow"
            values={[{ name: 'All Conversations', value: false }, { name: 'Workflow Conversations', value: true }]}
            title={<h3 className="text-sm my-4 font-semibold">Conversations</h3>}
            id={"is_workflow"}
            className="py-3"
            error={""}
          />
        </div>
      </div>
      {loading === true || state.isLoading === true ? (
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
        <>
          {selectedBot && (
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
              noDataComponent={
                <>
                  <p className="text-center text-sm p-3">
                    No Chat logs found!
                  </p>
                </>
              }
              paginationPerPage={7}
              columns={columns}
              data={conversationData}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Logs;
