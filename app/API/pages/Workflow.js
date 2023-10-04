


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


export const getWorkflowByStatus = async (status) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/workflows?active=${status}`, config);
        return response.data;
    } catch (error) {
        return error
    }
};

export const getSingleWorkflow = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/workflows/${id}/`, config);
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

export const removeWorkFlow = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/workflows/${id}/`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const getAllWorkflowTemplates = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/workflow-templates/`, config);
        return response.data;
    } catch (error) {
        return error
    }
};

export const getWorkflowEmbed = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/workflows/${id}/embed/`, config);
        return response.data;
    } catch (error) {
        return error
    }
};
export const createWorkflowTemplate = async (id, body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/workflow-templates/${id}/add/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const rateWorkflowNegative = async (body) => {
    let config = returnConfig()

    // Example payload:
    // search = "refund" \
    // workflows = ["5c40b67b-03ef-4493-8e21-eca4a11f9d62", "ab7ff579-4900-40d2-aae7-20818c41b872"] \
    // "Authorization: Token 166a3d8984b62c3b1c885b88dab47cf54f259888"

    try {
        const response = await axios.post(`${API_URL}/api/v1/main/workflows-negative/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const getNegativeWorkflows = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/workflows-negative/`, config);
        return response.data;
    } catch (error) {
        return error
    }
};


export const deleteNegativeWorkflow = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/workflows-negative/${id}/`, config);
        return response;
    } catch (error) {
        return error
    }
};
