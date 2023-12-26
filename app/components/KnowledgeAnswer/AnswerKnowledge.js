"use client";
import React, { useEffect, useRef, useState } from "react";
import { acceptInKnowledge, createRecommendation, excludeRecommendationRecord, expandRecommendationRecord, updateRecommendationRecord } from "@/app/API/pages/LearningCenter";
import { ToastContainer } from 'react-toastify';
import { errorMessage } from "@/app/components/Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendation } from "@/app/components/store/slices/recommendation";
import { getFaqQuestions, patchKnowledgeQuestion, searchMatchesFaqQuestions } from "@/app/API/pages/Knowledge";
import { updateWorkFlowStatus } from "@/app/API/pages/Workflow";
import { searchReccomodationWorkflow } from "@/app/API/pages/NagetiveWorkflow";
import { addHumanHandoffWorkflowData } from "@/app/API/pages/HumanHandoff";
import Pusher from 'pusher-js';
import { v4 as uuidv4 } from 'uuid';
import AnswersEditor from "@/app/(dashboard)/dashboard/knowledge-center/AnswersEditor";
import { fetchWorkflows } from "../store/slices/workflowSlice";

const pusher = new Pusher("1fc282a0eb5e42789c23", {
    cluster: "mt1",
});


const Answerknowledge = ({ externalQuestionFromLogs,
    setExternalQuestionFromLogs, selectedBot }) => {

    // Local states
    const workflowState = useSelector(state => state.workflow);
    const [updateLoader, setUpdateLoader] = useState(false);
    const [updateLoader1, setUpdateLoader1] = useState(false);
    const [modal, setModal] = useState(false);
    const [link, setLink] = useState({
        url: '',
        links: [],
        index: null,
        edit: false
    });
    const dispatch = useDispatch()
    const state = useSelector((state) => state.recommendation);
    const [searchKnowledge, setSearchKnowledge] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [workflowView, setWorkflowView] = useState(null)
    const [show, setShow] = useState(null)
    const [knowledgeId, setKnowledgeId] = useState(null)
    const [mode, setMode] = useState('normal')
    const [answer, setAnswer] = useState('')
    const [workFlowData, setWorkFlowData] = useState({
        name: "",
        id: "",
        accepted_loader: false,
        submit_loader: false,
        name: "",
        workflow: [],
        showInput: false,
        answer: '',
        target: "workflow",
        workflowValue: null,
        reccomodation: []
    })
    const [questionData, setQuestionData] = useState([])
    const [subQuestions, setSubQuestions] = useState([])
    const [newUUI, setNewUUI] = useState('')
    const [pusherStreaming, setPusherStreaming] = useState(false)
    const [externalContentForTextEditor, setExternalContentForTextEditor] = useState('')
    const [defaultTitle, setDefaultTitle] = useState('Recommended')
    const [subQuestionLoading, setSubQuestionLoading] = useState(false)



    // Effects
    useEffect(() => {
        getAllWorkflowData();

        let newUUID = uuidv4()
        setNewUUI(newUUID)
        let timeoutId;

        const channel = pusher.subscribe(`recommendation-${newUUID}`);
        channel.bind('messages', data => {
            clearTimeout(timeoutId);
            setPusherStreaming(true)
            setAnswer(prev => prev + data.message);
            setExternalContentForTextEditor(prev => prev + data.message)
            timeoutId = setTimeout(() => {
                setPusherStreaming(false)
            }, 2000);
        })




    }, [])

    useEffect(() => {

        if (externalQuestionFromLogs) {
            setWorkflowView(externalQuestionFromLogs)
            setShow(true)
            setAnswer('')
            setQuestionData([])
            setSearchKnowledge('')
            setKnowledgeId(null)
            searchMatched({ question: externalQuestionFromLogs.question }, false)
        }
    }, [externalQuestionFromLogs])


    const divRef = useRef(null);
    useEffect(() => {

        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setOpenWorkflow(null);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        if (workflowState && workflowView) {
            manageData()
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [workflowView, workflowState]);


    // Handlers

    const getAllWorkflowData = async () => {
        dispatch(fetchWorkflows)
    }

    const updateButtonHandler = async (id, new_answer = null) => {
        try {
            const row = state?.data?.results.find(item => item.id === id);
            const inputValue = answer ? answer : new_answer
            if (inputValue === '' || inputValue === undefined) {
                return false;
            }
            let payload = {
                answer: inputValue
            }
            setUpdateLoader(true);
            setUpdateLoader1(true);

            let updateRecord;


            if (new_answer) {
                updateRecord = await acceptInKnowledge(id, subQuestions[0].data.id)
            } else {
                updateRecord = await updateRecommendationRecord(payload, id);
            }

            if (updateRecord?.status === 201 || updateRecord?.status === 200) {
                setWorkflowView(null)
                setKnowledgeId(null)
                setUpdateLoader(false);
                setUpdateLoader1(false);
            } else {
                errorMessage("Unable to Update!");
                setUpdateLoader(false);
                setUpdateLoader1(false);
            }
        } catch (error) {
            setUpdateLoader(false);
            setUpdateLoader1(false);
        }
    };




    const searchQuestionFaq = async (value) => {
        const response = await getFaqQuestions(`page=1&page_size=10&search=${value}`)
        if (response && response.results) {
            setQuestionData(response.results ?? [])
        }
    }
    const searchFaqs = (e) => {
        const searchText = e.target.value;
        setSearchKnowledge(searchText);
        if (searchText === '') {
            searchMatched({ question: workflowView.question }, false)
            setKnowledgeId(null)
            setQuestionData([])
            setDefaultTitle('Recommended')
        } else {
            setKnowledgeId(null)
            setAnswer('')
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            const newTypingTimeout = setTimeout(() => {
                searchQuestionFaq(searchText)
            }, 1000);

            setTypingTimeout(newTypingTimeout);
        }

    }




    const updateFaq = async (new_answer = null) => {

        let payload = {
            question: externalQuestionFromLogs.question,
            bot: selectedBot,
            answer: answer || subQuestions[0].data.answer,
            accepted: true,
        }

        let newRecommendation = await createRecommendation(payload)
        let id = newRecommendation.data.id || workflowView.id

        const response = await patchKnowledgeQuestion({ answer: answer ? answer : new_answer }, id)
        if (response.status === 200 || response.status === 201) {
            setUpdateLoader(false)
            setUpdateLoader1(false)
            setWorkflowView(null)
            setKnowledgeId(null)
        } else {
            setUpdateLoader(false)
            setUpdateLoadesetUpdateLoader1(false)
        }
    }

    const SubmitTheForm = async () => {
        setUpdateLoader(true)
        if (knowledgeId) {
            updateFaq()
        } else {

            let payload = {
                question: externalQuestionFromLogs.question,
                bot: selectedBot,
                answer: answer || subQuestions[0].data.answer,
                accepted: true,
            }

            let newRecommendation = await createRecommendation(payload)
            let id = newRecommendation.data.id || workflowView.id
            updateButtonHandler(id, null)
        }
    }


    const SubmitTheAnswerForm = async (new_answer) => {
        setUpdateLoader1(true)

        let payload = {
            question: externalQuestionFromLogs.question,
            bot: selectedBot,
            answer: answer || subQuestions[0].data.answer,
            accepted: true,
        }

        let newRecommendation = await createRecommendation(payload)
        let id = newRecommendation.data.id || workflowView.id

        if (knowledgeId) {
            updateFaq(new_answer)
        } else {
            updateButtonHandler(id, new_answer)
        }
    }

    const searchMatched = async (element, showknowledge = true) => {

        setSubQuestionLoading(true)
        if (showknowledge) {
            setKnowledgeId(element)
        }
        let queryParam = 'search=' + element.question
        const response = await searchMatchesFaqQuestions(queryParam)
        if (response && response.length > 0) {
            setSubQuestions(response)
            setSubQuestionLoading(false)
            setAnswer('')
        } else {
            setSubQuestions([])
            setAnswer(element.answer)
            setSubQuestionLoading(false)
        }
    }

    const submitWorkflowTrigger = async () => {
        setWorkFlowData((prev) => {
            return {
                ...prev,
                submit_loader: true
            }
        })
        if (workFlowData.target === "workflow") {
            let descriptions = workFlowData.answer.split('\n')
            let Payload = {
                description: descriptions.filter((x) => x !== ''),
            }
            const response = await updateWorkFlowStatus(Payload, workFlowData.workflowValue.id)
            if (response.status === 200 || response.status === 201) {
                const excludeRecord = await excludeRecommendationRecord(workflowView.id);
                if (excludeRecord?.status === 204) {
                    dispatch(fetchRecommendation());
                    setWorkflowView(null)
                    setKnowledgeId(null)
                    setWorkFlowData((prev) => {
                        return {
                            ...prev,
                            name: "",
                            id: "",
                            name: "",
                            submit_loader: false,
                            accepted_loader: false,
                            showInput: false,
                            answer: '',
                            target: "workflow",
                            workflowValue: null,
                        }
                    })
                } else {
                    errorMessage(response.response.data.description)
                    setWorkFlowData((prev) => {
                        return {
                            ...prev,
                            submit_loader: false
                        }
                    })
                }
            }
        } else if (workFlowData.target === "human_handoff") {
            let payload = {
                search: workflowView?.question,
                recommendation: workflowView.id
            }
            const response = await addHumanHandoffWorkflowData(payload)
            if (response.status === 201 || response.status === 200) {
                dispatch(fetchRecommendation());
                setWorkflowView(null)
                setKnowledgeId(null)
                setWorkFlowData((prev) => {
                    return {
                        ...prev,
                        name: "",
                        id: "",
                        name: "",
                        submit_loader: false,
                        accepted_loader: false,
                        showInput: false,
                        answer: '',
                        target: "workflow",
                        workflowValue: null,
                    }
                })
            } else {
                setWorkFlowData((prev) => {
                    return {
                        ...prev,
                        submit_loader: false
                    }
                })
            }
        }
    }



    const getExpandedAnswer = async () => {
        let answerBackup = answer
        setAnswer('')

        const response = await expandRecommendationRecord({
            question: workflowView?.question,
            answer: answerBackup,
            streaming: true,
            id: `recommendation-${newUUI}`
        })
    }

    const handleTextEditorChange = (content) => {
        if (content) {
            setMode("expand")
        } else {
            setMode("normal")
        }
        setAnswer(content)
    }

    const handleSwapRecommendedXSearch = (element) => {
        setSubQuestions([{
            "data": element,
            "score": 1
        }]);
        setDefaultTitle('Selected')
    }


    const handleWorkflow = async (workflow_data) => {
        setWorkFlowData((prev) => {
            return {
                ...prev,
                accepted_loader: true
            }
        })
        let descriptions = workflow_data.answer.split('\n')
        let Payload = {
            description: descriptions.filter((x) => x !== ''),
        }
        const response = await updateWorkFlowStatus(Payload, workflow_data.workflowValue.id)
        if (response.status === 200 || response.status === 201) {
            const excludeRecord = await excludeRecommendationRecord(workflowView.id);
            if (excludeRecord?.status === 204) {
                dispatch(fetchRecommendation());
                setWorkflowView(null)
                setKnowledgeId(null)
                setWorkFlowData((prev) => {
                    return {
                        ...prev,
                        name: "",
                        id: "",
                        name: "",
                        submit_loader: false,
                        accepted_loader: false,
                        showInput: false,
                        answer: '',
                        target: "workflow",
                        workflowValue: null,
                    }
                })
            } else {
                errorMessage(response.response.data.description)
                setWorkFlowData((prev) => {
                    return {
                        ...prev,
                        accepted_loader: false
                    }
                })
            }
        }

    }



    const manageData = async () => {
        const result = workflowState?.data?.results?.filter((x) => x.active === true);
        const response = await searchReccomodationWorkflow('search=' + workflowView?.question)

        setWorkFlowData((prev) => {
            return {
                ...prev,
                reccomodation: response,
                workflow: result ?? []
            }
        })


    }



    return (
        <>
            {workflowView && show && (
                <>
                    <AnswersEditor
                        setShow={setShow}
                        setWorkflowView={(val) => {
                            setWorkflowView(val)
                            setExternalQuestionFromLogs(val)
                        }}
                        setKnowledgeId={setUpdateLoader}
                        setUpdateLoader={setUpdateLoader}
                        setUpdateLoader1={setUpdateLoader1}
                        setExternalContentForTextEditor={setExternalContentForTextEditor}
                        workflowView={workflowView}
                        knowledgeId={knowledgeId}
                        questionData={questionData}
                        setQuestionData={setQuestionData}
                        setAnswer={setAnswer}
                        setSubQuestions={setSubQuestions}
                        handleSwapRecommendedXSearch={handleSwapRecommendedXSearch}
                        subQuestions={subQuestions}
                        subQuestionLoading={subQuestionLoading}
                        defaultTitle={defaultTitle}
                        updateLoader1={updateLoader1}
                        updateLoader={updateLoader}
                        SubmitTheAnswerForm={SubmitTheAnswerForm}
                        link={link}
                        setLink={setLink}
                        setModal={setModal}
                        modal={modal}
                        handleTextEditorChange={handleTextEditorChange}
                        externalContentForTextEditor={externalContentForTextEditor}
                        answer={answer}
                        SubmitTheForm={SubmitTheForm}
                        getExpandedAnswer={getExpandedAnswer}
                        pusherStreaming={pusherStreaming}
                        setWorkFlowData={setWorkFlowData}
                        workFlowData={workFlowData}
                        submitWorkflowTrigger={submitWorkflowTrigger}
                        searchKnowledge={searchKnowledge}
                        setSearchKnowledge={setSearchKnowledge}
                        mode={mode}
                        setMode={setMode}
                        searchFaqs={searchFaqs}
                        handleWorkflow={handleWorkflow}
                        setSubQuestionLoading={setSubQuestionLoading}
                    >
                    </AnswersEditor>
                </>
            )}
            <ToastContainer />

        </>
    );
};

export default Answerknowledge;



