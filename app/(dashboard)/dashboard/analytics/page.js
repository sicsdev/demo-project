"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { ArrowLeftIcon, ArrowRightIcon, ChatBubbleLeftRightIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { getBotConversation, getBotConversationMessages, getPaginateBotConversation } from "@/app/API/pages/Bot";
import moment from "moment";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import Link from "next/link";
import SelectOption from "@/app/components/Common/Input/SelectOption";
import { useDispatch, useSelector } from "react-redux";
import { fetchBot } from "@/app/components/store/slices/botIdSlice";
import Chat from "@/app/components/Chats/Chats";
import Loading from "@/app/components/Loading/Loading";
import { updateLogState } from "@/app/components/store/slices/logSlice";
import page from "../phone-numbers/page";
// import Reports from "@/app/components/Reports/Reports";

const Logs = () => {
  const columns = [
    {
      name: "Workflow",
      selector: (row) => <p className=" whitespace-normal">{row.is_workflow ? "True" : "False"}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: "Human Handoff",
      selector: (row) => <p className=" whitespace-normal">{row.human_handoff ? "True" : "False"}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: "Number of Messages ",
      selector: (row) => <p className=" whitespace-normal">{row.number_of_messages}</p>,
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
  const [showChat, setShowChat] = useState(false)
  const router = useRouter();
  const [botValue, setBotValue] = useState([]);
  const [workflowValue, setWorkflowValue] = useState([{ name: 'All Conversations', value: 'all' }, { name: 'Human Handoff', value: 'handoff' }]);
  const state = useSelector((state) => state.botId);
  const logState = useSelector((state) => state.logs);
  const workflowState = useSelector(state => state.workflow);
  const [conversationData, setConversationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBot, setSelectedBot] = useState('');
  const [messages, setMessages] = useState([])
  const [manageMessages, setManageMessages] = useState([])
  const [indexVal, setIndexVal] = useState(0)
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageVal, setPageVal] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    workflows: '',
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

    if (logState.data === null) {
      setSelectedBot(mergedArray[0].value)
      setIndexVal(0)
      handlePageChange(mergedArray[0].value, 1, '')
      dispatch(updateLogState({ ...logState.data, bot: mergedArray[0].value }))
    } else {


      setSelectedFilters({
        type: logState.data.type || '',
        workflows: logState.data.workflows || '',
      })
      setSelectedBot(logState.data.bot)
      setIndexVal(0)
      handlePageChange(logState.data.bot, 1, logState.data.queryParam || '')
    }


  };

  const getAllWorkflows = () => {
    const results = workflowState?.data?.results;
    if (results && Array.isArray(results) && results.length > 0) {
      const values = [
        { name: 'All Conversations', value: 'all' },
        { name: 'Human Handoff', value: 'handoff' },
        ...results.map(item => ({ name: item.name, value: item.id })),
      ];
      setWorkflowValue(values);
    }
  };

  useEffect(() => {
    getAllWorkflows()
  }, [workflowState.data])

  useEffect(() => {
    if (state.botData.data === null) {
      dispatch(fetchBot());
    }
    if (state.botData.data?.bots && state.botData.data?.widgets) {
      getAllBots();
    }
  }, [state.botData.data]);


  const handleInputValues = (e) => {
    setLoading(true)
    const { value } = e.target;
    dispatch(updateLogState({ ...logState.data, bot: value }))
    setSelectedFilters({
      type: '',
      workflows: '',
    })
    setSelectedBot(value)
    setIndexVal(0)
    handlePageChange(value, 1, '');
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


    let payload = {
      [name]: value
    }
    dispatch(updateLogState({ ...logState.data, queryParam: queryParam, ...payload }))
    if (selectedBot) {
      setIndexVal(0)
      handlePageChange(selectedBot, 1, queryParam);
    }
  };

  const buildQueryParam = (filters) => {
    // Filter out the empty and 'all' values from the filters object
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([key, value]) => value !== '' && value !== 'all'
      )
    );
    if (filteredFilters.workflows === 'handoff') {
      filteredFilters.human_handoff = true;
      delete filteredFilters.workflows;
    }

    const queryParams = new URLSearchParams(filteredFilters).toString();
    return queryParams ? `&${queryParams}` : '';
  };

  const handlePageChange = async (id, page, queryParam = '') => {
    const response = await getPaginateBotConversation(id, page, queryParam)
    if (response.status === 200) {
      let data = response.data
      let newdata = data.results;
      if (newdata.length > 0) {
        for (let i = 0; i < newdata.length; i++) {
          newdata[i].url = `/dashboard/chats?id=${newdata[i].id}`;
          newdata[i].index = i;
          newdata[i].created = moment(newdata[i].created).format(
            "MM-DD-YYYY hh:mm:ss A"
          );
        }
      }
      const getAllIds = newdata.map((ele) => { return { id: ele.id } })
      setManageMessages(getAllIds)
      setTotalRows(data.count)
      setConversationData(newdata);
      setLoading(false);
    } else {
      setLoading(false);

    }
  }

  useEffect(() => {
    setConversationData(conversationData)
  }, [conversationData.length])
  const [messageLoading, setMessagesLoading] = useState(false)
  const getCoversationMessages = async (id) => {
    setMessagesLoading(true)
    const response = await getBotConversationMessages(id)
    if (response.status === 200) {
      setMessages(response.data.results)
      setShowChat(true)
      setMessagesLoading(false)
    } else {
      setMessagesLoading(false)
      setShowChat(false)
    }
  }
  return (
    <>

      <div>

        <div className="border-b border-primary ">
          <div className="flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
              {showChat === true ?
                <li className="mr-2">
                  <span
                    className=" flex justify-start gap-2 cursor-pointer items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group"
                    aria-current="page"
                  >
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-500" /> Chats
                    Chat Logs
                  </span>
                </li> :
                <li className="mr-2">
                  <span
                    className=" flex justify-start gap-2 cursor-pointer items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group"
                    aria-current="page"
                  >
                    <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-500" />{" "}
                    Chat Logs
                  </span>
                </li>}
            </ul>
            {showChat === true ?
              <div className="flex justify-end gap-2 items-center">
                <p className="text-sm cursor-pointer" onClick={() => setShowChat(false)}>
                  back
                </p>
                {indexVal === 0 && pageVal === 1 ?
                  null
                  :
                  <p className="text-sm cursor-pointer" onClick={() => {
                    if (indexVal === 0 && pageVal !== 1) {
                      handlePageChange(logState.data.bot, pageVal - 1, logState.data.queryParam || '')
                      setPageVal(pageVal - 1)
                      setIndexVal(9)
                      getCoversationMessages(manageMessages[0].id)
                    } else {
                      getCoversationMessages(manageMessages[indexVal - 1].id)
                      setIndexVal(indexVal - 1)
                    }
                  }}>
                    <ArrowLeftIcon className="h-6 w-6 text-heading" />
                  </p>
                }
                <p className="text-sm cursor-pointer" onClick={() => {
                  if (indexVal !== manageMessages.length - 1) {
                    getCoversationMessages(manageMessages[indexVal + 1].id)
                    setIndexVal(indexVal + 1)
                  } else {
                    handlePageChange(logState.data.bot, pageVal + 1, logState.data.queryParam || '')
                    setPageVal(pageVal + 1)
                    setIndexVal(0)
                    getCoversationMessages(manageMessages[0].id)
                  }
                }}>
                  <ArrowRightIcon className="h-6 w-6 text-heading" />
                </p>
              </div>
              :
              <div className="flex justify-end gap-2">
                <p className="text-sm">
                  <Link href="/dashboard">
                    back
                  </Link>
                </p>
              </div>
            }
          </div>
        </div>


        {/* <Reports /> */}
        {showChat === false ?
          <>
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
                  values={[{ name: 'Chat', value: 'chat' }, { name: 'Email', value: 'email' }, { name: 'Phone', value: 'phone' }]}
                  title={<h3 className="text-sm my-4 font-semibold">Channel</h3>}
                  id={"type"}
                  className="py-3"
                  error={""}
                />
              </div>
              <div className="mb-4 w-full">
                <SelectOption
                  onChange={(e) => filterDataHandler(e)}
                  value={selectedFilters.workflows || ''}
                  name="workflows"
                  values={workflowValue}
                  title={<h3 className="text-sm my-4 font-semibold">Conversations</h3>}
                  id={"workflows"}
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
                      // router.push(rowData.url);
                      getCoversationMessages(rowData.id)
                      setIndexVal(rowData.index)

                    }}
                    pagination
                    className='data-table-class'
                    paginationServer
                    paginationPerPage={10}
                    paginationTotalRows={totalRows}
                    onChangePage={(page) => {
                      setPageVal(page)
                      handlePageChange(selectedBot, page, '')
                    }}
                    noDataComponent={
                      <>
                        <p className="text-center text-sm p-3">
                          No Chat logs found!
                        </p>
                      </>
                    }
                    columns={columns}
                    data={conversationData}
                  />
                )}
              </>
            )}
          </>
          :
          <>
            {messageLoading ? <Loading /> : (
              <Chat messages={messages} />
            )}
          </>
        }
      </div>
    </>


  );
};

export default Logs;
