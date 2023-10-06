"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftIcon,

  QueueListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  getBotConversation,
  getBotConversationMessages,
  getPaginateBotConversation,
} from "@/app/API/pages/Bot";
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
import { setViewed, getConversationDetails } from "@/app/API/pages/Logs";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
// import Reports from "@/app/components/Reports/Reports";

const Logs = () => {
  const [isMobile, setIsMobile] = useState(false);
  const params = useSearchParams()
  const formatDateFunc = (date) => {
    const inputDate = moment(date, "MM-DD-YYYY h:mm:ss A");
    return inputDate.format("M/D/YY h:mm A");
  };
  useEffect(() => {
    // Check screen width to determine if it's a mobile view
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Attach the event listener
    window.addEventListener("resize", checkIsMobile);

    // Initial check
    checkIsMobile();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  useEffect(() => {

    const id_param = params.get('id')
    if (id_param) {
      getCoversationMessagesbyID(id_param)
    }
  }, [])
  const columns = [
    {
      name: (
        <p className=" whitespace-break-spaces text-xs">
          {isMobile ? "Messages" : "Number of Messages"}
        </p>
      ),
      selector: (row) => row.number_of_messages,
      sortable: true,
      cell: (row) => (
        <p className=" whitespace-normal">{row.number_of_messages}</p>
      ),
      minWidth: "50px",
    },
    {
      name: <p className=" whitespace-break-spaces text-xs">Created</p>,
      selector: (row) => row.created,
      sortable: true,
      cell: (row) => formatDateFunc(row.created),
      minWidth: "50px",
    },
    {
      name: (
        <p className=" whitespace-break-spaces text-xs">Workflow Triggered</p>
      ),
      selector: (row) => (
        <p className=" whitespace-normal">{row.is_workflow ? "Yes" : "No"}</p>
      ),
      sortable: false,
      reorder: false,
      minWidth: "50px",
    },
    {
      name: (
        <p className=" whitespace-break-spaces text-xs">Escalated to Human</p>
      ),
      selector: (row) => (
        <p className=" whitespace-normal">{row.human_handoff ? "Yes" : "No"}</p>
      ),
      sortable: false,
      reorder: false,
      minWidth: "50px",
      hide: "sm"
    },
  ];
  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
  const [botValue, setBotValue] = useState([]);
  const [workflowValue, setWorkflowValue] = useState([
    { name: "Select", value: "all" },
    { name: "Human Handoff", value: "handoff" },
    { name: "CSAT", value: "csat" },
    { name: "Downvoted", value: "downvotes" },
  ]);
  const [userWorkFlows, setUserWorkflows] = useState([]);
  const state = useSelector((state) => state.botId);
  const logState = useSelector((state) => state.logs);
  const workflowState = useSelector((state) => state.workflow);
  const userState = useSelector((state) => state.user.data);
  const [conversationData, setConversationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBot, setSelectedBot] = useState("Select");
  const [messages, setMessages] = useState([]);
  const [manageMessages, setManageMessages] = useState([]);
  const [indexVal, setIndexVal] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageVal, setPageVal] = useState(1);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [idOfOpenConversation, setIdOfOpenConversation] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    created__gte: "all",
    created__lte: "all",
    type: "all",
    workflows: "all",
    conversations: "all",
    viewed: "all",
    for_review: "all",
  });
  const [additionalData, setAdditionalData] = useState({
    conversations: 0,
    conversations_avg: null,
    csat: 0,
    average: null,
    deflection_data: {
      date: null,
      precent: null,
      dflection: null,
    }

  })
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

    mergedArray.sort((a, b) => a.name.localeCompare(b.name))
    debugger
    setBotValue(mergedArray);
    // getAdditionalData(mergedArray)
    if (mergedArray?.length > 0) {
      setSelectedBot(mergedArray[0].value);
      firstTimeAnalytics(mergedArray[0].value)
      setIndexVal(0);
      handlePageChange(mergedArray[0].value, 1,
        "&ordering=-number_of_messages&ordering=-created");
      dispatch(updateLogState({ ...logState.data, bot: mergedArray[0].value }));
    }
  };
  const calculateDeflectionRate = state => {
    const { totalConversations, humanHandoffs } = state;
    const deflectionRate = 1 - humanHandoffs / totalConversations;
    return (deflectionRate * 100).toFixed(1); // You can format the result as needed
  };

  const firstTimeAnalytics = async (bot) => {
    const human_handoff = await getBotConversation(bot, '?human_handoff=true')
    const has_surveys = await getBotConversation(bot, '?has_surveys=true')
    const has_downvotes = await getBotConversation(bot, '?has_downvotes=true')
    if (human_handoff && has_surveys && has_downvotes) {
      const allconversation = human_handoff.data.count + has_surveys.data.count + has_downvotes.data.count
      setAdditionalData((prev) => {
        return {
          ...prev,
          conversations: allconversation,
          csat: human_handoff.data.surveys.average,
          deflection_data: {
            ...additionalData.deflection_data,
            dflection: calculateDeflectionRate({
              totalConversations: allconversation,
              humanHandoffs: human_handoff.data.count
            }),
          },
        }
      })
    }
  }
  const getAdditionalData = async (bot, query = '', query1 = '', selectedDate1, selectedDate2) => {
    const human_handoff = await getBotConversation(bot, '?human_handoff=true' + query1)
    const has_surveys = await getBotConversation(bot, '?has_surveys=true' + query1)
    const has_downvotes = await getBotConversation(bot, '?has_downvotes=true' + query1)
    const previous_response_ = await getBotConversation(selectedBot, `?human_handoff=true${query}`)
    const current_response = await getBotConversation(selectedBot, `?human_handoff=true${query1}`)
    if (current_response.status === 200 && previous_response_.status === 200 && human_handoff && has_surveys && has_downvotes) {
      const allconversation = human_handoff.data.count + has_surveys.data.count + has_downvotes.data.count
      const calculateDates = (current_response.data.count - previous_response_.data.count) / previous_response_.data.count
      const calculateAverage = (current_response.data.surveys.average - previous_response_.data.surveys.average) / previous_response_.data.surveys.average
      const conversationRate = ((current_response.data.count - previous_response_.data.count) / previous_response_.data.count) * 100;
      const formattedDate1 = formatDateMonths(selectedDate1);
      const formattedDate2 = formatDateMonths(selectedDate2);
      setAdditionalData((prev) => {
        return {
          ...prev,
          average: (calculateAverage * 100).toFixed(1),
          conversations_avg: conversationRate.toFixed(1),
          conversations: allconversation,
          csat: human_handoff.data.surveys.average,
          deflection_data: {
            ...additionalData.deflection_data,
            date: `${formattedDate1} - ${formattedDate2}`,
            precent: (calculateDates * 100).toFixed(1),
            dflection: calculateDeflectionRate({
              totalConversations: allconversation,
              humanHandoffs: human_handoff.data.count
            }),
          },
        }
      })
    }

  }
  const getAllWorkflows = () => {
    const results = workflowState?.data?.results;
    if (results && Array.isArray(results) && results.length > 0) {
      const values = [
        { name: "Select", value: "all" },
        ...results.map((item) => ({
          name: item.name.concat(item.active ? "" : " (draft)"),
          value: item.id,
        })),
      ];
      setUserWorkflows(values);
    }
  };

  useEffect(() => {
    getAllWorkflows();
  }, [workflowState.data]);

  useEffect(() => {
    if (state.botData.data === null) {
      dispatch(fetchBot());
    }
    if (state.botData.data?.bots && state.botData.data?.widgets && conversationData.length === 0) {
      getAllBots();
    }
  }, [state.botData.data]);

  const handleInputValues = (e) => {
    const { value } = e.target;
    dispatch(updateLogState({ ...logState.data, bot: value }));
    setSelectedFilters({
      created__gte: "all",
      created__lte: "all",
      type: "all",
      workflows: "all",
      conversations: "all",
      viewed: "all",
      for_review: "all",
      search: ''
    });
    setSelectedBot(value);
    setIndexVal(0);
    handlePageChange(value, 1, "", '10', 'mm');
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
      [name]: value,
    };
    dispatch(
      updateLogState({ ...logState.data, queryParam: queryParam, ...payload })
    );
    if (selectedBot !== "Select") {
      setIndexVal(0);
      handlePageChange(selectedBot, 1, queryParam, '10', 'mm');
    }
  };

  const buildQueryParam = (filters) => {
    // Filter out the empty and 'all' values from the filters object
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([key, value]) => value !== "" && value !== "all" && value !== "alll"
      )
    );
    if (filteredFilters.conversations === "handoff") {
      filteredFilters.human_handoff = true;
      delete filteredFilters.conversations;
    }
    if (filteredFilters.conversations === "downvotes") {
      filteredFilters.has_downvotes = true;
      delete filteredFilters.conversations;
    }
    if (filteredFilters.conversations === "csat") {
      filteredFilters.has_surveys = true;
      delete filteredFilters.conversations;
    }
    const queryParams = new URLSearchParams(filteredFilters).toString();
    return queryParams ? `&${queryParams}` : "";
  };

  const handlePageChange = async (
    id,
    page,
    queryParam,
    page_size = 10,
    page1 = "main"
  ) => {
    setPerPage(page_size);
    if (page1 === "main") {
      setLoading(true);
      setSearchLoading(true)
    } else {
      setSearchLoading(true)
    }

    const response = await getPaginateBotConversation(
      id,
      page,
      queryParam,
      page_size
    );
    if (response.status === 200) {
      let data = response.data;
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
      const getAllIds = newdata.map((ele) => {
        return { id: ele.id };
      });
      setManageMessages(getAllIds);
      setTotalRows(data.count);

      setConversationData(newdata);
      setTimeout(() => {

        setSearchLoading(false)
        setLoading(false);

      }, 2000);
    } else {
      setLoading(false);
      setSearchLoading(false)
    }
  };

  useEffect(() => {
    setConversationData(conversationData);
  }, [conversationData.length]);
  const [messageLoading, setMessagesLoading] = useState(false);
  const getCoversationMessages = async (id) => {
    setMessagesLoading(true);
    const response = await getBotConversationMessages(id);
    if (response.status === 200) {
      setMessages(response.data.results);
      setShowChat(true);
      setMessagesLoading(false);
    } else {
      setMessagesLoading(false);
      setShowChat(false);
    }
  };
  const getCoversationMessagesbyID = async (id) => {
    setMessagesLoading(true);
    const response = await getBotConversationMessages(id);
    if (response.status === 200) {
      setIndexVal(0);
      setIdOfOpenConversation(id);
      handleSetViewed({ id: id });
      setMessages(response.data.results);
      setShowChat(true);
      setMessagesLoading(false);
    } else {
      setMessagesLoading(false);
      setShowChat(false);
    }
  };

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
    setSelectedFilters((prev) => {
      return {
        ...prev,
        search: searchText
      }
    })
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
    if (selectedBot !== "Select") {
      let searching = logState.data.queryParam || "";
      handlePageChange(selectedBot, 1, searching + "&search=" + text, '10', 'mm');
    }
  };

  const handleSort = async (column, sortDirection) => {
    setTimeout(async () => {
      let orderBy;
      if (column?.name?.props?.children == "Number of Messages") {
        setLoading(true);

        orderBy =
          sortDirection === "asc"
            ? "-number_of_messages"
            : "number_of_messages";
      } else if (column?.name?.props.children === "Created") {
        setLoading(true);

        orderBy = sortDirection === "asc" ? "-created" : "created";
      }

      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        ordering: orderBy,
      }));

      const queryParam = buildQueryParam({
        ...selectedFilters,
        ordering: orderBy, // Update the selected value for the current dropdown
      });

      try {
        const response = await getPaginateBotConversation(
          selectedBot,
          1,
          queryParam
        );
        if (response.status === 200) {
          let data = response.data;
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
      // }
    }, 100);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    if (selectedBot !== "Select") {
      const queryParam = buildQueryParam(selectedFilters);
      dispatch(updateLogState({ ...logState.data, queryParam: queryParam }));
      handlePageChange(selectedBot, page, queryParam, newPerPage);
    }
  };
  const changePage = (page) => {
    if (selectedBot !== "Select") {
      setPageVal(page);
      handlePageChange(selectedBot, page, buildQueryParam(selectedFilters), '10', 'mm');
    }
  };

  const handleSetViewed = async (rowData) => {
    const idToSetViewed = rowData.id;

    // Find and update array locally
    const updatedConversationData = conversationData.map((item) => {
      if (item.id === idToSetViewed) {
        return { ...item, viewed: true };
      }
      return item;
    });
    setConversationData(updatedConversationData);

    // Update element in API.
    await setViewed(rowData.id);
  };

  const handleCleanDates = (type) => {
    setSelectedFilters({ ...selectedFilters, [type]: "all" });
    const mockEvent = { target: { value: "all", name: type } };
    filterDataHandler(mockEvent);
  };

  const handleConversationDetail = async (id) => {
    setIdOfOpenConversation(id);
  };
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Zero-padding the month
    const day = String(date.getDate()).padStart(2, '0'); // Zero-padding the day
    return `${year}-${month}-${day}`;
  }
  function formatDateMonths(date) {
    const day = date.getDate();
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[date.getMonth()];
    const formattedDay = day === 1 ? `${day}st` : day === 2 ? `${day}nd` : day === 3 ? `${day}rd` : `${day}th`;
    return `${formattedDay} ${month}`;
  }

  const getDatatBewtweenTwoDates = async (prev, next) => {
    const currentDate = moment();
    let next_date = currentDate.format('YYYY-MM-DD');
    const selectedDate1 = new Date(prev);
    const selectedDate2 = next === "all" ? new Date(next_date) : new Date(next);
    const timeDifference = selectedDate2 - selectedDate1;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const date7DaysAgo = new Date(selectedDate1);
    date7DaysAgo.setDate(selectedDate1.getDate() - (daysDifference <= 0 ? 1 : daysDifference));
    const dateOneDayBefore = new Date(selectedDate1);
    dateOneDayBefore.setDate(selectedDate1.getDate() - 1);
    let query = `&created__gte=${formatDate(date7DaysAgo)}&created__lte=${formatDate(dateOneDayBefore)}`
    let query1 = `&created__gte=${prev}&created__lte=${next}`
    if (next === 'all') {
      query1 = `&created__gte=${prev}`
    }
    getAdditionalData(selectedBot, query, query1, selectedDate1, selectedDate2)
  }

  useEffect(() => {
    if (selectedFilters.created__gte !== 'all' && selectedFilters.created__lte !== 'all') {
      getDatatBewtweenTwoDates(selectedFilters.created__gte, selectedFilters.created__lte);
    } else if (selectedFilters.created__gte !== 'all') {
      getDatatBewtweenTwoDates(selectedFilters.created__gte, selectedFilters.created__lte);
    }
  }, [selectedFilters.created__gte, selectedFilters.created__lte,])
  return (
    <>
      <div>
        {showChat === true ? (
          <TopBar
            title={`Chats Chat Logs`}
            icon={<QueueListIcon className="h-5 w-5 text-primary" />}
            isBackButton={true}
            backButtonUrl={`/dashboard`}
          />
        ) : (
          <TopBar
            title={` Logs`}
            icon={<QueueListIcon className="h-5 w-5 text-primary" />}
            isBackButton={false}
            backButtonUrl={`/dashboard`}
          />
        )}

        {showChat === false && (
          <>
            {loading === true || state.isLoading === true ? (
              <div className="grid grid-cols-[85%,15%] my-2">
                <div></div>
                <SkeletonLoader height={30} width={"100%"} />
              </div>
            ) : (
              <div className='flex justify-end gap-4 items-center mt-2 pt-2'>
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative w-full sm:w-[unset]">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  !rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
                </div>
              </div>
            )}
          </>
        )}
        {searchLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 my-4">
            <div className="border-4 border-[#F3F3F7] rounded-md  p-6">
              <SkeletonLoader height={25} width={"30%"} />
              <div className="my-2">
                <SkeletonLoader height={32} width={"22%"} />
              </div>
              <div className="mt-2">
                <SkeletonLoader height={17} width={"20%"} />
              </div>
              <div className="mt-1">
                <SkeletonLoader height={20} width={"30%"} />
              </div>
            </div>
            <div className="border-4 border-[#F3F3F7] rounded-md  p-6">
              <SkeletonLoader height={25} width={"30%"} />
              <div className="my-2">
                <SkeletonLoader height={32} width={"22%"} />
              </div>
              <div className="mt-2">
                <SkeletonLoader height={17} width={"20%"} />
              </div>
              <div className="mt-1">
                <SkeletonLoader height={20} width={"30%"} />
              </div>
            </div>
            <div className="border-4 border-[#F3F3F7] rounded-md  p-6">
              <SkeletonLoader height={25} width={"30%"} />
              <div className="my-2">
                <SkeletonLoader height={32} width={"22%"} />
              </div>
              <div className="mt-2">
                <SkeletonLoader height={17} width={"20%"} />
              </div>
              <div className="mt-1">
                <SkeletonLoader height={20} width={"30%"} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 my-4">
            <div className="border-4 border-[#F3F3F7] rounded-md  p-6 h-[171px]">
              <h1 className="text-sm text-heading font-semibold">Conversations</h1>
              <p className="text-2xl text-heading font-bold my-2">{additionalData.conversations}</p>
              {additionalData.conversations_avg === null || !isFinite(additionalData.conversations_avg) || additionalData.conversations_avg === 0 || additionalData.conversations_avg === '0.0' ? (
                <p className="text-start w-[15%] rounded-md text-heading font-bold my-2">
                  <span className="flex items-center justify-start text-xs text-black font-bold mx-auto text-center">
                    <PlusSmallIcon className="h-3 w-3 text-black" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-infinity font-bold" viewBox="0 0 16 16">
                      <path d="M5.68 5.792 7.345 7.75 5.681 9.708a2.75 2.75 0 1 1 0-3.916ZM8 6.978 6.416 5.113l-.014-.015a3.75 3.75 0 1 0 0 5.304l.014-.015L8 8.522l1.584 1.865.014.015a3.75 3.75 0 1 0 0-5.304l-.014.015L8 6.978Zm.656.772 1.663-1.958a2.75 2.75 0 1 1 0 3.916L8.656 7.75Z" />
                    </svg>
                  </span>
                </p>
              ) : (
                <>
                  {additionalData.conversations_avg > 0 && isFinite(additionalData.conversations_avg) && (
                    <span class="bg-[#EDF9F4] text-[#86B094]  text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">{additionalData.conversations_avg + "℅↑"}</span>
                  )}
                  {additionalData.conversations_avg < 0 && isFinite(additionalData.conversations_avg) && (
                    <span class="bg-[#FAEFED] text-red text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">{additionalData.conversations_avg + "℅↓"}</span>
                  )}
                </>
              )}
              {additionalData.deflection_data.date === null ? (
                <p className="bg-[#f1f1f1] text-black w-[20%] text-center  text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">.v N/A</p>
              ) : (
                <p className="mt-2 text-[#A29EB3] text-xs font-semibold">.v {additionalData.deflection_data.date}</p>
              )
              }
            </div>
            <div className="border-4 border-[#F3F3F7] rounded-md  p-6 h-[171px]">
              <h1 className="text-sm text-heading font-semibold">Deflection Rate</h1>
              {additionalData.deflection_data.dflection === null || !isFinite(additionalData.deflection_data.dflection) ?
                <p className="text-2xl w-[15%] rounded-md text-heading font-bold my-2 p-1 bg-[#f1f1f1]">
                  <span className="flex items-center justify-center text-sm text-black font-bold mx-auto text-center">
                    N/A
                  </span>
                </p>
                : <p className="text-2xl text-heading font-bold my-2">{additionalData.deflection_data.dflection}%</p>
              }

              {additionalData.deflection_data.precent === null || !isFinite(additionalData.deflection_data.precent) || additionalData.deflection_data.precent === '0.0' ? (
                <p className="text-start w-[15%] rounded-md text-heading font-bold my-2 ">
                  <span className="flex items-center justify-start text-xs text-black font-bold mx-auto text-center">
                    <PlusSmallIcon className="h-3 w-3 text-black" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-infinity font-bold" viewBox="0 0 16 16">
                      <path d="M5.68 5.792 7.345 7.75 5.681 9.708a2.75 2.75 0 1 1 0-3.916ZM8 6.978 6.416 5.113l-.014-.015a3.75 3.75 0 1 0 0 5.304l.014-.015L8 8.522l1.584 1.865.014.015a3.75 3.75 0 1 0 0-5.304l-.014.015L8 6.978Zm.656.772 1.663-1.958a2.75 2.75 0 1 1 0 3.916L8.656 7.75Z" />
                    </svg>
                  </span>
                </p>
              ) : (
                <>
                  {additionalData.deflection_data.precent > 0 && isFinite(additionalData.deflection_data.precent) && (
                    <span class="bg-[#EDF9F4] text-[#86B094]  text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">{additionalData.deflection_data.precent + "℅↑"}</span>
                  )}
                  {additionalData.deflection_data.precent < 0 && isFinite(additionalData.deflection_data.precent) && (
                    <span class="bg-[#FAEFED] text-red text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">{additionalData.deflection_data.precent + "℅↓"}</span>
                  )}
                </>
              )}
              {additionalData.deflection_data.date === null ? (
                <p className="bg-[#f1f1f1] text-black w-[20%] text-center  text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">.v N/A</p>
              ) : (
                <p className="mt-2 text-[#A29EB3] text-xs font-semibold">.v {additionalData.deflection_data.date}</p>
              )
              }
            </div>
            <div className="border-4 border-[#F3F3F7] rounded-md  p-6 h-[171px]">
              <h1 className="text-sm text-heading font-semibold">CSAT</h1>
              {additionalData.csat === null ?
                <p className="text-2xl w-[15%] rounded-md text-heading font-bold my-2 p-1 bg-[#f1f1f1]">
                  <span className="flex items-center justify-center text-sm text-black font-bold mx-auto text-center">
                    N/A
                  </span>
                </p>
                :
                <p className="text-2xl text-heading font-bold my-2">{additionalData.csat}</p>}
              {additionalData.average === null || !isFinite(additionalData.average) || additionalData.average === 0 || additionalData.average === '0.0' ? (
                additionalData.csat === null ? <p className="text-xs w-[15%] rounded-md text-heading font-bold my-2 p-1 bg-[#f1f1f1]">
                  <span className="flex items-center justify-center text-xs text-black font-bold mx-auto text-center">
                    + N/A
                  </span>
                </p> :
                  <p className="w-[15%] rounded-md text-heading font-bold my-2  ">
                    <span className="flex items-center justify-start text-xs text-black font-bold mx-auto text-center">
                      <PlusSmallIcon className="h-3 w-3 text-black" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-infinity font-bold" viewBox="0 0 16 16">
                        <path d="M5.68 5.792 7.345 7.75 5.681 9.708a2.75 2.75 0 1 1 0-3.916ZM8 6.978 6.416 5.113l-.014-.015a3.75 3.75 0 1 0 0 5.304l.014-.015L8 8.522l1.584 1.865.014.015a3.75 3.75 0 1 0 0-5.304l-.014.015L8 6.978Zm.656.772 1.663-1.958a2.75 2.75 0 1 1 0 3.916L8.656 7.75Z" />
                      </svg>
                    </span>
                  </p>
              ) : (
                <>
                  {additionalData.average > 0 && isFinite(additionalData.average) && (
                    <span class="bg-[#EDF9F4] text-[#86B094]  text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">{additionalData.average + "℅↑"}</span>
                  )}
                  {additionalData.average < 0 && isFinite(additionalData.average) && (
                    <span class="bg-[#FAEFED] text-red text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">{additionalData.average + "℅↓"}</span>
                  )}
                </>
              )}
              {additionalData.deflection_data.date === null ? (
                <p className="bg-[#f1f1f1] text-black w-[20%] text-center  text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">.v N/A</p>
              ) : (
                <p className="mt-2 text-[#A29EB3] text-xs font-semibold">.v {additionalData.deflection_data.date}</p>
              )
              }
            </div>
          </div>
        )}
        {/* <Reports /> */}
        <>
          {loading === true || state.isLoading === true ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <SkeletonLoader height={20} width={"20%"} />
                <SkeletonLoader height={35} width={"100%"} />
              </div>
              <div>
                <SkeletonLoader height={20} width={"20%"} />
                <SkeletonLoader height={35} width={"100%"} />
              </div>
              <div>
                <SkeletonLoader height={20} width={"20%"} />
                <SkeletonLoader height={35} width={"100%"} />
              </div>
              <div>
                <SkeletonLoader height={20} width={"20%"} />
                <SkeletonLoader height={35} width={"100%"} />
              </div>
            </div>
          ) : (




            <div className="block sm:flex justify-center gap-5">
              <div className="mb-4 w-full">
                <SelectOption
                  onChange={handleInputValues}
                  value={selectedBot}
                  name="bot"
                  values={botValue}
                  title={
                    <h3 className="text-sm my-4 font-semibold">Chat Logs</h3>
                  }
                  id={"bots"}
                  className="py-3"
                  error={""}
                  showOption={false}
                />
              </div>
              <div className="mb-4 w-full">
                <SelectOption
                  onChange={(e) => filterDataHandler(e)}
                  value={selectedFilters.type || ""}
                  name="type"
                  values={userState && userState?.email?.split("@")[1] === 'joinnextmed.com' ? [
                    { name: "Select", value: "all" },
                    { name: "Chat", value: "chat" },
                    { name: "Email", value: "email" },
                    { name: "Phone", value: "phone" }
                  ] : [
                    { name: "Select", value: "all" },
                    { name: "Chat", value: "chat" },
                    { name: "Email", value: "email" },
                  ]}
                  title={
                    <h3 className="text-sm my-4 font-semibold">Channel</h3>
                  }
                  id={"type"}
                  className="py-3"
                  error={""}
                  showOption={false}
                />
              </div>
              <div className="mb-4 w-full">
                <SelectOption
                  onChange={(e) => filterDataHandler(e)}
                  value={selectedFilters.conversations || ""}
                  name="conversations"
                  values={workflowValue}
                  title={
                    <h3 className="text-sm my-4 font-semibold">
                      Conversations
                    </h3>
                  }
                  id={"conversations"}
                  className="py-3"
                  error={""}
                  showOption={false}
                />
              </div>
              {userWorkFlows?.length > 0 && (
                <div className="mb-4 w-full">
                  <SelectOption
                    onChange={(e) => filterDataHandler(e)}
                    value={selectedFilters.workflows || ""}
                    name="workflows"
                    values={userWorkFlows}
                    title={
                      <h3 className="text-sm my-4 font-semibold">Workflows</h3>
                    }
                    id={"workflows"}
                    className="py-3"
                    error={""}
                    showOption={false}
                  />
                </div>
              )}
              {/* <div className="mb-4 w-full">
                <SelectOption
                  onChange={(e) => filterDataHandler(e)}
                  value={selectedFilters.viewed || ""}
                  name="viewed"
                  values={[
                    { name: "Select", value: "all" },
                    { name: "Viewed", value: true },
                    { name: "Not viewed", value: false },
                  ]}
                  title={<h3 className="text-sm my-4 font-semibold">Viewed</h3>}
                  id={"viewed"}
                  className="py-3"
                  error={""}
                  showOption={false}
                />
              </div>
              <div className="mb-4 w-full">
                <SelectOption
                  onChange={(e) => filterDataHandler(e)}
                  value={selectedFilters.for_review || ""}
                  name="for_review"
                  values={[
                    { name: "Select", value: "all" },
                    { name: "For review", value: true },
                  ]}
                  title={
                    <h3 className="text-sm my-4 font-semibold">For review</h3>
                  }
                  id={"for_review"}
                  className="py-3"
                  error={""}
                  showOption={false}
                />
              </div> */}

              <div className="w-full mt-4">
                <div className={`inline`}>
                  <label
                    className={`block text-sm text-heading font-medium pb-2 pt-0`}
                  >
                    From
                    <p style={{ fontSize: "10px" }}></p>
                  </label>
                  <div className={` flex items-center `}>
                    <input
                      onChange={(e) => filterDataHandler(e)}
                      value={selectedFilters.created__gte || ""}
                      type="date"
                      id="created__gte"
                      name="created__gte"
                      className="w-full border rounded-md p-[7px] mt-2 border-input_color focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                    <div onClick={() => handleCleanDates("created__gte")}>
                      {selectedFilters?.created__gte !== "all" && (
                        <XMarkIcon className="w-4 h-4 mt-1"></XMarkIcon>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-4">
                <div className={`inline`}>
                  <label
                    className={`block text-sm text-heading font-medium pb-2 pt-0`}
                  >
                    To
                    <p style={{ fontSize: "10px" }}></p>
                  </label>
                  <div className={`flex items-center`}>
                    <input
                      onChange={(e) => filterDataHandler(e)}
                      value={selectedFilters.created__lte || ""}
                      type="date"
                      id="created__lte"
                      name="created__lte"
                      className="w-full p-[7px] border rounded-md  mt-2 border-input_color focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                    <div onClick={() => handleCleanDates("created__lte")}>
                      {selectedFilters?.created__lte !== "all" && (
                        <XMarkIcon
                          className="w-4 h-4 mt-1"
                          style={{ cursor: "pointer" }}
                        ></XMarkIcon>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <>
            {selectedBot !== 'Select' && (
              <DataTable
                title={""}
                fixedHeader
                highlightOnHover
                pointerOnHover
                className="centered-table"
                defaultSortFieldId="year"
                onRowClicked={(rowData) => {
                  // router.push(rowData.url);
                  setIndexVal(rowData.index);
                  getCoversationMessages(rowData.id);
                  setIdOfOpenConversation(rowData.id);
                  handleSetViewed(rowData);
                }}
                progressPending={searchLoading}
                progressComponent={
                  <div className="w-full mt-3 relative">
                    <SkeletonLoader
                      count={9}
                      height={30}
                      width="100%"
                      className={"mt-2"}
                    />
                  </div>
                }
                paginationDefaultPage={pageVal}
                pagination
                paginationServer
                paginationPerPage={perPage}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationTotalRows={totalRows}
                onChangePage={changePage}
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
          {/* )} */}
        </>
        {showChat && (
          <>
            <div
              className="rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50"
              onClick={() => setShowChat(false)}
            >
              {" "}
            </div>
            <div
              className={` z-50 overflow-y-scroll w-full sm:w-[550px] p-5 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white`}
            >
              <>
                {/* <Card> */}
                <div className="flex justify-center">
                  <h1 className="text-heading text-sm font-semibold">Chat</h1>
                </div>

                <div className="flex justify-between gap-2 items-center">

                  <div className="flex justify-end gap-2">
                    <div className="cursor-pointer" onClick={(e) => setShowChat(false)}>
                      <XMarkIcon className="h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2" />
                    </div>
                  </div>
                  <div className="flex justify-between p-2 gap-2 items-center">
                    {indexVal === 0 && pageVal === 1 ? null : (
                      <p
                        className="text-xs cursor-pointer"
                        onClick={() => {
                          if (indexVal === 0 && pageVal !== 1) {
                            handlePageChange(
                              logState.data.bot,
                              pageVal - 1,
                              logState.data.queryParam || ""
                            );
                            setPageVal(pageVal - 1);
                            setIndexVal(9);
                            getCoversationMessages(manageMessages[0].id);
                          } else {
                            getCoversationMessages(
                              manageMessages[indexVal - 1].id
                            );
                            setIndexVal(indexVal - 1);
                            handleConversationDetail(
                              manageMessages[indexVal - 1].id
                            );
                          }
                        }}
                      >
                        <ArrowLeftIcon className="h-4 w-4 text-heading" />
                      </p>
                    )}
                    <p
                      className="text-xs cursor-pointer"
                      onClick={() => {
                        if (indexVal !== manageMessages.length - 1) {
                          getCoversationMessages(
                            manageMessages[indexVal + 1].id
                          );
                          setIndexVal(indexVal + 1);
                          handleConversationDetail(
                            manageMessages[indexVal + 1].id
                          );
                        } else {
                          handlePageChange(
                            logState.data.bot,
                            pageVal + 1,
                            logState.data.queryParam || ""
                          );
                          setPageVal(pageVal + 1);
                          setIndexVal(0);
                          getCoversationMessages(manageMessages[0].id);
                        }
                      }}
                    >
                      <ArrowRightIcon className="h-4 w-4 text-heading" />
                    </p>
                  </div>
                </div>
                <>
                  <Chat
                    idOfOpenConversation={idOfOpenConversation}
                    messages={messages}
                    selectedBot={selectedBot}
                  />
                </>

                {/* </Card> */}
              </>
            </div>
          </>
        )}








        <div className="hidden limiter">
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100">
                <table>
                  <thead>
                    <tr className="table100-head">
                      <th className="column1  text-xs">Number of Messages</th>
                      <th className="column2  text-xs">Created</th>
                      <th className="column3  text-xs">Workflow Triggered</th>
                      <th className="column4  text-xs">Escalated to Human</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="column1 text-sm">2017-09-29 01:22</td>
                      <td className="column2 text-sm">200398</td>
                      <td className="column3 text-sm">iPhone X 64Gb Grey</td>
                      <td className="column4 text-sm">$999.00</td>
                    </tr>
                    <tr>
                      <td className="column1 text-sm">2017-09-28 05:57</td>
                      <td className="column2 text-sm">200397</td>
                      <td className="column3 text-sm">Samsung S8 Black</td>
                      <td className="column4 text-sm">$756.00</td>
                    </tr>
                    <tr>
                      <td className="column1 text-sm">2017-09-26 05:57</td>
                      <td className="column2 text-sm">200396</td>
                      <td className="column3 text-sm">Game Console Controller</td>
                      <td className="column4 text-sm">$22.00</td>
                    </tr>
                    <tr>
                      <td className="column1 text-sm">2017-09-28 05:57</td>
                      <td className="column2 text-sm">200397</td>
                      <td className="column3 text-sm">Samsung S8 Black</td>
                      <td className="column4 text-sm">$756.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>










      </div>
    </>
  );
};

export default Logs;
