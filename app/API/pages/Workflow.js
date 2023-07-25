


import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const getAllWorkflow = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/workflows/`, config);
        return response.data;
    } catch (error) {
        return error
    }
};

export const createWorkflow = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/workflows/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const updateWorkFlowStatus = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/workflows/${id}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};