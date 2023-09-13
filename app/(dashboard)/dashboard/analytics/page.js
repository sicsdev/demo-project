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
import Card from "@/app/components/Common/Card/Card";
import TopBar from "@/app/components/Common/Card/TopBar";
// import Reports from "@/app/components/Reports/Reports";


const Logs = () => {

  const formatDateFunc = (date) => {
    const inputDate = moment(date, "MM-DD-YYYY h:mm:ss A");
    return inputDate.format("D/M/YY HH:mm A");
  };

  const columns = [
    {
      name: "Workflow",
      selector: (row) => <p className=" whitespace-normal">{row.is_workflow ? "True" : "False"}</p>,
      sortable: false,
      reorder: false,
    },
    {
      name: "Human Handoff",
      selector: (row) => <p className=" whitespace-normal">{row.human_handoff ? "True" : "False"}</p>,
      sortable: false,
      reorder: false,
    },
    {
      name: "Number of Messages",
      selector: (row) => row.number_of_messages,
      sortable: true,
      reorder: false,
      cell: (row) => (
        <p className=" whitespace-normal">{row.number_of_messages}</p>
      )
    },
    {
      name: "Created At",
      selector: (row) => row.created,
      sortable: false,
      reorder: false,
      cell: (row) => (
        formatDateFunc(row.created)
      )
    },
  ];
  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false)
  const router = useRouter();
  const [botValue, setBotValue] = useState([]);
  const [workflowValue, setWorkflowValue] = useState([{ name: 'Conversation Properties', value: 'all' }, { name: 'Human Handoff', value: 'handoff' }, { name: 'CSAT', value: 'csat' }, { name: 'Downvoted', value: 'downvotes' }]);
  const [userWorkFlows, setUserWorkflows] = useState([]);
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
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
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
        conversations: logState.data.conversations || '',
      })
      setSelectedBot(logState.data.bot)
      setIndexVal(0)
      handlePageChange(logState.data.bot, 1, logState.data.queryParam || '')
    }


  };

  const getAllWorkflows = () => {
    const results = workflowState?.data?.results;
    if (results && Array.isArray(results) && results.length > 0) {
      // const values = [
      //   { name: 'Conversation Properties', value: 'all' },
      //   { name: 'Human Handoff', value: 'handoff' },
      //   ...results.map(item => ({ name: item.name, value: item.id })),
      // ];
      setUserWorkflows(results);
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
    if (filteredFilters.conversations === 'handoff') {
      filteredFilters.human_handoff = true;
      delete filteredFilters.conversations;
    }
    if (filteredFilters.conversations === 'downvotes') {
      filteredFilters.has_downvotes = true;
      delete filteredFilters.conversations;
    }
    if (filteredFilters.conversations === 'csat') {
      filteredFilters.has_surveys = true;
      delete filteredFilters.conversations;
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


  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);

    // Clear the previous timeout to prevent rapid search requests
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to perform the search after a delay (e.g., 300 milliseconds)
    const newTypingTimeout = setTimeout(() => {
      performSearch(searchText);
    }, 1000);

    setTypingTimeout(newTypingTimeout);
  };

  const performSearch = (text) => {
    if (selectedBot) {
      let searching = logState.data.queryParam || ''
      handlePageChange(selectedBot, 1, searching + '&search=' + text);
    }

  };

  const handleSort = async (column, sortDirection) => {

    setTimeout(async () => {
      if (column?.name === 'Number of Messages') {
        let orderBy = sortDirection === 'asc' ? 'number_of_messages' : '-number_of_messages';
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          'ordering': orderBy,
        }));

        const queryParam = buildQueryParam({
          ...selectedFilters,
          'ordering': orderBy, // Update the selected value for the current dropdown
        });


        try {
          const response = await getPaginateBotConversation(selectedBot, 1, queryParam);
          if (response.status === 200) {
            let data = response.data;
            let newdata = data.results;
            if (newdata.length > 0) {
              for (let i = 0; i < newdata.length; i++) {
                newdata[i].url = `/dashboard/chats?id=${newdata[i].id}`;
                newdata[i].index = i;
                newdata[i].created = moment(newdata[i].created).format("MM-DD-YYYY hh:mm:ss A");
              }
            }
            const getAllIds = newdata.map((ele) => ({ id: ele.id }));

            // Update state variables with the retrieved data
            setManageMessages(getAllIds);
            setTotalRows(data.count);
            setConversationData(newdata);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          // Handle errors here, e.g., log them or update UI accordingly
          console.error("Error in getPaginateBotConversation:", error);
          setLoading(false);
        }
      }
    }, 100);
  };


  return (
    <>

      <div>
        {
          showChat === true ?
            <TopBar title={`Chats Chat Logs`} icon={<ChatBubbleLeftRightIcon className="h-5 w-5 text-primary" />} isBackButton={true} backButtonUrl={`/dashboard`} /> :
            <TopBar title={`Chat Logs`} icon={<ChatBubbleOvalLeftIcon className="h-5 w-5 text-primary" />} isBackButton={true} backButtonUrl={`/dashboard`} />
        }

        {showChat === false && (
          <div className='flex justify-end gap-4 items-center mt-2 p-2'>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
            </div>
          </div>
        )}

        {/* <Reports /> */}
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
                value={selectedFilters.conversations || ''}
                name="conversations"
                values={workflowValue}
                title={<h3 className="text-sm my-4 font-semibold">Conversations</h3>}
                id={"conversations"}
                className="py-3"
                error={""}
              />
            </div>
            <div className="mb-4 w-full">
              <SelectOption
                onChange={(e) => filterDataHandler(e)}
                value={selectedFilters.workflows || ''}
                name="workflows"
                values={userWorkFlows}
                title={<h3 className="text-sm my-4 font-semibold">Workflows</h3>}
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
                    handlePageChange(selectedBot, page, buildQueryParam(selectedFilters))
                  }}
                  sortServer
                  onSort={handleSort}
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
        {showChat && (
          <>

            <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50' onClick={() => setShowChat(false)}>    </div >
            <div className={` z-50 overflow-y-scroll w-full sm:w-[700px] p-5 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white`}>
              <>
                {/* <Card> */}
                <div className=''>
                  <h3 className='text-heading font-semibold text-xl text-center mt-4'>Chat</h3>
                </div>

                <div className="flex justify-between p-2 my-4 gap-2 items-center">
                  <p className="text-sm cursor-pointer" onClick={() => setShowChat(false)}>
                    back
                  </p>
                  <div className="flex justify-between p-2 my-4 gap-2 items-center">
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
                </div>
                <>

                  <Chat messages={messages} selectedBot={selectedBot}/>

                </>

                {/* </Card> */}
              </>
            </div></>
        )}


      </div>
    </>


  );
};

export default Logs;
