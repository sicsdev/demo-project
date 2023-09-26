import axios from 'axios'
import { returnConfig } from '../_helpers/returnConfig';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getKnowledgeData = async () => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/knowledge/`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const createNewKnowledge = async (body) => {
    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/knowledge/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};


export const deleteKnowledgeRecord = async (id) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/knowledge/${id}/`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const updateKnowledgeRecord = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/knowledge/${id}/`, body, config);
        return response;
    } catch (error) {
        return error.response.data
    }
}

export const deleteKnowledgeFAQ = async (id, faqid) => {
    let config = returnConfig()
    try {
        const response = await axios.delete(`${API_URL}/api/v1/main/knowledge/${id}/faqs/${faqid}`, config);
        return response;
    } catch (error) {
        return error
    }
};

export const patchKnowledgeQuestion = async (body, id) => {
    let config = returnConfig()
    try {
        const response = await axios.patch(`${API_URL}/api/v1/main/faqs/${id}/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};

export const getFaqQuestions = async (queryParam) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/faqs?${queryParam}`, config);
        return response?.data;
    } catch (error) {
        return error
    }
};

export const searchFaqQuestions = async (queryParam) => {
    let config = returnConfig()
    try {
        const response = await axios.get(`${API_URL}/api/v1/main/faqs?${queryParam}`, config);
        return response?.data;
    } catch (error) {
        return error
    }
};


export const rateFaqNegative = async (body) => {

    // Example payload:
    // search = "refund" \
    // faqs = ["5c40b67b-03ef-4493-8e21-eca4a11f9d62", "ab7ff579-4900-40d2-aae7-20818c41b872"] \
    // "Authorization: Token 166a3d8984b62c3b1c885b88dab47cf54f259888"

    let config = returnConfig()
    try {
        const response = await axios.post(`${API_URL}/api/v1/main/faqs-negative/`, body, config);
        return response;
    } catch (error) {
        return error
    }
};