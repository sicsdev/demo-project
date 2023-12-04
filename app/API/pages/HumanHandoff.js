import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addHumanHandoffWorkflowData = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/human-handoff/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const deleteHandoff = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/human-handoff/${id}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};