import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getNagetiveWorkflowData = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/workflows-negative/`, config);
        return response;
    } catch (error) {
        return error
    }
};
export const getSingleNagetiveWorkflowData = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/workflows/${id}/negatives/`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const addNagetiveWorkflowData = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/workflows-negative/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const editNagetiveWorkflowData = async (body,id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/workflows-negative/${id}`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const deleteNagetiveWorkflowData = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/workflows-negative/${id}`, config);
        return response;
    } catch (error) {
        return error
    }
};
