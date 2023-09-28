import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getConversationId = async (id_bot, data) => {
    const config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/bots/${id_bot}/conversations/`, data, config);
        return response.data;
    } catch (error) {
        return error;
    }
};


export const postQuestion = async (content, conversation_id, type) => {
    const config = returnConfig()

    try {
        const url = `${API_URL}/api/v1/main/conversations/${conversation_id}/messages/`;
        const data = { content, type, streaming: false };
        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


export const startWorkflowMessages = async (workflowId, conversation_id) => {
    const config = returnConfig()
    let data = {}
    try {
        const url = `${API_URL}/api/v1/main/conversations/${conversation_id}/messages/`;
        const data = { action: `${workflowId}` };
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


export const getTestBot = async () => {
    const config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/bots/no-live-mode/`, config);
        return response.data;
    } catch (error) {
        return error;
    }
};